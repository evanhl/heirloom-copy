Ember.Inflector.inflector.uncountable('registration');

App.Registration = DS.Model.extend({
  name: DS.attr(),
  username: DS.attr(),
  email: DS.attr(),
  password: DS.attr(),
  authentication_token: DS.attr()
});
