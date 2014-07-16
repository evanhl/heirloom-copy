App.Post = Ember.Model.extend({
  id: Ember.attr(Number),
  owner: Ember.attr(),
  message: Ember.attr()
});

App.Post.url = 'posts';
App.Post.adapter = App.APIAdapter.create();
