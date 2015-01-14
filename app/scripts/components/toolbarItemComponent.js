App.ToolbarItemComponent = Ember.Component.extend({
  param: null,
  classNames: ['toolbar-item'],

  click: function (e) {
    this.sendAction('action', this.get('param'));
    return false;
  }
});
