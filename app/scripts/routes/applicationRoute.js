App.ApplicationRoute = Ember.Route.extend({
  actions: {
    // modal behavior adapted from:
    // http://emberjs.com/guides/cookbook/user_interface_and_interaction/using_modal_dialogs/
    openModal: function (modalName, model) {
      var renderOpts = {
        into: 'application',
        outlet: 'modal'
      };

      if (model) {
        renderOpts.model = model;
      }

      return this.render(modalName, renderOpts);
    },

    closeModal: function () {
      return this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    }
  }
});
