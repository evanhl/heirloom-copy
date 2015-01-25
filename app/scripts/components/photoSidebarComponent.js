App.PhotoSidebarComponent = Ember.Component.extend({
  classNames: ['photo-sidebar'],
  editingDescription: false,
  editingDate: false,

  isDescriptionEdit: function () {
    return this.get('editingDescription') || (!this.get('photo.description') && !this.get('photo.hasBeenEdited'));
  }.property('editingDescription', 'photo.description', 'photo.hasBeenEdited'),

  isDateEdit: function () {
    return this.get('editingDate') || (this.get('photo.backdated_time.isBlank') && !this.get('photo.hasBeenEdited'));
  }.property('editingDate', 'photo.backdated_time.isBlank', 'photo.hasBeenEdited'),

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
    if (this.get('photo') && this.get('photo.isMetadataBlank')) {
      this.set('photo.hasBeenEdited', false);
    } else {
      this.set('photo.hasBeenEdited', true);
    }

    Ember.run.scheduleOnce('afterRender', this, function () {
      this.$('.description-field').trigger('autosize.resize');
    });
  }.observes('photo'),

  beforePhotoChange: function () {
    if (this.get('photo') && !this.get('photo.isMetadataBlank')) {
      this.set('photo.hasBeenEdited', true);
    }
  }.observesBefore('photo'),

  actions: {
    saveDescription: function () {
      var self = this;

      this.get('photo').patch({ description: this.get('photo.description') }).then(function () {
        self.set('editingDescription', false);
      });
    },

    editDate: function () {
      this.set('editingDate', true);
      this.onDateEdit();
    },

    saveDate: function () {
      var self = this;

      // TODO: figure out how to get backdated_time doesn't show up among the _dirtyAttributes
      // (since it's an Ember object and not a primitive)
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
