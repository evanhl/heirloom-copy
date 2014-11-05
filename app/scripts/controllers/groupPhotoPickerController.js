//= require selectableMixin
//= require ./basePhotoPickerModalController
App.GroupPhotoPickerController = App.BasePhotoPickerModalController.extend({
  hasInput: false,
  title: function () {
    return Ember.I18n.t('conversations.addPhotos');
  }.property(),

  completeDisabled: function () {
    return this.get('noneSelected');
  }.property('noneSelected')
});