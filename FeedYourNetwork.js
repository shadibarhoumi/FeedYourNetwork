if (Meteor.isClient) {

  Template.contacts.contact = function() {
    return Contacts.find({}).fetch();
  };

  Template.contacts.events({
   'click .submit': function(e) {
    var name = $('.name').val();
    var email = $('.email').val();
    if ($('.name').val() !== "" && $('.email').val() !== "") {
      Contacts.insert({
        name: name,
        email: email
      });
    } else if ($('.name').val() === "" || $('.email').val() === "") {
      console.log('incomplete input text!');
    } 
  }
});

}



















if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
