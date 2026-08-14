// Service worker — met en cache la boutique de tickets pour qu'elle
// s'ouvre même sans connexion internet (le client peut consulter les
// forfaits hors-ligne ; il lui faudra une connexion internet le temps
// de payer sur Wave et de recevoir son code).

const CACHE_NAME = "shaman-tickets-v1";
const APP_SHELL = [
  "./client.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Firebase (Firestore/paiement) doit toujours passer par le réseau.
  if (event.request.url.includes("firestore") || event.request.url.includes("googleapis") || event.request.url.includes("wave.com")) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).catch(() => caches.match("./client.html")))
  );
});
