App.AlbumPickerController = Ember.Controller.extend(Ember.Evented, {
  needs: ['albums'],
  albums: Ember.computed.alias('controllers.albums'),
  loadingMore: Ember.computed.alias('albums.loadingMore'),
  selected: Ember.computed.alias('albums.selected'),

  init: function () {
    this.send('getMore');
  },

  fetchPage: function (page, perPage) {
    this.get('albums').fetchPage(page, perPage);
  },

  clearSelected: function () {
    this.get('albums').setEach('selected', false);
  },

  actions: {
    getMore: function () {
      this.get('albums').send('getMore');
    },

    select: function (albumController) {
      // TODO: move in to Album Controller when we get the chance
      var album = albumController.get('model');
      var newValue = album.toggleProperty('selected');
      this.get('albums').setEach('selected', false);
      album.set('selected', newValue);
    },

    close: function () {
      this.clearSelected();
      this.send('closeModal');
    },

    // for now, this is only add to album, but there could
    // be other action types later on.
    complete: function () {
      this.trigger('didSelect', this.get('albums').findBy('selected', true));
      this.clearSelected();
      this.send('closeModal');
    }
  }
});
