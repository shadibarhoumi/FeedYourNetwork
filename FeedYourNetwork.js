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

}



















if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
