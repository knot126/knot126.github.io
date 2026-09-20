Raw Input
#########

The input module allows retrieving information about input events, like
taps on the screen, directly from the input manager. This is especially
useful if you want to implement your own UI elements where the game's
current input handling is too limiting.

Touch
=====

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

.. function:: knGetTouchCount(): integer

   Get the number of touches. May not correspond with the maximum touch
   index.

.. function:: knHasTouch([index]): boolean

   Check if a valid touch exists at the given ``index``. Returns ``true``
   if so, or ``false`` if not.

.. function:: knGetTouchPos([index]): integer, integer

   Returns the x and y position of the touch in screen coordinates. Note
   that these may not always line up with the virtual in-game coordinates.

   Example:

   .. code:: lua

      local x, y = knGetTouchPos(0)

.. function:: knWasTouchPressed([index]): boolean

   Return ``true`` if the touch at the given index was *just* pressed and
   ``false`` otherwise. This will only happen once per touch at the very
   start of the touch.

.. function:: knWasTouchReleased([index]): boolean

   **Currently broken and always returns ``false``**, but should(?) return
   ``true`` if the touch at the given index was just released and ``false``
   otherwise. This will only happen once per touch at the very end of the
   touch.

Keyboard
========

``QiInput``'s keyboard support is rather limited. It can detect key up and key
down events, as well as use them to check if a key was pressed once, but doesn't
do much more, and has virtually no support for keyboard layouts outside of those
based on QWERTY.

Key codes are given as the ASCII characters those keys represent, with a few
extra codes for various command and modifier keys. The currently implemented
extra key codes are:

======== ================
Key Code Key
======== ================
0x100    Escape
0x101    Backspace
0x102    Delete
0x103    Tab
0x107    Up Arrow
0x108    Down Arrow
0x109    Left Arrow
0x10a    Right Arrow
0x10b    Control (either)
0x10c    Home
0x10d    End
======== ================

Many of the alphanumeric keys are implemented but they assume a QWERTY keyboard
layout so may not behave as expected, especially when :kbd:`Shift` is involved.

.. function:: knIsKeyDown(key: string | integer): boolean
   
   Return ``true`` if the given key is currently down, or ``false`` if it isn't. For example:
   
   .. code:: lua
   
      if knIsKeyDown('a') then
          mgSetText(someText, "Key is being held!")
      else
          mgSetText(someText, "Key is up.")
      end

.. function:: knWasKeyPressed(key: string | integer): boolean

   Return ``true`` if the given key has been initally pressed, or ``false`` if it has't.

.. function:: knWasKeyReleased(key: string | integer): boolean

   Return ``true`` if the given key was just released, or ``false`` if it was't.

Mouse
=====

Mouse support only includes checking the position of the mouse.

.. function:: knGetMousePos(): integer, integer

   Return the ``x`` and ``y`` position of a physical mouse.
   
   .. warning:: When the mouse is in relative mode, this function will continue to return the delta from the last mouse input event, which is never completely zero even if the mouse isn't moving. Using :func:`knGetMouseDelta` gives the result you probably expect.

.. function:: knGetMouseDelta(): integer, integer

   When the mouse is in relative mode, this gets the total movement of the mouse
   in the ``x`` and ``y`` directions since this function was last called.
   
   .. warning::
         
       - This function only produces sane results when in relative mode - that
         is, after a successful call to :func:`knCaptureMouse`.
       - This function can usually only be called once per frame. After that, it
         will return 0, 0 until more mouse movements occur.

.. function:: knCaptureMouse(capture: boolean)
   
   If possible, "capture" the mouse and turn it to relative mode. This is useful
   for implementing free looking, first person cameras that can be moved around
   with the mouse.
   
   It is recommended to call this every frame with ``true`` when you want the
   mouse locked and ``false`` when you wish for it to be unlocked:
   
   .. code:: lua
      
      -- In the HUD
      function draw()
          knCaptureMouse(true)
          
          -- ...
      end
      
      -- In the menu
      function draw()
          knCaptureMouse(false)
          
          -- ...
      end

Buttons
=======

``QiInput`` has support for the generic concept of buttons, which are either
mouse buttons or buttons on a game controller.

The following button IDs are most notable:

==== ====================
 ID   Name 
==== ====================
1    Primary Mouse Button
==== ====================

.. note:: Buttons are currently not implemented but should be easy to provide an
   API for.
