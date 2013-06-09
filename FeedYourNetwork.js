/////////////////////////////////////////////////////// CLIENT /////////////////////////////////////////////////////

if (Meteor.isClient) {

  window.onLinkedInAuth = function() {
    Session.set('linkedinAuth', true);
  };

  Template.login.isLinkedinAuth = function() {
    return Session.get('linkedinAuth');
  };

  Template.login.events({
    'click .loadContacts' : function(event) {
      //define call back to be run once facebook is ready
      var callback = function(fbFriendsList) {
        // debugger;
        for (var i = 0; i < fbFriendsList.length; i++) {
          var obj = fbFriendsList[i];
          Contacts.insert({
            userId: Meteor.userId(),
            name: obj.name,
            pictureUrl: fbApi.getFriendProfilePics(obj.id),
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
          for (var i = 0; i < list.length; i++) {
            var obj = list[i];
            var tempUrl = obj.pictureUrl ? obj.pictureUrl : "http://www.s.co/sites/default/files/default_profile_image.png";
            Contacts.insert({
              userId:Meteor.userId(),
              name: obj.firstName + ' ' + obj.lastName,
              pictureUrl: tempUrl,
              linkedin: obj,
              flagged: false
            });
          }
        });
    }
  });

  Template.contactList.contacts = function() {
    return Contacts.find({userId: Meteor.userId(), name: {$regex: Session.get('query'), $options: 'i' }}, {sort: ["name", "asc"]});
  };

  // CONTACTS
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
    }
  });

  Template.eachContact.events({
    'click .submit-interval': function(e) {
      var contactId = $(e.target).closest('li').attr('id');
      // turn interval into future date: append 'later' to get a date x days/weeks in the future
      var intervalText = $(e.target).prev('.interval').val();
      // interval is a number of milliseconds
      var interval = Date.create(intervalText + ' later').getTime() - Date.create('now').getTime();
      // nextContact is next date you should talk to contact
      var nextContact = Date.create(Date.create('now').getTime() + interval).getTime();

      Contacts.update(contactId, {$set: {interval: interval, nextContact: nextContact}});

      var contact = Contacts.findOne(contactId);

      Notifications.insert({
          userId: Meteor.userId(),
          name: contact.name,
          contactId: contact._id,
          nextContact: contact.nextContact,
          nextContactString: Date.create(nextContact).relative().replace(' from now', ''),
          message: "Talk to " + contact.name + " in " + Date.create(contact.nextContact).relative().replace(' from now', '')
        });
    }
  });

  // notifications
  Template.notifications.upcoming = function() {
    var notifications =  Notifications.find({userId: Meteor.userId()}, {sort: ["nextContact", "asc"]}).fetch();
    var groups = []
    var currentTimeString = null;

    for (var i = 0; i < notifications.length; i++) {
      if (currentTimeString !== notifications[i].nextContactString) {
        var group = [notifications[i]];
        groups.push(group);
        currentTimeString = notifications[i].nextContactString;
      } else {
        group.push(notifications[i]);
      }
    }

    return groups[0];
  };

  Template.notifications.future = function() {
    var notifications =  Notifications.find({userId: Meteor.userId()}, {sort: ["nextContact", "asc"]}).fetch();
    var groups = []
    var currentTimeString = null;

    for (var i = 0; i < notifications.length; i++) {
      if (currentTimeString !== notifications[i].nextContactString) {
        var group = [notifications[i]];
        groups.push(group);
        currentTimeString = notifications[i].nextContactString;
      } else {
        group.push(notifications[i]);
      }
    }

    var squished = [];

    for (var i = 1; i < groups.length; i++) {
      var names = "";
      var nextContact = groups[i][0].nextContact;
      for (var j = 0; j < groups[i].length; j++) {
        var prefix = "";
        if (j > 0 && j == groups[i].length-1) {
          prefix = (groups[i].length == 2) ? " and " : ", and ";
        } else if (j > 0) {
          prefix = ", "
        }
        names += prefix + "<a id=" + "'" + groups[i][j].contactId + "'" + "class='contact-link' href='#'>" + groups[i][j].name + '</a>';
      }
        squished.push({names: names, nextContact: nextContact});
    }

    return squished;
  };

  Template.notifications.events({
    'click .contact-link': function(e) {
      alert($(e.target).attr('id'));
    }
  });

  Accounts.ui.config({
    requestPermissions: {
      facebook: ['email']
    },
    passwordSignupFields: 'USERNAME_AND_EMAIL'
  }); 

}
