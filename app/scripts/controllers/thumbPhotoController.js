App.ThumbPhotoController = Ember.ObjectController.extend({
  selected: false,
  actions: {
    select: function () {
      this.toggleProperty('selected');
      this.get('parentController').send('select', this);
    }
  }
});
