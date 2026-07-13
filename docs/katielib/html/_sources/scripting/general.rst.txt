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
version 5.1.4 will continue work in the new version.

If you need to, you can still keep using the built-in version of Lua by deleting
``liblua.so`` from your APK.

``shutdown()`` function
=======================

KatieLib automatically calls the ``shutdown()`` function on script destruction,
allowing you to easily detect when scripts are being deallocated:

.. code:: lua
   
   -- In an obstacle, for example
   function shutdown()
      knLog("The obstacle is being destroyed!")
   end
