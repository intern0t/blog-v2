---
layout: post
title: Easy toggle between light or dark color schemes using CSS.
author: Prashant Shrestha
date: 2020-04-22 14:41:14 -400
categories: development
tags: design css theme mode light dark
words: 789
---

While developing a new theme for my personal blog in the midst of Coronavirus outbreak, I tried a much convenient method to change themes or have an option to change color schemes in a website. It is convenient in a way such that there is a minimal overhead to the data we need to track and it is amazingly fast and utilizes local variables in CSS.

This theme toggle method utilizes CSS Variable `var()`, a tiny metadata in our `html` in the front end, and storage for a simple string to keep track of our active theme.

<!--excerpt-->

### Preparing the color schemes

There are two color schemes I prepared, light and dark. Keep the stylesheet as modular as possible. I like the combination of minimalistic and professsional color schemes therefore mixture of light colors and dark colors is my go-to. The colors and variable names are completely relative, it does not follow any specific standards, it is simply a variable and the color of my choice.

{% highlight scss %}
:root {
    --fontSize: 15px;
    --backgroundColor: rgb(255, 255, 255);
    --foregroundColor: rgba(0, 0, 0, 0.7);
    --linkColor: rgb(17, 111, 216);
    --codeBackgroundColor: rgb(27, 27, 27);
    --inlineCodeBackground: rgba(237, 113, 113, 0.18);
    --inlineCodeBorder: rgba(237, 113, 113, 0.5);
    --foregroundCodeColor: rgba(255, 44, 44, 1);
    --codeColor: rgba(255, 255, 255, 0.44);
    --fontColorHomeLink: rgba(0, 0, 0, 0.7);
    --fontColorRegular: rgba(0, 0, 0, 0.6);
    --fontColorImportant: rgba(0, 0, 0, 0.8);
    --fontColorMeta: rgb(0, 0, 0);
    --quoteBackgroundColor: rgba(17, 111, 216, 0.09);
    --quoteBorderColor: rgba(128, 128, 128, 0.302);
    --borderColor: rgba(154, 154, 154, 0.329);
    --paginationBorder: var(--quoteBorderColor);
    --toTop: rgba(0, 0, 0, 0.2);
    --toggleColor: var(--fontColorHomeLink);
}

[theme='dark'] {
    --fontSize: 15px;
    --backgroundColor: rgb(0, 0, 0);
    --foregroundColor: rgba(255, 255, 255, 0.9);
    --linkColor: rgb(52, 152, 219);
    --codeBackgroundColor: rgb(27, 27, 27);
    --inlineCodeBackground: rgba(237, 113, 113, 0.18);
    --inlineCodeBorder: rgba(237, 113, 113, 0.5);
    --foregroundCodeColor: rgba(255, 44, 44, 0.55);
    --codeColor: rgba(255, 255, 255, 0.55);
    --fontColorHomeLink: rgba(255, 255, 255, 0.5);
    --fontColorRegular: rgba(255, 255, 255, 0.801);
    --fontColorImportant: rgba(246, 246, 246, 0.8);
    --fontColorMeta: rgb(255, 255, 255);
    --quoteBackgroundColor: rgba(255, 255, 255, 0.09);
    --quoteBorderColor: rgba(128, 128, 128, 0.302);
    --borderColor: rgba(154, 154, 154, 0.329);
    --paginationBorder: rgba(255, 255, 255, 0.3);
    --toTop: rgba(255, 255, 255, 0.2);
    --toggleColor: var(--foregroundColor);
}
{% endhighlight %}

### Using the theme in the front-matter.

Using the theme in our front matter is easy, all we need to do is add a new attribute called `theme="light"` or `theme="dark"` in `<html>` tag. My Jekyll blog's `<html>` tag looks like this.

{% highlight html %}
<html lang="{{ page.lang | default: site.lang | default: 'en' }}" theme="light">
{% endhighlight %}

Mind you, there is no need to have `theme="light"` as we did not set-up any light theme variables to use therefore using the fallback to the root (by default).

### Button to change the theme.

In order to toggle/change the theme between the light and dark, we need a button or an actionable component of sort. As someone who is bad at designing, I mean, bad.., I decided to simply use icons by [Font Awesome](https://fontawesome.com/) as my button. Two lightbulb icons seemed simple and perfect enough for me. <span class="fas fa-lightbulb"></span> <span class="far fa-lightbulb"></span>

{% highlight html %}
<!-- Toggle theme -->
<a
    class="site-theme-toggle"
    id="site-theme-toggle" 
    href="#" 
    title="Toggle theme..">
	<i class="fas fa-lightbulb"></i>
</a>
{% endhighlight %}

With a little bit of Javascript, those buttons should suffice. 

### Toggle functionality for the button.

I decided to use the regular type of lighbulb to denote the lightbulb's `off` state whereas, the solid type of lightbulb denotes it's `on` state. So, lightbulb's `on` state means everything is light because the lightbulb is `on`, `off` state (regular type) means everything is dark because the lightbulb is `off`.

{% highlight js %}
/* Theming - Light & Dark
–––––––––––––––––––––––––––––––––––––––––––––––––– */
let currentTheme = localStorage.getItem('theme');

// Set current theme if the theme data exists in the local storage.
if (currentTheme) {
	document.documentElement.setAttribute(
        'data-theme', currentTheme);
	// Change lightbulb icon.
	$('.site-theme-toggle .fa-lightbulb')
		.removeClass('fas')
		.removeClass('far')
		.addClass(currentTheme === 'light' ? 'far' : 'fas');
	// Change lightbulb's trigger title accordingly.
	$('.site-theme-toggle .fa-lightbulb').prop(
		'title',
		currentTheme == 'light' ? 
        'Enable dark mode.' : 'Enable light mode.'
	);
}else{
	// If no values are set, just set dark as default.
	currentTheme = "dark";
	localStorage.setItem("theme", currentTheme);
	document.documentElement.setAttribute(
        'data-theme', currentTheme);
	// Change lightbulb icon.
	$('.site-theme-toggle .fa-lightbulb')
		.removeClass('fas')
		.removeClass('far')
		.addClass(currentTheme === 'light' ? 'far' : 'fas');
	// Change lightbulb's trigger title accordingly.
	$('.site-theme-toggle .fa-lightbulb').prop(
		'title',
		currentTheme == 'light' ? 
        'Enable dark mode.' : 'Enable light mode.'
	);
}
{% endhighlight %}

I suppose, I could have simplified it further but for now, we will leave it at basic.

That should be it, simple enough to change the theme without having to load different stylesheets and going through other hassles. :sweat_smile: