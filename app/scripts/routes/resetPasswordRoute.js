App.ResetPasswordRoute = Ember.Route.extend({
  setupController: function (controller, object) {
    controller.set('token', object.token);
  }
});
