﻿/*
 * Each transition has its own options, but they follow the format:
 * OmniSlide.transition(options);
 * WHERE options contains ATLEAST
    {
        type: 'fade',       //the type of transition to use
        effect: 'full',     //specific transition effect (like 'wave' or 'zipper' for 'strips')
        easing: 'linear',   //the type of easing to use on transitions
        wait: 5000,         //the wait time to show each slide 
        length: 500,        //how long the transition animates
        guid: '',           //the guid used for the ID of the slider

        direction: '',      //direction the animation goes (like 'down' or 'right')
        position: '',       //start position of the animation (like 'top' or 'topleft')

        animatorNum = 20,   //applies to strips/boxes; is the number of strips/boxes
        animatorDelay = 50  //applies ot strips/boxes; delay between each strip/box
    }
*/

(function ($, win, undefined) {
    win.OmniSlide.transition = function (options, $slides, index, next, callback) {
        //setup some reasonable defaults
        options.easing = options.easing || 'linear';
        options.wait = options.wait || 5000;
        options.length = options.length || 500;
        options.direction = options.direction || 'down';
        options.position = options.position || 'top';

        //store vars locally for easier access
        var transitions = OmniSlide.transitions,
            defaults = OmniSlide.transitions.defaults;

        if (transitions[options.type] && options.type.charAt(0) != '_') {
            //check if we did init for this transition yet
            if (!transitions[options.type]['_init_done']) {
                transitions[options.type]['_init']();
                OmniSlide.transitions[options.type]['_init_done'] = true;
            }

            //attempt to call transition effect, or default
            if (transitions[options.type][options.effect] && options.effect.charAt(0) != '_') {
                return transitions[options.type][options.effect]($slides, index, next, options, callback);
            } else {
                OmniSlide.warn('Unable to find effect %s in transition %s, using default effect %s', options.effect, options.type, options.type);
                return transitions[options.type][defaults[options.type]]($slides, index, next, options, callback);
            }
        } else {
            //no transition found, default to fade
            slide.warn('Unable to find transition %s, defaulting to transition fade:full', options.type);
            return transitions.fade.full($slides, index, next, options, callback);
        }
    };

    //definition of all transition functions
    //in the global object so they can be extended
    //externally
    win.OmniSlide.transitions = {
        strips: {
            _init: function ($slides, index, next, options, callback) {
                /*var slideWidth = $slides.width(),
                    stripWidth = parseInt(slideWidth / options.animatorNum),
                    gap = slideWidth - stripWidth * options.animatorNum,
                    stipLeft = 0;

                //create bars and set locations
                for (var i = 1; i < options.animatorNum + 1; ++i) {
                    var tstripWidth, $strip;

                    if (gap > 0) {
                        tstripWidth = stripWidth + 1;
                        gap--;
                    } else { tstripWidth = stripWidth; }

                    $strip = $('<div class="slider-transition-bar" id="slider-' + options.guid + '-' + i + '" style="width:' +
                        tstripWidth + 'px; height:' + $slides.height() + 'px;"></div>';
                    
                    _$theStrips.add($strip);
                }*/
            },
            _$theStrips: $(),
            wave: function ($slides, index, next, options, callback) { },
            zipper: function ($slides, index, next, options, callback) { },
            curtain: function ($slides, index, next, options, callback) { }
        },
        boxes: {
            init: function ($slides, index, next, options, callback) { },
            _cloneSlide: function ($slides, next) {},
            _$boxes: $(),
            diagonal: function ($slides, index, next, options, callback) { },
            row: function ($slides, index, next, options, callback) { },
            random: function ($slides, index, next, options, callback) { }
        },
        fade: {
            init: function () { },
            full: function ($slides, index, next, options, callback) {
                $slides.eq(next).show();
                $slides.eq(index).fadeOut(options.length, options.easing, function () {
                    $slides.eq(index).removeClass('active');
                    $slides.eq(next).addClass('active');

                    if (callback) callback();
                });
            },
            directional: function ($slides, index, next, options, callback) { }
        },
        cut: {
            init: function () { },
            full: function ($slides, index, next, options, callback) {
                $slides.eq(index).hide();
                $slides.eq(index).removeClass('active');
                $slides.eq(next).show();
                $slides.eq(next).addClass('active');

                if (callback) callback();
            }
        }
    };

    win.OmniSlide.transitions.defaults = {
        strips: 'wave',
        boxes: 'random',
        fade: 'full',
        cut: 'full'
    };

    /*
    * Transition extension example
    *
    $.extend(true, OmniSlide.transitions, {
    hey: {
    there: function ($slides, index, next, options, callback) {
    OmniSlide.log('Hey There!');

    if(callback) callback();
    }
    },
    defaults: {
    hey: 'there'
    }
    });
    */
})(jQuery, window);