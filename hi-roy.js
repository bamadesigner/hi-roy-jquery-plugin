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

	// Keep up with the Roys-es
	var $hi_roys = [];

	// Get random position
	function get_random_position() {
		return $hi_roy_sides[ Math.floor( Math.random()*$hi_roy_sides.length ) ];
	}

	// Let's get ready to say hi
	function hiRoy($element,$options) {

		// Hi Roy
		var $hi_roy = this;

		// What are our default options?
		var $defaults = {
			id: 'hi-roy',
			startPosition: get_random_position(), // Which side position do we start with
			image: 'roy-head.png', // Allows you to replace the image
			link: 'https://twitter.com/intent/tweet?text=Hi+@royboy789.+http%3A%2F%2Fhiroy.club%2F&hashtags=hiroy',
			link_target: '_blank',
			moveOnStart: true,
			moveOnMove: true
		};

		// Mesh with the passed options
		$hi_roy.options = $.extend({},$defaults,$options);

		// Setup our other options
		$hi_roy.disabled = false;
		$hi_roy.move_disabled = false;

		// Set the start position
		$hi_roy.position = $hi_roy.options.startPosition;
		delete $hi_roy.options.startPosition;

		// Create our new Hi Roy element
		var $hi_roy_id = ( $hi_roys.length > 1 ) ? ( $hi_roy.options.id + $hi_roys.length ) : $hi_roy.options.id;
		$hi_roy.element = $('<div id="' + $hi_roy_id + '" class="hi-roy-element"></div>').addClass($hi_roy.position).hide();

		// Store Roy
		$hi_roys.push($hi_roy.element);

		// Create the link
		var $hi_roy_element_link = $('<a href="' + $hi_roy.options.link + '"></a>');
		if ( $hi_roy.options.link_target !== undefined && $hi_roy.options.link_target != '' ) {
			$hi_roy_element_link.attr( 'target', $hi_roy.options.link_target );
		}

		// Create the image
		var $hi_roy_element_img = $('<img src="' + $hi_roy.options.image + '" />');

		// Add all the elements together
		$hi_roy_element_link.append($hi_roy_element_img);
		$hi_roy.element.append($hi_roy_element_link);

		// Once the image loads...
		$hi_roy_element_img.on('load',function(){

			// Place the copy on the site so we can get the height
			var $hi_roy_element_img_copy = $hi_roy_element_img.clone().css({'position':'absolute','left':'200%','top':'200%'}).appendTo($('body'));

			// Get the height
			$hi_roy.height = $hi_roy_element_img_copy.height();

			// Remove the copy
			$hi_roy_element_img_copy.remove();

			// Add our element to the body
			$element.append($hi_roy.element);

			// If we want Roy to move from the get to...
			if ( $hi_roy.options.moveOnStart ) {

				// Move Roy in
				$hi_roy.moveIn($hi_roy.position, function () {

					// Move Roy cutout when the screen is touched or when the mouse moves
					if ($hi_roy.options.moveOnMove) {
						$(window).on('touchstart mousemove', function ($event) {
							$hi_roy.move();
						});
					}

				});

			}

		});

	}
	$.extend(hiRoy.prototype,{

		// Get the current position
		get_position: function() {
			return this.position;
		},

		// Disable Roy
		disable: function() {
			this.disabled = true;
		},

		// Enable Roy
		enable: function() {
			this.disabled = false;
		},

		// Disable Roy from moving
		disableMove: function() {
			this.move_disabled = true;
		},

		// Enable Roy from moving
		enableMove: function() {
			this.move_disabled = false;
		},

		// Destroy Roy
		destroy: function() {
			this.element.remove();
			this.disable();
		},

		// Move Roy in
		moveIn: function($position,callback) {

			// Hi Roy
			var $hi_roy = this;

			// Don't move if disabled
			if ( $hi_roy.move_disabled ) {
				return false;
			}

			// Disable while we work
			$hi_roy.move_disabled = true;

			// Set the position class
			$hi_roy.element.removeClass($hi_roy.position).addClass($position);

			// Clean up styles
			$hi_roy.element.removeAttr('style');
			$hi_roy.element.find('img').removeAttr('style');

			// Place Roy
			$hi_roy.element.css( $position, (  - $hi_roy.height ) );

			// Change current position
			$hi_roy.position = $position;

			// Set new background position
			// A whole number between 10 and 90
			var $new_cutout_pos = Math.floor( Math.random() * ((90 - 10) + 1 ) + 10 );
			switch($hi_roy.position) {
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
			var $animate = {};
			$animate[$hi_roy.position] = 0;

			// Move Roy in
			$hi_roy.element.show().animate($animate,800,function() {

				// Enable move
				$hi_roy.move_disabled = false;

				// Trigger our move in event, pass position information
				var $hiRoyAfterMoveIn = new CustomEvent( 'hiRoyAfterMoveIn', {
					detail: {
						position: $hi_roy.position
					}
				});
				document.body.dispatchEvent($hiRoyAfterMoveIn);

				// Call the callback
				if (callback) {
					callback();
				}

			});

		},

		// Move Roy out
		moveOut: function(callback) {

			// Hi Roy
			var $hi_roy = this;

			// Don't move if disabled
			if ( $hi_roy.move_disabled ) {
				return false;
			}

			// Disable while we work
			$hi_roy.move_disabled = true;

			// Set animate properties for moving out
			var $animate = {};
			$animate[$hi_roy.position] = 0 - $hi_roy.height;

			// Move Roy out
			$hi_roy.element.animate($animate, 800, function() {

				// Hide Roy
				$hi_roy.element.hide();

				// Enable move
				$hi_roy.move_disabled = false;

				// Trigger our move out event, pass position information
				var $hiRoyAfterMoveOut = new CustomEvent( 'hiRoyAfterMoveOut', {
					detail: {
						position: $hi_roy.position
					}
				});
				document.body.dispatchEvent($hiRoyAfterMoveOut);

				// Call the callback
				if (callback) {
					callback();
				}

			});

		},

		// Move Roy
		move: function($position) {

			// Hi Roy
			var $hi_roy = this;

			// Don't move if disabled
			if ( $hi_roy.disabled || $hi_roy.move_disabled ) {
				return false;
			}

			// Set next position
			var $next_position = $position;

			// Make sure we have a valid next position
			// If not passed, will select one at random
			if ( $next_position === undefined || $.inArray($next_position, $hi_roy_sides ) == -1 ) {
				$next_position = get_random_position();
			}

			// Move Roy out
			$hi_roy.moveOut(function() {

				// Move Roy back in
				$hi_roy.moveIn($next_position);

			});

		}

	});
	
	// Let's get Roy all setup
	// @TODO Can we "chain" and still return the object?
	$.fn.hiRoy = function($options) {
		//return this.each(function() {
			if ( ! $.data( this, 'hi-roy' ) ) {
				var $new_hi_roy = new hiRoy(this,$options);
				$.data( this, 'hi-roy', $new_hi_roy );
				return $new_hi_roy;
			}
		//});
	};

}(jQuery));