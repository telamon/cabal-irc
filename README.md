# cabal-irc

This is an cabal-irc-bouncer, It let's you connect to
the cabal p2p network using whichever irc-client you prefer.

Usage
  cabal-irc cabal://key
  cabal-irc --db=/path/to/previously_created_folder

  Options:
    --db      Resume a previously created session.
    --key     Specify a cabal key.
    --host    Host/Address to use for incoming IRC-connections.
    --port    Port to listen for incoming IRC-connections.
    --help    Prints this message.

**Using Docker**

No prebuilt images are available yet, but you can easily build one yourself
by cloning this repository and running command:

    docker build -t cabal-irc .

Then you can join the public cabal using command:

    docker run --name cabal-irc \
      -p 6667 \
      -v ~/.cabal/archives:/data/ \
      cabal-irc --key=cabal://0b2a6c1c58014fe0da6dff38df6282157c405bc0ed7b550cda5c8c43d8067047

And finally connect to localhost:6667 with an irc-client, you're set!

IRC-client tip:

    /j #default
    !recap

# Implemented IRC-commads
Current status

| Command   | Status   | Note                                                       |
| --------- | -------- | ---------------------------------------------------------- |
| PRIVMSG   | done     | /say , /me , /describe                                     |
| JOIN      | done     | /join  - aesthetic; you are always joined to all channels  |
| PART      | done     | /part  - aesthetic; same as join.                          |
| TOPIC     | done     | /topic - controls cabal-channel topic                      |
| LIST      | done     | /list  - lists all available channels.                     |
| NICK      | done     | /nick  - works as usual..                                  |
| QUIT      | done     | /quit  - Do we want it to publish the quit-message?        |
| ERROR     | done     |                                                            |
| PING      | done     |                                                            |
| USER      | done     |                                                            |
| MODE      | done     | Always returns mode `+nsv`                                 |
| CAP       | done     | Always returns empty list                                  |
| WHOIS     | done     | TODO: can be improved with idle-time and signon-timestamp  |
| WHO       | todo     | missing                                                    |
| add more  | todo     | Is there other IRC commands worth to translate to cabal?   |


