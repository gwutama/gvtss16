/**
 * The prototype class Sprite represents a class that can be used
 * to manipulate sprite sheets. Images in an input sprite sheet must be
 * vertically arranged (1 row, n columns).
 *
 * The animation/frame manipulation doesn't use background image in the img
 * element per se. Instead, it utilizes positional changes in the CSS
 * background property, resulting a much smoother animation.
 *
 * @param element Dom element, must be an img element.
 * @constructor
 * @author Galuh Utama <galuh.utama@gwutama.de>
 * @date 2016-04-13
 */
var Sprite = function(element) {
    this.element = element;
    this.spritePath = this.element.dataset.spriteSrc;
    this.numFrames = this.element.dataset.numFrames;
    this.frameWidthPx = this.element.dataset.frameWidth;
    this.currentFrameNum = 0;

    // This is basically cheating. We set the img source to a 1px transparent png
    // and set the first frame in the sprite sheet as the background
    // (in the css property).
    this.element.style.src = "";
    this.element.src = "images/1px.png";
    this.element.style.background = 'url("' + this.spritePath + '")';
};

/**
 * Display the previous frame.
 */
Sprite.prototype.previousFrame = function() {
    var frame = this.currentFrameNum - 1;
    this.setFrameNum(frame);
};

/**
 * Display the next frame.
 */
Sprite.prototype.nextFrame = function() {
    var frame = this.currentFrameNum + 1;
    this.setFrameNum(frame);
};

/**
 * Set the frame number to be displayed in the container.
 *
 * @param frame The frame number.
 */
Sprite.prototype.setFrameNum = function(frame) {
    if (frame > this.numFrames) {
        frame = 0;
    } else if (frame < 0) {
        frame = this.numFrames - 1;
    }
    this.currentFrameNum = frame;

    // The main trick of this class is to set the background position of the CSS property.
    this.element.style.backgroundPosition = (-frame * this.frameWidthPx) + "px 0";
};



////////////////////////////////////////////////////////////////////////////////////
// Page Module
////////////////////////////////////////////////////////////////////////////////////

/**
 * This is the page module for the application. It initializes two sprites (disc and dog)
 * using the Sprite class. Finally, it binds the keys "L", "R", left and right arrows.
 * By pressing these keys, user can animate the sprites.
 */
var page = (function() {
    var discSprite;
    var dogSprite;

    /**
     * Initialize the module.
     * This initializes the sprites and binds the keys to animate the sprites.
     */
    function init() {
        discSprite = new Sprite(document.getElementById("sprite-disc"));
        dogSprite = new Sprite(document.getElementById("sprite-dog"));
        window.onkeydown = onKeyDown;
        console.log("Page initialized");
    }

    /**
     * Event that is triggered when keys "L", "R", left and right arrows are pressed.
     * @param event
     */
    function onKeyDown(event) {
        var key = event.which ? event.which : event.keyCode;
        switch(key) {
            case 76: // l
            case 37: // left arrow
                discSprite.previousFrame();
                dogSprite.previousFrame();
                break;
            case 82: // r
            case 39: // right arrow
                discSprite.nextFrame();
                dogSprite.nextFrame();
                break;
        }
    }

    // Interface
    return {
        init: init
    };
}());


window.onload = function() {
    page.init();
};
