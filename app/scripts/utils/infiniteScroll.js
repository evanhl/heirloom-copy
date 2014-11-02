// Tweak of https://github.com/bantic/ember-infinite-scroll
/*globals console*/

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

    onFetchPageError: function () {

    },

    actions: {
      getMore: function () {
        var nextPage, perPage, self;

        if (this.get('loadingMore')) { return; }

        nextPage   = this.get('page') + 1;
        perPage    = this.get('perPage');
        self       = this;

        if (this.get('maxPage') && nextPage > this.get('maxPage')) { return; }

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
        }

        this.removeObjects(items);
        this.pushObjects(items);
        this.set('page', nextPage);

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
      var viewPortTop = $scrollEl.scrollTop();

      // instead of waiting til we hit the bottom, check if we are within 1000px
      return (viewPortTop >= distanceToViewportTop - 1000);
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