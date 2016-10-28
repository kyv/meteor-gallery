Template.tags.tags = function() {
    var tags = this.metadata.tags;
    tags = _.map(tags, function(tag, key){
      console.log(tags, key);
        return "<li><a href=\"/tags/"+ _.escape(tag) +"\">"+ tag +"</a></li>";
        });

    return  new Handlebars.SafeString(tags.join(', '));

};
