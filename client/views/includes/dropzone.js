Template.dropZone.events({
// Catch the dropped event
'dropped #dropzone': function(event, temp) {
    event.preventDefault();
    //console.log('files dropped');
    FS.Utility.eachFile(event, function(file) {
        var modFile = new FS.File(file);
        modFile.metadata = { userId: Meteor.userId() }

      Images.insert(modFile, function (err, fileObj) {
        //If !err, we have inserted new doc with ID fileObj._id, and
        //kicked off the data upload using HTTP
      });
    });
  }
});
