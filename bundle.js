NexT.utils = NexT.$u = {

  
  wrapImageWithFancyBox: function() {
    $('.content img')
      .not('[hidden]')
      .not('.group-picture img, .post-gallery img')
      .each(function() {
        var $image = $(this);
        var imageTitle = $image.attr('title');
        var $imageWrapLink = $image.parent('a');

        if ($imageWrapLink.length < 1) {
          var imageLink = $image.attr('data-original') ? this.getAttribute('data-original') : this.getAttribute('src');
          $imageWrapLink = $image.wrap('<a data-fancybox="group" href="' + imageLink + '"></a>').parent('a');
        }

        $imageWrapLink.addClass('fancybox fancybox.image');
        $imageWrapLink.attr('rel', 'group');

        if (imageTitle) {
          $imageWrapLink.append('<p class="image-caption">' + imageTitle + '</p>');

          //make sure img title tag will show correctly in fancybox
          $imageWrapLink.attr('title', imageTitle);
        }
      });

    $('.fancybox').fancybox({
      helpers: {
        overlay: {
          locked: false
        }
      }
    });
  },

  lazyLoadPostsImages: function() {
    $('#posts').find('img').lazyload({
      //placeholder: '/images/loading.gif',
      effect   : 'fadeIn',
      threshold: 0
    });
  },

  
  registerTabsTag: function() {
    var tNav = '.tabs ul.nav-tabs ';

    // Binding `nav-tabs` & `tab-content` by real time permalink changing.
    $(function() {
      $(window).bind('hashchange', function() {
        var tHash = location.hash;
        if (tHash !== '') {
          $(tNav + 'li:has(a[href="' + tHash + '"])').addClass('active').siblings().removeClass('active');
          $(tHash).addClass('active').siblings().removeClass('active');
        }
      }).trigger('hashchange');
    });

    $(tNav + '.tab').on('click', function(href) {
      href.preventDefault();
      // Prevent selected tab to select again.
      if (!$(this).hasClass('active')) {

        // Add & Remove active class on `nav-tabs` & `tab-content`.
        $(this).addClass('active').siblings().removeClass('active');
        var tActive = $(this).find('a').attr('href');
        $(tActive).addClass('active').siblings().removeClass('active');

        // Clear location hash in browser if #permalink exists.
        if (location.hash !== '') {
          history.pushState('', document.title, window.location.pathname + window.location.search);
        }
      }
    });

  },

  registerESCKeyEvent: function() {
    $(document).on('keyup', function(event) {
      var shouldDismissSearchPopup = event.which === 27
          && $('.search-popup').is(':visible');
      if (shouldDismissSearchPopup) {
        $('.search-popup').hide();
        $('.search-popup-overlay').remove();
        $('body').css('overflow', '');
      }
    });
  },

  registerBackToTop: function() {
    var THRESHOLD = 50;
    var $top = $('.back-to-top');

    $(window).on('scroll', function() {
      $top.toggleClass('back-to-top-on', window.pageYOffset > THRESHOLD);

      var scrollTop = $(window).scrollTop();
      var contentVisibilityHeight = NexT.utils.getContentVisibilityHeight();
      var scrollPercent = scrollTop / contentVisibilityHeight;
      var scrollPercentRounded = Math.round(scrollPercent * 100);
      var scrollPercentMaxed = scrollPercentRounded > 100 ? 100 : scrollPercentRounded;
      $('#scrollpercent>span').html(scrollPercentMaxed);
    });

    $top.on('click', function() {
      $('body').velocity('scroll');
    });
  },

  
  embeddedVideoTransformer: function() {
    var $iframes = $('iframe');

    // Supported Players. Extend this if you need more players.
    var SUPPORTED_PLAYERS = [
      'www.youtube.com',
      'player.vimeo.com',
      'player.youku.com',
      'music.163.com',
      'www.tudou.com'
    ];
    var pattern = new RegExp(SUPPORTED_PLAYERS.join('|'));

    function getDimension($element) {
      return {
        width : $element.width(),
        height: $element.height()
      };
    }

    function getAspectRadio(width, height) {
      return height / width * 100;
    }

    $iframes.each(function() {
      var iframe = this;
      var $iframe = $(this);
      var oldDimension = getDimension($iframe);
      var newDimension;

      if (this.src.search(pattern) > 0) {

        // Calculate the video ratio based on the iframe's w/h dimensions
        var videoRatio = getAspectRadio(oldDimension.width, oldDimension.height);

        // Replace the iframe's dimensions and position the iframe absolute
        // This is the trick to emulate the video ratio
        $iframe.width('100%').height('100%')
          .css({
            position: 'absolute',
            top     : '0',
            left    : '0'
          });

        // Wrap the iframe in a new <div> which uses a dynamically fetched padding-top property
        // based on the video's w/h dimensions
        var wrap = document.createElement('div');
        wrap.className = 'fluid-vids';
        wrap.style.position = 'relative';
        wrap.style.marginBottom = '20px';
        wrap.style.width = '100%';
        wrap.style.paddingTop = videoRatio + '%';
        // Fix for appear inside tabs tag.
        (wrap.style.paddingTop === '') && (wrap.style.paddingTop = '50%');

        // Add the iframe inside our newly created <div>
        var iframeParent = iframe.parentNode;
        iframeParent.insertBefore(wrap, iframe);
        wrap.appendChild(iframe);

        // Additional adjustments for 163 Music
        if (this.src.search('music.163.com') > 0) {
          newDimension = getDimension($iframe);
          var shouldRecalculateAspect = newDimension.width > oldDimension.width
                                     || newDimension.height < oldDimension.height;

          // 163 Music Player has a fixed height, so we need to reset the aspect radio
          if (shouldRecalculateAspect) {
            wrap.style.paddingTop = getAspectRadio(newDimension.width, oldDimension.height) + '%';
          }
        }
      }
    });

  },

  hasMobileUA: function() {
    var nav = window.navigator;
    var ua = nav.userAgent;
    var pa = /iPad|iPhone|Android|Opera Mini|BlackBerry|webOS|UCWEB|Blazer|PSP|IEMobile|Symbian/g;

    return pa.test(ua);
  },

  isTablet: function() {
    return window.screen.width < 992 && window.screen.width > 767 && this.hasMobileUA();
  },

  isMobile: function() {
    return window.screen.width < 767 && this.hasMobileUA();
  },

  isDesktop: function() {
    return !this.isTablet() && !this.isMobile();
  },

  
  escapeSelector: function(selector) {
    return selector.replace(/[!"$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g, '\\$&');
  },

  displaySidebar: function() {
    if (!this.isDesktop() || this.isPisces() || this.isGemini()) {
      return;
    }
    $('.sidebar-toggle').trigger('click');
  },

  isMist: function() {
    return CONFIG.scheme === 'Mist';
  },

  isPisces: function() {
    return CONFIG.scheme === 'Pisces';
  },

  isGemini: function() {
    return CONFIG.scheme === 'Gemini';
  },

  getScrollbarWidth: function() {
    var $div = $('<div />').addClass('scrollbar-measure').prependTo('body');
    var div = $div[0];
    var scrollbarWidth = div.offsetWidth - div.clientWidth;

    $div.remove();

    return scrollbarWidth;
  },

  getContentVisibilityHeight: function() {
    var docHeight = $('#content').height();
    var winHeight = $(window).height();
    var contentVisibilityHeight = docHeight > winHeight ? docHeight - winHeight : $(document).height() - winHeight;
    return contentVisibilityHeight;
  },

  getSidebarb2tHeight: function() {
    //var sidebarb2tHeight = (CONFIG.sidebar.b2t) ? document.getElementsByClassName('back-to-top')[0].clientHeight : 0;
    var sidebarb2tHeight = CONFIG.sidebar.b2t ? $('.back-to-top').height() : 0;
    return sidebarb2tHeight;
  },

  getSidebarSchemePadding: function() {
    var sidebarNavHeight = $('.sidebar-nav').css('display') === 'block' ? $('.sidebar-nav').outerHeight(true) : 0;
    var sidebarInner = $('.sidebar-inner');
    var sidebarPadding = sidebarInner.innerWidth() - sidebarInner.width();
    var sidebarSchemePadding = this.isPisces() || this.isGemini()
      ? (sidebarPadding * 2) + sidebarNavHeight + (CONFIG.sidebar.offset * 2) + this.getSidebarb2tHeight()
      : (sidebarPadding * 2) + (sidebarNavHeight / 2);
    return sidebarSchemePadding;
  }

};

$(document).ready(function() {

  

  function updateSidebarHeight(height) {
    height = height || 'auto';
    $('.site-overview, .post-toc').css('max-height', height);
  }

  function initSidebarDimension() {
    var updateSidebarHeightTimer;

    $(window).on('resize', function() {
      updateSidebarHeightTimer && clearTimeout(updateSidebarHeightTimer);

      updateSidebarHeightTimer = setTimeout(function() {
        var sidebarWrapperHeight = document.body.clientHeight - NexT.utils.getSidebarSchemePadding();

        updateSidebarHeight(sidebarWrapperHeight);
      }, 0);
    });

    // Initialize Sidebar & TOC Width.
    var scrollbarWidth = NexT.utils.getScrollbarWidth();
    if ($('.site-overview-wrap').height() > (document.body.clientHeight - NexT.utils.getSidebarSchemePadding())) {
      $('.site-overview').css('width', 'calc(100% + ' + scrollbarWidth + 'px)');
    }
    if ($('.post-toc-wrap').height() > (document.body.clientHeight - NexT.utils.getSidebarSchemePadding())) {
      $('.post-toc').css('width', 'calc(100% + ' + scrollbarWidth + 'px)');
    }

    // Initialize Sidebar & TOC Height.
    updateSidebarHeight(document.body.clientHeight - NexT.utils.getSidebarSchemePadding());
  }

  initSidebarDimension();

});;$(document).ready(function() {
  NexT.motion = {};

  var sidebarToggleLines = {
    lines: [],
    push : function(line) {
      this.lines.push(line);
    },
    init: function() {
      this.lines.forEach(function(line) {
        line.init();
      });
    },
    arrow: function() {
      this.lines.forEach(function(line) {
        line.arrow();
      });
    },
    close: function() {
      this.lines.forEach(function(line) {
        line.close();
      });
    }
  };

  function SidebarToggleLine(settings) {
    this.el = $(settings.el);
    this.status = $.extend({}, {
      init: {
        width  : '100%',
        opacity: 1,
        left   : 0,
        rotateZ: 0,
        top    : 0
      }
    }, settings.status);
  }

  SidebarToggleLine.prototype.init = function() {
    this.transform('init');
  };
  SidebarToggleLine.prototype.arrow = function() {
    this.transform('arrow');
  };
  SidebarToggleLine.prototype.close = function() {
    this.transform('close');
  };
  SidebarToggleLine.prototype.transform = function(status) {
    this.el.velocity('stop').velocity(this.status[status]);
  };

  var sidebarToggleLine1st = new SidebarToggleLine({
    el    : '.sidebar-toggle-line-first',
    status: {
      arrow: {width: '50%', rotateZ: '-45deg', top: '2px'},
      close: {width: '100%', rotateZ: '-45deg', top: '5px'}
    }
  });
  var sidebarToggleLine2nd = new SidebarToggleLine({
    el    : '.sidebar-toggle-line-middle',
    status: {
      arrow: {width: '90%'},
      close: {opacity: 0}
    }
  });
  var sidebarToggleLine3rd = new SidebarToggleLine({
    el    : '.sidebar-toggle-line-last',
    status: {
      arrow: {width: '50%', rotateZ: '45deg', top: '-2px'},
      close: {width: '100%', rotateZ: '45deg', top: '-5px'}
    }
  });

  sidebarToggleLines.push(sidebarToggleLine1st);
  sidebarToggleLines.push(sidebarToggleLine2nd);
  sidebarToggleLines.push(sidebarToggleLine3rd);

  var SIDEBAR_WIDTH = '320px';
  var SIDEBAR_DISPLAY_DURATION = 200;
  var xPos, yPos;

  var sidebarToggleMotion = {
    toggleEl        : $('.sidebar-toggle'),
    dimmerEl        : $('#sidebar-dimmer'),
    sidebarEl       : $('.sidebar'),
    isSidebarVisible: false,
    init            : function() {
      this.toggleEl.on('click', this.clickHandler.bind(this));
      this.dimmerEl.on('click', this.clickHandler.bind(this));
      this.toggleEl.on('mouseenter', this.mouseEnterHandler.bind(this));
      this.toggleEl.on('mouseleave', this.mouseLeaveHandler.bind(this));
      this.sidebarEl.on('touchstart', this.touchstartHandler.bind(this));
      this.sidebarEl.on('touchend', this.touchendHandler.bind(this));
      this.sidebarEl.on('touchmove', function(e) { e.preventDefault(); });

      $(document)
        .on('sidebar.isShowing', function() {
          NexT.utils.isDesktop() && $('body').velocity('stop').velocity(
            {paddingRight: SIDEBAR_WIDTH},
            SIDEBAR_DISPLAY_DURATION
          );
        })
        .on('sidebar.isHiding', function() {
        });
    },
    clickHandler: function() {
      this.isSidebarVisible ? this.hideSidebar() : this.showSidebar();
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    mouseEnterHandler: function() {
      if (this.isSidebarVisible) {
        return;
      }
      sidebarToggleLines.arrow();
    },
    mouseLeaveHandler: function() {
      if (this.isSidebarVisible) {
        return;
      }
      sidebarToggleLines.init();
    },
    touchstartHandler: function(e) {
      xPos = e.originalEvent.touches[0].clientX;
      yPos = e.originalEvent.touches[0].clientY;
    },
    touchendHandler: function(e) {
      var _xPos = e.originalEvent.changedTouches[0].clientX;
      var _yPos = e.originalEvent.changedTouches[0].clientY;
      if (_xPos - xPos > 30 && Math.abs(_yPos - yPos) < 20) {
        this.clickHandler();
      }
    },
    showSidebar: function() {
      var self = this;

      sidebarToggleLines.close();

      this.sidebarEl.velocity('stop').velocity({
        width: SIDEBAR_WIDTH
      }, {
        display : 'block',
        duration: SIDEBAR_DISPLAY_DURATION,
        begin   : function() {
          $('.sidebar .motion-element').velocity(
            'transition.slideRightIn',
            {
              stagger : 50,
              drag    : true,
              complete: function() {
                self.sidebarEl.trigger('sidebar.motion.complete');
              }
            }
          );
        },
        complete: function() {
          self.sidebarEl.addClass('sidebar-active');
          self.sidebarEl.trigger('sidebar.didShow');
        }
      }
      );

      this.sidebarEl.trigger('sidebar.isShowing');
    },
    hideSidebar: function() {
      NexT.utils.isDesktop() && $('body').velocity('stop').velocity({paddingRight: 0});
      this.sidebarEl.find('.motion-element').velocity('stop').css('display', 'none');
      this.sidebarEl.velocity('stop').velocity({width: 0}, {display: 'none'});

      sidebarToggleLines.init();

      this.sidebarEl.removeClass('sidebar-active');
      this.sidebarEl.trigger('sidebar.isHiding');

      // Prevent adding TOC to Overview if Overview was selected when close & open sidebar.
      if (!$('.post-toc-wrap')) {
        if ($('.site-overview-wrap').css('display') === 'block') {
          $('.post-toc-wrap').removeClass('motion-element');
        } else {
          $('.post-toc-wrap').addClass('motion-element');
        }
      }
    }
  };
  sidebarToggleMotion.init();

  NexT.motion.integrator = {
    queue : [],
    cursor: -1,
    add   : function(fn) {
      this.queue.push(fn);
      return this;
    },
    next: function() {
      this.cursor++;
      var fn = this.queue[this.cursor];
      $.isFunction(fn) && fn(NexT.motion.integrator);
    },
    bootstrap: function() {
      this.next();
    }
  };

  NexT.motion.middleWares = {
    logo: function(integrator) {
      var sequence = [];
      var $brand = $('.brand');
      var $title = $('.site-title');
      var $subtitle = $('.site-subtitle');
      var $logoLineTop = $('.logo-line-before i');
      var $logoLineBottom = $('.logo-line-after i');

      $brand.length > 0 && sequence.push({
        e: $brand,
        p: {opacity: 1},
        o: {duration: 200}
      });

      
      function hasElement($elements) {
        $elements = Array.isArray($elements) ? $elements : [$elements];
        return $elements.every(function($element) {
          return $element.length > 0;
        });
      }

      function getMistLineSettings(element, translateX) {
        return {
          e: $(element),
          p: {translateX: translateX},
          o: {
            duration     : 500,
            sequenceQueue: false
          }
        };
      }

      NexT.utils.isMist() && hasElement([$logoLineTop, $logoLineBottom])
      && sequence.push(
        getMistLineSettings($logoLineTop, '100%'),
        getMistLineSettings($logoLineBottom, '-100%')
      );

      hasElement($title) && sequence.push({
        e: $title,
        p: {opacity: 1, top: 0},
        o: { duration: 200 }
      });

      hasElement($subtitle) && sequence.push({
        e: $subtitle,
        p: {opacity: 1, top: 0},
        o: {duration: 200}
      });

      if (CONFIG.motion.async) {
        integrator.next();
      }

      if (sequence.length > 0) {
        sequence[sequence.length - 1].o.complete = function() {
          integrator.next();
        };
        
        $.Velocity.RunSequence(sequence);
        
      } else {
        integrator.next();
      }
    },

    menu: function(integrator) {

      if (CONFIG.motion.async) {
        integrator.next();
      }

      $('.menu-item').velocity('transition.slideDownIn', {
        display : null,
        duration: 200,
        complete: function() {
          integrator.next();
        }
      });
    },

    postList: function(integrator) {

      //var $post = $('.post');
      var $postBlock = $('.post-block, .pagination, .comments');
      var $postBlockTransition = CONFIG.motion.transition.post_block;
      var $postHeader = $('.post-header');
      var $postHeaderTransition = CONFIG.motion.transition.post_header;
      var $postBody = $('.post-body');
      var $postBodyTransition = CONFIG.motion.transition.post_body;
      var $collHeader = $('.collection-title, .archive-year');
      var $collHeaderTransition = CONFIG.motion.transition.coll_header;
      var $sidebarAffix = $('.sidebar-inner');
      var $sidebarAffixTransition = CONFIG.motion.transition.sidebar;
      var hasPost = $postBlock.length > 0;

      function postMotion() {
        var postMotionOptions = window.postMotionOptions || {
          stagger: 100,
          drag   : true
        };
        postMotionOptions.complete = function() {
          // After motion complete need to remove transform from sidebar to let affix work on Pisces | Gemini.
          if (CONFIG.motion.transition.sidebar && (NexT.utils.isPisces() || NexT.utils.isGemini())) {
            $sidebarAffix.css({ 'transform': 'initial' });
          }
          integrator.next();
        };

        //$post.velocity('transition.slideDownIn', postMotionOptions);
        if (CONFIG.motion.transition.post_block) {
          $postBlock.velocity('transition.' + $postBlockTransition, postMotionOptions);
        }
        if (CONFIG.motion.transition.post_header) {
          $postHeader.velocity('transition.' + $postHeaderTransition, postMotionOptions);
        }
        if (CONFIG.motion.transition.post_body) {
          $postBody.velocity('transition.' + $postBodyTransition, postMotionOptions);
        }
        if (CONFIG.motion.transition.coll_header) {
          $collHeader.velocity('transition.' + $collHeaderTransition, postMotionOptions);
        }
        // Only for Pisces | Gemini.
        if (CONFIG.motion.transition.sidebar && (NexT.utils.isPisces() || NexT.utils.isGemini())) {
          $sidebarAffix.velocity('transition.' + $sidebarAffixTransition, postMotionOptions);
        }
      }

      hasPost ? postMotion() : integrator.next();

      if (CONFIG.motion.async) {
        integrator.next();
      }
    },

    sidebar: function(integrator) {
      if (CONFIG.sidebar.display === 'always') {
        NexT.utils.displaySidebar();
      }
      integrator.next();
    }
  };

});;(function($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function(element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options);

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this));

    this.$element     = $(element);
    this.affixed      = null;
    this.unpin        = null;
    this.pinnedOffset = null;

    this.checkPosition();
  };

  Affix.VERSION  = '3.3.5';

  Affix.RESET    = 'affix affix-top affix-bottom';

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  };

  Affix.prototype.getState = function(scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop();
    var position     = this.$element.offset();
    var targetHeight = this.$target.height();

    if (offsetTop != null && this.affixed === 'top') return scrollTop < offsetTop ? 'top' : false;

    if (this.affixed === 'bottom') {
      if (offsetTop != null) return scrollTop + this.unpin <= position.top ? false : 'bottom';
      return scrollTop + targetHeight <= scrollHeight - offsetBottom ? false : 'bottom';
    }

    var initializing   = this.affixed == null;
    var colliderTop    = initializing ? scrollTop : position.top;
    var colliderHeight = initializing ? targetHeight : height;

    if (offsetTop != null && scrollTop <= offsetTop) return 'top';
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom';

    return false;
  };

  Affix.prototype.getPinnedOffset = function() {
    if (this.pinnedOffset) return this.pinnedOffset;
    this.$element.removeClass(Affix.RESET).addClass('affix');
    var scrollTop = this.$target.scrollTop();
    var position  = this.$element.offset();
    return (this.pinnedOffset = position.top - scrollTop);
  };

  Affix.prototype.checkPositionWithEventLoop = function() {
    setTimeout($.proxy(this.checkPosition, this), 1);
  };

  Affix.prototype.checkPosition = function() {
    if (!this.$element.is(':visible')) return;

    var height       = this.$element.height();
    var offset       = this.options.offset;
    var offsetTop    = offset.top;
    var offsetBottom = offset.bottom;
    var scrollHeight = Math.max($(document).height(), $(document.body).height());

    
    if (typeof offset !== 'object')         offsetBottom = offsetTop = offset;
    if (typeof offsetTop === 'function')    offsetTop    = offset.top(this.$element);
    if (typeof offsetBottom === 'function') offsetBottom = offset.bottom(this.$element);
    

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom);

    if (this.affixed !== affix) {
      if (this.unpin != null) this.$element.css('top', '');

      var affixType = 'affix' + (affix ? '-' + affix : '');
      var e         = new $.Event(affixType + '.bs.affix');

      this.$element.trigger(e);

      if (e.isDefaultPrevented()) return;

      this.affixed = affix;
      this.unpin = affix === 'bottom' ? this.getPinnedOffset() : null;

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix');
    }

    if (affix === 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      });
    }
  };

  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function() {
      var $this   = $(this);
      var data    = $this.data('bs.affix');
      var options = typeof option === 'object' && option;

      if (!data) $this.data('bs.affix', data = new Affix(this, options));
      if (typeof option === 'string') data[option]();
    });
  }

  var old = $.fn.affix;

  $.fn.affix             = Plugin;
  $.fn.affix.Constructor = Affix;

  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function() {
    $.fn.affix = old;
    return this;
  };

  // AFFIX DATA-API
  // ==============

  $(window).on('load', function() {
    $('[data-spy="affix"]').each(function() {
      var $spy = $(this);
      var data = $spy.data();

      data.offset = data.offset || {};

      
      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom;
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop;
      

      Plugin.call($spy, data);
    });
  });

}(jQuery));;$(document).ready(function() {

  var sidebarInner = $('.sidebar-inner');

  function getHeaderOffset() {
    return $('.header-inner').height() + CONFIG.sidebar.offset;
  }

  function getFooterOffset() {
    var footerInner = $('.footer-inner');
    var footerMargin = footerInner.outerHeight(true) - footerInner.outerHeight();
    var footerOffset = footerInner.outerHeight(true) + footerMargin;
    return footerOffset;
  }

  function setSidebarMarginTop(headerOffset) {
    return $('#sidebar').css({ 'margin-top': headerOffset });
  }

  function initAffix() {
    var headerOffset = getHeaderOffset();
    var footerOffset = getFooterOffset();
    var sidebarHeight = $('#sidebar').height() + NexT.utils.getSidebarb2tHeight();
    var contentHeight = $('#content').height();

    // Not affix if sidebar taller then content (to prevent bottom jumping).
    if (headerOffset + sidebarHeight < contentHeight) {
      sidebarInner.affix({
        offset: {
          top   : headerOffset - CONFIG.sidebar.offset,
          bottom: footerOffset
        }
      });
    }

    setSidebarMarginTop(headerOffset).css({ 'margin-left': 'initial' });
  }

  function recalculateAffixPosition() {
    $(window).off('.affix');
    sidebarInner.removeData('bs.affix').removeClass('affix affix-top affix-bottom');
    initAffix();
  }

  function resizeListener() {
    var mql = window.matchMedia('(min-width: 991px)');
    mql.addListener(function(e) {
      if (e.matches) {
        recalculateAffixPosition();
      }
    });
  }

  initAffix();
  resizeListener();

});;(function($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================
  function ScrollSpy(element, options) {
    this.$body          = $(document.body);
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element);
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options);
    this.selector       = (this.options.target || '') + ' .nav li > a';
    this.offsets        = [];
    this.targets        = [];
    this.activeTarget   = null;
    this.scrollHeight   = 0;

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this));
    this.refresh();
    this.process();
  }

  ScrollSpy.VERSION  = '3.3.2';

  ScrollSpy.DEFAULTS = {
    offset: 10
  };

  ScrollSpy.prototype.getScrollHeight = function() {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
  };

  ScrollSpy.prototype.refresh = function() {
    var that          = this;
    var offsetMethod  = 'offset';
    var offsetBase    = 0;

    this.offsets      = [];
    this.targets      = [];
    this.scrollHeight = this.getScrollHeight();

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position';
      offsetBase   = this.$scrollElement.scrollTop();
    }

    this.$body
      .find(this.selector)
      .map(function() {
        var $el   = $(this);
        var href  = $el.data('target') || $el.attr('href');
        var $href = /^#./.test(href) && $(NexT.utils.escapeSelector(href)); // Need to escape selector.

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null;
      })
      .sort(function(a, b) {
        return a[0] - b[0];
      })
      .each(function() {
        that.offsets.push(this[0]);
        that.targets.push(this[1]);
      });


  };

  ScrollSpy.prototype.process = function() {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset;
    var scrollHeight = this.getScrollHeight();
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height();
    var offsets      = this.offsets;
    var targets      = this.targets;
    var activeTarget = this.activeTarget;
    var i;

    if (this.scrollHeight !== scrollHeight) {
      this.refresh();
    }

    if (scrollTop >= maxScroll) {
      return activeTarget !== (i = targets[targets.length - 1]) && this.activate(i);
    }

    if (activeTarget && scrollTop < offsets[0]) {
      $(this.selector).trigger('clear.bs.scrollspy'); // Add a custom event.
      this.activeTarget = null;
      return this.clear();
    }

    for (i = offsets.length; i--;) {
      activeTarget !== targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate(targets[i]);
    }
  };

  ScrollSpy.prototype.activate = function(target) {
    this.activeTarget = target;

    this.clear();

    var selector = this.selector
      + '[data-target="' + target + '"],'
      + this.selector + '[href="' + target + '"]';

    var active = $(selector)
      .parents('li')
      .addClass('active');

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active');
    }

    active.trigger('activate.bs.scrollspy');
  };

  ScrollSpy.prototype.clear = function() {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active');
  };

  // SCROLLSPY PLUGIN DEFINITION
  // ===========================
  function Plugin(option) {
    return this.each(function() {
      var $this   = $(this);
      var data    = $this.data('bs.scrollspy');
      var options = typeof option === 'object' && option;

      if (!data) $this.data('bs.scrollspy', data = new ScrollSpy(this, options));
      if (typeof option === 'string') data[option]();
    });
  }

  var old = $.fn.scrollspy;

  $.fn.scrollspy             = Plugin;
  $.fn.scrollspy.Constructor = ScrollSpy;

  // SCROLLSPY NO CONFLICT
  // =====================
  $.fn.scrollspy.noConflict = function() {
    $.fn.scrollspy = old;
    return this;
  };

  // SCROLLSPY DATA-API
  // ==================
  $(window).on('load.bs.scrollspy.data-api', function() {
    $('[data-spy="scroll"]').each(function() {
      var $spy = $(this);
      Plugin.call($spy, $spy.data());
    });
  });

}(jQuery));;$(document).ready(function() {

  function initScrollSpy() {
    var tocSelector = '.post-toc';
    var $tocElement = $(tocSelector);
    var activeCurrentSelector = '.active-current';

    function removeCurrentActiveClass() {
      $(tocSelector + ' ' + activeCurrentSelector)
        .removeClass(activeCurrentSelector.substring(1));
    }

    $tocElement
      .on('activate.bs.scrollspy', function() {
        var $currentActiveElement = $(tocSelector + ' .active').last();

        removeCurrentActiveClass();
        $currentActiveElement.addClass('active-current');

        // Scrolling to center active TOC element if TOC content is taller then viewport.
        $tocElement.scrollTop($currentActiveElement.offset().top - $tocElement.offset().top + $tocElement.scrollTop() - ($tocElement.height() / 2));
      })
      .on('clear.bs.scrollspy', removeCurrentActiveClass);

    $('body').scrollspy({ target: tocSelector });
  }

  initScrollSpy();
});

