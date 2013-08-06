/**
 * Base controller module
 * @module LIBaseController
 * @requires Fiber
 * @requires Backbone
 * @augments Backbone.Events
 */
define('BaseController', function() {
  return Fiber.extend(function () {
    return _.extend(Backbone.Events, {
      /**
       * @constructs LIBaseController
       * @param {Object} $outlet DOM scope of the controller.
       */
      init: function (options) {
        this.views = [];
        this.viewHash = {};
        if(options) {
          if(options.$outlet) {
            this.$outlet = options.$outlet;
          } else {
            this.$outlet = $('<div class=\'controller-outlet\'></div>')
          }
          if(options.dataStore) {
            this.dataStore = options.dataStore;
          }
          if(options.appBus) {
            this.appBus = options.appBus;
          }
        }
        if(this.initialize) {
          this.initialize.apply(this, arguments);
        }
      },

      /**
       * @memberof LIBaseController
       * @instance
       * @function addView
       * @param {Object} view LI Backbone view instance
       */
      addView: function(view, key) {
        if(view) {
          this.views.push(view);
          if(key) {
            this.viewHash[key] = view;
          }
          if(this.$outlet) {
            this.$outlet.append(view.$el);
          }
        }
      },

      /**
       * @memberof LIBaseController
       * @instance
       * @function getView
       * @param {Object} key The view key supplied in setView(). If no
       * key is supplied, returns the first view.
       */
      getView: function(key) {
        var view;
        if(this.views.length > 0) {
          view = this.viewHash[key];
          if(view) {
            return view;
          } else {
            return this.views[0];
          }
        }
        return view;
      }
    })
  });
});