Dynamic Reload (*Smash Hit*)
============================

.. function:: knReload()

   If on the main menu, this reloads the main menu on the next frame. The
   main menu script will continue to run as normal until then.

   If in a level, this is nearly equivalent to ``mgCommand("level.restart")``.

.. function:: knLoadTemplates(): boolean

   Reloads ``templates.xml``. Returns ``true`` on success.

.. function:: knLoadGfx()

   Reloads most static textures and shaders. It should be noted that this
   will cause a short freeze on most devices as textures and shaders are
   reloaded (may be long on older or weaker devices).
