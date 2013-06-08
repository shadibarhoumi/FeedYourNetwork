if (Meteor.isClient) {

  // contacts
  Template.contacts.contact = function() {
    return Contacts.find({}).fetch();
  };

  Template.contacts.events({
   'click .input-submit': function(e) {
      var name = $('.input-name').val();
      var email = $('.input-email').val();
      Contacts.insert({
        name: name,
        email: email
      });
    }, 
    'click .name, click .avatar': function(e) {
      var contactId = $(e.target).closest('li').attr('id');
      var contact = Contacts.findOne(contactId);
      var flag = contact.flagged ? false : true;
      Contacts.update(contactId, {$set: {flagged: flag}});
      contact = Contacts.findOne(contactId);
      if (contact.flagged) {
        Notifications.insert({
          message: "You have flagged " + contact.name
        });
      } else {
        Notifications.insert({
          message: "You have unflagged " + contact.name
        });
      }
    }
  });


  // notifications
  Template.notifications.notification = function() {
    return Notifications.find({}).fetch();
  };

}



















if (Meteor.isServer) {
  Meteor.startup(function () {

    // code to run on server at startup
  });
}
