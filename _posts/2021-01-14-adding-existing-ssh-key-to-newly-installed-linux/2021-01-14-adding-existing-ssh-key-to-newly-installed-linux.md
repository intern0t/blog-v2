---
layout: post
title: "Adding an existing SSH key to a newly installed Linux keyring." 
author: Prashant Shrestha 
date: 2021-01-14 12:16:14 -400 
categories: linux
tags: ssh key ssh-key linux
words: 178
---

Adding an existing SSH key to a newly installed Linux keyring is very easy but comes with a small step that needs to be performed before simply typing away `ssh-add` in the terminal.

1. Copy both the private and public key to `~/.ssh/` directory.
   - Normally, if the SSH keys were not renamed, it would be something like `id_rsa` and `id_rsa.pub`.
2. Change the permission, apparently this is for the smooth transition without any problems.
   - Change the two public and private keys' permission to `600`.
   - For example - `sudo chmod 600 ~/.ssh/id_rsa*`.
3. We simply add the key and verify it with password using `ssh-add ~/.ssh/id_rsa`.

It is necessary for the SSH agent to be running before you add the key but if it isn't running, start it off with `eval $(ssh-agent -s)`.

> Generate Bourne shell commands on stdout.  This is the default if SHELL does not look like it's a csh style of shell. 
>**(Source: man ssh-agent)**

That should add our existing SSH key to our keyring!

:thumbsup: