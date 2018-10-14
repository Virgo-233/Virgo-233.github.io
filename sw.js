/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/404.html","f86556f1e96fbea1b4c32cc7bd102068"],["/Pay/index.html","d060bb4b2a005c8ab98838c61b1213f9"],["/about/index.html","cb69593d013ff1ad93f5198f2f8b2cff"],["/archives/2017/05/index.html","bf77e9d0f323cbffeb9a702e664a7aaa"],["/archives/2017/index.html","70b17f2c72031dc031b39954080b2092"],["/archives/2018/04/index.html","5d3725049472bce4dbf97abce7130dc8"],["/archives/2018/06/index.html","25ec0d8bf2f2f7dc1bd026578f560a2b"],["/archives/2018/07/index.html","105f695fd0bc2601a4e986e8917dad5c"],["/archives/2018/08/index.html","7003ff6f8df6129142669a9c367cb52d"],["/archives/2018/09/index.html","bcf22685a4c9e6cb5de0218cd8e13e64"],["/archives/2018/10/index.html","c616310261d250e53538428f9c906b1f"],["/archives/2018/index.html","f6a374c7f0a425b8040fd65585f8a0bf"],["/archives/2018/page/2/index.html","278c2e33e9b364927a4fc4d14c6272c3"],["/archives/index.html","efc8183ea11b0cd09bd76fd081298bf7"],["/archives/page/2/index.html","1371164928019ee1287bcd971d9542a0"],["/categories/One•一个/index.html","f9ccf0e85243d21cfc03ae3008e1852b"],["/categories/index.html","54947642297bbb20d14644618613c262"],["/categories/教程/index.html","ed5257a3dcd80d8a6b616428846eadf4"],["/categories/诗与远方/index.html","c5def361f569e8e99a2f3ed9900f3db3"],["/categories/路由器/index.html","bbfb3c783a4b7f488fe3cd80b74dbae2"],["/css/main.css","64412adaa602eac056b1782a04861e3c"],["/fonts/chinese-zodiac.eot","732f7594f7de8a566ae31ff704dd3e16"],["/fonts/chinese-zodiac.woff","de6297d6703fdc83798000ee1bff183d"],["/fonts/chinese-zodiac.woff2","454bc56fd19872218bd1e02cb0a2ee3c"],["/images/algolia_logo.svg","f36be37cfbfc4be962c64f77a88f4b9c"],["/images/apple-touch-icon-next.png","6b0ffb5011024fa269ffae0a5adff354"],["/images/avatar.gif","b78c276bf4d2cb33fa5f2fdac192cdc1"],["/images/avatar.png","224f61b08bdeed765817a4398c36c4a5"],["/images/cc-by-nc-nd.svg","cdcf1add295728fc4cba4c10c6101ca5"],["/images/cc-by-nc-sa.svg","f8c9026ccd762736bac31eaf2001e4dc"],["/images/cc-by-nc.svg","3a042a8767c6765ae3638348e3ad1f2c"],["/images/cc-by-nd.svg","dfee190f250598c4ecb6a156612921bb"],["/images/cc-by-sa.svg","8a606f0f00f2e34d9612b39d34d88324"],["/images/cc-by.svg","69a519d7ba0fd913478425360ee4e392"],["/images/cc-zero.svg","5b18d8238a93966486c7b16cea08901c"],["/images/favicon-16x16-next.png","30281ad617bbc9c68c9bcad5ec77b6a3"],["/images/favicon-16x16.png","c5c1ae6b6aa6df8079a3a6bd57f08117"],["/images/favicon-32x32-next.png","1003eaf0b29f9862cae11325e8db82f1"],["/images/favicon-32x32.png","091eff838a8f09adbd913ee2d44ea41a"],["/images/loading.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/logo.svg","4cc950af6ea42869ec8446e7b79c71c5"],["/images/placeholder.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/quote-l.svg","5d7a8d24ee0687e8d83c7833b59beae8"],["/images/quote-r.svg","030454e9cd4a732a7c695fde3309d863"],["/images/sakura/1.png","e33907a57711b9d2cecb0b11b530c26b"],["/images/sakura/2.png","75e01f4665b81a0631442cfc4cc95459"],["/images/sakura/4.png","6f5ef8092b7bc167aa36ed71ed1bfc69"],["/images/searchicon.png","67bfd8e604aaafb0bd0f41de4759a6b2"],["/images/virgo.png","6d1a3baf10a27b21f92e553f298c25ad"],["/index.html","9339c1625cf79a91d2e361a3320274b8"],["/js/src/activate-power-mode.js","94cc927488fb7472cd80bd6e88f1d8f9"],["/js/src/active-power-mode.min.js","95b354a7b68389ea8e46bff5714b5fe8"],["/js/src/affix.js","d9d431b8a5447e565709cdda8e5fa20c"],["/js/src/algolia-search.js","62d7d2b452944aad3f1253836d36bba4"],["/js/src/blog-time.js","0d69f22dd96a16119bff4078bfac73ab"],["/js/src/bootstrap.js","e9a1a58073b81b13194aaf5351edeab4"],["/js/src/canvas-particle.js","81b6e16db6fc8bd9ad324f7e73f34e31"],["/js/src/canvas-particle.min.js","f5aad4dcae37940ece249917f40ffea4"],["/js/src/duoshuoshuo.js","7664f4dba1046160e939f6369de49978"],["/js/src/duoshuoshuo.min.js","aad5c4465feb27a202802cd9595a314c"],["/js/src/exturl.js","ffb4519829fbd408d2666ddfad5fa8cc"],["/js/src/js.cookie.js","e5f33ee08f0740cfb96f1327bd2058cf"],["/js/src/love.js","5a87dd19400b2870ef6734f56cfe2208"],["/js/src/motion.js","3d5e4c0eca8dafdeb4a6f0caa7124d2f"],["/js/src/post-details.js","4b105aaa8b2a64283d31b80304a1673d"],["/js/src/sakura.js","23f96d114156c5c3df7903b3dfa0b638"],["/js/src/schemes/pisces.js","5e840e42af3dd12ff2be0c1491de37cc"],["/js/src/scroll-cookie.js","13d0b1bf00b4fbcd8ef58900deda21cf"],["/js/src/scrollspy.js","a319bd0a0a374a2d2cd239c1eb1c16c2"],["/js/src/utils.js","5b12f422d9437fa1348bec1798b93b18"],["/lib/Han/README.html","40d4a7c6d1155dbf3826cf12a48c3707"],["/lib/Han/dist/font/han-space.woff","b09f2dd7d3ad8ad07f3b8495133909d9"],["/lib/Han/dist/font/han.woff","e841c6b547bc06a06f60f4de52bf906e"],["/lib/Han/dist/font/han.woff2","2b06aa1c952a2dfaf00d99218689d147"],["/lib/Han/dist/han.css","a3a7877fd5cdfe5801f9e95aa5db7665"],["/lib/Han/dist/han.js","575b6c1667c01798730fbd972e959c9c"],["/lib/Han/dist/han.min.css","f6acbe490db74e29d7b7589b26b03ffd"],["/lib/Han/dist/han.min.js","96482c9c2b3c5ea9bf5a40db162c7f34"],["/lib/canvas-nest/README.html","72f086e0d3ddab52e4f7b16302fd06a6"],["/lib/canvas-nest/canvas-nest.min.js","36e103d2a05bc706bac40f9ab8881eb7"],["/lib/fancybox/README.html","a5fb3a9c4c11e39b6df3ac8d1c41f0fe"],["/lib/fancybox/source/jquery.fancybox.css","4f0398603948259f4f8a0e4216f10570"],["/lib/fancybox/source/jquery.fancybox.js","6db039c0a0eb14f5631682b8e33ed9f9"],["/lib/fancybox/source/jquery.fancybox.min.css","403bad9a465c2f4a7da15583d21c6409"],["/lib/fancybox/source/jquery.fancybox.min.js","1fc6ecaf7ea433969308380b40808fe8"],["/lib/fancybox/source/jquery.fancybox.pack.js","6db039c0a0eb14f5631682b8e33ed9f9"],["/lib/font-awesome/css/font-awesome.css","05ab9fc2840944839c6422502bef16a7"],["/lib/font-awesome/css/font-awesome.min.css","cd692b61b48f85cce1103ef69449b600"],["/lib/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/lib/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/lib/font-awesome/fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["/lib/jquery_lazyload/README.html","ff14e87f70130c31b5a7626ce6af982b"],["/lib/jquery_lazyload/jquery.lazyload.js","8b427f9e86864ee3aaf1ae33e6e14263"],["/lib/jquery_lazyload/jquery.scrollstop.js","f163fd8f02361928853668a96f8a1249"],["/lib/needsharebutton/README.html","3bc700e5a1695c37beb47a8e43d8b475"],["/lib/needsharebutton/needsharebutton.css","ef7fe1832012420cdb8978acaae90358"],["/lib/needsharebutton/needsharebutton.js","beec08401673d9baec716190a53f9999"],["/lib/pace/README.html","68882b0e90b6cef2174fe0bf7ddd42b5"],["/lib/pace/pace-theme-barber-shop.min.css","a0b28f2a687f670f456f8d4228a2fa9e"],["/lib/pace/pace-theme-big-counter.min.css","355670270f10982dac3251ba0c1db98b"],["/lib/pace/pace-theme-bounce.min.css","1f245b10e1fee0eb878f84a6717a7391"],["/lib/pace/pace-theme-center-atom.min.css","4a2810669a508f79ee342b8739660018"],["/lib/pace/pace-theme-center-circle.min.css","1314f0bfafaf431b1ca7dace7f184637"],["/lib/pace/pace-theme-center-radar.min.css","12511c52c23e20d1c201442f9615dda9"],["/lib/pace/pace-theme-center-simple.min.css","1eea13ae155b3a8905f16238c9c00f7d"],["/lib/pace/pace-theme-corner-indicator.min.css","2af7d4cbf75340f047931ff6e328d574"],["/lib/pace/pace-theme-fill-left.min.css","b62157525079b1ccca8c13d4826566fe"],["/lib/pace/pace-theme-flash.min.css","b35e24e1d1c49fdbca58751345ab2a51"],["/lib/pace/pace-theme-loading-bar.min.css","dcadfc54f3e6de09a9350c99f4f29557"],["/lib/pace/pace-theme-mac-osx.min.css","8c7b13eec2cf046bcda650aae64153a3"],["/lib/pace/pace-theme-minimal.min.css","6049c157d34a29a7d4cfab72fa2f73be"],["/lib/pace/pace.min.js","24d2d5e3e331c4efa3cda1e1851b31a7"],["/lib/pangu/README.html","aa5190d0b1b5c3489ad7b8fdc3030ea4"],["/lib/pangu/dist/pangu.js","3c4a318281f6a24a1f6e2773b4109a06"],["/lib/pangu/dist/pangu.min.js","46c8e836752efa7f1ba52387fc06bb5f"],["/lib/ua-parser-js/dist/ua-parser.min.js","a6e833266c4b41fabb9ba94a145322d8"],["/lib/ua-parser-js/dist/ua-parser.pack.js","6b627e4d61a7135952824bb9c1a4a134"],["/links/index.html","1123fcb8c34c8fbb9b7df85ad722338a"],["/page/2/index.html","e34d49581c4d14cf740deddf5c2d2b95"],["/posts/13b1ea83.html","2a658e720c38e7003899b73f20734cfb"],["/posts/2443be7d.html","49fd9f021cf6954a2f8d9d4ce26e4b74"],["/posts/255c022.html","a8f2cc8e26e98bd8030e4527403a93a3"],["/posts/343b8a35.html","3d7f535ce6916508bb856ed7e1a4ed12"],["/posts/3ba37e62.html","fef94abc793fbd1a5ee2a15b990e61bd"],["/posts/3d051192.html","45b3dd4e62fcd034f8687c559be6e575"],["/posts/46992fc.html","243f4f04dc9e15b974fb830facccc97f"],["/posts/5799c0b3.html","fd90449225f606b6e1c0a19a08f5d2fe"],["/posts/59e5d8b8.html","d6f332132f0c97063f3c7f855efe6900"],["/posts/6804f093.html","93ecc8c796e15308b15b3612c0c549cf"],["/posts/8166900c.html","398dcc0a8781f7e9982baa5f8465eb08"],["/posts/9e47c568.html","2225f136101aa8b1c586845cb5f5b328"],["/posts/9e7b6f05.html","25d7464f2252096cc0312f772c3dc535"],["/posts/ab85ea5f.html","d0e71df3315ee4a0a11f464e147f99d4"],["/posts/be38c09.html","f9ec1db89571f17182bc7e921ad649a3"],["/posts/cfb7bd2a.html","54752a7cebdcfc6890d345fc5d7f1d29"],["/posts/d5ae7f1b.html","e2f17e640521d27a87c4de9537402092"],["/posts/f05bc4bf.html","89bab30c7814a27da5999fd797639085"],["/posts/f5125d59.html","612a44a9775d585f73ea41e91e713563"],["/sw-register.js","9d7aaa35dfad9293c58ccc7ee6401a66"],["/tags/Android-Toools/index.html","f15309f8aaa54414e353165d3d3a3023"],["/tags/Office/index.html","4123488dd5dd8517a802f276c1d6bd68"],["/tags/OpenWrt/index.html","c8e7e837c909bc09032efc73d05b7ef1"],["/tags/RSS/index.html","9d380f753c8301e8f9403f0eebd58c83"],["/tags/Windows/index.html","11427480255400fd2dbe9e50ca23882e"],["/tags/index.html","10c78596eb96fa171d999ceeeff50da4"],["/tags/linux/index.html","bd94a26ca38c5b7a7fcc1b5aa68ca211"],["/tags/摘抄/index.html","67470eae4eb9cea7ea745db167c7e356"],["/tags/锐捷/index.html","bb023144ef9f413a822cc4cd8d510841"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');
var firstRegister = 1; // 默认1是首次安装SW， 0是SW更新


var ignoreUrlParametersMatching = [/^utm_/];


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function (originalResponse) {
    // 如果没有重定向响应，不需干啥
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 及以下不知处 Response.body 流, 所以我们需要读取整个body以blob形式返回。
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();

    return bodyPromise.then(function (body) {
        // new Response() 可同时支持 stream or Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function (originalUrl, paramName, paramValue,
    dontCacheBustUrlsMatching) {

    // 创建一个新的URL对象，避免影响原始URL
    var url = new URL(originalUrl);

    // 如果 dontCacheBustUrlsMatching 值没有设置，或是没有匹配到，将值拼接到url.serach后
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // 如果 whitelist 是空数组，则认为全部都在白名单内
    if (whitelist.length === 0) {
        return true;
    }

    // 否则逐个匹配正则匹配并返回
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // 移除 hash; 查看 https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // 是否包含 '?'
        .split('&') // 分割成数组 'key=value' 的形式
        .map(function (kv) {
            return kv.split('='); // 分割每个 'key=value' 字符串成 [key, value] 形式
        })
        .filter(function (kv) {
            return ignoreUrlParametersMatching.every(function (ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // 如果 key 没有匹配到任何忽略参数正则，就 Return true
            });
        })
        .map(function (kv) {
            return kv.join('='); // 重新把 [key, value] 格式转换为 'key=value' 字符串
        })
        .join('&'); // 将所有参数 'key=value' 以 '&' 拼接

    return url.toString();
};


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function (item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function (requests) {
        // 如果原cacheName中没有缓存任何收，就默认是首次安装，否则认为是SW更新
        if (requests && requests.length > 0) {
            firstRegister = 0; // SW更新
        }
        return requests.map(function (request) {
            return request.url;
        });
    }).then(function (urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return setOfCachedUrls(cache).then(function (cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
                        // 如果缓存中没有匹配到cacheKey，添加进去
                        if (!cachedUrls.has(cacheKey)) {
                            var request = new Request(cacheKey, { credentials: 'same-origin' });
                            return fetch(request).then(function (response) {
                                // 只要返回200才能继续，否则直接抛错
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }

                                return cleanResponse(response).then(function (responseToCache) {
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        })
            .then(function () {
            
            // 强制 SW 状态 installing -> activate
            return self.skipWaiting();
            
        })
    );
});

self.addEventListener('activate', function (event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.keys().then(function (existingRequests) {
                return Promise.all(
                    existingRequests.map(function (existingRequest) {
                        // 删除原缓存中相同键值内容
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function () {
            
            return self.clients.claim();
            
        }).then(function () {
                // 如果是首次安装 SW 时, 不发送更新消息（是否是首次安装，通过指定cacheName 中是否有缓存信息判断）
                // 如果不是首次安装，则是内容有更新，需要通知页面重载更新
                if (!firstRegister) {
                    return self.clients.matchAll()
                        .then(function (clients) {
                            if (clients && clients.length) {
                                clients.forEach(function (client) {
                                    client.postMessage('sw.update');
                                })
                            }
                        })
                }
            })
    );
});



    self.addEventListener('fetch', function (event) {
        if (event.request.method === 'GET') {

            // 是否应该 event.respondWith()，需要我们逐步的判断
            // 而且也方便了后期做特殊的特殊
            var shouldRespond;


            // 首先去除已配置的忽略参数及hash
            // 查看缓存简直中是否包含该请求，包含就将shouldRespond 设为true
            var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
            shouldRespond = urlsToCacheKeys.has(url);

            // 如果 shouldRespond 是 false, 我们在url后默认增加 'index.html'
            // (或者是你在配置文件中自行配置的 directoryIndex 参数值)，继续查找缓存列表
            var directoryIndex = 'index.html';
            if (!shouldRespond && directoryIndex) {
                url = addDirectoryIndex(url, directoryIndex);
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 仍是 false，检查是否是navigation
            // request， 如果是的话，判断是否能与 navigateFallbackWhitelist 正则列表匹配
            var navigateFallback = '';
            if (!shouldRespond &&
                navigateFallback &&
                (event.request.mode === 'navigate') &&
                isPathWhitelisted([], event.request.url)
            ) {
                url = new URL(navigateFallback, self.location).toString();
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 被置为 true
            // 则 event.respondWith()匹配缓存返回结果，匹配不成就直接请求.
            if (shouldRespond) {
                event.respondWith(
                    caches.open(cacheName).then(function (cache) {
                        return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
                            if (response) {
                                return response;
                            }
                            throw Error('The cached response that was expected is missing.');
                        });
                    }).catch(function (e) {
                        // 如果捕获到异常错误，直接返回 fetch() 请求资源
                        console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                        return fetch(event.request);
                    })
                );
            }
        }
    });









/* eslint-enable */
