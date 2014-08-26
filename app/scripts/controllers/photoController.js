//= require basePhotoController
App.PhotoController = App.BasePhotoController.extend({
  needs: ['photoGroupings'],
  photoGroupings: Ember.computed.alias('controllers.photoGroupings'),
  photosModel: Ember.computed.alias('photoGroupings.compositeModel'),

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