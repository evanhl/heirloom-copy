/* global describe, expect, it, beforeEach, visit, afterEach, andThen */
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
  });

  describe('Sign In', function () {
    afterEach(function () {
      App.reset();
    });

    after(function () {
      $.mockjaxClear();
    });

    describe('on successful sign in', function () {
      before(function () {
        visit('signin');

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

        fillIn('.login', 'foo');
        fillIn('.password', 'bar');
        click('.signin');
      });

      it('is logged in', function () {
        andThen(function () {
          expect(App.get('auth.isLoggedIn')).to.be.true;
        });
      });

      it('has the right auth token', function () {
        andThen(function () {
          expect(App.get('auth.authToken')).to.equal('tuoo6XoHzTR3Npzp8xRw');
        });
      });

      it('has the right session', function () {
        andThen(function () {
          expect(App.get('auth.currentSession.name')).to.equal('Alf Wintheiser Sr.');
        });
      });
    });
  });
})();
