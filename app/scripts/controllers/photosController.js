App.PhotosController = Ember.ArrayController.extend(InfiniteScroll.ControllerMixin, Ember.Evented, App.SelectableMixin, {
  needs: ['photo', 'albumPicker', 'uploadModal'],
  photo: Ember.computed.alias("controllers.photo"),
  albumPicker: Ember.computed.alias('controllers.albumPicker'),
  uploadModal: Ember.computed.alias('controllers.uploadModal'),

  sortProperties: ['created_at'],
  sortAscending: false,

  MAX_RETRIES: 20,
  SECS_BETWEEN_RETRIES: 5,

  retriesLeft: 0,

  init: function () {
    this.get('albumPicker').on('didSelect', this, this.addPhotosToAlbum);
    this.get('uploadModal').on('didUpload', this, this.didUpload);
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

  fetchRecent: function () {
    var self = this;

    return App.Photo.fetchQuery({
      page: 1,
      per_page: 25
    }).then(function (items) {
      self.checkPhotosComplete(items);
      return items;
    }).then(function (items) {
      return items.filter(function (item) {
        return item.get('state') === 'ready';
      });
    }).then(function (items) {
      self.mergeObjects(items);
    });
  },

  mergeObjects: function (items) {
    this.removeObjects(items);
    this.unshiftObjects(items);
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

  didUpload: function (uploadedPhotoModels) {
    this.unshiftObjects(uploadedPhotoModels);
    this.startFetchRecent();
  },

  startFetchRecent: function () {
    if (this.get('retriesLeft') === 0) {
      this.set('retriesLeft', this.MAX_RETRIES);
      this.fetchRecent();
    } else {
      this.set('retriesLeft', this.MAX_RETRIES);
    }
  },

  checkPhotosComplete: function (items) {
    this.set('retriesLeft', this.get('retriesLeft') - 1);
    var allReady = items.everyBy('state', 'ready');

    if (allReady) {
      this.set('retriesLeft', 0);
    }

    if (this.get('retriesLeft') > 0) {
      setTimeout($.proxy(this.fetchRecent, this), this.SECS_BETWEEN_RETRIES * 1000);
    }
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