App.Post = Ember.Model.extend({
  id: Ember.attr(Number),
  owner: Ember.belongsTo(App.Session, { key: 'owner', embedded: true }),
  message: Ember.attr(),
  photos: Ember.hasMany('App.Photo', { key: 'photos', embedded: true }),
  photo_ids: Ember.attr(),
  album_id: Ember.attr(),
  like_count: Ember.attr(Number),
  created_at: Ember.attr(Date)
});

App.Post.url = 'posts';
App.Post.adapter = App.APIAdapter.create();
