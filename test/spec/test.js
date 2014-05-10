/* global describe, expect, it */
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
})();
