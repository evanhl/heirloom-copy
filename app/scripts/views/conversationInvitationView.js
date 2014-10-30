//= require hiddenNavMixin
App.ConversationInvitationView = Ember.View.extend(App.HiddenNavMixin, {
  cleanup: function () {
    this.controller.cleanup();
  }.on('willDestroyElement')
});
