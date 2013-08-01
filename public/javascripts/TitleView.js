define(['BaseView', 'ViewHelper'], 
function(BaseView, ViewHelper) {
	return BaseView.extend(function(base) {
    return {
      initialize: function() {
        _.bindAll(this, 'render', 'isLive');
        this.render();
      },
      render: function(html) {
        this.$el.html(dustSync('title', {}));
      },
      cleanup: function() {
        //Cleanup if needed
      },
      isLive: function() {
        //Do something if needed
      }
    }
  });
});