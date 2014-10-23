//= require selectableMixin
//= require ./basePhotoPickerModalController
App.NewAlbumPhotoPickerController = App.BasePhotoPickerModalController.extend({
  hasInput: true,

  completeDisabled: function () {
    return this.get('noneSelected') || !this.get('name');
  }.property('noneSelected', 'name')
});