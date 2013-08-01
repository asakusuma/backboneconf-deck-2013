/**
 * Base View module
 * @module LIView
 * @requires Fiber
 * @requires Backbone
 * @augments Backbone.View
 */
define('BaseView', function() {
  return Fiber.extend(function () {
    return _.extend(Backbone.View.prototype, {
      /**
       * @constructs LIView
       */
      init: function () {
        Backbone.View.prototype.constructor.apply(this, arguments);
      }
    })
  });
});