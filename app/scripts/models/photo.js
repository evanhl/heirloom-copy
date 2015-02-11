//= require basePhoto

App.Photo = App.BasePhoto.extend({
  description: Ember.attr(String),
  backdated_time: Ember.attr(App.FuzzyDate),
  location: Ember.attr(),
  tag_list: Ember.attr(),
  recipe: Ember.attr(),
  INITIAL_POLL_INTERVAL: 1000,
  BACKOFF_FACTOR: 1.2,

  isMetadataBlank: function () {
    return !this.get('description') && this.get('backdated_time.isBlank') && !this.get('location');
  }.property('backdated_time.isBlank', 'description', 'location'),

  thumbVersion: function () {
    return this.versionForDimension('xs') || this.get('dataUri') || this.get('mediumVersion');
  }.property('versions'),

  mediumVersion: function () {
    return this.versionForDimension('s');
  }.property('versions'),

  largeVersion: function () {
    return this.versionForDimension('n');
  }.property('versions'),

  fullVersion: function () {
    return this.versionForDimension('full');
  }.property('versions'),

  fullHeight: function () {
    return this.get('versions.full.height');
  }.property('versions'),

  fullWidth: function () {
    return this.get('versions.full.width');
  }.property('versions'),

  isViewable: function () {
    return this.get('isReady') || this.get('isEditing');
  }.property('isReady', 'isEditing'),

  rotate90: function () {
    this.set('rotationAngle', (this.get('rotationAngle') || 0) + 90);
    this.tryRotatePatch();
  },

  tryRotatePatch: function () {
    Ember.run.debounce(this, this.rotatePatch, 3000);
  },

  rotatePatch: function () {
    var newRecipe,
        angle = (this.get('rotationAngle') || 0) - (this.get('pendingRotationAngle') || 0);

    // we can't have two concurrent PATCH requests
    if (this.get('pendingRotationAngle')) { return; }

    // this is a no op, so skip the patch
    if (angle % 360 === 0) { return; }

    newRecipe = Utils.PhotoRecipe.createRotateRecipe(angle);
    this.patch({ recipe: newRecipe });
    this.set('pendingRotationAngle', angle);

    this.pollInterval = this.INITIAL_POLL_INTERVAL;
    this.pollForReady();
  },

  pollForReady: function () {
    var self = this;

    // TODO: max # of attempts
    setTimeout(function () {
      self.reload().finally(function () {
        if (self.get('isReady')) {
          self.didRotate();
        } else {
          self.pollForReady();
        }
      });
    }, this.pollInterval);
    this.pollInterval = Math.round(this.pollInterval * this.BACKOFF_FACTOR);
  },

  didRotate: function () {
    this.set('rotationAngle', this.get('rotationAngle') - this.get('pendingRotationAngle'));
    this.set('pendingRotationAngle', 0);

    if (this.get('rotationAngle')) {
      this.rotatePatch();
    }
  },

  load: function (id, hash) {
    var preserveVersions = (this.get('versions') && hash.state === 'processing');

    if (preserveVersions) {
      this.set('ignoreVersionChanges', true);
      hash.versions = this.get('versions');
    }

    this._super(id, hash);

    if (preserveVersions) {
      this.set('ignoreVersionChanges', false);
      this.set('isEditing', true);
    }
  }
});

App.Photo.reopenClass({
  batchDelete: function (photoIds) {
    return this.adapter.batchDelete(this, photoIds, 'photo_ids');
  }
});

App.Photo.url = 'photos';
App.Photo.adapter = App.APIAdapter.create({
  userNamespaced: true
});
