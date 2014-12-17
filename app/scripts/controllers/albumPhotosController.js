//= require selectableMixin
//= require shareMixin
App.AlbumPhotosController = Ember.ArrayController.extend(Ember.Evented, InfiniteScroll.ControllerMixin, App.SelectableMixin, App.ShareMixin, {
  needs: ['album', 'albumsIndex', 'albumPhotoPicker'],
  album: Ember.computed.alias('controllers.album'),
  albums: Ember.computed.alias('controllers.albumsIndex'),
  albumPhotoPicker: Ember.computed.alias('controllers.albumPhotoPicker'),
  albumName: Ember.computed.alias('album.name'),

  showSettingsMenu: false,

  init: function () {
    this.get('albumPhotoPicker').on('photosSelected', this, this.photosSelected);
    this._super();
  },

  fetchPage: function (page, perPage) {
    var adapter = App.Album.adapter;
    var params = {
      page: page,
      per_page: perPage
    };
    var records = Ember.RecordArray.create({ modelClass: App.Photo, _query: params, container: false });

    return adapter.findNestedQuery(this.get('album.model'), App.Photo, 'photos', records, params);
  },

  isSelectionMode: function () {
    return this.get('selectedCount') > 0 && !this.get('isCcMode');
  }.property('selectedCount', 'isCcMode'),

  areItemsSelectable: function () {
    return this.get('selectedCount') > 0 || this.get('isCcMode');
  }.property('selectedCount', 'isCcMode'),

  photosSelected: function (ids) {
    this.addPhotos(ids);
  },

  addPhotos: function (ids) {
    var self = this;
    var album = this.get('album.model');

    album.addPhotos(ids).then(function () {
      // TODO: handle error
      album.reload();
      self.pushObjects(ids.map(function (id) {
        return App.Photo.find(id);
      }));
    });
  },

  deselect: function () {
    this.resetSelected();
    this.trigger('deselect');
  },

  actions: {
    select: function (photoController) {
      var newValue = photoController.get('selected');

      if (this.get('isCcMode')) {
        this.deselect();
        photoController.set('selected', newValue);
      }

      this.set('showShareMenu', false);

      this.toggleSelected(photoController.get('model.id'), newValue);
    },

    enlarge: function (id) {
      this.transitionToRoute('albumPhoto', this.get('album.id'), id);
    },

    cancel: function () {
      this.deselect();
    },

    removePhotos: function () {
      var self = this;
      var album = self.get('album.model');
      var selectedIds = this.get('selectedIds');
      var selected = selectedIds.map(function (id) { return App.Photo.find(id); });

      album.removePhotos(selectedIds).then(function () {
        self.deselect();
        self.get('model').removeObjects(selected);
        album.reload();
      });
    },

    toggleSettingsMenu: function () {
      this.toggleProperty('showSettingsMenu');
    },

    deleteAlbum: function () {
      var self = this;
      var album = this.get('album.model');

      album.deleteRecord().then(function () {
        self.get('albums').removeObject(album);
        self.transitionToRoute('albums');
      });
    },

    addPhotos: function () {
      this.send('openModal', 'albumPhotoPicker');
    },

    enterChangeCoverMode: function () {
      this.set('isCcMode', true);
      this.set('showSettingsMenu', false);
    },

    cancelChangeCover: function () {
      this.deselect();
      this.set('isCcMode', false);
    },

    saveCoverPhoto: function () {
      var self = this;
      var album = this.get('album.model');
      var adapter = App.Album.adapter;
      var coverPhotoId = this.get('selectedIds')[0];

      adapter.patchRecord(album, { cover_photo_id: coverPhotoId }).then(function () {
        // TODO: handle error
        self.trigger('toast', 'albums.savedCoverPhoto');
        self.deselect();
        self.set('isCcMode', false);
        album.reload();
      });
    }
  }
});
