Template.imageShow.helpers({
    ownImage: function() {
        console.log(this);
        if (this.image) {
            return Meteor.userId() ? this.image.metadata.userId == Meteor.userId() : null;
        } else {
            return null
        }

    },
    hasMoreImages: function(){
        this.images.rewind();
        return Router.current().limit() == this.ids.fetch().length;
  }
});

Template.imageThumb.helpers({
    ownImage: function() {
        return Meteor.userId() ? this.metadata.userId == Meteor.userId() : null;
    }
});
