Meteor.startup(function () {
  Contacts.allow({
    insert: function(userId, doc) {
      return userId === doc.userId;
    },
    update: function(userId, doc) {
      return userId === doc.userId;
    },
    remove: function(userId,doc) {
      return userId === doc.userId;
    }
  });

  Notifications.allow({
    insert: function(userId, doc) {
      return userId === doc.userId;
    },
    remove: function(userId, doc) {
      return userId === doc.userId;
    },
    update: function(userId, doc) {
      return userId === doc.userId;
    }
  });
});