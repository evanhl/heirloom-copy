App.Comment = Ember.Model.extend({
  id: Ember.attr(Number),
  message: Ember.attr(),
  owner: Ember.attr()
});

App.Comment.adapter = App.APIAdapter.create({
  userNamespaced: false
});
