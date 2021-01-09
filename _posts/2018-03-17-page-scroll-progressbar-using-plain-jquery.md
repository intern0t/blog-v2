---
layout: post
title: "Create a page scroll progressbar for websites using plain jQuery."
author: Prashant Shrestha
date: 2018-03-17 21:37:00 -400
categories: development
tags: sass html jquery javascript design develop website codepen
poster: https://i.imgur.com/F2TE2d0.jpg
---

Website scroll progressbar might not be the accurate terminology to describe this **thing** but hopefully can clarify the context I am referring to. It is basically a progressbar which *progresses* as you scroll below and regress as you scroll upwards. I've seen this implemented through a **3<sup>rd</sup>** party plugins and libraries in countless websites.

Instead of using a whole different third party library for a simple task as this, I decided to create my own to implement in this blog and I must say, it looks fairly similar to any other 3rd party plugins out there.
<!--excerpt-->
My short brainstorming to solve and achieve this progressbar felt very clear and concise but ran into some difficulty with calculations which I will explain later.

We need two things to achieve or implement this scroll progress in our website.

#### Things we need

 1. A `div` container on top of our page.
 2. A hook to manage our document's `scroll` event.

Let's start out by creating an empty `div` container in our page, preferably right below the `<body>` tag.
```html
<div class="progress"></div>
```

Now, let's give it a bit of a style, `box-shadow` and a preferred `background-color` should keep it simple and attractive. Considering my blog consists of dark `foreground` colors, I chose to go with `#000000` *(Hex Black)*.
```scss
.progress {
    width: 0;
    height: 3px;
    position: fixed;
    top: 0;
    left: 0;
    background: #000000;
    border: 0;
    box-shadow: -1px 2px 2px -1px #000000;
    -webkit-box-shadow: -1px 2px 2px -1px #000000;
    -moz-box-shadow: -1px 2px 2px -1px #000000;
    z-index: 99;
}
```

Now that we are done creating a styled progressbar for our website, we should add functionality on it by hooking into our document's `scroll` event. Considering I used jQuery, I decided to add my code in jQuery as well.

```js
$(document).scroll(function(e) {
    var dimensions = {
        'scrollTop': $(window).scrollTop(),
        'documentHeight': $(document).height(),
        'windowHeight': $(window).height()
    };

    // Exclude the window to get actual height!
    var pageScrolledPercentage = (dimensions.scrollTop / (dimensions.documentHeight - dimensions.windowHeight)) * 100;
    $('.progress').css('width', pageScrolledPercentage + '%');
});
```

.. and that should give us a nice progressbar for our website which sets the progress to our currently scrolled percentage.

The difficulty for me was to figure out the actual document's height. For one of my equation during the development phase gave me maximum of **94%** instead of **100%** for fully scrolled.

Check out the [Codepen Demo.](https://codepen.io/Scarecr0w/pen/XEjwOa)

<p data-height="265" data-theme-id="light" data-slug-hash="XEjwOa" data-default-tab="result" data-user="Scarecr0w" data-embed-version="2" data-pen-title="Page Scroll Progressbar" data-preview="true" class="codepen">See the Pen <a href="https://codepen.io/Scarecr0w/pen/XEjwOa/">Page Scroll Progressbar</a> by Prashant M.  Shrestha (<a href="https://codepen.io/Scarecr0w">@Scarecr0w</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Cover Image by [@nathananderson](https://unsplash.com/@nathananderson) at [Unsplash](https://unsplash.com/photos/phX3dh7fLZQ).

Enjoy & Happy Coding.
