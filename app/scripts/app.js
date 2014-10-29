/* jshint -W079 */
/* globals CLDR */

// Adapted from http://discuss.emberjs.com/t/emberconf-talk-disable-ember-eventhandlers-for-mobile/4877

(function () {
  var klass = Ember.EventDispatcher;
  var events = klass.proto().events;

  delete events.mousemove;
  delete events.mouseleave;
  delete events.mouseenter;
}());

// TODO: use deferReadiness for auth
var App = Ember.Application.create({
});

App.set('facebook', Utils.Facebook.create());

// Use HTML5 History API (pushState) to manage app URLs
App.Router.reopen({
  location: 'history',
  rootURL: HLConfig.rootURL || '/'
});

App.Router.map(function () {
  this.resource('photos', { path: 'moments' }, function () {
    this.resource('photo', { path: ':photo_id' });
  });

  this.resource('albums', function () {
    this.resource('album', { path: ':album_id' }, function () {
      this.resource('albumPhotos', { path: 'photos' }, function () {
        this.resource('albumPhoto', { path: ':photo_id' });
      });
    });
  });

  this.resource('conversations', { path: 'groups' }, function () {
    this.route('create', { path: 'create' });
    this.resource('conversation', { path: ':conversation_id' }, function () {
      this.resource('conversationPosts', { path: 'posts' });
    });
  });
  this.resource('conversationInvitation', { path: 'i/:conversation_invitation_id' });
  this.resource('ci', { path: 'conversation_invitations/:id' });

  this.resource('share', { path: 'share/:share_id' });
  this.resource('s', { path: 's/:id' });
  this.route('registration');
  this.route('signin');
  this.route('signout');
  this.route('resetPassword', { path: 'reset_password/:token' });
  this.route('resetPasswordSuccess', { path: 'reset_password/success' });
});

App.CiRoute = Ember.Route.extend({
  beforeModel: function (transition) {
    this.transitionTo('conversationInvitation', transition.params.ci.id);
  }
});

App.SRoute = Ember.Route.extend({
  beforeModel: function (transition) {
    this.transitionTo('share', transition.params.s.id);
  }
});

CLDR.defaultLanguage = 'en-US';

