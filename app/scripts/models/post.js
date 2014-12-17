//= require user
//= require apiModel

App.Post = App.ApiModel.extend({
  id: Ember.attr(Number),
  owner: Ember.belongsTo(App.User, { key: 'owner', embedded: true }),
  message: Ember.attr(),
  photos: Ember.hasMany('App.PostPhoto', { key: 'photos', embedded: true }),
  photo_ids: Ember.attr(),
  album_id: Ember.attr(),
  like_count: Ember.attr(Number),
  created_at: Ember.attr(Date),
  load: function (id, hash) {
    // decorate photo models with post ID
    if (hash.photos) {
      hash.photos.forEach(function (photo) {
        photo.id = hash.id + '-' + photo.id;
      });
    }

    this._super(id, hash);
  }
});

App.Post.url = 'posts';
App.Post.adapter = App.APIAdapter.create();

