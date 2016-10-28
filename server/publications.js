Meteor.publish('images', function() {
  return Images.find({}, { limit: 20});
});

Meteor.publish('image', function(id) {
  check(id, String);
  return Images.find({_id: id});
});

Meteor.publish('tagged', function(tags) {
  check(tags, Array);
  return Images.find({"metadata.tags": tags}, {sort: {score: -1}, limit: 50});
});

Meteor.publish('taggedImages', function(tag){
  check(tag, String);
  console.log(tag);
  return Images.find({"metadata.tags": tag},{sort: {publishedAt: -1}})
});

Meteor.publish('tagsAll', function(){

  var tag_infos = [];
  var total_count = 0;

  Images.find({}).forEach(function (image) {
    _.each(image.metadata.tags, function (tag) {
      var tag_info = _.find(tag_infos, function (x) { return x.tag === tag; });
      if (! tag_info)
        tag_infos.push({tag: tag, count: 1});
      else
        tag_info.count++;
    });
    total_count++;
  });

  tag_infos = _.sortBy(tag_infos, function (x) { return x.tag; });
  tag_infos.unshift({tag: null, count: total_count});

  return tag_infos;

});
