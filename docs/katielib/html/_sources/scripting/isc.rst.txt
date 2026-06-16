Inter-script Communication
==========================

Inter-script communication (ISC) allows scripts to communicate with each
other, mainly by calling functions in the scripts themselves. It can
also be used as a more powerful and intuitive alternative to the
registry.

``knCall(script, function, [...])``
-----------------------------------

Call a function in another script, returning its result. The ``script``
should either be one of ``KN_MENU``, ``KN_MOVIE``, ``KN_HUD``, or a
pointer to a script's ``lua_State`` as a light userdata. The
``function`` should be a string naming the function to call. The
arguments that will be passed to the function should follow.

If there is an error, it will be raised as a Lua error. This includes an
invalid script being specified, the scene containing the target script
not being loaded, the function not being found, and the called function
itself raising its own error.

There are some notable caveats to the current implementation:

- Integers will be cast to floats due to Lua not exposing any way of
  telling the difference between an integer and a number.
- Values of the types ``function``, ``userdata``, and ``thread`` cannot
  be copied between scripts and will be replaced by **``nil``**.

Example
~~~~~~~

In ``hud/main.lua``:

.. code:: lua
   :number-lines:

   function addPoints(pts)
       points = points + pts
       return points
   end

In ``obstacles/customtop.lua``:

.. code:: lua
   :number-lines:

   function tick()
       if not mgIsCleared() then
           if mgBodyIsBroken(body) then
               local points = knCall(KN_HUD, "addPoints", 3)
           end
       end
   end

*Added in Release 18*

``knOwnHandle()``
-----------------

Returns a pointer to the script's ``lua_State`` pointer as a light
userdata. This is useful for informing "master" scripts like the menu or
HUD of room and obstacle scripts via ``knCall()``, so that they
themselves can use knCall to call directly into your script; for
example:

.. code:: lua
   :number-lines:

   -- Assume that informCreated(script) and informDestroyed(script) tell the HUD
   -- script that these obstacle/room scripts have been created and destroyed,
   -- respectively.

   -- In obstacle/myobstacle.lua
   function init()
       knCall(KN_HUD, "informCreated", knOwnHandle())
   end

   function shutdown()
       knCall(KN_HUD, "informDestroyed", knOwnHandle())
   end

   function isCleared()
       return mgIsCleared()
   end

   -- In hud/main.lua
   function draw()
       -- ... maybe in a loop ...
       if knCall(obstacle, "isCleared") then
           -- ... do something interesting! ...
       end
   end
