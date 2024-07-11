---
layout: post
title: Logitech's MX Keys and Master 3S config for smooth scrolling in Mac.
author: Prashant Shrestha
date: 2024-07-10
categories: mac
tags: mac hardware configuration setup
words: 188
---

For some reason, the Logitech MX Master 3S does not function the same in MacOS compared to Windows and Linux distros. I tried many things such as installing Logi Options, fiddling around with the settings to no avail. The issue is with the **scrolling**, it is not smooth.

<!--excerpt-->

I stumbled upon a lots of suggestions from various pages in the internet but one combination worked great. It requires us to install 2 different applications.

1. [Logi Options+](https://www.logitech.com/en-us/software/logi-options-plus.html)
2. [`mos`](https://formulae.brew.sh/cask/mos)

### Logi Option+ > Scroll wheel settings

```bash
Scrolling speed = 0%
Smooth scrolling = disabled
Smartshift = disabled
Free/Ratchet = Your preference
```

Refer to the example below.

{% include lightcase.html name="logi-options+.png" alt="logi-options+-scroll-wheel-settings" local="true" %}

{% include lightcase.html name="logi-options+-scroll-wheel-settings.png" alt="logi-options+-scroll-wheel-settings" local="true" %}

### Run `mos`.

Once you run `mos`, it'll stay in the status bar. Open Preferences for `mos` and check **Smooth Scrolling**. Other settings are user preference. I enabled **Launch on login**.

{% include lightcase.html name="mos-preferences.png" alt="mos-preferences" local="true" %}

No system restart needed.