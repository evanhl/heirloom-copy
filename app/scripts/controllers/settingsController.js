App.SettingsController = Ember.Controller.extend({
  init: function () {
    this.get('app.auth.currentSession');
    this._super();
  },

  app: function () {
    return App;
  }.property(),

  user: function () {
    return App.User.fromSession(this.get('app.auth.currentSession'));
  }.property('app.auth.currentSession'),

  disableSave: function () {
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

      this.send('closeModal');
    },

    save: function () {
      var self = this;
      var user = this.get('user');

      user.patch(user.toJSON()).then(function () {
        self.get('app.auth.currentSession').reload();
        self.send('closeModal');
      });
    },

    changePassword: function () {
      this.send('openModal', 'changePassword');
    }
  }
});