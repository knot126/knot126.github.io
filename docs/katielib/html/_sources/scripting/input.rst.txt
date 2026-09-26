Raw Input
#########

The input module allows retrieving information about input events, like
taps on the screen, directly from the input manager. This is especially
useful if you want to implement your own UI elements where the game's
current input handling is too limiting.

.. version-changed:: 22
   
   Added input simulation, keyboard, mouse, and button support

.. note::
   
   Input simulation functions should be called from :func:`onFrameStart` so that
   the input is present for the full frame. Calling from the normal ``draw()`` or
   ``frame()`` functions is unlikely to give good results.

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

========================= =====
Key                       ID
========================= =====
``KN_KEY_ESCAPE``         0x100
``KN_KEY_BACKSPACE``      0x101
``KN_KEY_DELETE``         0x102
``KN_KEY_TAB``            0x103
``KN_KEY_ALT``            0x104
``KN_KEY_SHIFT``          0x105
``KN_KEY_META``           0x106
``KN_KEY_UP_ARROW``       0x107
``KN_KEY_DOWN_ARROW``     0x108
``KN_KEY_LEFT_ARROW``     0x109
``KN_KEY_RIGHT_ARROW``    0x10a
``KN_KEY_CONTROL``        0x10b
``KN_KEY_HOME``           0x10c
``KN_KEY_END``            0x10d
``KN_KEY_MENU``           0x10e
========================= =====

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

.. function:: knRegisterKeyDown(key: string | integer)

   Simulate the start of a key press.
   
.. function:: knRegisterKeyUp(key: string | integer)
   
   Simulate the end of a key press.


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
       - This function can only be called once per frame. After that, it will
         return 0, 0 until more mouse movements occur.

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

==== ===================== ====================
 ID   Enum                 Name 
==== ===================== ====================
1    ``KN_BUTTON_PRIMARY`` Primary Mouse Button
==== ===================== ====================

.. function:: knIsButtonDown(button: integer): boolean
   
   Check if the given button is currently being held.

.. function:: knWasButtonPressed(button: integer): boolean
   
   Check if the button was just pressed.

.. function:: knWasButtonReleased(button: integer): boolean
   
   Check if the button was just released.

.. function:: knRegisterButtonDown(button: integer)

   Simulate the start of a button press.

.. function:: knRegisterButtonUp(button: integer)

   Simulate the end of a button press.
   
