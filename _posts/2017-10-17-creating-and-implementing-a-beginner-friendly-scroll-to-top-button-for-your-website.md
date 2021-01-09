---
layout: post
title: "Creating and Implementing a beginner friendly scroll-to-top button for your website." 
author: Prashant Shrestha 
date: 2017-10-17 01:05:27 -400 
categories: development
tags: design css javascript jquery development server website webpage beginner
---

Scroll-to-top button for your website? Is it even that important? A simple push of a button could take the visitors to the top of the page however it seems I have few readers who loves to scroll their page using the scrollbars on the right. In the end, it is all fun and games when it comes to adding feature to this blog.

This scrolling feature seems to have quite an impact on the web surfers as there exists a [chrome extension](https://chrome.google.com/webstore/detail/scroll-to-top-button/chinfkfmaefdlchhempbfgbdagheknoj?hl=en-US) just for this very purpose, I am sure it is more advanced than what I did for my blog. In addition, I also need to refrain from overusing third party libraries as it takes quite a bit of toll on the webpage serving process therefore the very reason for me to write a **very** simple script myself.
<!--excerpt-->
Let us start with designing the button itself, a trigger in simple words. A component initialization first and then [SASS](http://sass-lang.com)/CSS to design the button.

```html
<!-- Scroll to TOP!
–––––––––––––––––––––––––––––––––––––––––––––––––– -->
<a class="toTop" href="#top" title="Scroll to Top!">
    <span>
        <i class="icon-one-finger-swipe-up"></i>
        <!-- Thank you icomoon.io for awesome icons! -->
    </span>
</a>
```

Don't mind the comments, makes it easier for us later in the future if any changes are required. Moving onto SASS/CSS portion.

#### SASS

```scss
.toTop{
    width: 50px;
    height: 30px;
    position: fixed;
    background: #006AC8;
    color: white;
    display: none;
    right: 0;
    bottom: 100px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    // If you used Mixin, remove the two lines above and add @include border-left-radius(3px);
    text-align: center;
    z-index: 9999;
    font-size: 20px;
    cursor: pointer;
    opacity: .9;

    &:hover{
        opacity: 1;
    }

    span{
        text-align: center;
    }
}
```

A little [mixin](http://sass-lang.com/guide#topic-6) to handle our `border-radius` in various browsers.

```scss
@mixin border-left-radius(3px) {
    -webkit-border-bottom-left-radius: $radius;
    -webkit-border-top-left-radius: $radius;
    border-bottom-left-radius: $radius;
    border-top-left-radius: $radius;
}
```

#### CSS

This plain CSS is for those who are not familiar with SASS Preprocessor.

```css
.toTop{
    width: 50px;
    height: 30px;
    position: fixed;
    background: #006AC8;
    color: white;
    display: none;
    right: 0;
    bottom: 100px;
    -webkit-border-bottom-left-radius: 3px;
    -webkit-border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    border-top-left-radius: 3px;
    text-align: center;
    z-index: 9999;
    font-size: 20px;
    cursor: pointer;
    opacity: .9;
}

.toTop:hover{
    opacity: 1;
}

.toTop span{
    text-align: center;
}
```

Customize and serve your website locally to check and see whether the design is favorable, once you are done customizing the button, we move onto the Javascript section.

#### Javascript/jQuery

In order to meet my simplicity purposes, I decided to use built-in [method](https://api.jquery.com/scrollTop/), `.scrollTop()` and jQuery documentation describes this method as follows.

>**Description**: Get the current vertical position of the scroll bar for the first element in the set of matched elements or set the vertical position of the scroll bar for every matched element.

```javascript
$(document).ready(function(){
    $(window).scroll(() => {
        if($(this).scrollTop()){
            $(".toTop").fadeIn();
        }else{
            $(".toTop").fadeOut();
        }
    });

    $("a.toTop").click((e) => {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });
});
```

You can also customize after how many pixels of hidden view do you want the button to be visible by adding `> HIDDEN_PIXELS` in the window's `.scroll()` event.

```javascript
var HIDDEN_PIXELS = 50;

$(window).scroll(() => {
    if($(this).scrollTop() > HIDDEN_PIXELS){
        $(".toTop").fadeIn();
    }else{
        $(".toTop").fadeOut();
    }
});
```

We used Javascript's `animate()` function to give our scrolling a smooth effect.

Good Luck!