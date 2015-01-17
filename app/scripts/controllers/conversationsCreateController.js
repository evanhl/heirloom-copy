App.ConversationsCreateController = Ember.Controller.extend(Ember.Evented, {
  needs: ['conversations'],
  conversations: Ember.computed.alias('controllers.conversations'),

  postDisabled: function () {
    return !this.get('selectedContacts.length');
  }.property('selectedContacts'),

  createFirstPost: function (convo, postOptions) {
    var self = this;
    var post = App.Post.create(postOptions);

    convo.createPost(post).then(function () {
      self.trigger('didCreatePost', post);
      self.get('conversations').unshiftObject(convo);
      self.transitionToRoute('conversationPosts', convo.get('id'));
      self.set('selectedContacts', []);
    }, function () {
      // TODO: handle failure
    });
  },

  selectedContactsWillChange: function () {
    this.set('oldContactsLength', this.get('selectedContacts.length') || 0);
  }.observesBefore('selectedContacts.length'),

  selectedContactsChanged: function () {
    var diff = (this.get('selectedContacts.length') || 0) - this.get('oldContactsLength');

    if (diff > 0) {
      App.get('analytics').trackEvent('Groups.NewGroup.addContact');
    } else if (diff < 0) {
      App.get('analytics').trackEvent('Groups.NewGroup.removeContact');
    }
  }.observes('selectedContacts.length'),

  actions: {
    createPost: function (postOptions) {
      var convo;
      var self = this;
      var contacts = this.get('selectedContacts').map(function (id) {
        if (Utils.isProbablyAValidEmail(id)) {
          return { contact_method: 'email', contact_value: id };
        } else {
          return { user_id: id };
        }
      });

      convo = App.Conversation.create({
        contacts: contacts
      });

      App.get('analytics').trackEvent('Groups.NewGroup.submit');

      convo.save().then(function () {
        App.get('analytics').trackEvent('Groups.NewGroup.submitPost');
        self.createFirstPost(convo, postOptions);
      }, function () {
        // TODO: handle error
      });
    }
  }
});