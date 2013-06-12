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

// Publish is not reactive. We must use .observe to register various callbacks
// so that when the db changes on the server, those changes are published to the client.
Meteor.publish('contacts', function() {
  var self = this;
  //added, changed, and removed are mongo cursor-specific callbacks (look at docs)
  //self.added,changed, and removed at publish-specific callbacks (look at docs)
  var query = Contacts.find({userId: this.userId}).observe({
    added: function (doc) {
      self.added('contacts', doc._id, doc);
    },
    changed: function(newDoc, oldDoc) {
      self.changed('contacts',oldDoc._id, newDoc);
    },
    removed: function (oldDoc) {
      self.removed('contacts',oldDoc._id);
    }
  });

  // .observe only returns after the initial added callbacks have run (initial results of find)
  // Call ready() when the initial snapshot of the db has finished (so they're sent in one batch)
  self.ready();

  // make sure to turn off observe when client unsubscribes
  self.onStop(function () {
    query.stop();
  });
});

Meteor.publish('notifications', function() {
  var self = this;
  var query = Notifications.find({userId: this.userId}).observe({
    added: function (doc) {
      self.added('notifications', doc._id, doc);
    },
    changed: function(newDoc, oldDoc) {
      self.changed('notifications',oldDoc._id, newDoc);
    },
    removed: function (oldDoc) {
      self.removed('notifications',oldDoc._id);
    }
  });
  self.ready();
  self.onStop(function () {
    query.stop();
  });
});