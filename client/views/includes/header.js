Session.setDefault("imagePlayerState", "PAUSED");

Template.header.rendered = function() {
    console.log('rendered');
    $(this.firstNode).find('[data-toggle="tooltip"]').tooltip() //initialize all tooltips in this template
};

Template.header.helpers({
  title: function() {
    return config.title;
  },
  isPlaying: function () {
    if (Session.equals("imagePlayerState", "PLAYING")) {
        return  "PLAYING";
    }
  }
});

Template.header.events({

   'click .playerButton': function (e) {
        if (Session.equals("imagePlayerState", "PLAYING")) {
            Session.set("imagePlayerState", "PAUSED");
             Meteor.clearTimeout(timeoutHandler);
        } else {
            Session.set("imagePlayerState", "PLAYING");
            var ids = Session.get("currentGallery");
            //var index = Session.get("currentGalleryIndex");
            next = $('.imageNav .next').attr('href');
            if (next) {
                Router.go('imageShow', {_id: next});
            } else {
                Router.go('imageShow', {_id: ids[0]});
            }
        }
        //console.log(e.target.parentNode);
        // $(e.target.parentNode).tooltip(); // reinicialize tooltip after click?
    }

});
