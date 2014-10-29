App.ConversationInvitationRoute = Ember.Route.extend({
  setupController: function (controller, model) {
    this._super(controller, model);
    controller.doInvitationSetup();
  }
});
