App.ThumbPhotoController = Ember.ObjectController.extend({
  selected: false,

  init: function () {
    this.get('parentController').on('deselectPhotos', this, this.deselectPhoto);
    this._super();
  },

  deselectPhoto: function () {
    this.set('selected', false);
  },

  willDestroy: function () {
    this.get('parentController').off('deselectPhotos', this, this.deselectPhoto);
  },

  actions: {
    select: function () {
      this.toggleProperty('selected');
      this.get('parentController').send('select', this);
    },

    enlarge: function () {
      this.transitionToRoute('photo', this.get('id'));
    }
  }
});
