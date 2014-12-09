App.NavigationView = Ember.View.extend({
  isMenuOpen: false,

  init: function () {
    this.usernameClick = $.proxy(this.usernameClick, this);
    this.bodyClick = $.proxy(this.bodyClick, this);
    this._super();
  },

  setupHandlers: function () {
    var self = this;

    this.$('.username').on('touchend', this.usernameClick);
    $('body').click(this.bodyClick);
  }.on('didInsertElement'),

  teardownHandlers: function () {
    var $username = this.$('.username');

    if ($username) {
      $username.off('touchend', this.usernameClick);
    }

    $('body').off('click', this.bodyClick);
  },

  bodyClick: function (e) {
    if(!$(e.target).closest(this.$('.menu')).length) {
      if (this.get('controller')) {
        this.set('isMenuOpen', false);
      }
    }
  },

  usernameClick: function (e) {
    this.toggleProperty('isMenuOpen');
  }
});
