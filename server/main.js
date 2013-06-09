Meteor.startup(function () {

  Meteor.methods({
    'updateLinkedin' : function(updatedLinkedinList) {
      Contacts.update({userId:this.userId}, {$set: {linkedin:updatedLinkedinList}});
    }
  });
  Contacts.remove({});

  Contacts.allow({
    insert: function(userId, doc) {
      return userId === doc.userId;
    },
    update: function(userId, doc) {
      return userId === doc.userId;
    }
  });
});
