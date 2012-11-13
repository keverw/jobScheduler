#jobScheduler

**NOTE: THIS PROJECT IS IN PROGRES, DO NOT USE YET!!!**

The goal of jobScheduler is to be a server that runs tasks every x second's, like cron's in *NIX systems, but as a centralized server to manage them and run them. The server is written in Node.js and clients can be written in other languages, such as PHP.

When a cron is running, it's locked to prevent it running twice(say, it's taking longer than normal).

This project will contain the server(Node.js), a client to manage it(in PHP) and a PHP class to talk back to the server. The PHP code in theory, can be ported over to other languages such as Ruby, Python, ASP, etc.