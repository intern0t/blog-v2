---
layout: post
title: "Creating a web widget to get currently playing tracks using Last.FM."
author: Prashant Shrestha 
date: 2018-03-04 08:57:27 -500 
categories: development
tags: jquery scss web html codepen ajax auto lastfm music widget development
poster: https://i.imgur.com/U1EtR40.png
---

It all started with my cousin asking what kind of songs I listen to, a simple question with simple answer. This is where the idea of *Now Playing* integration on my website came from. Considering I already used [Last.fm](https://www.last.fm) which is the last stop for music enthusiasts, I kid you not; it is amazing to create and compile a library with an amazing and accurate recommendation. I am currently using it to Scrobble my Spotify's Now Playing tracks and loving it so far. I noticed Last.fm provides free-to-use [API](https://www.last.fm/api), although requires an API key [generated](https://www.last.fm/api/account/create) specifically for you to access the API Endpoints, it is free nonetheless. I was occasionally fiddling around with my music clients, namely [**CMUS**](), [**Spotify**]() and [**QMMP**]() and noticed they have Last.FM integration, built-in or in plugin form. 
<!--excerpt-->

Fast forward; I started researching on [Last.fm's API Endpoints](https://www.last.fm/api) and noticed a section named `User` with bunch of sub-endpoints which includes [`User.getRecentTracks`](https://www.last.fm/api/show/user.getRecentTracks), the one which our widget will solely rely on.

For the development purposes, I will be using HTML, (S)CSS, and jQuery/JavaScript. HTML is fairly simple; it is a layout of your choice and preference.

```html
<div class="nowplayingcard">
    <div class="nowplayingcontainer-inner">
        <img id="trackart" src="#">
        <div class="trackInfo">
            <a id="tracktitle"></a>
            <a href="#" id="trackartist"></a>
        </div>
    </div>
</div>
```

What we did here is to create a foundation of what data goes where and such. Nothing complicated!

Our next step is to give our foundation a look, style if you will.

```scss
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

$globalFontSize: 13px;
$globalFontFamily: "Source Sans Pro", sans-serif;
$globalBorderRadius: 3px;

@mixin border-left-radius($radius) {
  -webkit-border-top-left-radius: $radius;
  -moz-border-top-left-radius: $radius;
  -ms-border-top-left-radius: $radius;
  -o-border-top-left-radius: $radius;
  border-top-left-radius: $radius;

  -webkit-border-bottom-left-radius: $radius;
  -moz-border-bottom-left-radius: $radius;
  -ms-border-bottom-left-radius: $radius;
  -o-border-bottom-left-radius: $radius;
  border-bottom-left-radius: $radius;
}

body {
  padding: 0;
  margin: 0;

  .nowplayingcard {
    width: 20%;
    margin: 0 auto;
    margin-top: 3%;
    font-family: $globalFontFamily;
    font-size: $globalFontSize;

    .nowplayingcontainer-inner {
      width: 100%;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      transition: 0.3s;
      display: inline-block;
      @include border-left-radius($globalBorderRadius);

      &:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
      }

      img#trackart {
        max-width: 30%;
        float: left;
        left: 0;
        @include border-left-radius($globalBorderRadius);
      }

      .trackInfo {
        width: 70%;
        float: left;
        display: block;

        a {
          max-width: 90%;
          display: block;
          font-size: 14px;
          text-align: left;
          text-decoration: none;
          vertical-align: middle;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;

          &:nth-child(odd) {
            img {
              width: 15px;
              height: 15px;
              vertical-align: middle;
              margin: -2% 3px 0 0;
            }

            color: black;
            font-weight: bold;
            vertical-align: middle;
            line-height: 15px;
            letter-spacing: 0.2px;
            padding: 10% 0 0 5%;
          }

          &:nth-child(even) {
            img {
              width: 15px;
              height: 15px;
              vertical-align: middle;
              margin: -2% 3px 0 0;
            }

            color: gray;
            font-size: $globalFontSize - 1px;
            letter-spacing: 0.1px;
            padding: 5% 0 0 5%;
          }
        }
      }
    }
  }
}

```

Our final step is to make our widget functional, why?! .. because we are fiddling around with dynamic data, and not just any data, data that we pull from a different source. If we were to plan this, we could say, we need a loop to constantly check for data change.

For this very purpose, we will use **Last.fm's** API's sub-endpoint, `User.getRecentTracks`.

>Get a list of the recent tracks listened to by this user. Also includes the currently playing track with the nowplaying="true" attribute if the user is currently listening.

The good thing is it has various customizable parameters, `limit`, `from`, `to`. We won't be using the last two but the `limit`, the reason behind is that `User.getRecentTracks`, if executed as default fetches **50** recent tracks, that's **49** useless tracks data. This API Endpoint works in a `Stack` theory; any good API endpoint should use `Stack` theory if returning multiple data, the last one first, first one last. That should clarify why I called **49**/**50** useless tracks data because, for our purposes, we only need **1**.

Using JavaScript/jQuery, we have.

```javascript
/**
  Developed by Prashant Shrestha
  + https://prashant.me
*/

var lastfmData = {
  baseURL:
    "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=",
  // Your Last.fm Username
  user: "YOUR_LASTFM_USERNAME",
  // Your API key
  api_key: "YOUR_LASTFM_API_KEY",
  additional: "&format=json&limit=1"
};

var getSetLastFM = function() {
  $.ajax({
    type: "GET",
    url:
      lastfmData.baseURL +
      lastfmData.user +
      "&api_key=" +
      lastfmData.api_key +
      lastfmData.additional,
    dataType: "json",
    success: function(resp) {
      var recentTrack = resp.recenttracks.track[0];
      var formatted =
        "<img src='https://i.imgur.com/EgWjJry.png'>" + recentTrack.name;
      $("a#tracktitle")
        .html(formatted)
        .attr("href", recentTrack.url)
        .attr("title", recentTrack.name + " by " + recentTrack.artist["#text"])
        .attr("target", "_blank");

      var artistFormatted =
        "<img src='https://i.imgur.com/fae5XZA.png'>" +
        recentTrack.artist["#text"];
      $("a#trackartist")
        .html(artistFormatted)
        .attr("title", "Artist : " + recentTrack.artist["#text"]);
      $("img#trackart").attr("src", recentTrack.image[2]["#text"]);
    },
    error: function(resp) {
      $("a#tracktitle").html(
        "<img src='https://i.imgur.com/EgWjJry.png'>" + "Silence!"
      );
      $("img#trackart").attr("src", "https://i.imgur.com/Q6cCswP.jpg");
      var artistFormatted =
        "<img src='https://i.imgur.com/fae5XZA.png'>Prashant Shrestha";
      $("a#trackartist")
        .html(artistFormatted)
        .attr("href", "www.prashant.me/");
    }
  });
};

// Get the new one.
getSetLastFM();
// Start the countdown.
setInterval(getSetLastFM, 10 * 1000);
```

Simple enough, those hardcoded images hosted in Imgur are from [Icon8](https://icons8.com/), a great website for icons.

The reason I added `getSetLastFM();` and again called `setInterval(getSetLastFM, ..);` is because we don't want the users to wait 10 seconds with no data at the very first time. After completion, the widget should look something like this.

[![Image](https://i.imgur.com/TXXxrar.png)](https://i.imgur.com/TXXxrar.png "Widget Demo"){:data-rel="lightcase"}

There's a responsiveness problem with this, and we can fix it with either creating a responsive layout or a going the `fixed` width and height way.

Below is the embedded [Codepen](https://codepen.io/intern0t/pen/qxwMKo?editors=0100). Please view it in a new tab to see the proper layout.

<p data-height="265" data-theme-id="light" data-slug-hash="qxwMKo" data-default-tab="result" data-user="intern0t" data-embed-version="2" data-pen-title="Last.FM Now Playing!" class="codepen">See the Pen <a href="https://codepen.io/intern0t/pen/qxwMKo/">Last.FM Now Playing!</a> by Prashant M.  Shrestha (<a href="https://codepen.io/intern0t">@intern0t</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Enjoy & Happy Coding!
