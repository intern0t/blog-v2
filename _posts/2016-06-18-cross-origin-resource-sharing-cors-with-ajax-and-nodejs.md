---
layout: post
title: "Cross-Origin Resource Sharing (CORS) with Ajax and NodeJS." 
author: Prashant Shrestha 
date: 2016-06-18 14:24:41 -400 
categories: development 
tags: traffic network server route ajax nodejs cors call
---

With the changes with client side and server side security policy regarding the HTTP requests and responses between two domains (origins), new developers who are just getting the feel of the language can experience hell when it comes to sending a request through jQuery to NodeJS application, whether it be the same server your contents are hosted in or in different servers.

It's a given, once a developer learns how to build an **API** (Application program interface), he or she will try to integrate their API with their client side application. It is not possible to do so because of the **CORS** security policy.
<!--excerpt-->
If he or she is developing both the web application in single work-space, also known as `localhost`, even then they will not be able to get this to work unless they add certain instructions in their response headers. If you are trying to send a POST data, the other end might receive it but you'll not receive the response. A big challenge for new standalone developers.

Look at the image displayed below, taken from one of my test applications.

[![](https://i.imgur.com/jhI71Aj.png)](https://i.imgur.com/jhI71Aj.png "CORS Error!"){:data-rel="lightcase"}

If you are unable to view the image displayed or if you are reading this post from platforms with small screen then here's the output.

{% highlight javascript %}
XMLHttpRequest cannot load http://localhost:1337/track. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost' is therefore not allowed access.
{% endhighlight %}

`:1337/track` is my NodeJS application and `:80/` is my simple HTML-CSS-Javascript website.

Fixing this problem is quite simple to be honest, as mentioned in the error, it says, `No 'Access-Control-Allow-Origin' header is present on the requested resource.`. That means the response origin is missing the `Access-Control-Allow-Origin` header, in simple words, our Node application. Let's add the header instruction in our Node application, remember, this is just a test application, your current project and my test demo might differ.

I'll be using [**Express**](http://expressjs.com/) to handle the requests and responses and my client side sending a POST data to our specified API end-point `:1337/track` to calculate and reply with a response.

{% highlight javascript %}
app.use('/track', function (req, res, next) {
    console.log(req.body.poop);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.route('/track')
    .post(function (req, res) {
        res.json("We received your request - sending response -> " + req.body.poop)
    });
{% endhighlight %}

As you can see, we added a middle-ware to add `Control Origin` header to our response which will make our lives easier. In any case, if you ever want to make your API private and allow access from only one origin you can replace `res.header("Access-Control-Allow-Origin", "*");` with `res.header("Access-Control-Allow-Origin", "https://prashant.me");` or domain name of your choice!

Let us now create an event to request data from our API end-point using jQuery.

{% highlight javascript %}
$(document).ready(function () {
$.ajax({
    url : "http://localhost:1337/track",
    type: "POST",
    data : {'poop': 'is brown?'},
    success: function(data, textStatus, jqXHR)
    {
        alert(JSON.stringify(data));
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
        alert(JSON.stringify(jqXHR));
    }
});
});
{% endhighlight %}

We are simply creating a HTTP request from one origin to another.

Now that should work just fine!

Happy Coding & Enjoy!