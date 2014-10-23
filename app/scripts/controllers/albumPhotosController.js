//= require selectableMixin
App.AlbumPhotosController = Ember.ArrayController.extend(Ember.Evented, InfiniteScroll.ControllerMixin, App.SelectableMixin, {
  needs: ['album', 'albumPhotoPicker'],
  album: Ember.computed.alias('controllers.album'),
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

  photosSelected: function (ids) {
    this.addPhotos(ids);
  },

  addPhotos: function (ids) {
    var self = this;
    var adapter = App.Album.adapter;
    var photoCount = ids.length;
    var album = this.get('album.model');

    adapter.postNested(album, {
      photo_ids: ids
    }, 'photos').then(function () {
      // TODO: handle error
      album.reload();
      self.pushObjects(ids.map(function (id) {
        return App.Photo.find(id);
      }));
      // self.trigger('addedPhotosToAlbum', album, photoCount);
    });
  },

  deselect: function () {
    this.resetSelected();
    this.trigger('deselect');
  },

  actions: {
    select: function (photoController) {
      var newValue = photoController.get('selected');
      this.toggleSelected(photoController.get('model.id'), newValue);
    },

    enlarge: function (id) {
      this.transitionToRoute('albumPhoto', this.get('album.id'), id);
    },

    cancel: function () {
      this.deselect();
    },

    removePhotos: function () {
      var adapter = App.Album.adapter;
      var self = this;
      var album = self.get('album.model');
      var selectedIds = this.get('selectedIds');
      var selected = selectedIds.map(function (id) { return App.Photo.find(id); });

      adapter.postNested(album, {
        photo_ids: selectedIds
      }, 'photos/delete').then(function () {
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

      this.get('album.model').deleteRecord().then(function () {
        self.transitionToRoute('albums');
      });
    },

    addPhotos: function () {
      this.send('openModal', 'albumPhotoPicker');
    }
  }
});
