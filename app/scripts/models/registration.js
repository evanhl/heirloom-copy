//= require session
App.Registration = App.Session.extend({
  email: Ember.attr()
});

App.Registration.url = 'registration';
App.Registration.adapter = App.APIAdapter.create({
  userNamespaced: false
});