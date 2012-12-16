$(document).ready(function() {

  // Setup Gray Bars and their width/height/offset
  $("#tag_container").width(($("#name").width()));
  $("header .line").width((($("#name").width() - $("#tag").width())/2) - 1);
  var top_offset = $("#tag_container").height()/2 - $(".line").height()/2;
  $(".line").css("top", top_offset + "px");
  
  // Used to slide content sections horizontally
  $("#home_button").click(function() {
    $("#content").css("left", ( 0 ));
  });  

  $("#contact_button").click(function() {
    $("#content").css("left", ( -100 + "%" ));
    console.log("LOLZ")
  });

  $("#about_button").click(function() {
    $("#content").css("left", ( -200 + "%" ));
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
    $content.css("left", ( 0 ) );
});