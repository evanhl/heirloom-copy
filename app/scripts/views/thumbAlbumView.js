App.ThumbAlbumView = Ember.View.extend({
  classNames: ['album', 'photo'],
  classNameBindings: ['controller.selected', 'controller.isSelectionMode:selection-mode'] ,

  click: function (e) {
    if (this.enlargeDisabled || this.get('controller.isSelectionMode')) {
      this.controller.send('select');
    } else {
      this.controller.send('enlarge');
    }
  }
});
