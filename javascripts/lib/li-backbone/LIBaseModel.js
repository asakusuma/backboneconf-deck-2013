/**
 * Base Model module
 * @module LIBaseModel
 * @requires Fiber
 * @requires Backbone
 * @augments Backbone.Model
 */
define('BaseModel', function() {
	return Fiber.extend(function () {
    return _.extend(Backbone.Model.prototype, {
      /**
       * @constructs LIBaseModel
       */
      init: function () {
        Backbone.Model.prototype.constructor.apply(this, arguments);
      }
    })
  });
});