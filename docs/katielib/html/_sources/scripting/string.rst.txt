================
String Utilities
================

Since Lua's string utilities can be a little over-complicated for some tasks,
KatieLib provides helper functions which make simpler string operations easy.

.. function:: knRemoveSuffix(str: string, suffix: string): string

   If the given suffix occurs at the end of the string, return a string without
   the suffix. Otherwise, return the string as-is.

.. function:: knRemovePrefix(str: string, prefix: string): string
   
   If the given prefix occurs at the start of the string, return a string
   without the prefix. Otherwise, return the string as-is.

.. function:: knSplit(str: string, separator: string, [removeEmpty: boolean], [maxSplit: integer]): table[string]
   
   Split a string by the given separator, returning the pieces in a table.
   
   Setting ``removeEmpty`` to ``true`` will remove the empty strings that occur
   e.g. when the separator appears multiple times in a row or at the start and
   end of a string.
   
   The maximum number of times to split the string before leaving the remaining
   part in the final element can also be set with ``maxSplit``. This is useful
   when you only want to split by the first few instances of a separator and
   leave the rest of the string intact, such as with ``key=value`` pairs that
   allow ``=`` to appear in the value.
   
   When using both ``maxSplit`` and ``removeEmpty``, the empty strings are
   considered **not** to count towards the split total.
   
   Here are some examples that demonstrate various behaviours: 
   
   .. code:: lua
      
      knSplit("This will split by every space!", " ")
         = {"This", "will", "split", "by", "every", "space!"}
      
      knSplit("property=value=thisIsAlsoPartOfTheValue", "=")
         = {"property", "value", "thisIsAlsoPartOfTheValue"}
      
      knSplit("property=value=thisIsAlsoPartOfTheValue", "=", false, 1)
         = {"property", "value=thisIsAlsoPartOfTheValue"}
      
      -- notice that there are two spaces between the first and second value
      knSplit(" 0x1234  0x5678 0x9abc", " ")
         = {"", "0x1234", "", "0x5678", "0x9abc"}
      
      knSplit(" 0x1234  0x5678 0x9abc", " ", true)
         = {"0x1234", "0x5678", "0x9abc"}
      
      knSplit(" 0x1234  0x5678 0x9abc", " ", true, 1)
         = {"0x1234", " 0x5678 0x9abc"}
      
      knSplit("Player::hitSomething", "::")
         = {"Player", "hitSomething"}
      
      knSplit(" = = = = ", " = ")
         = {"", "=", "= "}
   
   Example for parsing and applying a line of a patch:
   
   .. code:: lua
      
      local data = knSplit("0x71574  c0 03 5f d6", " ", true, 1)
      local address = tonumber(data[1])
      local bytes = knHexToBin(data[2])
      knPatch(address, bytes)
