define(['PresentationApp', 'BaseDeferred'], function(PresentationApp, BaseDeferred) {
	P = BaseDeferred;
	var app = new PresentationApp($('#app'));
	app.run(APPGLOBALS);
	Backbone.history.start({pushState: true});
});