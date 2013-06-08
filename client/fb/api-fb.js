$.getScript('http://connect.facebook.net/en_US/all.js', function()
{
    // script is now loaded and executed.
    // put your dependent JS here.
    console.log('help');
	window.fbAsyncInit = function() {
    // init the FB JS SDK
    FB.init({
      appId      : '666052703421024',                        // App ID from the app dashboard
      channelUrl : 'http://localhost:3000', // Channel file for x-domain comms
      status     : true,                                 // Check Facebook Login status
      xfbml      : true                                  // Look for social plugins on the page
    });

    // Additional initialization code such as adding Event Listeners goes here
  };

  window.fbApi = {
		friendsList: [],
    getFriendsList: function() {


      FB.api('/me/friends', function(response) {
        this.fbApi.friendsList = response.data;
      });
      return this.friendsList;
    },
	};
});
