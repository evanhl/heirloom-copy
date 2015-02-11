//= require basePhoto

App.Photo = App.BasePhoto.extend({
  description: Ember.attr(String),
  backdated_time: Ember.attr(App.FuzzyDate),
  location: Ember.attr(),
  tag_list: Ember.attr(),
  recipe: Ember.attr(),

  isMetadataBlank: function () {
    return !this.get('description') && this.get('backdated_time.isBlank') && !this.get('location');
  }.property('backdated_time.isBlank', 'description', 'location'),

  thumbVersion: function () {
    return this.get('dataUri') || this.versionForDimension('xs') || this.get('mediumVersion');
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
    }, 1000);
  },

  didRotate: function () {
    this.set('rotationAngle', this.get('rotationAngle') - this.get('pendingRotationAngle'));
    this.set('pendingRotationAngle', 0);

    if (this.get('rotationAngle')) {
      this.rotatePatch();
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
