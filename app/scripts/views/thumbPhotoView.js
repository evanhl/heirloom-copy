App.ThumbPhotoView = Ember.View.extend({
  classNames: 'photo',
  classNameBindings: ['controller.selected', 'controller.isSelectionMode:selection-mode', 'controller.model.isReady::processing'],

  coverPhotoStyle: function () {
    if (!this.get('controller.model.rotationAngle')) {
      return '';
    }

    return 'transform: rotate(' + this.get('controller.model.rotationAngle') + 'deg) ';
  }.property('controller.model.rotationAngle'),

  click: function () {
    if (!this.get('controller.isReady')) {
      return;
    }

    if (this.enlargeDisabled || this.get('controller.isSelectionMode')) {
      this.controller.send('select');
    } else {
      this.controller.send('enlarge');
    }
  }
});
