---
layout: post
title: "Programmatically changing the state of a window in Linux."
description: "Minimize and maximize certain windows using xdotool and xprop."
author: Prashant Shrestha
date: 2020-04-30 13:23:14 -400
categories: development
tags: linux xdotool wmctrl linux xprop window manager command management
words: 1091
---

Manipulating the state of an application seems to be much easier than I thought. Similar to the script I wrote in Bash when I used to use [i3wm](https://i3wm.org/), this method brings in a bit of a twist. Twist in a sense of minimizing and maximizing a running program(s) programmatically. This came up while I was using KDE Plasma 5, although it contains robust tools and options to allow me to manipulate windows, it did not have the option to help me minimize, maximize, or focus onto a certain window, at least not that I know of. As long as Global/Custom Shortcut options are available, writing my own script to manipulate windows is not a big deal.

<!--excerpt-->

### Obtaining window handle

Window handle, which can be put in various different words such as unique identifier for a program/window, or simply an identifier amongst other things. In order for us to manipulate window's state, we need the ID of a window as there are/can be many windows open at a time. Just for this scenario alone, let's use `wmctrl` package available in official Debian repository. `wmctrl -l` lists all open windows, and the output, depending on the person and the time will vary.

{% include lightcase.html name="wmctrl-l.png" alt="wmctrl -l" local="true" %}

In order to obtain the unique identifier of these windows, I decided to use a package officially available in Debian distributions called `xdotool`. The best thing about this tool, for our purpose is the `-classname` switch in `search`. We can search for the ID of a window by passing the `WM_CLASS` property.

```bash
xdotool search -classname "quassel"
```

The classname we pass does not have to be accurate because for my purpose, I do not have multiple windows open of the same type. `quassel` classname is a `WM_CLASS` property of my IRC client called [Quassel IRC](https://quassel-irc.org/).

```bash
xdotool search -classname "quass"
```

This returns an ID of my Quassel IRC client.

{% include lightcase.html name="window-handle-search.png" alt="xdotool search -classname 'quassel'" local="true" %}

### Obtaining window state

We are able to acquire a unique identifier (handle) of a window using their classname that searches for `WM_CLASS(STRING)` property. Obtaining the state of the window, for my purpose, whether the window is minimized or maximized. I used the preloaded tool called `xprop`. We can read all about it if we read the manual page of that command, using `man xprop`.

The most important switch, for me, is the `-id` switch that `xprop` accepts.

> This argument allows the user to select window id on the command line rather than using the pointer to select the target window.  This is very useful in debugging X applications where the target window is not mapped to the screen or where the use of the pointer might be impossible or interfere with the application. (-id switch of xprop in `man xprop`)

If we pass in the ID we acquired from running `xdotool` search above, we can read the window properties. 

```bash
xprop -id 94371852
```

The window state that I speak of is the `_NET_WM_STATE(ATOM)` property. We can pipe it through `grep` to narrow down to what we need.

```bash
xprop -id 94371852 | grep "_NET_WM_STATE(ATOM)"
```

{% include lightcase.html name="pipe-grep-parse.png" alt="Using grep" local="true" %}

The first output is when my window was minimized, the second when it was visible (maximized) so with these information, I wrote a bash script to manipulate windows and binded some keyboard combination.

```bash
# Get the window ID using the xdotool for the classname
WINDOW_ID=$(xdotool search -classname "$1")

# Get the window state using the ID.
WINDOW_STATE=$(xprop -id "$WINDOW_ID" \
| grep "_NET_WM_STATE(ATOM)" \
| grep "_NET_WM_STATE_HIDDEN")

# Depending on the WINDOW_STATE, hide or activate the window.
if [[ -z "$WINDOW_STATE" ]]; then
        # Hide the window. STATE is empty!
        xdotool windowminimize "$WINDOW_ID"
elif [[ -n "$WINDOW_STATE" ]]; then
        # Activate the window. STATE is not empty!
        xdotool windowactivate "$WINDOW_ID"
fi

# Display information
if [[ -n "$2" ]]; then
        printf "WINDOW_ID: $WINDOW_ID\nWINDOW_STATE: $WINDOW_STATE"
fi
```

### Using the script to manipulate windows

The script above accepts 2 parameters, second one being optional and for debug purpose only. I named my file `windowtrigger.sh` and gave it proper permission, `chmod +x windowtrigger.sh`.

```bash
./windowtrigger.sh quassel
```

The command above activates Quassel client if it is minimized or hidden, if it is active, it minimizes it. This same script can be used to manipulate multiple other windows, as long as there is **ONLY ONE INSTANCE** of it running. If there are multiple, this script **will not work** without some modifications or only work for the first window in the list of windows.

As someone who opens multiple terminals even though the terminal has Tabs features, let's activate and raise all the terminals, for the blogging purpose, all we need is to loop through the windows ID returned by `xdotool search --classname "$1"`.

{% include lightcase.html name="multiple-windows-with-same-name.png" alt="Multiple windows with same classname." local="true" %}

Using basic `for` loop.

```bash
# Get the window ID using the xdotool for the classname
WINDOW_ID=$(xdotool search -classname "$1")

# Get the window state using the ID.
for wid in $WINDOW_ID; do
        WINDOW_STATE=$(xprop -id "$wid" \
        | grep "_NET_WM_STATE(ATOM)")
        # Hide or activate the window.
        if [[ -z "$WINDOW_STATE" ]]; then
                # Empty = buried somewhere.
                xdotool windowactivate "$wid"
        elif [[ -n "$WINDOW_STATE" ]]; then
                WINDOW_HIDDEN=$(echo "$WINDOW_STATE" \
                | grep "_NET_WM_STATE_HIDDEN")
                if [[ -z "$WINDOW_HIDDEN" ]]; then
                        xdotool windowminimize "$wid"
                else
                        xdotool windowactivate "$wid"
                fi
        fi
        # Display information
        if [[ -n "$2" ]]; then
                printf "WINDOW_ID: $wid\nWINDOW_STATE: $WINDOW_STATE"
        fi
done
```

We could create a shared state of the window but this would require practice. If I want to minimize all terminals, I would have to use activate all terminals (make sure none of them are minimized OR all of them are minimized) and then trigger the command, that way **ALL** the windows states are toggled in sync.

I have used same script to manipulate windows such as [Plex Media Player](https://forums.plex.tv/t/plex-media-player-packages-for-linux/198091), [Visual Studio Code](https://code.visualstudio.com/), [Kate](https://kate-editor.org/) (text editor), etc. It seems pretty helpful if we do not have multiple screens to distribute the windows to.

:tada: