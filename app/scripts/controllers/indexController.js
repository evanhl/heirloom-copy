App.IndexController = Ember.Controller.extend({
  actions: {
    hideVideo: function () {
      this.set('showVideo', false);
    },

    showVideo: function () {
      this.set('showVideo', true);
    }
  }
});

