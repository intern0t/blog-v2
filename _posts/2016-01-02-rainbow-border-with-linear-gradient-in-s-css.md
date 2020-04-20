---
layout: post
title:  "Rainbow border with linear-gradient in (S)CSS."
author: Prashant Shrestha
date:   2016-01-02 20:18:11 -400
categories: development
tags: scheme color design css scss style code snippet
---

As seen in couple websites, I wanted to implement and add rainbow border. Here's how to do it.

<!--excerpt-->
[![Image](https://i.imgur.com/xU8cjQ3.png)](https://i.imgur.com/xU8cjQ3.png "Demo"){:data-rel="lightcase"}
Demo from [JSFiddle](https://jsfiddle.net/intern0t/fp85voue/4/) is provided below -

<iframe width="100%" height="auto" src="//jsfiddle.net/Scarecr0w/fp85voue/9/embedded/" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

In your regular HTML file, normally body or header.

{% highlight html %}
<body>
  <h1>Prashant Says hello! - <a href="https://www.prashant.me/development/2016/01/03/rainbow-border-with-linear-gradient-in-s-css.html">prashant.me</a></h1>
</body>
{% endhighlight %}

I use SCSS pre-processor therefore here's the code which can easily be converted to regular CSS.

{% highlight sass %}
$gradient_ : 90deg, #1abc9c 15%, #2ecc71 15%, #2ecc71 12%, #3498db 12%, #3498db 32%, #9b59b6 32%, #9b59b6 35%, #34495e 35%, #34495e 55%, #f1c40f 55%, #f1c40f 59%, #e67e22 59%, #e67e22 63%, #e74c3c 63%, #e74c3c 82%, #ecf0f1 82%, #ecf0f1 92%, #95a5a6 92%;

$size_  : 100% 7px;

body{  
    background-image: -webkit-linear-gradient($gradient_);
    background-image: -khtml-linear-gradient($gradient_);
    background-image: -moz-linear-gradient($gradient_);
    background-image: -o-linear-gradient($gradient_);
    background-image: linear-gradient($gradient_);

    background-repeat: no-repeat;
    background-position-y: top;

    -webkit-background-size: $size_;
    -khtml-background-size: $size_;
    -moz-background-size: $size_;
    -o-background-size: $size_;
    background-size: $size_;

    h1{
        text-align: center;
        margin: 20px 0 0 0;
    }
}
{% endhighlight %}

You can change the color combinations in `$gradient_` and the height of the rainbow border with the `$size_` variable.

Good Luck & Enjoy the decoration!