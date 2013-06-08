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
    }

  });


  Accounts.ui.config({
    requestPermissions: {
      facebook: ['email']
    },
    passwordSignupFields: 'USERNAME_AND_EMAIL'
  }); 
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    // first, remove configuration entry in case service is already configured
   });
}
