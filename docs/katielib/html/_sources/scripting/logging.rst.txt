=======
Logging
=======

The logging function provides the ability to write messages to the Android debug stream for debugging and testing purposes.

.. function:: knLog([level], msg)

   This function logs to the Android debug stream, accessible with
   ``adb logcat``. Level can be any one of:

   .. enum:: LOG_INFO
   
   .. enum:: LOG_WARN
   
   .. enum:: LOG_ERROR

   Or not included at all for a default of ``LOG_INFO``, and ``msg`` is any
   string to log. For example:

   .. code:: lua
   
      knLog("Hello, world!") -- defaults to LOG_INFO
      knLog(LOG_INFO, "What a wonderful day to mod Smash Hit!")
      knLog(LOG_ERROR, "Whoops! Something failed.")
