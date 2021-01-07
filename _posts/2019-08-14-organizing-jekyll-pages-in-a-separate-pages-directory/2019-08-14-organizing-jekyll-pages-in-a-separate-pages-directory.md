---
layout: post
title: "Organizing Jekyll pages in a separate _pages directory."
author: "Prashant Shrestha"
date: 2019-07-14 21:44:00 +400
categories: jekyll
tags: jekyll pages organize cleanup source blog
---

I noticed an increase in pages inside my Jekyll website’s root directory. It adds up, eventually. To organize my pages that existed in the root directory, I found a way to arrange all the pages in a separate `_pages` directory or any directory with the name of your choice.

This is what my old Jekyll blog repository looked like, the repository's files and directories layout.

{% include lightcase.html name="hEXZwws.png" alt="Old Blog Structure" local="true" %}

As we can notice **6** `.md` files _(pages)_ in our project's root directory. The more pages you require, the more files you create in your root directory, hence, the search for a perfect solution to keep our project organized.

### Solution

The solution to organizing the pages in our Jekyll blog's file structure is to **create a new directory**, I preferred `_pages` because it relates to the other directories such as `_posts`, `_layouts`, `_includes`, etc. It does not necessarily need to be named `_pages`, it can be anything, I mean, anything!

{% include lightcase.html name="https://media.giphy.com/media/mtUWuZaK8H9yU/giphy.gif" alt="I lika do da cha-cha!" %}

Move all `*.md` files in your root directory to `_pages` or the newly created pages directory except for the `index.md` because that is our access point _(in a way)_.

Head over to `_config.yml` file and append the following code to instruct the Jekyll build to include all files in `_pages` or directory we recently created.

```yml
include: ["_pages"]
```

... and that's it. Rebuild your blog, and everything should be running as excepted, and we now have a clean and organized Jekyll file structure.

---

## Credits
1. Giphy, for [Steve Carell's News](https://giphy.com/gifs/mtUWuZaK8H9yU) from the movie [Bruce Almighty](https://www.imdb.com/title/tt0315327/).
2. Github, for being awesome, as always!