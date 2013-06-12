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


var linkedInCallback = function(list) {
  if (list) {
    Session.set('currentPanelStream',list);
  }
  else {
    Session.set('currentPanelStream',[]);
  }
};
Template.panel.data = function() {
  var data = Session.get('currentPanelData');
  console.log(data);
  if (data && data.linkedin) {
    linkedinUpdates(data, linkedInCallback);
  }
  return data;
};

Template.panel.streams = function() {
  return Session.get('currentPanelStream') || [];
};