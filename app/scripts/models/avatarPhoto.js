//= require basePhoto

App.AvatarPhoto = App.BasePhoto.extend({
  xsVersion: function () {
    return this.versionForDimension('xs');
  }.property('versions'),

  xxsVersion: function () {
    return this.versionForDimension('xxs');
  }.property('versions')
});
