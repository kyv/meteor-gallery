var imageStore = new FS.Store.S3("images", {
            //region: "us-east-1",
            bucket: "galery-mimi", //required
            ACL: 'public-read',
            transformWrite: transformMaxSizeFunction, //optional
            maxTries: 1 //optional, default 5
        });

var thumbStore = new FS.Store.S3("thumbs", {
            //region: "us-east-1",
            bucket: "galery-mimi", //required
            folder: "/thumbs",
            ACL: 'public-read',
            transformWrite: transformThumbNailFunction, //optional
            maxTries: 1 //optional, default 5
        });

Images = new FS.Collection("images", {
    stores: [
        thumbStore,
        imageStore
    ],
    filter: {
      allow: {
        contentTypes: ['image/*'] //allow only images in this FS.Collection
      }
    }
});

Images.allow({
  download: function () {
    return true;
  },
  insert: function(userId, image) {
    return !! userId;
  },
  update: ownsImage,
  remove: ownsImage
});

