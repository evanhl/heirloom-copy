App.ConversationInvitationRoute = Ember.Route.extend({
  setupController: function (controller, model) {
    if (!App.get('auth.isLoggedIn')) {
      App.set('hideNav', true);
    }
    this._super(controller, model);
  },

  actions: {
    willTransition: function () {
      App.set('hideNav', false);
    }
  }
});
