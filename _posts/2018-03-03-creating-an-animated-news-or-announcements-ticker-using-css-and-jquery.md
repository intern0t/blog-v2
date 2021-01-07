---
layout: post
title: "Creating an animated News/Announcements ticker using CSS and jQuery."
author: Prashant Shrestha 
date: 2018-03-03 12:57:27 -500 
categories: development
tags: jquery scss news announcements ticker animated web html codepen
---

We come across multiple websites with news ticker now-a-days, mainly on the websites dedicated to serving news to the readers. It sounds very simple but its simplicity is what makes it even more desirable. In the end of the day, animation draws the reader's attention towards the ticker, constantly if I might add, which is a good thing. Whether we have a static ticker with constant data or dynamic data, ticker makes it beautiful in a way to view newly added/updated contents.
<!--excerpt-->
[![Image](https://i.imgur.com/dfOiWdt.jpg)](https://i.imgur.com/dfOiWdt.jpg "News & Announcements Ticker"){:data-rel="lightcase"}

I would like to clarify beforehand that the terminologies used, such as *"announcements", "news"* are meant for similar purposes for this tutorial. You can name it whichever or whatever, I named it **announcement** because this is my personal blog and not a news website.

That being said, let us start by creating a layout using **HTML**, fairly simple one, a box with a title and a list of unordered list with our data.

```html
<div class="announcements-container">
  <div class="container-title">New Blog Posts</div>
  <ul class="announcements">
    <li><a href="https://prashant.me/development/2017/11/15/jekyll-search-using-google-custom-search-engine-and-jquery.html" title="#">Jekyll search using Google’s Custom Search Engine and jQuery. @2017-11-15T15:54:27+00:00.</a></li>
    <li><a href="https://prashant.me/development/2017/10/23/creating-and-integrating-spotify-now-playing-to-open-broadcaster-software.html" title="#">Creating and integrating Spotify’s Now playing track to Open Broadcaster Software (OBS) using C#. @2017-10-23T22:09:27+00:00.</a></li>
    <li><a href="https://prashant.me/development/2017/10/17/creating-and-implementing-a-beginner-friendly-scroll-to-top-button-for-your-website.html" title="#">Creating and Implementing a beginner friendly scroll-to-top button for your website. @2017-10-17T05:05:27+00:00.</a></li>
    <li><a href="https://prashant.me/development/2013/10/12/css-pseudo-class-manipulation-using-jquery.html" title="#">CSS Pseudo classes manipulation using jQuery. @2017-10-12T12:21:27+00:00.</a></li>
  </ul>
</div>
```

Now that we have our **layout**, let's add some styling to it. I used *(S)CSS* for this purpose, it is quite easy to convert it to regular CSS.

```scss
/** Fonts **/
@import url("https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300|PT+Sans");

$opensanscondensed: "Open Sans Condensed", sans-serif;
$ptsans: "PT Sans", sans-serif;
$regularFontSize: 13px;

/** Variables **/
$pageBackground: #616161;
$announcementContainerHeight: 40px;

/** Mixins **/
@mixin left-border-radius($rad) {
  -webkit-border-top-left-radius: $rad;
  -webkit-border-bottom-left-radius: $rad;
  -moz-border-radius-topleft: $rad;
  -moz-border-radius-bottomleft: $rad;
  border-top-left-radius: $rad;
  border-bottom-left-radius: $rad;
}

@mixin transitionize($type, $sec) {
  -webkit-transition: $type $sec ease-out;
  -moz-transition: $type $sec ease-out;
  -o-transition: $type $sec ease-out;
  transition: $type $sec ease-out;
}

/** Styling **/
body {
  background: $pageBackground;

  .announcements-container {
    width: 65%;
    background: #f5f5f5;
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 20%;
    display: inline-block;
    font-family: $ptsans;
    height: $announcementContainerHeight;
    line-height: $announcementContainerHeight;
    @include left-border-radius(4px);

    .container-title {
      width: 13%;
      height: 100%;
      overflow: hidden;
      padding: 0 15px 0 15px;
      float: left;
      background: #03a9f4;
      text-align: center;
      font-size: $regularFontSize;
      text-transform: uppercase;
      color: white;
      letter-spacing: 1px;

      @include left-border-radius(2px);

      img {
        width: 16px;
        height: 16px;
        vertical-align: middle;
        margin: -5px 3px 0 0;
      }
    }

    ul.announcements {
      width: (100%-(18%+15%));
      float: left;
      height: $announcementContainerHeight;
      overflow: hidden;
      list-style-type: none;
      vertical-align: middle;

      li {
        width: 100%;
        overflow: hidden;
        font-size: $regularFontSize + 1;
        margin: -15px 0 0 0;
        vertical-align: middle;
        padding: 0;
        line-height: $announcementContainerHeight;
        text-align: left;
        white-space: nowrap;
        text-overflow: ellipsis;

        a {
          width: 100%;
          text-decoration: none;
          color: #212121;
          @include transitionize(color, 0.5s);

          &:hover {
            color: #03a9f4;
          }
          &:visited {
            color: #616161;
          }
        }
      }
    }
  }
}
```

That should give our layout a fairly simple yet clean styling. Now, time to make our ticker **functional**, the core code.

```javascript
/*
  News Ticker - Prashant Shrestha
  Date: 2018-03-03
*/

var hoveredAnnouncement = null;

function announcementTicker() {
  $(".announcements")
    .filter(function(item) {
      return !$(this).is(hoveredAnnouncement);
    })
    .each(function() {
      $(this)
        .find("li:first")
        .slideUp(function() {
          var announcement = $(this).closest(".announcements");
          $(this)
            .appendTo(announcement)
            .slideDown();
        });
    });
}
setInterval(announcementTicker, 5000);

$(function() {  
  $(".announcements").hover(
    function() {
      hoveredAnnouncement = $(this);
    },
    function() {
      hoveredAnnouncement = null;
    }
  );
});
```

The jQuery code might be a little confusing however I assure you, it is as simple as I could write. What we are doing is that we are tagging our list elements and keeping track of the next entry/data/list item in our unordered list and sending the currently active list item to the end of the list with a `slideDown({ .. })` animation and adding the first list item after the current one to the top using the `slideUp({ .. })` animation.

You can view the demo of news/announcement ticker in [@intern0t-Codepen](https://codepen.io/intern0t/pen/QQPxBq?editors=0010). 

**The demo is best viewed in a separate browser/tab because it is NOT responsive.**

<p data-height="265" data-theme-id="light" data-slug-hash="QQPxBq" data-default-tab="result" data-user="intern0t" data-embed-version="2" data-pen-title="Simple animated announcements/news ticker." class="codepen">See the Pen <a href="https://codepen.io/intern0t/pen/QQPxBq/">Simple animated announcements/news ticker.</a> by Prashant M.  Shrestha (<a href="https://codepen.io/intern0t">@intern0t</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Enjoy & Happy Coding!
