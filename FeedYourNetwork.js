if (Meteor.isClient) {

  Template.contacts.contact = function() {
    return Contacts.find({}).fetch();
  };

  Template.contacts.events({
    'click .submit': function(e) {
      var name = $('.name').val();
      var email = $('.email').val();
      Contacts.insert({
        name: name,
        email: email
      });
    },
    'click .loadContacts' : function(event) {
      IN.API.Connections("me")
      .result(function(data) {
        var list = data.values;
        Meteor.users.update({_id:Meteor.userId()}, {$set : {profile: {linkedinConnections: list}}});
      });
    } 
  });

}



















if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}
