/**
 * Base View module
 * @module LIBaseView
 * @requires Fiber
 * @requires Backbone
 * @augments Backbone.View
 */
define('BaseView', function() {
  return Fiber.extend(function () {
    return _.extend(Backbone.View.prototype, {
      /**
       * @constructs LIBaseView
       */
      init: function () {
        Backbone.View.prototype.constructor.apply(this, arguments);
      }
    })
  });
});