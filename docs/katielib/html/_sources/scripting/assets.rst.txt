======
Assets
======

.. function:: knLoadAsset(resPath: string): string | nil

   Load the contents of an asset from the APK’s assets directory.

   This uses Smash Hit's asset manager, so filenames transparently have ``.mp3``
   appended when loading from the APK, localised assets are loaded automatically,
   ``.gz.mp3`` files are automatically decompressed, and ``user://`` and
   ``http://`` paths are also valid. Note that this now requires excluding the
   ``.mp3`` for files loaded from the APK assets, whereas in r12 they were
   allowed.

   Returns the contents of the asset as a string, or ``nil`` if the asset
   could not be loaded.

.. function:: knListAssetDir(path: string): table[string]

   Return a table with a list of filenames that would be returned by
   `AAssetDir_getNextFileName() <https://developer.android.com/ndk/reference/group/asset#aassetdir_getnextfilename>`__
   on a directory opened with
   `AAssetManager_openDir() <https://developer.android.com/ndk/reference/group/asset#aassetmanager_opendir>`__
   using ``path`` as the path. This essentially lists folders in the asset
   directory of the APK, and it is not aware of overlays or the resource
   manager. It will always use the real asset directory's contents.

   Raises an error when any error is encountered.

   .. version-added:: 17
      
