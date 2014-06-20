App.AlbumPhotosController = App.BasePhotosController.extend({
  needs: ['album'],
  album: Ember.computed.alias('controllers.album'),

  albumId: function () {
    return this.get('album.id');
  }.property('album'),

  fetchPage: function (page, perPage) {

  }
});
