App.PhotoController = App.BasePhotoController.extend({
  needs: ['photos'],
  photos: Ember.computed.alias('controllers.photos'),

  toPhoto: function (toId) {
    if (!toId) { return; }

    this.transitionToRoute('photo', toId);
  },

  actions: {
    toCollection: function () {
      this.transitionToRoute('photos');
    }
  }
});