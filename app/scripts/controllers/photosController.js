/* globals App, Ember, InfiniteScroll */

// TODO: extract infinite scroll logic
App.PhotosController = Ember.ArrayController.extend(InfiniteScroll.ControllerMixin, {
  page: 0,
  perPage: 20,
  fetchPage: function (page, perPage) {
    return this.store.find('photo', {
      page: page,
      per_page: perPage
    });
  }
});