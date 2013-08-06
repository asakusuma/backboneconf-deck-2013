requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'javascripts/',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        BaseDeferred: 'lib/li-backbone/LIBaseDeferred',
        BaseApplication: 'lib/li-backbone/LIBaseApplication',
        BaseController: 'lib/li-backbone/LIBaseController',
        BaseModel: 'lib/li-backbone/LIBaseModel',
        BaseCollection: 'lib/li-backbone/LIBaseCollection',
        BaseView: 'lib/li-backbone/LIBaseView',
        BaseDataStore: 'lib/li-backbone/LIBaseDataStore',
        BaseRouter: 'lib/li-backbone/LIBaseRouter'
    }
});

requirejs(['PresentationApp', 'BaseDeferred'], function(PresentationApp, BaseDeferred) {
	P = BaseDeferred;
	var app = new PresentationApp($('#app'));
	app.run(APPGLOBALS);
});
