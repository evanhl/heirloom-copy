App.SigninController = Ember.Controller.extend(App.FbControllerMixin, {
  needs: ['conversationInvitation'],
  conversationInvitation: Ember.computed.alias('controllers.conversationInvitation'),
  login: null,
  password: null,
  errors: {},

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
      if (this.get('submitDisabled')) { return; }

      var login = this.getProperties(this.FIELDS);
      var record = App.Session.create(login);
      var self = this;
      this.set('errors', {});

      record.save().then(function (session) {
        App.set('auth.currentSession', session);

        if (App.get('invitationToken')) {
          self.set('conversationInvitation.justSignedIn', true);
          self.transitionToRoute('conversationInvitation', App.get('invitationToken'));
        } else {
          self.transitionToRoute('photos');
        }

        App.set('invitationToken', null);

        self.setProperties({
          login: null,
          password: null,
          errors: {}
        });
      }, function (response) {
        if (response.responseJSON && response.responseJSON instanceof Object) {
          self.set('errors', response.responseJSON);
        }
      });
    },

    fbSignin: function () {
      App.get('facebook').attemptLogin();
    }
  }
});
