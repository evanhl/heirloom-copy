//= require avatarPhoto
//= require apiModel

App.User = App.ApiModel.extend({
  id: Ember.attr(),
  name: Ember.attr(),
  username: Ember.attr(),
  email: Ember.attr(),
  avatar_photo: Ember.belongsTo(App.AvatarPhoto, { key: 'avatar_photo', embedded: true }),
  initials: function () {
    return Utils.getInitials(this.get('name'));
  }.property('name')
});

App.User.reopenClass({
  fromSession: function (session) {
    return this.create({
      name: session.get('name'),
      username: session.get('username'),
      email: session.get('email')
    });
  }
});

App.User.url = 'me';
App.User.adapter = App.APIAdapter.create({
  userNamespaced: false
});
