ownsImage = function(userId, image) {
  return image && image.metadata.userId === userId;
}
