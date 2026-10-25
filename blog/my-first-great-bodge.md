# The History of Shatter Client: My First Great Bodge

I've been wanting to write more about the history of Smash Hit modding for a while, especially the modern "dark age" where the Smash Hit Wiki stopped being updated with new information. I can't think of a better place to start than the Quick Test Client: my first great bodge, and also the start of what I consider the semi-modern era of Smash Hit modding.

I believe the test client had started while I was browsing through Smash Hit's class list in Ghidra and decided to look at how Smash Hit's asset manager actually loaded assets.

| <img src="https://gist.github.com/user-attachments/assets/9ac31ff6-fedf-4893-9af3-5c60bb627b6a" width="400px" /> |
| -- |
| Decompiled code from Smash Hit, showing where it checks if the string starts with `http`. |

I was suprised to find that Smash Hit seemingly checks if the path starts with `http://`, then *actually tries to download whatever was at the given URL over HTTP!* I quickly decided to test some things out, and after some meddling around, I actually got the game to load an image (my dragon PFP I used at the time) from GitHub and display it in game.

| <img width="800px" alt="Screenshot_20251106-163115_Smash_Hit" src="https://gist.github.com/user-attachments/assets/b0ea2809-43d0-4eee-ae8e-8a0de8fa045d" /> |
| -- |
| Recreation of what it most likely looked like when I first loaded an image over HTTP in the menu. |

This alone wasn't enough to load most types of assets into the game over HTTP, though. The menu seems to load images with HTTP URLs without any modifications due to having an "extra path" associated with it's resource manager, which it checks only after trying to load the asset normally fails.

Loading other types of assets, like levels, rooms and segments, prepended and appended certian strings to the path while loading them and didn't bother to check if they were special paths, so the asset manager would recieve a mangled path and fail to load the asset. For example, trying to load the segment `fire/hole/16_0` would prepend `segments/` and append `.xml`, so that it would try to load from `segments/fire/hole/16_0.xml` (to which the asset manager would also try to add `.mp3` to on Android, due to the hack Smash Hit uses to avoid asset compression). This of course means that trying to load a segment from a URI like `http://192.168.1.131/fire` would get turned into an invalid one like `segments/http://192.168.1.131/fire.xml` - not good!

Thankfully, the solution is very simple: just patch the first character of the prepended string in the binary with a NUL byte, then it would be prepending an empty string and would allow loading assets at `http://` URIs (or even from `user://`)! Of course, things like `.xml` and `.lua` would still get appended to the end of the path, and while you could patch those, they could also simpily be ignored if needed using something like an unused URI parameter (e.g. by using `http://example.com/segment?ignore=` would become `http://example.com/segment?ignore=.xml`). In the end, this approach actually proved useful for disinguishing between segment mesh and XML files.

This means that, without actually having to do *any* complex hacks, it was possible to load almost any game assets over HTTP.

With this, I quickly got to work hacking together a client and a server. The client would "chain load", starting by loading a level when a menu button was clicked:

<pre>
&lt;ui texture="start.png" selected="button_select.png">	
	&lt;rect coords="0 0 294 384" cmd="level.start level:http://192.168.1.134:8000/level?youare=192.168.1.134&amp;ignore="/>
&lt;/ui>
</pre>

The level then looked like this:

<pre>
&lt;level>
  &lt;level type="http://192.168.1.131:8000/room?youare=192.168.1.134&ignore=" length="100" />
&lt;/level>
</pre>

And the room that level loaded looked somewhat like this:

<pre highlight="1">
function init()
	mgMusic(tostring(math.random(0, 28)))
	mgFogColor(0.0, 0.0, 0.0, 1.0, 1.0, 1.0)
	
	confSegment("http://192.168.1.134:8000/segment?youare=192.168.1.134&filetype=", 1)
...
</pre>

And finally, the game would load the segment to test!

Of course, just because it worked didn't mean it was without issues, of which there were several:

* You had to actually edit the IP address to be the one of your computer before installing the quick test mod, and if it ever changed you needed to reinstall - for some network setups that could mean reinstalling every day! Not very good, but still better than repacking every time in most cases.
* Asset loading over HTTP is a blocking operation, meaing that the entire game freezes while trying to download the level. This was more acceptable when there were only four request being made to load one segment (for the level, room, segment and its mesh), but once *Yorshex's Asset Server* was created and the protocol was updated to support remote obstacles this became painful if not using an emulator with a direct connection.
* Probably most worryingly, the game would crash if the level failed to load. This meant that having the wrong IP address would completely crash the game, which is not a good user exprience!

(And as an aside: The `youare=` URL param could have just used the HTTP `Host` header. This jank was fixed in later client and server versions, though I actually had to work around Smash Hit not including the port in the Host header!)

Regardless of the flaws, even the early test client was amazing compared to not having it, which is why I think this qualifies as a *great* bodge: it was small, it was *really* jank, but it was also quite impactful and made Smash Hit modding more viable as something you could just do.