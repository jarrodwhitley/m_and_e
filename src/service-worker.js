self.addEventListener("install", (e) => {
    console.log("[Service Worker] Install");
});

const cacheName = "v1.1";
const cacheAssets = [
    "index.html",
    "style.css",
    "app.js",
    "/src/assets/*",
];

