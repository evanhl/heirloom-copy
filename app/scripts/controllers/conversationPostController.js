App.ConversationPostController = Ember.ObjectController.extend({
  firstPhoto: function () {
    return this.get('photos').objectAt(0);
  }.property('photos')
});