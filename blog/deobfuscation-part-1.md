# Deobfuscation Part 1 of N: Oh god I'm going to have to write so much shit aren't I?

I've been working to learn more about automatic deobfuscation of binaries as I'm currently trying to reverse an obfuscated binary (seemingly obfuscated with OLLVM), and strangely it seems like there's relatively very little written about automated deobfuscation of software, and basically no actual working deobfuscation tools exist.

I'm not exactly sure why that is. I think it's *probably* some combination of program analysis mainly being the focus of (optimising) compilers<sup>1</sup>, and there not being much reward for making a deobfuscator<sup>2</sup>.

Of course what this means is that I've spent the past four days drowning in papers trying to figure how to write my own deobfuscator and ending up very confused because I only really learnt what a Control Flow Graph is two days ago. :P

I think the best approach would be to develop a Ghidra extension that operates on Ghidra's Pcode. I would hope to make something rather generic that could deobfuscate everything I need without having to resort to obfuscation-specific handling, but I believe that as long as it can handle control flow flattening, solve indirect branches/calls, and simplify opaque constants then it should be suitable.

I should note that I would prefer a static approach as I don't have great access to the target platform (macOS/iOS). I've seen stuff like [Generic Deobfuscation](https://www2.cs.arizona.edu/people/debray/Publications/generic-deobf.pdf) and while reading that (even if I don't understand the details `:-)`) has made me absolutely want to implement something like that just to see how it works (and have one actual working implementation of that in the world, since I couldn't find one), it's not something I can really do in this case.

----

1. In which case I should probably turn to looking at that stuff. (Also just to add because there's nowhere it fits: An observation I've made is that a decompiler is almost literally the opposite of a compiler and they share a lot of theory. Notably, most decompilers don't seem to have an equivalent to the "optimisation" phase, which I think would take the form of a *deobfuscation* phase in a decompiler. In other words I think "deobfuscating decompiler" would be the parallel to an optimising compiler. This isn't some kind of established term, though!)
2. Or at least one person on [the EXETOOLS forum](https://forum.exetools.com/showthread.php?t=18028) thinks so. I think by virtue of being the *only one* you could probably get people to buy a *good* deobfuscator if you make it well known enough!