// Service worker — met en cache la boutique de tickets pour qu'elle
// s'ouvre même sans connexion internet (le client peut consulter les
// forfaits hors-ligne ; il lui faudra une connexion internet le temps
// de payer sur Wave et de recevoir son code).
//
// IMPORTANT : changez CACHE_NAME (ex. v3, v4...) à chaque fois que vous
// mettez à jour index.html, sinon les téléphones qui ont déjà installé
// l'app continueront d'afficher l'ancienne version en cache.

const CACHE_NAME = "shaman-tickets-v14";
const APP_SHELL = [
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
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = event.request.url;
  // Firebase / Wave doivent toujours passer par le réseau (jamais mis en cache).
  if (url.includes("firestore") || url.includes("googleapis") || url.includes("gstatic") || url.includes("wave.com") || url.includes("cdnjs")) {
    return;
  }

  // index.html (et la page elle-même) : toujours essayer le réseau EN PREMIER,
  // pour que les mises à jour soient visibles immédiatement dès qu'il y a
  // internet. Le cache ne sert que si le réseau est indisponible (mode hors-ligne).
  if (event.request.mode === "navigate" || url.endsWith("index.html") || url.endsWith("/")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html")))
    );
    return;
  }

  // Le reste (icônes, manifest) : cache d'abord, réseau en repli.
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
