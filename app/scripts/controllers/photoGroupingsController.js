App.PhotoGroupingsController = Ember.ArrayController.extend(InfiniteScroll.ControllerMixin, {
  reset: function () {
    this.set('model', []);
    this._super();
  },

  fetchPage: function (page, perPage) {
    var self = this;

    return App.PhotoGrouping.fetchQuery({
      grouped_by: 'created_at',
      page: page,
      // this is a hack until we have a pagination UI design
      photos_per_page: 1000
    });
  }
});