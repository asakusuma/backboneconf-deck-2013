/**
 * Base Application module
 * @module LIBaseApplication
 * @requires Fiber
 * @requires Backbone
 * @augments Backbone.Events
 */
define('BaseApplication', function() {
  return Fiber.extend(function () {
    return _.extend(Backbone.Events, {
      /**
       * @constructs LIBaseApplication
       * @param {Object} $outlet A jQuery element representing the
       * DOM scope of the application.
       */
      init: function ($outlet) {
        this.$outlet = $outlet;
        if(this.initialize) {
          this.initialize.apply(this, arguments);
        }
      },

      /**
       * @memberof LIBaseApplication
       * @instance
       * @function setRouter
       * @param {Object} router An LI Backbone router
       */
      setRouter: function(router) {
        this.router = router;
      },

      /**
       * @memberof LIBaseApplication
       * @instance
       * @function setRouter
       * @param {Object} router An LI Backbone router
       */
      setRouter: function(router) {
        this.router = router;
      }
    });
  });
});