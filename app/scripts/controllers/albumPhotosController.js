App.AlbumPhotosController = App.BasePhotosController.extend({
  needs: ['album'],
  album: Ember.computed.alias('controllers.album'),
  batchActions: [
    { name: 'Remove from Album', action: 'removePhotos' }
  ],

  count: function () {
    return this.get('model').get('length');
  }.property('@each'),

  albumId: function () {
    return this.get('album.id');
  }.property('album'),

  fetchPage: function (page, perPage) {
    var adapter = new App.APIAdapter();
    var params = {
      page: page,
      per_page: perPage
    };
    var records = Ember.RecordArray.create({ modelClass: App.Photo, _query: params, container: false });

    return adapter.findNestedQuery(this.get('album.model'), App.Photo, 'photos', records, params);
  }
});
