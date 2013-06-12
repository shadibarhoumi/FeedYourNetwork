Deps.autorun(function() {
    Meteor.subscribe('contactsAndNotifications');
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