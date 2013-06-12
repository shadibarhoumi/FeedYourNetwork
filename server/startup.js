Meteor.startup(function () {
  Contacts.update({},{$set:{interval:null}}, {multi:true});
  Contacts.update({},{$set:{nextContact:null}}, {multi:true});
  // Contacts.remove();
  // Notifications.remove();
});
