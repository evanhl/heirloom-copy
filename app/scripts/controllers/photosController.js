App.PhotosController = App.BasePhotosController.extend({
  fetchPage: function (page, perPage) {
    var self = this;

    return Utils.wrapInPromise(App.Photo.findQuery({
      page: page,
      per_page: perPage
    })).then(function (items) {
      // TODO: filter out state !== ready
      return items;
    });
  }
});

