Camera (*Smash Hit*)
====================

This module allows to offset the position and rotation of the game's camera by a
certian amount, relative to wherever the game currently places the camera. It
also allows adjusting the field of view.

.. version-added:: 22
   
   The purple has forced my paw.

.. function:: knCameraPos(x: number, y: number, z: number, [absolute: boolean])
   
   Set the camera position, either as an offset or absolutely.
   
   :param x: Left and right (right is positive)
   :param y: Up and down (up is positive)
   :param z: Back and forward (forward is negative)
   :param absolute: Makes this the exact camera position, and not just an
                    offset from the current position the game wants. Default
                    ``false``.
   
   .. note:: This function does not adjust the position at which the balls are
             thrown and collision is checked. For that, consider using
             Amethyst Patcher.

.. function:: knCameraRot(x: number, y: number, z: number, [absolute: boolean])
   
   Adjust the camera rotation, either as an offset or absolutely. All angles are
   in radians.
   
   :param x: Rotation as if looking left or right
   :param y: Rotation as if looking up or down
   :param z: Roll
   :param absolute: Makes this the exact camera rotation, and not just an
                    offset from the current rotation the game wants. Default
                    ``false``.
   
   .. warning:: While this function does change the angle at which balls are
                shot, it is a bit buggy according to KD.

.. function:: knCameraFov(fovY: number)
   
   Set the camera's vertical field of view to ``fovY`` in degrees.
