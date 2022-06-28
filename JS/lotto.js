
  // Content Chalet & Rooms JS code
  (function($) {
    "use strict";
    $.fn.sliderResponsive = function(settings) {

    var set = $.extend( 
  {
   slidePause: 3000,
      fadeSpeed: 800,
      autoPlay: "on",
      showArrows: "off", 
     hideDots: "off", 
    hoverZoom: "on",
     titleBarTop: "off"
},
settings
); 

var $slider = $(this);
var size = $slider.find("> div").length; //number of slides
var position = 0; // current position of carousal
var sliderIntervalID; // used to clear autoplay

// Add a Dot for each slide
$slider.append("<ul></ul>");
$slider.find("> div").each(function(){
$slider.find("> ul").append('<li></li>');
});

// Put .show on the first Slide
$slider.find("div:first-of-type").addClass("show");

// Put .showLi on the first dot
$slider.find("li:first-of-type").addClass("showli")

//fadeout all items except .show
$slider.find("> div").not(".show").fadeOut();

// If Autoplay is set to 'on' than start it
if (set.autoPlay === "on") {
  startSlider(); 
} 

// If showarrows is set to 'on' then don't hide them
if (set.showArrows === "on") {
  $slider.addClass('showArrows'); 
}

// If hideDots is set to 'on' then hide them
if (set.hideDots === "on") {
  $slider.addClass('hideDots'); 
}

// If hoverZoom is set to 'off' then stop it
if (set.hoverZoom === "off") {
  $slider.addClass('hoverZoomOff'); 
}

// If titleBarTop is set to 'on' then move it up
if (set.titleBarTop === "on") {
  $slider.addClass('titleBarTop'); 
}

// function to start auto play
function startSlider() {
sliderIntervalID = setInterval(function() {
  nextSlide();
}, set.slidePause);
}

// on mouseover stop the autoplay
$slider.mouseover(function() {
if (set.autoPlay === "on") {
  clearInterval(sliderIntervalID);
}
});

// on mouseout starts the autoplay
$slider.mouseout(function() {
if (set.autoPlay === "on") {
  startSlider();
}
});

//on right arrow click
$slider.find("> .right").click(nextSlide)

//on left arrow click
$slider.find("> .left").click(prevSlide);

// Go to next slide
function nextSlide() {
position = $slider.find(".show").index() + 1;
if (position > size - 1) position = 0;
changeCarousel(position);
}

// Go to previous slide
function prevSlide() {
position = $slider.find(".show").index() - 1;
if (position < 0) position = size - 1;
changeCarousel(position);
}

//when user clicks slider button
$slider.find(" > ul > li").click(function() {
position = $(this).index();
changeCarousel($(this).index());
});

//this changes the image and button selection
function changeCarousel() {
$slider.find(".show").removeClass("show").fadeOut();
$slider
  .find("> div")
  .eq(position)
  .fadeIn(set.fadeSpeed)
  .addClass("show");
// The Dots
$slider.find("> ul").find(".showli").removeClass("showli");
$slider.find("> ul > li").eq(position).addClass("showli");
}

return $slider;
};
})(jQuery);



//////////////////////////////////////////////
// Activate each slider - change options
//////////////////////////////////////////////
$(document).ready(function() {

$("#slider1").sliderResponsive({
// Using default everything
// slidePause: 5000,
// fadeSpeed: 800,
// autoPlay: "on",
// showArrows: "off", 
// hideDots: "off", 
// hoverZoom: "on", 
// titleBarTop: "off"
});

$("#slider2").sliderResponsive({
fadeSpeed: 300,
autoPlay: "off",
showArrows: "on",
hideDots: "on"
});

$("#slider3").sliderResponsive({
hoverZoom: "off",
hideDots: "on"
});

}); 

