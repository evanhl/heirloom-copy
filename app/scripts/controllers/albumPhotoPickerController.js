//= require selectableMixin
//= require ./basePhotoPickerModalController
App.AlbumPhotoPickerController = App.BasePhotoPickerModalController.extend({
  hasInput: false,

  completeDisabled: function () {
    return this.get('noneSelected');
  }.property('noneSelected', 'name')
});