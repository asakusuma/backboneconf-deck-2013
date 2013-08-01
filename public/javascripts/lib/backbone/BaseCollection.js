/**
 * Base collection module
 * @module LIBaseCollection
 * @requires Fiber
 * @requires Backbone
 * @augments Backbone.Events
 */
define('BaseCollection', function() {
	return Fiber.extend(function () {
	  return _.extend(Backbone.Collection.prototype, {
	    /**
	     * @constructs LIBaseCollection
	     */
	    init: function () {
	      Backbone.Collection.prototype.constructor.apply(this, arguments);
	    }
	  })
	});
});