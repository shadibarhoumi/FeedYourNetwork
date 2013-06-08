if (Meteor.isClient) {

  // contacts
  Template.eachContact.contact = function() {
    return Contacts.find({userId: Meteor.userId(), name: {$regex: Session.get('query'), $options: 'i' }}).fetch();
  };

  Template.contacts.events({
   'click .add-contact .submit': function(e) {
      var name = $('.add-contact .name').val();
      var email = $('.add-contact .email').val();
      Contacts.insert({
        name: name,
        email: email,
        userId: Meteor.userId()
      });
    },
    'keyup .search-contact .search': function(e) {
      var query = $('.search-contact .search').val();
      Session.set('query', query);
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
    },
    'click .loadContacts' : function(event) {
      IN.API.Connections("me")
      .result(function(data) {
        var list = data.values;
        for (var i = 0; i < list.length; i++) {
          var obj = list[i];
          Contacts.insert({
            userId:Meteor.userId(),
            name: obj.firstName + ' ' + obj.lastName,
            pictureUrl: obj.pictureUrl,
            linkedin: obj,
            flagged: false
          });
        };
      });
    } 
  });

  // notifications
  Template.notifications.notification = function() {
    return Notifications.find({userId: Meteor.userId()}).fetch();
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
        return userId === doc.userId;
      },
      update: function(userId, doc) {
        return userId === doc.userId;
      }
    });
  });
}
