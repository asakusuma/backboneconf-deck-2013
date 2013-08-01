define(['BaseController', 'SlideView'], 
function(BaseController, SlideView) {
	return BaseController.extend(function(base) {
    return {
      initialize: function() {
        this.active = true;
        this.currentSlide = 0;
        _.bindAll(this, 'activate', 'deactivate');
        this.view = new SlideView({
          el: this.$outlet
          //TODO: SILENT, NO EVENT BINDING
        });
        this.view.on('clicked', _.bind(function() {
          //Don't use click to forward for now
          //this.appBus.trigger('forward');
        }, this));
      },
      activate: function(params) {
        var id = params[0];
        //console.log(this.currentSlide + ' = ' + id);
        if(!this.active) {
          //we weren't previously active
          if(this.view.bindEvents) {
            this.view.bindEvents();
          }
          this.active = true;
        } else if(this.currentSlide != id) {
          //we were already active, we just chaged slide
          this.dataStore.getSlides().then(_.bind((function(id) {
            return function(collection) {
              this.loadSlides(collection);
              this.showSlide(id);
            }
          })(id), this));
        }
        this.currentSlide = id;
      },
      deactivate: function() {
        this.active = false;
        this.view.cleanup();
      },
      loadSlides: function(collection) {
        this.view.render(collection.toJSON());
      },
      showSlide: function(id) {
        this.view.showSlide(id);
      }
    }
  });
});