// PHASE SLIDESHOW VIEW STARTS HERE
jQuery(document).ready(function ($) {

  var options = {
      $FillMode: 2,                                       //[Optional] The way to fill image in slide, 0 stretch, 1 contain (keep aspect ratio and put all inside slide), 2 cover (keep aspect ratio and cover whole slide), 4 actual size, 5 contain for large image, actual size for small image, default value is 0
      $AutoPlay: 1,                                       //[Optional] Auto play or not, to enable slideshow, this option must be set to greater than 0. Default value is 0. 0: no auto play, 1: continuously, 2: stop at last slide, 4: stop on click, 8: stop on user navigation (by arrow/bullet/thumbnail/drag/arrow key navigation)
      $Idle: 3000,                                        //[Optional] Interval (in milliseconds) to go for next slide since the previous stopped if the slider is auto playing, default value is 3000
      $PauseOnHover: 0,                                   //[Optional] Whether to pause when mouse over if a slider is auto playing, 0 no pause, 1 pause for desktop, 2 pause for touch device, 3 pause for desktop and touch device, 4 freeze for desktop, 8 freeze for touch device, 12 freeze for desktop and touch device, default value is 1

      $ArrowKeyNavigation: 1,   			                //[Optional] Steps to go for each navigation request by pressing arrow key, default value is 1.
      $SlideEasing: $Jease$.$OutQuint,                    //[Optional] Specifies easing for right to left animation, default value is $Jease$.$OutQuad
      $SlideDuration: 800,                                //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 500
      $MinDragOffsetToSlide: 20,                          //[Optional] Minimum drag offset to trigger slide, default value is 20
      //$SlideWidth: 600,                                 //[Optional] Width of every slide in pixels, default value is width of 'slides' container
      //$SlideHeight: 300,                                //[Optional] Height of every slide in pixels, default value is height of 'slides' container
      $SlideSpacing: 0, 					                //[Optional] Space between each slide in pixels, default value is 0
      $UISearchMode: 1,                                   //[Optional] The way (0 parellel, 1 recursive, default value is 1) to search UI components (slides container, loading screen, navigator container, arrow navigator container, thumbnail navigator container etc).
      $PlayOrientation: 1,                                //[Optional] Orientation to play slide (for auto play, navigation), 1 horizental, 2 vertical, 5 horizental reverse, 6 vertical reverse, default value is 1
      $DragOrientation: 1,                                //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 either, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $Cols is greater than 1, or parking position is not 0)

      $BulletNavigatorOptions: {                          //[Optional] Options to specify and enable navigator or not
          $Class: $JssorBulletNavigator$,                 //[Required] Class to create navigator instance
          $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
          $SpacingX: 8,                                   //[Optional] Horizontal space between each item in pixel, default value is 0
          $Orientation: 1                                //[Optional] The orientation of the navigator, 1 horizontal, 2 vertical, default value is 1
      },

      $ArrowNavigatorOptions: {                           //[Optional] Options to specify and enable arrow navigator or not
          $Class: $JssorArrowNavigator$,                  //[Requried] Class to create arrow navigator instance
          $ChanceToShow: 2                                 //[Optional] Steps to go for each navigation request, default value is 1
      }
  };

  var jssor_slider1 = new $JssorSlider$("slider1_container", options);

  //responsive code begin
  //you can remove responsive code if you don't want the slider scales while window resizing
  function ScaleSlider() {
      var bodyWidth = document.body.clientWidth;
      if (bodyWidth)
          jssor_slider1.$ScaleWidth(Math.min(bodyWidth, 1020));
      else
          window.setTimeout(ScaleSlider, 30);
  }
  ScaleSlider();

  $(window).bind("load", ScaleSlider);
  $(window).bind("resize", ScaleSlider);
  $(window).bind("orientationchange", ScaleSlider);
  //responsive code end
});
// PHASE SLIDESHOW VIEW ENDS HERE

// TEAM SLIDE VIEW STARTS HERE

// TEAM SLIDE VIEW ENDS HERE