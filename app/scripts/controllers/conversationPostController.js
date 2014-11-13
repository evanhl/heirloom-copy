App.ConversationPostController = Ember.ObjectController.extend({
  DEFAULT_MAX_PER_ROW: 3,
  photosLimit: function () {
    return this.get('maxPerRow') || this.DEFAULT_MAX_PER_ROW;
  }.property('maxPerRow'),
  maxPerRow: null,

  mosaicClass: function () {
    var leftoversLength = Math.max(this.get('photos.length') - this.get('photosLimit') + 1, 0);

    if (leftoversLength === 2) {
      return 'mosaic-2';
    } else if (leftoversLength === 3) {
      return 'mosaic-3';
    } else if (leftoversLength >= 4) {
      return 'mosaic-4';
    }
  }.property('photos.length', 'photosLimit'),

  hasMosaic: function () {
    return this.get('photos.length') >= this.get('photosLimit');
  }.property('photos.length', 'photosLimit'),

  fullPhotos: function () {
    var max;

    if (this.get('hasMosaic')) {
      return this.get('photos').slice(0, this.get('photosLimit') - 1);
    } else {
      return this.get('photos');
    }
  }.property('photos.[]', 'photosLimit'),

  mosaicPhotos: function () {
    return this.get('photos').slice(this.get('photosLimit') - 1, this.get('photosLimit') + 3);
  }.property('photos.[]', 'photosLimit')
});