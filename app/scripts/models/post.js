App.Post = Ember.Model.extend({
  id: Ember.attr(Number),
  owner: Ember.attr(),
  message: Ember.attr(),
  photos: Ember.hasMany('App.Photo', { key: 'photos', embedded: true }),
  photo_ids: Ember.attr(),
  like_count: Ember.attr(Number)
});

App.Post.url = 'posts';
App.Post.adapter = App.APIAdapter.create();
