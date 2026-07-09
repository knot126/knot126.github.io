Byte Packing
============

.. function:: knPack(type: string, value: number): string

   Convert the given ``value`` into the given ``type``, then return its
   representation as bytes. The endianness is always that of the host
   processor, which is always little endian for all of KnShim's supported
   architectures. This is most useful with :func:`knPatch()`.

   The ``type`` is one of the following strings:

   - ``float``: single precision (32 bit) floating point number
   - ``double``: double precision (64 bit) floating point number
   - ``char`` or ``bool``: a single 8-bit byte
   - ``short``: a 16-bit signed integer
   - ``int``: a 32-bit signed integer
   - ``long``: a 64-bit signed integer
   - ``pointer``: a pointer, size depending on platform

   The ``value`` may be any Lua value, though only some will convert in a
   sensible manner. One notable example is pointers, which take only a light
   userdata as their input.
   
   .. version-added:: 19
      
      Pointers

.. function:: knUnpack(type: string, data: string): number

   Essentially the reverse of :func:`knPack`, taking data bytes and
   converting it to a number or integer value.
   
   .. version-added:: 19

.. function:: knHexToBin(hexdata: string): string
   
   Convert a string of hexidecimal digits representing bytes to a string of
   those bytes. Non-hexdigit characters in the string (e.g. anything that is
   not ``0``-``9``, ``a``-``f`` or ``A``-``F``) are ignored.
   
   As an example, this converts a string representing the AArch64 ret
   instruction into the raw bytes and returns it:
   
   .. code:: lua
      
      local ret = knHexToBin("c0 03 5f d6")
   
   .. tip::
   
      You can create an alias of this function and use Lua's special single-string-argument
      call syntax to create an elegant way of writing hex data:
      
      .. code:: lua
         
         hex = knHexToBin
         local ret = hex "c0 03 5f d6"
   
   .. version-added:: 20

.. function:: knBinToHex(data: string): string
   
   Converts binary data into a string of hexdigits. This string does not contain
   any extranious characters for formatting, like spaces or tabs.
   
   The result of this function is suitable to be passed back into
   :func:`knHexToBin` to retrieve the same data again.
   
   .. version-added:: 20
