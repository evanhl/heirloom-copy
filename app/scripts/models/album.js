//= require apiModel

App.Album = App.ApiModel.extend({
  id: Ember.attr(Number),
  name: Ember.attr(),
  cover_photo: Ember.belongsTo('App.Photo', { key: 'cover_photo', embedded: true }),
  photo_count: Ember.attr(Number),
  photo_ids: Ember.attr(),

  addPhotos: function (photoIds) {
    return this.postNested('photos', { photo_ids: photoIds });
  },

  removePhotos: function (photoIds) {
    return this.postNested('photos/delete', { photo_ids: photoIds });
  }
});

App.Album.url = 'albums';
App.Album.adapter = App.APIAdapter.create({
  userNamespaced: true
});
