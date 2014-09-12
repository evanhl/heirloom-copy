App.ConversationInvitationController = Ember.ObjectController.extend({
  modelChanged: function () {
    var adapter = App.ConversationInvitation.adapter;
    var self = this;
    var invitation = this.get('model');

    adapter.postNested(invitation, {}, 'accept').then(function () {
      Ember.run.next(self, function () {
        this.transitionToRoute('conversationPosts', self.get('model.conversation_id'));
      });
    });
  }.observes('model')
});
