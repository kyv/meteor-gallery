homeController = RouteController.extend({
  data: function() {
    var images = Images.find({"metadata.tags": "feature"},{fields: {_id: 1}, limit: 20});
    return {images: images.fetch()}
  },
  action: function() {
    var images = this.data().images;
    var selected = Random.choice(images);
    Router.go('imageShow', {_id: selected._id});
  }
});

imageController = RouteController.extend({

    imagePreloadingWaiter:new ImagePreloadingWaiter(),
    // load is called only once each time the route is triggered
    onRun:function(){
        // reset our waiter
        this.imagePreloadingWaiter.reset();
    },
    // we specify that we want to wait on our ImagePreloadingWaiter handle
    waitOn:function(){
        return this.imagePreloadingWaiter;
    }

});

imageGalleryController = imageController.extend({
  template: 'gallery',
  onBeforeAction:function(){

      Meteor.clearTimeout(timeoutHandler);
      var urls = _.map(this.data().images.fetch(), function (image) {
        //console.log(image);
        return image.url({store: 'thumbs'})
      });
      // setup collection subscription
      var subscriptionHandle=this.subscribe("images");
      if(subscriptionHandle.ready()){
          // get the route data context
          var collection=this.data();
          // collect the images URLs we want to preload
          var params={
              images:
                  urls
          };
          // fire the preloader
          this.imagePreloadingWaiter.fire(params);
      }
  },
  data:function(){
      return {images: Images.find()};
  }
});

imageShowController = imageController.extend({
  template: 'imageShow',
  // before : reactive computation that will be rerun until the route template is rendered
  onBeforeAction:function(){
      console.log("imageShow");
      //clearPlayerTimeout();
      var url = this.data().image.url({store: 'images'});
      // setup collection subscription
      var subscriptionHandle=this.subscribe("image",this.params._id);
      if(subscriptionHandle.ready()){
          // get the route data context
          var collection=this.data();
          // collect the images URLs we want to preload
          var params={
              images:[
                  url
              ]
          };
          // fire the preloader
          this.imagePreloadingWaiter.fire(params);
      }

  },
  // return the data context used by this route
  data:function(){
      var images = Images.find({}).fetch();
      var ids = _.pluck(images, '_id');
      var index = _.indexOf(ids, this.params._id);
      Session.set("currentGallery", ids);
      Session.set("currentGalleryIndex", index);
      return {
          ids: ids,
          image: images[index],
          next: images[index+1],
          prev: images[index-1]
          };
  },
  onAfterAction: function () {
    //Session.set("imagePlayerState", "STOP")

    var next = this.data().next;
    var prev = this.data().prev;
    var images = this.data().ids;
    _.each([next, prev], function(image){
      // preload next and previous images
      if (image) {
        var el=$("<img/>");
        el.prop("src", image.url({store: "images"}));
      }

    });

    if (Session.equals("imagePlayerState", "PLAYING")) {
      if (next) {
          timeoutHandler = Meteor.setTimeout(function(){
              Router.go('imageShow', {_id: next._id});
          },
          10000);
          Session.set('timeoutHandler', timeoutHandler);
      } else {
        timeoutHandler = Meteor.setTimeout(function(){
            Router.go('imageShow', {_id: images[0]});
          },
          10000);
          Session.set('timeoutHandler', timeoutHandler);
      }
    } else {
        if (timeoutHandler) Meteor.clearTimeout(timeoutHandler);
    }


  },

});


