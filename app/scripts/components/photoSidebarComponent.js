App.PhotoSidebarComponent = Ember.Component.extend({
  classNames: ['photo-sidebar'],
  photo: null,
  editingDescription: false,
  editingDate: false,
  editingLocation: false,
  savedDescription: false,
  savingDescription: false,
  savedLocation: false,
  savingLocation: false,
  savedDate: false,
  savingDate: false,

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

  reset: function () {
    this.set('errors', {});
    this.get('locationSearch').reset();
  },

  onPhotoChange: function () {
    if (this.get('photo') && this.get('photo.isMetadataBlank')) {
      this.set('photo.hasBeenEdited', false);
    } else {
      this.set('photo.hasBeenEdited', true);
    }

    this.reset();
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

      this.set('savedDescription', false);
      this.set('savingDescription', true);

      this.get('photo').patch({ description: this.get('photo.description') }).then(function () {
        self.set('editingDescription', false);
        self.set('savedDescription', true);
        self.set('savingDescription', false);
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

      this.set('savedDate', false);
      this.set('savingDate', true);

      // TODO: figure out how to get backdated_time doesn't show up among the _dirtyAttributes
      // (since it's an Ember object and not a primitive)
      this.get('photo').patch({ backdated_time: this.get('photo.backdated_time').toJSON() }).then(function () {
        self.set('editingDate', false);
        self.set('savedDate', true);
        self.set('savingDate', false);
        self.set('errors.date', null);
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

      this.set('savedLocation', false);
      this.set('savingLocation', true);

      this.set('photo.location', location);
      this.get('photo').patch({ location: this.get('photo.location') }).then(function () {
        self.set('editingLocation', false);
        self.get('locationSearch').reset();

        self.set('savedLocation', true);
        self.set('savingLocation', false);
      });
    },

    saveTags: function (tags) {
      var self = this;

      this.set('savedTags', false);
      this.set('savingTags', true);

      this.set('photo.tag_list', tags);
      this.get('photo').patch({ tag_list: tags }).then(function () {
        self.set('savedTags', true);
        self.set('savingTags', false);
      });
    },

    dateError: function (errors) {
      this.set('errors.date', errors.join(' '));
    }
  }
});
