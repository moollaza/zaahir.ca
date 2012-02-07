// remap jQuery to $
(function($){})(window.jQuery);


/* trigger when page is ready */
$(document).ready(function() {
	
	$('.carousel').carousel();

	$('.prev').click(function() {
		$('.carousel').carousel('prev');
	});

	$('.next').click(function() {
		$('.carousel').carousel('next');
	});
});