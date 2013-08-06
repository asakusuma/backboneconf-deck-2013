define({
  applyPrettyPrint: function() {
    var pres = $('pre');
    pres.addClass('prettyprint');
    prettyPrint();
  },
  formatCode: function(el) {
    var html = el.html();
    
  }
});