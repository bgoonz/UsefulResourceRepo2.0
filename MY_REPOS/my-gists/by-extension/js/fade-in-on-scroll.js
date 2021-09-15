$(document).ready(function() {
	
	/* Hide all elements outside the visible window */
	$('body *').each( function(){
	   
		var top_of_object = $(this).position().top;
		var bottom_of_window = $(window).scrollTop() + $(window).height();
	   
		if( bottom_of_window < top_of_object  ){
		
			$(this).addClass('hideme').css({'opacity':'0'});
			
		}
		
	});
	
	/* Every time the window is scrolled ... */
	$(window).scroll( function(){
		
		/* Check the location of the desired elements */
		$('.hideme').each( function(i){
			
			var bottom_of_object = $(this).position().top + $(this).outerHeight();
			var bottom_of_window = $(window).scrollTop() + $(window).height();
			
			
				if( bottom_of_window > ( bottom_of_object + 20 )  ){
				
					$(this).removeClass('hideme').animate({'opacity':'1'},500);
					
				}
			
		}); 
	
	});
	
});