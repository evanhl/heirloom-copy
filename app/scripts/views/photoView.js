App.PhotoView = Ember.View.extend({
  // explicitly supply template for views that inherit from this one
  templateName: 'photo',

  setFocus: function () {
    // brings the view into focus in order to capture keyDowns.
    this.$().attr({ tabindex: 1 }).focus();
  }.on('didInsertElement'),

  disableBodyScroll: function () {
    $('body').addClass('noscroll');
  }.on('didInsertElement'),

  enableBodyScroll: function () {
    $('body').removeClass('noscroll');
  }.on('willDestroyElement'),

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