$(document).ready(function() {
  var html = $('html');
  var TAB_ANIMATE_DURATION = 200;
  var hasVelocity = $.isFunction(html.velocity);

  $('.sidebar-nav li').on('click', function() {
    var item = $(this);
    var activeTabClassName = 'sidebar-nav-active';
    var activePanelClassName = 'sidebar-panel-active';
    if (item.hasClass(activeTabClassName)) {
      return;
    }

    var currentTarget = $('.' + activePanelClassName);
    var target = $('.' + item.data('target'));

    hasVelocity
      ? currentTarget.velocity('transition.slideUpOut', TAB_ANIMATE_DURATION, function() {
        target
          .velocity('stop')
          .velocity('transition.slideDownIn', TAB_ANIMATE_DURATION)
          .addClass(activePanelClassName);
      })
      : currentTarget.animate({ opacity: 0 }, TAB_ANIMATE_DURATION, function() {
        currentTarget.hide();
        target
          .stop()
          .css({'opacity': 0, 'display': 'block'})
          .animate({ opacity: 1 }, TAB_ANIMATE_DURATION, function() {
            currentTarget.removeClass(activePanelClassName);
            target.addClass(activePanelClassName);
          });
      });

    item.siblings().removeClass(activeTabClassName);
    item.addClass(activeTabClassName);
  });

  // TOC item animation navigate & prevent #item selector in adress bar.
  $('.post-toc a').on('click', function(e) {
    e.preventDefault();
    var targetSelector = NexT.utils.escapeSelector(this.getAttribute('href'));
    var offset = $(targetSelector).offset().top;

    hasVelocity
      ? html.velocity('stop').velocity('scroll', {
        offset  : offset + 'px',
        mobileHA: false
      })
      : $('html, body').stop().animate({
        scrollTop: offset
      }, 500);
  });

  // Expand sidebar on post detail page by default, when post has a toc.
  var $tocContent = $('.post-toc-content');
  var display = CONFIG.page.sidebar;
  if (typeof display !== 'boolean') {
    // There's no definition sidebar in the page front-matter
    var isSidebarCouldDisplay = CONFIG.sidebar.display === 'post'
     || CONFIG.sidebar.display === 'always';
    var hasTOC = $tocContent.length > 0 && $tocContent.html().trim().length > 0;
    display = isSidebarCouldDisplay && hasTOC;
  }
  if (display) {
    CONFIG.motion.enable
      ? NexT.motion.middleWares.sidebar = function() {
        NexT.utils.displaySidebar();
      }
      : NexT.utils.displaySidebar();
  }
});;$(document).ready(function() {

  $(document).trigger('bootstrap:before');

  
  CONFIG.fastclick && NexT.utils.isMobile() && window.FastClick.attach(document.body);
  CONFIG.lazyload && NexT.utils.lazyLoadPostsImages();

  NexT.utils.registerESCKeyEvent();

  NexT.utils.registerBackToTop();

  // Mobile top menu bar.
  $('.site-nav-toggle button').on('click', function() {
    var $siteNav = $('.site-nav');
    var ON_CLASS_NAME = 'site-nav-on';
    var isSiteNavOn = $siteNav.hasClass(ON_CLASS_NAME);
    var animateAction = isSiteNavOn ? 'slideUp' : 'slideDown';
    var animateCallback = isSiteNavOn ? 'removeClass' : 'addClass';

    $siteNav.stop()[animateAction]('fast', function() {
      $siteNav[animateCallback](ON_CLASS_NAME);
    });
  });

  
  CONFIG.fancybox && NexT.utils.wrapImageWithFancyBox();
  CONFIG.tabs && NexT.utils.registerTabsTag();

  NexT.utils.embeddedVideoTransformer();

  // Define Motion Sequence.
  NexT.motion.integrator
    .add(NexT.motion.middleWares.logo)
    .add(NexT.motion.middleWares.menu)
    .add(NexT.motion.middleWares.postList)
    .add(NexT.motion.middleWares.sidebar);

  $(document).trigger('motion:before');

  // Bootstrap Motion.
  CONFIG.motion.enable && NexT.motion.integrator.bootstrap();

  $(document).trigger('bootstrap:after');
});;(function () {

  // find closest
  function closest(elem, parent) {
    if (typeof (parent) == "string") {
      var matchesSelector = elem.matches || elem.webkitMatchesSelector ||
                            elem.mozMatchesSelector || elem.msMatchesSelector;

      if (!!matchesSelector) {
        while (elem) {
          if (matchesSelector.bind(elem)(parent)) {
            return elem;
          } else {
            elem = elem.parentElement;
          }
        }
      }
      return false;
    } else {
      while (elem) {
        if (elem == parent) {
          return elem;
        } else {
          elem = elem.parentElement;
        }
      }
      return false;
    }
  }

  // share button class
  window.needShareButton = function (elem, options) {
    // create element reference
    var root = this;
    root.elem = elem || "need-share-button";

    

    // get title from html
    root.getTitle = function () {
      var content;
      // check querySelector existance for old browsers
      if (document.querySelector) {
        content = document.querySelector("title");
        if (content) {
          return content.innerText;
        }
      }
      return document.title;
    };

    // get image from html
    root.getImage = function () {
      var content;
      // check querySelector existance for old browsers
      if (document.querySelector) {
        content = document.querySelector("meta[property=\"og:image\"]") ||
                  document.querySelector("meta[name=\"twitter:image\"]");
        if (content) {
          return content.getAttribute("content");
        } else {
          return "";
        }
      } else {
        return "";
      }
    };

    // get description from html
    root.getDescription = function () {
      var content;
      // check querySelector existance for old browsers
      if (document.querySelector) {
        content = document.querySelector("meta[property=\"og:description\"]") ||
                  document.querySelector("meta[name=\"twitter:description\"]") ||
                  document.querySelector("meta[name=\"description\"]");
        if (content) {
          return content.getAttribute("content");
        } else {
          return "";
        }
      } else {
        content = document.getElementsByTagName("meta").namedItem("description");
        if (content) {
          return content.getAttribute("content");
        } else {
          return "";
        }
      }
    };

    // share urls for all networks
    root.share = {
      "weibo": function (el) {
        var myoptions = getOptions(el);
        var url = "http://v.t.sina.com.cn/share/share.php?title=" +
          encodeURIComponent(myoptions.title) +
          "&url=" + encodeURIComponent(myoptions.url) +
          "&pic=" + encodeURIComponent(myoptions.image);
        root.popup(url);
      },
      "wechat": function (el) {
        var myoptions = getOptions(el);
        var imgSrc = "https://pan.baidu.com/share/qrcode?w=400&h=400&url=" + encodeURIComponent(myoptions.url);
        var dropdownEl = el.querySelector(".need-share-button_dropdown");
        var img = dropdownEl.getElementsByClassName("need-share-wechat-code-image")[0];
        if (img) {
          img.remove();
        } else {
          img = document.createElement("img");
          img.src = imgSrc;
          img.alt = "loading wechat image...";
          img.setAttribute("class", "need-share-wechat-code-image");

          if (root.options.position == 'middleRight') {
            dropdownEl.insertBefore(img, dropdownEl.children[0]);
          }
          else {
            dropdownEl.appendChild(img);
          }
        }
      },
      "douban": function (el) {
        var myoptions = getOptions(el);
        var url = "https://www.douban.com/share/service?name=" +
          encodeURIComponent(myoptions.title) +
          "&href=" + encodeURIComponent(myoptions.url) +
          "&image=" + encodeURIComponent(myoptions.image);
        root.popup(url);
      },
      "qqzone": function (el) {
        var myoptions = getOptions(el);
        var url = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=" +
          encodeURIComponent(myoptions.title) +
          "&url=" + encodeURIComponent(myoptions.url) +
          "&pics=" + encodeURIComponent(myoptions.image) +
          "&desc=" + encodeURIComponent(myoptions.description);
        root.popup(url);
      },
      "renren": function (el) {
        var myoptions = getOptions(el);
        var url = "http://widget.renren.com/dialog/share?title=" +
          encodeURIComponent(myoptions.title) +
          "&resourceUrl=" + encodeURIComponent(myoptions.url) +
          "&pic=" + encodeURIComponent(myoptions.image) +
          "&description=" + encodeURIComponent(myoptions.description);
        root.popup(url);
      },
      "mailto": function (el) {
        var myoptions = getOptions(el);
        var url = "mailto:?subject=" + encodeURIComponent(myoptions.title) +
          "&body=Thought you might enjoy reading this: " + encodeURIComponent(myoptions.url) +
          " - " + encodeURIComponent(myoptions.description);

        window.location.href = url;
      },
      "twitter": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "twitter.com/intent/tweet?text=";
        url += encodeURIComponent(myoptions.title) + "&url=" + encodeURIComponent(myoptions.url);

        root.popup(url);
      },
      "pinterest": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "pinterest.com/pin/create/bookmarklet/?is_video=false";
        url += "&media=" + encodeURIComponent(myoptions.image);
        url += "&url=" + encodeURIComponent(myoptions.url);
        url += "&description=" + encodeURIComponent(myoptions.title);

        root.popup(url);
      },
      "facebook": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "www.facebook.com/share.php?";
        url += "u=" + encodeURIComponent(myoptions.url);
        url += "&title=" + encodeURIComponent(myoptions.title);

        root.popup(url);
      },
      "googleplus": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "plus.google.com/share?";
        url += "url=" + encodeURIComponent(myoptions.url);

        root.popup(url);
      },
      "reddit": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "www.reddit.com/submit?";
        url += "url=" + encodeURIComponent(myoptions.url);
        url += "&title=" + encodeURIComponent(myoptions.title);

        root.popup(url);
      },
      "delicious": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "del.icio.us/post?";
        url += "url=" + encodeURIComponent(myoptions.url);
        url += "&title=" + encodeURIComponent(myoptions.title);
        url += "&notes=" + encodeURIComponent(myoptions.description);

        root.popup(url);
      },
      "stumbleupon": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "www.stumbleupon.com/submit?";
        url += "url=" + encodeURIComponent(myoptions.url);
        url += "&title=" + encodeURIComponent(myoptions.title);

        root.popup(url);
      },
      "linkedin": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "www.linkedin.com/shareArticle?mini=true";
        url += "&url=" + encodeURIComponent(myoptions.url);
        url += "&title=" + encodeURIComponent(myoptions.title);
        url += "&source=" + encodeURIComponent(myoptions.source);

        root.popup(url);
      },
      "slashdot": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "slashdot.org/bookmark.pl?";
        url += "url=" + encodeURIComponent(myoptions.url);
        url += "&title=" + encodeURIComponent(myoptions.title);

        root.popup(url);
      },
      "technorati": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "technorati.com/faves?";
        url += "add=" + encodeURIComponent(myoptions.url);
        url += "&title=" + encodeURIComponent(myoptions.title);

        root.popup(url);
      },
      "posterous": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "posterous.com/share?";
        url += "linkto=" + encodeURIComponent(myoptions.url);

        root.popup(url);
      },
      "tumblr": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "www.tumblr.com/share?v=3";
        url += "&u=" + encodeURIComponent(myoptions.url);
        url += "&t=" + encodeURIComponent(myoptions.title);

        root.popup(url);
      },
      "googlebookmarks": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "www.google.com/bookmarks/mark?op=edit";
        url += "&bkmk=" + encodeURIComponent(myoptions.url);
        url += "&title=" + encodeURIComponent(myoptions.title);
        url += "&annotation=" + encodeURIComponent(myoptions.description);

        root.popup(url);
      },
      "newsvine": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "www.newsvine.com/_tools/seed&save?";
        url += "u=" + encodeURIComponent(myoptions.url);
        url += "&h=" + encodeURIComponent(myoptions.title);

        root.popup(url);
      },
      "evernote": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "www.evernote.com/clip.action?";
        url += "url=" + encodeURIComponent(myoptions.url);
        url += "&title=" + encodeURIComponent(myoptions.title);

        root.popup(url);
      },
      "friendfeed": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "www.friendfeed.com/share?";
        url += "url=" + encodeURIComponent(myoptions.url);
        url += "&title=" + encodeURIComponent(myoptions.title);

        root.popup(url);
      },
      "vkontakte": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "vkontakte.ru/share.php?";
        url += "url=" + encodeURIComponent(myoptions.url);
        url += "&title=" + encodeURIComponent(myoptions.title);
        url += "&description=" + encodeURIComponent(myoptions.description);
        url += "&image=" + encodeURIComponent(myoptions.image);
        url += "&noparse=true";

        root.popup(url);
      },
      "odnoklassniki": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1";
        url += "&st.comments=" + encodeURIComponent(myoptions.description);
        url += "&st._surl=" + encodeURIComponent(myoptions.url);

        root.popup(url);
      },
      "mailru": function (el) {
        var myoptions = getOptions(el);
        var url = myoptions.protocol + "connect.mail.ru/share?";
        url += "url=" + encodeURIComponent(myoptions.url);
        url += "&title=" + encodeURIComponent(myoptions.title);
        url += "&description=" + encodeURIComponent(myoptions.description);
        url += "&imageurl=" + encodeURIComponent(myoptions.image);

        root.popup(url);
      }

    };

    // open share link in a popup
    root.popup = function (url) {
      // set left and top position
      var popupWidth = 600,
        popupHeight = 500,
        // fix dual screen mode
        dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left,
        dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top,
        width = window.innerWidth ?
                window.innerWidth :
                document.documentElement.clientWidth ?
                document.documentElement.clientWidth :
                screen.width,
        height = window.innerHeight ?
                 window.innerHeight :
                 document.documentElement.clientHeight ?
                 document.documentElement.clientHeight :
                 screen.height,
        // calculate top and left position
        left = ((width / 2) - (popupWidth / 2)) + dualScreenLeft,
        top = ((height / 2) - (popupHeight / 2)) + dualScreenTop,

        // show popup
        shareWindow = window.open(url, "targetWindow",
          "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=" + popupWidth +
          ", height=" + popupHeight + ", top=" + top + ", left=" + left);

      // Puts focus on the newWindow
      if (window.focus) {
        shareWindow.focus();
      }
    };

    

    // create default options
    root.options = {
      iconStyle: "default", // default or box
      boxForm: "horizontal", // horizontal or vertical
      position: "bottomCenter", // top / middle / bottom + Left / Center / Right
      protocol: ["http", "https"].indexOf(window.location.href.split(":")[0]) === -1 ? "https://" : "//",
      networks: "Weibo,Wechat,Douban,QQZone,Twitter,Pinterest,Facebook,GooglePlus,Reddit,Linkedin,Tumblr,Evernote"
    };

    // integrate custom options
    for (var i in options) {
      if (options.hasOwnProperty(i)) {
        root.options[i] = options[i];
      }
    }
    // convert networks string into array
    //root.options.networks = root.options.networks.toLowerCase().split(",");
    root.options.networks = root.options.networks.split(",");

    function getOptions(el) {
      // integrate data attribute options
      var ret = {};
      for (var i in root.options) {
        if (root.options.hasOwnProperty(i)) {
          ret[i] = root.options[i];
        }
      }

      // these attrs must get dynamically.
      ret.url = window.location.href;
      ret.title = root.getTitle();
      ret.image = root.getImage();
      ret.description = root.getDescription();

      for (var option in el.dataset) {
        // replace only 'share-' prefixed data-attributes
        if (option.match(/share/)) {
          var newOption = option.replace(/share/, "");
          if (!newOption.length) {
            continue;
          }
          newOption = newOption.charAt(0).toLowerCase() + newOption.slice(1);
          var val = el.dataset[option];
          if (newOption === "networks") {
            //val = val.toLowerCase().split(",");
            val = val.split(",");
          } else if (newOption === "url" && val && val[0] === "/") {
            // fix relative url problem.
            val = location.origin + val;
          }
          ret[newOption] = val;
        }
      }
      return ret;
    }

    function createDropdown(el) {
      // create dropdown
      var dropdownEl = document.createElement("span");
      dropdownEl.className = "need-share-button_dropdown";
      if (el.querySelector(".need-share-button_dropdown")) {
        return;
      }
      var myoptions = getOptions(el);

      // set dropdown row length
      if (myoptions.iconStyle == "default" && myoptions.boxForm == "vertical") {
        dropdownEl.className += " need-share-button_dropdown-box-vertical";
      } else if (myoptions.iconStyle == "box" && myoptions.boxForm == "horizontal") {
        dropdownEl.className += " need-share-button_dropdown-box-horizontal";
      } else if (myoptions.iconStyle == "box" && myoptions.boxForm == "vertical") {
        dropdownEl.className += " need-share-button_dropdown-box-vertical";
      }

      // set dropdown position
      setTimeout(function () {
        switch (myoptions.position) {
          case "topLeft":
            dropdownEl.className += " need-share-button_dropdown-top-left";
            break;
          case "topRight":
            dropdownEl.className += " need-share-button_dropdown-top-right";
            break;
          case "topCenter":
            dropdownEl.className += " need-share-button_dropdown-top-center";
            dropdownEl.style.marginLeft = -dropdownEl.offsetWidth / 2 + "px";
            break;
          case "middleLeft":
            dropdownEl.className += " need-share-button_dropdown-middle-left";
            dropdownEl.style.marginTop = -dropdownEl.offsetHeight / 2 + "px";
            break;
          case "middleRight":
            dropdownEl.className += " need-share-button_dropdown-middle-right";
            dropdownEl.style.marginTop = -dropdownEl.offsetHeight / 2 + "px";
            break;
          case "bottomLeft":
            dropdownEl.className += " need-share-button_dropdown-bottom-left";
            break;
          case "bottomRight":
            dropdownEl.className += " need-share-button_dropdown-bottom-right";
            break;
          case "bottomCenter":
            dropdownEl.className += " need-share-button_dropdown-bottom-center";
            dropdownEl.style.marginLeft = -dropdownEl.offsetWidth / 2 + "px";
            break;
          default:
            dropdownEl.className += " need-share-button_dropdown-bottom-center";
            dropdownEl.style.marginLeft = -dropdownEl.offsetWidth / 2 + "px";
            break;
        }
      }, 1);


      // fill fropdown with buttons
      var iconClass = myoptions.iconStyle == "default" ?
                      "need-share-button_link need-share-button_" :
                      "need-share-button_link-" + myoptions.iconStyle + " need-share-button_link need-share-button_";
      for (var network in myoptions.networks) {
        if (myoptions.networks.hasOwnProperty(network)) {
          var link = document.createElement("span");
          network = myoptions.networks[network].trim();
          var networkLC = network.toLowerCase();
          link.className = iconClass + networkLC;
          var fontello = ["weibo", "wechat", "douban", "qqzone", "renren"];
          if (fontello.indexOf(networkLC) === -1) {
            link.className += " social-" + networkLC;
          } else {
            link.className += " icon-" + networkLC;
          }
          link.dataset.network = networkLC;
          link.title = network;
          dropdownEl.appendChild(link);
        }
      }

      dropdownEl.addEventListener("click", function (event) {
        if (closest(event.target, ".need-share-button_link")) {
          event.preventDefault();
          event.stopPropagation();

          root.share[event.target.dataset.network](el);
          return false;
        }
      });

      el.appendChild(dropdownEl);
    }

    // close on click outside
    document.addEventListener("click", function (event) {
      var openedEl = document.querySelector(".need-share-button-opened");
      if (!closest(event.target, ".need-share-button-opened")) {
        if (openedEl) {
          openedEl.classList.remove("need-share-button-opened");

          // hide wechat code image when close the dropdown.
          if (openedEl.querySelector(".need-share-wechat-code-image")) {
            openedEl.querySelector(".need-share-wechat-code-image").remove();
          }
        } else {
          var el = closest(event.target, root.elem);
          if (el) {
            if (!el.classList.contains("need-share-button-opened")) {
              createDropdown(el);
              setTimeout(function () {
                el.classList.add("need-share-button-opened");
              }, 1);
            }
          }
        }
      } else {
        setTimeout(function () {
          openedEl.classList.remove("need-share-button-opened");

          // hide wechat code image when close the dropdown.
          if (openedEl.querySelector(".need-share-wechat-code-image")) {
            openedEl.querySelector(".need-share-wechat-code-image").remove();
          }
        }, 1);
      }
    });

  };
})();;;(function (factory) {
	var registeredInModuleLoader = false;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return (document.cookie = key + '=' + value + stringifiedAttributes);
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));;$(document).ready(function() {

  

  // Set relative link path (without domain)
  var rpath = window.location.href.replace(window.location.origin, '');

  // Write position in cookie
  var timeout;
  $(window).on('scroll', function() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      Cookies.set('scroll-cookie', $(window).scrollTop() + '|' + rpath, { expires: 365, path: '' });
    }, 250);
  });

  // Read position from cookie
  if (Cookies.get('scroll-cookie') !== undefined) {
    var cvalues = Cookies.get('scroll-cookie').split('|');
    if (cvalues[1] === rpath) {
      $(window).scrollTop(cvalues[0]);
    }
  }

});;!function(e,t,a){function n(){c(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"),o(),r()}function r(){for(var e=0;e<d.length;e++)d[e].alpha<=0?(t.body.removeChild(d[e].el),d.splice(e,1)):(d[e].y--,d[e].scale+=.004,d[e].alpha-=.013,d[e].el.style.cssText="left:"+d[e].x+"px;top:"+d[e].y+"px;opacity:"+d[e].alpha+";transform:scale("+d[e].scale+","+d[e].scale+") rotate(45deg);background:"+d[e].color+";z-index:99999");requestAnimationFrame(r)}function o(){var t="function"==typeof e.onclick&&e.onclick;e.onclick=function(e){t&&t(),i(e)}}function i(e){var a=t.createElement("div");a.className="heart",d.push({el:a,x:e.clientX-5,y:e.clientY-5,scale:1,alpha:1,color:s()}),t.body.appendChild(a)}function c(e){var a=t.createElement("style");a.type="text/css";try{a.appendChild(t.createTextNode(e))}catch(t){a.styleSheet.cssText=e}t.getElementsByTagName("head")[0].appendChild(a)}function s(){return"rgb("+~~(255*Math.random())+","+~~(255*Math.random())+","+~~(255*Math.random())+")"}var d=[];e.requestAnimationFrame=function(){return e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(e){setTimeout(e,1e3/60)}}(),n()}(window,document);;<!--崩溃欺骗-->
var OriginTitile = document.title;
 var titleTime;
 document.addEventListener('visibilitychange', function () {
     if (document.hidden) {
         $('[rel="icon"]').attr('href', "/images/favicon-16x16-next.png");
         document.title = '╭(°A°`)╮ 页面崩溃啦 ~';
         clearTimeout(titleTime);
     }
     else {
         $('[rel="icon"]').attr('href', "/images/favicon-16x16.ico");
         document.title = '(ฅ>ω<*ฅ) 噫又好了~' + OriginTitile;
         titleTime = setTimeout(function () {
             document.title = OriginTitile;
         }, 2000);
     }
 });