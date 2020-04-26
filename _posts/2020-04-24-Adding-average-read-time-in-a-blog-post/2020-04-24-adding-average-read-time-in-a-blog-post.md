---
layout: post
title: Adding average read time in a blog post.
author: Prashant Shrestha
date: 2020-04-24 12:52:14 -100
categories: jekyll
tags: blog text words jekyll read time average
words: 358
---

With the increase in web development and designing, new development tools, the ease of deploying a personal or professional blog had never been easier. We can see amazing features brought out in the open by amazing developers. I have noticed the estimated read time in many blogs, digital newspapers, and simple websites even. In regards to the new theme development, I wanted to have estimated read time for my blog as well.

This feature can be achieved with "any" programming languages that allow division of numbers. We can do this dynamically or manually, depends on how much of a time and hassle we wish to go through for this single feature.

We need the number of words we have in our blog, I use [Typora]() for my markdown editor and to prepare an offline blog posts (later deployed). One thing I liked about Typora is the words count at the bottom right, simple feature, yet very helpful.

{% include lightcase.html name="typora.png" alt="Typora Window" local="true" %}

We can achieve similar result with a bit of hassle using Terminal, if we are in Linux using `wc` command.

```bash
cat <filename> | wc -w
```

This command returns the number of words in a file, plain and simple. 

{% include lightcase.html name="terminal-cat-read-words.png" alt="Output from reading words in terminal." local="true" %}

We could use JavaScript to calculate the number of words in a container, split it by words using Regex.

```javascript
let post = document.getElementsById("post").innerText;
const wordsCount = post.match(/\S+/g).length;
const formattedWordsCount = "~" + (wordsCount / 200).toFixed(2) + " minutes";
```

I did not want to go the dynamic calculation route. I utilized `divided_by` liquid syntax to calculate the estimated time. For example, let's say I manually add the words count to my post meta-data as such `words: 250`. We can access that meta-data using `post.words` and get the average read time by dividing the words count by average reader's words-read-per-minute which is [**200-300**](https://en.wikipedia.org/wiki/Speed_reading#Types_of_reading_-_Mental.2C_Auditory_.26_Visual).

```ruby
page.words | divided_by: 200.00 | round: 2 | append: " minutes" | prepend: "~"
```

{% include lightcase.html name="jekyll-metadata-format.png" alt="Jekyll Post metadata." local="true" %}

Depending on how we format the theme, we can style the average reading time accordingly.

{% include lightcase.html name="average-reading-time-formatted.png" alt="Jekyll Post metadata." local="true" %}