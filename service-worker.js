/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["404.html","88b1f7bdd91461cdfba5f16d19a0eaba"],["Frp.html","1374a95d23bdd176d3829220e141313a"],["HUT-Email.html","638860aeb840f43d41640bb6906dbb9a"],["Pisen.html","8a6df9f0d13ec23a64033c6b31213b45"],["Router.html","1b2dad5bee17694b25bb012054969a37"],["about/index.html","ec88f4b39255d16f8349841e2ce8548b"],["archives/2017/05/index.html","d72f8f85ba9cd0e95121a37aff057df5"],["archives/2017/index.html","970e09953d02d8172d72dddc5fddf795"],["archives/2018/04/index.html","2fda791a12ca809a0a53636f1208a935"],["archives/2018/06/index.html","3024be6ee5bd392265d7c4ebabb08f15"],["archives/2018/index.html","c4f4d0bc6807d577320b1710fe753a0b"],["archives/index.html","0bf62eee82ccc13efa99bdcdcbd895fe"],["baidu_verify_2uqBqFplr1.html","c47e1088d614fbdfc57f86e335b371bc"],["categories/index.html","f4f4ef7ae0a064f959ecea072dbbeb93"],["categories/教程/index.html","020083146b89ff7a8ddb8038032afd54"],["categories/路由器/index.html","1273f92edbf37c6ba9fd4755ed880f4c"],["css/main.css","a380fc8dd1f57a20af9f18ccaeb82d0d"],["hello-hexo.html","2da4fca7abea31a319981c58bb508da9"],["images/algolia_logo.svg","fd40b88ac5370a5353a50b8175c1f367"],["images/apple-touch-icon-next.png","6b0ffb5011024fa269ffae0a5adff354"],["images/avatar.gif","b78c276bf4d2cb33fa5f2fdac192cdc1"],["images/avatar.png","6d080d10f8a4e4da5e56e792de5a5bcb"],["images/cc-by-nc-nd.svg","1c681acc4a150e7236254c464bb5a797"],["images/cc-by-nc-sa.svg","12b4b29e8453be5b7828b524d3feabce"],["images/cc-by-nc.svg","dd9cfe99ed839a4a548114f988d653f4"],["images/cc-by-nd.svg","2d80546af20128215dc1e23ef42d06c2"],["images/cc-by-sa.svg","c696b3db81cbbfba32f66c1dc88b909a"],["images/cc-by.svg","6c4f8422b3725cb9f26b6c00e95fc88b"],["images/cc-zero.svg","79deee77a07fcb79ff680ac0125eacb9"],["images/favicon-16x16-next.png","f4b322fb420b52779e86ef5fda137daf"],["images/favicon-32x32-next.png","fd689465348dd0dcd94113c72eef0031"],["images/loading.gif","c2196de8ba412c60c22ab491af7b1409"],["images/logo.svg","ddad9027e42111ccd5b466bc18188970"],["images/placeholder.gif","c2196de8ba412c60c22ab491af7b1409"],["images/quote-l.svg","1238a4baccd02c6025ec85b58f4282d4"],["images/quote-r.svg","85787c6fa27965c81f7be70252b43bed"],["images/searchicon.png","986fe2c80d61c065cd8583a6f3d57fc2"],["images/virgo.png","02bc7a2cdb609aa9ff81654a286cc44f"],["index.html","f036e9febc0703ff701b9086e1ff0305"],["js/src/affix.js","f117a3586e463c75c61fde98e5c71770"],["js/src/algolia-search.js","62d7d2b452944aad3f1253836d36bba4"],["js/src/bootstrap.js","a2cfd6b2cecb9f6fadd47a8ad3c4a8c4"],["js/src/duoshuoshuo.js","7664f4dba1046160e939f6369de49978"],["js/src/exturl.js","ffb4519829fbd408d2666ddfad5fa8cc"],["js/src/js.cookie.js","6e9eb1f53afb135aedaf90739c867738"],["js/src/love.js","5a87dd19400b2870ef6734f56cfe2208"],["js/src/motion.js","47f7900be91fee65e72f8322a0dfde35"],["js/src/post-details.js","4b105aaa8b2a64283d31b80304a1673d"],["js/src/schemes/pisces.js","cd69f3df46f54d5151befd698738a9b7"],["js/src/scroll-cookie.js","3f0a99d7b74dd63bc2382eb28c4de003"],["js/src/scrollspy.js","a319bd0a0a374a2d2cd239c1eb1c16c2"],["js/src/utils.js","5dc05874712f74bee8c9045f0350adf9"],["lib/font-awesome/css/font-awesome.css","c97c3824a8d6c5eb936727310d68fe87"],["lib/font-awesome/css/font-awesome.min.css","269550530cc127b6aa5a35925a7de6ce"],["lib/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["lib/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["lib/needsharebutton/README.html","3bc700e5a1695c37beb47a8e43d8b475"],["lib/needsharebutton/needsharebutton.css","f2ee50925331239b4afe869c5a1426a0"],["lib/needsharebutton/needsharebutton.js","fd398da8fc2ee8ce84857a242888687a"],["lib/ua-parser-js/dist/ua-parser.min.js","a6e833266c4b41fabb9ba94a145322d8"],["lib/ua-parser-js/dist/ua-parser.pack.js","6b627e4d61a7135952824bb9c1a4a134"],["mentohust.html","2147509a066f2665e08d8a443a4a4031"],["static/api/css/imgshare.css","078f05df566c82c7434cbf94c8039d43"],["static/api/css/like.css","8fec436c0680222b9541b49cdeefc8df"],["static/api/css/select_share.css","02825fe40d1d61551bcc4daa1c12e4fc"],["static/api/css/share_popup.css","59dd88d5314110f3b70c016f97c1005f"],["static/api/css/share_style0_16.css","4394e2ccbec032ba54571d4c8fb9774c"],["static/api/css/share_style0_24.css","fb69219add3a7f87a0506c4f28589043"],["static/api/css/share_style0_32.css","a4ae2c1bf99d348726b67ef1dd13d50c"],["static/api/css/share_style1_16.css","f15e55a9fc4fc8d518a542b62756910a"],["static/api/css/share_style1_24.css","b38c563d03a556351504317d85536f45"],["static/api/css/share_style1_32.css","2d3a5b7f38df07be482daf1e2254811f"],["static/api/css/share_style2.css","0b76847bf036632b6c1ea1be0c737b72"],["static/api/css/share_style2_16.css","25ff8076a4f22b535add9a756b67e1df"],["static/api/css/share_style2_24.css","634027fb01b62d5adc9d5af0aaafb4c1"],["static/api/css/share_style2_32.css","7404e283355ed99be2b78ce11e14b0c9"],["static/api/css/share_style4.css","e84151c53fc7996adaa0eeb3c09b0980"],["static/api/css/slide_share.css","c6c7d0f1f126a52cea429759f5a5056e"],["static/api/css/weixin_popup.css","649d0bf6887fa9aa519466d8415c071c"],["static/api/img/share/icons_0_16.png","f8fe712adcbe277d37a2bf6b91362611"],["static/api/img/share/icons_0_24.png","cc6389da0e1a06120431dfb3dcaa92d6"],["static/api/img/share/icons_0_32.png","766abf73c3181b2b649d8808acc572ea"],["static/api/img/share/icons_1_16.png","2140d70428939dc0c9555b39774cfc30"],["static/api/img/share/icons_1_24.png","1d80bcf3870b6fbea36dafce37be22f4"],["static/api/img/share/icons_1_32.png","8253f4f6a41f40c2dff87ae983ba0265"],["static/api/img/share/icons_2_16.png","5bf2283a46d0d92cc8e3feeb81508962"],["static/api/img/share/icons_2_24.png","590f4808a5979b956d0d05d9a64ca404"],["static/api/img/share/icons_2_32.png","d1da1e6d19cb0a30e3dcbf821bc5c881"],["static/api/img/share/l0.gif","a568ce9a9f2d4f5b16037c314e666e56"],["static/api/img/share/l1.gif","ab325a7c2c289a8d323b5cb33ffb4640"],["static/api/img/share/l2.gif","0f82ccee500a2beb41ecfdca47242a70"],["static/api/img/share/l3.gif","c3d2b8e18abf7b01bee295e478e2d043"],["static/api/img/share/l4.gif","46bdb528bbb34a26665d92cc4afa38d2"],["static/api/img/share/l5.gif","7d2b8d2c1474bc41ced7cb015e170970"],["static/api/img/share/l6.gif","59dbf427dbb55a9312a575a38759da8b"],["static/api/img/share/l7.gif","56d346aca407097a1bf935dadf4c2738"],["static/api/img/share/l8.gif","058c71a6003dac9e17b490dd31ac73d4"],["static/api/img/share/pop_c.gif","0402af3f608e8d97b61ace712d7108c8"],["static/api/img/share/r0.gif","823ff268cb1533c18ac75c79d9371706"],["static/api/img/share/r1.gif","60d7c44f2ff75187120d60755668db67"],["static/api/img/share/r2.gif","81fb45e1d1690089cb25fb3c08b06973"],["static/api/img/share/r3.gif","64f3c67a5e086dfc96bfedc776e62e61"],["static/api/img/share/r4.gif","ba6ed23c31e1e0f81b8b29e71a3eaae1"],["static/api/img/share/r5.gif","bc1b6451d4de64a2b1074c62c90e5a12"],["static/api/img/share/r6.gif","13e623c878180b56b44311fc8af9306f"],["static/api/img/share/r7.gif","cc0f73f4ec9c7cd0494867ca053cdaac"],["static/api/img/share/r8.gif","e7360c711205dea02ff1f80c640a093b"],["static/api/img/share/sc.png","8fd98fddd3cfac30ba71cdd3a970ff04"],["static/api/img/share/selectshare_close.png","eeccbf360e3c168b66bf08a71b34ee88"],["static/api/img/share/share-search-icon.png","2dfa3ff22f5285544db0ca6d88109db5"],["static/api/js/base/class.js","baecf37aeee2bcbedff122bf8f3d3e8b"],["static/api/js/base/tangram.js","81040e695eba15ff3767063e37768233"],["static/api/js/component/animate.js","38ea46901ac6a60728406fcf5b737477"],["static/api/js/component/anticheat.js","f47bd58aec3aa26ea578b95044b9b245"],["static/api/js/component/comm_tools.js","77247e36d8bcf620d0faa577cb5ac077"],["static/api/js/component/partners.js","60b64b3e1452ec2abe740687911c4302"],["static/api/js/component/pop_base.js","a4374af8d1508d034aaefc2d36f92e70"],["static/api/js/component/pop_dialog.js","12444a745d262069a96b7f39d479767d"],["static/api/js/component/pop_popup.js","ecb7201c0cdc5a9479eecaf74387b4e1"],["static/api/js/component/pop_popup_slide.js","216b2f432175cae5d316f8d133ebfae3"],["static/api/js/component/qrcode.js","d74807f3c8eb0afe40c69c24d69754a9"],["static/api/js/conf/const.js","9e49aed6498d166e1196503be8724785"],["static/api/js/conf/define.js","edc8f648433e5fb942e41c9d186a3f08"],["static/api/js/share.js","e541793a094fa0b301a66538ed5678ab"],["static/api/js/share/api_base.js","7abf8bdf4939d97f3141e355f781d1c6"],["static/api/js/share/combine_api.js","e86ac4a099f8f3c5fbc724588d37a7b3"],["static/api/js/share/image_api.js","b4f9e827c6cfdeed4a8899ca94e85273"],["static/api/js/share/like_api.js","82e7b74d8b84f8a351df3d86d3693f0a"],["static/api/js/share/likeshare.js","9eecb7db59d16c80417c72d1e1f4fbf1"],["static/api/js/share/select_api.js","be599bd13808c256de5b662ba63667f1"],["static/api/js/share/share_api.js","aeed62b9ab154e66264b41be226108fe"],["static/api/js/share/slide_api.js","0cdb6ce64560b238ed230353ec14f516"],["static/api/js/start/router.js","3e9cfc637b10d155381043d30a63fa38"],["static/api/js/trans/data.js","d41d8cd98f00b204e9800998ecf8427e"],["static/api/js/trans/logger.js","d41d8cd98f00b204e9800998ecf8427e"],["static/api/js/trans/trans.js","c35826a8e8c39c2a386e3e4d3cbca282"],["static/api/js/trans/trans_bdxc.js","8a65a16a683f36ae892343337ac21555"],["static/api/js/trans/trans_bdysc.js","e759c9e370b39b884b04e222fc21acaa"],["static/api/js/trans/trans_weixin.js","5c62680f96222ec5671a5905540b6ccf"],["static/api/js/view/image_view.js","f534297c3d6307a81eb162fc90cb7240"],["static/api/js/view/like_view.js","d5deb4ffeeeed06ace8f4479df3e0eca"],["static/api/js/view/select_view.js","29f5d7fc9a474b4ec18ce5f685fc7cec"],["static/api/js/view/share_view.js","f41f7713e6684dcbcd8304843ae6026d"],["static/api/js/view/slide_view.js","962eae6aabf14115f23e57b6bd55e23d"],["static/api/js/view/view_base.js","e719093c5a4ff674bcefbfe80f4dee2b"],["tags/OpenWrt/index.html","4cb6aa3464d208be5a9f41ee4cf28be3"],["tags/index.html","a9570df91442d58514a3558b0c8a250f"],["tags/linux/index.html","125347efe3c2a5ea64183e07347a64bc"],["tags/教程/index.html","e346713895966b8bca25c9fb238488b7"],["tags/路由/index.html","4c9fb8e94779fca2e82a60f43810fa74"],["tags/路由器/index.html","78128a4ba3968b38279a86313e8be518"],["tags/锐捷/index.html","903c76e6510888dd0bc3c66ba6443673"],["vlmcsd.html","1ec31ce72502ba496fdf51cd53a60d9e"],["路由器使用百度云远程下载.html","647a682eb863ed964d4cc28477a8733d"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







