App.PhotosRoute = Ember.Route.extend({
  model: function () {
    // return an empty array that the controller can append to as the user pages
    return [];
  },

  setupController: function(controller, model) {
    controller.send('getMore');
  }
});