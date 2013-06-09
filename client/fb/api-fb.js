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
    getFriendsList: function(callback) {
      FB.api('/me/friends', function(response) {
        //these are run once facebook says its ready
        console.log("***FRIENDS LIST RESPONSE***");
        console.log(response);
        // this.fbApi.friendsList = response.data;
        callback(response.data);
      });
    },
    getFriendProfilePics: function(profileId) {
      return "http://graph.facebook.com/"+ profileId +"/picture";
    },
    getFriendStatus: function(profileId, callback) {
      FB.api('/' + profileId + '?fields=statuses.limit(1)', function(response) {
        callback(response.statuses.data[0].message);
      });
    },
    getTimeStampOfStatus: function(profileId) {
      FB.api('/' + profileId + '?fields=statuses.limit(1)', function(response) {
        console.log(response.statuses.data[0].updated_time);
      });
    },
    getFriendLocation: function(profileId) {
      FB.api('/' + profileId + '?fields=location', function(response) {
        console.log(response.location.name);

      });
    }
	};
});
