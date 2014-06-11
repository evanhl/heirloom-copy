Ember.Inflector.inflector.uncountable('session');

App.Session = DS.Model.extend({
  login: DS.attr(),
  password: DS.attr(),
  authentication_token: DS.attr(),
  name: DS.attr(),
  username: DS.attr()
});
