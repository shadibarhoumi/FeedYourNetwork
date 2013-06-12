Meteor.startup(function() {
    Deps.autorun(function() {
        var contacts = Contacts.find({userId: Meteor.userId()}).fetch();
        var contactIds = _.pluck(contacts,'_id');
        Meteor.subscribe('contacts',contactIds);

        var notifications = Notifications.find({userId:Meteor.userId()}).fetch();
        var notifIds = _.pluck(notifications,'_id');
        Meteor.subscribe('notifications',notifIds);
    });
});

window.onLinkedInAuth = function() {
  Session.set('linkedinAuth', true);
};

Accounts.ui.config({
  requestPermissions: {
    facebook: ['email']
  },
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});