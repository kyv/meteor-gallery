var subs = new SubsManager();
timeoutHandler = null;

Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: '404',
  fastRender: true,
  waitOn: function () {
      return subs.subscribe('images');
  }
});

Router.map(function () {

  this.route('about', {
    onBeforeAction: function () {
        if (timeoutHandler) Meteor.clearTimeout(timoutHandler)
        Session.set("imagePlayerState", "PAUSED");
    }

  });

  this.route('home', {
    path: '/',
    controller: 'homeController'
  });

  this.route('gallery', {
    controller: 'imageGalleryController'
  });

  this.route('rss', {
    path: '/feed',
    where: 'server',
    //layoutTemplate: 'rss',
    action: function () {
        var res = this.response;
        Meteor.call('serveRss', function(error, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            //console.log(data);
            res.end(data);
        });
    }
  });

  this.route('tagsAll', {
    path: '/tags',
    template: 'tagCloud',
    waitOn: function () {
      return subs.subscribe('images');
    },
    onBeforeAction: function () {
        Meteor.clearTimeout(playerHandler)
    },
    data: function () {
        var tag_infos = [];
        var total_count = 0;

        Images.find({}).forEach(function (image) {
            var tags = image.metadata.tags
            if (tags) {
                _.each(tags, function (tag) {
                    if (tag) {
                      var tag_info = _.find(tag_infos, function (x) { return x.tag === tag; });

                      if (!tag_info)
                        tag_infos.push({tag: tag, count: 1});
                      else
                        tag_info.count++;
                    }
                });
                total_count++;
            }
        });

        tag_infos = _.sortBy(tag_infos, function (x) { return x.tag; });
        //tag_infos.unshift({tag: null, count: total_count});

        return {tags: tag_infos};
    }
  });

  this.route('tags', {
    path: '/tag/:tag',
    template: 'gallery',
    onBeforeAction: function () {
        Meteor.clearTimeout(playerHandler)
    },
    data: function () {
        console.log(this.params.tag);
        var images = Images.find({});
        console.log(images.fetch());
        return { images: images }
    }
  });

  this.route('imageShow', {
    path: '/gallery/:_id',
    controller: 'imageShowController'

  });

  this.route('imageEdit', {
    path: '/gallery/:_id/edit',
    onBeforeAction: function () {
        Meteor.clearTimeout(playerHandler)
    },
    template: 'imageEdit',
    data: function () {
        return {image: Images.findOne({_id: this.params._id})};
    },
  });

  this.route('imageSubmit', {
    path: '/submit'
  });

});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render('loading')
    else
      this.render('404');
    this.pause();
  }
}

Router.onBeforeAction(requireLogin, {only: ['imageSubmit', 'imageEdit']});
