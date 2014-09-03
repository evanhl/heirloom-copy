App.AlbumsController = Ember.ArrayController.extend(Ember.Evented, InfiniteScroll.ControllerMixin, {
  needs: ['photoPickerModal'],
  photoPickerModal: Ember.computed.alias('controllers.photoPickerModal'),

  init: function () {
    this.set('selected', {});
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
    this.set('selected', {});
    this.set('model', []);
    this._super();
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
    }
  }
});
