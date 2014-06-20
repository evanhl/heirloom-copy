App.PhotosController = App.BasePhotosController.extend({
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
