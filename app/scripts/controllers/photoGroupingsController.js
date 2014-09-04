App.PhotoGroupingsController = Ember.ArrayController.extend(InfiniteScroll.ControllerMixin, Ember.Evented, {
  needs: ['albumPicker'],
  albumPicker: Ember.computed.alias('controllers.albumPicker'),

  init: function () {
    this.resetSelected();
    this.get('albumPicker').on('didSelect', this, this.addPhotosToAlbum);
    this._super();
  },

  reset: function () {
    this.resetSelected();
    this.set('model', []);
    this._super();
  },

  resetSelected: function () {
    this.set('selected', {});
  },

  fetchPage: function (page, perPage) {
    var self = this;

    return App.PhotoGrouping.fetchQuery({
      grouped_by: 'created_at',
      page: page,
      // TODO: this is a hack until we have a pagination UI design
      photos_per_page: 1000
    }).then(function (groupings) {
      groupings.forEach(function (grouping) {
        var filtered = grouping.get('photos').filterBy('state', 'ready');
        grouping.set('photos', filtered);
      });
      return groupings;
    });
  },

  toggleSelected: function (photo, grouping, isSelected) {
    if (isSelected) {
      // We have to include photo and grouping here so that we can remove the photo from the grouping on delete
      this.get('selected')[photo.get('id')] = {
        photo: photo,
        grouping: grouping
      };
    } else {
      delete this.get('selected')[photo.get('id')];
    }
    this.notifyPropertyChange('selected');
  },

  compositeModel: function () {
    return Utils.CompositeEnumerable.create({
      arrays: this.get('model').map(function (grouping) {
        return grouping.get('photos');
      })
    });
  }.property('model.[]'),

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

  addPhotosToAlbum: function (album) {
    var self = this;
    var adapter = App.Album.adapter;

    adapter.postNested(album, {
      photo_ids: this.get('selectedIds')
    }, 'photos').then(function () {
      // TODO: handle error
      self.deselect();
      album.reload();
    });
  },

  actions: {
    cancel: function () {
      this.deselect();
    },

    deletePhotos: function () {
      var adapter = App.Photo.adapter;
      var self = this;

      adapter.batchDelete(App.Photo, this.get('selectedIds'), 'photo_ids').then(function (response) {
        response.photo_ids.forEach(function (id) {
          var selected = self.get('selected')[id];
          var photo = selected.photo;
          var grouping = selected.grouping;

          // FIXME: This sucks. We should have a specialized data structure that abstracts the traversal from one
          // grouping's photos to another grouping's photos. This data structure could support removeObjects
          grouping.get('photos').removeObject(photo);
          photo.destroy();
        });

        self.deselect();
      });
    },

    addToAlbum: function () {
      this.send('openModal', 'albumPicker');
    },

    upload: function () {
      this.send('openModal', 'uploadModal');
    }
  }
});