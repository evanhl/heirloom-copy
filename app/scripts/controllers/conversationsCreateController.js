App.ConversationsCreateController = Ember.Controller.extend(Ember.Evented, {
  needs: ['conversations'],
  conversations: Ember.computed.alias('controllers.conversations'),

  postDisabled: function () {
    return !this.get('selectedContacts.length');
  }.property('selectedContacts'),

  createFirstPost: function (convo, postOptions) {
    var self = this;
    var adapter = App.Conversation.adapter;
    var post = App.Post.create(postOptions);

    adapter.createNestedRecord(convo, post, 'posts').then(function () {
      self.trigger('didCreatePost', post);
      self.get('conversations').unshiftObject(convo);
      self.transitionToRoute('conversationPosts', convo.get('id'));
    }, function () {
      // TODO: handle failure
    });
  },

  actions: {
    createPost: function (postOptions) {
      var convo;
      var self = this;
      var contacts = this.get('selectedContacts').map(function (id) {
        return { user_id: id };
      });

      convo = App.Conversation.create({
        contacts: contacts
      });

      convo.save().then(function () {
        self.createFirstPost(convo, postOptions);
      }, function () {
        // TODO: handle error
      });
    }
  }
});