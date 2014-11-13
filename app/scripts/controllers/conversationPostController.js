App.ConversationPostController = Ember.ObjectController.extend({
  imageLimit: 2,

  mosaicClass: function () {
    var leftoversLength = Math.max(this.get('photos.length') - this.get('imageLimit'), 0);

    if (leftoversLength === 2) {
      return 'mosaic-2';
    } else if (leftoversLength >= 3) {
      return 'mosaic-3';
    }
  }.property('photos.length', 'imageLimit'),

  hasMosaic: function () {
    return this.get('photos.length') > this.get('imageLimit');
  }.property('photos.length', 'imageLimit'),

  fullPhotos: function () {
    var max;

    if (this.get('hasMosaic')) {
      return this.get('photos').slice(0, this.get('imageLimit'));
    } else {
      return this.get('photos');
    }
  }.property('photos.[]', 'imageLimit'),

  mosaicPhotos: function () {
    return this.get('photos').slice(this.get('imageLimit'), this.get('imageLimit') + 3);
  }.property('photos.[]', 'imageLimit')
});