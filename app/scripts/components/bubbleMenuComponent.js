//= require registerableMixin

App.BubbleMenuComponent = Ember.Component.extend(App.RegisterableMixin, {
  tagName: 'ul',
  classNameBindings: [':bubble-menu', ':top', 'hidden'],
  showMenu: false,
  registerAs: null,

  setupListeners: function () {
    $('body').on('click.offShareMenu', $.proxy(this.bodyClick, this));
  }.on('didInsertElement'),

  bodyClick: function (e) {
    if(!$(e.target).closest(this.$().parent()).length) {
      if (this.get('controller') && this.get('showMenu')) {
        window.foo = 1000;
        this.set('showMenu', false);
      }
    }
  },

  cleanupListeners: function () {
    $('body').off('click.offShareMenu');
  }.on('willDestroyElement'),

  hidden: function () {
    return !this.get('showMenu');
  }.property('showMenu'),

  close: function () {
    this.set('showMenu', false);
  },

  toggle: function () {
    this.toggleProperty('showMenu');
  }
});
