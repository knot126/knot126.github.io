Overlays
========

Overlays allow loading asset files from ZIP archives, folders, and Lua
callbacks. Conceptually, it is overlaying the assets in the assets directory
with assets from these other sources. It is a form of `union
mount <https://en.wikipedia.org/wiki/Union_mount>`__.

This is mainly used in new versions of Shatter Client to provide a
cleaner overall implementation (no need for actually modifying rooms and
segments) and support certain types of assets which don't load using the
standard resource manager (like streamed music), although it is useful in
various scenarios.

   **Possible planned features**: Support for manipulating the APK
   assets directory as if it were an overlay itself and changing
   precedence order without being restricted by a stack.

How Overlays Work
-----------------

When the game tries to load an asset with overlays active, the overlay subsystem
starts by trying to load the asset in each mounted overlay, starting with the
most recently added overlay and proceeding to the last. It does this until
it finds an overlay that can load the asset, in which case the data that the
overlay returns for that asset is used as the asset's data.

If no overlays can load and asset, it will be loaded normally from the APK.

Example: ZIP overlays
---------------------

For example, if you mount a zip file ``forest.zip`` which has a level:

::

   forest.zip
       levels/
           forest.xml
       rooms/
           forest.lua
       segments/
           forest.xml

then playing the level ``forest`` will load from the ZIP file.

If a segment then depends on an obstacle like ``scoretop``, but it is
not in the ZIP file, then it is loaded from the mod’s assets directory.

.. function:: knPushOverlay(type: string, ...): boolean

    Create a new overlay and push it to the top of the overlay stack.
    Returns **true** when the overlay is created successfully and
    **false** otherwise. The ``type`` determines the kind of overlay
    that will be created and the parameters given to it:

    .. function:: knPushOverlay("directory", path: string)

        Creates an overlay from a physical file system directory, where ``path``
        is the path to the directory to use. For example:

        .. code:: lua

            knPushOverlay("directory", knGetInternalDataPath() .. "/generated")

        Paths will not be sanitised, so upper directories can still be accessed
        using ``..``.

    .. function:: knPushOverlay("zip", zipFile: string, [options: table])

        Creates an overlay from a ZIP file on the physical file system, where
        ``zipFile`` is the name of the ZIP file to use.

        .. code:: lua

            knPushOverlay("zip", knGetInternalDataPath() .. "/mylevel.zip")

        Assets will load from the root of the ZIP. File names should not have
        the ``.mp3`` suffix, as it is stripped before attempting to load the
        file. File names are case sensitive.

        The ``options`` are expressed in a table containing any of these fields,
        all of which are optional:

        - ``prefix``: String prepended to the path before trying to load it
        - ``suffix``: String appended to the path before trying to load it

        .. version-changed:: 19
           
            Added the ``options`` argument and the ability to specify a prefix and suffix

    .. function:: knPushOverlay("apk", apkFile: string)

        This is equivalent to
        ``knPushOverlay("zip", apkFile, {prefix="assets/", suffix=".mp3"})`` and
        is meant for using asset dirs from other Smash Hit APKs at load time.

        .. version-added:: 19

    .. function:: knPushOverlay("callback", functionName: string)

        Creates an overlay which uses a callback function in the main menu
        script to dynamically generate asset data. Note that ``functionName``
        should be a string; the callback function cannot be passed directly.

        The named function should take the path to load as its only argument,
        and it should return either a string representing the asset data or
        ``nil`` if the asset should not be loaded from this function.
        Stated more compactly, its type is
        ``function(path: string): string | nil``.

        Examples
        ^^^^^^^^

        Example #1: Dynamically generate ``buttonN.xml`` files

        In ``menu/main.lua``:

        .. code:: lua

            knPushOverlay("callback", "generateMenuButton")

            function generateMenuButton(path)
                if string.match(path, "menu/button%d+%.xml%.mp3") ~= nil then
                    local start, stop, n = string.find(path, "(%d+)")
                    
                    return [[<ui texture="button.png" selected="button_select.png">     
                        <rect coords="0 0 294 384" cmd="script:level ]] .. tostring(tonumber(n) - 1) .. [["/>
                    </ui>]]
                else
                    return nil
                end
            end

        Example #2: Implement a cheap Data URI

        In ``menu/main.lua``:

        .. code:: lua

            knPushOverlay("callback", "knockoffDataUri")

            function knockoffDataUri(path)
                if string.match(path, "^data:") ~= nil then
                    return string.sub(path, #"data:" + 1)
                else
                    return nil
                end
            end

    .. version-added:: 14

.. function:: knPopOverlay()

    Pop the most recently mounted overlay off of the stack, unmounting it.

    .. version-added:: 14
