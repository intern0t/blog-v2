$(document).ready(function() {
	/* Images Lazy Load.
	–––––––––––––––––––––––––––––––––––––––––––––––––– */
	const observer = lozad('.lazy', {
		loaded: (el) => {
			el.src = el.dataset.src;
			el.onload = () => {
				el.classList.add('fade');
			};
		}
	});
	observer.observe();

	/* Theming - Light & Dark
	–––––––––––––––––––––––––––––––––––––––––––––––––– */
	let currentTheme = localStorage.getItem('theme');
	// Set current theme if the theme data exists in LS.
	if (currentTheme) {
		document.documentElement.setAttribute('data-theme', currentTheme);
		// Change lightbulb icon.
		$('.site-theme-toggle .fa-lightbulb')
			.removeClass('fas')
			.removeClass('far')
			.addClass(currentTheme === 'light' ? 'far' : 'fas');
		// Change lightbulb's trigger title accordingly.
		$('.site-theme-toggle .fa-lightbulb').prop(
			'title',
			currentTheme == 'light' ? 'Enable dark mode.' : 'Enable light mode.'
		);
	}else{
		// If no values are set, just set dark as default.
		currentTheme = "dark";
		localStorage.setItem("theme", currentTheme);
		document.documentElement.setAttribute('data-theme', currentTheme);
		// Change lightbulb icon.
		$('.site-theme-toggle .fa-lightbulb')
			.removeClass('fas')
			.removeClass('far')
			.addClass(currentTheme === 'light' ? 'far' : 'fas');
		// Change lightbulb's trigger title accordingly.
		$('.site-theme-toggle .fa-lightbulb').prop(
			'title',
			currentTheme == 'light' ? 'Enable dark mode.' : 'Enable light mode.'
		);
	}

	/* Image Lightbox Initialization
	–––––––––––––––––––––––––––––––––––––––––––––––––– */
	$("a[data-rel^='lightcase']").lightcase({
		maxWidth: '100%'
	});

	/* Smooth Scroll to anchor.
	https://css-tricks.com/snippets/jquery/smooth-scrolling/
	–––––––––––––––––––––––––––––––––––––––––––––––––– */
	// Select all links with hashes
	$('a[href*="#"]')
		// Remove links that don't actually link to anything
		.not('[href="#"]')
		.not('[href="#0"]')
		.click(function(event) {
			// On-page links
			if (
				location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
				location.hostname == this.hostname
			) {
				// Figure out element to scroll to
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				// Does a scroll target exist?
				if (target.length) {
					// Only prevent default if animation is actually gonna happen
					event.preventDefault();
					$('html, body').animate(
						{
							scrollTop: target.offset().top
						},
						500,
						function() {
							// Callback after animation
							// Must change focus!
							var $target = $(target);
							$target.focus();
							if ($target.is(':focus')) {
								// Checking if the target was focused
								return false;
							} else {
								$target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
								$target.focus(); // Set focus again
							}
						}
					);
				}
			}
		});

	/* Scroll to top button visibility toggling!
	–––––––––––––––––––––––––––––––––––––––––––––––––– */
	$(window).scroll(() => {
		if ($(this).scrollTop()) {
			$('.to-top').fadeIn();
		} else {
			$('.to-top').fadeOut();
		}
	});

	/* Toggle theme
	–––––––––––––––––––––––––––––––––––––––––––––––––– */
	$('.site-theme-toggle').on('click', function(e) {
		e.preventDefault();
		// Try and get current theme (if exists in LS).
		var currentTheme = localStorage.getItem('theme');
		// Set data-theme value accordingly.
		if (currentTheme && (currentTheme == 'dark' || currentTheme == 'light')) {
			if (currentTheme == 'dark') {
				document.documentElement.setAttribute('data-theme', 'light');
				localStorage.setItem('theme', 'light');
			} else {
				document.documentElement.setAttribute('data-theme', 'dark');
				localStorage.setItem('theme', 'dark');
			}
		} else {
			// Other value for our theme = !dark, !light. Set to default light.
			document.documentElement.setAttribute('data-theme', 'light');
			localStorage.setItem('theme', 'light');
		}

		// Get updated theme value.
		currentTheme = localStorage.getItem('theme');
		// Change Icon of our lightbulb.
		$('.site-theme-toggle .fa-lightbulb')
			.removeClass('fas')
			.removeClass('far')
			.addClass(currentTheme === 'light' ? 'far' : 'fas');
		// Change title value for our theme trigger.
		$('.site-theme-toggle .fa-lightbulb').prop(
			'title',
			currentTheme == 'light' ? 'Enable dark mode.' : 'Enable light mode.'
		);
	});

	/* Change font size
	–––––––––––––––––––––––––––––––––––––––––––––––––– */
	$('.site-font-size > .increase').on('click', function(e) {

	});

	$('.site-font-size > .decrease').on('click', function(e) {
		
	});
});
