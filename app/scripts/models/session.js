App.Session = Ember.Model.extend({
  login: Ember.attr(),
  password: Ember.attr(),
  authentication_token: Ember.attr(),
  name: Ember.attr(),
  username: Ember.attr()
});

App.Session.url = 'session';
App.Session.adapter = App.APIAdapter.create({
  userNamespaced: false
});
