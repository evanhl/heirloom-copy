App.NavigationController = Ember.Controller.extend({
  needs: ['photos', 'albumsIndex', 'conversations', 'uploadModal'],
  uploadModal: Ember.computed.alias('controllers.uploadModal'),
  photos: Ember.computed.alias('controllers.photos'),

  conversationsUnreadCount: Ember.computed.alias('conversationsSummary.unread_count'),
  conversationsCount: function () {
    var count = this.get('conversationsSummary.unread_count');
    var plus = this.get('conversationsSummary.unread_count_plus') ? '+' : '';

    return count + plus;
  }.property('conversationsSummary.unread_count', 'conversationsSummary.unread_count_plus'),

  init: function () {
    this.get('uploadModal').on('didUpload', this, this.didUpload);
    this._super();
  },

  username: function () {
    return App.get('auth.currentSession.username');
  }.property('App.auth.currentSession.username'),

  initials: function () {
    return App.get('auth.currentSession.initials');
  }.property('App.auth.currentSession.initials'),

  isLoggedIn: function () {
    return App.get('auth.isLoggedIn');
  }.property('App.auth.isLoggedIn'),

  /*globals console*/
  didLogIn: function () {
    if (this.get('isLoggedIn')) {
      this.onSignIn();
    }
  }.on('init').observes('isLoggedIn'),

  didLogOut: function () {
    if (!this.get('isLoggedIn')) {
      this.softSignOut();
    }
  }.observes('isLoggedIn'),

  updateConversationsCount: function () {
    var self = this;

    // The empty string argument causes Ember Model to parse the response as a single object instead of an array
    App.ConversationsSummary.fetch('').then(function (summary) {
      self.set('conversationsSummary', summary);
      return summary;
    });
  },

  groupsEnabled: function () {
    return !HLConfig.GROUPS_DISABLED;
  }.property(),

  // TODO: signin transition could be abrupt if token is expired remotely with no user action
  // implement warning banner, e.g. "You've been unexpectedly logged out"
  softSignOut: function () {
    // just the client side part of signing out
    // only invoke if server session has already expired
    this.transitionToRoute('signin');
    this.reset();
    this.get('controllers.photos').reset();
    this.get('controllers.albumsIndex').reset();
    this.get('controllers.conversations').reset();
  },

  onSignIn: function () {
    this.updateConversationsCount();
  },

  didUpload: function (uploadedPhotoModels) {
    this.get('photos').unshiftObjects(uploadedPhotoModels);
    this.get('photos').startFetchRecent();
  },

  reset: function () {
    this.set('conversationsSummary', null);
  },

  actions: {
    signout: function () {
      var self = this;
      // dummy record is required to delete record
      var session = App.Session.create();

      session.deleteRecord().then(function () {
        App.set('auth.currentSession', null);
      }, function () {
        // TODO: handle error
      });
    },

    register: function () {
      this.transitionToRoute('registration');
    },

    signin: function () {
      this.transitionToRoute('signin');
    },

    upload: function () {
      this.send('openModal', 'uploadModal');
    }
  }
});
