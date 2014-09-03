App.ThumbAlbumView = Ember.View.extend({
  classNames: ['album', 'photo'],
  classNameBindings: 'controller.selected',

  click: function () {
    if (this.enlargeDisabled) {
      this.controller.send('select');
    } else {
      this.controller.send('enlarge');
    }
  }
});
