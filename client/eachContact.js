function blink(){
  //do something.
}

var showPopup = function showPopup($location){
    $($location).find('.popup').addClass('show');
}

var hidePopup = function hidePopup($location, $grabme, $li){
    $($location).find('.popup').removeClass('show');
    
    if($grabme = 'true'){
      $frequencySlug = $($li).attr("data-frequency-slug");
      $($location).find('.number').html($frequencySlug);
      blink();
    }
}


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
    console.log(contact);
    if (contact.linkedin) {
        Notifications.insert({
          userId: Meteor.userId(),
          name: contact.name,
          contactId: contact._id,
          contact: contact,
          streams:[],
          nextContact: contact.nextContact,
          nextContactString: Date.create(nextContact).relative().replace(' from now', ''),
          message: "Talk to " + contact.name + " in " + Date.create(contact.nextContact).relative().replace(' from now', '')
        }, function(err,_id) {
          var callback = function(list) {
            console.log('li done');
            list = list || [];
            Notifications.update(_id,{$set:{streams:list}});
          };
          linkedinUpdates(contact, callback);
        });
      }
    else {
        Notifications.insert({
          userId: Meteor.userId(),
          name: contact.name,
          contactId: contact._id,
          contact: contact,
          streams:[],
          nextContact: contact.nextContact,
          nextContactString: Date.create(nextContact).relative().replace(' from now', ''),
          message: "Talk to " + contact.name + " in " + Date.create(contact.nextContact).relative().replace(' from now', '')
        });
    }
  },
  'click a.active-handle' : function(e) {
    var $contactLi = $(e.target).closest('.contact');
    // Session.set('currentPanelStream',[]);
    // Session.set('currentPanelStreamActive',[]);
  if ($contactLi.hasClass('active')) {
    $contactLi.removeClass('out').delay(100).queue(function(next){
           $(this).removeClass('active');;
           next();
      });
    $($contactLi).find('.number').html('&nbsp;');
    hidePopup($contactLi);
  } else {
    $contactLi.addClass('active');
    showPopup($contactLi);
    
      $($contactLi).find('.popup').click(function(e) {
         
         if($(e.target).is('li')){
           hidePopup($contactLi, 'true', $(e.target));
           $contactLi.addClass('out');

         } else {
           hidePopup($contactLi);
           $contactLi.removeClass('active').removeClass('out');
         }
      }); 
      
      
  }
  return false;
  },
  'click div.number': function(e) { 
    var $contactLi = $(e.target).closest('.contact'); 
    showPopup($contactLi); 
    
    $($contactLi).find('.popup').click(function(e) {
       if($(e.target).is('li')){
         hidePopup($contactLi, 'true', $(e.target));
       } else {
         hidePopup($contactLi);
       }
    });   
  },
  'click .profile-link' : function(e,template) {
    Session.set('currentPanelData',template.data);
    notificationsOut();
    $('#contact').delay(200).queue(function(next){
        $(this).addClass('open');
        next();
    });
    $('#contact').find('.card-wrap').click(function() {
      $('#notifications').removeClass('out');
      
      $('#contact').removeClass('open');
      // Session.set('currentPanelStream',[]);
      // Session.set('currentPanelStreamActive',[]);


    });
  }
});