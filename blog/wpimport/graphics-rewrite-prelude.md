# Private: The graphics rewrite prelude

I am going to be starting from scratch with graphics in Trestle. It’s going to be a fairly large rewrite: the graphics system was designed entirely around OpenGL, which I used just because I did not have the confidence or patience to learn Vulkan. And to be honest, I still do not have enough patience or deep know-how of CG to learn about how to use Vulkan for fixed-function graphics effectively.

It might sound really dumb to switch to Vulkan when I’ve not got the stuff to do so, but that really isn’t what I said: while yes, I don’t really want to deal with the fixed-function graphics just because of the nature of the subject, I wouldn’t mind using other parts of Vulkan. Specifically, Vulkan has superior support for compute shaders compared to OpenGL. (It was actually designed as part of the API rather than just being added on for the one final blowout that was OpenGL 4.6.) I am going to attempt to develop my game’s graphics implementation entirely in Compute. Here’s to hoping that I’ve not overestimated the power of GPU compute cores…

Performance issues aside, I think this will be a good experience. OpenGL and Vulkan hide away a lot of what is really happening behind the hardware. For example, they don’t allow you to write your own rasterisation algorithm and see how that works since it is normally implemented in hardware to make it faster. That is not really a bad thing – in fact, it is good in lots of respects – but I feel that I have a hard time understanding something until I actually do something and see how it works. I think implementing a lot of the algorithms behind the graphics would be a good educational experience.

*Side note: I’ve already tried to go about drawing a simple framebuffer to the screen, bypassing the traditional graphics pipeline. So far, what I’ve tried has been a nightmare and hasn’t worked (four seconds per frame!), but that is for another time.*

And, in addition, it will make the game more unique in the end. I plan on implementing some really nutty graphics things if I really think I can get away with it. The first thing I want to do that is a bit non-standard is to render bezier surfaces directly, or at least use a subdivision algorithm so that they don’t look jagged and polygonal.

*A short aside: I do really like the idea of using surfaces to represent objects. I think it makes things look nice without really having to put so much work into making a triangle mesh, as well as being a bit more useful for procedural generation, another big topic that I really want to go into and play with more. Those too are for another day.*

Anyways, I do hope that my plans will at least work to some division. I really want to avoid having to use a fixed-function graphics pipeline if I can. I really hate the idea of fixed-function hardware, for it’s benefits, so I would like to be a proponent of using compute more often.
