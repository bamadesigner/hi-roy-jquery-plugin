/*
 * Hi Roy
 * Version 1.0.0
 * A simple and easy jQuery plugin for CSS animated page transitions.
 * https://github.com/bamadesigner/hi-roy
 * License: MIT
 * Author: Rachel Carden (https://bamadesigner.com/)
 */
(function($) {

	// Set a few properties
	var $hi_roy_sides = ['top','right','bottom','left'];
	var $hi_roy_position = '';
	var $hi_roy_disabled = false;

	// Get random position
	function get_random_position() {
		return $hi_roy_sides[ Math.floor( Math.random() * $hi_roy_sides.length ) ];
	}

	// Let's get ready to say hi
	function hiRoy($element,$options) {

		// Hide the element for now
		$element.hide();

		// Hi Roy
		var $hi_roy = this;

		// What are our default options?
		var $defaults = {
			startPosition: get_random_position(), // Which side position do we start with
			image: 'roy-head.png', // Allows you to replace the image
			link: 'https://twitter.com/intent/tweet?text=Hi+@royboy789.+http%3A%2F%2Fhiroy.club%2F&hashtags=hiroy',
			onMove: true
		};

		// Mesh with the passed options
		$hi_roy.options = $.extend({},$defaults,$options);

		// Set the start position
		$hi_roy_position = $hi_roy.options.startPosition;
		delete $hi_roy.options.startPosition;

		// Create and store our new Hi Roy element
		$hi_roy.element = $('<div id="hi-roy"></div>').addClass($hi_roy_position).hide();

		// Create the link and <img>
		var $hi_roy_element_link = $('<a href="' + $hi_roy.options.link + '"></a>');
		var $hi_roy_element_img = $('<img src="' + $hi_roy.options.image + '" />');

		// Add all the elements together
		$hi_roy_element_link.append($hi_roy_element_img);
		$hi_roy.element.append($hi_roy_element_link);

		// Once the image loads...
		$hi_roy_element_img.on('load', function(){

			// Place the copy on the site so we can get the height
			var $hi_roy_element_img_copy = $hi_roy_element_img.clone().css({'position':'absolute','left':'200%','top':'200%'}).appendTo($('body'));

			// Get the height
			$hi_roy.height = $hi_roy_element_img_copy.height();

			// Remove the copy
			$hi_roy_element_img_copy.remove();

			// Set Roy's position
			$hi_roy.element.css( $hi_roy_position, ( 0 - $hi_roy.height ) );

			// Set Roy's height
			if ( $.inArray( $hi_roy_position, ['top','bottom'] ) >= 0 ) {
				$hi_roy.element.css( 'height', $hi_roy.height );
			} else if ( $.inArray( $hi_roy_position, ['left','right'] ) >= 0 ) {
				$hi_roy.element.css( 'width', $hi_roy.height );
			}

			// Add our element to the body
			$('body').append($hi_roy.element);

			// Set animation settings to move Roy in
			var $move_roy_in_animate = {};
			$move_roy_in_animate[$hi_roy_position] = 0;

			// Move Roy in
			$hi_roy.element.show().animate( $move_roy_in_animate, 800, function() {

				// Set the next position
				$hi_roy.nextPosition = get_random_position();

				// Trigger our move in event, pass position information
				var $hiRoyAfterMoveIn = new CustomEvent( 'hiRoyAfterMoveIn', {
					detail: {
						currentPosition: $hi_roy_position,
						nextPosition: $hi_roy.nextPosition
					}
				});
				document.body.dispatchEvent($hiRoyAfterMoveIn);

				// Move Roy cutout when the screen is touched or when the mouse moves
				if ( $hi_roy.options.onMove ) {
					$(window).on('touchstart mousemove', function ($event) {
						$hi_roy.move();
					});
				}

			});

		});

	}
	$.extend(hiRoy.prototype,{

		// Disable Roy
		disable: function() {
			$hi_roy_disabled = true;
		},

		// Enable Roy
		enable: function() {
			$hi_roy_disabled = false;
		},

		// Get the current position
		get_position: function() {
			return $hi_roy_position;
		},

		// Move Roy
		move: function($next_position) {

			// Define this
			var $hi_roy = this;

			// Don't move if disabled
			if ( $hi_roy_disabled ) {
				return false;
			}

			// Disable while we work
			$hi_roy.disable();

			// Make sure we have a valid next position
			if ( $next_position === undefined || $.inArray( $next_position, $hi_roy_sides ) == -1 ) {
				if ( $hi_roy.nextPosition === undefined || $.inArray( $hi_roy.nextPosition, $hi_roy_sides ) == -1 ) {
					$hi_roy.nextPosition = get_random_position();
				}
			}

			// Set animate properties for moving out
			var $animate1 = {};
			$animate1[$hi_roy_position] = 0 - $hi_roy.height;

			// Move Roy out
			$hi_roy.element.animate( $animate1, 800, function() {

				// Trigger our move out event, pass position information
				var $hiRoyAfterMoveOut = new CustomEvent( 'hiRoyAfterMoveOut', {
					detail: {
						currentPosition: $hi_roy_position,
						nextPosition: $hi_roy.nextPosition
					}
				});
				document.body.dispatchEvent($hiRoyAfterMoveOut);

				// Clean up styles
				$hi_roy.element.removeAttr( 'style' );
				$hi_roy.element.find('img').removeAttr( 'style' );

				// Set the position
				$hi_roy.element.css( $hi_roy.nextPosition, ( 0 - $hi_roy.height ) );

				// Switch out the position class
				$hi_roy.element.removeClass($hi_roy_position).addClass($hi_roy.nextPosition);

				// Set new background position
				// A whole number between 10 and 90
				var $new_cutout_pos = Math.floor( Math.random() * ( ( 90 - 10 ) + 1 ) + 10 );
				switch( $hi_roy.nextPosition ) {
					case 'left':
					case 'right':
						$hi_roy.element.css( 'width', $hi_roy.height );
						$hi_roy.element.find('img').css({ 'top': $new_cutout_pos + '%' });
						break;
					case 'top':
					case 'bottom':
						$hi_roy.element.css( 'height', $hi_roy.height );
						$hi_roy.element.find('img').css({ 'left': $new_cutout_pos + '%' });
						break;
				}

				// Set animate properties for moving back in
				var $animate2 = {};
				$animate2[ $hi_roy.nextPosition ] = 0;

				// Move Roy back in
				$hi_roy.element.animate( $animate2, 800, function() {

					// Enable cutout
					$hi_roy.enable();

					// Change current position
					$hi_roy_position = $hi_roy.nextPosition;

					// Change next position
					$hi_roy.nextPosition = get_random_position();

					// Trigger our move in event, pass position information
					var $hiRoyAfterMoveIn = new CustomEvent( 'hiRoyAfterMoveIn', {
						detail: {
							currentPosition: $hi_roy_position,
							nextPosition: $hi_roy.nextPosition
						}
					});
					document.body.dispatchEvent($hiRoyAfterMoveIn);

				} );

			});

		}

	});
	
	// Let's get Roy all setup
	// @TODO Can we "chain" and still return the object?
	$.fn.hiRoy = function($options) {
		//return this.each( function() {
			if ( ! $.data( this, 'hi-roy' ) ) {
				var $new_hi_roy = new hiRoy(this,$options);
				$.data( this, 'hi-roy', $new_hi_roy );
				return $new_hi_roy;
			}
		//});
	};

}(jQuery));