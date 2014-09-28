App.BasePhotosController = Ember.ArrayController.extend(InfiniteScroll.ControllerMixin, Ember.Evented, {
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

  clearSelected: function () {
    return this.get('model').forEach(function (photo) {
      photo.set('selected', false);
    });
  },

  actions: {
    select: function (id) {
      var photo = this.get('model').findBy('id', id);
      photo.toggleProperty('selected');
    },

    batchAction: function (action) {
      this.send(action);
    }
  }
});