define(['BaseView', 'ViewHelper'], 
function(BaseView, ViewHelper) {
	var SlideView = BaseView.extend(function(base) {
    return {
      events: {
        'click':'onClicked'
      },
      initialize: function() {
        _.bindAll(this, 'render', 'onClicked', 'bindEvents');
        this.currentSlide = 0;
      },
      render: function(slides) {
        if(this.$el.children().length < 1) {
          this.$el.html(dustSync('slides', {
            slides: slides
          }));
          ViewHelper.formatCode(this.$el);
        }
      },
      showSlide: function(slide) {
        var offset = (parseInt(slide) - 1) * -100;
        offset = offset + '%';

        //only animate if it's not the first slide transition
        if(this.currentSlide > 0) {
          this.$el.find('.slide-panes').animate({ left: offset }, 500, function() {});
        } else {
          this.$el.find('.slide-panes').css('left', offset);
        }
        this.currentSlide = slide;
        ViewHelper.applyPrettyPrint();
      },
      onClicked: function() {
        this.trigger('clicked');        
      },
      bindEvents: function() {
        this.delegateEvents();
        ViewHelper.applyPrettyPrint();
      },
      cleanup: function() {
        this.undelegateEvents();
      }
    }
  });

  return SlideView;
});