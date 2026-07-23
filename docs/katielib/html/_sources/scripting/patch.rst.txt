Patching
========

The patching functions provide a way to apply patches to the game at
runtime. Keep in mind that using this module meaningfully requires some
knowledge of low level programming.

.. seealso::
   
   `Amethyst Patcher <https://sites.google.com/view/smashhitlab/documentation/tools/amethyst-patcher>`__
      Provides several useful patches that can be enabled at runtime
   
   `FUTO Ret <https://ret.futo.tech/arm64/>`__
      Provides an in-browser assembler and disassembler for ARM32 and ARM64

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
   
   .. version-changed:: 20
      
      knPatch() now supports symbol names (via strings) and raw addresses (via lightuserdata) in addition to the base address offsets; previously it only supported the latter
   
   .. version-changed:: 19
      
      knPatch() now returns the bytes before patching; previously it always returned ``true``
   
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
   
   .. version-added:: 20

.. function:: knInsertCode(address: address, code: string): string
   
   Inserts the given blob of machine code before the instruction that is being
   pointed to by the address. You can think of this as being similar to
   :func:`knPatch`, but it is able to insert instructions instead of overwriting
   them.
   
   Note that you cannot insert instructions that depend on the value of the
   program counter, nor can you insert at an instruction that is affected by
   the program counter. These instructions most notably include ``adr``,
   ``adrp``, ``ldr`` (only some forms), ``b``, and ``bl``. This restriction may
   be partially or fully lifted in the future, but right now KatieLib makes no
   attempt to make them work like you may expect.
   
   As an example, the following will insert an additional ``mov w1, #0x2``
   instruction into ``Player::setMode()``, just before the game mode variable is
   actually set [#lua53]_:
   
   .. code:: lua
      
      knInsertCode(0x5ace4, "\x41\x00\x80\x52")
   
   This would always force the player into mayhem mode whenever the player
   switches game modes.
   
   This function returns a string that, when passed to :func:`knPatch` with the
   same address at which the code was inserted, reverts the code insertion.
   Further reinsertions and uninsertions can be done with :func:`knPatch` as
   well. This makes insertions undoable in exactly the same ways as regular
   patches.
   
   .. note::
      
      Internally, this function does not actually insert instructions right at
      the given point. Instead, it replaces the instruction at the insertion
      point with a branch to a new block of code. This block of code contains,
      in order:
      
      - Your block of machine code
      - The original instruction that was replaced
      - A branch to the instruction *after* the instruction that was replaced
      
      This is very similar to exploiting an unused piece of code to insert
      instructions by putting the instructions there and jumping to them.
      However, this function allocates a new code block in a new piece of
      memory, so it is not actually overwriting any existing code.
      
      Since no code is overwritten, there is no need to worry about two patches
      from different sources potentially conflicting. As a nice touch, the branch
      instructions are also automatically generated.
   
   .. version-added:: 22

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

.. rubric:: Footnotes

.. [#lua53] This example uses Lua 5.3 features. If you have disabled the upgrade
   to Lua 5.3, you may need to adapt it to Lua 5.1 to get it working.
