/* jshint -W079 */

var App = Ember.Application.create({});

// Use HTML5 History API (pushState) to manage app URLs
App.Router.reopen({
  location: 'history'
});

App.Router.map(function() {
  this.resource('photos', function () {
    this.resource('photo', { path: 'photo/:photo_id' });
  });
  this.resource('albums');
  this.route('upload');
  this.route('registration');
});

App.RegistrationController = Ember.ObjectController.extend({
  email: null,
  name: null,
  username: null,
  password: null,

  actions: {
    create: function () {
      var registration = this.getProperties(['name', 'email', 'username', 'password']);
      var record = this.store.createRecord('registration', registration);
      record.save();
    }
  }
});