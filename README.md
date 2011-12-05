jQuery-Slider
=============
Despite the (currently) borring name, jQuery-Slider is a new slider being built to be a one-stop-shop 
for your slider needs. This slider incorporates the best features of other sliders on the market.

Features
--------

Here are some of the features that jQuery-Slider supports:

* Image slideshows
* HTML Content
* HTML Titles and Overlays
* Multiple transitions
* Canvas timer (bar, circle, or ring styles)
* Slide Navigation Controls
* Dynamic Thumbnails
* XML input support
* And More!

Usage
-----

The slider uses the format of:

	$(input_Element).slide({ slides: slide_Content_Input });

Using the slider can be as simple or as complex as you wish. The slider has the ability to intelligently
determine the type of input you give it. Meaning, you can pass in XML string data, an XML document, 
a DOM element, jQuery object, or jQuery selector (*Note:* if you pass a DOM or jQuery Object, it must be
a `<ul/>` element in the proper format). Here is an example of the basic usage using defaults:

### HTML:

	<link type="text/css" rel="stylesheet" href="css/jquery.slide.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1/jquery-ui.min.js"></script>
	<script src="js/jquery.slide.js"></script>
	<script src="js/slide.timer.js"></script>

	<div id="sliderUl"></div>
    <ul id="slides">
        <li>
            <img class="slide-thumb" src="" alt="" />
            <img class="slide-image" src="img/slides/1.jpg" alt="" />
            <div class="slide-content"></div>
            <div class="slide-overlay"></div>
        </li>
        <li>
            <img class="slide-thumb" src="" alt="" />
            <img class="slide-image" src="img/slides/2.jpg" alt="" />
            <div class="slide-content"></div>
            <div class="slide-overlay"></div>
        </li>
	</ul>

### Javascript

	$(function () {
		$('#sliderUl').slide({ slides: '#slides' });
	});

The plugin will use the `<ul/>` passed in to create the slider. It does *NOT* use the `<ul/>` markup
as the actual slider. It will hide that element, and create its own HTML. This method was chosen so that
the API for passing the plugin data, and the actual implementation of the slider are decoupled. So the
theming API can change without changing the input API and visa versa.

Here is another example using some XML that is pulled in using AJAX:

### HTML

	<link type="text/css" rel="stylesheet" href="css/jquery.slide.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1/jquery-ui.min.js"></script>
	<script src="js/jquery.slide.js"></script>
	<script src="js/slide.timer.js"></script>

	<div id="sliderXml"></div>

### Javascript

	$(function () {
		$.get('slides.xml', function (data) {
			//passes in xml as an XML Document
			//string XML data will work as well
            $('#sliderXml').slide({ slides: data });
        });
	});

Theming
-------

Something unique to jQuery-Slider is the theming API. All controls and components are assigned 
classes that allow you to theme the slider to your preference. All CSS sprites can be easily replaced.
This slider was designed to provide functionality, without forcing you into a style. That way you
can take the slider and brand it to your website, quickly and easily.

If you open `css/jquery.slide.css` you will find 2 sections. The Theming section and Functional section.
I recommend you do not change styles in the Function section as it may break the operation of the slider,
however you can modify the base theme in the first section without fear, or extract it to your own stylesheets
if you think that is more appropriate.

Installation
------------

The slide requires [`jQuery 1.6+`](http://jquery.com/). For a minimal install, the only *required* files are
`js/jquery.slide.js` and `css/jquery.slide.css`. However for the canvas timer you will need `js/slide.timer.js`
as well. Also, `img/sprite.png` provides a simple control button sprite for use in the slide navigation.

For a minimal install, include the following in your HTML:

	<link type="text/css" rel="stylesheet" href="css/jquery.slide.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1/jquery-ui.min.js"></script>
	<script src="js/jquery.slide.js"></script>

To use the timer you will need to include that as well:

	<script src="js/slide.timer.js"></script>