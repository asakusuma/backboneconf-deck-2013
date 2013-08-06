define(['BaseController', 'TitleView'], 
function(BaseController, TitleView) {
	return BaseController.extend(function(base) {
    return {
      initialize: function() {
      	_.bindAll(this, 'activate');
        this.view = new TitleView({
        	el: this.$outlet
        });
      },
      activate: function() {
      	this.view.isLive();
      }
    }
  });
});