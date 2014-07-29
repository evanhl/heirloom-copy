App.PhotoView = Ember.View.extend({
  // explicitly supply template for views that inherit from this one
  templateName: 'photo',

  setFocus: function () {
    // brings the view into focus in order to capture keyDowns.
    this.$().attr({ tabindex: 1 }).focus();
  }.on('didInsertElement'),

  click: function (e) {
    if (!$(e.target).is('.lightbox')) {
      return;
    }

    this.get('controller').send('toCollection');
  },

  keyDown: function (e) {
    var controller = this.get('controller');

    if (e.keyCode === Utils.Keys.LEFT) {
      controller.send('prevPhoto');
    } else if (e.keyCode === Utils.Keys.RIGHT) {
      controller.send('nextPhoto');
    } else if (e.keyCode === Utils.Keys.ESC) {
      controller.send('toCollection');
    }
  },

  preloadNextNextImage: function () {
    Utils.preloadImage(this.get('controller.nextNextImageUrl'));
  }.observes('controller.nextNextImageUrl')
});
