App.ToolbarItemComponent = Ember.Component.extend({
  param: null,
  tagName: 'a',
  classNameBindings: [':toolbar-item', 'extraClasses'],
  attributeBindings: ['href'],
  href: 'javascript:void(0);',

  click: function (e) {
    this.sendAction('action', this.get('param'));
    e.preventDefault();
  }
});
