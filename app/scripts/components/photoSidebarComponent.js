App.PhotoSidebarComponent = Ember.Component.extend({
  classNames: ['photo-sidebar'],
  photo: null,
  editingDescription: false,
  editingDate: false,
  editingLocation: false,

  isDescriptionEdit: function () {
    return this.get('editingDescription') || (!this.get('photo.description') && !this.get('photo.hasBeenEdited'));
  }.property('editingDescription', 'photo.description', 'photo.hasBeenEdited'),

  isDateEdit: function () {
    return this.get('editingDate') || (this.get('photo.backdated_time.isBlank') && !this.get('photo.hasBeenEdited'));
  }.property('editingDate', 'photo.backdated_time.isBlank', 'photo.hasBeenEdited'),

  isLocationEdit: function () {
    return this.get('editingLocation') || (!this.get('photo.location') && !this.get('photo.hasBeenEdited'));
  }.property('editingLocation', 'photo.location', 'photo.hasBeenEdited'),

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

  onLocationEdit: function () {
    this.get('locationSearch').enterAndFocus();
  },

  onPhotoChange: function () {
    if (this.get('photo') && this.get('photo.isMetadataBlank')) {
      this.set('photo.hasBeenEdited', false);
    } else {
      this.set('photo.hasBeenEdited', true);
    }
  }.observes('photo', 'photo.isLoaded'),

  onDescriptionChange: function () {
    Ember.run.scheduleOnce('afterRender', this, function () {
      this.$('.description-field').trigger('autosize.resize');
    });
  }.observes('photo.description'),

  autosize: function () {
    Ember.run.scheduleOnce('afterRender', this, function () {
      this.$('.description-field').autosize();
    });
  }.on('didInsertElement'),

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

    editLocation: function () {
      this.set('editingLocation', true);
      this.onLocationEdit();
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

    focusOutLocation: function () {
      this.set('editingLocation', false);
    },

    editDescription: function () {
      this.set('editingDescription', true);
      this.onDescriptionEdit();
    },

    saveLocation: function (location) {
      var self = this;

      this.set('photo.location', location);
      this.get('photo').patch({ location: this.get('photo.location') }).then(function () {
        self.set('editingLocation', false);
      });
    }
  }
});
