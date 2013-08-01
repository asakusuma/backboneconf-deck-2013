define(['BaseController'], 
function(BaseController) {
	return BaseController.extend(function(base) {
    return {
      initialize: function(app) {
        this.app = app;
        this.$outlet = this.render(app.$outlet);
        app.dataStore.getSlides().then(_.bind(this.registerControls,this));
      },
      registerControls: function(slidesCollection) {
        this.slidesCollection = slidesCollection;
        $(document).keydown(_.bind(this.onKeyDown, this));
      },
      onKeyDown: function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code === 39 || code === 34) {
          this.app.goForward.call(app);
        } else if(code === 37 || code === 33) {
          this.app.goBackward.call(app);
        }
      },
      render: function($outlet) {
        $outlet.html(dustSync('layout',{}));
        return $outlet.find('#outlet');
      },
      showPage: function($el, direction) {
        var panes = $('#panes');
        var frag, newOutlet = $('<div class="outlet"></div>');

        if(direction == 'forward') {
          newOutlet.append($el);
          $('#panes > .right').html(newOutlet);
          panes.animate({ left: '-200%' }, 500, function() {
            frag = $('#panes > .left').detach();
            panes.append(frag);
            panes.css('left','-100%');
            
            frag.removeClass('left');

            var left = $('#panes > .visible');
            var visible = $('#panes > .right');
            visible.removeClass('right');
            visible.addClass('visible');

            frag.addClass('right');

            $('#outlet').remove();
            newOutlet.attr('id','outlet');
            
            left.removeClass('visible');
            left.addClass('left');
          });
        } else if(direction == 'backward') {
          $('.left').html($el);
          panes.animate({ left: '0%' }, 500, function() {
            frag = $('#panes > .right').detach();
            panes.prepend(frag);
            panes.css('left','-100%');
            var left = $('#panes > .right');
            var right = $('#panes > .visible');
            var visible = $('#panes > .left');
            right.removeClass('visible');
            left.removeClass('right');
            visible.removeClass('left');
            visible.addClass('visible');
            left.addClass('left');
            right.addClass('right');
          });
        } else {
          this.$outlet.html('');
          this.$outlet.append($el);
        }
      }
    }
  });
});