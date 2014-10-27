App.ConversationInvitationController = Ember.ObjectController.extend({
  modelChanged: function () {
    var adapter = App.ConversationInvitation.adapter;
    var self = this;
    var invitation = this.get('model');

    invitation.one('didLoad', function () {
      if (self.get('policy.can_accept')) {
        adapter.postNested(invitation, {}, 'accept').then(function () {
          Ember.run.next(self, function () {
            self.transitionToRoute('conversationPosts', self.get('conversation_id'));
          });
        });
      } else {
        self.transitionToRoute('conversationPosts', self.get('conversation_id'));
      }
    });
  }.observes('model')
});
