App.AlbumPickerController = Ember.Controller.extend(App.SelectableMixin, Ember.Evented, {
  needs: ['albumsIndex'],
  albums: Ember.computed.alias('controllers.albumsIndex'),
  loadingMore: Ember.computed.alias('albums.loadingMore'),
  isCreateMode: false,

  fetchFirstPage: function () {
    if (this.get('albums.page') <= 0) {
      this.send('getMore');
    }
  },

  fetchPage: function (page, perPage) {
    this.get('albums').fetchPage(page, perPage);
  },

  // TODO: this is copy-pasted in a few places. consider including in SelectableMixin
  deselect: function () {
    this.trigger('deselect');
    this.resetSelected();
  },

  cantComplete: function () {
    return this.get('noneSelected') && !this.get('albumName');
  }.property('noneSelected', 'albumName'),

  onCreateModeChange: function () {
    if (this.get('isCreateMode')) {
      this.deselect();
    }
  }.observes('isCreateMode'),

  actions: {
    toggleCreateMode: function () {
      this.toggleProperty('isCreateMode');
    },

    getMore: function () {
      this.get('albums').send('getMore');
    },

    select: function (albumController) {
      var selected = albumController.get('selected');
      var albumId = albumController.get('model.id');

      this.deselect();
      this.set('isCreateMode', false);
      this.toggleSelected(albumId, selected);
      albumController.set('selected', selected);
    },

    close: function () {
      this.resetSelected();
      this.send('closeModal');
    },

    complete: function () {
      var selectedAlbumId;
      var album;

      if (!this.get('isCreateMode')) {
        selectedAlbumId = parseInt(this.get('selectedIds')[0], 10);
        album = this.get('albums').findBy('id', selectedAlbumId);
        this.trigger('didSelect', album);
      } else {
        this.trigger('didSelect', null, this.get('albumName'));
      }

      this.resetSelected();
      this.send('closeModal');
    }
  }
});
