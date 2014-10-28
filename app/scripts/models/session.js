//= require ../adapters/apiAdapter

App.Session = Ember.Model.extend({
  login: Ember.attr(),
  password: Ember.attr(),
  authentication_token: Ember.attr(),
  name: Ember.attr(),
  username: Ember.attr(),
  initials: function () {
    return Utils.getInitials(this.get('name'));
  }.property('name')
});

App.Session.url = 'session';
App.Session.adapter = App.APIAdapter.create({
  userNamespaced: false
});
