App.AlbumPhotosRoute = Ember.Route.extend(App.SignedInRouteMixin, InfiniteScroll.RouteMixin, {
  setupController: function (controller, model) {
    controller.setProperties({
      page: 0,
      maxPage: null
    });

    controller.set('model', []);

    this._super(controller, model);
  }
});