=====================
Writing Lua Functions
=====================

The primary component of KatieLib is all of the new scripting functions you get
when it is installed. This document contains some notes on making them.

Lua Upgrade Quirks
==================

KatieLib is capable of optionally upgrading Lua to version 5.3.6. This is done
by detouring every Lua API function to redirect to a corresponding shim function
so that the Lua 5.1 API can be translated to Lua 5.3.

As a result, most Lua functions should be written against the Lua 5.1 API and
not the 5.3 API.

Helper Macros
=============

There are a few helper macros available.

.. c:macro:: knRegisterFunc(L, FUNC)
   
   Given a Lua state L and a Lua C function FUNC, this registers the given
   function with the same name as that of the function's C name.

.. c:macro:: knLuaPushEnum(L, ENUMERATOR)
   
   Given a Lua state and an enum value, this sets a variable named after the
   enumerator with the value of the enumerator itself. Basically, it makes the
   enumerator available in Lua.
