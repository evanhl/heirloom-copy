App.PhotoGroupingsController = Ember.ArrayController.extend(InfiniteScroll.ControllerMixin, {
  init: function () {
    this.set('selected', {});
    this._super();
  },

  reset: function () {
    this.set('selected', {});
    this.set('model', []);
    this._super();
  },

  fetchPage: function (page, perPage) {
    var self = this;

    return App.PhotoGrouping.fetchQuery({
      grouped_by: 'created_at',
      page: page,
      // TODO: this is a hack until we have a pagination UI design
      photos_per_page: 1000
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

  selectedIds: function () {
    return Object.keys(this.get('selected'));
  }.property('selected'),

  selectedCount: function () {
    return this.get('selectedIds').length;
  }.property('selectedIds'),

  isSelectionMode: function () {
    return this.get('selectedCount') > 0;
  }.property('selectedCount'),

  deselectPhotos: function () {
    this.get('model').forEach(function (grouping) {
      grouping.get('photos').forEach(function (photo) {
        photo.set('selected', false);
      });
    });
    this.set('selected', {});
  },

  actions: {
    cancel: function () {
      this.deselectPhotos();
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

        self.deselectPhotos();
      });
    }
  }
});