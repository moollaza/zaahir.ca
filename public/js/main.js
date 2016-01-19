$(document).ready(function() {


    /* Scroll more info button to about page */
    $('.more-info').click(function() {
        $.fn.fullpage.moveTo('page-profile');
    });

    /* For Bootstrap current state on portfolio sorting */

    $('ul.nav-pills li a').click(function(e) {
        $('ul.nav-pills li.active').removeClass('active');
        $(this).parent('li').addClass('active');
    });

    $('#fullpage').fullpage({
        //Navigation
        menu: '#main-menu',
        anchors:['page-welcome', 'page-profile', 'page-contact', 'page-end'],

        //Scrolling
        scrollBar: true,

        afterRender: function(){

            /* VEGAS Home Slider */
            var $welcome = $('#welcome-slider');
            $welcome.vegas({
                slides: [
                    { src: 'img/slider/hairpin.jpg' },
                    { src: 'img/slider/water.jpg'   },
                    { src: 'img/slider/hotel-pool.jpg'  },
                    { src: 'img/slider/record-player.jpg'  }
                ],
                overlay: '/img/overlays/06.png',
                timer: false
            });

            $("#vegas-next").click(function() {
                $welcome.vegas('next');
            });

            $("#vegas-prev").click(function() {
               $welcome.vegas('previous');
            });
        }
    });
});
