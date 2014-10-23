App.ThumbPhotoView = Ember.View.extend({
  classNames: 'photo',
  classNameBindings: ['controller.selected', 'controller.isSelectionMode:selection-mode', 'controller.model.isReady::processing'],

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
