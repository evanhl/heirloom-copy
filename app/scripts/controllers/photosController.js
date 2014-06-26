App.PhotosController = App.BasePhotosController.extend({
  batchActions: [
    { name: 'Delete', action: 'removePhotos' },
    { name: 'Add to Album', action: 'addToAlbum' }
  ],

  fetchPage: function (page, perPage) {
    var self = this;

    return App.Photo.fetchQuery({
      page: page,
      per_page: perPage
    }).then(function (items) {
      return items.filter(function (item) {
        return item.get('state') === 'ready';
      });
    });
  },

  actions: {
    removePhotos: function () {
      var self = this;

      this.get('selected').forEach(function (photo) {
        photo.deleteRecord().then(function () {
          // FIXME: this remove operation is O(n)
          self.get('model').removeObject(photo);
        });
      });
    },

    enlarge: function (id) {
      this.transitionToRoute('photo', id);
    },

    addToAlbum: function () {
      this.transitionToRoute('photos.addToAlbum');
    },

    addPhotosToAlbum: function (album) {
      var self = this;
      var adapter = App.Album.adapter;
      var selectedIds = this.get('selected').map(function (photo) {
        return photo.get('id');
      });

      adapter.postNested(album.content, {
        photo_ids: selectedIds
      }, 'photos').then(function () {
        self.get('selected').forEach(function (photo) {
          photo.set('selected', false);
        });
        self.transitionToRoute('albumPhotos', album.get('id'));
        album.reload();
      });
    }
  }
});

