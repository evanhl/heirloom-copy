App.ThumbPhotoView = Ember.View.extend({
  classNames: 'photo',
  classNameBindings: ['controller.selected', 'controller.isSelectionMode:selection-mode', 'controller.model.isViewable::processing'],

  click: function () {
    if (!this.get('controller.isViewable')) {
      return;
    }

    if (this.enlargeDisabled || this.get('controller.isSelectionMode')) {
      this.controller.send('select');
    } else {
      this.controller.send('enlarge');
    }
  }
});
