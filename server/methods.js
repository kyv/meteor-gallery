Meteor.methods({
  'imagesByTag': function (tag) {
    check(tag, String);
    var images = Meteor.call( Images.find({tags: tag}) );
    if (!images)
      throw new Meteor.Error(404, "Can't find my pants");
    return images;
  },

    'language': function() {
      return headers.get(this, 'accept-language').split(',')[0];
  }
});
