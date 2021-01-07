---
layout: post
title: "Jekyll search using Google's Custom Search Engine and jQuery."
author: Prashant Shrestha 
date: 2017-11-15 11:54:27 -400 
categories: development
tags: jquery javascript api google search engine jekyll ajax filter
poster: https://images.unsplash.com/photo-1453563391321-df71955e9289?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=92ca1d9f6cc83f9be89e6b19116fa77c&auto=format&fit=crop&w=1650&q=80
---

Jekyll is an amazing blogging platform, regarding simplicity, templating and cleanliness. There are drawbacks for simplicity, lack of essential features. To keep my blog clean and minimal, I used Google's Custom Search Engine and forwarded users to Google's custom search's public URL however it just seems too unprofessional. Let's say I want to search for the term `node` in my blog; I would simply forward the user to Google's public search [url](https://cse.google.com/cse/publicurl?cx=010738197107477130202:cnkjahloicw&q=node). I tried searching for alternatives which I could integrate the search feature on my blog however it all required me to install and set up a whole different libraries and such.

There are various alternatives that one can use to integrate search feature in their Jekyll powered blog, some, from top of my head would be [Lunr.js](https://learn.cloudcannon.com/jekyll/jekyll-search-using-lunr-js/), [Simple-Jekyll-Search](https://github.com/christian-fei/Simple-Jekyll-Search) by [christian-fei](https://github.com/christian-fei), [Algolia](https://www.algolia.com/), [Swifttype](https://swiftype.com/) etc.
<!--excerpt-->
Although Google's Custom Search Engine was already used before, I decided to simply use [Google's Search API](https://developers.google.com/custom-search/json-api/v1/using_rest) to extend and display the search results on my blog. It all starts by creating a [custom Google's search](https://cse.google.com/create/new).



```html
<div class="row">
    <input class="u-full-width" type="text" placeholder="Please enter what you wish to search here." id="toSearch">
    <input class="button-primary" class="gcse-trigger" type="submit" value="Search">
</div>
```

The jQuery snippet to handle and trigger the search.

```javascript
var toSearch = "https://cse.google.com/cse/publicurl?cx=010738197107477130202:cnkjahloicw&q=";
$(".gcse-trigger").click(function (e) {
    e.preventDefault();
    var searchKey = $('input#toSearch').val();
    var searchURL = "https://www.googleapis.com/customsearch/v1?q={0}&cx={1}&key={2}"
    var apiKey = "AIzaSyAXNi32ZKBfeR6d59kcP7hUfyBxMycVvms";
    var engineID = "010738197107477130202:cnkjahloicw";

    // Clear previous search results.
    $(".search-result-container").empty();

    if (searchKey.length > 3) {
        // Start the search.
        $.ajax({
            type: "GET",
            url: searchURL.replace("{0}", searchKey).replace("{1}", engineID).replace("{2}", apiKey),
            success: function (result) {
                if (result.hasOwnProperty('items') && result.items.length > 0) {
                    var totalSearchResults = 0;

                    console.log(result);
                    $(".search-result-container").append("<h5 class='totalSearchResults'></h5>");

                    $.each(result.items, function (key, value) {
                        var initialFormatting = '<div class="row result"><div class="three columns"><img class="thumbnail" src="{3}"></div><div class="nine columns"><h5><a target="_blank" href="{0}">{1}</a></h5><p>{2}</p></div></div>';
                        var searchResultThumbnail = "";

                        var urlExtension = value.link.split('.').pop();

                        if (urlExtension === 'html') {
                            if (value.pagemap.hasOwnProperty('cse_thumbnail')) {
                                searchResultThumbnail = value.pagemap.cse_thumbnail[0].src;
                            } else if (!value.pagemap.hasOwnProperty('cse_thumbnail') &&
                                value.pagemap.hasOwnProperty('cse_image')) {
                                searchResultThumbnail = value.pagemap.cse_image[0].src;
                            } else {
                                searchResultThumbnail = "https://prashant.me/assets/images/image.png";
                            }

                            $(".search-result-container").append(
                                initialFormatting.replace("{0}", value.link)
                                    .replace("{1}", value.title)
                                    .replace("{2}", value.htmlSnippet)
                                    .replace("{3}", searchResultThumbnail)
                            );

                            // Keep track of parsed results.
                            totalSearchResults++;
                        } else { /* Ignore the search result because it contains pagemarks instead of actual search. */ }
                    });

                    $(".totalSearchResults").text(totalSearchResults + " results found for '" + searchKey + "' via. Google Search.");
                } else {
                    $(".search-result-container").append("<h5 class='totalSearchResults'>0 results found for '" + searchKey + "' via. Google Search.</h5>");
                }
            }
        })

    } else {
        // Notify the user regarding the character length requirement.
        console.log("Not enough character length!");
    }

    return false;
});

/* Search trigger - using keydown event.
–––––––––––––––––––––––––––––––––––––––––––––––––– */
$("input#toSearch").keydown(function (e) {
    var keyPressed = e.which || e.keyCode;
    var searchKey = $(this).val();

    if (keyPressed === 13 && searchKey.length > 0) {
        $(".gcse-trigger").trigger('click');
    }
});
```

If we wish to merely view the returned result from the `GET` request we made using `Ajax`, we could add `console.log(result)` nested inside our `success: function(result){}`. A test query made for the search key, `server` returned a result as follows.

[![Image](https://i.imgur.com/I8cyZM0.png)](https://i.imgur.com/I8cyZM0.png "console.log(result);"){:data-rel="lightcase"}

The `result` container to hold each search results are designed to be as minimal and straightforward as I possibly could, SASS snippet I used is provided below.

```scss
/* Search Result styling */
.search-result-container{

    .result{
        border: 1px solid #D1D1D1;
        padding: 15px 20px;
        margin-bottom: 10px;
        border-radius: 3px;

        img.thumbnail{
            overflow: hidden;
            max-width: 100%;
            max-height: 100%;
        }

        h5{
            font-size: 2rem;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        p{
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            line-height: 1.6;
            max-height: (1.6) * 2;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }
}
```

This is an example of what I did rather than what must be done, the code snippet, layouts, and stylings can be changed to one's preference. I went ahead and filtered the Google's Custom Search results to my liking as it included search results with the format of, `https://prashant.me/page/3/` which was not very useful. Therefore, I filtered such that only search results with existing blog posts in `link` key are displayed.

[![Image](https://i.imgur.com/tJu4Gqh.png)](https://i.imgur.com/tJu4Gqh.png "console.log(result);"){:data-rel="lightcase"}

The code snippets posted in this blog entry can be viewed live at work [here](https://prashant.me/search/).

Although this is an alternative, self-made code, it might not be the best approach to implement a search feature in Jekyll powered site.

Feel free to update, improve, test, and share!

---

#### Credits
1. [Unsplash](https://unsplash.com/photos/kSLNVacFehs) for the poster image.