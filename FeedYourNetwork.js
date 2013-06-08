if (Meteor.isClient) {

  // contacts
  Template.contacts.contact = function() {
    return Contacts.find({userId: Meteor.userId()}).fetch();
  };

  Template.contacts.events({
   'click .input-submit': function(e) {
      var name = $('.input-name').val();
      var email = $('.input-email').val();
      Contacts.insert({
        name: name,
        email: email,
        userId: Meteor.userId()
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
          message: "You have flagged " + contact.name,
          userId: Meteor.userId()
        });
      } else {
        Notifications.insert({
          message: "You have unflagged " + contact.name,
          userId: Meteor.userId()
        });
      }
    }
  });

  // notifications
  Template.notifications.notification = function() {
    return Notifications.find({userId: Meteor.userId()}).fetch();
  };

}



















if (Meteor.isServer) {
  Meteor.startup(function () {

    // code to run on server at startup
  });
}
