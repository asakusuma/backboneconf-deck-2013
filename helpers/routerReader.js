module.exports = function(content) {

	var routes;

	var BaseRouter = {
		extend: function(callback) {
			return callback().routes;
		}
	};

	var define = function(deps, callback) {
		routes = callback(BaseRouter);
	};
	eval(content);

	return routes;
}