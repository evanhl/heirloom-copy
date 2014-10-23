(function () {
  var getMixinParams = function (methodName, showToolbarProperty, removingToolbarProperty, modeProperty, toolbarSelector) {
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

    return mixinParams;
  };


  App.RetractSelToolbarMixin = Ember.Mixin.create(getMixinParams(
    'onSelectionModeChange',
    'controller.showToolbar',
    'controller.removingToolbar',
    'controller.isSelectionMode',
    '.selection-toolbar'
  ));

  App.RetractChangeCoverToolbarMixin = Ember.Mixin.create(getMixinParams(
    'onCcModeChange',
    'controller.showCcToolbar',
    'controller.removingCcToolbar',
    'controller.isCcMode',
    '.change-cover-toolbar'
  ));
})();


