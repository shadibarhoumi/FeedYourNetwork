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

Meteor.publish('contacts', function (contactIds) {
  return Contacts.find({_id:{$in:contactIds}, userId:this.userId});
});

Meteor.publish('notifications', function (notifIds) {
  return Notifications.find({_id:{$in:notifIds}, userId:this.userId});
});