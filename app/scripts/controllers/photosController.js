App.PhotosController = Ember.ArrayController.extend(InfiniteScroll.ControllerMixin, {
  needs: ['photo'],
  photo: Ember.computed.alias("controllers.photo"),

  numSelected: function () {
    var photos = this.get('model');
    return photos.reduce(function (runningTotal, element) {
      var tally = element.get('selected') ? 1 : 0;
      return runningTotal + tally;
    }, 0);
  }.property('@each.selected'),

  selected: function () {
    return this.get('model').filterBy('selected', true);
  }.property('@each.selected'),

  reset: function () {
    this.set('model', []);
    this._super();
  },

  fetchPage: function (page, perPage) {
    var self = this;

    return this.store.find('photo', {
      page: page,
      per_page: perPage
    }).then(function (results) {
      return results.filter(function (result) {
        return result.get('state') === 'ready';
      });
    });
  },

  actions: {
    select: function (id) {
      // FIXME: this lookup is O(n). implement array with hash index for fast lookup.
      // FIXME: use Ember.ObjectProxy on photo model so that selected attribute is specific to this view
      var photo = this.get('model').findBy('id', id);
      photo.toggleProperty('selected');
    },

    enlarge: function (id) {
      this.transitionToRoute('photo', id);
    },

    removePhotos: function () {
      var self = this;

      this.get('selected').forEach(function (photo) {
        photo.destroyRecord().then(function () {
          // FIXME: this remove operation is O(n)
          self.get('model').removeObject(photo);
        });
      });
    }
  }
});