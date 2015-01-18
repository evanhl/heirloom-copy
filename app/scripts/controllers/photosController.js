//= require downloadableMixin
//= require selectableMixin

App.PhotosController = Ember.ArrayController.extend(InfiniteScroll.ControllerMixin, Ember.Evented, App.SelectableMixin, App.DownloadableMixin, {
  needs: ['albumPicker', 'albumsIndex'],
  albumPicker: Ember.computed.alias('controllers.albumPicker'),
  albums: Ember.computed.alias('controllers.albumsIndex'),

  sortProperties: ['created_at'],
  sortAscending: false,

  MAX_RETRIES: 20,
  SECS_BETWEEN_RETRIES: 5,

  retriesLeft: 0,
  perPage: 40,

  init: function () {
    this.get('albumPicker').on('didSelect', this, this.didSelectAlbum);
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

  onFetchPageError: function () {
    this.set('errors', [Ember.I18n.t('photos.failed')]);
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

  didSelectAlbum: function (album, albumName) {
    if (album) {
      this.addPhotosToAlbum(album);
    } else {
      this.createAlbum(albumName);
    }
  },

  createAlbum: function (albumName) {
    var self = this;
    var photoCount = this.get('selectedIds.length');

    var record = App.Album.create({
      name: albumName,
      photo_ids: this.get('selectedIds')
    });

    App.get('analytics').trackEvent('Moments.CreateAlbum.submit', this.get('selectedIds.length'));

    record.save().then(function (createdRecord) {
      self.trigger('toast', 'photos.createdAlbum', {
        albumName: albumName,
        count: photoCount
      });
      self.deselect();
      self.get('albums').reset();
      self.get('albumPicker').reset();
    });
  },

  addPhotosToAlbum: function (album) {
    var self = this;
    var photoCount = this.get('selectedIds.length');

    App.get('analytics').trackEvent('Moments.AddToAlbum.submit', this.get('selectedIds.length'));

    album.addPhotos(undefined).then(function () {
      self.deselect();
      album.reload();
      self.trigger('toast', 'photos.addedToAlbum', {
        count: photoCount,
        albumName: album.get('name')
      });
    }, function () {
      self.trigger('toast', 'photos.addToAlbum.error', null, 'toast-error');
    });
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

  handleEmptyState: function () {
    this.set('isEmptyState', true);
    this.send('openModal', 'photosEmpty');
  },

  clearEmptyState: function () {
    if (this.get('model.length') > 0) {
      this.set('isEmptyState', false);
    }
  }.observes('model.length'),

  closeShareMenu: function () {
    if (this.get('shareMenu')) {
      this.get('shareMenu').close();
    }
  },

  onEnterSelectionMode: function () {
    this._super();
    App.get('analytics').trackEvent('Moments.Actions.enterSelectionMode');
  },

  actions: {
    enlarge: function (id) {
      this.transitionToRoute('photo', id);
      App.get('analytics').trackEvent('Moments.Actions.singlePhotoView');
    },

    select: function (photoController) {
      var selected = photoController.get('selected');
      var photoId = photoController.get('model.id');

      this.closeShareMenu();

      this.toggleSelected(photoId, selected);
    },

    cancel: function () {
      this.deselect();
    },

    deletePhotos: function () {
      var self = this;

      App.get('analytics').trackEvent('Moments.SelectedPhotos.delete');

      App.Photo.batchDelete(this.get('selectedIds')).then(function (response) {
        response.photo_ids.forEach(function (id) {
          var photo = self.get('model').findBy('id', id);

          if (photo) {
            photo.destroy();
            self.removeObject(photo);
          }

          // Some albums might have update covers, but we don't know which ones, so unload them all
          self.get('albums').reset();
        });

        self.deselect();
      });
    },

    addToAlbum: function () {
      this.send('openModal', 'albumPicker');
      App.get('analytics').trackEvent('Moments.SelectedPhotos.addToAlbum', this.get('selectedIds.length'));
    },

    dropboxDownload: function () {
      this._super();
      App.get('analytics').trackEvent('Moments.SelectedPhotos.dropboxSave', this.get('selectedIds.length'));
    },

    zipDownload: function () {
      this._super();
      App.get('analytics').trackEvent('Moments.SelectedPhotos.zipDownload', this.get('selectedIds.length'));
    },

    toggleShare: function () {
      this.get('shareMenu').toggle();
    },

    twitterShare: function () {
      this._super();
      App.get('analytics').trackEvent('Moments.SelectedPhotos.shareTwitter', this.get('selectedIds.length'));
    },

    facebookShare: function () {
      this._super();
      App.get('analytics').trackEvent('Moments.SelectedPhotos.shareFacebook', this.get('selectedIds.length'));
    },
  }
});