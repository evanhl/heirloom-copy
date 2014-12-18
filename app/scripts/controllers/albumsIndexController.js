//= require selectableMixin
App.AlbumsIndexController = Ember.ArrayController.extend(Ember.Evented, InfiniteScroll.ControllerMixin, App.SelectableMixin, {
  needs: ['newAlbumPhotoPicker'],
  newAlbumPhotoPicker: Ember.computed.alias('controllers.newAlbumPhotoPicker'),

  init: function () {
    this.get('newAlbumPhotoPicker').on('photosSelected', this, this.photosSelected);
    this._super();
  },

  fetchPage: function (page, perPage) {
    return App.Album.fetchQuery({
      page: page,
      per_page: perPage
    });
  },

  reset: function () {
    this.resetSelected();
    this.set('model', []);
    this._super();
  },

  create: function (ids) {
    var self = this;
    var album = {
      name: this.get('newAlbumPhotoPicker.name'),
      photo_ids: ids
    };
    var record = App.Album.create(album);

    record.save().then(function (createdRecord) {
      self.unshiftObject(record);
      self.set('error', null);
    }, function (response) {
      if (response.responseJSON && response.responseJSON instanceof Object) {
        self.set('error', response.responseJSON);
      }
    });
  },

  photosSelected: function (ids) {
    this.create(ids);
  },

  deselect: function () {
    this.trigger('deselect');
    this.set('selected', {});
  },

  actions: {
    enlarge: function (id) {
      this.transitionToRoute('albumPhotos', id);
    },

    create: function () {
      this.send('openModal', 'newAlbumPhotoPicker');
    },

    select: function (albumController) {
      var selected = albumController.get('selected');
      var albumId = albumController.get('model.id');

      if (selected) {
        this.get('selected')[albumId] = true;
      } else {
        delete this.get('selected')[albumId];
      }
      this.notifyPropertyChange('selected');
    },

    cancel: function () {
      this.deselect();
    },

    deleteAlbums: function () {
      var adapter = App.Album.adapter;
      var self = this;

      App.Album.batchDelete(this.get('selectedIds')).then(function (response) {
        response.album_ids.forEach(function (id) {
          var album = self.findBy('id', id);
          self.removeObject(album);
          album.destroy();
        });

        self.deselect();
      });
    }
  }
});
