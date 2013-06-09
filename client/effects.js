Template.eachContact.rendered = function() {

	function blink(){
		//do something.
	}
	
	function showPopup($location){
			$($location).find('.popup').addClass('show');
	}
	
	function hidePopup($location, $grabme, $li){
			$($location).find('.popup').removeClass('show');
			
			if($grabme = 'true'){
				$frequencySlug = $($li).attr("data-frequency-slug");
				$($location).find('.number').html($frequencySlug);
				blink();
			}
	}
	this.find('#contacts .active-handle').click(function() {
		alert('clicked name');
		var $contactLi = $(this).closest('.contact');
		
		if ($contactLi.hasClass('active')) {
			$contactLi.removeClass('out').delay(100).queue(function(next){
		         $(this).removeClass('active');;
		         next();
		    });
			$($contactLi).find('.number').html('&nbsp;');
			hidePopup($contactLi);
		} else {
			$contactLi.addClass('active');
			showPopup($contactLi);
			
				$($contactLi).find('.popup').click(function(e) {
					 
					 if($(e.target).is('li')){
						 hidePopup($contactLi, 'true', $(e.target));
						 $contactLi.addClass('out');

					 } else {
						 hidePopup($contactLi);
						 $contactLi.removeClass('active').removeClass('out');
					 }
				}); 
				
				
		}
		return false;
	}); 
};
