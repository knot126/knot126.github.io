=========
Changelog
=========

Release 22
----------

*Upcoming*

Release 21
----------

*18 July 2026*

- Fixed Lua 5.3 on AArch32

Release 20
----------

*13 July 2026*

- KatieLib now upgrades Smash Hit's built-in Lua install to
  `version 5.3.6 <https://www.lua.org/manual/5.3/readme.html#changes>`__! This
  give access to about a decade of refinement to the Lua language.
- Added :func:`knAddress` for finding memory addresses
- Updated :func:`knPatch` to support symbol names and lightuserdata address
- Added :func:`knHexToBin` and :func:`knBinToHex` for converting strings of data
  to and from strings of hexidecimal digits
- Added string utilities: :func:`knRemoveSuffix`, :func:`knRemovePrefix` and :func:`knSplit`
- KatieLib now installs a custom Lua panic handler which prints a FATAL-level
  log line describing what caused the panic

Release 19
----------

*6 July 2026*

- Several functions will now raise an error instead of returning
  silently when used incorrectly

  - More notably, file functions will now raise an error instead of
    returning a failure code in most cases

- Added a new feature for all scripts: special ``shutdown()`` function
  is now called when the script is being destroyed
- Added new DB functions: ``knDbKeys()``, ``knDbBeginTransaction()``,
  ``knDbCommit()``
- Improved ``knCall()`` by allowing to call into arbitrary scripts, not
  just the menu/movie/hud
- Added ``knUnpack()``
- Added ``knOwnHandle()``
- ``knInclude()`` now gives loaded blocks a name for debugging, and
  supports pre-compiled scripts made with ``luac``
- Added ``apk`` type overlays and suffix and prefix options for ``zip``
  overlays
- Deprecate :func:`knHttpsCert` and :func:`knHttpsNoCert` and add
  explicit ``certificate`` argument to :func:`knHttpRequest`
- Updated ``knPatch()`` so it now returns the original data before it
  was patched
- Added ``knPeek()`` which should now work more reliably than the older
  version of the function that was removed long ago

Release 18
----------

*8 June 2026*

- Fork-seccored as *KatieMod*
- Use YipLoader for loading the mod
- Added inter-script communication via ``knCall()``
- Added byte packing (``knPack()``)
- This fork is for private use only for now

Release 17
----------

*15 December 2025*

- Added ``knListAssetDir()``

Release 16
----------

*13 November 2025*

- Internal work and refactoring for an upcoming traditional mod
  loader/extensions API
- Internal work to support non-Mediocre games
- Removed ``knDownloadFile()``, ``knHttpPost()``, ``knHttpPostAsync()``:
  please use the async HTTP API or a helper library around it
- Removed ``knConnectAssetServer()``, ``knDisconnectAssetServer()``,
  ``knIsConnectedToAssetServer()``: Use overlays instead of the built-in
  asset server

Release 15
----------

*31 October 2025*

- Initial support for KnShim's second supported game, *Granny Smith*!
- HTTPS is now supported in the existing HTTP API using MbedTLS
- Added the Raw Input module for querying touch events from scripts
- KnShim will now disarm the anti-tamper code so anti-tamper patching is
  no longer needed
- Added ``knHttpSave()``: Save HTTP responses without extra memory
  overhead
- Added ``knSetDisabled()``: Makes certain modules unavailable in newly
  loaded scripts
- ``knSystemAbi()`` was moved from the Patching module to the System
  module
- NxArchive code is no longer included in KnShim

Release 14
----------

*5 October 2025*

Note: I decided to skip the "full" release 13 by renaming this release
to r14 and r13 beta 1 to the final r13. Going forward there will be no
betas and new experimental features will be put directly into new
releases.

- **Complete revamp of overlays**: Multiple overlays can now be used at
  a time, and support for directories and Lua script callbacks as
  sources was added.
- **Shader uniform module by yorshex**: Allows updating custom uniforms
  from scripts.
