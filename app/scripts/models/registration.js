App.Registration = Ember.Model.extend({
  name: Ember.attr(),
  username: Ember.attr(),
  email: Ember.attr(),
  password: Ember.attr(),
  authentication_token: Ember.attr()
});

App.Registration.url = 'registration';
App.Registration.adapter = App.APIAdapter.create({
  userNamespaced: false
});