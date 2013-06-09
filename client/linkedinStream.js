var updates = 'positions,skills,educations,headline,expertise';

Template.linkedinStream.events({
  'click button.linkedinStream' : function(event, template) {
    // var string = template.data.name;
    IN.API.MemberUpdates(template.data.linkedin.id)
       // .fields(["isLiked","updateContent:(person:(headline,first-name))"])
       //share SHAR, viral (comments, likes) VIRL, profile change PRFU, job posting JOBS, 
       //for now, we will only handle SHAR and PRFU
       .params({"type":["SHAR","PRFU"]})
       // .fields(['updateType', 'updateContent:(person)', 'updatedFields','timestamp'])
       .result(function(data) {
        console.log(data.values);
        var updates = [];
        if (data.values) {
          for (var i = 0; i < data.values.length; i++) {
          var string = template.data.name;

            var obj = data.values[i];
            var type = obj.updateType;
            var content = obj.updateContent.person;
            var url = content.siteStandardProfileRequest.url;
            var timestamp = obj.timestamp;
            //note: docs refer to "PRFU", but response only has "PROF"
            if (type === 'PROF') {
              var nextString = handleProfileUpdate(content, obj.updatedFields.values);
              if (!nextString) {
                continue;
              }
              string += nextString;
            }

            // SHAR
            else {
              var share = content.currentShare;
              var comment = share.comment;
              var shareContent = share.content;
              if (shareContent) {
                //we know that he is commenting on a story
                var story = shareContent.description;
                string += ' commented: "' + comment + '" on ' + story;
              }
              else {
                string += "'s status: " + comment; 
              }
            }
            updates.push({update:string, time:timestamp, relative: new Date(timestamp).relative()});
          } //end for
          console.log(updates);
        } //end if
       });
  }
});
//industry in profile 
var whitelist = {
  positions: 'position',
  skills: 'skill',
  educations: 'education',
  expertise: 'expertise',
  headline: 'headline'
};

var blacklist = {
  apiStandardProfileRequest:true,
  firstName:true,
  id:true,
  lastName:true,
  pictureUrl:true,
  siteStandardProfileRequest:true,
  headline:true
};

var fieldsBlacklist = {
  honorsawards:true,
  volunteerexperiences:true,
  positions: true //this is because a standalone position change gives us little data
};

var removePersonPrefix = function (string) {
  return string.replace('person/','');
};

var handleProfileUpdate = function(content, updatedFields) {
  var string = '';
  console.log(content);
  console.log(updatedFields);
  for (var i = 0; i < updatedFields.length; i++) {
    var name = removePersonPrefix(updatedFields[i].name);
    if (!content[name]) {
      if (fieldsBlacklist[name]) {
        return;
      }
      string += ' has changed ' + name;
      return string;
    }
  }

  for (var prop in content) {
    if (content.hasOwnProperty(prop)) {
      if (blacklist[prop]) {
        continue;
      }
      var updates = content[prop].values;
      var digger = whitelist[prop];
      var array = [];
      for (var i = 0; i < updates.length; i++) {
        var item = updates[i];
        if (digger === 'position') {
          return handlePosition(item);

        }
        array.push(item[digger].name);
      }
      string += ' added to '+prop + ': ';
      string += array.join(', ');
    }
  }
  return string;
};

var handlePosition = function(item) {
  return ' has a new position as ' + item.title + ' at ' + item.company.name;
};

//profile update needs to handle multiple stories (currently picks the first found)
//if we want to notify of updated headlines, headline appears in both updatedFields andd it always appears in normal content (we have blacklisted it!)