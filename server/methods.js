Meteor.methods({
    'updateLinkedin' : function(updatedLinkedinList) {
      Contacts.update({userId:this.userId}, {$set: {linkedin:updatedLinkedinList}});
    }
});