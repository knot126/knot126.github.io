Byte Packing
============

``knPack(type, value)``
-----------------------

Convert the given ``value`` into the given ``type``, then return its
representation as bytes. The endianness is always that of the host
processor, which is always little endian for all of KnShim's supported
architectures. This is most useful with ``knPatch()``.

The ``type`` is one of the following strings:

- ``float``: single precision (32 bit) floating point number
- ``double``: double precision (64 bit) floating point number
- ``char`` or ``bool``: a single 8-bit byte
- ``short``: a 16-bit signed integer
- ``int``: a 32-bit signed integer
- ``long``: eight 64-bit signed integer

The ``value`` may be any Lua value, though only some will convert in a
sensible manner.

``knUnpack(type, data)``
------------------------

Essentially the reverse of ``knPack()``, taking data bytes and
converting it to a number or integer value.
