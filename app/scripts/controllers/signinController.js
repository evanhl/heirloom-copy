App.SigninController = Ember.Controller.extend(App.FbControllerMixin, {
  login: null,
  password: null,
  error: {},

  hasInvitation: function () {
    return App.get("invitationToken");
  }.property('App.invitationToken'),

  actions: {
    signin: function () {
      var login = this.getProperties(['login', 'password']);
      var record = App.Session.create(login);
      var self = this;

      record.save().then(function (session) {
        App.set('auth.currentSession', session);

        if (App.get('invitationToken')) {
          self.transitionToRoute('conversationInvitation', App.get('invitationToken'));
        } else {
          self.transitionToRoute('photos');
        }

        App.set('invitationToken', null);

        self.setProperties({
          login: null,
          password: null,
          error: null
        });
      }, function (response) {
        if (response.responseJSON && response.responseJSON instanceof Object) {
          self.set('error', response.responseJSON);
        }
      });
    },

    fbSignin: function () {
      App.get('facebook').attemptLogin();
    }
  }
});
