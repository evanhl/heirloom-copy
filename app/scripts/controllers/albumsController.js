App.AlbumsController = Ember.ArrayController.extend(InfiniteScroll.ControllerMixin, {
  fetchPage: function (page, perPage) {
    return this.store.find('album', {
      page: page,
      per_page: perPage
    }).then(function (albums) {
      return albums.filter(function () { return true; });
    });
  }
});