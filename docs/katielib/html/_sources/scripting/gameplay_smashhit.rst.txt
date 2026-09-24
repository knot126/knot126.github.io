Gameplay (*Smash Hit*)
======================

.. function:: knLevelHitSomething([player: integer])

   Causes the player to crash and loose balls.

.. function:: knLevelStreakAbort([player: integer])

   Aborts the player’s streak "properly", e.g. plays the sound in addition
   to dropping the streak.

.. function:: knLevelStreakInc([player: integer])

   Increments the player’s streak "properly", playing sounds and giving any
   relevant achievements.

.. function:: knLevelAddScore(score: integer, [player: integer])

   Adds balls to the player "properly", playing sounds and giving any
   relevant achievements.

.. function:: knShoot(x: number, y: number, force: number, _unk: boolean, [player: integer])
   
   Shoot a ball from the given x and y coordinates on the screen.
   
   :param x: X pixel coordinate on the screen to shoot from
   :param y: Y pixel coordinate on the screen to shoot from
   :param force: The force with which to shoot the ball. This is always :code:`20.0` in the base game.
   :param _unk: Boolean with unknown function. This is seemingly always :code:`true` in the base game.
   :param player: Player ID
   
   .. note:: It's a good idea to look at ``Level::handleInput()`` to see how the vanilla game uses this function.

Player Parameter
----------------

When functions take a player parameter, it can be one of the following values:

- ``-1``: The singleplayer player
- ``0``: Player on the left
- ``1``: Player on the right

.. version-changed:: 22
   
   The player parameter now defaults to :code:`-1`. Before it was undefined and
   defaulted to :code:`0` as a result.
