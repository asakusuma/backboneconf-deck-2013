define(['BaseController', 'EndView'], 
function(BaseController, EndView) {
	return BaseController.extend(function(base) {
    return {
      initialize: function() {
      	_.bindAll(this, 'activate');
        this.view = new EndView({
        	el: this.$outlet
        });
      },
      activate: function() {
      	this.view.isLive();
      }
    }
  });
});