App.ImageView = Ember.View.extend({
  tagName: 'img',
  src: null,
  classNames: ['detail'],

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
      this.transitionIn();
    } else {
      this.transitionOut();
    }
  },

  visibleChanged: function (visible) {
    if (!visible) {
      this.transitionOut();
    }
  },

  transitionIn: function () {
    this.$().css('width', 'auto');
    this.$().css('opacity', 1);
  },

  transitionOut: function () {
    this.$().css('width', 'auto');
    this.$().css('opacity', 0);
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
    this.$().on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
      if (parseFloat($(this).css('opacity')) === 0) {
        $(this).css('width', 0);
      }
    });

    if (this.get('image').visible) {
      this.imageChanged();
    }
  },
  willDestroyElement: function () {
    this.$().off();
  },

  imageLoaded: function (e) {
    var self = this;

    if (this.get('image').visible) {
      this.transitionIn();
    }

    this.set('controller.loadingImg', false);
  },

  // TODO: handle error state
  imageError: function (e) {
    this.set('controller.loadingImg', false);
  }
});