Meteor.methods({
    'serveRss': function () {
      var RSS = Meteor.npmRequire('rss');
      var host = stripTrailingSlash(Meteor.absoluteUrl());
      //console.log(host);
      var feed = new RSS({
          title: i18n('site.title'),
          description: i18n('site.description'),
          feed_url: host + '/feed',
          site_url: host,
          image_url: host + '/favicon.png',
          copyright: '2014 Kevin Brown',
          language: 'en',
          categories: ['photography', 'art', 'travel'],
          pubDate: new Date,
    });

    var images = Images.find({}, {limit: 20, sort: {uploadedAt: -1}});
    _.each(images.fetch(), function (image) {
        var title = image.metadata.title ? image.metadata.title : image.original.name;
        var url = host + image.url({store: 'images'});
        var date = image.original.updatedAt;
        var tags = image.metadata.tags;
        var tagString = _.map(tags, function(tag) {
            return "<a href=\""+host+"/gallery/"+tag+"\">#"+tag+"</a>";

        });
        console.log(tagString);
        var desc = image.metadata.description ? image.metadata.description : tagString;

        feed.item({
            title:  title,
            description: desc,
            url: host+ "/gallery/" +image._id, // link to the item
            guid: image._id,
            categories: tags,
            author: 'Kevin Brown',
            date: date,
            //lat: 33.417974, // maybe use later
            //long: -111.933231, //optional longitude field for GeoRSS
            enclosure: {url: url} // optional enclosure
        });

    });
    //console.log(feed.xml());
    return feed.xml();
    }
});
