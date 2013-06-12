Meteor.startup(function() {
  Deps.autorun(function() {
      Meteor.subscribe('contacts');
      Meteor.subscribe('notifications');
  });
});

Accounts.ui.config({
  requestPermissions: {
    facebook: ['email']
  },
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});