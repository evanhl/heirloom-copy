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
    },

    willTransition: function (transition) {
      if (transition.targetName === 'photos.index') {
        App.get('analytics').trackEvent('Nav.Actions.moments');
      } else if (transition.targetName === 'albums.index') {
        App.get('analytics').trackEvent('Nav.Actions.albums');
      } else if (transition.targetName === 'conversations.index') {
        App.get('analytics').trackEvent('Nav.Actions.groups');
      }
    }
  },
});
