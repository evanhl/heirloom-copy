/* global describe, expect, it, beforeEach, visit, afterEach, andThen */
/* global before, after, fillIn, click, find  */
/* jshint -W030 */

(function () {
  'use strict';

  var TestActions = {};
  var ApiMock = {};

  before(function () {
    this.timeout(4000);

    // prevents facebook API from loading
    window.FB = {};

    TestActions.signIn = function () {
      $.mockjax({
        url: 'https://api.hlstage.com/session',
        data: JSON.stringify({ login: 'foo', password: 'bar', avatar_photo: null }),
        type: 'POST',
        responseText: {
          'id': 11022,
          'username': 'savion_brown',
          'name': 'Alf Wintheiser Sr.',
          'email': 'jayne@dooley.info',
          'authentication_token': 'tuoo6XoHzTR3Npzp8xRw'
        }
      });

      visit('signin');
      fillIn('.login', 'foo');
      fillIn('.password', 'bar');
      click('button.signin');
    };

    TestActions.resetAppState = function () {
      App.reset();
      $.mockjaxClear();
    };

    (function () {
      var counter = 0;

      ApiMock.genUniqId = function () {
        return counter++;
      };
    })();

    ApiMock.PHOTO_VERSIONS = ['full', 'n', 's', 'xs'];
    ApiMock.genPhotoVersions = function (id) {
      var versions = {};

      ApiMock.PHOTO_VERSIONS.forEach(function (version) {
        versions[version] = {
          url: [window.location.protocol, '/', version, '-', id, '.jpg'].join('')
        };
      });

      return versions;
    };

    ApiMock.createPhotoJson = function () {
      var id = ApiMock.genUniqId();

      return {
        id: id,
        versions: ApiMock.genPhotoVersions(id),
        state: 'ready'
      };
    };

    ApiMock.createPhotosJson = function (n) {
      var json = [];

      for (var i = 0; i < n; i++) {
        json.push(ApiMock.createPhotoJson());
      }

      return json;
    };
  });

  after(function () {
    TestActions.resetAppState();
  });


  describe('Dependencies', function () {
    it('should have loaded Handlebars', function () {
      expect(Handlebars).to.exist;
    });

    it('should have loaded jQuery', function () {
      expect(jQuery).to.exist;
      expect($).to.exist;
    });

    it('should have loaded Ember', function () {
      expect(Ember).to.exist;
    });
  });

  describe('Sign In', function () {

    describe('on successful sign in', function () {
      before(function () {
        $.mockjax({
          url: 'https://api.hlstage.com/me/photos',
          responseText: []
        });

        $.mockjax({
          url: 'https://api.hlstage.com/me/conversations_summary',
          responseText: []
        });

        TestActions.signIn();
      });

      it('is logged in', function () {
        expect(App.get('auth.isLoggedIn')).to.be.true;
      });

      it('has the right auth token', function () {
        expect(App.get('auth.authToken')).to.equal('tuoo6XoHzTR3Npzp8xRw');
      });

      it('has the right session', function () {
        expect(App.get('auth.currentSession.name')).to.equal('Alf Wintheiser Sr.');
      });

      it('stores auth token and name in Basil', function () {
        var session = JSON.parse(App.get('basil').get('currentSession'));

        expect(session.authentication_token).to.equal('tuoo6XoHzTR3Npzp8xRw');
        expect(session.name).to.equal('Alf Wintheiser Sr.');
      });

      it('user\'s username is rendered', function () {
        expect(find('nav .username').text().trim()).to.equal('savion_brown');
      });

      describe('and subsequent sign out', function () {
        before(function () {
          $.mockjax({
            type: 'delete',
            url: 'https://api.hlstage.com/session',
            responseText: null,
            status: 204
          });

          click('nav .signout');
        });

        it('is logged out', function () {
          expect(App.get('auth.isLoggedIn')).to.be.false;
        });

        it('clears session from Basil', function () {
          expect(App.get('basil').get('currentSession')).to.be.null;
        });

        it('photos and albums link are not rendered', function () {
          expect(find('nav .photos')[0]).to.not.exist;
          expect(find('nav .albums')[0]).to.not.exist;
        });
      });
    });

    describe('Sign Up', function () {
      before(function () {
        $.mockjax({
          url: 'https://api.hlstage.com/registration',
          type: 'post',
          // TODO: remove parameter order dependency
          data: JSON.stringify({
            name: 'Big Bird',
            username: 'bigbird123',
            password: 'b1gb1rd',
            email: 'abc@example.com',
            avatar_photo: null
          }),
          responseText: {
            name: 'Big Bird',
            email: 'abc@example.com',
            username: 'bigbird123',
            password: 'b1gb1rd',
            authentication_token: 'tuoo6XoHzTR3Npzp8xRw'
          }
        });

        $.mockjax({
          url: 'https://api.hlstage.com/me/photos',
          responseText: []
        });

        $.mockjax({
          url: 'https://api.hlstage.com/me/conversations_summary',
          responseText: []
        });

        visit('registration');
        fillIn('.name', 'Big Bird');
        fillIn('.email', 'abc@example.com');
        fillIn('.username', 'bigbird123');
        fillIn('.password', 'b1gb1rd');
        click('button.signup');
      });

      it('is logged in', function () {
        expect(App.get('auth.isLoggedIn')).to.be.true;
      });

      it('has the right auth token', function () {
        expect(App.get('auth.authToken')).to.equal('tuoo6XoHzTR3Npzp8xRw');
      });

      it('has the right session', function () {
        expect(App.get('auth.currentSession.name')).to.equal('Big Bird');
      });

      it('stores auth token and name in Basil', function () {
        var session = JSON.parse(App.get('basil').get('currentSession'));

        expect(session.authentication_token).to.equal('tuoo6XoHzTR3Npzp8xRw');
        expect(session.name).to.equal('Big Bird');
      });

      it('photos and albums link are rendered', function () {
        expect(find('nav .photos')[0]).to.exist;
        expect(find('nav .albums')[0]).to.exist;
        expect(find('nav .signout')[0]).to.exist;
      });

      it('user\'s username is rendered', function () {
        expect(find('nav .username').text().trim()).to.equal('bigbird123');
      });

    });

    describe('Moments', function () {
      before(function () {
        TestActions.resetAppState();

        $.mockjax({
          url: 'https://api.hlstage.com/me/conversations_summary',
          responseText: []
        });

        $.mockjax({
          url: 'https://api.hlstage.com/me/photos',
          data: {
            per_page: 40,
            page: 1
          },
          responseText: ApiMock.createPhotosJson(40)
        });

        TestActions.signIn();

        // we should already be in moments, but just to be sure
        visit('/moments');
      });

      it('doesn\'t error', function () {});

      it('renders 40 photos', function () {
        expect(find('.photos-container')).to.exist;
        expect(find('.photo').size()).to.equal(40);
      });
    });
  });
})();
