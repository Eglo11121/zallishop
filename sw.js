self.addEventListener('install', (e) => {
    console.log('Service Worker u instaluar');
});

self.addEventListener('fetch', (e) => {
    // mund ta zgjerosh për caching
});
