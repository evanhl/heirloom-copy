App.PhotoGroupingController = Ember.ObjectController.extend(Ember.Evented, {
  init: function () {
    this.get('parentController').on('deselectPhotos', this, this.deselectPhotos);
    this._super();
  },

  deselectPhotos: function () {
    this.trigger('deselectPhotos');
  },

  actions: {
    select: function (photoController) {
      var newValue = photoController.get('selected');
      this.get('parentController').toggleSelected(photoController.get('model'), this.get('model'), newValue);
    }
  }
});
