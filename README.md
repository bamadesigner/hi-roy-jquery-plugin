# Hi Roy

```
// Place an element in your HTML
<div id="hi-roy"></div>
```

```
// Initiate Roy in JS
var $hi_roy = $('#hi-roy').hiRoy();
```

```
// You can also tweak a few options
// The default options:
*startPosition: Will pull a random position to place Roy at the start ('top', 'right', 'bottom', 'left').
*image: Is the relative path to the cutout of Roy's head. You can place a different path if you'd like to use a different image.
*link: Defines the link used when you click on Roy's head. By default, is a Twitter web intent to tweet "Hi Roy".
*onMove: If true, will move Roy's head when the user's mouse moves. Set true to disable this so you can move Roy on your own terms.

// To change the options:
var $hi_roy = $('#hi-roy').hiRoy({
    startPosition: 'top', // Do this if you always want Roy to start at the top
    onMove: false // Disable Roy moving when the mouse moves
});
```

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