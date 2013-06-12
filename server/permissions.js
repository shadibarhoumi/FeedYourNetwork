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

Meteor.publish('contactsAndNotifications', function () {
  return [Contacts.find(this.userId), Notifications.find(this.userId)];
});