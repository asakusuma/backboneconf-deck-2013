define(['BaseDataStore', 'BaseModel', 'BaseCollection'], function(BaseDataStore, BaseModel, BaseCollection) {
  return BaseDataStore.extend(function(base) {
    return {
      initialize: function(slides) {
        _.bindAll(this, 'getSlide', 'getSlides');
        this.slides = [];
        this.slideCollection = null;
        if(slides) {
          this.slideCollection = new BaseCollection(slides);
        }
        console.log(this.slideCollection);
        this.getSlides();
      },
      getSlide: function(id) {
        id = parseInt(id);
        if(this.slidesCollection) {
          return P.fcall(function () {
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
        var that = this;
        if(this.slideCollection) {
          return P.fcall(function () {
            return that.slideCollection;
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