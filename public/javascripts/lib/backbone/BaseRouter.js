/**
 * Base Router module
 * @module LIBaseRouter
 * @requires Fiber
 * @requires Backbone
 * @augments Backbone.Router
 */
define('BaseRouter', function() {
  return Fiber.extend(function () {
    return _.extend(Backbone.Router.prototype, {
      /**
       * @constructs LIBaseRouter
       * @param {Object} proxy Designated an object or function to delegate to. Given a route callback or action string
       * defined in the 'routes' hash, the router will first check to see if the string matches a function on the
       * router and call the function. If no match is found, it will search the proxy object for a function 
       */
      init: function (proxy) {
     		if(proxy) {
     			this.proxy = proxy;
     		}

     		if(this.routes) {
     			for(var route in this.routes) {
     				//Create proxy route function to call proxy if function doesn't exist
     				var routeAction = this.routes[route];
     				if(!_.isFunction(this[routeAction])) {
     					this[routeAction] = (function(routeAction, proxy) {
     						return function() {
  	 							if(_.isObject(proxy)) {
  	   							if(_.isFunction(proxy[routeAction])) {
  	   								proxy[routeAction]();
  	   							} else if(_.isFunction(proxy)) {
  	   								proxy.apply(null, [routeAction, arguments]);
  	   							}
  	   						}
  	 						};
     					})(routeAction, proxy);
     				}

     				//Check to see if hook function exists. If so, replace route callback function 
     				//with a function that calls original function when the promise from the hook
     				//function resolves.
     				if(false) {
     					//for now, no hook functions
     				}
     			}
     		}

        Backbone.Router.prototype.constructor.apply(this, arguments);
      }
    })
  });
});