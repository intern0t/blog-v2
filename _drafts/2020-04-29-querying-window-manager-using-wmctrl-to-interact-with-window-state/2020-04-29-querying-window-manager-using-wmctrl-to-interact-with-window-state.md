---
layout: post
title: "Querying window manager using wmctrl to interact with window state."
author: Prashant Shrestha
date: 2020-04-29 15:26:14 -400
categories: linux
tags: linux wmctrl window manager command management
words: 397
---

KDE Plasma 5 comes with amazing tools, resources, and options to interact with the windows however I had difficulty setting a shortcut to focus, minimize, and maximize window with certain title and could not find a setting to allow me to set it up. After a bit of search, I was made aware of an amazing tool named `wmctrl`.

<!--excerpt-->

>**wmctrl** is a command that can be used to interact with an X Window manager that is compatible with the EWMH/NetWM specification. **wmctrl** can query the window manager for information, and it can request that certain window management actions be taken.
>
>**wmctrl** is controlled entirely by its command line arguments. The command line arguments are used to specify the action to be performed (with options that modify behavior) and any arguments that might be needed to perform the actions. (Source: [wmctrl(1) - Linux man page](https://linux.die.net/man/1/wmctrl))

Installing it in Debian based distributions was made easy as `wmctrl` is available in official repository.

```bash
sudo apt install wmctrl
```

First thing first, we check out the help using `wmctrl -h` or man page `man wmctrl`. In my case, I needed an option to be able to find the window and changing its state. The switches `-l`, `-r`, and `-b` are the only switches I needed considering I already knew what window to interact with.

{% include lightcase.html name="wmctrl-l.png" alt="Getting list of windows using wmctrl -l." local="true" %}

The next switch we utilize is `-r` or `-a` and `-b` where `-r` accepts the title of the window and `-b` accepts the action and state.

```bash
wmctrl -r "Quassel IRC" -b toggle,shaded
```

We could also add focus to the window using `-a` switch.

```bash
wmctrl -a Quassel IRC -b toggle,shaded
```

Apparently, `shaded` is `minimize` or `maximize`. We can add either of these commands as a global shortcut in the System Settings in KDE Plasma 5. :stuck_out_tongue_winking_eye:

If we head to **System Settings > Shortcuts > Custom Shortcuts**, we have the options to add new **Global Shortcut > Command/URL**. We can set the trigger (keyboard shortcut) and the command (one of the two command above).

{% include lightcase.html name="kde-custom-shortcuts.png" alt="Custom Shortcut in KDE Plasma 5" local="true" %}

:tada:

