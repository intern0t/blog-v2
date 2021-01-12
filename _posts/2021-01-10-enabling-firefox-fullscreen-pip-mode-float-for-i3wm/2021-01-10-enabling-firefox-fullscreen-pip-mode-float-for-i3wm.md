---
layout: post
title: "Enabling full screen video in Firefox to float the window in i3wm." 
author: Prashant Shrestha 
date: 2021-01-09 15:18:14 -400 
categories: i3wm
tags: firefox browser i3 i3wm float style config pip pip-mode
words: 292
---

I spend a lot of time delving digital texts, most often ebooks and research papers but I do that while watching something on the side. There are times when I want to watch Youtube video or some videos but the browser I use, Firefox does not work as I need. Whenever I make the video fullscreen in a separate Firefox window which nests the video kept exiting out of the fullscreen mode. The built-in PIP-mode provided by Firefox does not work with text subtitles for some reason, it works flawlessly with the burned subtitiles which is expected but not the externally overlayed subtitled for example, text-based subtitles like `.srt`.

#### The Firefox config.
I fixed this issue after surfing and reading all sorts of articles and documentations in the web and learned about the `about:config` which can be accessed by typing `about:config` in the address bar.

Once we accept the risks, we can search for `full-screen-api.ignore-widgets` and toggle it to **true**. This way we can simply make the nested video fullscreen and the container window to float creating similar effect as PIP-mode with all the web components functional as needed.

#### Preview of what I needed.

I needed the subtitles to work perfectly, although there's no problem with Netflix, there are various streaming sites out there who later overlay the subtitles while streaming without burning the subtitles, hence, I needed the fullscreen feature to work perfectly to turn the browser itself into a PIP-like window!

{% include lightcase.html name="pip-mode-demo.png" alt="Netflix pip-mode window demonstration." local="true" %}

:stuck_out_tongue: