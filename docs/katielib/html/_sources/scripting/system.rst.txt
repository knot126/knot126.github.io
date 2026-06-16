System and Misc utilities
=========================

.. function:: knSystemAbi(): string

   Returns the CPU/ABI that this system is using as a string. This is the
   same as what Android considers to be the canonical architecture name.

   ============= ===============
   ABI           Result value
   ============= ===============
   64-bit ARM v8 ``arm64-v8a``
   32-bit ARM v7 ``armeabi-v7a``
   Intel i386    ``x86``
   ============= ===============

.. function:: knGetShimVersion(): string

   **As of r14**: Now returns a string representing the KnShim version.

   **Formerly**: Returned an integer representing the shim release. For
   r13, this was an integer related to the build date. For r12 and lower,
   this was the integer corresponding to the release number.

.. function:: knGetAppVersion(): string

   Get the version name from your APK's package info. Useful for displaying
   the version on the menu or where appropriate.

.. function:: knGetAppSdk(): integer

   Get the target SDK of the app. For 1.4.3 this is 26 by default, but may
   be set higher. If the device is running API level 23 or lower, the
   needed function is not available and this will return -1.

.. function:: knGetDeviceSdk(): integer

   Get the SDK level of the device the game is running on. If the device is
   running API level 23 or lower, this returns -1.

.. function:: knGetInternalDataPath(): string

   Return the absolute path to the internal data directory (where the
   savegames and the like are stored - equivalent to ``user://``) with no
   trailing slash.

.. function:: knGetExternalDataPath(): string

   Return the absolute path to the external data directory. This isn’t used
   for anything in the game but is provided by Android so it’s included for
   completeness.

.. function:: knInclude(path: string): any

   Similar to lua’s ``dofile()`` but loads from the APK’s asset directory.

   Using lua libraries
   ~~~~~~~~~~~~~~~~~~~

   If you have a pure lua library you would like to use with Smash Hit, you
   could download the file, put it in a folder where you keep lua
   libraries, then ``knInclude()`` it.

   For example, let’s say we want to use a JSON parser library with the
   file name ``json.lua``. You could copy that to a file in your assets
   directory called ``lualibs/json.lua.mp3``, then load it with:

   .. code:: lua

      local json = knInclude("lualibs/json.lua")

   If your library is multiple files, you might need to fix up the
   ``require`` calls to use ``knInclude`` and use ``assets``-relative
   paths.

.. function:: knJavaCommand(command: string): string

   Run a command in the java wrapper. These types of commands are typically
   used for stuff that is hard to do in the NDK directly, like getting the
   device model or the package code path.

   Like commands used with ``handleCommand``/``mgCommand``, they are made
   of words separated by whitespace where the first word is the command
   name and the following words are the arguments. They can also return a
   string as a result.

   The following commands are available with an unmodified ``classes.dex``:

   - ``setalwayson`` - called, probably broken
   - ``getosname`` - get the android version
   - ``getmodelname`` - get the model of device
   - ``getdensity`` - get display density
   - ``visisturl <url>`` - open the given url
   - ``getlanguage`` - get the name of the user's language
   - ``quit`` - quit game
   - ``istv`` - return 1 if this is a tv
   - ``storeenabled`` - is playstore enabled?
   - (a lot of other stuff that's mostly boring and broken now that google play is dead)
   - ``gpcp`` - get package code path (path to the apk on real file system)
