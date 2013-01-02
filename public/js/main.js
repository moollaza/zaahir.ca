// Setup Gray Bars and their width/height/offset
function bars(){
  $("#tag_container").width(($("#name").width()));
  $("header .line").width((($("#name").width() - $("#tag").width())/2) - 2);
  var top_offset = $("#tag_container").outerHeight()/2 - $(".line").height()/2 + 1;
  $(".line").css("top", top_offset + "px");
}

$(document).ready(function() {

  bars();

  if ( $("#index").length ) {
    // Force media icons to appear in stacked row
    var icon_width = $("#media_icons li a img").width();
    $("#media_icons").css("width", (icon_width * 4) + (4 * 8));

    // Used to slide content sections horizontally
    $("#menu li button").click(function() {

      //Toggle active class
      $("#menu li button.active").removeClass("active");
      $(this).addClass("active");

      // Slide content accordingly
      switch ($(this).text()){
        case "Home":
          $("#inner").css("margin-left", ( 0 ));
          break;
        case "Contact":
          $("#inner").css("margin-left", ( -100 + "%" ));
          break;
        case "About":
          $("#inner").css("margin-left", ( -200 + "%" ));
          break;
      }
    })
  }
});

$(window).resize(function() {
  bars();
  // $("content").css("left", ( 0 ) );
});

    // // Used to slide content sections horizontally
    // $("#home_button").click(function() {
    //   $("#inner").css("margin-left", ( 0 ));
    //   $("#home_button").addClass("active")
    //   $("#contact_button").removeClass("active")
    //   $("#about_button").removeClass("active")
    // });  

    // $("#contact_button").click(function() {
    //   $("#inner").css("margin-left", ( -100 + "%" ));
    //   $("#contact_button").addClass("active")
    //   $("#home_button").removeClass("active")
    //   $("#about_button").removeClass("active")
    // });

    // $("#about_button").click(function() {
    //   $("#inner").css("margin-left", ( -200 + "%" ));
    //   $("#about_button").addClass("active")
    //   $("#contact_button").removeClass("active")
    //   $("#home_button").removeClass("active")
    // });