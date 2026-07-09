Gameplay (*Smash Hit*)
======================

.. function:: knLevelHitSomething([player: integer])

   Causes the player to crash and loose balls.

.. function:: knLevelStreakAbort([player: integer])

   Aborts the player’s streak “properly”, e.g. plays the sound in addition
   to dropping the streak.

.. function:: knLevelStreakInc([player: integer])

   Increments the player’s streak “properly”, playing sounds and giving any
   relevant achievements.

.. function:: knLevelAddScore(score: integer, [player: integer])

   Adds balls to the player “properly”, playing sounds and giving any
   relevant achievements.
