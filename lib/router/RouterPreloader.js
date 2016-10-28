// interface to use with the IronRouter waitOn method
// credit: http://stackoverflow.com/questions/20968383/meteor-iron-router-with-custom-waiton

Waiter=function(){
    // avoid firing the waiter multiple time in a Deps.Computation context
    this.isFired=false;
    // reactive data source : have we been waiting long enough ?
    this.isReady=false;
    this.dependency=new Deps.Dependency();
};

_.extend(Waiter.prototype,{
    // reset method, clear the waiter state
    reset:function(){
        this.isFired=false;
        //
        this.isReady=false;
        this.dependency.changed();
    },
    // reactive ready method : this is the interface needed by waitOn
    ready:function(){
        this.dependency.depend();
        return this.isReady;
    },
    // fire the Waiter object only once before being resetted
    fire:function(params){
        if(!this.isFired){
            this.isFired=true;
            // this abstract method must be overloaded in child classes
            this.wait(params);
        }
    },
    // must be called in Waiter.wait() to acknowledge we're done waiting
    waitedEnough:function(){
        // if we have reset the Waiter meanwhile, silently discard the notification
        if(this.isFired){
            this.isReady=true;
            this.dependency.changed();
        }
    }
});

// Waiter that simply waits N seconds before getting ready
TimeoutWaiter=function(){
    Waiter.call(this);
};
TimeoutWaiter.prototype=Object.create(Waiter.prototype);

_.extend(TimeoutWaiter.prototype,{
    wait:function(params){
        var self=this;
        // after N seconds, notify that we are done waiting
        Meteor.setTimeout(function(){
            self.waitedEnough();
        },params.seconds*1000);
    }
});

// Image preloader for the IronRouter
ImagePreloadingWaiter=function(){
    Waiter.call(this);
};
ImagePreloadingWaiter.prototype=Object.create(Waiter.prototype);

_.extend(ImagePreloadingWaiter.prototype,{
    wait:function(params){
        var self=this;
        //
        var images = params.images;
        //console.log(params);
        if(images.length>0){
            var imageLoadedCounter=0;
            _.each(images,function(imageUrl){
                function onImageLoadOrError(){
                    imageLoadedCounter++;
                    if(imageLoadedCounter==images.length){
                        self.waitedEnough();
                    }
                }
                //
                var image=$("<img/>");
                image.load(onImageLoadOrError);
                image.error(onImageLoadOrError);
                image.prop("src",imageUrl);
            });
        }
        else{
            self.waitedEnough();
        }
    }
});
