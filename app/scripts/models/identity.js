App.Identity = Ember.Model.extend({
  provider: Ember.attr(),
  token: Ember.attr()
});

App.Identity.url = 'identities';
App.Identity.adapter = App.APIAdapter.create({
  userNamespaced: false
});
