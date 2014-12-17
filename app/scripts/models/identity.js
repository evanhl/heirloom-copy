//= require apiModel

App.Identity = App.ApiModel.extend({
  provider: Ember.attr(),
  token: Ember.attr()
});

App.Identity.url = 'identities';
App.Identity.adapter = App.APIAdapter.create({
  userNamespaced: false
});
