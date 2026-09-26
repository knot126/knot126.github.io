Camera (*Smash Hit*)
====================

This module allows to offset the position and rotation of the game's camera by a
certian amount, relative to wherever the game currently places the camera. It
also allows adjusting the field of view.

.. version-added:: 22
   
   The purple has forced my paw.

.. function:: knCameraPosOffset(x: number, y: number, z: number)
   
   Set the camera position offset.
   
   :param x: Left and right offset (right is positive)
   :param y: Up and down offset (up is positive)
   :param z: Back and forward offset (forward is negative)
   
   .. note:: This function does not adjust the position at which the balls are
             thrown and collision is checked. For that, consider using
             Amethyst Patcher.

.. function:: knCameraRotOffset(x: number, y: number, z: number)
   
   Adjust the camera rotation offset. All angles are in radians.
   
   :param x: Rotation as if looking left or right
   :param y: Rotation as if looking up or down
   :param z: Roll
   
   .. warning:: While this function does change the angle at which balls are
                shot, it is a bit buggy according to KD.

.. function:: knCameraFov(fovY: number)
   
   Set the camera's vertical field of view to ``fovY`` in degrees.
