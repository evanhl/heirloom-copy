//= require albumPickerController

App.GroupAlbumPickerController = App.AlbumPickerController.extend({
  title: function () {
    return Ember.I18n.t('conversations.addAlbum');
  }.property(),

  canCreateAlbum: function () {
    return false;
  }.property()
});