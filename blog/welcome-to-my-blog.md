# Welcome to my blog!

So after just a *bit* of manipulation and fuckery, my new blog is ready for use! :-D

I'm not sure what I will post here, but I can say it should be a tolerable experience doing so, unlike my previous attempts at making a blog.

## Now for some unwanted and slightly technical rambling, in the realest sense of the word 'rambling'

### Some analysis

In the past I've used raw HTML with a basic templating system for generating the pages. It wasn't a really great way of doing things, especially because:

1. HTML is not a terse enough markup language for a blog, where you will only ever need a few basic types of formatting most of the time.
2. There was no way to easily preview things in-context and it was *certianly* not live.
3. Running a page generation step was really, *really* annoying and basically made it unusable for me. This is especially so since I had to manually update the blog index file at the time. 

Thankfully, my new blog addresses these points quite well:

* Markdown is now used!
* The markdown is rendered in the browser, and appending `&edit=1` to the page will show an editor with a live markdown preview. (Try it now - you won't be able to save but you'll see what it looks like!)
* Updating the blog is now done by running a special server that knows how to save the blog when I hit the save page button - no more manual updates!

### The overall feel

My target when redesigning the blog was to make it feel more like I'm running software on a non-static server, while still actually being static once deployed. I think that a build step is just annoying and largely prevented me from wanting to actively update my blog in the past.

While I still have to start the server and manually commit and push changes for them to show, it's a lot nicer than editing `blog.json` files - or worse, `blog.txt` with a bespoke format that relies on `str.split()` - by hand, so I'll likely actually want to write blog entries and update them sometimes.