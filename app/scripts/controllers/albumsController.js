App.AlbumsController = Ember.ArrayController.extend(InfiniteScroll.ControllerMixin, {
  needs: ['photoPickerModal'],
  photoPickerModal: Ember.computed.alias('controllers.photoPickerModal'),

  init: function () {
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
    this.set('model', []);
    this._super();
  },

  create: function (ids) {
    var self = this;
    var album = {
      name: "Album " + Math.floor(Math.random() * 1000),
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

  actions: {
    create: function () {
      this.send('openModal', 'photoPickerModal');
    }
  }
});
