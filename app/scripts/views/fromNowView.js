// from https://github.com/jgwhite/ember-time
App.FromNowView = Ember.View.extend({
  tagName: 'time',

  template: Ember.Handlebars.compile('{{view.output}}'),

  // REFRESH_MS: 30 * 1000,

  output: function() {
    return moment(this.get('value')).fromNow();
  }.property('value'),

  // This seems to cause performance issues on iPad

  // tick: function() {
  //   var nextTick = Ember.run.later(this, function() {
  //     this.notifyPropertyChange('value');
  //     this.tick();
  //   }, this.REFRESH_MS);
  //   this.set('nextTick', nextTick);
  // },

  // didInsertElement: function() {
  //   this.tick();
  // },

  // willDestroyElement: function() {
  //   var nextTick = this.get('nextTick');
  //   Ember.run.cancel(nextTick);
  // }
});

Ember.Handlebars.helper('fromNow', App.FromNowView);