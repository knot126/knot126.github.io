====================
Cheats (*Smash Hit*)
====================

Provides various cheats which are useful for debugging.

Balls
=====

.. function:: knSetBalls(balls: integer)

   Set the player’s number of balls to ``balls``.

   For example, to set the player’s number of balls to 100:

   .. code:: lua

      knSetBalls(100)

.. function:: knGetBalls(): integer

   Gets the current number of balls. This is different from using mgGet(),
   since it is updated even if you use knSetBalls().

Streak
======

.. function:: knSetStreak(streak: integer)

   Set the player’s streak.

   For example, to set a four-ball multiball plus halfway to a five-ball
   multiball:

   .. code:: lua

      knSetStreak(35)

.. function:: knGetStreak(): integer

   Gets the current streak. This is different from using mgGet(), since it
   is updated even if you use knSetStreak().

No-clip
=======

.. function:: knSetNoclip(mode: boolean)

   If mode is ``true``, then the noclip cheat is enabled if not already
   enabled. If mode is ``false``, then noclip is disabled if not already
   disabled.

.. function:: knGetNoclip(): boolean

   Return ``true`` if currently in noclip mode, or ``false`` otherwise.
