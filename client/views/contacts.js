Template.contactList.contacts = function() {
  return Contacts.find({userId: Meteor.userId(), name: {$regex: Session.get('query'), $options: 'i' }}, {sort: ["name", "asc"], limit: 30});
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
  'click .name h2, click .avatar': function(e) {
    var contactId = $(e.target).closest('li').attr('id');
    var contact = Contacts.findOne(contactId);
    var flag = contact.flagged ? false : true;
    Contacts.update(contactId, {$set: {flagged: flag}});
  }
});
