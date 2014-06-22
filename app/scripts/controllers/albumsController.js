App.AlbumsController = Ember.ArrayController.extend(InfiniteScroll.ControllerMixin, {
  fetchPage: function (page, perPage) {
    return Utils.wrapInPromise(App.Album.findQuery({
      page: page,
      per_page: perPage
    }));
  },

  actions: {
    create: function () {
      var self = this;
      var album = this.getProperties(['name']);
      var record = App.Album.create(album);

      record.save().then(function (createdRecord) {
        self.unshiftObject(createdRecord);
        self.set('error', null);
      }, function (response) {
        if (response.responseJSON && response.responseJSON instanceof Object) {
          self.set('error', response.responseJSON);
        }
      });
    }
  }
});