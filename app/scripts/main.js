/* jshint -W079 */

var App = Ember.Application.create({});

// Use HTML5 History API (pushState) to manage app URLs
App.Router.reopen({
  location: 'history'
});

App.Router.map(function() {
  this.resource('photos', function () {
    this.resource('photo', { path: 'photo/:photo_id' });
  });
  this.resource('albums');
  this.route('upload');
});

// didInsertElement gets called after root is inserted, not necessarily after template has fully rendered
Ember.View.reopen({
  didInsertElement: function () {
    this._super();
    Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
  },
  afterRenderEvent: function () {
    // implement this hook in your own subclasses and run your jQuery logic there
  }
});