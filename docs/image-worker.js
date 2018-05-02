self.addEventListener("fetch", function(event) {
  if (
    !/https:\/\/storage\.googleapis\.com\/vegstorage\/.*\?cache\=1/.test(
      event.request.url
    )
  ) {
    event.respondWith(fetch(event.request));
    return;
  }
  event.respondWith(
    caches.open("vegstorage-images").then(function(cache) {
      return cache.match(event.request).then(function(response) {
        return (
          response ||
          fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
          })
        );
      });
    })
  );
});
