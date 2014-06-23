App.AlbumPhotosController = App.BasePhotosController.extend({
  needs: ['album'],
  album: Ember.computed.alias('controllers.album'),
  batchActions: [
    { name: 'Remove from Album', action: 'removePhotos' }
  ],

  fetchPage: function (page, perPage) {
    var adapter = App.Album.adapter;
    var params = {
      page: page,
      per_page: perPage
    };
    var records = Ember.RecordArray.create({ modelClass: App.Photo, _query: params, container: false });

    return adapter.findNestedQuery(this.get('album.model'), App.Photo, 'photos', records, params);
  },

  actions: {
    enlarge: function (id) {
      this.transitionToRoute('albumPhoto', this.get('album.id'), id);
    },

    removePhotos: function () {
      var adapter = App.Album.adapter;
      var self = this;

      this.get('selected').forEach(function (photo) {
        adapter.removeNestedRecord(self.get('album.model'), photo, 'photos').then(function () {
          // FIXME: this remove operation is O(n)
          // TODO: update albums list with cover photo
          self.get('model').removeObject(photo);
        });
      });
    }
  }
});
