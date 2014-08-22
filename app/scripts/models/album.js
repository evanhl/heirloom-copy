App.Album = Ember.Model.extend({
  id: Ember.attr(Number),
  name: Ember.attr(),
  cover_photo: Ember.belongsTo('App.Photo', { key: 'cover_photo', embedded: true }),

  style: function () {
    var backgroundImage = '';

    if (this.get('cover_photo.versions.n.url')) {
      backgroundImage = 'background-image: url(' + this.get('cover_photo.versions.n.url') + ');';
    }

    return backgroundImage;

  }.property('cover_photo.versions.n.url')
});

App.Album.url = 'albums';
App.Album.adapter = App.APIAdapter.create({
  userNamespaced: true
});
