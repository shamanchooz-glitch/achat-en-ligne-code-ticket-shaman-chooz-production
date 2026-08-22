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
         allow read, write: if true;
       }
       match /tickets/{ticketId} {
         allow read, write: if true;
       }
     }
   }
   ```
   ⚠️ Règles ouvertes pour démarrer simplement. À restreindre plus tard (Firebase Auth pour l'admin) — dites-le-moi quand vous voudrez passer à cette étape.

   **Si vous aviez déjà collé une version précédente de ces règles** (avec `allow update: if false` sur `orders`) : c'était une erreur de ma part dans une version antérieure de ce guide — elle empêchait vos validations de paiement d'aboutir complètement. Remplacez-la par la version ci-dessus dans Firestore > Règles, puis cliquez **Publier**.

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

Depuis `index.html#admin`, une carte **"Lien de votre boutique à partager"** affiche désormais automatiquement votre lien (bouton "Copier") et génère le QR code correspondant — plus besoin d'ouvrir un fichier séparé.

Vous pouvez aussi utiliser `qr-code.html` si vous préférez une page dédiée à imprimer proprement :
1. Ouvrez `qr-code.html`, collez l'adresse de `index.html` (celle SANS `#admin`), cliquez "Générer le QR code" puis "Imprimer".
2. Un client qui scanne arrive sur la boutique. Sur Android (Chrome), une bannière "Ajouter à l'écran d'accueil" propose l'installation ; sur iPhone (Safari), il utilise Partager → "Sur l'écran d'accueil".
3. Ajoutez aussi ce lien comme bouton **"Acheter un code ticket en ligne"** sur le portail captif Mikhmon.

## Importer vos codes tickets — directement depuis vos fichiers

Sur `index.html#admin`, dans la carte "Importer des codes tickets" :
1. Choisissez d'abord le **forfait** correspondant (1 heure, 1 jour, etc.).
2. Cliquez **📁 Choisir un fichier (PDF, CSV, TXT)** — ça ouvre votre galerie de fichiers, comme n'importe quelle appli. Sélectionnez le PDF de vouchers exporté depuis Mikhmon (ou un CSV/TXT si vous en exportez un).
3. Les codes sont extraits automatiquement et remplissent la case en dessous — vérifiez la liste (retirez une ligne si besoin), puis cliquez **"Ajouter au stock"**.

Vous pouvez toujours coller les codes à la main dans la case si vous préférez, sans passer par un fichier.

⚠️ Important : "Ajouter au stock" n'ouvre pas vos fichiers — c'est le bouton **"📁 Choisir un fichier"** qui fait ça. "Ajouter au stock" enregistre ensuite ce qui se trouve dans la case, qu'il ait été rempli par le fichier ou tapé à la main.

## "Ajouter au stock" ne fonctionne pas — comment diagnostiquer

Une bannière rouge d'erreur apparaît maintenant en haut du tableau de bord si quelque chose bloque (import, validation...), au lieu d'échouer silencieusement. Les causes les plus courantes :
1. **Firestore Database non créé** : Console Firebase > Firestore Database > "Créer une base de données" (mode production). Sans ça, aucune lecture/écriture n'est possible.
2. **Règles non publiées** : Firestore > Règles > collez le bloc de l'Étape 1 ci-dessus > cliquez **Publier** (pas juste "Enregistrer brouillon" — beaucoup oublient de publier).
3. Après ces deux étapes, rechargez la page admin et réessayez.

Si la bannière rouge apparaît, son message vous dira exactement laquelle de ces deux causes est en jeu.

## Mot de passe admin : afficher/masquer
Un lien **👁️ Afficher le mot de passe** sous le champ permet de vérifier la saisie avant de valider, pour éviter les erreurs de frappe.


## Fonctionnement hors connexion internet
Une fois installée une première fois (avec internet), la boutique peut se rouvrir **sans connexion**. Une bannière avertit le client s'il est hors-ligne. Il lui faut une connexion active le temps de payer sur Wave ; dès qu'elle revient, la page se met à jour automatiquement et affiche le code sans qu'il ait besoin de rouvrir quoi que ce soit.

