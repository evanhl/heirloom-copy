App.PhotosController = Ember.ArrayController.extend(InfiniteScroll.ControllerMixin, {
  needs: ['photo'],
  photo: Ember.computed.alias("controllers.photo"),

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
  }
});