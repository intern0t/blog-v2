---
layout: post
title: Easy toggle between light or dark color schemes using simple CSS.
author: Prashant Shrestha
date: 2020-04-22 14:41:14 -400
categories: development
tags: design css theme mode light dark
---

While developing a new theme for my personal blog in the midst of Coronavirus outbreak, I learned much convenient method to change themes or have an option to change color schemes in a website. It is convenient in a way such that there is a minimal overhead to the data we need to track and it is amazingly fast.

<!--excerpt-->

This theme toggle method utilizes CSS Variable `var()`, a tiny metadata in our `html` in the front end, and storage for a simple string to keep track of our active theme.

### Preparing the color schemes

There are two color schemes I prepared, light and dark. Keep the stylesheet as modular as possible.

