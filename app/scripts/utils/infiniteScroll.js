// Tweak of https://github.com/bantic/ember-infinite-scroll

(function(window, Ember, $){
  var InfiniteScroll = {
    PAGE:     1,  // default start page
    PER_PAGE: 25 // default per page
  };

  InfiniteScroll.ControllerMixin = Ember.Mixin.create({
    fetchPage: function (page, perPage) {
      throw new Error("Must override fetchPage and return a Promise.");
    },
    actions: {
      getMore: function () {
        var nextPage, perPage, self;

        if (this.get('loadingMore')) { return; }

        nextPage   = this.get('page') + 1;
        perPage    = this.get('perPage');
        self       = this;

        if (nextPage > this.get('maxPage')) { return; }

        this.set('loadingMore', true);

        this.fetchPage(nextPage, perPage).then(function (photos) {
          // TODO: timeout is for demo only. remove.
          setTimeout(function () {
            self.send('gotMore', photos.content, nextPage);
          }, 2000);
        });
      },
      gotMore: function (items, nextPage) {
        this.set('loadingMore', false);

        if (items.length === 0) {
          this.set('maxPage', this.get('page'));
        }

        this.pushObjects(items);
        this.set('page', nextPage);
      }
    }
  });

  // TODO: Add lookahead. Load a few hundred px before we hit the bottom.
  InfiniteScroll.ViewMixin = Ember.Mixin.create({
    setupInfiniteScrollListener: function () {
      $(window).on('scroll', $.proxy(this.didScroll, this));
    },
    teardownInfiniteScrollListener: function () {
      $(window).off('scroll', $.proxy(this.didScroll, this));
    },
    didScroll: function () {
      if (this.isScrolledToRight() || this.isScrolledToBottom()) {
        this.get('controller').send('getMore');
      }
    },
    isScrolledToRight: function () {
      var distanceToViewportLeft = (
        $(document).width() - $(window).width());
      var viewPortLeft = $(window).scrollLeft();

      if (viewPortLeft === 0) {
        // if we are at the left of the page, don't do
        // the infinite scroll thing
        return false;
      }

      return (viewPortLeft - distanceToViewportLeft);
    },
    isScrolledToBottom: function () {
      var distanceToViewportTop = (
        $(document).height() - $(window).height());
      var viewPortTop = $(window).scrollTop();

      if (viewPortTop === 0) {
        // if we are at the top of the page, don't do
        // the infinite scroll thing
        return false;
      }

      return (viewPortTop >= distanceToViewportTop);
    }
  });

  window.InfiniteScroll = InfiniteScroll;
})(this, Ember, jQuery);