// For routes with pagination where different resources might be loaded, (e.g. album 1's photos are loaded, then
// album 2's) we want to clear the pagination and model each time
App.ResetableRouteMixin = Ember.Mixin.create({
  setupController: function (controller, model) {
    controller.setProperties({
      page: 0,
      maxPage: null
    });

    controller.set('model', []);

    this._super(controller, model);
  }
});