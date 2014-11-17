App.ShareMixin = Ember.Mixin.create({
  TWITTER_SHARE_URL: 'https://www.twitter.com/intent/tweet?text=',
  FB_SHARE_URL: 'https://www.facebook.com/sharer/sharer.php?u=',

  showShareMenu: false,

  shareExternal: function () {
    var self = this;
    var data = {
      type: 'photo',
      id: this.get('selectedIds')[0],
      locale: 'en'
    };

    // blocking so we can still launch a pop-up
    Utils.apiCall('/share', 'POST', data, function (data) {
      self.set('shareText', data.body);
      self.set('shareLoading', false);
    }, function () {
      // TODO: handle error
    });
  },

  openFacebookShare: function () {
    this.openSocialShare(this.FB_SHARE_URL);
  },

  openTwitterShare: function () {
    this.openSocialShare(this.TWITTER_SHARE_URL);
  },

  openSocialShare: function (shareUrl) {
    window.open(shareUrl + this.get('shareText'), 'share', 'width=550, height=450');
  },

  onShowShareMenuChange: function () {
    if (this.get('showShareMenu')) {
      this.set('shareLoading', true);
      this.shareExternal();
    } else {
      this.set('shareText', null);
    }
  }.observes('showShareMenu'),

  actions: {
    toggleShare: function () {
      this.toggleProperty('showShareMenu');
    },

    twitterShare: function () {
      this.openTwitterShare();
      this.set('showShareMenu', false);
    },

    facebookShare: function () {
      this.openFacebookShare();
      this.set('showShareMenu', false);
    }
  }
});
