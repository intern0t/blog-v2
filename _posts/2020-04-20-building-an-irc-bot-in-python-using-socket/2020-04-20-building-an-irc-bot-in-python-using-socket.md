---

layout: post
title: "Building an IRC bot in Python using Socket."
author: Prashant Shrestha
date: 2020-04-20 16:54:14 -400
categories: development
tags: irc bot network freenode socket python
words: 1263
---

I never thought building an IRC bot was as simple a task until **Coronavirus** outbreak caused university lock-down and various Coronavirus related IRC channels at Freenode had extreme increase in traffic. Although I was familiar with [Sockets](https://en.wikipedia.org/wiki/Network_socket) as I have built an encrypted chat application using Socket with JavaScript and [ReactJS](https://reactjs.org/). For simplicity, I decided to build this specific IRC bot using Python. Considering this is a personal project,  I wanted my IRC bot to be able to accomplish various yet simple tasks.
<!-- excerpt -->
### My IRC bot goals

1. Parse, cache, and deliver updated Coronavirus statistics - Country and States.
2. Be able to stash and retrieve links for quick access.
3. Be able to shorten links using [Bit.ly](https://bit.ly/) API.
4. Be able to define words.

... but, for the sake of this note, I wish to keep it as simple as possible and stick to basic features such as parsing messages, sending message to a user in a channel, and sending private message directly to a user.

### Connecting to the IRC Network

The base functionality that we need for this bot to connect to the IRC network consists of utilizing a low-level networking interface called `socket`.

```python
import socket

irc = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
irc.connect(("chat.freenode.net", 6667))
```

I decided to go with the raw text port to connect to the IRC network without SSL because it is a simple bot, nothing too complex and I became too lazy to set up SSL for this project.

### Sending our bot's credentials for identification

Once we connect to the IRC Network, the network requires a person or a bot to send their credentials to the network for identification. We first need to register our bot and the nickname of our choice before we move forward. The reason, if not obvious, we do not want our bot to have varying and random nickname which makes it completely inaccessible. I decided to register a nickname `PS[bot]` for my bot.

```python
irc.send("USER {} {} {}:{}\n".format("PS[bot]", "PS[bot]", "PS[bot]", "Hello Freenode."))
irc.send("NICK {}\n".format("PS[bot]"))
irc.send("NICKSERV IDENTIFY {} {}\n".format("PS[bot]", "<my_password_here>"))
```

This is the base IRC bot, so far we have connected to the IRC network and identified ourselves in the network.

### Receiving, parsing, and handling commands

A bot that does nothing but identify itself to the IRC network is useless unless, it can fulfill the commands we feed it. In order for it to fulfill, we need to capture (tap into the socket stream) and parse the commands accordingly. In order to do that, we need to read the stream in an infinite loop (this isn't event based therefore the need for `loop`). In order to keep this note (self-tutorial) simple, I decided not to utilize any classes, keeping the script bare-bone with no standard structure.

```python
BUFFER_SIZE = 2048

while True:
    message = ""
    message = irc.recv(BUFFER_SIZE)
    message = message.strip("\n\r")
```

The `message` variable stores the parsed but raw messages. The most important thing that we need to parse after connecting to the IRC network is to handle a message with header `PING :`. `PING` in simple terms is the implication that IRC protocol uses to keep track and test whether a client is connected to the IRC network or not. When the IRC network sends a message, `PING :<something>`, we must reply with the message header `PONG :<some_message>` to let the server know our bot is alive, active, and kicking. :sweat_smile: 

```python
def pong(args):
    irc.send("PONG :{}\n".format(" ".join(args)))
```

I decided to create a function to handle this `PING` and `PONG` relay to keep it clear. Now, continuing our parsing and handling the messages in our stream under the loop above, we handle `PING` and prioritize it because staying available and accessible is important for a bot.

```python
if message.find("PING :") != -1:
    pong("I am still alive. - PS[bot]")
```

This is pretty much the solid foundation of a bot, join the network, identify itself, respond to `PING` with `PONG` and handle other commands (if necessary).

### Joining and Leaving a channel

So far, our bot has not joined any channels, I like to keep things private and allow access to the bot to certain people. If we want our bot to function in a channel, we need to command the bot to join specific channel. A simple channel join function revolves around sending a command `JOIN` with channel identifier, for example `##bots`.

```python
def joinChannel(channel):
    irc.send("JOIN {}\n".format(channel))
```

A process to command a bot to leave a channel is similar, we utilize `PART` command with channel we wish the bot to [part](https://tools.ietf.org/html/rfc2812#section-3.2.2), if we want. For example - `PART ##bots :Sorry, gotta go!` or something similar. We can also supply multiple channels using `,` to separate the channels we wish to part, `PART ##bots,##linux,#python :Sorry, bot overloaded!` .

### More messages parsing

Continuing the development of our bot, if we wish to better the bot, we need to be able to identify the `user`, `channel`, and `message`. Continuing the parsing under loop. 

```python
if message.find("PRIVMSG") != -1:
    user = message.split('!', 1)[0][1:]
    channel = message.split('PRIVMSG', 1)[1].split(':',1)[0] or ''
    userMessage = message.split('PRIVMSG', 1)[1].split(':', 1)[1] or ''
```

What we have done here is that we parsed one line of raw message in our stream, however, IRC follows standard protocol and [specifications](https://tools.ietf.org/html/rfc2812) that we must refer to, in order to properly parse the messages. A line of message is in a format of `:<nick_of_the_sender>!<hostname> PRIVMSG <recipient> :<message>`. That is what we parsed above to get the sender's nickname, in `user` variable. If I were to send a **private message** to my bot, the raw message that the bot receives would be in format of `:Scarecr0w!~intern0t@ny-vz1.gullo.me (PMS) PRIVMSG PS[bot] :Hello.` 

Similarly, if I were to send a message in a channel that my bot has joined, for example - `##bots`, my bot would receive message in format of `:Scarecr0w!~intern0t@ny-vz1.gullo.me (PMS) PRIVMSG ##bots :Hello.` That is one reason I parsed `channel` from the raw message and initialized it in a variable for later use. Everything after `:` after `PRIVMSG ... ` is the message, an actual conversation text.

Let's continue the message parsing and respond to specific commands.

```python
if message.find("PRIVMSG") != -1:
    user = message.split('!', 1)[0][1:]
    channel = message.split('PRIVMSG', 1)[1].split(':',1)[0] or ''
    userMessage = message.split('PRIVMSG', 1)[1].split(':', 1)[1] or ''
    
    if userMessage[:5] == '!help':
        sendMessage(channel, user, "Hi! I'm a bot, I handle two commands - !help and !hello.")
    elif userMessage[:6] == '!hello':
        sendMessage(channel, user, "Hello {}!".format(user))
```

To simplify it further, I decided to create a separate function to handle sending the messages to the intended channel or direct/private message (DM/PM) the user. 

```python
def sendMessage(channel, user, message):
    if channel != '' and '#' in channel:
        # Send to channel.
        irc.send("PRIVMSG {} :{}:{}\n".format(channel, user.strip('\r\n'), message))
    else:
        # Send to user.
        irc.send("PRIVMSG {} :{}\n".format(user.strip('\r\n'), message))
```

That is basically it, for basic IRC bot interaction and message handling. There are definitely endless features we can implement.

Here is my bot in action. :tada:

{% include lightcase.html name="E0CWXtw.png" alt="IRC bot in action!" local="true" %}
