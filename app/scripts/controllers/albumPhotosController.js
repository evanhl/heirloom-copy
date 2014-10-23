//= require selectableMixin
App.AlbumPhotosController = Ember.ArrayController.extend(Ember.Evented, InfiniteScroll.ControllerMixin, App.SelectableMixin, {
  needs: ['album'],
  album: Ember.computed.alias('controllers.album'),
  albumName: Ember.computed.alias('album.name'),

  showSettingsMenu: false,

  fetchPage: function (page, perPage) {
    var adapter = App.Album.adapter;
    var params = {
      page: page,
      per_page: perPage
    };
    var records = Ember.RecordArray.create({ modelClass: App.Photo, _query: params, container: false });

    return adapter.findNestedQuery(this.get('album.model'), App.Photo, 'photos', records, params);
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
    }
  }
});
