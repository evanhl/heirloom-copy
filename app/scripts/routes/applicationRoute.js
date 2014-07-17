App.ApplicationRoute = Ember.Route.extend({
  actions: {
    // modal behavior adapted from:
    // http://emberjs.com/guides/cookbook/user_interface_and_interaction/using_modal_dialogs/
    openModal: function (modalName) {
      return this.render(modalName, {
        into: 'application',
        outlet: 'modal'
      });
    },

    closeModal: function () {
      return this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    }
  }
});
