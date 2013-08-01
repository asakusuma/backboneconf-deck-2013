/**
 * Base data store module
 * @module LIBaseDataStore
 * @requires Fiber
 * @requires Backbone
 * @augments Backbone.Events
 */
define('BaseDataStore', function() {
  return Fiber.extend(function () {
    return _.extend(Backbone.Events, {
      /**
       * @constructs LIBaseDataStore
       */
      init: function (data, rootUrl) {
        if(data) {
          this.data = data;
        } else {
          this.data = {};
        }
        if(rootUrl) {
          this.rootUrl = rootUrl;
        } else {
          this.rootUrl = '/';
        }
        if(this.initialize) {
          this.initialize.apply(this, arguments);
        }
      }
    })
  });
});