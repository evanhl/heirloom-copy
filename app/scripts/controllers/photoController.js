//= require basePhotoController
App.PhotoController = App.BasePhotoController.extend({
  needs: ['photoGroupings'],
  photos: Ember.computed.alias('controllers.photoGroupings'),
  photosModel: Ember.computed.alias('photos.compositeModel'),

  toPhoto: function (toId) {
    if (!toId) { return; }

    this.transitionToRoute('photo', toId);
  },

  actions: {
    toCollection: function () {
      this.transitionToRoute('photoGroupings');
    }
  }
});