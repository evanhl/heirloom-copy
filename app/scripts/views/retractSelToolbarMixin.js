App.RetractSelToolbarMixin = Ember.Mixin.create({
  onSelectionModeChange: function () {
    var self = this;
    var $toolbar;

    if (this.get('controller.isSelectionMode')) {
      this.set('controller.showToolbar', true);
      this.set('controller.removingToolbar', false);
    } else {
      $toolbar = this.$('.selection-toolbar');

      if (!$toolbar) { return; }

      $toolbar.one('animationend oAnimationEnd webkitAnimationEnd', function () {
        self.set('controller.removingToolbar', false);
        self.set('controller.showToolbar', false);
      });
      this.set('controller.removingToolbar', true);
    }
  }.observes('controller.isSelectionMode')
});
