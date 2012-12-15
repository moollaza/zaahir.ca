$(document).ready(function() {

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