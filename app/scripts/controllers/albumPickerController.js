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
    this.get('albums').clearSelected();
  },


  actions: {
    getMore: function () {
      this.get('albums').send('getMore');
    },

    select: function (id) {
      // TODO: move in to Album Controller when we get the chance

      this.get('albums').findBy('id', id).toggleProperty('selected');
    },

    close: function () {
      this.send('closeModal');
    }
  }
});
