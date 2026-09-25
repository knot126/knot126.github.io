================
Switch to AAudio
================

On newer versions of Android, KatieLib can load and use the AAudio API
instead of the legacy OpenSL ES. Due to bugs, this is currently not enabled
and is considered a "developer-only" feature for now.

Notable bugs:

- Internal audio recording does not work
- Switching audio sources (e.g. from speakers to headphones) cuts sound until
  the audio stream is re-created (e.g. by unfocusing and focusing the game)

While not formally tested, this should reduce audio latency by quite a lot,
assuming Android's OpenSL implementation is still as bad as it was when Dennis
`wrote about it on his blog <https://blog.voxagon.se/2013/06/26/low-level-audio.html>`__.
