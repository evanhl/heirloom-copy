/* global describe, expect, it, beforeEach, visit, afterEach, andThen */
/* global before, after, fillIn, click, find  */
/* jshint -W030 */

(function () {
  'use strict';

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

    it('should have loaded Basil', function () {
      expect(Basil).to.exist;
    });
  });

  describe('Sign In', function () {
    this.timeout(4000);
    after(function () {
      // wrap in Ember run loop to eliminate race condition
      // andThen(function () {
        App.reset();
        $.mockjaxClear();
      // });
    });

    describe('on successful sign in', function () {
      before(function () {
        // wrap AJAX mocking in Ember run loop to eliminate race condition
        // andThen(function () {
          // prevents facebook API from loading
          window.FB = {};

          $.mockjax({
            url: 'https://api.hlstage.com/session',
            data: JSON.stringify({ login: 'foo', password: 'bar' }),
            responseText: {
              'id': 11022,
              'username': 'savion_brown',
              'name': 'Alf Wintheiser Sr.',
              'email': 'jayne@dooley.info',
              'authentication_token': 'tuoo6XoHzTR3Npzp8xRw'
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
        // });

        visit('signin');
        fillIn('.login', 'foo');
        fillIn('.password', 'bar');
        click('button.signin');
      });

      it('is logged in', function () {
        // andThen(function () {
          expect(App.get('auth.isLoggedIn')).to.be.true;
        // });
      });

      it('has the right auth token', function () {
        // andThen(function () {
          expect(App.get('auth.authToken')).to.equal('tuoo6XoHzTR3Npzp8xRw');
        // });
      });

      it('has the right session', function () {
        // andThen(function () {
          expect(App.get('auth.currentSession.name')).to.equal('Alf Wintheiser Sr.');
        // });
      });

      it('stores auth token and name in Basil', function () {
        // andThen(function () {
          var session = JSON.parse(App.get('basil').get('currentSession'));

          expect(session.authentication_token).to.equal('tuoo6XoHzTR3Npzp8xRw');
          expect(session.name).to.equal('Alf Wintheiser Sr.');
        // });
      });

      it('user\'s username is rendered', function () {
        // andThen(function () {
          expect(find('nav .username').text().trim()).to.equal('savion_brown');
        // });
      });

      describe('and subsequent sign out', function () {
        before(function () {
          // andThen(function () {
            $.mockjax({
              type: 'delete',
              url: 'https://api.hlstage.com/session',
              responseText: null,
              status: 204
            });
          // });

          click('nav .signout');
        });

        it('is logged out', function () {
          // andThen(function () {
            expect(App.get('auth.isLoggedIn')).to.be.false;
          // });
        });

        it('clears session from Basil', function () {
          // andThen(function () {
            expect(App.get('basil').get('currentSession')).to.be.null;
          // });
        });

        it('photos and albums link are not rendered', function () {
          // andThen(function () {
            expect(find('nav .photos')[0]).to.not.exist;
            expect(find('nav .albums')[0]).to.not.exist;
          // });
        });
      });
    });

    describe('Sign Up', function () {
      before(function () {
        // andThen(function () {
          $.mockjax({
            url: 'https://api.hlstage.com/registration',
            type: 'post',
            // TODO: remove parameter order dependency
            data: JSON.stringify({
              password: 'b1gb1rd',
              name: 'Big Bird',
              username: 'bigbird123',
              email: 'abc@example.com'
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
        // });

        visit('registration');
        fillIn('.name', 'Big Bird');
        fillIn('.email', 'abc@example.com');
        fillIn('.username', 'bigbird123');
        fillIn('.password', 'b1gb1rd');
        click('button.signup');
      });

      it('is logged in', function () {
        // andThen(function () {
          expect(App.get('auth.isLoggedIn')).to.be.true;
        // });
      });

      it('has the right auth token', function () {
        // andThen(function () {
          expect(App.get('auth.authToken')).to.equal('tuoo6XoHzTR3Npzp8xRw');
        // });
      });

      it('has the right session', function () {
        // andThen(function () {
          expect(App.get('auth.currentSession.name')).to.equal('Big Bird');
        // });
      });

      it('stores auth token and name in Basil', function () {
        // andThen(function () {
          var session = JSON.parse(App.get('basil').get('currentSession'));

          expect(session.authentication_token).to.equal('tuoo6XoHzTR3Npzp8xRw');
          expect(session.name).to.equal('Big Bird');
        // });
      });

      it('photos and albums link are rendered', function () {
        // andThen(function () {
          expect(find('nav .photos')[0]).to.exist;
          expect(find('nav .albums')[0]).to.exist;
          expect(find('nav .signout')[0]).to.exist;
        // });
      });

      it('user\'s username is rendered', function () {
        // andThen(function () {
          expect(find('nav .username').text().trim()).to.equal('bigbird123');
        // });
      });
    });
  });

  describe('Sign In', function () {

  });
})();
