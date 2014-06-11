App.PhotoView = Ember.View.extend({
  setFocus: function() {
    // brings the view into focus in order to capture keyUps.
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
    var LEFT_KEY = 37;
    var RIGHT_KEY = 39;
    var ESCAPE_KEY = 27;

    if (e.keyCode === LEFT_KEY) {
      controller.send('prevPhoto');
    } else if (e.keyCode === RIGHT_KEY) {
      controller.send('nextPhoto');
    } else if (e.keyCode === ESCAPE_KEY) {
      controller.send('toCollection');
    }
  }
});
