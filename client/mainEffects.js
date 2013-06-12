if ($(window).width() < 640) {

$(document).bind("mobileinit", function () {
    $.mobile.pushStateEnabled = true;
});
 
Meteor.startup(function () {
    var menuStatus;
    var show = function() {
        if(menuStatus) {
            return;
        }
        $('#contacts').show();
        $('.pane, header').css('position','fixed').animate({
            marginLeft: "80%"
        }, 300, function () {
            menuStatus = true
        });
    };
    var hide = function() {
        if(!menuStatus) {
            return;
        }
        $('.pane, header').css('position','absolute').animate({
            marginLeft: "0px"
        }, 300, function () {
            menuStatus = false
            $('#contacts').hide();
        });
    };
    var toggle = function() {
        if (!menuStatus) {
            show();
        } else {
            hide();
        }
        return false;
    };
 
    // Show/hide the menu
    $(".menu-handle").click(toggle);

});
 


} else{
	notificationsOut = function notificationsOut(){
		var $note = $('#notifications');
		$($note).addClass('out');
	}
}
