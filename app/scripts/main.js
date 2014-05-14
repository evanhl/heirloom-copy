var App = Ember.Application.create({});

App.Router.map(function() {
  this.resource('gallery');
  this.resource('albums');
});