Patching
========

The patching functions provide a way to apply patches to the game at
runtime. Keep in mind that using this module meaningfully requires some
knowledge of low level programming.

.. seealso::
   
   `Amethyst Patcher <https://sites.google.com/view/smashhitlab/documentation/tools/amethyst-patcher>`_
      Provides several useful patches that can be enabled at runtime

.. function:: knPatch(address: address, bytes: string): string

   Patch bytes at the given address at runtime.

   This function returns a string representing the original bytes before
   patching. They can be passed back to another knPatch call to revert the
   patch.
   
   This function may raise errors.

   As an example, the following patch disables responding to hits by returning
   from ``Level::hitSomething()`` as soon as it is called on both 32 and 64 bit
   ARM.

   .. code:: lua

      local architecture = knSystemAbi()

      -- Note: Lua 5.1 does not support hex escapes in string literals, so we must
      -- specify the bytes as decimal escapes.
      if architecture == "arm64-v8a" then
         knPatch(0x71574, "\192\3\95\214") -- c0 03 5f d6   = arm64 ret instruction
      elseif architecture == "armeabi-v7a" then
         knPatch(0x5b8a0, "\30\255\47\225") -- 1e ff 2f e1   = arm32 bx lr instruction
      end
   
   .. version-changed:: 19
      
      knPatch() now returns the bytes before patching; previously it had no return value
   
   .. version-added:: 14

.. function:: knPeek(address: address, size: integer): string
   
   Peek the bytes at the given location, which can be a symbol name (when it's
   a string), a virtual address (when it's an integer), or a raw address
   (when it's a light userdata, likely attained from :func:`knUnpack()`).
   
   Returns the data as a string.
   
   .. version-added:: 19

.. function:: knAddress(base: address, [offset: integer ...]): lightuserdata
   
   Return a lightuserdata for a (mostly) arbitrary address. The base
   address may be either a number (interpreted as an offset from the start
   of the binary) or a string (interpreted as a symbol name). This is the
   initial address that any offsets will work with.
   
   For each offset (an integer), the current base address is dereferenced as a
   pointer, which is used as the new base address, then the offset is added to
   the new base address. This happens in the order the offsets were passed to
   the function.
   
   For example, this:
   
   .. code:: lua
      
      knAddress("gGame", 0x60, 0x8bc)
   
   is similar to writing:
   
   .. code:: c
      
      (void *)(*((void **)(*(void **)YipLookupSymbol("gGame")) + 0x60) + 0x8bc)
      // Can imagine as: &gGame->0x60->0x8bc
   
   in C.
   
   Note that if no offsets are given, this returns the value associated with the
   base address.

About the Address Type
----------------------

Parameters of the ``address`` type can actually be an integer, string, or
lightuserdata and are interpreted in the following way, depending on the actual
type passed to the function:

- ``integer``: Interprets this as an offset relative to the base address at
  which the game was loaded. For Smash Hit, you can think of this as the offset
  relative to the start of the main game binary.
- ``string``: Uses the address of the given symbol.
- ``lightuserdata``: Uses the value of the lightuserdata itself.
