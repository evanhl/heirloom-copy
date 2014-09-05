App.AlbumsController = Ember.ArrayController.extend(Ember.Evented, InfiniteScroll.ControllerMixin, {
  needs: ['photoPickerModal'],
  photoPickerModal: Ember.computed.alias('controllers.photoPickerModal'),

  init: function () {
    this.resetSelected();
    this.get('photoPickerModal').on('photosSelected', this, this.photosSelected);
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

  resetSelected: function () {
    this.set('selected', {});
  },

  create: function (ids) {
    var self = this;
    var album = {
      name: this.get('photoPickerModal.name'),
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

  // TODO: remove copypasta between this and photoGroupingsController selection handling
  selectedIds: function () {
    return Object.keys(this.get('selected'));
  }.property('selected'),

  selectedCount: function () {
    return this.get('selectedIds').length;
  }.property('selectedIds'),

  isSelectionMode: function () {
    return this.get('selectedCount') > 0;
  }.property('selectedCount'),

  deselect: function () {
    this.trigger('deselect');
    this.set('selected', {});
  },

  actions: {
    create: function () {
      this.send('openModal', 'photoPickerModal');
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

      adapter.batchDelete(App.Album, this.get('selectedIds'), 'album_ids').then(function (response) {
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
