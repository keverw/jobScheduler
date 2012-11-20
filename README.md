#jobScheduler

**Version 0.2**

The goal of jobScheduler is to be a server that runs tasks every x second's, like cron's in *NIX systems, but as a centralized server to manage them and run them. The server is written in Node.js and clients can be written in other languages, such as PHP.

When a cron is running, it's locked to prevent it running twice(say, it's taking longer than normal).

This project will contain the server(Node.js), a class to manage it(in PHP) that can be useful for writing your own GUI on top of in your own apps and a PHP class to talk back to the server. The PHP code in theory, can be ported over to other languages such as Ruby, Python, ASP, etc.

Wrote this mostly for myself, but sharing it with the world in case it's useful to someone else.