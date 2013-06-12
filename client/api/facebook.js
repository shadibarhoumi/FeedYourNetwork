$.getScript('http://connect.facebook.net/en_US/all.js', function()
{
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
    getFriendsList: function(callback) {
      FB.api('/me/friends', function(response) {
        //these are run once facebook says its ready
        this.fbApi.friendsList = response.data;
        callback(response.data);
      });
    },
    getFriendProfilePics: function(profileId) {
      return "http://graph.facebook.com/"+ profileId +"/picture";
    },
    getFriendStatus: function(profileId) {
      FB.api('/' + profileId + '?fields=statuses.limit(1)', function(response) {
        console.log(response.statuses.data[0].message);

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
