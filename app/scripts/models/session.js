//= require ../adapters/apiAdapter

App.Session = Ember.Model.extend({
  login: Ember.attr(),
  password: Ember.attr(),
  authentication_token: Ember.attr(),
  name: Ember.attr(),
  username: Ember.attr(),
  initials: function () {
    var name = this.get('name') || '';
    var firstInitials = name.split(' ').map(function (split) {
      if (split && split[0])  {
        return split[0];
      } else {
        return '';
      }
    });

    return firstInitials[0] + (firstInitials[1] || '');
  }.property('name')
});

App.Session.url = 'session';
App.Session.adapter = App.APIAdapter.create({
  userNamespaced: false
});
