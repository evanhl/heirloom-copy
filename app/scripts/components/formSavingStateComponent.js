App.FormSavingStateComponent = Ember.Component.extend({
  tagName: 'label',
  classNameBindings: ['saving', 'saved', ':saving-state']
});
