(function () {
  var getMixinParams = function (methodName, showToolbarProperty, removingToolbarProperty, modeProperty,
                                 toolbarSelector, cleanupMethodName) {
    var mixinParams = {};

    mixinParams[methodName] = function () {
      var self = this;
      var $toolbar;

      if (this.get(modeProperty)) {
        this.set(showToolbarProperty, true);
        this.set(removingToolbarProperty, false);
      } else {
        $toolbar = this.$(toolbarSelector);

        if (!$toolbar) { return; }

        $toolbar.one('animationend oAnimationEnd webkitAnimationEnd', function () {
          self.set(removingToolbarProperty, false);
          self.set(showToolbarProperty, false);
        });
        this.set(removingToolbarProperty, true);
      }
    }.observes(modeProperty);

    mixinParams[cleanupMethodName] = function () {
      this.set(showToolbarProperty, false);
      this.set(removingToolbarProperty, false);
    }.on('willDestroyElement');

    return mixinParams;
  };


  App.RetractSelToolbarMixin = Ember.Mixin.create(getMixinParams(
    'onSelectionModeChange',
    'controller.showToolbar',
    'controller.removingToolbar',
    'controller.isSelectionMode',
    '.selection-toolbar',
    'cleanupSelToolbar'
  ));

  App.RetractChangeCoverToolbarMixin = Ember.Mixin.create(getMixinParams(
    'onCcModeChange',
    'controller.showCcToolbar',
    'controller.removingCcToolbar',
    'controller.isCcMode',
    '.change-cover-toolbar',
    'cleanupCcToolbar'
  ));
})();


