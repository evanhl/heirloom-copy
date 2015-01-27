/* jshint -W079 */

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
App.set('analytics', Utils.GoogleAnalytics);
App.set('locationSearch', Utils.LocationSearch.create());

// Use HTML5 History API (pushState) to manage app URLs
App.Router.reopen({
  location: 'history',
  rootURL: HLConfig.rootURL || '/',
  notifyGoogleAnalytics: function () {
    if (!window.ga) { return; }

    return window.ga('send', 'pageview', {
        'page': this.get('url'),
        'title': this.get('url')
      });
  }.on('didTransition')
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
      this.resource('conversationPosts', { path: 'posts' }, function () {
        this.resource('conversationPostPhoto', { path: 'photos/:photo_id' });
      });
    });
  });
  this.resource('conversationInvitation', { path: 'i/:conversation_invitation_id' });
  this.resource('ci', { path: 'conversation_invitations/:id' });

  this.resource('longShare', { path: 'share/:id' });
  this.resource('share', { path: 's/:share_id' }, function () {
    this.resource('sharePhoto', { path: 'photos/:photo_id' });
  });
  this.route('closeWindow');
  this.route('home');
  this.route('registration');
  this.route('signin');
  this.route('signout');
  this.route('forgotPassword', { path: 'forgot_password' });
  this.route('resetPassword', { path: 'reset_password/:token' });
  this.route('resetPasswordSuccess', { path: 'reset_password/success' });
});

App.CiRoute = Ember.Route.extend({
  beforeModel: function (transition) {
    this.transitionTo('conversationInvitation', transition.params.ci.id);
  }
});

App.LongShareRoute = Ember.Route.extend({
  beforeModel: function (transition) {
    this.transitionTo('share', transition.params.longShare.id);
  }
});

App.set('basil', new window.Basil({
  namespace: 'heirloom',
  storages: ['local', 'session', 'cookie'],
  storage: 'local'
}));

Em.I18n.locale = 'en';

// fix for iPad viewport height issue.
// http://stackoverflow.com/questions/19012135/ios-7-ipad-safari-landscape-innerheight-outerheight-layout-issue
if (navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i)) {
  $('html').addClass('ipad ios7');
}
