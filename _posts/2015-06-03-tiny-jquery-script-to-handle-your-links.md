---
layout: post
title: "Tiny jQuery script to handle your links!"
author: Prashant Shrestha
date: 2015-06-03 02:24:00 -400
categories: development
tags: redirect target blank window development javascript jquery 
---

To make a website that is favored by others various components comes into play, Search Engines Optimizations (SEO), looks, stability, smooth surfing, clean and many more which even I am not aware of. **Very small** features can help your visitors by making their visit to your website fun and smooth while keeping it professional on the side.
<!--excerpt-->
When I first launched my [Ghost](https://ghost.org/) [blog](http://www.nepirates.com/), there was no link handlers. In simple words, the external and internal links acted the same. For example - Before, when I post a link from [Reddit](https://www.reddit.com/) and a link to one of my post or some [static page](http://www.nepirates.com/contact-me/), it would open both of them in the current tab which means, if my visitor wants to continue reading, he would have to go through a hassle of clicking the `back` button in the browser or `backspace` key in their keyboard however last week, I changed it to open all links a **new tab** which I think annoyed them more (from their mails), each and every links in my post would open in a new tab. Not just the links inside a post but static page links as well. Today I decided to change the way my links work the way I want to and hopefully my readers will have a smooth surf in my blog.

I used jQuery for this task as I have yet to explore the `PHP` usage in this blogging platform. This is the way I did it.

```javascript
// Handle all URLs - Prashant M. Shrestha - Needs more customization!
var yourDomain = "prashant.me";

$("section.post-content a[href^='http://'], a[href^='https://']").click(function () {
    if ($(this).attr("href").indexOf(yourDomain) == -1) {
        // If it's not* an INNER LINK!
        $(this).attr("target", "_blank");
    } else {
        // If it's an INNER LINK!
        $(this).attr("target", "");
    }
});
```
I tested it and it worked great, I liked it, hope my readers like it too. It is a very simple **newbie** jQuery snippet as I am **not** that* good with jQuery yet. Simple `if-else` statements could easily get the work done! This can be done via. ternary conditional operator `(condition) ? <true> : <false>;` as well, one line code but keeping it simple, the way I like it!

For those who **do not** know where to add this code, you can append it inside any `.js` file inside the `document.ready` function which can be found under `./public_html/content/themes/<theme-name>/assets/js/` I use the default [Casper](http://www.allghostthemes.com/casper/) theme so that's where you can find it if you are using the Ghost's **[default theme](http://www.allghostthemes.com/casper/)**.

```javascript
$(document).ready(function () {
    /* here */
});
```

In order to keep my codes clean and to separate my codes and others, I created my own `.js` file and cramp my **messy** codes in there, it works! Here's the preview of my `js` directory. I created a `.js` file named `jLoader.js`.

[![Image](https://i.imgur.com/LnPK50F.png)](https://i.imgur.com/LnPK50F.png "List of Javascript libraries used."){:data-rel="lightcase"}

~ Happy Coding & Namaste!