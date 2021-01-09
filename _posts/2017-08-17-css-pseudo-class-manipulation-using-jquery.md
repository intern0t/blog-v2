---
layout: post
title: "CSS Pseudo classes manipulation using jQuery." 
author: Prashant Shrestha 
date: 2017-10-12 08:21:27 -400 
categories: development
tags: css design develop dom style manipulate access jquery
---

The [Pseudo classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) in [Cascading Style Sheets (CSS)](https://en.wikipedia.org/wiki/Cascading_Style_Sheets) refers to the state of an element. Some of the element states among many that are useful for web designers or developers includes `:active`, `:hover`, `:focus` and `:visited` because in a designing phase, by altering these element states, one can focus on small details.

The biggest problem with Pseudo-classes manipulation using [jQuery](https://jquery.com/) is that they are not a part of the [Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) therefore is inaccessible by Javascript. Although they are rendered by the browser like any other DOM elements, they are not quite part of DOM.

<!--excerpt-->

One way to get around this is by creating a class, applying the Pseudo class to the class created and manipulate the newly created class.

Let us take this piece of CSS code for example. If we try and use jQuery to manipulate the pseudo-class `:hover`, we will not be able to.

```css
.element{
    color: red;
}
.element:hover{
    color: blue;
}
```

Now by creating a class, we will be able to alter the state of our element.

```css
.element{
    color: red;
}
.element.onHover:hover{
    color: blue;
}
```

Using jQuery, we can simply toggle or add the class to our element accordingly.

```javascript
$(document).ready(function(){
    $('.element').toggleClass('onHover');
    // or
    $('.element').addClass('onHover');
    // To Remove -
    $('.element').removeClass('onHover');
});
```