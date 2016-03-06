# Hi Roy

No day is complete without saying hi Roy. If worrying about whether you've greeted Roy keeps you up at night, introducing the "Hi Roy" jQuery plugin to kick all your worries to the curb.

By simply placing this plugin on your website, you too can ensure your membership in the [Hi Roy Club](http://hiroy.club/) and that you never forget to say hi Roy again.

![Have you said hi Roy today?](https://raw.githubusercontent.com/bamadesigner/hi-roy/master/hi-roy-screencast.gif)

## Getting Started

Hi Roy is a simple jQuery plugin that, by default, places Roy on your website and makes him move from side to side when you move your mouse. If you happen to catch Roy, you can click his head greet him on this beautiful day.

You can also customize the plugin to modify Roy's behavior.

Take the following files from the repo and add them to your site:

* hi-roy-min.js
* hi-roy-styles.css
* roy-head.png file - *(You can use your own image instead of Roy's head. [See options below](https://github.com/bamadesigner/hi-roy#how-to-use-your-own-image))*

Add the following to the <head> section of your site. Hi Roy is a jQuery plugin so you will need to make sure you include jQuery. For this example, I'm pulling from the official jQuery CDN.

```
<link rel="stylesheet" href="hi-roy-styles.css" type="text/css" media="all" />
<script type="text/javascript" src="//code.jquery.com/jquery-2.2.1.min.js"></script>
<script type="text/javascript" src="hi-roy-min.js"></script>
```

```
// Initiate Roy with the element you want to add Roy to
// This way you can contain Roy inside a specific element
var $hi_roy = $('body').hiRoy();
```

## Options

You can customize Roy by tweaking a few options:

**The default options:**
*startPosition: Will pull a random position to place Roy at the start ('top', 'right', 'bottom', 'left').
*image: Is the relative path to the cutout of Roy's head. You can place a different path if you'd like to use a different image.
*link: Defines the link used when you click on Roy's head. By default, it's a Twitter web intent to tweet "Hi Roy".
*onMove: If true, will move Roy's head when the user's mouse moves. Set true to disable this so you can move Roy on your own terms.

### How To Customize Roy

```
var $hi_roy = $('body').hiRoy({
    startPosition: 'top', // Do this if you always want Roy to start at the top
    onMove: false // Disable Roy moving when the mouse moves
});
```

### How To Use Your Own Image

```
var $hi_roy = $('body').hiRoy({
    image: 'images/hi-rachel.png' // Include a relative path
});
```

### "Listen" To Roy

```
// You can add a listener so you can take action when Roy moves in to the screen
document.body.addEventListener('hiRoyAfterMoveIn', function($event){

    // Roy's positions are passed to the event via $event.detail

    // If you have "onMove" set to false, you can use this listener to make Roy move every 5 seconds
    setTimeout(function(){ $hi_roy.move(); }, 5000);

});
```

```
// You can add a listener so you can take action when Roy moves out of the screen
document.body.addEventListener('hiRoyAfterMoveOut', function($event){

    // Roy's positions are passed to the event via $event.detail

    // You can use this listener to control where Roy comes back in
    switch( $event.detail.currentPosition ) {
        case 'top':
            $hi_roy.nextPosition = 'right';
            break;
        case 'right':
            $hi_roy.nextPosition = 'bottom';
            break;
        case 'bottom':
            $hi_roy.nextPosition = 'left';
            break;
        case 'left':
            $hi_roy.nextPosition = 'top';
            break;
    }

});
```