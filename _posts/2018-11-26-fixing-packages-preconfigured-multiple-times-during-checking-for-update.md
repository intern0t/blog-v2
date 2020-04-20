---
layout: post
title: "Fixing Packages Preconfigured multiple times error during package updates in Ubuntu."
author: "Prashant Shrestha"
date: 2018-11-26 10:52:00 +400
categories: linux
tags: linux packages update upgrade sources apt ubuntu
poster: https://i.imgur.com/GIZXCVo.png
---

After recently upgrading my workspace' operating system to Ubuntu 18.04 LTS, I went ahead to set it up as my old setup, [i3wm](https://i3wm.org/), [i3-gaps](https://github.com/Airblader/i3/wiki/Compiling-&-Installing), and [i3status-rust](https://github.com/greshake/i3status-rust). Downloaded and installed my favourite browser, Google Chrome and the day went normally, no problem.

Next day, as usual, I try and update my installed packages, and I get hit by the weirdest error ever about how my packages are preconfigured multiple times. At least the good news was they provided where the possible source of the error might be.
<!--excerpt-->

{% highlight no-highlight %}
W: Target Packages (main/binary-amd64/Packages) is configured multiple times in /etc/apt/sources.list.d/google-chrome.list:3 and /etc/apt/sources.list.d/google.list:1
W: Target Packages (main/binary-all/Packages) is configured multiple times in /etc/apt/sources.list.d/google-chrome.list:3 and /etc/apt/sources.list.d/google.list:1
W: Target Translations (main/i18n/Translation-en_US) is configured multiple times in /etc/apt/sources.list.d/google-chrome.list:3 and /etc/apt/sources.list.d/google.list:1
W: Target Translations (main/i18n/Translation-en) is configured multiple times in /etc/apt/sources.list.d/google-chrome.list:3 and /etc/apt/sources.list.d/google.list:1
W: Target Packages (main/binary-amd64/Packages) is configured multiple times in /etc/apt/sources.list.d/google-chrome.list:3 and /etc/apt/sources.list.d/google.list:2
W: Target Packages (main/binary-i386/Packages) is configured multiple times in /etc/apt/sources.list.d/google.list:1 and /etc/apt/sources.list.d/google.list:2
W: Target Packages (main/binary-all/Packages) is configured multiple times in /etc/apt/sources.list.d/google-chrome.list:3 and /etc/apt/sources.list.d/google.list:2
W: Target Translations (main/i18n/Translation-en_US) is configured multiple times in /etc/apt/sources.list.d/google-chrome.list:3 and /etc/apt/sources.list.d/google.list:2
W: Target Translations (main/i18n/Translation-en) is configured multiple times in /etc/apt/sources.list.d/google-chrome.list:3 and /etc/apt/sources.list.d/google.list:2
W: Target Packages (main/binary-amd64/Packages) is configured multiple times in /etc/apt/sources.list.d/google-chrome.list:3 and /etc/apt/sources.list.d/google.list:3
W: Target Packages (main/binary-i386/Packages) is configured multiple times in /etc/apt/sources.list.d/google.list:1 and /etc/apt/sources.list.d/google.list:3
W: Target Packages (main/binary-all/Packages) is configured multiple times in /etc/apt/sources.list.d/google-chrome.list:3 and /etc/apt/sources.list.d/google.list:3
W: Target Translations (main/i18n/Translation-en_US) is configured multiple times in /etc/apt/sources.list.d/google-chrome.list:3 and /etc/apt/sources.list.d/google.list:3
W: Target Translations (main/i18n/Translation-en) is configured multiple times in /etc/apt/sources.list.d/google-chrome.list:3 and /etc/apt/sources.list.d/google.list:3
W: Target Packages (main/binary-amd64/Packages) is configured multiple times in /etc/apt/sources.list.d/google-chrome.list:3 and /etc/apt/sources.list.d/google.list:4
W: Target Packages (main/binary-i386/Packages) is configured multiple times in /etc/apt/sources.list.d/google.list:1 and /etc/apt/sources.list.d/google.list:4
W: Target Packages (main/binary-all/Packages) is configured multiple times in /etc/apt/sources.list.d/google-chrome.list:3 and /etc/apt/sources.list.d/google.list:4
W: Target Translations (main/i18n/Translation-en_US) is configured multiple times in /etc/apt/sources.list.d/google-chrome.list:3 and /etc/apt/sources.list.d/google.list:4
W: Target Translations (main/i18n/Translation-en) is configured multiple times in /etc/apt/sources.list.d/google-chrome.list:3 and /etc/apt/sources.list.d/google.list:4
W: Target Packages (main/binary-amd64/Packages) is configured multiple times in /etc/apt/sources.list.d/google-chrome.list:3 and /etc/apt/sources.list.d/google.list:5
W: Target Packages (main/binary-i386/Packages) is configured multiple times in /etc/apt/sources.list.d/google.list:1 and /etc/apt/sources.list.d/google.list:5
W: Target Packages (main/binary-all/Packages) is configured multiple times in /etc/apt/sources.list.d/google-chrome.list:3 and /etc/apt/sources.list.d/google.list:5
W: Target Translations (main/i18n/Translation-en_US) is configured multiple times in /etc/apt/sources.list.d/google-chrome.list:3 and /etc/apt/sources.list.d/google.list:5
W: Target Translations (main/i18n/Translation-en) is configured multiple times in /etc/apt/sources.list.d/google-chrome.list:3 and /etc/apt/sources.list.d/google.list:5
{% endhighlight %}

#### The Quick fix!

It simply means you have duplicate sources in multiple source files. You can simply remove `google.list` from `/etc/apt/sources.list.d/` with the following command.

{% highlight zsh %}
sudo rm -rf /etc/apt/sources.list.d/google.list*
{% endhighlight %}

I used wildcard because there were multiple versions of `google.list` files such as `google.list`, `google.list.save`.

Made a blog post for reference.
