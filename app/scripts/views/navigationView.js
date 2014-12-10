App.NavigationView = Ember.View.extend({
  isMenuOpen: undefined,
  menuClass: function () {
    if (this.get('isMenuOpen') === true) {
      return 'menu-open';
    } else if (this.get('isMenuOpen') === false) {
      return 'menu-closed';
    }
  }.property('isMenuOpen'),

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
    if(!$(e.target).closest(this.$('.username,.down-arrow')).length) {
      if (this.get('controller') && this.get('isMenuOpen') === true) {
        this.set('isMenuOpen', false);
      }
    }
  },

  usernameClick: function (e) {
    this.toggleProperty('isMenuOpen');
  }
});
