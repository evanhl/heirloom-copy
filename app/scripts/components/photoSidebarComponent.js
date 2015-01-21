App.PhotoSidebarComponent = Ember.Component.extend({
  editingDescription: false,
  isDescriptionEdit: function () {
    return this.get('editingDescription') || !this.get('photo.anyMetadata');
  }.property('editingDescription', 'photo.anyMetadata'),

  onDescriptionEdit: function () {
    var $field;

    Ember.run.scheduleOnce('afterRender', this, function () {
      $field = this.$('.description-field');
      if ($field) {
        $field.focus();
      }
    });
  },

  actions: {
    saveDescription: function () {
      var self = this;

      this.get('photo').patch().then(function () {
        self.set('editingDescription', false);
      });
    },

    focusDescription: function () {
      this.set('editingDescription', true);
    },

    editDescription: function () {
      this.set('editingDescription', true);
      this.onDescriptionEdit();
    }
  }
});
