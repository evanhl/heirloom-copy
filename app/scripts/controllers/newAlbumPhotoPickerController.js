//= require selectableMixin
//= require ./basePhotoPickerModalController
App.NewAlbumPhotoPickerController = App.BasePhotoPickerModalController.extend({
  hasInput: true,
  title: function () {
    return Ember.I18n.t('photos.addToNewAlbum');
  }.property(),

  completeDisabled: function () {
    return this.get('noneSelected') || !this.get('name');
  }.property('noneSelected', 'name')
});