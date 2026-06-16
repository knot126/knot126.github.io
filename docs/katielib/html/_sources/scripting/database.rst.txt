========
Database
========

The database is essentially the same as the registry, except it is saved
across restarts of the game. It is suitable for things like custom save
data.

The database saves all data to a file named ``database.kn`` in the user
data folder.

If you do not need values to persist between game restarts, use the
registry instead.

.. function:: knDbSet(key: string, value: string): boolean

   Create a mapping from the ``key`` to the ``value``, and save the
   database.

   Returns ``true`` if the mapping was created and the database was saved,
   or ``false`` if either the mapping was not created or the database was
   not saved successfully.

.. function:: knDbGet(key: string): string

   Return the value associated with the key.

.. function:: knDbHas(key: string): boolean

   Return ``true`` if there is a mapping of the given key in the database,
   or ``false`` if there is not.

.. function:: knDbDelete(key: string): boolean

   Delete the mapping associated with the key, and save the database.

   Returns ``true`` if the database was saved successfully, or ``false`` if
   it was not.

.. function:: knDbKeys(): table[string]

   Returns an array like table containing a list of all keys currently in
   the database.
   
   .. version-added:: 19

.. function:: knDbBeginTransaction()

   Temporarily stops writing the database to disk until ``knDbCommit()`` is
   called. This is useful to optimise writing lots of changes to the
   database at once.

   For example:

   .. code:: lua

      knDbBeginTransaction()
      knDbSet("level.1.progress", tostring(level_progress[1]))
      knDbSet("level.2.progress", tostring(level_progress[2]))
      knDbSet("level.3.progress", tostring(level_progress[3]))
      knDbSet("level.4.progress", tostring(level_progress[4]))
      knDbSet("level.5.progress", tostring(level_progress[5]))
      knDbCommit()
   
   .. version-added:: 19
      However, it did exist prior to this as ``knDbTrans()``, albeit disabled

.. function:: knDbCommit(): boolean

   Re-enable writing the database to disk and write the changes made while
   saving was disabled.

   This will additionally ensure that if the program crashes, either all or
   none of the changes made will be written: that is, it cannot have a
   partial state where some new values are written and others are not.
   
   .. version-added:: 19
      However, it did exist prior to this, albeit disabled
