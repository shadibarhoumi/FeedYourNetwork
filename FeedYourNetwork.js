if (Meteor.isClient) {

  // contacts
  Template.contacts.contacts = function() {
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
    //define call back to be run once facebook is ready
    var callback = function(fbFriendsList) {
      for (var i = 0; i < fbFriendsList.length; i++) {
        var obj = fbFriendsList[i];
        Contacts.insert({
          userId: Meteor.userId(),
          name: obj.name,
          facebook: obj,
          flagged: false
        });
      }
    };
    //pass the asynconous block
    fbApi.getFriendsList(callback);


    IN.API.Connections("me")
    .result(function(data) {
      var list = data.values;
      for (var j = 0; j < list.length; j++) {
        var ob2 = list[j];
        Contacts.insert({
          userId:Meteor.userId(),
          name: ob2.firstName + ' ' + ob2.lastName,
          pictureUrl: ob2.pictureUrl,
          linkedin: ob2,
          flagged: false
        });
      }
    });
    


  }
});

  // notifications
  Template.notifications.notification = function() {
    return Notifications.find({userId: Meteor.userId()}).fetch();
  };

  Accounts.ui.config({
    requestPermissions: {
      facebook: ['email']
    },
    passwordSignupFields: 'USERNAME_AND_EMAIL'
  }); 
}

if (Meteor.isServer) {
  Meteor.startup(function () {
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
}
