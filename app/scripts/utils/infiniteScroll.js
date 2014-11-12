// Tweak of https://github.com/bantic/ember-infinite-scroll

(function (window, Ember, $) {
  var InfiniteScroll = {};

  InfiniteScroll.ControllerMixin = Ember.Mixin.create({
    page: 0,
    perPage: 20,

    fetchPage: function (page, perPage) {
      throw new Error("Must override fetchPage and return a Promise.");
    },

    reset: function () {
      this.setProperties({
        maxPage: null,
        page: 0,
        loadingMore: false
      });
    },

    // no op implementation can be overridden
    onFetchPageError: function () {},

    // no op implementation can be overridden
    handleEmptyState: function () {},

    checkEmptyState: function () {
      if (this.get('page') === 0) {
        this.handleEmptyState();
      }
    },


    actions: {
      getMore: function () {
        var nextPage, perPage, self;

        if (this.get('loadingMore')) { return; }

        nextPage   = this.get('page') + 1;
        perPage    = this.get('perPage');
        self       = this;

        if (typeof this.get('maxPage') === 'number' && nextPage > this.get('maxPage')) {
          Ember.run.next(this, function () {
            this.checkEmptyState();
          });
          return;
        }

        this.set('loadingMore', true);

        this.fetchPage(nextPage, perPage).then(function (items) {
          self.set('errors', []);
          self.send('gotMore', items, nextPage);
        }).catch(function () {
          self.onFetchPageError();
          self.set('loadingMore', false);
        });
      },

      gotMore: function (items, nextPage) {
        // if it's a wrapped array like Ember.RecordArray, get the inner array
        if (items.content) {
          items = items.content;
        }

        if (items.length === 0) {
          this.set('maxPage', this.get('page'));
          this.checkEmptyState();
        } else {
          this.removeObjects(items);
          this.pushObjects(items);
          this.set('page', nextPage);
        }

        this.set('loadingMore', false);
      }
    }
  });

  InfiniteScroll.ViewMixin = Ember.Mixin.create({
    setupInfiniteScrollListener: function () {
      this.$listenerEl().on('scroll', $.proxy(this.didScroll, this));
    }.on('didInsertElement'),

    teardownInfiniteScrollListener: function () {
      this.$listenerEl().off('scroll', $.proxy(this.didScroll, this));
    }.on('willDestroyElement'),

    $listenerEl: function () {
      if (this.$scrollEl().css('overflow-y') === 'scroll') {
        return this.$scrollEl();
      } else {
        return $(window);
      }
    },

    $scrollEl: function () {
      return this.get('scrollEl') ? $(this.get('scrollEl')) : this.$();
    },

    didScroll: function () {
      if (this.isScrolledToBottom()) {
        this.get('controller').send('getMore');
      }
    },

    isScrolledToBottom: function () {
      var $scrollEl = this.$scrollEl();
      var distanceToViewportTop = $scrollEl.prop('scrollHeight') - $scrollEl.height();
      var viewPortTop = this.getScrollTop($scrollEl);

      // instead of waiting til we hit the bottom, check if we are within 1000px
      return (viewPortTop >= distanceToViewportTop - 1000);
    },

    getScrollTop: function ($el) {
      if ($el.prop('tagName') === 'BODY') {
        this.$html = this.$html || $('html');
        return $el.scrollTop() || this.$html.scrollTop();
      } else {
        return $el.scrollTop();
      }
    }
  });

  InfiniteScroll.RouteMixin = Ember.Mixin.create({
    model: function () {
      // return an empty array that the controller can append to as the user pages
      return [];
    },

    setupController: function (controller, model) {
      controller.send('getMore');
    }
  });

  window.InfiniteScroll = InfiniteScroll;
})(this, Ember, jQuery);