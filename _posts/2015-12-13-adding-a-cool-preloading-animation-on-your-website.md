---
layout: post
title:  "Adding a cool Preloading animation on your website."
author: Prashant Shrestha
date:   2015-12-13 04:29:33 -400
categories: development
tags: setup jquery javascript preload image css html website frontend design style
---

I am sure you have already stumbled upon plenty of websites with full blank screen with a cool animation in the center for you to watch while the page loads which I recently found out is known as **Preloader**. Here I am writing one of the shortest tutorials I've ever written in this blog.

I shall be honest to you, I tried to create my own animation through Adobe Photoshop but failed miserably therefore I searched around in the net for ready-made cool animations and found plenty of them. I used the **3D Cube** thing which I liked, looks funky and cool but there are plenty of animated images `*.gif` you can find online.
<!--excerpt-->
One of the most professional one I found, liked and currently am considering to use it for my next public project is displayed below.

[![Preloader Professional]({{ site.ph }}){:data-src="{{ site.ip | append: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/5e153020180373.562e6fcb9c769.gif" }}" .lazy}](https://mir-s3-cdn-cf.behance.net/project_modules/disp/5e153020180373.562e6fcb9c769.gif){:data-rel="lightcase"}

I did not use third party image hosting site in order to keep the ownership of the image intact.

Let us start with the coding, open up your main file - normally `index.*` and add the code right below the `body` tag.

```html
<div class="preload"></div>
```

Let us move on with the CSS part where we center the `*.gif` into a layer which will be shown during the page load process.

```css
.preload{
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background: url('../images/cube_preloader.gif') center no-repeat #34495E;
}
```

The `background: url()` can have different parameters than the one I provided above which depends on your directory structure/layout. Once done, compile or simply save the **CSS** file. I changed the overally background color to match the preloading `.gif` background color which is `#34495E`.

Final work is to trigger the event where we want the preloader to pop-up, in our case it will be during the `window.load` event which we shall handle it through jQuery.

Open up your jQuery file and add the code below `window.load` event.

```javascript
$(window).load(function(){
    $(".preload").fadeOut("slow");
});
```

That's it, of course you will require jQuery dependency in your project which you can find it [here](https://code.jquery.com/).

Some cool Preloading gifs I found online are listed below, choose the one you want and don't forget to mention/thank the creator.

[![]({{ site.ph }}){:data-src="{{ site.ip | append: "https://s-media-cache-ak0.pinimg.com/originals/90/80/60/9080607321ab98fa3e70dd24b2513a20.gif" }}" .lazy}](https://s-media-cache-ak0.pinimg.com/originals/90/80/60/9080607321ab98fa3e70dd24b2513a20.gif){:data-rel="lightcase"}
[![]({{ site.ph }}){:data-src="{{ site.ip | append: "http://netdna.webdesignerdepot.com/uploads/2013/07/dribble_gif.gif" }}" .lazy}](http://netdna.webdesignerdepot.com/uploads/2013/07/dribble_gif.gif){:data-rel="lightcase"}
[![]({{ site.ph }}){:data-src="{{ site.ip | append: "http://netdna.webdesignerdepot.com/uploads/2013/07/bike.gif" }}" .lazy}](http://netdna.webdesignerdepot.com/uploads/2013/07/bike.gif){:data-rel="lightcase"}

Good Luck!