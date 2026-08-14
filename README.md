# ACHAT EN LIGNE CODES TICKETS SHAMAN CHOOZ PRODUCTION

Application en un seul fichier `index.html` : boutique client + tableau de bord admin, avec connexion automatique au Wi-Fi et fonctionnement hors-ligne.

## Fichiers à uploader ensemble sur GitHub
- `index.html` — **le seul fichier à ouvrir** : boutique publique (par défaut) + tableau de bord admin (via `#admin` à la fin du lien)
- `manifest.json` + `sw.js` — rendent l'app installable et consultable hors connexion internet
- `icon-192.png` / `icon-512.png` — vos icônes (votre photo, déjà en place)
- `qr-code.html` — génère le QR code à imprimer une fois votre lien en ligne
- `README.md` — ce guide

(Les anciens fichiers `client.html` et `admin.html` ne sont plus utilisés — tout est maintenant dans `index.html`.)

## Comment les deux vues fonctionnent dans un seul fichier
- Vos clients ouvrent simplement `index.html` → ils voient la boutique.
- Vous, pour administrer, ouvrez `index.html#admin` (même lien, avec `#admin` ajouté à la fin) → l'écran du mot de passe apparaît, puis le tableau de bord.

Exemple : si votre lien boutique est `https://votre-pseudo.github.io/tickets-wifi-shaman/index.html`, votre lien admin est `https://votre-pseudo.github.io/tickets-wifi-shaman/index.html#admin`.

## Mot de passe admin
`Shaman123chooz` — déjà en place dans `index.html`.

## Étape 1 — Relier l'application à Firebase (avant l'upload)

**Où trouver "Paramètres du projet" et copier la configuration :**

