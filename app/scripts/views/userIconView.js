App.UserIconView = Ember.View.extend({
  classNameBindings: ['avatar_photo:avatar', 'avatar_photo::icon'],
  attributeBindings: ['name:alt', 'name:title'],
  name: Ember.computed.alias('controller.name'),
  avatar_photo: Ember.computed.alias('controller.avatar_photo'),
  avatarUrl: function () {
    if (this.iconSize === "xs") {
      return this.get('controller.avatar_photo.xsVersion');
    } else {
      return this.get('controller.avatar_photo.xxsVersion');
    }
  }.property('controller.avatar_photo')
});
