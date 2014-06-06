App.ImageView = Ember.View.extend({
  tagName: 'img',
  src: null,

  // TODO: Use Ember.run.once to separate src and visible properties
  imageChanged: function () {
    var image = this.get('image');

    if (image.src && image.src !== this.$().attr('src')) {
      this.srcChanged(image.src);
      this.visibleChanged(image.visible);
    } else {
      this.onlyVisibleChanged(image.visible);
    }
  }.observes('image'),

  onlyVisibleChanged: function (visible) {
    if (visible) {
      this.$().css('opacity', 1);
    } else {
      this.$().css('opacity', 0);
    }
  },

  visibleChanged: function (visible) {
    if (!visible) {
      this.$().css('opacity', 0);
    }
  },

  srcChanged: function (src) {
    var self = this;

    this.set('controller.loadingImg', true);
    this.$().one('load', function (e){
      return self.imageLoaded(e);
    }).one('error', function (e){
      return self.imageError(e);
    }).attr('src', src);
  },

  didInsertElement: function () {
    this.imageChanged();
  },
  willDestroyElement: function () {

    this.$().off('load', 'error');
  },

  imageLoaded: function (e) {
    var self = this;

    if (this.get('image').visible) {
      this.$().css('opacity', 1);
    }

    this.set('controller.loadingImg', false);
  },

  // TODO: handle error state
  imageError: function (e) {
    this.set('controller.loadingImg', false);
  }
});