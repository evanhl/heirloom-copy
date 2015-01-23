App.PhotoSidebarComponent = Ember.Component.extend({
  classNames: ['photo-sidebar'],
  editingDescription: false,
  editingDate: false,

  isDescriptionEdit: function () {
    return this.get('editingDescription') || !this.get('photo.anyMetadata');
  }.property('editingDescription', 'photo.anyMetadata'),

  isDateEdit: function () {
    return this.get('editingDate') || !this.get('photo.anyMetadata');
  }.property('editingDate', 'photo.anyMetadata'),

  onDescriptionEdit: function () {
    var $field;

    Ember.run.scheduleOnce('afterRender', this, function () {
      $field = this.$('.description-field');
      if ($field) {
        $field.focus();
      }
    });
  },

  onDateEdit: function () {
    this.get('fuzzyDate').enterAndFocus();
  },

  autosize: function () {
    Ember.run.scheduleOnce('afterRender', this, function () {
      this.$('.description-field').autosize();
    });
  }.on('didInsertElement'),

  onPhotoChange: function () {
    Ember.run.scheduleOnce('afterRender', this, function () {
      this.$('.description-field').trigger('autosize.resize');
    });
  }.observes('photo.description'),

  actions: {
    saveDescription: function () {
      var self = this;

      this.get('photo').patch().then(function () {
        self.set('editingDescription', false);
      });
    },

    editDate: function () {
      this.set('editingDate', true);
      this.onDateEdit();
    },

    saveDate: function () {
      var self = this;

      this.get('photo').patch({ backdated_time: this.get('photo.backdated_time').toJSON() }).then(function () {
        self.set('editingDate', false);
      });
    },

    focusDescription: function () {
      this.set('editingDescription', true);
    },

    focusDate: function () {
      this.set('editingDate', true);
    },

    editDescription: function () {
      this.set('editingDescription', true);
      this.onDescriptionEdit();
    }
  }
});
