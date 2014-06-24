App.PhotosAddToAlbumController = Ember.Controller.extend({
  needs: ['albums', 'photos'],
  albums: Ember.computed.alias('controllers.albums'),
  photos: Ember.computed.alias('controllers.photos'),

  fetchPage: function (page, perPage) {
    this.get('albums').fetchPage(page, perPage);
  },

  actions: {
    getMore: function () {
      this.get('albums').send('getMore');
    },

    toCollection: function () {
      this.transitionToRoute('photos');
    },

    select: function (id) {
      this.get('photos').send('addPhotosToAlbum', this.get('albums.model').findBy('id', id));
    }
  }
});