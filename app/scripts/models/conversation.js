//= require apiModel
//= require user

App.Conversation = App.ApiModel.extend({
  id: Ember.attr(Number),
  name: Ember.attr(),
  owner: Ember.belongsTo(App.User, { key: 'owner', embedded: true }),
  is_owner: Ember.attr(Boolean),
  policy: Ember.attr(),
  has_unread: Ember.attr(Boolean),
  last_post_at: Ember.attr(Date),
  created_at: Ember.attr(Date),
  updated_at: Ember.attr(Date),
  contacts: Ember.attr(),
  member_count: 0,

  markAsRead: function () {
    return this.postNested('read');
  },

  fetchPostsPage: function (page, perPage) {
    var params = {
      page: page,
      per_page: perPage
    };

    return this.findNestedQuery(App.Post, 'posts', params);
  },

  fetchInvitations: function () {
    return this.findNestedQuery(App.ConversationInvitation, 'invitations');
  }
});

App.Conversation.url = 'conversations';
App.Conversation.adapter = App.APIAdapter.create({
  userNamespaced: true
});
