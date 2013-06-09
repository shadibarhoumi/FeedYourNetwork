// if ($(window).width() < 640) {

// $(document).bind("mobileinit", function () {
//     $.mobile.pushStateEnabled = true;
// });
 
// $(function () {
//     var menuStatus;
//     var show = function() {
//         if(menuStatus) {
//             return;
//         }
//         $('#contacts').show();
//         $('.pane, header').css('position','fixed').animate({
//             marginLeft: "80%",
//         }, 300, function () {
//             menuStatus = true
//         });
//     };
//     var hide = function() {
//         if(!menuStatus) {
//             return;
//         }
//         $('.pane, header').css('position','absolute').animate({
//             marginLeft: "0px",
//         }, 300, function () {
//             menuStatus = false
//             $('#contacts').hide();
//         });
//     };
//     var toggle = function() {
//         if (!menuStatus) {
//             show();
//         } else {
//             hide();
//         }
//         return false;
//     };
 
//     // Show/hide the menu
//     $(".menu-handle").click(toggle);
//     $('#menu, .pages').live("swipeleft", hide);
//     $('.pages').live("swiperight", show);
 
//     $('div[data-role="page"]').live('pagebeforeshow', function (event, ui) {
//         menuStatus = false;
//         $(".pages").css("margin-left", "0");
//     });
 
//     // Menu behaviour
//     $("#menu li a").click(function () {
//         var p = $(this).parent();
//         p.siblings().removeClass('active');
//         p.addClass('active');
//     });
// });
 


// } else{
// 	function notificationsOut(){
// 		var $note = $('#notifications');
// 		$($note).addClass('out');
// 	}

	
// $(function(){	
	
// 	$('body').find('.profile-link').click(function() {
// 		notificationsOut();
		
// 		$('#contact').delay(200).queue(function(next){
// 		    $(this).addClass('open');
// 		    next();
// 		});
// 	});
	
// 	$('#contact').find('.card-wrap').click(function() {
// 		$('#notifications').removeClass('out');
		
// 		$('#contact').removeClass('open');
// 	});
	
// });
	
// }

// 	function blink(){
// 		//do something.
// 	}
	
// 	function showPopup($location){
// 			$($location).find('.popup').addClass('show');
// 	}
	
// 	function hidePopup($location, $grabme, $li){
// 			$($location).find('.popup').removeClass('show');
			
// 			if($grabme = 'true'){
// 				$frequencySlug = $($li).attr("data-frequency-slug");
// 				$($location).find('.number').html($frequencySlug);
// 				blink();
// 			}
// 	}
	

// $(function(){

	
		
// 	$('#contacts').find('a.active-handle').click(function() {
// 		alert('clicked name');
// 		var $contactLi = $(this).closest('.contact');
		
// 		if ($contactLi.hasClass('active')) {
// 			$contactLi.removeClass('out').delay(100).queue(function(next){
// 		         $(this).removeClass('active');;
// 		         next();
// 		    });
// 			$($contactLi).find('.number').html('&nbsp;');
// 			hidePopup($contactLi);
// 		} else {
// 			$contactLi.addClass('active');
// 			showPopup($contactLi);
			
// 				$($contactLi).find('.popup').click(function(e) {
					 
// 					 if($(e.target).is('li')){
// 						 hidePopup($contactLi, 'true', $(e.target));
// 						 $contactLi.addClass('out');

// 					 } else {
// 						 hidePopup($contactLi);
// 						 $contactLi.removeClass('active').removeClass('out');
// 					 }
// 				}); 
				
				
// 		}
// 		return false;
// 	}); 
	

	
// 	$('#contacts').find('div.number').click(function(e) {
		
// 		var $contactLi = $(this).closest('.contact');	
// 		showPopup($contactLi); 
		
// 		$($contactLi).find('.popup').click(function(e) {
// 			 if($(e.target).is('li')){
// 				 hidePopup($contactLi, 'true', $(e.target));
// 			 } else {
// 				 hidePopup($contactLi);
// 			 }
// 		});		
// 	}); 
// });
