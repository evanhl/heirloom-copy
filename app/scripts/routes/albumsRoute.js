// FIXME: this is copypasta from PhotosRoute
App.AlbumsRoute = Ember.Route.extend(App.SignedInRouteMixin, {
  model: function () {
    // return an empty array that the controller can append to as the user pages
    return [];
  },

  setupController: function(controller, model) {
    controller.send('getMore');
  }
});

