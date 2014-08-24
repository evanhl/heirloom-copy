App.ThumbPhotoController = Ember.ObjectController.extend({
  selected: false,

  init: function () {
    this.get('parentController').on('deselectPhotos', this, this.deselectPhoto);
    this._super();
  },

  deselectPhoto: function () {
    this.set('selected', false);
  },

  actions: {
    select: function () {
      this.toggleProperty('selected');
      this.get('parentController').send('select', this);
    }
  }
});
