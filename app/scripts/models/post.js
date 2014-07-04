App.Post = Ember.Model.extend({
  id: Ember.attr(Number),
  message: Ember.attr()
});

App.Post.url = 'posts';
App.Post.adapter = App.APIAdapter.create();
