App.PhotosController = Ember.ArrayController.extend(InfiniteScroll.ControllerMixin, {
  page: 0,
  perPage: 20,
  needs: ['photo'],
  photo: Ember.computed.alias("controllers.photo"),

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