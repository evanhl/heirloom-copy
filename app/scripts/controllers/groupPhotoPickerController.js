//= require selectableMixin
//= require ./basePhotoPickerModalController
App.GroupPhotoPickerController = App.BasePhotoPickerModalController.extend({
  hasInput: false,
  title: function () {
    return 'baller';
  }.property(),

  completeDisabled: function () {
    return this.get('noneSelected');
  }.property('noneSelected')
});