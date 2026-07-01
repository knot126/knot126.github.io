Patching
========

The patching functions provide a way to apply patches to the game at
runtime. Keep in mind that using this module meaningfully requires some
knowledge of low level programming.

.. seealso::
   
   `Athemyst Patcher <https://sites.google.com/view/smashhitlab/documentation/tools/amethyst-patcher>`_
      Provides several useful patches that can be enabled at runtime

.. function:: knPatch(virtualAddress: integer, bytes: string): string

   Patch bytes at the given virtual address (offset from the start of the
   first ELF section, and in the case of Smash Hit, the start of the file)
   at runtime.

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
