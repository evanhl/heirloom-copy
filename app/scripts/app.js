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

// Adapted from http://stackoverflow.com/a/10199338
Ember.Object.reopen({
  // allows us to get raw object from any Ember.Object so that we can serialize to localStorage
  getJson: function () {
    var v, ret = [];

    for (var key in this) {
      if (this.hasOwnProperty(key)) {
        v = this[key];

        if (v === 'toString') {
          continue;
        }

        if (Ember.typeOf(v) === 'function') {
          continue;
        }

        ret.push(key);
      }
    }

    return this.getProperties.apply(this, ret);
  }
});

// TODO: use deferReadiness for auth
var App = Ember.Application.create({
});

// TODO: abstract localStorage so that classes don't have to directly interact with it
App.Authorization = Ember.Object.extend({
  currentSession: (localStorage.getItem('currentSession') ? Ember.Object.create(JSON.parse(localStorage.getItem('currentSession'))) : null),
  authToken: Ember.computed.alias('currentSession.authentication_token'),

  isLoggedIn: function () {
    return !!this.get('authToken');
  }.property('authToken'),

  currentSessionChanged: function () {
    var self = this;

    Ember.$.ajaxPrefilter(function(options, originalOptions, jqXhr) {
      if (self.get('authToken')) {
        jqXhr.setRequestHeader("X-User-Token", self.get('authToken'));
      }
    });

    if (this.get('currentSession')) {
      localStorage.setItem('currentSession', JSON.stringify(this.get('currentSession').getJson()));
    } else {
      localStorage.removeItem('currentSession');
    }

  }.observes('currentSession').on('init')
});

App.set('auth', App.Authorization.create());
App.set('facebook', Utils.Facebook.create());

// Use HTML5 History API (pushState) to manage app URLs
App.Router.reopen({
  location: 'history'
});

App.Router.map(function () {
  this.resource('photoGroupings', { path: 'moments' }, function () {
    this.resource('photo', { path: ':photo_id' });
  });

  this.resource('albums');
  this.resource('album', { path: 'albums/:album_id' }, function () {
    this.resource('albumPhotos', { path: 'photos' }, function () {
      this.resource('albumPhoto', { path: ':photo_id' });
    });
  });
  this.resource('conversations', { path: 'groups' }, function () {
    this.route('create', { path: 'create' });
    this.resource('conversation', { path: ':conversation_id' }, function () {
      this.resource('conversationPosts', { path: 'posts' });
    });
  });
  this.resource('conversationInvitation', { path: 'conversation_invitations/:conversation_invitation_id' });
  this.resource('i', { path: 'i/:id' });

  this.resource('share', { path: 'share/:share_id' });
  this.resource('s', { path: 's/:id' });
  this.route('registration');
  this.route('signin');
  this.route('signout');
});

// TODO: remove temporary redirects once we remove fully qualified share and conversation_invitation URLs
App.IRoute = Ember.Route.extend({
  beforeModel: function (transition) {
    this.transitionTo('conversationInvitation', transition.params.i.id);
  }
});

App.SRoute = Ember.Route.extend({
  beforeModel: function (transition) {
    this.transitionTo('share', transition.params.s.id);
  }
});

CLDR.defaultLanguage = 'en-US';

