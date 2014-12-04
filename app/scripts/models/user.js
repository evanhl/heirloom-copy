//= require avatarPhoto

App.User = Ember.Model.extend({
  id: Ember.attr(),
  name: Ember.attr(),
  username: Ember.attr(),
  avatar_photo: Ember.belongsTo(App.AvatarPhoto, { key: 'avatar_photo', embedded: true }),
  initials: function () {
    return Utils.getInitials(this.get('name'));
  }.property('name')
});