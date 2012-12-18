// Setup Gray Bars and their width/height/offset
function bars(){
  $("#tag_container").width(($("#name").width()));
  $("header .line").width((($("#name").width() - $("#tag").width())/2) - 2);
  var top_offset = $("#tag_container").outerHeight()/2 - $(".line").height()/2 + 1;
  $(".line").css("top", top_offset + "px");
}

function size(){
  $("#index section").css("width", ($("#slider").width()/3) - 20);
}

$(document).ready(function() {

  bars();
  size();

  // Force media icons to appear in stacked row
  var icon_width = $("#media_icons li a").outerWidth();
  $("#media_icons").css("width", icon_width * 4 + (4 * 8));

  // Used to slide content sections horizontally
  $("#home_button").click(function() {
    $("#slider").css("left", ( 0 ));
  });  

  $("#contact_button").click(function() {
    $("#slider").css("left", ( -100 + "%" ));
  });

  $("#about_button").click(function() {
    $("#slider").css("left", ( -200 + "%" ));
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
    size();
});