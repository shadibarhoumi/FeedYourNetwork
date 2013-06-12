
Template.login.isLinkedinAuth = function() {
  return Session.get('linkedinAuth');
};

Template.login.events({
  'click .loadContacts' : function(event) {
    //define call back to be run once facebook is ready
    var callback = function(fbFriendsList) {
      for (var i = 0; i < fbFriendsList.length; i++) {
        var obj = fbFriendsList[i];
        Contacts.insert({
          userId: Meteor.userId(),
          name: obj.name,
          pictureUrl: fbApi.getFriendProfilePics(obj.id),
          facebook: obj,
          flagged: false
        });
      }
    };
    //pass the asynconous block
    fbApi.getFriendsList(callback);

    IN.API.Connections("me")
      .result(function(data) {
        var list = data.values;
        for (var i = 0; i < list.length; i++) {
          var obj = list[i];
          var tempUrl = obj.pictureUrl ? obj.pictureUrl : "http://www.s.co/sites/default/files/default_profile_image.png";
          Contacts.insert({
            userId:Meteor.userId(),
            name: obj.firstName + ' ' + obj.lastName,
            pictureUrl: tempUrl,
            linkedin: obj,
            flagged: false
          });
        }
      });
  }
});