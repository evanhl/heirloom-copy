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
    beforeEach(function() {
      visit('signin');
    });

    afterEach(function () {
      App.reset();
    });

    it('did render template', function () {
      // TODO: this is a trivial test. replace with something more substantive
      andThen(function () {
        expect($('#ember-fixture h1:eq(1)').text()).to.eql('Sign In');
      });
    });
  });
})();
