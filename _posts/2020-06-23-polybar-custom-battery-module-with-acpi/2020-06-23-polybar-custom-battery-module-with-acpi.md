---
layout: post
title: Custom polybar battery module script using ACPI.
author: Prashant Shrestha
date: 2020-06-23 11:52:14 -100
categories: linux
tags: linux polybar unix styling ricing misc
words: 1082
---

Styling my Linux has been my prime time hobby as it never feels good enough. After recently changing my Operating system to Arch Linux, I installed [i3wm](https://i3wm.org/) like the good old times and jumped right into customizing it to fit my needs. **i3wm** has been my primary go-to window manager for bare Linux setups. If `i3wm` is installed, **Polybar** follows after. They are very compatible and works well with each other, `i3wm` almost feels bare without `polybar`.

With [Polybar]() installed, I started customizing it, I already have Polybar config files that I customized before but I decided to start anew.

### What is Polybar?

> **Polybar** aims to help users build beautiful and highly customizable status bars for their desktop environment, without the need of having a black belt in shell scripting.
>
> *- An excerpt from their [official Github repository](https://github.com/polybar/polybar).*

### Polybar provides default `battery` module, why bother?

That is true, Polybar does provide [default `battery` module](https://github.com/polybar/polybar/wiki/Module:-battery) that is highly customizable but I love customizing and having a clean, minimal and yet highly informative looks hence this post.

The biggest problem I had with Polybar's built-in battery module wasn't the feature itself but rather the difficulty of customizing it, it's a personal problem but a problem nonetheless. I simply could not wrap my head around how to go about customizing it the way I liked, especially the padding around customized battery module. I liked the `ramp-capacity-*` animations, it was and is awesome. I just couldn't figure out how to add padding to my battery module therefore, I decided to use an external script to fix that.

### What script?

The main goal that lead me to write this script was proper color formatting and padding, I know, pretty stupid but it makes me happy. These were the things I wanted the script to be able to accomplish.

1. Get battery charge percentage.
2. Battery status - Full, Charging, etc.
3. No need for animations, 2 simple icons to represent battery state. (charging or discharging)
4. Background and foreground color depending on the charge and the battery state, compatible with Polybar.

The tasks I wanted to accomplish were made simple using the `acpi` package available freely and officially in Arch Linux repo.

```bash
#!/usr/bin/bash

# Prashant Shrestha
# 2020-06-23

# Getting the data and initializing an array.
BATTERY_INFO=($( acpi | awk -F',' '{ print $0 }'))

# Formatting helpers
CHARGE=$((${BATTERY_INFO[3]//%,}))
ICON=""
FORMAT=""

# Format battery icon, depending on the status.
if [[ "${BATTERY_INFO[2]}" == *"Charging"* ]]; then
    ICON="  " # Plug icon, font awesome.
else
    ICON="  " # Car Battery icon, font awesome
fi

if [[ $CHARGE -lt 10 ]]; then
    # Red-ish
    FORMAT="%{B#B33D43}%{F#fff}  "
elif [[ $CHARGE -lt 30 ]]; then
    # Orange-ish
    FORMAT="%{B#F27F24}%{F#000}  "
elif [[ $CHARGE -lt 60 ]]; then
    # Yellow-ish
    FORMAT="%{B#E5C167}%{F#000}  "
elif [[ $CHARGE -lt 100 ]]; then
    # Green-ish
    FORMAT="%{B#6FB379}%{F#000}  "
fi

# Format charge & color depending on the status.
FORMAT="$FORMAT$ICON $CHARGE %{B- F-}"

# Final formatted output.
echo $FORMAT
```

Here's what my bottom Polybar looks like after using the script above.

{% include lightcase.html name="polbar-screenshot.png" alt="Bottom Polybar Screenshot" local="true" %}

Enjoy customizing Polybar..