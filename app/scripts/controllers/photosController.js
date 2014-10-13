App.PhotosController = Ember.ArrayController.extend(InfiniteScroll.ControllerMixin, Ember.Evented, App.SelectableMixin, {
  needs: ['photo', 'albumPicker'],
  photo: Ember.computed.alias("controllers.photo"),
  albumPicker: Ember.computed.alias('controllers.albumPicker'),

  init: function () {
    this.get('albumPicker').on('didSelect', this, this.addPhotosToAlbum);
    this._super();
  },

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

  reset: function () {
    this.resetSelected();
    this.set('model', []);
    this._super();
  },

  clearSelected: function () {
    // TODO: make callers of clearSelected use resetSelected instead
    this.resetSelected();
  },

  addPhotosToAlbum: function (album) {
    var self = this;
    var adapter = App.Album.adapter;

    adapter.postNested(album, {
      photo_ids: this.get('selectedIds')
    }, 'photos').then(function () {
      // TODO: handle error
      self.deselect();
      album.reload();
    });
  },

  deselect: function () {
    this.trigger('deselect');
    this.resetSelected();
  },

  actions: {
    enlarge: function (id) {
      this.transitionToRoute('photo', id);
    },

    select: function (photoController) {
      var selected = photoController.get('selected');
      var photoId = photoController.get('model.id');

      this.toggleSelected(photoId, selected);
    },

    cancel: function () {
      this.deselect();
    },

    deletePhotos: function () {
      var adapter = App.Photo.adapter;
      var self = this;

      adapter.batchDelete(App.Photo, this.get('selectedIds'), 'photo_ids').then(function (response) {
        response.photo_ids.forEach(function (id) {
          var photo = self.get('model').findBy('id', id);

          if (photo) {
            photo.destroy();
            self.removeObject(photo);
          }
        });

        self.deselect();
      });
    },

    addToAlbum: function () {
      this.send('openModal', 'albumPicker');
    },

    upload: function () {
      this.send('openModal', 'uploadModal');
    }
  }
});