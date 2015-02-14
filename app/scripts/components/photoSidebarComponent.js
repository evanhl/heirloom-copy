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
  savedTags: false,
  savingTags: false,

  init: function () {
    this._super();
    this.set('errors', {});
  },

  setFields: function () {
    var self = this;

    ['date', 'description', 'backdated_time', 'tag_list'].forEach(function (field) {
      self.set(field, self.get('photo.' + field));
    });
  },

  isDescriptionEdit: function () {
    console.log('editingDescription', this.get('editingDescription'));
    console.log('description', this.get('description'));
    console.log('photo.hasBeenEdited', this.get('photo.hasBeenEdited'));
    return this.get('editingDescription') || (!this.get('description') && !this.get('photo.hasBeenEdited'));
  }.property('editingDescription', 'description', 'photo.hasBeenEdited'),

  isDateEdit: function () {
    return this.get('editingDate') || (this.get('backdated_time.isBlank') && !this.get('photo.hasBeenEdited'));
  }.property('editingDate', 'backdated_time.isBlank', 'photo.hasBeenEdited'),

  isLocationEdit: function () {
    return this.get('editingLocation') || (!this.get('location') && !this.get('photo.hasBeenEdited'));
  }.property('editingLocation', 'location', 'photo.hasBeenEdited'),

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
    this.setProperties({
      editingDescription: false,
      editingDate: false,
      editingLocation: false,
      savedDescription: false,
      savingDescription: false,
      savedLocation: false,
      savingLocation: false,
      savedDate: false,
      savingDate: false,
      savedTags: false,
      savingTags: false
    });
    this.set('errors', {});

    if (this.get('locationSearch')) {
      this.get('locationSearch').reset();
    }
  },

  onPhotoChange: function () {
    if (!this.get('photo')) { return; }

    if (!this.get('photo.isLoaded')) {
      this.get('photo').one('didLoad', this, this.onPhotoChange);
      return;
    }

    if (this.get('photo') && this.get('photo.isMetadataBlank')) {
      this.set('photo.hasBeenEdited', false);
    } else {
      this.set('photo.hasBeenEdited', true);
    }

    this.reset();
    this.setFields();
  }.observes('photo').on('init'),

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

      App.get('analytics').trackEvent('Metadata.Actions.editDescription');

      this.get('photo').set('description', this.get('description'));
      this.get('photo').patch({ description: this.get('description') }).then(function () {
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

      App.get('analytics').trackEvent('Metadata.Actions.editDate');

      // TODO: figure out how to get backdated_time doesn't show up among the _dirtyAttributes
      // (since it's an Ember object and not a primitive)
      this.get('photo').set('backdated_time', this.get('backdated_time'));
      this.get('photo').patch({ backdated_time: this.get('backdated_time').toJSON() }).then(function () {
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

      App.get('analytics').trackEvent('Metadata.Actions.editLocation');

      this.set('photo.location', location);
      this.get('photo').patch({ location: location }).then(function () {
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

      App.get('analytics').trackEvent('Metadata.Actions.editTags');

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
