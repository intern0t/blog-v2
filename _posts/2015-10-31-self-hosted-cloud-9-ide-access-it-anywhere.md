---
layout: post
title: "Self hosted Cloud 9 IDE, access it anywhere."
author: Prashant Shrestha
date: 2015-10-31 13:38:33 -400
categories: server
tags: server hosted cloud ide advanced remote code program develop development
poster: https://i.imgur.com/4SZb2Bh.png
---

Let's keep this simple and precise, as a developer, you cannot have your workplace everywhere, with an increase in the cloud project repositories such as Github and Bitbucket which however requires you to have an access to an IDE or a shell in order to sync your file which can be of a hassle for some.

This is where your private Cloud IDE comes into play and is very useful if you have a budget server such as mine and a fair amount of bandwidth. 
<!--excerpt-->
A small excerpt from Wikipedia regarding the [**Web integrated development environment**](https://en.wikipedia.org/wiki/Web_integrated_development_environment) might clarify my words better.

>A web integrated development environment (Web IDE or WIDE), also known as cloud IDE, is a browser based IDE that allows for software development or web development. A web IDE can be accessed from a web browser, such as Google Chrome or Internet Explorer, allowing for a portable work environment. A web IDE does not usually contain all of the same features as a traditional, or desktop, IDE, although all of the basic IDE features, such as syntax highlighting, are typically present. ([Source](https://en.wikipedia.org/wiki/Web_integrated_development_environment))

I've been using my private cloud IDE for a while and as a newbie, I can already see the pros-&-cons.

#### Online IDE?

Yes, there are many online cloud IDE which provide you with a free workspace with fair amount of hardware specification. Some are listed below and you can check it out yourselves.

**Some popular Online IDE List**

1. [Cloud 9.](https://c9.io/)
2. [Code anywhere.](https://codeanywhere.com/signup)
3. [Koding.](https://koding.com)
4. [Nitrous.IO.](https://www.nitrous.io/)

I listed one of the popular ones that the Google considers and the ones that I've tried and liked. If you are planning on using cloud IDE for educational purposes then I would say, self-hosted Cloud IDE is cheaper.

#### Some Pros and Cons

**Pros -**

1. You can have **unlimited** amounts of private workspaces while the official ones charge you just for the amount of workspaces you can create.
2. No problems with the server's hardware specifications! Although what kind of server you wish to use is your decision, you can save lots of money just by using a NATed-Budget VPS. You will need a domain and a reverse proxy port setup. Head over to [lowendbox](http://lowendbox.com/) or [lowendstock](http://lowendstock.com/).
3. Your group, your projects and your permission. All the accesses and privileges can be controlled.

**Cons -**

1. You manage the server which means the Cloud IDE features might not be 100% functional.
2. As you will be using community based open-source, you will not be up-to-date and your problems will not be prioritized compared to the ones who **bought** the service.

I therefore decided to use Cloud9 IDE (Open Source) as my private IDE in CentOS 6.

#### Preparing for the Cloud9 Installation.

* wget 
```bash
yum install wget
```

* XZ-Library
```bash
yum install xz-libs
```
* Python 2.7.+ and included in your environment variable `PATH`.

```bash
# Keep it clean.
cd ~ && mkdir Downloads && cd Downloads

# Get the Python package.
wget http://www.python.org/ftp/python/2.7.6/Python-2.7.6.tar.xz

# Decode *.xz with.
xz -d Python-*

# Unpack the .tar file
tar -xvf Python-*

# Preparation
cd Python-*

# Configuration & setup before installation.
./configure --prefix=/usr/local

# Compile the source. (might require more libraries/repositories/packages be installed in your server)
make

# Install..
make altinstall

# Add to $PATH variable.
export PATH="/usr/local/bin:$PATH"
```

* Github
```bash
yum install git
```

* Forever (Alternative to Screen)
```bash
yum install forever
```

* Clone the source
```bash
cd ~
git clone git://github.com/c9/core.git c9sdk
```

#### Installation should be simple & easy as.

```bash
cd c9sdk && scripts/install-sdk.sh
```

If the process of your installation was clean and simple, you should be able to see the output in the end with a confirmation of the server setup and the URL with trailing port number where the IDE can be accessed.

Port number is not that important if you are trying to keep your IDE private. The default port it is using right now for me is `:8181` therefore I added a new iptables rule to allow traffic to come to port `:8181` without any disturbance.

```bash
# sudo iptables -A INPUT -p tcp --dport <YOUR_PORT> -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 8181 -j ACCEPT
```

You can simply run your cloud IDE via.

```bash
# If no port specified.
forever start server.js -a username:password

# If port specified.
forever start server.js -p <PORT_NUMBER> -a username:password
```

The `username:password` is for the IDE access, looks like a `.htpasswd` setup.

I did not bother configuring the reverse proxy port with my domain or a subdomain as for now, you can access it via. `http://SERVER_IP:8181`.

**C9/Core Github** has provided with the launch parameters for our ease.

```bash
--settings       Settings file to use
--help           Show command line options.
-t               Start in test mode
-k               Kill tmux server in test mode
-b               Start the bridge server - to receive commands from the cli  [default: false]
-w               Workspace directory
--port           Port
--debug          Turn debugging on
--listen         IP address of the server
--readonly       Run in read only mode
--packed         Whether to use the packed version.
--auth           Basic Auth username:password
--collab         Whether to enable collab.
--no-cache       Don't use the cached version of CSS
```

#### Thing I learned -

If you ran the server regularly with no special parameters, I suggest you to create a directory inside `./core` with the name `Workspaces` and launch the server again with the following command to have a better and clean directory to work in.

```bash
forever start server.js -w Workspaces -a <Username>:<Password> :
```

Enjoy & Happy Coding!