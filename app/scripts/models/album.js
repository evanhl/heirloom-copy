App.Album = Ember.Model.extend({
  id: Ember.attr(Number),
  name: Ember.attr(),
  cover_photo: Ember.belongsTo('App.Photo', { key: 'cover_photo', embedded: true }),
  photo_count: Ember.attr(Number),
});

App.Album.url = 'albums';
App.Album.adapter = App.APIAdapter.create({
  userNamespaced: true
});
