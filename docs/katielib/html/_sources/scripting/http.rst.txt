=============
HTTP Requests
=============

The HTTP extension allows making non-blocking HTTP and (as of Release
15) HTTPS requests.

The recommended way to use this library is to create two functions
around your request: one to start it and another to process it. When you
want to start an HTTP request you would call your custom
``startRequest()`` function, and you would call your custom
``processRequest()`` from a function that runs regularly like
``drawWorld()`` or ``frame()``.

Here is an outline for submitting a high score to a server:

.. code:: lua

   function handleCommand(cmd)
       -- ...
       
       -- Start the request when the 'submitscore' command is run
       if cmd == "submitscore" then
           startHighScoreSubmission()
       end
       
       -- ...
   end

   function makeHighscoreRequestBody()
       return "score=" .. getHighScore() .. "&player=" .. getPlayerName() .. "&time=" .. os.time()
   end

   function startHighScoreSubmission()
       -- When using HTTPS, it's very important to get your server's certificate
       -- so the HTTP client can verify it's talking to the right server!
       local cert = knLoadAsset("certs/highscore-server.pem")
       
       highScoreRequest = knHttpRequest("POST", "https://myserver.com/highscore/", makeHighscoreRequestBody(), nil, cert)
       
       if not highScoreRequest then
           -- handle failing to initialise the request
       end
   end

   function processHighScoreSubmission()
       if highScoreRequest then
           -- update the request with recieved data and get the status
           local status = knHttpUpdate(highScoreRequest)
           
           if status == KN_HTTP_PENDING then
               -- we can't really do anything while pending, leave everything as is
           else
               if status == KN_HTTP_ERROR then
                   -- handle the error case, maybe show a dialogue to the user
                   -- about the error
               else
                   local data = knHttpData(highScoreRequest)
                   -- handle the successful case with the response data, maybe
                   -- show something to confirm the score was submitted. note that
                   -- if your server returns something like 200 OK for certian
                   -- types of errors this will still technically be an error and
                   -- you will want to handle that accordingly
               end
               
               -- Since the request is finished, don't hang on to the object
               -- anymore and replace it with nil so we know it's no longer needed
               highScoreRequest = nil
           end
       end
   end

.. function:: knHttpRequest(method: string, url: string, [body: string, [headers: table[string: string], [certificate: string]]]): object

   Initiate an HTTP request to the given URL using the given method. The
   request may optionally contain a body (regardless of the method) by
   supplying a third parameter with the request body contents. The
   ``headers`` parameter can be used to send custom HTTP headers.
   
   The ``certificate`` parameter ought to be specified when using HTTPS so
   the identity of the server can be verified. The certificate can be in DER
   or PEM format. If the certificate is not specified, then the server's
   identity won't be verified, which may expose the request to man-in-the-middle
   attacks.

   Returns an HTTP request context (of type ``userdata``) on success or
   ``nil`` on failure.

   .. note:: ``body`` is allowed to contain embedded zeros.

   .. version-changed:: 14
      If you were using the old one (for GET
      requests) or two (for POST requests) argument versions of this method
      where the URL was the first argument, you should switch these to the
      following forms:

      .. code:: lua

         knHttpRequest("GET", "http://example.com/mylevel.zip") -- for GET requests
         knHttpRequest("POST", "http://example.com/highscore.php", "score=12345") -- for POST requests

      when upgrading to the new version.

.. function:: knHttpUpdate(request): KN_HTTP_PENDING | KN_HTTP_ERROR | KN_HTTP_DONE

   Reads any new data and further process the request, possibly finalising
   it. Returns:

   - ``KN_HTTP_PENDING`` if the request is still pending;
   - ``KN_HTTP_ERROR`` if the request has finished in error (network errors);
   - ``KN_HTTP_DONE`` if the request has succeeded.

   This function must be called in a function like ``tick()`` or ``draw()``
   (that is, every so often) until it no longer returns
   ``KN_HTTP_PENDING``. When it does finish, it is recommended to do any
   processing, then release the request.

   .. version-changed:: 13
      Status codes above 299 now return ``KN_HTTP_DONE`` instead of ``KN_HTTP_ERROR``.

.. function:: knHttpData(request): string

   Returns the response data for a finished request as a string.

.. function:: knHttpDataSize(request): integer

   Returns the size of the response data in bytes.

.. function:: knHttpSave(request, path: string)

   Efficiently save the contents of the response to the file at ``path``
   without needing to allocate any extra buffers. This function raises a
   Lua error on errors and does not return anything; use ``pcall`` to catch
   errors.

   Example:

   .. code:: lua

      knHttpSave(request, knGetInternalDataPath() .. "/payload.zip")

.. function:: knHttpGetHeader(request, name: string, [nth: integer]): string

   Returns the value associated with the ``nth`` response header named
   ``name``. Returns ``nil`` if the header does not exist.

   As an example, the following would get the first two ``Cookie`` headers
   form the response:

   .. code:: lua

      local cookie1 = knHttpGetHeader(request, "Cookie", 0)
      local cookie2 = knHttpGetHeader(request, "Cookie", 1)

.. function:: knHttpError(request): string

   Return a string describing the HTTP error, or nil if there is none. Note
   that even if there is an error this may return nil, for example due to a
   lower-level network error.

.. function:: knHttpErrorCode(request): integer

   Return an integer which is the HTTP status code of the response, or
   ``0`` if there is not one. This may be ``0`` even if there was some kind
   of error.

.. function:: knHttpRelease(request)

   Release the memory associated with an HTTP request. This will normally
   happen automatically once an HTTP request object has been garbage
   collected, but calling this will do it immediately instead of waiting on
   the Lua GC.

   Any further functions called on this request may return **``nil``**
   regardless of their documentation.

   **Tip:** A common pattern for global request objects is to the variable
   they were stored in to ``nil`` in order to release their resources and
   indicate that the request has finished.

   .. code:: lua

      function finishRequest()
         someImportantThing = knHttpData(globalRequestObject)
         globalRequestObject = nil
      end

.. function:: knHttpsCert([certificateData: string])

   Set the TLS certificate(s) to verify all future HTTPS requests with. The
   ``certificateData`` can be either a single DER encoded certificate or
   one or more PEM encoded certificates. Any certificate(s) loaded with a
   previous call to this function are replaced.

   Omitting the certificate data resets to the default state of having no
   certificates loaded.

   It is recommended to keep the certificate data for the server you wish
   to communicate with in an asset, then load it with ``knLoadAsset()`` in
   something like the HUD's ``init()`` function:

   .. code:: lua

      function init()
         knHttpsCert(knLoadAsset("mytlscert.pem"))
         -- ...
      end
   
   .. deprecated:: 19
      Explicitly use the `certificate` parameter of :func:`knHttpRequest`

.. function:: knHttpsNoCert(magic: string)

   Disables verifying the server's identity when no certificates are loaded
   instead of causing such requests to raise an error. **This is insecure
   as it could enable Man-in-the-Middle attacks which nullify the security
   of HTTPS**, but useful in certain cases where verifying the identify of
   the server is impractical.

   Because this is insecure, this function only works if a specific string
   is passed in ``magic``. The string is intentionally not documented here;
   it can be found in KnShim's source code.
   
   .. deprecated:: 19
      KatieLib will now allow unverified hosts by default if a certificate is
      not supplied. While this is less secure, the main purpose of HTTPS in
      KatieLib is compatibility with the modern web and not actual security
      anyway.
