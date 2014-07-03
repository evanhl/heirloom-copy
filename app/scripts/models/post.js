App.Post = Ember.Model.extend({
  id: Ember.attr(Number),
  message: Ember.attr()
});

App.Post.adapter = App.APIAdapter.create();
