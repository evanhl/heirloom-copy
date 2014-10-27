App.SigninController = Ember.Controller.extend(App.FbControllerMixin, {
  login: null,
  password: null,
  error: {},

  actions: {
    signin: function () {
      var login = this.getProperties(['login', 'password']);
      var record = App.Session.create(login);
      var self = this;

      record.save().then(function (session) {
        App.set('auth.currentSession', session);

        self.transitionToRoute('photos');

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
