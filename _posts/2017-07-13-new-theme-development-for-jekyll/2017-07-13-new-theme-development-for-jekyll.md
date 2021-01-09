---
layout: post
title:  "New theme development for Jekyll!"
author: Prashant Shrestha
date:   2017-07-13 21:55:21 -0400
categories: rant
tags: jekyll design development blog Liquid
---
After a year long use of [Wordpress](https://wordpress.org/), I decided to move to Jekyll and give it a try. I am loving the full developer feel while using Jekyll, especially while setting it up and designing a custom theme. I love it's extendibility. I can develop and use my own custom features, plugins, in short, no more bulky and slow performance.

Designing a theme for Jekyll is so much fun, it had been a while I had not wireframed the frontend and the backend, I consider it a headache, even now! Simple designing a website or just developing a backend is easy, wireframing both together to create a complete product is a whole different ball game, interesting too.
<!--excerpt-->

I am quite glad, I had short but complicated experience with [Ghost](https://ghost.org/) Blog, both uses [Liquid Templating](https://shopify.github.io/liquid/) developed by [Shopify](https://www.shopify.com/). Besides the boring part, you write the blog post or pages in [Markdown](https://en.wikipedia.org/wiki/Markdown), how cool is that? I mean, it's not really new as almost every repositories now a days use Markdown for project pages, including `README.md`.

> Markdown is a lightweight markup language with plain text formatting syntax. It is designed so that it can be converted to HTML and many other formats using a tool by the same name. Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor. As the initial description of Markdown contained ambiguities and unanswered questions, many implementations and extensions of Markdown appeared over the years to answer these issues. (Source: Wikipedia)

I decided to integrate [Lightcase](http://cornel.bopp-art.com/lightcase/) to my theme because it was very simple and easy to use, I could create my own but maybe in the future!

{% include lightcase.html name="lv193nK.png" alt="" local="true" %}

Let's check the `code`, `pre`, `highlighter`, and `color-schemes` layouts. Let me throw in a starting code of my theme's `SASS` file. The color scheme for `_highlight.scss` is using `rougify style github`. Works great and looks great!

```scss
/* Global Variables */
$globalFontFamily: "Open Sans", arial, sans-serif;
$globalFontSize: 1.5em;
$globalBorderRadius: 2px;

/* Global Color Codes */
$navyBlue: #006AC8;
$breakerColor: #F1F1F1;
$quoteTextColor: #6a737d;
$quoteBorderColor: #dfe2e5;
```

Responsiveness looks OK for now, I suppose! Will add more features if I do not get too lazy.

{% include lightcase.html name="XBbKf6W.png" alt="" local="true" %}
{% include lightcase.html name="rjv6Fvb.png" alt="" local="true" %}
{% include lightcase.html name="a8OyTp6.png" alt="" local="true" %}

I achieved what I wanted in a blog - simple, minimal, professional yet light. The theme is still under development therefore you might reach `127.0.0.1` quite often while surfing around!