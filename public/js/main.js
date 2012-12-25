// Setup Gray Bars and their width/height/offset
function bars(){
  $("#tag_container").width(($("#name").width()));
  $("header .line").width((($("#name").width() - $("#tag").width())/2) - 2);
  var top_offset = $("#tag_container").outerHeight()/2 - $(".line").height()/2 + 1;
  $(".line").css("top", top_offset + "px");
}

$(document).ready(function() {

  bars();

  if ( $("#home").length ) {

    // Force media icons to appear in stacked row
    var icon_width = $("#media_icons li a img").width();
    $("#media_icons").css("width", (icon_width * 4) + (4 * 8));

    // Used to slide content sections horizontally
    $("#home_button").click(function() {
      $("#inner").css("margin-left", ( 0 ));
    });  

    $("#contact_button").click(function() {
      $("#inner").css("margin-left", ( -100 + "%" ));
    });

    $("#about_button").click(function() {
      $("#inner").css("margin-left", ( -200 + "%" ));
    });
  } else if ( $("#resume").length) {
    
  } else if ( $("#portfolio").length) {
    /* For Portfolio Page */
    $('#carousel').carousel(); 
  }  
});

$(window).resize(function() {
  $("content").css("left", ( 0 ) );
});