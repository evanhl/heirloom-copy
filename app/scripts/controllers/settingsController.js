App.SettingsController = Ember.ObjectController.extend({
  passwordSuccess: Ember.computed.alias('model.passwordSuccess'),

  init: function () {
    this.get('app.auth.currentSession');
    this._super();
  },

  currentSession: Ember.computed.alias('app.auth.currentSession'),
  avatarUrl: Ember.computed.alias('currentSession.avatar_photo.xsVersion'),

  app: function () {
    return App;
  }.property(),

  user: function () {
    return App.User.fromSession(this.get('currentSession'));
  }.property('app.auth.currentSession', 'dummy'),

  reset: function () {
    this.notifyPropertyChange('dummy');
    this.set('passwordSuccess', false);
  },

  saveDisabled: function () {
    return !this.get('user.isDirty');
  }.property('user.isDirty'),

  actions: {
    close: function () {
      var didConfirm;

      if (this.get('user.isDirty')) {
        didConfirm = window.confirm('You have unsaved changes. Do you want to discard them?');

        if (!didConfirm) {
          return;
        }
      }

      this.reset();
      this.send('closeModal');
    },

    save: function () {
      var self = this;
      var user;

      if (this.get('saveDisabled')) {
        return;
      }

      user = this.get('user');

      this.set('waiting', true);
      user.patch(user.toJSON()).then(function () {
        self.get('app.auth.currentSession').reload();
        self.set('waiting', false);
        self.send('closeModal');
      }, function (response) {
        self.set('errors', Utils.parseErrorResponse(response));
        self.set('waiting', false);
      });
    },

    changePassword: function () {
      this.send('openModal', 'changePassword');
    }
  }
});