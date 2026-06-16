=====
Files
=====

KatieLib provides a few extra functions to make working with files
easier.

It should be noted that there are two different kinds of paths used
throughout the shim: *physical file system paths* and *asset manager
paths*.

Physical paths refer to files on the actual filesystem of the device and
should almost always be absolute; they cannot access the APK's asset
directory normally, since those files are actually kept in a stillZIP'd
copy of the APK on the device. Generally speaking, most modules work
with physical paths unless otherwise noted.

Asset manager paths refer to paths passed to the resource manager, where
they are typically relative to the APK's asset directory (though can
also access internal data via ``user://`` paths, or load resources over
HTTP using ``http://`` paths).

.. function:: knWriteFile(path: string, content: string): true

   Write a file with the given contents, which may contain embedded zeros.

   .. version-changed:: 18
      Raises a lua error on any failure, and for legacy reasons returns
      ``true`` to indicate success.

.. function:: knReadFile(path: string): string | nil

   Read the contents of the given file. Returns a string with the contents
   on success, even if the file is empty, or ``nil`` on failure to open
   the file.
   
   .. version-changed:: 18
      Other kinds of failures (like memory allocation and I/O errors) raise Lua
      errors instead of returning ``nil``.

.. function:: knRenameFile(oldPath: string, newPath: string): boolean

   Renames the file at ``oldPath`` to ``newPath``, moving the file if
   needed. Returns ``true`` on success and ``false`` on failure.

.. function:: knDeleteFile(path: string): boolean

   Deletes the file at the given path. Returns ``true`` on success and
   ``false`` on failure.

.. function:: knIsFile(path: string): boolean

   Check if the file at the given path exists and can be read. Returns
   ``true`` if so, or ``false`` if not.

.. function:: knMakeDir(path: string): boolean

   Creates the directory at ``path`` using ``mkdir(path, 0777)``. Returns
   ``true`` on success, ``false`` on failure. Note that if the
   directory already exists, this will return ``false``.

.. function:: knListDir(path: string): table

   Return a list of file names in the directory as a table, not including
   the special entries ``.`` and ``..``.

.. function:: knIsDir(path: string): boolean

   Check if the file system node at ``path`` is a directory and is
   readable. Return ``true`` if it is and ``false`` if it is not.
