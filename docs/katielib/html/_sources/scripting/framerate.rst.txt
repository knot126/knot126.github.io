Framerate Adjustment (*Smash Hit*)
==================================

.. function:: knGetDeviceHz()

   Get the refresh rate of the device’s default display in hertz.

   .. version-added:: 13

.. function:: knSetFrameRate([frameRate, [sleepTime]])

   Set the target frame rate of the game and adjust the simulation time
   step to compensate.

   With no arguments, ``knSetFrameRate()`` will set the game to run at the
   device’s refresh rate, enabling the game to run on >60Hz devices at full
   framerate without much hard work. You might need to update timers to
   respect the new framerate (e.g. some bosses assume 60 ticks per second).

   If you just want to support >60Hz devices, simply have:

   .. code:: lua

      function load()
         -- ...
         knSetFrameRate()
         -- ...
      end

   in your ``menu/main.lua``.

   With only the first argument, ``knSetFrameRate(fps)`` will set the game
   to target exactly ``fps`` frames per second, setting ``sleeptime`` to be
   ``1/fps``. On devices where ``knGetDeviceHz() < fps``, the game will run
   slower in some places.

   With both arguments, ``knSetFrameRate(fps, sleeptime)`` will set the
   game to run *as if* it were targeting exactly ``fps`` frames per second,
   with the caveat that it will only sleep for ``sleeptime`` seconds if the
   frame finishes rendering early AND the display takes less than
   ``sleeptime`` seconds to update.

   Please note that ``knSetFrameRate(60)`` is **NOT** the same as the
   default, due to the sleepTime being different. If you want to go back to
   defaults dynamically, use ``knSetFrameRate(60, 0.015)``.
