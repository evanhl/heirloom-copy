App.ThumbPhotoView = Ember.View.extend({
  classNames: 'photo',
  classNameBindings: 'controller.selected',

  click: function () {
    if (this.enlargeDisabled) {
      this.controller.send('select');
    } else {
      this.controller.send('enlarge');
    }
  }
});
