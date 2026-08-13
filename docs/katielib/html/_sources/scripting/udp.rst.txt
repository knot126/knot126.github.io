===========
UDP Sockets
===========

KatieLib provides a simple async implementation of UDP. It is useful for network
operations which don't need to be completely reliable, like syncing scores or
automatically detecting servers, and is a lot simpler than TCP.

.. note:: The UDP socket API is object oriented, unlike most of the other APIs
   provided by KatieLib. This means you create a :class:`KnUdpSocket` *object*
   and then call methods on it, like :func:`KnUdpSocket.recieve`.

.. class:: KnUdpSocket([address: string, port: integer]): KnUdpSocket
      
   Create a new UDP socket which is optionally bound to the given address and
   port.
   
   Binding a UDP socket to an address and port is required for reciving
   messages, but not for sending them.
   
   .. method:: send(data: string, address: string, port: integer): boolean
      
      Send a datagram with the given data to the address and port. Returns a
      boolean indicating success.
   
   .. method:: recieve(): string, string, integer | nil, nil, nil
      
      Get the next datagram in the queue, if there is one.
      
      If a datagram is available, this returns three values: the data of the
      datagram itself, the address that sent the datagram, and the port it came
      from.
      
      If there are no more datagrams or there is an error, this returns three
      nil values.
   
   .. method:: close()
      
      Closes the UDP socket and frees resources
   
   .. data:: fd: integer
      
      The raw file descriptor associated with the UDP socket

-------
Example
-------

This is an example of how Shatter Client uses UDP to listen for available
servers and automatically enter the right IP address.

.. code:: lua
   
   -- This is called once when the client boots.
   function initServerHello()
       -- Disable Android's filtering of broadcast packets. Most mods probably
       -- don't need this.
       knAccquireMulticastLock()
       
       -- Create a UDP socket which will listen for packets from any address
       -- on port 8000. Servers that support server discovery will broadcast
       -- a small packet containing the server's info on a regular interval,
       -- and we use this to tune into that.
       hello = KnUdpSocket('0.0.0.0', 8000)
   end
   
   -- This is called every frame.
   function processServerHello()
      while true do
         -- Get the next datagram
         local data, address, port = hello:recieve()
         
         -- If there are none, stop for now. We'll try again next frame when we
         -- might actually have more.
         if data == nil then
               break
         end
         
         -- If we do have a datagram, let's make sure it's the right one for our
         -- purpose.
         if string.match(data, "^ShatterClientHello") ~= nil then
            -- Seems right! Let's parse out the port, if one is specified.
            local port = string.match(data, "port:(%d+)")
            
            if port then
               port = ":" .. port
            else
               port = ""
            end
            
            -- Set the automatically found server name
            knDbSet("shatter.client.autoname", address .. port)
         end
      end
   end
