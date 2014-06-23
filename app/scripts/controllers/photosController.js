App.PhotosController = App.BasePhotosController.extend({
  batchActions: [
    { name: 'Delete', action: 'removePhotos' }
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
    }
  }
});

