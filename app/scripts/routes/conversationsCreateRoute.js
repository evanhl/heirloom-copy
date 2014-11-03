App.ConversationsCreateRoute = Ember.Route.extend({
  actions: {
    willTransition: function () {
      var convoController = this.controllerFor('conversations');

      convoController.set('createMode', false);
    },

    didTransition: function () {
      var convoController = this.controllerFor('conversations');

      convoController.set('createMode', true);
    }
  }
});
