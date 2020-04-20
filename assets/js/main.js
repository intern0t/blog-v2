$(document).ready(function() {
	const observer = lozad('.lazy', {
		loaded: (el) => {
			el.src = el.dataset.src;
			el.onload = () => {
				el.classList.add('fade');
			};
		}
	});
	observer.observe();

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
});
