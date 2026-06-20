Raw Input
=========

The input module allows retrieving information about input events, like
taps on the screen, directly from the input manager. This is especially
useful if you want to implement your own UI elements where the game's
current input handling is too limiting.

``QiInput`` can handle up to 32 touch events at once, though most
devices cannot reach this limit. Each event is assigned an index from 0
to 31, with new events (e.g. new touches) taking the lowest available
index.

If you want to handle more than once touch at a time, it is your job to
check if each possible index (0 to 31) contains a valid touch event as
there is no precise way to query which indexes have currently valid
touch events without using ``knHasTouch()``.

Otherwise if just want to use the most recent touch at index zero, you
can exclude the ``index`` argument for every function call and it will
default to zero. All built-in UI elements do this.

.. function:: knGetTouchCount()

   Get the number of touches. May not correspond with the maximum touch
   index.

.. function:: knHasTouch([index])

   Check if a valid touch exists at the given ``index``. Returns ``true``
   if so, or ``false`` if not.

.. function:: knGetTouchPos([index])

   Returns the x and y position of the touch in screen coordinates. Note
   that these may not always line up with the virtual in-game coordinates.

   Example:

   .. code:: lua

      local x, y = knGetTouchPos(0)

.. function:: knWasTouchPressed([index])

   Return ``true`` if the touch at the given index was *just* pressed and
   ``false`` otherwise. This will only happen once per touch at the very
   start of the touch.

.. function:: knWasTouchReleased([index])

   **Currently broken and always returns ``false``**, but should(?) return
   ``true`` if the touch at the given index was just released and ``false``
   otherwise. This will only happen once per touch at the very end of the
   touch.
