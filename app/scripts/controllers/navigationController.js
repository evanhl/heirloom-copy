App.NavigationController = Ember.Controller.extend({
  needs: ['photos', 'albumsIndex', 'conversations', 'uploadModal'],
  uploadModal: Ember.computed.alias('controllers.uploadModal'),
  photos: Ember.computed.alias('controllers.photos'),

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

  isLoggedInChanged: function () {
    if (!this.get('isLoggedIn')) {
      this.softSignOut();
    }
  }.observes('isLoggedIn'),

  groupsEnabled: function () {
    return !HLConfig.GROUPS_DISABLED;
  }.property(),

  // TODO: signin transition could be abrupt if token is expired remotely with no user action
  // implement warning banner, e.g. "You've been unexpectedly logged out"
  softSignOut: function () {
    // just the client side part of signing out
    // only invoke if server session has already expired
    this.transitionToRoute('signin');
    this.get('controllers.photos').reset();
    this.get('controllers.albumsIndex').reset();
    this.get('controllers.conversations').reset();
  },

  didUpload: function (uploadedPhotoModels) {
    this.get('photos').unshiftObjects(uploadedPhotoModels);
    this.get('photos').startFetchRecent();
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
