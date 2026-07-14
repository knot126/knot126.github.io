=============================
General Changes and Additions
=============================

KatieLib makes some (largely non-breaking) changes to the game's scripting API,
mostly to make it easier to work with.

Upgrade to Lua 5.3
==================

KatieLib upgrades the version of Lua used in Smash Hit to version 5.3.6. This
brings several great quality of life updates for script writers, like bitwise
operators and real integers. While it is a little rough around the edges
technically speaking, almost any script that was working with the built-in
version 5.1.4 will continue work in the new version. (However, tweaks may be
needed.)

If you need to, you can still keep using the built-in version of Lua by deleting
``liblua.so`` from your APK.

------------
Known Issues
------------

The upgrade to Lua 5.3 may break some custom scripts:

- The separation of floating point numbers from integers can cause issues. For
  example, putting a number in the registry (which converts it to a string)
  then converting it using ``tonumber()`` can now result in a number that, when
  converted back to a string, has an extra ``.0`` appended to it. This
  could, for example, manifest by displaying an extra ``0`` at the end of
  number when output to a text object (since Smash Hit is not able to display
  the ``.`` with 4x4 fonts). The solution is to replace all uses of
  ``tonumber()`` with ``math.tointeger()`` when working with integers.

``shutdown()`` function
=======================

KatieLib automatically calls the ``shutdown()`` function on script destruction,
allowing you to easily detect when scripts are being deallocated:

.. code:: lua
   
   -- In an obstacle, for example
   function shutdown()
      knLog("The obstacle is being destroyed!")
   end
