# ACHAT EN LIGNE CODES TICKETS SHAMAN CHOOZ PRODUCTION

Version 1 : semi-automatique (validation manuelle rapide des paiements Wave), installable comme application (PWA), utilisable hors-ligne pour consulter les forfaits.

## Fichiers à uploader ensemble sur GitHub
- `client.html` — la boutique publique : boutons de forfaits (liens Wave) + formulaire "J'ai payé"
- `admin.html` — tableau de bord protégé par mot de passe : validation des paiements, import des codes, corbeille, suivi du stock
- `manifest.json` + `sw.js` — rendent `client.html` installable sur le téléphone et consultable hors connexion internet
- `icon-192.png` / `icon-512.png` — vos icônes (votre photo, déjà en place)
- `qr-code.html` — génère le QR code à imprimer une fois votre lien en ligne
- `README.md` — ce guide

## Mot de passe admin
`Shaman123chooz` — déjà en place dans `admin.html`.

## Étape 1 — Relier l'application à Firebase (avant l'upload)

1. Dans la Console Firebase, ouvrez votre projet existant `pour-paiement-shaman-chooz` (ou créez-en un nouveau).
   - Activez **Firestore Database** (mode production).
   - Dans *Paramètres du projet > Vos applications*, copiez la config et collez-la dans le bloc `firebaseConfig`, **à l'identique**, dans `client.html` ET dans `admin.html`.
2. Dans Firestore > Règles, collez :
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /orders/{orderId} {
         allow create: if true;
         allow read: if true;
         allow update: if false;
       }
       match /tickets/{ticketId} {
         allow read, write: if true;
       }
     }
   }
   ```
   ⚠️ Règles ouvertes pour démarrer simplement. À restreindre plus tard (Firebase Auth pour l'admin) — dites-le-moi quand vous voudrez passer à cette étape.

## Étape 2 — Mettre les fichiers en ligne avec GitHub

1. Sur github.com, créez un nouveau repository (ex. `tickets-wifi-shaman`), public.
2. Ouvrez le repository → **Add file > Upload files** → glissez-déposez les 8 fichiers téléchargés (client.html, admin.html, manifest.json, sw.js, icon-192.png, icon-512.png, qr-code.html, README.md) → **Commit changes**.
3. Allez dans **Settings > Pages** → Source : `Deploy from a branch` → Branch : `main` / dossier `/ (root)` → **Save**.
4. Après 1-2 minutes, GitHub affiche votre adresse en ligne, du type :
   `https://votre-pseudo.github.io/tickets-wifi-shaman/client.html`
   et pour vous : `https://votre-pseudo.github.io/tickets-wifi-shaman/admin.html`

⚠️ Le repository étant public, `admin.html` reste accessible à qui a le lien — il est protégé uniquement par le mot de passe. Ne partagez ce lien avec personne, gardez-le pour vous. Si vous voulez plus tard un vrai accès privé, on pourra en reparler.

## Étape 3 — Générer le QR code à imprimer

1. Ouvrez `qr-code.html` (dans votre navigateur, en local ou via son lien GitHub Pages).
2. Collez l'adresse de `client.html`, cliquez "Générer le QR code" puis "Imprimer".
3. Un client qui scanne arrive sur la boutique. Sur Android (Chrome), une bannière "Ajouter à l'écran d'accueil" propose l'installation ; sur iPhone (Safari), il utilise Partager → "Sur l'écran d'accueil". L'app s'installe alors comme une icône normale, avec votre photo et le nom **ACHAT EN LIGNE CODES TICKETS SHAMAN CHOOZ PRODUCTION**.
4. Ajoutez aussi ce lien comme bouton **"Acheter un code ticket en ligne"** sur le portail captif Mikhmon.

## Fonctionnement hors connexion internet
Une fois installée une première fois (avec internet), l'application peut se rouvrir **sans connexion** : le client voit les forfaits même sans données mobiles ni Wi-Fi. Une bannière l'avertit s'il est hors-ligne. Pour finaliser un achat, il lui faut une connexion internet à un moment donné (données mobiles, ou tout autre Wi-Fi disponible) le temps de payer sur Wave. Dès que sa connexion est active, la page se met à jour automatiquement et affiche son code sans qu'il ait besoin de rouvrir quoi que ce soit.

## Utilisation au quotidien

1. Depuis Mikhmon, exportez/générez vos codes (comme le PDF de vouchers).
2. Dans `admin.html`, collez les codes du bon forfait dans "Importer des codes tickets" → "Ajouter au stock".
3. Quand un client paie et clique "J'ai payé", la demande apparaît dans "Paiements en attente".
4. Vérifiez le paiement dans votre appli Wave marchand, puis cliquez **Valider**.
5. Le client reçoit son code automatiquement sur sa page (et peut l'envoyer sur son propre WhatsApp) — il le colle dans le portail Mikhmon comme d'habitude.
6. Le stock, les ventes et les statuts se mettent à jour en temps réel.

## Corbeille — gérer et supprimer les codes vendus/utilisés

Le bouton **🗑️ Corbeille** en haut du tableau de bord ouvre la liste de tous les tickets déjà vendus ou utilisés. Vous pouvez :
- supprimer un code précis avec le bouton "Supprimer" sur sa ligne,
- ou tout effacer d'un coup avec "Tout supprimer" (une confirmation vous est demandée).

En complément, un nettoyage automatique supprime aussi ces tickets au bout de 30 jours quand le tableau de bord est ouvert — la corbeille vous permet de le faire vous-même, à tout moment, sans attendre.

## À propos de l'API de votre MikroTik

Les identifiants inscrits sur l'étiquette de votre routeur (`User: admin`, mot de passe, clé Wi-Fi) sont vos identifiants de connexion à l'interface du routeur (Winbox/WebFig) — ce ne sont pas une page "API" séparée à chercher dans un menu. La RouterOS API est un **service** que le routeur expose (souvent déjà activé, puisque c'est ce que Mikhmon utilise pour gérer vos utilisateurs hotspot) : elle se pilote avec ces mêmes identifiants, via une adresse (l'IP locale de votre routeur, ex. `10.10.10.1`) et un port dédié (8728 ou 8729), pas via une page à cliquer. C'est cette API qui permettra, en phase 2, de connecter un client automatiquement sans qu'il tape son code. Gardez ces identifiants pour cette étape-là — ne les partagez à personne d'autre entre-temps.

## Ce qui n'est pas encore automatique (limites actuelles)

- **La validation du paiement reste manuelle** (vous cliquez "Valider") car vos liens Wave actuels ne préviennent pas l'application automatiquement. Pour la rendre 100% automatique : API Wave Business (webhooks) ou un agrégateur comme CinetPay/PayDunya.
- **La connexion Wi-Fi automatique du client** (sans qu'il tape le code) n'est pas encore branchée : elle utilisera la RouterOS API décrite ci-dessus, ce qui suppose que votre routeur soit joignable depuis internet, ou qu'un petit boîtier reste allumé sur votre réseau local pour faire le lien.
- **La suppression après 30 jours** est automatique quand le tableau de bord est ouvert ; sinon, utilisez la Corbeille manuellement. Pour un nettoyage garanti même app fermée, il faudrait une Firebase Cloud Function planifiée (plan payant "Blaze", très peu coûteux à ce volume) — je peux l'écrire quand vous serez prêt.

## Prochaine étape possible

Quand vous serez prêt sur l'un de ces points, dites-le-moi et on branche la suite :
- accès à l'API Wave Business ou compte CinetPay/PayDunya → paiement 100% automatique
- utilisation de la RouterOS API de votre MikroTik → connexion automatique du client sans saisir le code
