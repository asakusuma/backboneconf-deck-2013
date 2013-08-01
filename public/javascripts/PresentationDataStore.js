define(['BaseDataStore', 'BaseModel', 'BaseCollection'], function(BaseDataStore, BaseModel, BaseCollection) {
  return BaseDataStore.extend(function(base) {
    return {
      initialize: function() {
        _.bindAll(this, 'getSlide');
        this.slides = [];
        this.slideCollection = null;
        this.getSlides();
      },
      getSlide: function(id) {
        id = parseInt(id);
        if(this.slidesCollection) {
          P.fcall(function () {
            return this.slidesCollection.get(id - 1);
          });
        }

        var d = P.defer(),
          store = this;

        $.ajax({
          url: this.rootUrl + 'data/slide/' + id
        }).done(function(result) {
          store.slides[id] = new BaseModel(result);
          d.resolve(store.slides[id]);
        });

        return d.promise;
      },

      getSlides: function() {
        if(this.slideCollection) {
          P.fcall(function () {
            return this.slideCollection;
          });
        }

        var d = P.defer(),
          store = this;

        $.ajax({
          url: this.rootUrl + 'data/slide/'
        }).done(function(result) {
          store.slideCollection = new BaseCollection(result);
          d.resolve(store.slideCollection);
        });

        return d.promise;
      }
    };
  });
});