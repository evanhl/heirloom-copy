App.AlbumsController = Ember.ArrayController.extend(InfiniteScroll.ControllerMixin, {
  fetchPage: function (page, perPage) {
    return this.store.find('album', {
      page: page,
      per_page: perPage
    }).then(function (albums) {
      return albums.filter(function () { return true; });
    });
  },

  actions: {
    create: function () {
      var self = this;
      var album = this.getProperties(['name']);
      var record = this.store.createRecord('album', album);

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