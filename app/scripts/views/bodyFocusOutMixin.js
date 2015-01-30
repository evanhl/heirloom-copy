App.BodyFocusOutMixin = Ember.Mixin.create({
  init: function () {
    this._super();
    Utils.bindMethods(this, ['onBodyClick']);
  },

  // TODO: body click handling is a really common pattern. This should be turned into a mixin
  registerBodyClick: function () {
    $('body').on('click', this.onBodyClick);
  }.on('didInsertElement'),

  unregisterBodyClick: function () {
    $('body').off('click', this.onBodyClick);
  }.on('willDestroyElement'),

  onBodyClick: function (e) {
    if (!$(e.target).closest(this.getDomSelf()).length) {
      this.onFocusOut();
    }
  },

  getDomSelf: function () {
    return this.$();
  },

  onFocusOut: function () {}
});