App.AlbumPhotoController = App.BasePhotoController.extend({
  needs: ['albumPhotos'],
  photos: Ember.computed.alias('controllers.albumPhotos'),

  toPhoto: function (toId) {
    if (!toId) { return; }

    this.transitionToRoute('albumPhoto', this.get('photos.album.id'), toId);
  },

  actions: {
    toCollection: function () {
      this.transitionToRoute('albumPhotos', this.get('photos.album.id'));
    }
  }
});
