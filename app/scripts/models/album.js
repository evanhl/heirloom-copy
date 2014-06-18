App.Album = DS.Model.extend({
  name: DS.attr(),
  cover_photo: DS.attr(),

  style: function () {
    var backgroundImage = '';

    if (this.get('cover_photo.versions.n.url')) {
      backgroundImage = 'background-image: url(' + this.get('cover_photo.versions.n.url') + ');';
    }

    return backgroundImage;

  }.property('cover_photo.versions.n.url')
});
