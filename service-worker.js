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

var precacheConfig = [["E:/hexo/public/404.html","88b1f7bdd91461cdfba5f16d19a0eaba"],["E:/hexo/public/Frp.html","5e293286e942ca69fc01bd749fc4c99d"],["E:/hexo/public/HUT-Email.html","8e824b765caf2edebaa43d97101e4e4d"],["E:/hexo/public/Pisen.html","9992951dc5f9d896bdaa0df3726d6094"],["E:/hexo/public/Router.html","22e9ad191028a2ca79a102c4538ce09f"],["E:/hexo/public/about/index.html","97f2994b0e9426c01958aed18fdc2dc2"],["E:/hexo/public/archives/2017/05/index.html","c1e180c049d472e7d233e4e8e643cd57"],["E:/hexo/public/archives/2017/index.html","dea2970363fff1b43b335afc45825855"],["E:/hexo/public/archives/2018/04/index.html","3650200dce836f3d974cee77ce4dd014"],["E:/hexo/public/archives/2018/06/index.html","500d44e2f0434352ce03b5526540cf69"],["E:/hexo/public/archives/2018/index.html","8e14c9ce7074c4f04e56c5edc1969d22"],["E:/hexo/public/archives/index.html","cc28f0f237d4bb8f9520f052e3c370f7"],["E:/hexo/public/baidu_verify_2uqBqFplr1.html","c47e1088d614fbdfc57f86e335b371bc"],["E:/hexo/public/categories/index.html","1d113355f1881a1518386adb432aaf4a"],["E:/hexo/public/categories/教程/index.html","4b8ad9e3d003948dc676e220cc0a4f37"],["E:/hexo/public/categories/路由器/index.html","aac73609d00ae0f4441f3b89962c49a9"],["E:/hexo/public/css/main.css","d9e54407ba31b6659c7ad9f484c159fa"],["E:/hexo/public/hello-hexo.html","ca4fc151062c0dade9134766488f1e5c"],["E:/hexo/public/images/algolia_logo.svg","fd40b88ac5370a5353a50b8175c1f367"],["E:/hexo/public/images/apple-touch-icon-next.png","6b0ffb5011024fa269ffae0a5adff354"],["E:/hexo/public/images/avatar.gif","b78c276bf4d2cb33fa5f2fdac192cdc1"],["E:/hexo/public/images/avatar.png","6d080d10f8a4e4da5e56e792de5a5bcb"],["E:/hexo/public/images/cc-by-nc-nd.svg","1c681acc4a150e7236254c464bb5a797"],["E:/hexo/public/images/cc-by-nc-sa.svg","12b4b29e8453be5b7828b524d3feabce"],["E:/hexo/public/images/cc-by-nc.svg","dd9cfe99ed839a4a548114f988d653f4"],["E:/hexo/public/images/cc-by-nd.svg","2d80546af20128215dc1e23ef42d06c2"],["E:/hexo/public/images/cc-by-sa.svg","c696b3db81cbbfba32f66c1dc88b909a"],["E:/hexo/public/images/cc-by.svg","6c4f8422b3725cb9f26b6c00e95fc88b"],["E:/hexo/public/images/cc-zero.svg","79deee77a07fcb79ff680ac0125eacb9"],["E:/hexo/public/images/favicon-16x16-next.png","f4b322fb420b52779e86ef5fda137daf"],["E:/hexo/public/images/favicon-32x32-next.png","fd689465348dd0dcd94113c72eef0031"],["E:/hexo/public/images/loading.gif","c2196de8ba412c60c22ab491af7b1409"],["E:/hexo/public/images/logo.svg","ddad9027e42111ccd5b466bc18188970"],["E:/hexo/public/images/placeholder.gif","c2196de8ba412c60c22ab491af7b1409"],["E:/hexo/public/images/quote-l.svg","1238a4baccd02c6025ec85b58f4282d4"],["E:/hexo/public/images/quote-r.svg","85787c6fa27965c81f7be70252b43bed"],["E:/hexo/public/images/searchicon.png","986fe2c80d61c065cd8583a6f3d57fc2"],["E:/hexo/public/images/virgo.png","02bc7a2cdb609aa9ff81654a286cc44f"],["E:/hexo/public/index.html","f2b57697e33fec328d2218999bea07c1"],["E:/hexo/public/js/src/affix.js","f117a3586e463c75c61fde98e5c71770"],["E:/hexo/public/js/src/algolia-search.js","62d7d2b452944aad3f1253836d36bba4"],["E:/hexo/public/js/src/bootstrap.js","a2cfd6b2cecb9f6fadd47a8ad3c4a8c4"],["E:/hexo/public/js/src/duoshuoshuo.js","7664f4dba1046160e939f6369de49978"],["E:/hexo/public/js/src/exturl.js","ffb4519829fbd408d2666ddfad5fa8cc"],["E:/hexo/public/js/src/js.cookie.js","6e9eb1f53afb135aedaf90739c867738"],["E:/hexo/public/js/src/love.js","5a87dd19400b2870ef6734f56cfe2208"],["E:/hexo/public/js/src/motion.js","47f7900be91fee65e72f8322a0dfde35"],["E:/hexo/public/js/src/post-details.js","4b105aaa8b2a64283d31b80304a1673d"],["E:/hexo/public/js/src/schemes/pisces.js","cd69f3df46f54d5151befd698738a9b7"],["E:/hexo/public/js/src/scroll-cookie.js","3f0a99d7b74dd63bc2382eb28c4de003"],["E:/hexo/public/js/src/scrollspy.js","a319bd0a0a374a2d2cd239c1eb1c16c2"],["E:/hexo/public/js/src/utils.js","5dc05874712f74bee8c9045f0350adf9"],["E:/hexo/public/lib/fancybox/README.html","a5fb3a9c4c11e39b6df3ac8d1c41f0fe"],["E:/hexo/public/lib/fancybox/source/jquery.fancybox.css","b18cfa50b229dd4fdd28d5fc5ecc98e1"],["E:/hexo/public/lib/fancybox/source/jquery.fancybox.js","6db039c0a0eb14f5631682b8e33ed9f9"],["E:/hexo/public/lib/fancybox/source/jquery.fancybox.min.css","c873f743d0cc3d3833e9ae3447c4b75e"],["E:/hexo/public/lib/fancybox/source/jquery.fancybox.min.js","1fc6ecaf7ea433969308380b40808fe8"],["E:/hexo/public/lib/fancybox/source/jquery.fancybox.pack.js","6db039c0a0eb14f5631682b8e33ed9f9"],["E:/hexo/public/lib/fastclick/README.html","9c103bb973c239ceaf076302407ed9b7"],["E:/hexo/public/lib/fastclick/lib/fastclick.js","6e9d3b0da74f2a4a7042b494cdaa7c2e"],["E:/hexo/public/lib/fastclick/lib/fastclick.min.js","a0fc6c24d1f3ff9ac281887c92b24acd"],["E:/hexo/public/lib/font-awesome/css/font-awesome.css","c97c3824a8d6c5eb936727310d68fe87"],["E:/hexo/public/lib/font-awesome/css/font-awesome.min.css","269550530cc127b6aa5a35925a7de6ce"],["E:/hexo/public/lib/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["E:/hexo/public/lib/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["E:/hexo/public/lib/jquery_lazyload/README.html","ff14e87f70130c31b5a7626ce6af982b"],["E:/hexo/public/lib/jquery_lazyload/jquery.lazyload.js","8b427f9e86864ee3aaf1ae33e6e14263"],["E:/hexo/public/lib/jquery_lazyload/jquery.scrollstop.js","f163fd8f02361928853668a96f8a1249"],["E:/hexo/public/lib/needsharebutton/README.html","3bc700e5a1695c37beb47a8e43d8b475"],["E:/hexo/public/lib/needsharebutton/needsharebutton.css","f2ee50925331239b4afe869c5a1426a0"],["E:/hexo/public/lib/needsharebutton/needsharebutton.js","fd398da8fc2ee8ce84857a242888687a"],["E:/hexo/public/lib/ua-parser-js/dist/ua-parser.min.js","a6e833266c4b41fabb9ba94a145322d8"],["E:/hexo/public/lib/ua-parser-js/dist/ua-parser.pack.js","6b627e4d61a7135952824bb9c1a4a134"],["E:/hexo/public/mentohust.html","6fefa4ba9c13d4957d1571aa93a9e82d"],["E:/hexo/public/static/api/css/imgshare.css","078f05df566c82c7434cbf94c8039d43"],["E:/hexo/public/static/api/css/like.css","8fec436c0680222b9541b49cdeefc8df"],["E:/hexo/public/static/api/css/select_share.css","02825fe40d1d61551bcc4daa1c12e4fc"],["E:/hexo/public/static/api/css/share_popup.css","59dd88d5314110f3b70c016f97c1005f"],["E:/hexo/public/static/api/css/share_style0_16.css","4394e2ccbec032ba54571d4c8fb9774c"],["E:/hexo/public/static/api/css/share_style0_24.css","fb69219add3a7f87a0506c4f28589043"],["E:/hexo/public/static/api/css/share_style0_32.css","a4ae2c1bf99d348726b67ef1dd13d50c"],["E:/hexo/public/static/api/css/share_style1_16.css","f15e55a9fc4fc8d518a542b62756910a"],["E:/hexo/public/static/api/css/share_style1_24.css","b38c563d03a556351504317d85536f45"],["E:/hexo/public/static/api/css/share_style1_32.css","2d3a5b7f38df07be482daf1e2254811f"],["E:/hexo/public/static/api/css/share_style2.css","0b76847bf036632b6c1ea1be0c737b72"],["E:/hexo/public/static/api/css/share_style2_16.css","25ff8076a4f22b535add9a756b67e1df"],["E:/hexo/public/static/api/css/share_style2_24.css","634027fb01b62d5adc9d5af0aaafb4c1"],["E:/hexo/public/static/api/css/share_style2_32.css","7404e283355ed99be2b78ce11e14b0c9"],["E:/hexo/public/static/api/css/share_style4.css","e84151c53fc7996adaa0eeb3c09b0980"],["E:/hexo/public/static/api/css/slide_share.css","c6c7d0f1f126a52cea429759f5a5056e"],["E:/hexo/public/static/api/css/weixin_popup.css","649d0bf6887fa9aa519466d8415c071c"],["E:/hexo/public/static/api/img/share/icons_0_16.png","f8fe712adcbe277d37a2bf6b91362611"],["E:/hexo/public/static/api/img/share/icons_0_24.png","cc6389da0e1a06120431dfb3dcaa92d6"],["E:/hexo/public/static/api/img/share/icons_0_32.png","766abf73c3181b2b649d8808acc572ea"],["E:/hexo/public/static/api/img/share/icons_1_16.png","2140d70428939dc0c9555b39774cfc30"],["E:/hexo/public/static/api/img/share/icons_1_24.png","1d80bcf3870b6fbea36dafce37be22f4"],["E:/hexo/public/static/api/img/share/icons_1_32.png","8253f4f6a41f40c2dff87ae983ba0265"],["E:/hexo/public/static/api/img/share/icons_2_16.png","5bf2283a46d0d92cc8e3feeb81508962"],["E:/hexo/public/static/api/img/share/icons_2_24.png","590f4808a5979b956d0d05d9a64ca404"],["E:/hexo/public/static/api/img/share/icons_2_32.png","d1da1e6d19cb0a30e3dcbf821bc5c881"],["E:/hexo/public/static/api/img/share/l0.gif","a568ce9a9f2d4f5b16037c314e666e56"],["E:/hexo/public/static/api/img/share/l1.gif","ab325a7c2c289a8d323b5cb33ffb4640"],["E:/hexo/public/static/api/img/share/l2.gif","0f82ccee500a2beb41ecfdca47242a70"],["E:/hexo/public/static/api/img/share/l3.gif","c3d2b8e18abf7b01bee295e478e2d043"],["E:/hexo/public/static/api/img/share/l4.gif","46bdb528bbb34a26665d92cc4afa38d2"],["E:/hexo/public/static/api/img/share/l5.gif","7d2b8d2c1474bc41ced7cb015e170970"],["E:/hexo/public/static/api/img/share/l6.gif","59dbf427dbb55a9312a575a38759da8b"],["E:/hexo/public/static/api/img/share/l7.gif","56d346aca407097a1bf935dadf4c2738"],["E:/hexo/public/static/api/img/share/l8.gif","058c71a6003dac9e17b490dd31ac73d4"],["E:/hexo/public/static/api/img/share/pop_c.gif","0402af3f608e8d97b61ace712d7108c8"],["E:/hexo/public/static/api/img/share/r0.gif","823ff268cb1533c18ac75c79d9371706"],["E:/hexo/public/static/api/img/share/r1.gif","60d7c44f2ff75187120d60755668db67"],["E:/hexo/public/static/api/img/share/r2.gif","81fb45e1d1690089cb25fb3c08b06973"],["E:/hexo/public/static/api/img/share/r3.gif","64f3c67a5e086dfc96bfedc776e62e61"],["E:/hexo/public/static/api/img/share/r4.gif","ba6ed23c31e1e0f81b8b29e71a3eaae1"],["E:/hexo/public/static/api/img/share/r5.gif","bc1b6451d4de64a2b1074c62c90e5a12"],["E:/hexo/public/static/api/img/share/r6.gif","13e623c878180b56b44311fc8af9306f"],["E:/hexo/public/static/api/img/share/r7.gif","cc0f73f4ec9c7cd0494867ca053cdaac"],["E:/hexo/public/static/api/img/share/r8.gif","e7360c711205dea02ff1f80c640a093b"],["E:/hexo/public/static/api/img/share/sc.png","8fd98fddd3cfac30ba71cdd3a970ff04"],["E:/hexo/public/static/api/img/share/selectshare_close.png","eeccbf360e3c168b66bf08a71b34ee88"],["E:/hexo/public/static/api/img/share/share-search-icon.png","2dfa3ff22f5285544db0ca6d88109db5"],["E:/hexo/public/static/api/js/base/class.js","baecf37aeee2bcbedff122bf8f3d3e8b"],["E:/hexo/public/static/api/js/base/tangram.js","81040e695eba15ff3767063e37768233"],["E:/hexo/public/static/api/js/component/animate.js","38ea46901ac6a60728406fcf5b737477"],["E:/hexo/public/static/api/js/component/anticheat.js","f47bd58aec3aa26ea578b95044b9b245"],["E:/hexo/public/static/api/js/component/comm_tools.js","77247e36d8bcf620d0faa577cb5ac077"],["E:/hexo/public/static/api/js/component/partners.js","60b64b3e1452ec2abe740687911c4302"],["E:/hexo/public/static/api/js/component/pop_base.js","a4374af8d1508d034aaefc2d36f92e70"],["E:/hexo/public/static/api/js/component/pop_dialog.js","12444a745d262069a96b7f39d479767d"],["E:/hexo/public/static/api/js/component/pop_popup.js","ecb7201c0cdc5a9479eecaf74387b4e1"],["E:/hexo/public/static/api/js/component/pop_popup_slide.js","216b2f432175cae5d316f8d133ebfae3"],["E:/hexo/public/static/api/js/component/qrcode.js","d74807f3c8eb0afe40c69c24d69754a9"],["E:/hexo/public/static/api/js/conf/const.js","9e49aed6498d166e1196503be8724785"],["E:/hexo/public/static/api/js/conf/define.js","edc8f648433e5fb942e41c9d186a3f08"],["E:/hexo/public/static/api/js/share.js","e541793a094fa0b301a66538ed5678ab"],["E:/hexo/public/static/api/js/share/api_base.js","7abf8bdf4939d97f3141e355f781d1c6"],["E:/hexo/public/static/api/js/share/combine_api.js","e86ac4a099f8f3c5fbc724588d37a7b3"],["E:/hexo/public/static/api/js/share/image_api.js","b4f9e827c6cfdeed4a8899ca94e85273"],["E:/hexo/public/static/api/js/share/like_api.js","82e7b74d8b84f8a351df3d86d3693f0a"],["E:/hexo/public/static/api/js/share/likeshare.js","9eecb7db59d16c80417c72d1e1f4fbf1"],["E:/hexo/public/static/api/js/share/select_api.js","be599bd13808c256de5b662ba63667f1"],["E:/hexo/public/static/api/js/share/share_api.js","aeed62b9ab154e66264b41be226108fe"],["E:/hexo/public/static/api/js/share/slide_api.js","0cdb6ce64560b238ed230353ec14f516"],["E:/hexo/public/static/api/js/start/router.js","3e9cfc637b10d155381043d30a63fa38"],["E:/hexo/public/static/api/js/trans/data.js","d41d8cd98f00b204e9800998ecf8427e"],["E:/hexo/public/static/api/js/trans/logger.js","d41d8cd98f00b204e9800998ecf8427e"],["E:/hexo/public/static/api/js/trans/trans.js","c35826a8e8c39c2a386e3e4d3cbca282"],["E:/hexo/public/static/api/js/trans/trans_bdxc.js","8a65a16a683f36ae892343337ac21555"],["E:/hexo/public/static/api/js/trans/trans_bdysc.js","e759c9e370b39b884b04e222fc21acaa"],["E:/hexo/public/static/api/js/trans/trans_weixin.js","5c62680f96222ec5671a5905540b6ccf"],["E:/hexo/public/static/api/js/view/image_view.js","f534297c3d6307a81eb162fc90cb7240"],["E:/hexo/public/static/api/js/view/like_view.js","d5deb4ffeeeed06ace8f4479df3e0eca"],["E:/hexo/public/static/api/js/view/select_view.js","29f5d7fc9a474b4ec18ce5f685fc7cec"],["E:/hexo/public/static/api/js/view/share_view.js","f41f7713e6684dcbcd8304843ae6026d"],["E:/hexo/public/static/api/js/view/slide_view.js","962eae6aabf14115f23e57b6bd55e23d"],["E:/hexo/public/static/api/js/view/view_base.js","e719093c5a4ff674bcefbfe80f4dee2b"],["E:/hexo/public/tags/OpenWrt/index.html","0c3bf7485e4ada6c419b32514ef592d9"],["E:/hexo/public/tags/index.html","3f8fadb58b3f19a8c4b68fc1fc120afd"],["E:/hexo/public/tags/linux/index.html","9fea0841eaca9d5949e30b9e981c0553"],["E:/hexo/public/tags/教程/index.html","9d43d55d15593e07c1f4dbfbca234ede"],["E:/hexo/public/tags/路由/index.html","5e11b542b0f7299eae60b7f99b9c0373"],["E:/hexo/public/tags/路由器/index.html","b69dd6e1cd822d32813886aeee8be7bd"],["E:/hexo/public/tags/锐捷/index.html","42a8c2f831a46f20e94dd60d0698f918"],["E:/hexo/public/vlmcsd.html","341615a2fc3fc465755270ead3355f7b"],["E:/hexo/public/路由器使用百度云远程下载.html","a25040438cd3930183662afcef25c718"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
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

var createCacheKey = function(originalUrl, paramName, paramValue,
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

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
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

var stripIgnoredUrlParameters = function(originalUrl,
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







