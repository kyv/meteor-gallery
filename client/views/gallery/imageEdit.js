Template.imageEdit.helpers({
  post: function() {
    return Posts.findOne(Session.get('currentPostId'));
  }
});

Template.imageEdit.rendered = function() {
   // $('[data-role="tags"]').tagsinput('items');
};

Template.imageEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = this._id;
    //console.log(e);

    var tags = $(e.target).find('[name=tags]').val().split(',');
    // cleanup trim and lowercase tags
    tags = tags.map( function (tag){
       return $.trim(tag).toLowerCase();
    });
    var metadata = this.metadata;
    metadata.tags = _.compact(_.union(tags, metadata.tags));
    metadata.title = $(e.target).find('[name=title]').val().trim();

//    console.log(metadata);
    Images.update(currentPostId, {$set: { metadata: metadata, }}, function(error) {
      if (error) {
        alert(error.reason);
      } else {
        Router.go('imageShow', {_id: currentPostId});
      }
    });
  }

});

// show tags for item
Template.imageEdit.tagsString = function () {
    console.log(this.metadata.tags);
  return this.metadata.tags ? this.metadata.tags.join(', ') : null;
};

