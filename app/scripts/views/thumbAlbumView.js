App.ThumbAlbumView = Ember.View.extend({
  classNames: ['album', 'photo'],
  classNameBindings: ['controller.selected', 'controller.isSelectionMode:selection-mode'],

  coverPhotoStyle: function () {
    if (!this.get('controller.model.cover_photo.rotationAngle')) {
      return '';
    }

    return 'transform: rotate(' + this.get('controller.model.cover_photo.rotationAngle') + 'deg) ';
  }.property('controller.model.cover_photo.rotationAngle'),

  click: function (e) {
    if (this.enlargeDisabled || this.get('controller.isSelectionMode')) {
      this.controller.send('select');
    } else {
      this.controller.send('enlarge');
    }
  }
});
