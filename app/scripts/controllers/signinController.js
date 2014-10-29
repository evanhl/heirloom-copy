App.SigninController = Ember.Controller.extend(App.FbControllerMixin, {
  login: null,
  password: null,
  error: {},

  FIELDS: ['login', 'password'],

  hasInvitation: function () {
    return App.get("invitationToken");
  }.property('App.invitationToken'),

  submitDisabled: function () {
    var self = this;

    return !this.FIELDS.every(function (fieldName) {
      return self.get(fieldName);
    });
  }.property('login', 'password'),

  actions: {
    signin: function () {
      var login = this.getProperties(this.FIELDS);
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
