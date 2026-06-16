========
Registry
========

The registry is functionally similar to ``mgSet`` and ``mgGet`` but you
are able to write any values you want.

.. function:: knRegSet(key: string, value: string): boolean

   Writes or replaces the value assocaited with ``key`` with the given
   value. Returns boolean indicating success.

.. function:: knRegGet(key: string): string

   Get the value assocaited with ``key`` from the registry.

.. function:: knRegHas(key: string): boolean

   Checks if the registry has a given key. Return ``true`` if there is a
   value assocaited with the given ``key``, otherwise return ``false``.

.. function:: knRegDelete(key: string)

   Removes a given key-value pair from the registry, when given its key.

.. function:: knRegKeys(): table[string]

   Returns an array-like table containing all of the keys in the registry.