1. Allez sur [console.firebase.google.com](https://console.firebase.google.com) et ouvrez votre projet (`pour-paiement-shaman-chooz`, ou un nouveau projet).
2. En haut à gauche, à côté du logo Firebase, cliquez sur la **petite roue dentée ⚙️** (c'est le menu que vous avez capturé) → choisissez **"Paramètres du projet"**.
3. Descendez jusqu'à la section **"Vos applications"** en bas de la page.
   - Si vous voyez déjà une application web (icône `</>`), cliquez dessus pour afficher sa configuration.
   - Sinon, cliquez sur l'icône `</>` ("Ajouter une application" → Web), donnez-lui un nom (ex. "Tickets Wi-Fi"), puis validez — Firebase affiche directement le code de configuration.
4. Vous verrez un bloc qui ressemble à ceci :
   ```js
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "....firebaseapp.com",
     projectId: "...",
     storageBucket: "....appspot.com",
     messagingSenderId: "...",
     appId: "..."
   };
   ```
5. Copiez tout ce bloc, et collez-le dans `index.html` à la place du bloc `firebaseConfig` actuel (cherchez les mots `REMPLACER` — un seul bloc à modifier, il sert à la fois pour la boutique et pour l'admin).
6. Activez ensuite **Firestore Database** (menu de gauche > Firestore Database > Créer une base de données, mode production).
7. Dans Firestore > Règles, collez :
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

## Étape 2 — Mettre en ligne avec GitHub

1. Sur github.com, créez un repository (ex. `tickets-wifi-shaman`), public.
2. **Add file > Upload files** → glissez-déposez les 6 fichiers (`index.html`, `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`, `qr-code.html`) → **Commit changes**.
3. **Settings > Pages** → Source : `Deploy from a branch` → Branch : `main` / dossier `/ (root)` → **Save**.
4. Après 1-2 minutes, votre lien apparaît, du type :
   `https://votre-pseudo.github.io/tickets-wifi-shaman/index.html`
   → boutique client
   `https://votre-pseudo.github.io/tickets-wifi-shaman/index.html#admin`
   → votre tableau de bord

⚠️ Le repository étant public, le lien admin reste accessible à qui le connaît — protégé uniquement par le mot de passe. Ne le partagez à personne, gardez-le pour vous.

**Pourquoi ça n'avait pas fonctionné la dernière fois :** avec deux fichiers séparés, si `client.html` était ouvert sans que `admin.html` (ou l'inverse) soit au même endroit, ou si l'un des deux gardait l'ancienne config Firebase, rien ne se synchronisait. Avec un seul fichier `index.html`, il n'y a plus qu'un seul endroit à configurer et à mettre à jour — ça évite ce genre de désynchronisation.

## Étape 3 — Générer le QR code à imprimer

1. Ouvrez `qr-code.html`, collez l'adresse de `index.html` (celle SANS `#admin`), cliquez "Générer le QR code" puis "Imprimer".
2. Un client qui scanne arrive sur la boutique. Sur Android (Chrome), une bannière "Ajouter à l'écran d'accueil" propose l'installation ; sur iPhone (Safari), il utilise Partager → "Sur l'écran d'accueil".
3. Ajoutez aussi ce lien comme bouton **"Acheter un code ticket en ligne"** sur le portail captif Mikhmon.

## Fonctionnement hors connexion internet
Une fois installée une première fois (avec internet), la boutique peut se rouvrir **sans connexion**. Une bannière avertit le client s'il est hors-ligne. Il lui faut une connexion active le temps de payer sur Wave ; dès qu'elle revient, la page se met à jour automatiquement et affiche le code sans qu'il ait besoin de rouvrir quoi que ce soit.

## Connexion automatique au Wi-Fi (sans taper le code)

Dès que le code est validé, la page l'envoie automatiquement au routeur — exactement comme si le client l'avait tapé lui-même. **Aucun mot de passe administrateur n'est utilisé ni stocké dans l'application**, par sécurité : seul le code ticket est envoyé, ce qui suffit pour se connecter.

Deux réglages à vérifier avant que ça fonctionne chez vous :

**1. L'adresse de connexion du routeur**
Dans `index.html`, `HOTSPOT_LOGIN_URL` est réglée sur `http://10.10.10.1/login` (l'IP de votre hAP ax³). C'est l'adresse standard MikroTik ; à confirmer avec votre config Mikhmon :
- Sur un appareil connecté au Wi-Fi SHAMAN, ouvrez la page de connexion normale, "Afficher le code source" (ou "Inspecter").
- Repérez la balise `<form ... action="...">` : copiez cette adresse dans `HOTSPOT_LOGIN_URL`.
- Envoyez-la-moi si vous préférez que je l'ajuste moi-même.

**2. Le "Walled Garden" (accès autorisé avant connexion)**
Pour que vos clients puissent ouvrir la boutique et payer *avant* d'être connectés, votre routeur doit autoriser certains sites en accès libre. Dans Winbox/WebFig : **IP > Hotspot > Walled Garden**, autorisez (HTTP et HTTPS) :
- votre domaine GitHub Pages (ex. `*.github.io`)
- `*.googleapis.com` et `*.gstatic.com` (Firebase)
- `*.firebaseapp.com`
- `pay.wave.com` et `*.wave.com`
- `fonts.googleapis.com` et `fonts.gstatic.com`

**Test recommandé avant mise en service** : achetez vous-même un ticket test depuis un téléphone connecté au Wi-Fi SHAMAN, pour vérifier que la connexion automatique fonctionne réellement chez vous. Si elle ne se fait pas, le code reste affiché à l'écran et se saisit manuellement comme avant — rien n'est bloqué.

## Utilisation au quotidien

1. Depuis Mikhmon, exportez/générez vos codes.
2. Sur `index.html#admin`, collez les codes du bon forfait dans "Importer des codes tickets" → "Ajouter au stock".
3. Quand un client paie et clique "J'ai payé", la demande apparaît dans "Paiements en attente".
4. Vérifiez le paiement dans votre appli Wave marchand, puis cliquez **Valider**.
5. Le client reçoit son code automatiquement, est connecté automatiquement, et peut aussi le recevoir sur WhatsApp.
6. Le stock, les ventes et les statuts se mettent à jour en temps réel.

## Corbeille — gérer et supprimer les codes vendus/utilisés

Le bouton **🗑️ Corbeille** en haut du tableau de bord (`#admin`) ouvre la liste des tickets déjà vendus ou utilisés. Vous pouvez supprimer un code précis, ou tout effacer d'un coup ("Tout supprimer", avec confirmation). En complément, un nettoyage automatique supprime aussi ces tickets au bout de 30 jours quand le tableau de bord est ouvert.

## À propos des identifiants de votre routeur

Les identifiants sur l'étiquette (`User: admin`, mot de passe, clé Wi-Fi) restent vos identifiants d'administration — gardez-les uniquement pour vous. Ils ne sont pas utilisés dans cette application : la connexion automatique des clients repose uniquement sur le code ticket.

## Ce qui n'est pas encore automatique (limites actuelles)

- **La validation du paiement reste manuelle** (vous cliquez "Valider") car vos liens Wave actuels ne préviennent pas l'application automatiquement. Pour la rendre 100% automatique : API Wave Business (webhooks) ou un agrégateur comme CinetPay/PayDunya.
- La connexion automatique au Wi-Fi dépend des deux réglages routeur ci-dessus — testez-la avant de la proposer aux clients.
- La suppression après 30 jours est automatique quand le tableau de bord est ouvert ; sinon, utilisez la Corbeille manuellement. Pour un nettoyage garanti même app fermée, il faudrait une Firebase Cloud Function planifiée (plan payant "Blaze", très peu coûteux à ce volume) — je peux l'écrire quand vous serez prêt.

## Prochaine étape possible

Quand vous serez prêt, dites-le-moi et on branche la suite :
- accès à l'API Wave Business ou compte CinetPay/PayDunya → paiement 100% automatique
- Firebase Cloud Function planifiée → suppression garantie après 30 jours même sans ouvrir le tableau de bord
