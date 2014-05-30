App.PhotoView = Ember.View.extend({
  setFocus: function() {
    // brings the view into focus in order to capture keyUps.
    return this.$().attr({ tabindex: 1 }), this.$().focus();
  }.on('didInsertElement'),
  click: function (e) {

  },
  keyDown: function (e) {
    var controller = this.get('controller');
    var LEFT_KEY = 37;
    var RIGHT_KEY = 39;
    var ESCAPE_KEY = 27;

    if (e.keyCode === LEFT_KEY) {
      this.get('controller').send('prevPhoto');
    } else if (e.keyCode === RIGHT_KEY) {
      this.get('controller').send('nextPhoto');
    } else if (e.keyCode === ESCAPE_KEY) {
      this.get('controller').send('toCollection');
    }
  }
});
