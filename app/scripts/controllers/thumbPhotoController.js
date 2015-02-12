//= require ./selectableController
App.ThumbPhotoController = App.SelectableController.extend({
  photoUrl: null,
  photoStyle: '',

  setupPhotoListeners: function () {
    this.get('model').on('didRotate', this, this.preloadImageBeforeRotate);
    this.get('model').on('rotate', this, this.doCssRotate);
    this.doCssRotate();
    this.set('photoUrl', this.get('model.thumbVersion'));
  }.on('init'),

  teardownPhotoListeners: function () {
    if (this.get('model')) {
      this.get('model').off('didRotate', this, this.preloadImageBeforeRotate);
      this.get('model').off('rotate', this, this.doCssRotate);
    }
  }.observesBefore('model'),

  willDestroy: function () {
    this._super();
    this.teardownPhotoListeners();
  },

  doCssRotate: function () {
    var style;

    if (!this.get('model.rotationAngle')) {
      style = '';
    } else {
      style = 'transform: rotate(' + this.get('model.rotationAngle') + 'deg) ';
    }

    this.set('photoStyle', style);
  },

  preloadImageBeforeRotate: function () {
    var img = new Image();
    var self = this;

    img.onload = function () {
      self.set('photoUrl', self.get('model.thumbVersion'));
      self.doCssRotate();
      img.onload = null;
    };

    // preload the image
    img.src = this.get('model.thumbVersion');
  }
});
