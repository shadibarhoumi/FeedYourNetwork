if (Meteor.isClient) {

  // contacts
  Template.contacts.contacts = function() {
    return Contacts.find({userId:Meteor.userId()},{fields: {'linkedinConnections':1}}).linkedinConnections;
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
    },
    'click .loadContacts' : function(event) {
      IN.API.Connections("me")
      .result(function(data) {
        var list = data.values;
        if (Contacts.findOne({userId:Meteor.userId()}) === undefined) {
          Contacts.insert({userId:Meteor.userId(), linkedin:list});
        }
        else {
          Meteor.call('updateLinkedin',list);
        }
      });
    } 
  });

  // notifications
  Template.notifications.notification = function() {
    return Notifications.find({}).fetch();
  };
}



















if (Meteor.isServer) {
  Meteor.startup(function () {

    Meteor.methods({
      'updateLinkedin' : function(updatedLinkedinList) {
        Contacts.update({userId:this.userId}, {$set: {linkedin:updatedLinkedinList}});
      }
    });

    Contacts.allow({
      insert: function(userId, doc) {
        debugger;
        console.log(userId);
        console.log(doc.userId);
        return userId === doc.userId;
      },
      update: function(userId, doc) {
                console.log(userId);
        console.log(doc.userId);
        return userId === doc.userId;
      }
    });
  });
}
