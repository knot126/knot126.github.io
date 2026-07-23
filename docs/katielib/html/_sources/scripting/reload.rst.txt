Dynamic Reload (*Smash Hit*)
============================

.. function:: knReload()

   If on the main menu, this reloads the main menu on the next frame. The
   main menu script will continue to run as normal until then.

   If in a level, this is nearly equivalent to ``mgCommand("level.restart")``.

.. function:: knReloadTemplates(): boolean

   Reloads ``templates.xml``. Returns ``true`` on success.
   
   .. version-changed:: 22
      
      Renamed from ``knLoadTemplates``

.. function:: knReloadGfx()

   Reloads most static textures and shaders by calling ``Gfx::load1()`` and
   ``Gfx::load2()``. It should be noted that this will cause a short freeze on
   most devices as textures and shaders are reloaded (which may be very long on
   older or weaker devices).
   
   ``Gfx::load1()`` loads the following:
   
   - All shaders
   - ``effects/default.png``
   - ``gfx/tiles.png``
   - ``gfx/ball.png``
   - ``gfx/bestdistance.png``
   - ``gfx/menu_distance.png``
   - ``gfx/best_menu_distance.png``
   
   ``Gfx::load2()`` loads the following:
   
   - ``gfx/sprites.png``
   - ``gfx/doors.png``
   - ``gfx/metalnormal.jpg``
   - ``gfx/glassnormal.jpg``
   - ``gfx/credits.png``
   - ``gfx/menu_linestart.png``
   - ``gfx/menu_lineend.png``
   - ``gfx/menu_lineglow.png``
   
   .. note::
      
      The game splits loading into steps, and between each step the game will
      draw exactly 10 frames of the loading screen (enough to display a "loading
      dot").
      
      This has two purposes: one is to let the user know the game is loading,
      and the other is to let Android know that the game has not stopped
      responding (since otherwise Android would notice the game hasn't drawn to
      the screen for a while and tell the user the app has stopped responding).
      
      Loading the graphics gets two steps "as a treat" because it often takes
      the most time to load. (For what it's worth, the Audio subsystem also has
      two loading steps, though they take much less time.)
   
   .. version-changed:: 22
      
      Renamed from ``knLoadGfx``

.. function:: knReloadPlayer()

   Reloads ``progress.xml`` from the save directory. This is very useful for
   resetting player stats.
   
   .. version-added:: 22
