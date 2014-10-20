App.AlbumPickerController = Ember.Controller.extend(App.SelectableMixin, Ember.Evented, {
  needs: ['albumsIndex'],
  albums: Ember.computed.alias('controllers.albumsIndex'),
  loadingMore: Ember.computed.alias('albums.loadingMore'),
  selected: Ember.computed.alias('albums.selected'),

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

  actions: {
    getMore: function () {
      this.get('albums').send('getMore');
    },

    select: function (albumController) {
      var selected = albumController.get('selected');
      var albumId = albumController.get('model.id');

      this.deselect();
      this.toggleSelected(albumId, selected);
      albumController.set('selected', selected);
    },

    close: function () {
      this.resetSelected();
      this.send('closeModal');
    },

    // for now, this is only add to album, but there could
    // be other action types later on.
    complete: function () {
      var selectedAlbumId = parseInt(this.get('selectedIds')[0], 10);
      var album = this.get('albums').findBy('id', selectedAlbumId);

      this.trigger('didSelect', album);
      this.resetSelected();
      this.send('closeModal');
    }
  }
});
