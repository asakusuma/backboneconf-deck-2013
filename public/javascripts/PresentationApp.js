define(['BaseApplication', 'BaseCollection', 'PresentationGlobalController', 'PresentationDataStore', 'PresentationRouter', 'TitleController', 'SlideController', 'EndController', 'TestController'], 
function(BaseApplication, BaseCollection, PresentationGlobalController, PresentationDataStore, PresentationRouter, TitleController, SlideController, EndController, TestController) {
	return BaseApplication.extend(function(base) {
    return {
      initialize: function() {
        
        _.bindAll(this, 'didRoute', 'run', 'goForward', 'goBackward');
        this.dataStore = new PresentationDataStore();
        this.appBus = _.extend(Backbone.Events);
        this.appBus.on('forward', this.goForward);
        this.appBus.on('backward', this.goBackward);

        this.currentRoute = null;
        this.currentSlide = 0;
        this.slidesCollection = new BaseCollection();

        this.slidesReady = this.dataStore.getSlides().then(_.bind(function(slides) {
          this.slidesCollection = slides;
        }, this));

        this.globalController = new PresentationGlobalController(this);

        this.controllers = {
          title: new TitleController({
            dataStore: this.dataStore,
            appBus: this.appBus
          }),
          slide: new SlideController({
            dataStore: this.dataStore,
            appBus: this.appBus
          }),
          test: new TestController({
            dataStore: this.dataStore,
            appBus: this.appBus
          }),
          end: new EndController({
            dataStore: this.dataStore,
            appBus: this.appBus
          })
        };
        this.activeController = null;

        this.runReady = P.defer();

        //Wait till both the slide data is loaded and app.run() is called
        P.all([
          this.runReady.promise,
          this.slidesReady
        ]).then(_.bind(this.goRun, this));
      },
      run: function(state) {
        this.runReady.resolve();
      },
      goRun: function() {
        if(APPGLOBALS.action) {
          this.didRoute(APPGLOBALS.action, APPGLOBALS.params);
        }
        this.setRouter(new PresentationRouter(this.didRoute));
      },
      //Show the next slide
      goForward: function() {
        if(this.currentSlide < this.slidesCollection.length) {
          this.currentSlide++;
          this.router.navigate('slide/' + this.currentSlide);
          this.didRoute('slide', [this.currentSlide], 'forward');
        } else {
          this.currentSlide = this.slidesCollection.length;
          this.router.navigate('end/');
            this.didRoute('end', [], 'forward');
        }
      },
      //Show the previous slide
      goBackward: function() {
        if(this.currentSlide > 1) {
          this.currentSlide--;
          this.router.navigate('slide/' + this.currentSlide);
          this.didRoute('slide', [this.currentSlide], 'backward');
        } else {
          this.currentSlide = 0;
          this.router.navigate('title/');
          this.didRoute('title', [], 'backward');
        }
      },
      //Load the page for a given route
      //Third parameter optionally delcares the page transition direction
      didRoute: function(route, params, direction) {
        if(params.length == 1) {
          this.currentSlide = parseInt(params[0]);
        } else if(route === 'start') {
          this.currentSlide = 0;
        } else if(route === 'end') {
          this.currentSlide = this.slidesCollection.length + 1;
        }
        if(this.controllers[route]) {
          this.oldController = this.activeController;
          this.activeController = this.controllers[route];

          //Only update DOM if needed
          if(route != this.currentRoute) {
            this.globalController.showPage(this.activeController.$outlet, direction);

            //Tell the old controller to clean up itself
            //Usually child view DOM event unbinding
            if(this.oldController && this.oldController.deactivate) {
              this.oldController.deactivate();
            }
          }

          //Activate the new controller
          //This usually consists of having the child views bind to DOM events
          if(this.activeController.activate) {
            this.activeController.activate(params);
          } 
          this.currentRoute = route;
        }
      }
    }
  });
});



var store = {

};