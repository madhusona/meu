'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "cd56987f04fe030348d899b50a760179",
"index.html": "9fc246e0d3f5c7dc2c4d55ce87391f9c",
"/": "9fc246e0d3f5c7dc2c4d55ce87391f9c",
"main.dart.js": "6a8e802fad151fc4ef5fc8e9d513ca7c",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "50c78210b3fb3602a109a88c3415de40",
"assets/AssetManifest.json": "fb3d540ea331894b488ebdd8fc0d3bc6",
"assets/NOTICES": "fce79f0bae78802834c0459d1979cfd0",
"assets/FontManifest.json": "10c4ed8b13fbeb46606f5e984d709d28",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/localization/test/assets/lang2/en_US.json": "b389499c34b7ee2ec98c62fe49e08fa0",
"assets/packages/localization/test/assets/lang2/pt_BR.json": "08e9b784a138126822761beec7614524",
"assets/packages/localization/test/assets/lang/en_US.json": "18804652fbce3b62aacb6cce6f572f3c",
"assets/packages/localization/test/assets/lang/pt_BR.json": "f999b93065fe17d355d1ac5dcc1ff830",
"assets/shaders/ink_sparkle.frag": "1b1bd8ad7cea9a1510bb49a871ea87e7",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/assets/jogi.png.PNG": "8b1872f01b9081369c2ddb70aa5590aa",
"assets/assets/%25E2%2580%2594Pngtree%25E2%2580%2594mom%2520and%2520baby_8615449.PNG": "8b1872f01b9081369c2ddb70aa5590aa",
"assets/assets/db.json": "ac648119bd1506fe0f394733da746bdd",
"assets/assets/blue.jpeg": "0a3a0b6ee15e038c8993bebbb420b59a",
"assets/assets/arm.png": "b3072045e45377cb029faa31eb5ac083",
"assets/assets/cele.png": "b05f5c803cf617a894af79eda421c96c",
"assets/assets/FrankRuhlLibre-Regular.ttf": "bff507323e3c7a15fddb58f466e6a6e9",
"assets/assets/FrankRuhlLibre-Light.ttf": "c6d6dd41ae383dd5cfdcbc9af1ba649e",
"assets/assets/person.png": "d9dd55085cdde6aba003c9b48dbf2565",
"assets/assets/sideimg.jpg": "294911a5b67879da51ca231788022727",
"assets/assets/drink.png": "48c3abdae3fc24c076b95063314a658c",
"assets/assets/OFL.txt": "6f431d70e6ce8d0aeee4ef2fae7f9db0",
"assets/assets/FrankRuhlLibre-Medium.ttf": "a77304c49fab6a5cba1b06e7d6e1ac9f",
"assets/assets/FrankRuhlLibre-Black.ttf": "a669c94ef3de74e66fd0bd5d8e3b75ae",
"assets/assets/FrankRuhlLibre-Bold.ttf": "a60621535d214a3f74ee66781ea73d04",
"assets/assets/clock.png": "635a9c5f7ff912ae58c452a08667da68",
"assets/assets/diamond.png": "d93878c13a4b5a33c33d1d79df82f52e",
"assets/assets/cdb.json": "d41d8cd98f00b204e9800998ecf8427e",
"assets/assets/yoga.png": "db349bbc36977291d64258da7dcceb03",
"assets/assets/jog.png": "54de773fb510c49f100854074b435f47",
"assets/assets/book.png.png": "d6d14b76b0f1e57acbb54a709c10c0f2",
"assets/assets/fork.png": "30d479fc5895b65d1c3407ec97aaa781",
"assets/assets/google_fonts/Rubik-VariableFont_wght.ttf": "20ddc780bbcdba3faf2d82754abe4c69",
"assets/assets/google_fonts/OFL.txt": "465a6f9dae7c84eb10c0c2f8b1fa0f0d",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
