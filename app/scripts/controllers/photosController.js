App.PhotosController = Ember.ArrayController.extend(InfiniteScroll.ControllerMixin, {
  page: 0,
  perPage: 20,
  fetchPage: function (page, perPage) {
    return this.store.find('photo', {
      page: page,
      per_page: perPage
    }).then(this.addPrevNext);
  },
  addPrevNext: function (results) {
    results.filter(function (result) {
      return result.get('source');
    }).reduce(function (prev, current) {
      current.prevId = prev.id;
      prev.nextId = current.id;
      return current;
    }, {});

    return results;
  }
});