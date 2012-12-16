$(document).ready(function() {

  // Setup Gray Bars and their width/height/offset
  $("#tag_container").width(($("#name").width()));
  $("header .line").width((($("#name").width() - $("#tag").width())/2) - 1);
  var top_offset = $("#tag_container").height()/2 - $(".line").height()/2;
  $(".line").css("top", top_offset + "px")
  
  // Used to slide content sections horizontally
  $("#home_button").click(function() {
    var $width = $('#content_container').outerWidth();
    var $margin = parseInt(jQuery('#content > section').css("margin-right"), 10);
    var $content = $('#content');

    $content.css("left", ( -1 * ($width + $margin) ) );

    $("#content").css("left","0");
    $("#my_name").css("opacity",".6");
    $("#who").css("opacity",".6");
  });

  $("#contact_button").click(function() {
    var $width = $('#content_container').outerWidth();
    var $margin = parseInt(jQuery('#content > section').css("margin-right"), 10);
    var $content = $('#content');

    $content.css("left", ( -1 * ($width + $margin) ) );

    $("#my_name").css("opacity","0");
    $("#who").css("opacity","0");
  });

  $("#about_button").click(function() {
    var $width = $('#content_container').width();
    var $margin = parseInt(jQuery('#content > section').css("margin-right"), 10);
    var $content = $('#content');

    $content.css("left", ( -2 * ($width + $margin) ) );
    
    $("#my_name").css("opacity","0");
    $("#who").css("opacity","0");
  });

  /* For Portfolio Page */
  $('.carousel').carousel();

  $('.prev').click(function() {
    $('.carousel').carousel('prev');
  });

  $('.next').click(function() {
    $('.carousel').carousel('next');
  });

});

$(window).resize(function() {
    var $width = $('#content_container').outerWidth();
    var $margin = parseInt(jQuery('#content > section').css("margin-right"), 10);
    var $content = $('#content');

    $content.css("left", ( -1 * ($width + $margin) ) );

    $("#content").css("left","0");
    $("#my_name").css("opacity",".6");
    $("#who").css("opacity",".6");
});