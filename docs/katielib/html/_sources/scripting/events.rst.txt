Events
======

Unlike other APIs, events are special functions that *you* define inside of
``menu/main.lua`` and ``hud/main.lua``, which are called when various
corresponding events happen in game, such as a frame starting or ending.

If the player is playing a level, then the HUD script will recieve all events.
Otherwise, the main menu script is used, since that will usually always be loaded.

Many functions can return a boolean indicating if the normal call to the
function should be cancelled so that it is no longer called. This makes it
possible to bypass normally hard-coded behaviour.

.. function:: onFrameStart()
   
   Called *before* any call to ``Game::frame()``.

.. function:: onFrameEnd()
   
   Called *after* any call to ``Game::frame()``.

.. function:: onHandleInput(): boolean
   
   Called *before* any call to ``Level::handleInput()``. When this function
   returns ``true`` (or any truthy value), the call to ``Level::handleInput()``
   is cancelled and only the behaviour in your custom function is run.
   
   :returns: A boolean indicating if the call to ``Level::handleInput()``
             should be cancelled
