---
layout: post
title: "Implement NiceScroll in your web applications!" 
author: Prashant Shrestha 
date: 2015-05-29 20:40:14 -400 
categories: development 
tags: traffic network redirection server administration management redir proxy route
---

Normally, a web designer can grasp scrolling effects and the scrollbar looks between [Google Chrome](http://www.google.com/chrome/) and [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/new/). First difference anyone might quickly grasp would be the scrolling effect, that smooth scrolling effect of Mozilla. If you have yet to experience the smooth scroll, follow this path in Mozilla ..

`Tools > Options > Advanced > General Tab`
<!--excerpt-->
[![Smooth Scrolling](https://i.imgur.com/046MlAe.png)](https://i.imgur.com/046MlAe.png "Smooth Scrolling."){:data-rel="lightcase"}

Similar yet customizable feature can be added in any web application making it scroll friendly. I used [NiceScroll](http://areaaperta.com/nicescroll/) to achieve this in my current blog powered by [Ghost](https://ghost.org/). This current one isn't the default scroll as I played with NiceScroll's settings a little.

In order to implement NiceScroll, you first have to download the latest and stable NiceScroll Javascript [library](https://code.google.com/p/jquery-nicescroll/downloads/list) - I am using NiceScroll [v3.4.0](https://code.google.com/p/jquery-nicescroll/downloads/detail?name=jquery.nicescroll.340.zip&can=2&q=).

Installation is too easy, either follow the guide provided by NiceScroll itself or follow my lead.

Download the release package of your choice, [v3.4.0](https://code.google.com/p/jquery-nicescroll/downloads/detail?name=jquery.nicescroll.340.zip&can=2&q=) for me.

```bash
wget https://jquery-nicescroll.googlecode.com/files/jquery.nicescroll.340.zip
unzip jquery.nicescroll.340.zip
```

Append and add `jquery.nicescroll.min.js` at the end of the `default.hbs` file and in the directory `./public_html/content/themes/<theme-name>/assets/js/`.

```html
{% raw %}
<script src="{{ asset "js/jquery.nicescroll.js"}}"></script>
{% endraw %}
```

There are various ways to initialize NiceScroll but the way I did was create a `loader` file which loads all the initialized jQuery libraries from one single file. If you do not want to bother creating a file, you may append the `default.hbs` file inside your theme directory and append this code at the bottom of the file.

```javascript
$(document).ready(function () {
    // Nice Scroll Setup..
    $("html").niceScroll({
        styler: "fb",
        cursorcolor: "#000",
        zindex: 9999,
        cursorborder: "0",
        autohidemode: true
    });
});
```

Restart or stop-start your Ghost platform or simply refresh for regular web applications to take effect.

~ Enjoy!