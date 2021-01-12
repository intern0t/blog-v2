---
layout: post
title: "Fixing Visual Studio Code SSH-Askpass problem in Arch Linux." 
author: Prashant Shrestha 
date: 2021-01-10 14:18:14 -400 
categories: ide
tags: ide vscode code git ask-pass ssh github
---

The problem faced by many Linux users who installed Visual Studio Code in their system seems to have come across this problem. The problem simply states, `Git: ssh_askpass: exec(/usr/lib/ssh/ssh-askpass): No such file or directory` and the error dialog looks like this.

{% include lightcase.html name="ssh-askpass-error-dialog.png" alt="Git Push: SSH-askpass error dialog" local="true" %}

The first approach I took was to install `openssh-askpass` package but something wasn't right, it did not work, the error persisted therefore I removed that package.

Next approach I took was to search for similar packages using `pacman -Ss askpass` which returned quite some alternatives.

```
extra/ksshaskpass 5.20.5-1 (plasma)
    ssh-add helper that uses kwallet and kpassworddialog
extra/seahorse 1:3.38.0.1-1
    GNOME application for managing PGP keys.
community/lxqt-openssh-askpass 0.16.0-1 (lxqt)
    LXQt openssh password prompt
community/openssh-askpass 2.1.0-3
    A plasma-like passphrase dialog for ssh
community/x11-ssh-askpass 1.2.4.1-7
    Lightweight passphrase dialog for SSH
```

Considering I am currently using X-server, assuming the lightweightness and simplicity, I decided to go with `x11-ssh-askpass` which works great and fixes the error after restarting Visual Studio Code instance.

{% include lightcase.html name="x11-askpass.png" alt="X11 Askpass, works great!" local="true" %}

:smirk: