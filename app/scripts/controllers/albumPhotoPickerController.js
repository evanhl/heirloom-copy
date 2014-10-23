//= require selectableMixin
//= require ./basePhotoPickerModalController
App.AlbumPhotoPickerController = App.BasePhotoPickerModalController.extend({
  hasInput: false,
  title: function () {
    return Ember.I18n.t('photos.addToExistingAlbum');
  }.property(),

  completeDisabled: function () {
    return this.get('noneSelected');
  }.property('noneSelected', 'name')
});