- HTTP request constructor changed: now always requires \`method\`
  argument at the start
- Add ``knLoadGfx()`` to allow reloading shaders and textures without
  restarting the game
- Added new patching module with ``knPatch()``
- Removed:

  - Old patching module (``knPeek()``/``knPoke()``/etc)
  - MD5 Hashing: ``knMd5()``
  - Hyperspace functions that no longer have relevance:
    ``knPlayerZeroState()``

- Code cleanup

Release 13
----------

*2 July 2025*

*Sometimes also called r13-beta1*

- KnShim now uses the version of Lua from Smash Hit instead of including
  its own

  - This fixed various bugs, including tables being used in
    \`knInclude()\`'d scripts leading to memory corruption

- Added functions:

  - \`knGetAppSdk()\` for getting the app's target SDK
  - \`knGetDeviceSdk()\` for getting the device's android version (sdk
    level)
  - \`knGetAppVersion()\` for getting the app's version string
  - \`knJavaCommand()\` for calling smash hit's java commands from lua
  - \`knGetDeviceHz()\` and \`knSetFrameRate()\` for adjusting the
    game's framerate
  - \`knPatch()\` for more easily making patches at runtime

- Changed \`knLoadAsset()\` and \`knInclude()\` to use Smash Hit's
  resource manager

  - This means you can no longer explicitly specify \`.mp3\` at the end
    of file names

- HTTP API now supporting headers and non-\`GET`/\`POST\` methods
- Removed \`knEnableReloading\`; you can now just \`knReload()\` without
  enabling it
- Deprecated \`knPeek()\` and \`knPoke()\`, use \`knPatch()\` now
- Fix a bug where the game would crash if using \`knHttpRelease()\`
  explicitly
- Overlays have been made available for general use
- Upgrade Leaf
- New project logo

Release 12
----------

*15 February 2025*

- Added \`knListDir\`, \`knIsDir\`, \`knLoadAsset\`, \`knInclude\`,
  \`knHttpPostAsync\`
- \`knLog\` no longer requires log level, does not crash when \`msg\` is
  not a string
- HTTP request objects will now be properly garbage collected, so
  \`knHttpRelease\` is not needed anymore
- Code cleanup
- Remove obfuscation related code
- Untested x86 support

Release 11
----------

*2 January 2025*

- Added the database, like the registry but persistent
- Native HTTP function wrappers (\`knDownloadFile\`, \`knHttpPost\`)
- Asset server wrapper functions (\`knConnectAssetServer\`,
  \`knDisconnectAssetServer\`, \`knIsConnectedToAssetServer\`)
- Main menu reloading (\`knEnableReloading\`, \`knReload\`)
- Overlays (prototype, not available in mainline builds ATM)
- Shitposting (iykyk)

Release 10
----------

*18 December 2024*

- Fixes for \`knGetBalls\`, \`knGetStreak\` not working
- Added \`knSetNoclip\` and \`knGetNoclip\`
- Switch to LeafHook for hooking
- Hook some debug logging functions by default

Release 9
---------

*6 December 2024*

- Added ``knGetBalls`` and ``knGetStreak``

Release 8
---------

*4 December 2024*

- Improved registry performance by using a hash table
- Registry now supports values with NUL bytes in them, for both keys and
  values
- Added ``knRegKeys()`` function to list all keys in registry
- Remove non-Leaf build option

Release 7
---------

*6 November 2024*

- Switch to using Leaf, a custom ELF loader, to be fully compatible with
  Android target SDK >29
- Remove ``knUnprotect`` and ``knSetMemoryProtection`` for Leaf builds
  as Leaf makes all memory RWX by default
- Added Leaf build options (you can keep using dlopen/dlsym/mprotect if
  you want to)

Release 6
---------

*28 October 2024*

- Adds new game control functionality: ``knSetBalls`` and
  ``knSetStreak``
- Add a way to get the shim release version: ``knGetShimVersion``

Release 5
---------

*27 October 2024*

a bit of refactoring and fixing modern android support

note that ``knUnprotect`` is now deprecated because it won't work if you
set the android target sdk too high; use the new
``knSetMemoryProtection`` instead

**EDIT: This does not fix everything (specifically trying to set
anything to be executable will be denied), however it is enough to work
on newer Android.**

Release 4 (r4-post)
-------------------

*26 August 2024*

- Initial public release

Release 3
---------

*10 August 2024*

- ARM32 support

Release 2
---------

*8 August 2024*

- Added registry and HTTP api
- Added functions to get external and internal data path

Release 1
---------

*7 August 2024*

- Initial private release to Smash Hit Lab discord
- Added logging and memory peek/poke
