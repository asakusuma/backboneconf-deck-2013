define(['BaseController', 'TestView'], 
function(BaseController, TestView) {
	return BaseController.extend(function(base) {
    return {
      initialize: function() {
      	_.bindAll(this, 'activate');
        this.view = new TestView({
        	el: this.$outlet
        });
      },
      activate: function() {
      	this.view.isLive();
      }
    }
  });
});