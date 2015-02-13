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

  // TODO: consider doing animations with velocity.js to more reliably handle interrupted transitions
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
  },

  onImageChange: function () {
    if (this.get('image.photo')) {
      this.get('image.photo').addObserver('rotationAngle', this, this.animateRotateImage);
    }

    if (this.get('image.visible')) {
      this.staticRotateImage();
    }
  }.observes('image').on('didInsertElement'),

  beforeImageChange: function () {
    if (this.get('image.photo')) {
      this.get('image.photo').removeObserver('rotationAngle', this, this.animateRotateImage);
    }
  }.observesBefore('image').on('willDestroyElement'),

  style: function () {
    if (!this.get('image.visible')) {
      return;
    }

  }.observes('image'),

  animateRotateImage: function () {
    this.rotateImage(true);
  },

  staticRotateImage: function () {
    this.rotateImage(false);
  },

  rotateImage: function (animate) {
    var rotationAngle = this.get('image.photo.rotationAngle') || 0;
    var style = '';
    var transition = '';

    if (rotationAngle % 180 !== 0) {
      style += (' scale(' +  this.getRotatedScale() + ') ');
    }

    if (animate) {
      this.$().addClass('anim-transform');
    } else {
      this.$().removeClass('anim-transform');
    }

    style += ' rotate(' + rotationAngle + 'deg) ';
    this.$().css('transform', style);
  },

  getRotatedScale: function () {
    // height limited = ratio > parentRatio
    var ratio = this.get('image.photo.fullHeight') / this.get('image.photo.fullWidth');
    var parentRatio = this.$().parent().outerHeight() / this.$().parent().outerWidth();
    var heightLimited = ratio > parentRatio;
    var heightIsBigger = ratio > 1;

    if (heightLimited && heightIsBigger) {
      return Math.min(ratio, 1 / parentRatio);
    } else if (heightLimited && !heightIsBigger) {
      return ratio;
    } else if (!heightLimited && heightIsBigger) {
      return 1 / ratio;
    } else {
      return Math.min(1 / ratio, parentRatio);
    }


  }
});