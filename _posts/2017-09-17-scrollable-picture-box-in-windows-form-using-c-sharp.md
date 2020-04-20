---
layout: post
title: "Scrollable Picture box in Windows Form using C#." 
author: Prashant Shrestha 
date: 2017-09-17 10:02:27 -400 
categories: development
tags: C# csharp development form design windows picture image box container fluid layout
---

While I was working on my personal Comic Reader Application, I came across a problem which was quite difficult to find solution for. A scrollable picture box, as simple as it might sound, it quite isn't.

I used C# 4.5 version for this particular project of mine and needed a zoom in/out, scroll a large image and such in a Window Form.

The solution I found out to be the most effective after spending hours searching Google results was a tad bit too simple.
<!--excerpt-->
The `PictureBox` control should be enclosed in a `Panel` with `AutoScroll` property set to `True`.

Simple as that, however the `PictureBox` control can easily be resized programmatically using the `Dimension` or `Width` property.

<a href="https://i.imgur.com/ORNdQTq.gif" data-rel="lightcase"><img src="https://i.imgur.com/ORNdQTq.gif"></a>

Works flawlessly.