## Connexion automatique au Wi-Fi (sans taper le code)

Dès que le code est validé, la page l'envoie automatiquement au routeur — exactement comme si le client l'avait tapé lui-même. **Aucun mot de passe administrateur n'est utilisé ni stocké dans l'application**, par sécurité : seul le code ticket est envoyé, ce qui suffit pour se connecter.

**Correction importante** : la première version envoyait le code via un cadre caché, bloqué silencieusement par les téléphones (mélange non sécurisé/sécurisé). La nouvelle version redirige directement la page vers le routeur après un court délai (~2 secondes, le temps que le client voie son code), ce qui fonctionne réellement.

**Condition indispensable, à ne pas oublier** : cette fonctionnalité ne peut marcher que si le téléphone du client est **connecté au Wi-Fi "WI-FI 6 SHAMAN HOTSPOT" au moment où le code est validé** (pas en train d'utiliser ses données mobiles). En effet, l'adresse `10.10.10.1` de votre routeur n'est joignable que depuis votre réseau Wi-Fi local — un téléphone sur la 4G du client ne peut tout simplement pas l'atteindre, où que soit l'application. C'est une contrainte réseau, pas un bug corrigeable autrement.
- Si le client achète en étant déjà connecté au Wi-Fi SHAMAN (via le Walled Garden, voir ci-dessous) → connexion automatique possible.
- Si le client achète avec ses données mobiles avant de rejoindre le Wi-Fi → il devra taper son code manuellement une fois connecté au Wi-Fi (le code reste affiché sur sa page et envoyé sur WhatsApp).

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
- `fonts.googleapis.com`, `fonts.gstatic.com`, et `cdnjs.cloudflare.com` (QR code, lecteur PDF)

**Protocole de test recommandé, chez vous, avant de proposer ça aux clients :**
1. Connectez un téléphone test au Wi-Fi **WI-FI 6 SHAMAN HOTSPOT**.
2. Sans vous déconnecter de ce Wi-Fi, ouvrez la boutique et achetez un ticket test (le paiement Wave, lui, nécessite un instant de vraies données/Wi-Fi pour aboutir — c'est normal).
3. Depuis `index.html#admin` (sur un autre appareil ou onglet), validez ce paiement test.
4. Sur le téléphone test resté sur le Wi-Fi SHAMAN, regardez s'il est redirigé et connecté automatiquement.

Si à l'étape 4 rien ne se passe, envoyez-moi une capture de ce qui s'affiche à ce moment précis (page blanche ? message d'erreur ? rien ne bouge ?) — ça me dira exactement quoi ajuster (probablement l'adresse `HOTSPOT_LOGIN_URL`).

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

## Bug corrigé : le client ne recevait jamais son code

La page client "écoutait" sa commande avec une méthode Firestore qui ne fonctionnait pas de façon fiable. Résultat : même après validation réussie côté admin, le client restait bloqué sur "paiement en cours de vérification" indéfiniment — donc pas de code affiché, pas de tentative de connexion automatique. C'est corrigé.

**Pour que ça marche, le téléphone du client doit rester sur la page de la boutique** (écran allumé, onglet ouvert) pendant que vous validez son paiement. S'il quitte la page avant que vous validiez, son code reste enregistré côté admin (visible dans "Stock de tickets"), mais il faudra qu'il rouvre le lien pour le recevoir automatiquement — sinon vous pouvez le lui donner vous-même.

**Rappel : l'envoi WhatsApp n'est pas automatique.** Le bouton "Recevoir aussi sur WhatsApp" doit être tapé par le client lui-même ; l'application ne peut pas envoyer de message WhatsApp toute seule.

## Ajouter le bouton sur votre portail Mikhmon (shamanchooz.wifi)

Pour que vos clients voient un bouton **"Acheter un code ticket en ligne"** directement sur la page où ils entrent habituellement leur code, il faut l'ajouter dans le fichier de template de Mikhmon (un fichier séparé, propre à votre routeur — pas dans ce projet GitHub).

1. Dans Mikhmon, cherchez la section d'édition du modèle de page de connexion (souvent "Hotspot Templates", "Login Page" ou "Edit Template").
2. Ouvrez le fichier `login.html` de votre thème actuel.
3. Ajoutez ce bouton à l'endroit de votre choix (par exemple juste au-dessus du champ "CODE TEMPS") :
   ```html
   <a href="https://shamanchooz-glitch.github.io/VOTRE-REPO/index.html"
      style="display:block;background:#2ED9A0;color:#04241a;text-align:center;
             padding:14px;border-radius:8px;font-weight:bold;
             text-decoration:none;margin:16px 0;">
     💳 Acheter un code ticket en ligne
   </a>
   ```
   (remplacez le lien par votre vraie adresse GitHub Pages)
4. Enregistrez/téléversez le fichier modifié dans Mikhmon.

**Je peux le faire précisément à votre place** : envoyez-moi le code source actuel de cette page (menu ⋮ de Chrome → "Afficher le code source" sur cette page, puis copiez-collez le texte, ou une capture complète), et je vous renverrai le fichier avec le bouton déjà bien intégré.

## Comment ça se passe, du côté du client et du vôtre

**Aujourd'hui, sans Walled Garden configuré :**
1. Le client ouvre votre lien/QR code **avec ses données mobiles** (le Wi-Fi SHAMAN seul ne lui donne pas encore accès à la boutique tant que le Walled Garden n'est pas réglé).
2. Il choisit un forfait, paie sur Wave, revient sur la page, indique son numéro et clique "J'ai payé".
3. **Vous**, sur `index.html#admin` : vous voyez sa demande apparaître dans "Paiements en attente", vous vérifiez le paiement dans votre appli Wave, et cliquez **Valider**. C'est votre seule action.
4. Le code apparaît automatiquement sur la page du client (elle doit être restée ouverte), avec un lien pour le recevoir aussi sur WhatsApp.
5. La page tente une connexion automatique — sans Walled Garden, cette tentative ne peut pas aboutir (normal, le routeur n'est pas joignable par données mobiles), mais **elle échoue sans rien casser** : le code reste affiché, le client le copie dans le portail Wi-Fi comme d'habitude.

**Le jour où le Walled Garden est configuré, sans changer un seul fichier :**
1. Le client, connecté au Wi-Fi SHAMAN (même sans données mobiles), ouvre directement votre lien/QR — le Walled Garden l'autorise à atteindre la boutique, Firebase et Wave malgré le portail.
2. Il paie sur Wave, revient sur la page, clique "J'ai payé".
3. **Vous** : même action qu'aujourd'hui — vous validez dans `#admin`. C'est toujours votre seule action.
4. Le code apparaît, et cette fois la tentative de connexion automatique aboutit réellement : un nouvel onglet s'ouvre et le connecte au Wi-Fi (avec éventuellement un tap sur "Envoyer quand même" si le navigateur affiche l'avertissement habituel pour les échanges non sécurisés). Il a internet, sans avoir rien tapé.

**Ce qui ne change jamais pour vous** : ouvrir `#admin`, vérifier le paiement dans Wave, cliquer Valider. Tout le reste (attribution du code, tentative de connexion, gestion du stock) est déjà automatique aujourd'hui — le Walled Garden est la seule pièce qui manque pour que la toute dernière étape (la connexion internet elle-même) se fasse sans que le client tape son code.

**Sécurité du code** : la tentative de connexion automatique se fait maintenant dans un onglet séparé, jamais sur la page principale — donc qu'elle réussisse ou échoue, le client garde toujours son code et son lien WhatsApp visibles, sans jamais perdre l'écran.

## Pourquoi la connexion automatique marche sur certains téléphones et pas d'autres

**Sans Walled Garden configuré**, le client doit garder **les données mobiles ET le Wi-Fi SHAMAN actifs en même temps**, pas basculer de l'un à l'autre : sa page a besoin d'internet (données mobiles) pour recevoir votre validation en direct, et du Wi-Fi (simultanément) pour atteindre le routeur au moment de la connexion automatique. Couper les données mobiles avant que vous validiez interrompt la réception du code.

Certaines marques de téléphone (Infinix/Transsion notamment) **déconnectent automatiquement** un Wi-Fi détecté comme "sans internet" — ce qui est le cas du Wi-Fi SHAMAN tant qu'on n'est pas authentifié — même si l'écran affiche encore "connecté". C'est un réglage du téléphone, pas quelque chose que l'application peut corriger. Le client peut le désactiver lui-même : *Paramètres → Wi-Fi → icône ⚙️ à côté de "WI-FI 6 SHAMAN HOTSPOT" → désactiver "Éviter les réseaux sans internet"* (nom exact variable selon la marque). **Une fois le Walled Garden configuré, ce problème disparaît de lui-même** : le Wi-Fi SHAMAN aura un vrai accès internet (au moins vers les sites autorisés), donc les téléphones ne le couperont plus automatiquement.

## Heures affichées partout

Le tableau de bord affiche maintenant la date **et l'heure** à chaque étape, pour vérification :
- **Paiements en attente** : heure de réception de la demande.
- **Stock de tickets** : date d'ajout au stock, heure de vente, heure de passage en "utilisé" — les trois s'affichent l'une sous l'autre quand elles existent.
- **Corbeille** : date et heure de vente/utilisation.

## Alerte sonore pour les nouveaux paiements

Depuis `index.html#admin`, un son (et une vibration sur téléphone) se déclenche automatiquement dès qu'une nouvelle demande de paiement arrive, tant que la page reste ouverte — pas besoin de la garder à l'œil en permanence, elle vous alertera.

## Deux boutons dans le bon ordre — pourquoi le tout-automatique n'est pas possible

**Ce qui limite techniquement l'automatisation ici : c'est le téléphone qui choisit lui-même par quel réseau (Wi-Fi ou données mobiles) passe chaque connexion — aucun code web ne peut forcer ce choix, sur aucun site, aussi avancé soit-il.** Vos propres tests l'ont confirmé : la connexion au routeur n'aboutit que lorsque les données mobiles sont coupées, parce qu'à ce moment le Wi-Fi devient le seul chemin possible.

Comme WhatsApp a besoin d'internet pour envoyer le message, et que la connexion au routeur a besoin que les données mobiles soient coupées, ces deux actions ne peuvent pas se faire au même instant. La page guide donc le client dans le bon ordre, avec deux boutons distincts et numérotés :
1. **"📲 1. Recevoir mon code sur WhatsApp"** — à taper tout de suite, pendant que les données mobiles sont encore actives.
2. Le client désactive ensuite ses données mobiles (instruction affichée à l'écran).
3. **"🔓 2. Me connecter à Internet"** — à taper une fois les données coupées, pour que la connexion au Wi-Fi aboutisse.

Si une fenêtre "informations non sécurisées" apparaît après le bouton 2, un tap sur "Envoyer quand même" suffit — c'est une protection du téléphone (le routeur répond en http), pas un défaut de l'application.


**Correctif supplémentaire** : le lien WhatsApp ne fonctionnait pas à cause d'un numéro mal formaté — les numéros ivoiriens à 10 chiffres (depuis la réforme de numérotation) ne doivent plus perdre leur premier chiffre. C'est corrigé.

## Nouveaux outils de gestion dans l'admin

- **Stock par forfait** : nouvelle carte montrant, pour chaque forfait (1 heure, 1 jour, etc.), le nombre en stock / vendus / utilisés séparément — plus seulement un total global.
- **Historique des achats & factures** : nouvelle carte listant chaque achat (en attente, validé, refusé), avec un bouton **"Facture"** qui ouvre le détail complet — numéro de commande, client, forfait, montant, code ticket, et les heures de chaque étape (achat, validation, envoi WhatsApp, tentative de connexion). Bouton **"Imprimer"** dans cette fenêtre pour l'imprimer ou l'enregistrer en PDF depuis l'aperçu d'impression du téléphone.
- **Heures** : toutes les heures affichées utilisent l'heure de l'appareil qui consulte la page (votre téléphone), donc toujours votre heure locale, sans décalage.
- Le suivi "WhatsApp envoyé" et "Connexion tentée" se met à jour automatiquement dès que le client appuie sur ces boutons de son côté — s'il n'a pas encore appuyé, la facture l'indique clairement ("Non envoyé", "Non tentée") plutôt que d'afficher une fausse heure.

## Marquage "utilisé" désormais automatique (basé sur la durée du forfait)

Avant, un ticket ne passait de "vendu" à "utilisé" que si vous cliquiez vous-même sur "Marquer utilisé" — l'application n'avait aucun moyen de savoir qu'un client avait réellement fini d'utiliser son accès, faute de connexion en direct avec le routeur. Résultat : après vos tests, un seul ticket apparaissait "utilisé" alors que vous en aviez consommé plusieurs.

C'est corrigé, sans passer par le routeur : chaque forfait a maintenant une durée connue (4 HEURES/1 JOUR = 24h, 2 JOURS = 48h, etc.), et le tableau de bord calcule lui-même, à partir de l'heure de vente, quand un ticket doit être considéré comme utilisé. Dès que la durée est dépassée, le ticket passe automatiquement en "utilisé" (marqué "auto, validité expirée" dans le détail), sans action de votre part. Vous pouvez toujours le marquer manuellement plus tôt si besoin (ex. si vous savez que le client a terminé avant la fin de sa validité).

⚠️ Ce calcul se déclenche à chaque fois que le tableau de bord `#admin` est ouvert (il vérifie tous les tickets vendus à ce moment-là) — gardez la page ouverte de temps en temps pour que la mise à jour se fasse, comme pour la suppression après 30 jours.

## Détail complet par forfait (au clic)

Dans "Stock par forfait", touchez n'importe quelle ligne (ex. "4 HEURES") pour ouvrir la liste complète de tous ses codes tickets : statut (en stock / vendu / utilisé), date d'ajout, heure de vente, numéro de téléphone du client qui l'a acheté, et heure de passage en "utilisé". Le bouton **Imprimer** de cette fenêtre fonctionne aussi ici.

## Boutons Précédent / Suivant

Deux petits boutons flottants ("◀ Précédent" / "Suivant ▶") apparaissent maintenant en haut de chaque page, sur la boutique comme sur l'admin — utile puisque l'application installée n'affiche pas les boutons de navigation habituels du téléphone. Ils utilisent l'historique de navigation classique (comme les flèches d'un navigateur).

## Précédent/Suivant fonctionnent aussi avec les fenêtres de détail

Avant, ouvrir la Corbeille ou le détail d'un forfait/facture ne comptait pas comme une nouvelle "page" — le bouton Précédent ne savait donc pas quoi faire. Corrigé : chaque fenêtre de détail (Corbeille, Facture, Détail par forfait) s'ajoute maintenant à l'historique de navigation, donc Précédent la referme proprement, et Suivant la rouvre si besoin.

## Toutes les lignes affichées, sans limite

"Stock de tickets" et "Historique des achats & factures" affichaient au maximum 60/80 lignes récentes. Corrigé : les deux affichent maintenant la totalité, en défilant simplement vers le bas.

## Prochaine étape possible

Quand vous serez prêt, dites-le-moi et on branche la suite :
- accès à l'API Wave Business ou compte CinetPay/PayDunya → paiement 100% automatique
- Firebase Cloud Function planifiée → suppression garantie après 30 jours même sans ouvrir le tableau de bord

