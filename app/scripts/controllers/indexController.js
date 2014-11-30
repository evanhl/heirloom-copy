App.IndexController = Ember.Controller.extend({
  actions: {
    hideVideo: function () {
      this.set('showVideo', false);
      this.set('showStoryVideo', false);
    },

    showVideo: function () {
      this.set('showVideo', true);
    },

    showStoryVideo: function () {
      this.set('showStoryVideo', true);
    }
  }
});

