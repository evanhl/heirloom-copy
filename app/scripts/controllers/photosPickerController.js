App.PhotosPickerController = Ember.Controller.extend({
  needs: ['photos'],
  photos: Ember.computed.alias('controllers.photos'),
  loadingMore: Ember.computed.alias('photos.loadingMore'),

  init: function () {
    this.send('getMore');
  },

  fetchPage: function (page, perPage) {
    this.get('photos').fetchPage(page, perPage);
  },

  clearSelected: function () {
    this.get('photos').clearSelected();
  },

  actions: {
    getMore: function () {
      this.get('photos').send('getMore');
    },

    select: function (id) {
      this.get('photos').send('select', id);
    }
  }
});