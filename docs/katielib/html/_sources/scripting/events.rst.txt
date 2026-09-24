Events
======

Unlike other APIs, events are special functions that *you* define inside of
``menu/main.lua`` and ``hud/main.lua``, which are called when various
corresponding events happen in game, such as a frame starting or ending.

If the player is playing a level, then the HUD script will recieve all events.
Otherwise, the main menu script is used, since that will usually always be loaded.

Many functions can return a boolean indicating if the normal call to the
function should be cancelled so that it is no longer called. For example, when
returning ``true`` (or any truthy value) from ``onHitSomething``, the call to
``Level::hitSomething()`` that would normally be done after your event handler
is not made.

.. function:: onFrameStart()
   
   Called *before* any call to ``Game::frame()``.

.. function:: onFrameEnd()
   
   Called *after* any call to ``Game::frame()``.

.. function:: onHandleInput(): boolean
   
   Called *before* any call to ``Level::handleInput()``.
   
   :returns: A boolean indicating if the call to ``Level::handleInput()``
             should be cancelled

.. function:: onHitSomething(playerId: integer): boolean
   
   Called *before* any call to ``Level::hitSomething()``, which is called on
   every frame the player intersects with an obstacle.
   
   :param playerId: Relevant player ID
   :returns: A boolean indicating if the call to ``Level::hitSomething()``
             should be cancelled

.. function:: onStreakInc(playerId: integer): boolean

   Called *before* any call to ``Level::streakInc()``, which is called whenever
   the player hits a crystal.
   
   :param playerId: Relevant player ID
   :returns: A boolean indicating if the call to ``Level::streakInc()``
             should be cancelled

.. function:: onStreakAbort(playerId: integer): boolean

   Called *before* any call to ``Level::streakAbort()``, which is called any
   time the current streak needs to be reset to zero (such as on crashing).
   
   :param playerId: Relevant player ID
   :returns: A boolean indicating if the call to ``Level::streakAbort()``
             should be cancelled

.. function:: onEnterRoom(type: string)
   
   Called *before* any call to ``Level::enterRoom()``, which is called when
   entering a room.
   
   :param type: Type of the room (e.g. ``cave/narrow``)
