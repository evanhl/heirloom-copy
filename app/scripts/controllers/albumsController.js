App.AlbumsController = Ember.ArrayController.extend(InfiniteScroll.ControllerMixin, {
  fetchPage: function (page, perPage) {
    return App.Album.fetchQuery({
      page: page,
      per_page: perPage
    });
  },

  reset: function () {
    this.set('model', []);
    this._super();
  },

  actions: {
    // create: function () {
    //   var self = this;
    //   var album = this.getProperties(['name']);
    //   var record = App.Album.create(album);

    //   record.save().then(function (createdRecord) {
    //     self.unshiftObject(record);
    //     self.set('error', null);
    //   }, function (response) {
    //     if (response.responseJSON && response.responseJSON instanceof Object) {
    //       self.set('error', response.responseJSON);
    //     }
    //   });
    // }
    create: function () {
      this.send('openModal', 'photoPickerModal');
    }
  }
});
