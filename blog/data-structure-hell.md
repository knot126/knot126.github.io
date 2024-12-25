# Data Structure Hell

Arrays and hash tables are things you often need when programming. When you're language is at least somewhat dynamic (C++) there's usually an obvious way to implement them that's also nice to write, but in C I don't think there's any nice way to write them.

The core of the problem is that C lacks templates, and any implementation using `_Generic` would still likely waste some space.