$(document).ready(function () {
    // What a pain, might move to vanilla JS.
    $.ajaxSetup({cache:false});

    /* Images Lazy Load.
	–––––––––––––––––––––––––––––––––––––––––––––––––– */
    const observer = lozad('.lazy', {
        loaded: (el) => {
            el.src = el.dataset.src
            el.onload = () => {
                el.classList.add('fade')
            }
        },
    })
    observer.observe()

    /* Theming - Light & Dark
	–––––––––––––––––––––––––––––––––––––––––––––––––– */
    let currentTheme = localStorage.getItem('theme')
    // Set current theme if the theme data exists in LS.
    if (currentTheme) {
        document.documentElement.setAttribute('theme', currentTheme)
        // Change lightbulb icon.
        $('.site-theme-toggle .fa-lightbulb')
            .removeClass('fas')
            .removeClass('far')
            .addClass(currentTheme === 'light' ? 'far' : 'fas')
        // Change lightbulb's trigger title accordingly.
        $('.site-theme-toggle .fa-lightbulb').prop(
            'title',
            currentTheme == 'light' ? 'Enable dark mode.' : 'Enable light mode.'
        )
    } else {
        // If no values are set, just set dark as default.
        currentTheme = 'light'
        localStorage.setItem('theme', currentTheme)
        document.documentElement.setAttribute('theme', currentTheme)
        // Change lightbulb icon.
        $('.site-theme-toggle .fa-lightbulb')
            .removeClass('fas')
            .removeClass('far')
            .addClass(currentTheme === 'light' ? 'far' : 'fas')
        // Change lightbulb's trigger title accordingly.
        $('.site-theme-toggle .fa-lightbulb').prop(
            'title',
            currentTheme == 'light' ? 'Enable dark mode.' : 'Enable light mode.'
        )
    }

    /* Image Lightbox Initialization
	–––––––––––––––––––––––––––––––––––––––––––––––––– */
    $("a[data-rel^='lightcase']").lightcase({
        maxWidth: '100%',
    })

    /* Smooth Scroll to anchor.
	https://css-tricks.com/snippets/jquery/smooth-scrolling/
	–––––––––––––––––––––––––––––––––––––––––––––––––– */
    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') ==
                    this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash)
                target = target.length
                    ? target
                    : $('[name=' + this.hash.slice(1) + ']')
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault()
                    $('html, body').animate(
                        {
                            scrollTop: target.offset().top,
                        },
                        500,
                        function () {
                            // Callback after animation
                            // Must change focus!
                            var $target = $(target)
                            $target.focus()
                            if ($target.is(':focus')) {
                                // Checking if the target was focused
                                return false
                            } else {
                                $target.attr('tabindex', '-1') // Adding tabindex for elements not focusable
                                $target.focus() // Set focus again
                            }
                        }
                    )
                }
            }
        })

    /* Scroll to top button visibility toggling!
	–––––––––––––––––––––––––––––––––––––––––––––––––– */
    $(window).scroll(() => {
        if ($(this).scrollTop()) {
            $('.to-top').fadeIn()
        } else {
            $('.to-top').fadeOut()
        }
    })

    /* Toggle theme
	–––––––––––––––––––––––––––––––––––––––––––––––––– */
    $('.site-theme-toggle').on('click', function (e) {
        e.preventDefault()
        // Try and get current theme (if exists in LS).
        var currentTheme = localStorage.getItem('theme')
        // Set theme value accordingly.
        if (
            currentTheme &&
            (currentTheme == 'dark' || currentTheme == 'light')
        ) {
            document.documentElement.setAttribute(
                'theme',
                currentTheme == 'dark' ? 'light' : 'dark'
            )
            localStorage.setItem(
                'theme',
                currentTheme == 'dark' ? 'light' : 'dark'
            )
        } else {
            // Other value for our theme = !dark, !light. Set to default light.
            document.documentElement.setAttribute('theme', 'light')
            localStorage.setItem('theme', 'light')
        }

        // Get updated theme value.
        currentTheme = localStorage.getItem('theme')
        // Change Icon of our lightbulb.
        $('.site-theme-toggle .fa-lightbulb')
            .removeClass('fas')
            .removeClass('far')
            .addClass(currentTheme === 'light' ? 'far' : 'fas')
        // Change title value for our theme trigger.
        $('.site-theme-toggle .fa-lightbulb').prop(
            'title',
            currentTheme == 'light' ? 'Enable dark mode.' : 'Enable light mode.'
        )
    })

    /**
     * Enabling highlight label.
     */
    addEventListener('load', function () {
        var highlights = document.querySelectorAll(
            'div[class^="language-"], figure[class="highlight"'
        )
        Array.prototype.forEach.call(highlights, (block) => {
            var splitted = block.getAttribute('class').split(' ')
            var filtered = splitted.filter(
                (_sp) => _sp.indexOf('language-') > -1
            )
            let language = filtered[0].split('-')[1] || 'Unknown'

            var languageLabel = document.createElement('div')
            languageLabel.className = 'language-label language-' + language
            languageLabel.innerHTML = language
            block.appendChild(languageLabel)
        })
    })

    /**
     * Custom search page functions
     */
    $(".clear").on('click', (e) => {
        $(".search-input-text").val("");
        $(".search-input-text").focus();
        e.preventDefault();
        return false;
    });

    $(".search").on('click', (e) => {
        let searchKey = $("input.search-input-text").val();

        // Search key should have the criteria of length >= 3.
        if(searchKey.length >= 3){
            $.getJSON("search.json", function(data){
                let searchResultsWithKey = data.filter((items) => {
                    return items.title.toLowerCase().indexOf(searchKey.toLowerCase()) > 0
                });

                // Found the results.
                if(searchResultsWithKey.length > 0){
                    $(".search-output").empty().append(`<h5>Found ${searchResultsWithKey.length} results.`)
                    searchResultsWithKey.map(results => {
                        $(".search-output").append(
                            '<a href="' + results.url + '">' + results.title + "</a>"
                        );
                    })
                }else{
                    $(".search-output").empty().append("<h4>No blog posts found!</h4>")
                }
            });
        }
        e.preventDefault();
        return false;
    });


    console.log('OK!')
})
