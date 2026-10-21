# ACHAT EN LIGNE CODES TICKETS SHAMAN CHOOZ PRODUCTION

Application en un seul fichier `index.html` : boutique client + tableau de bord admin, avec connexion automatique au Wi-Fi et fonctionnement hors-ligne.

## Fichiers à uploader ensemble sur GitHub
- `index.html` — **le seul fichier à ouvrir** : boutique publique (par défaut) + tableau de bord admin (via `#admin` à la fin du lien)
- `manifest.json` + `sw.js` — rendent l'app installable et consultable hors connexion internet
- `icon-192.png` / `icon-512.png` — vos icônes (votre photo, déjà en place)
- `qr-code.html` — génère le QR code à imprimer une fois votre lien en ligne
- `firestore.rules` — règles de sécurité Firestore à coller dans Firebase (voir « Protection forte »)
- `README.md` — ce guide

⚠️ **Supprimez de GitHub les anciens fichiers `client.html` et `admin.html`** : ils ne servent plus (tout est dans `index.html`) et ils contiennent encore l'ancien mot de passe admin.

## Comment les deux vues fonctionnent dans un seul fichier
- Vos clients ouvrent simplement `index.html` → ils voient la boutique.
- Vous, pour administrer, ouvrez `index.html#admin` (même lien, avec `#admin` ajouté à la fin) → l'écran du mot de passe apparaît, puis le tableau de bord.

Exemple : si votre lien boutique est `https://votre-pseudo.github.io/tickets-wifi-shaman/index.html`, votre lien admin est `https://votre-pseudo.github.io/tickets-wifi-shaman/index.html#admin`.

## Mot de passe admin
Il n'est plus écrit dans le code : il est vérifié par **Firebase Authentication** (voir « Protection forte » plus bas). L'ancien mot de passe `Shaman123chooz` était visible publiquement dans GitHub : il ne fonctionne plus et ne doit plus jamais être réutilisé.

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
7. Pour les **règles de sécurité Firestore** et la **connexion administrateur**, suivez la section « Protection forte » plus bas.

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
- `cdn.jsdelivr.net` (lecteur de QR code par caméra)

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

## Un seul bouton : connexion puis WhatsApp

Le bouton **"🔓 Me connecter + envoyer mon code sur WhatsApp"** déclenche les deux actions l'une après l'autre, au même tap : la connexion s'ouvre dans un nouvel onglet (votre page principale reste intacte, code toujours visible), puis WhatsApp s'ouvre juste après avec le message prérempli. La page ne peut pas vérifier techniquement que la connexion a réellement abouti (aucune application web ne le peut) — les deux actions se lancent donc au moment du tap plutôt que sur une "confirmation" qui n'existe pas techniquement.

⚠️ Si le client a coupé ses données mobiles avant d'appuyer, l'envoi WhatsApp peut échouer tant qu'il ne les réactive pas — son code reste de toute façon affiché à l'écran.

## Menu de navigation dans l'admin

Les boutons flottants "◀ Précédent" / "Suivant ▶" ont été retirés (trop envahissants). À la place, un **menu horizontal** apparaît en haut de `#admin`, juste sous les statistiques, avec un accès direct à chaque section : Lien à partager, Stock par forfait, Paiements en attente, Importer, Stock de tickets, Historique & factures, et la Corbeille. Touchez une "pilule" pour aller directement à la section correspondante — vous savez toujours où vous êtes et où aller.

La navigation Précédent/Suivant reste possible pour les fenêtres de détail (Corbeille, Facture) via le bouton retour normal du téléphone/navigateur — elle fonctionne toujours en interne, simplement sans bouton visible surchargeant l'écran.

## Chaque section a maintenant sa propre page

L'admin (`#admin`) est réorganisé : la page d'accueil affiche uniquement les statistiques et un **menu** listant chaque section (Lien à partager, Stock par forfait, Paiements en attente, Importer, Stock de tickets, Historique & factures, Corbeille). Toucher une entrée du menu ouvre **sa propre page dédiée** — plus un simple défilement — avec un bouton **"← Retour"** en haut pour revenir au menu. La Corbeille est maintenant une page comme les autres, plus une fenêtre superposée.

## Bouton "Installer l'application" ajouté

Un bandeau bleu **"📲 Installez l'application sur votre téléphone"** avec un bouton **"Installer l'application"** apparaît maintenant en haut de la boutique (page client), au lieu de dépendre uniquement de la bannière automatique du navigateur (qui n'apparaît pas toujours, ou disparaît vite) :
- Sur Android (Chrome/Edge) : un tap installe directement l'application.
- Sur iPhone/iPad (Safari, qui ne propose jamais d'installation en un clic) : un tap ouvre une petite fenêtre expliquant les 2 étapes (Partager → "Sur l'écran d'accueil").
- Si l'application est déjà installée, le bandeau ne s'affiche pas.

## Important : ce qui est réellement possible pour le QR code/lien "sans données ni Wi-Fi internet, même la première fois"

Aucune application web au monde — celle-ci comme n'importe quel site — ne peut s'ouvrir pour la toute première fois avec un téléphone qui n'a strictement **aucun** réseau (ni Wi-Fi, ni données mobiles) : le téléphone doit forcément récupérer le code de la page depuis un serveur au moins une fois, ce qui demande un chemin réseau, quel qu'il soit. Ce n'est pas une limite de cette app, c'est vrai pour Google, Facebook, ou n'importe quel site.

**Ce qui est possible, et déjà en place dans votre cas précis :** votre client est physiquement à portée du signal **"WI-FI 6 SHAMAN HOTSPOT"**, qu'il peut capter gratuitement sans données mobiles et sans être encore connecté à internet. C'est exactement le rôle du **Walled Garden** déjà expliqué à l'Étape 1 plus haut : une fois configuré sur votre routeur, un client qui se connecte simplement à ce Wi-Fi (même sans être authentifié, même sans données mobiles) peut quand même atteindre votre boutique GitHub Pages, Firebase et Wave, car ce sont les adresses autorisées en libre accès. Donc :
- **Sans Walled Garden configuré** : le client a besoin de ses données mobiles (ou d'un autre Wi-Fi avec internet) pour ouvrir le lien/QR code la première fois.
- **Avec Walled Garden configuré** (voir Étape 1) : le simple fait d'être connecté au Wi-Fi SHAMAN — sans données mobiles, sans "internet" au sens classique — suffit pour scanner le QR code ou cliquer le lien et voir la boutique s'ouvrir, même la toute première fois.

Le Walled Garden est donc la seule pièce technique qui manque pour obtenir exactement ce que vous demandez. Une fois la boutique ouverte au moins une fois (par ce chemin ou via données mobiles), le service worker la garde ensuite en cache et elle se rouvre hors-ligne les fois suivantes.

## Deux nouveaux boutons QR code sur la boutique

- **"📱 Afficher mon QR code"** : ouvre en plein écran le QR code de votre boutique (le même lien que `index.html`), pour qu'un autre téléphone le scanne directement sur cet écran — pratique quand deux clients sont côte à côte.
- **"📷 Scanner un QR code"** : ouvre la caméra du téléphone (autorisation à accepter la première fois) et scanne automatiquement n'importe quel QR code pointé devant elle — le vôtre ou un autre. Dès qu'un code est reconnu, la page l'ouvre toute seule, exactement comme le ferait un scanneur natif. Cette fonctionnalité rend service aux téléphones d'entrée de gamme dont l'appli Appareil photo ne détecte pas les QR codes automatiquement.

⚠️ **Une seule limite à bien comprendre** : le bouton "Scanner" fait partie de la boutique elle-même — il faut donc que la boutique soit **déjà ouverte** sur le téléphone qui scanne (aujourd'hui ou une fois auparavant, même hors-ligne grâce au cache). Il ne peut pas servir à un client qui n'a encore jamais ouvert le lien : pour ce premier accès, il lui faut toujours soit ses données mobiles, soit se connecter au Wi-Fi SHAMAN (Walled Garden), comme expliqué plus haut. Le scanner est surtout utile ensuite : par exemple vous (avec la boutique déjà ouverte) pouvez scanner le QR imprimé pour un client dont le téléphone ne détecte pas les QR codes, ou un client déjà connecté peut faire profiter un ami à côté de lui.

**Bug corrigé : le scanner n'ouvrait aucun QR code.** La librairie de lecture (jsQR) était chargée depuis une adresse qui n'existait pas réellement sur ce fournisseur (`cdnjs`), donc elle ne se chargeait jamais et la caméra, bien qu'elle s'ouvrait, ne détectait jamais rien. Corrigée avec la bonne adresse (`cdn.jsdelivr.net`) — pensez à ajouter ce domaine à votre liste Walled Garden ci-dessus si vous voulez que le scanner fonctionne aussi pour un client connecté uniquement au Wi-Fi SHAMAN (sans données mobiles). Un message d'erreur s'affiche désormais si la librairie ne se charge pas, au lieu d'un scanner silencieusement inactif.

## Nouveau : bouton "📶 QR Wi-Fi rapide" (rejoindre le réseau sans passer par les réglages)

Ajouté sur la page boutique et sur l'affiche imprimable (`qr-code.html`, colonne de gauche). Ce QR code n'utilise pas notre scanner : c'est l'appareil photo natif du téléphone (celui déjà installé, aucune appli requise) qui le reconnaît automatiquement au format standard `WIFI:` et propose un bouton "Rejoindre ce réseau" en un seul tap, votre réseau étant ouvert (aucun mot de passe).

**Ce que ça permet concrètement, combiné à ce qui existe déjà :** un client sans données mobiles ni Wi-Fi peut désormais, avec son seul appareil photo natif (aucune appli à ouvrir) : 1) scanner le QR "Rejoindre le Wi-Fi" → un tap → il est connecté au réseau SHAMAN ; 2) scanner ensuite le QR "Ouvrir la boutique" → grâce au Walled Garden déjà configuré, la boutique s'ouvre directement, même sans données mobiles et même la toute première fois.

⚠️ **Ce que ça ne fait toujours pas** : allumer le Wi-Fi si le téléphone l'a complètement désactivé (l'OS ne le permet à aucune page web, même via ce format), ni fusionner les deux étapes en un seul scan qui ouvrirait le Wi-Fi ET la boutique en même temps — les deux formats de QR (`WIFI:` et lien web) sont mutuellement exclusifs pour l'appareil photo natif, d'où les deux QR séparés.

## Nouveau : bouton "📶 Se connecter au Wi-Fi SHAMAN" (remplace le QR Wi-Fi)

Le QR Wi-Fi a été retiré de la page boutique : il ne fonctionnait que sur les téléphones dont l'appareil photo natif sait déjà reconnaître les QR codes tout seul — inutile sur les autres. À la place, un bouton **"📶 Se connecter au Wi-Fi SHAMAN"** est disponible pour la personne déjà dans l'application, sur son propre téléphone :
- **Sur Android** : le bouton ouvre directement l'écran des réglages Wi-Fi du téléphone (raccourci officiel de Chrome, `intent:#Intent;action=android.settings.WIFI_SETTINGS;end`), sans passer par le menu des réglages.
- **Sur iPhone** : Apple ne permet à aucun site web d'ouvrir cet écran directement (restriction système), donc le bouton affiche le chemin à suivre (Réglages → Wi-Fi).

⚠️ **Dans les deux cas**, un dernier tap sur "WI-FI 6 SHAMAN HOTSPOT" dans la liste reste obligatoire (le réseau étant ouvert, aucun mot de passe n'est à taper). Ce tap final ne peut être supprimé par aucune technologie web, sur aucun téléphone, aucun système : c'est une règle de sécurité imposée par Android et iOS eux-mêmes, pas une limite de cette application. Le gain réel de ce bouton est de sauter directement à l'écran Wi-Fi côté Android, au lieu de devoir chercher soi-même dans les menus.

## Nouveau : bouton "🔗 Partager le lien"

Ouvre le menu de partage natif du téléphone (toutes les applications installées : WhatsApp, Messenger, SMS, Mail, etc.), le même principe que le bouton "Partager" déjà en place sur le fil d'actualité. Sur les rares navigateurs qui ne le supportent pas, le lien est copié automatiquement dans le presse-papier avec un message expliquant de le coller où vous voulez.

## Boutons réorganisés en grille 2×2

Les 4 boutons ("Afficher mon QR code", "Scanner un QR code", "Se connecter au Wi-Fi SHAMAN", "Partager le lien") sont maintenant sur 2 lignes de 2, au lieu d'être empilés verticalement. La limite entre le bleu et le blanc n'est plus une hauteur fixe en pixels (qui cassait à chaque ajout de bouton) : elle se recalcule désormais automatiquement selon la hauteur réelle du contenu (titre, bannières, boutons), donc les boutons restent toujours sur le fond bleu, juste au-dessus du blanc, quel que soit le nombre de lignes qu'ils prennent.

## Nouveau : "🔲 Générateur de QR code universel" (espace admin uniquement)

Nouvel onglet dans le tableau de bord (menu principal). Vous pouvez y taper ou coller n'importe quoi — un lien, un numéro de téléphone, un message, un texte — et générer son QR code en un clic, indépendamment du reste de l'application. Un bouton "📥 Télécharger l'image" permet de récupérer le QR en image PNG (utile pour l'imprimer ou l'envoyer). Il utilise la même librairie que le reste de l'app (qrcodejs), avec le niveau de correction d'erreur le plus élevé par défaut : le QR généré reste lisible même partiellement abîmé ou mal cadré, et fonctionne avec n'importe quel scanneur, ancien ou récent.

⚠️ Un QR code a une capacité limitée (environ 1000 à 1200 caractères avec ce niveau de correction) : un texte trop long affichera un message d'erreur clair au lieu de planter.

## Nouveau : connexion automatique au portail avec le code du ticket

Le bouton "📶 Se connecter au Wi-Fi SHAMAN" ouvre maintenant une fenêtre à 3 onglets :
1. **Rejoindre le Wi-Fi** — le raccourci déjà en place (réglages Android / instructions iPhone), à utiliser seulement si le téléphone n'est pas encore connecté au réseau.
2. **Scanner mon ticket** — pointe la caméra vers le QR code imprimé sur le ticket (comme sur votre photo) ; dès que le code est lu, il est envoyé automatiquement au portail et la connexion internet se fait sans rien taper.
3. **Entrer le code** — un champ pour taper le code du ticket au clavier (comme sur votre portail captif), avec un bouton "Connexion".

**Comment ça fonctionne techniquement :** l'app envoie directement le code au formulaire de connexion de votre routeur MikroTik, à l'adresse `shamanchooz.wifi` (celle vue dans votre capture d'écran), avec les noms de champs standards qu'utilise RouterOS pour identifier un voucher (`username`/`password` = le code, comme le fait votre portail actuel). Ça ne passe pas par une requête cachée : c'est une vraie navigation, donc ça fonctionne même si l'app est hébergée ailleurs (GitHub Pages).

⚠️ **Deux points importants :**
- **Ça ne peut fonctionner que si le téléphone est déjà connecté au réseau Wi-Fi SHAMAN** (l'adresse `shamanchooz.wifi` n'existe que sur ce réseau local). C'est pour ça que l'onglet 1 (rejoindre le Wi-Fi) reste disponible séparément : utilisez-le d'abord si ce n'est pas encore fait, puis revenez scanner ou taper le code.
- Les noms des champs (`username`, `password`, `dst`) sont les noms standards imposés par RouterOS pour tous les portails MikroTik — ils ne devraient donc pas varier selon le modèle de votre template Mikhmon. Mais comme je n'ai pas pu lire le contenu exact de votre `login.html`, **testez bien ce nouvel onglet avec un vrai ticket avant de l'utiliser en clientèle**. Si la connexion échoue, envoyez-moi le contenu de `login.html` (juste la partie `<form>...</form>`) et j'ajusterai précisément.

## Style des fenêtres plein écran harmonisé

Les fenêtres (QR code, scanner, connexion Wi-Fi) utilisent maintenant le même bleu que le reste de l'application, avec des boutons blancs — au lieu du fond sombre et des boutons verts précédents.

## À savoir : qualité d'impression du QR sur les tickets

Si un QR code imprimé sur un ticket ne se scanne pas (par notre lecteur ou par n'importe quel autre scanneur), c'est presque toujours un problème d'impression (encre, papier, taille) et non un problème de l'application — le code numérique, lui, reste fiable puisqu'il vient directement de Mikhmon. L'onglet "Entrer le code" est donc le repli à utiliser sur ce type de ticket.

## Correction importante : la connexion automatique utilise maintenant la bonne adresse

Les onglets "Scanner mon ticket" et "Entrer le code" pointaient vers `shamanchooz.wifi`, une adresse qui ne correspond pas à ce que votre application utilise déjà ailleurs. Votre app a en réalité, depuis le début, la vraie adresse de connexion tout en haut du fichier :

```js
const HOTSPOT_LOGIN_URL = "http://10.10.10.1/login";
```

C'est cette même adresse (et le même formulaire caché `#hotspotLoginForm`, déjà utilisé après un achat) que les deux onglets utilisent maintenant — donc le même mécanisme, déjà en place dans votre app, au lieu d'une adresse devinée séparément.

**Second correctif :** le QR imprimé sur vos tickets encode probablement une URL complète (`http://10.10.10.1/login?username=12345&password=12345`), pas seulement le chiffre. Le scanner extrait maintenant correctement le code depuis cette URL (ou le lit directement s'il s'agit d'un simple numéro).

**Troisième amélioration :** le scanner essaie d'abord le lecteur de QR natif du téléphone (disponible sur la plupart des Android récents, via Chrome) — bien plus tolérant qu'un lecteur en JavaScript pur sur les codes imprimés petits, flous ou mal cadrés — et ne bascule sur jsQR que si ce lecteur natif n'est pas disponible (iPhone notamment).

⚠️ **Si l'adresse `10.10.10.1` n'est pas la bonne IP de votre hotspot**, changez-la à cet unique endroit (`HOTSPOT_LOGIN_URL`, tout en haut du fichier) — ce changement s'appliquera alors automatiquement partout dans l'app (achat, scan, saisie du code).

## Nouveau : "📊 Tableau de bord" dans l'espace admin

Premier lien du menu admin désormais. Tout est calculé en direct à partir de vos codes tickets (aucune lecture Firestore supplémentaire, donc pas de coût en plus) :
- **Chiffre d'affaires** : aujourd'hui, 7 jours, 30 jours, total, et nombre de ventes du jour.
- **Alerte stock bas** : avertissement dès qu'un forfait tombe à 3 codes ou moins (modifiable : variable `SEUIL` dans `index.html`).
- **Graphique des 14 derniers jours** : barres montrant le chiffre d'affaires jour par jour.
- **Forfaits les plus vendus** : classement par chiffre d'affaires.
- **Activité récente** : les 10 dernières ventes (client, forfait, montant, heure).
- **Export CSV** : télécharge tous les tickets (code, forfait, statut, dates, client) dans un fichier à ouvrir dans Excel — pratique pour une sauvegarde ou une compta, comme l'export de vouchers de Mikhmon.

Une recherche a aussi été ajoutée en haut du **Stock de tickets** et de l'**Historique des achats** (par code, forfait ou numéro de client).

## À savoir : ce qui reste impossible à ramener dans l'app depuis le routeur

Comme expliqué précédemment, l'application (HTTPS, sur GitHub Pages) ne peut pas lire en direct ce qui se passe sur le routeur local (HTTP) : qui est connecté en ce moment, la bande passante, etc. — c'est bloqué par tous les navigateurs, pas par un manque de code. Le tableau de bord ci-dessus couvre donc tout ce qui concerne vos ventes et vos codes (ce qui recoupe une bonne partie de ce que fait Mikhmon), mais pas l'état réseau en direct du routeur. Pour ça, il faudra l'outil séparé, installé directement sur le routeur, évoqué précédemment.

## Nouveau : "📡 Connexions Wi-Fi en direct (Mikhmon)" dans l'espace admin

Aucune modification du routeur n'est nécessaire. Cette page ouvre en un tap les pages de **votre Mikhmon** (qui, lui, lit déjà le routeur) : connectés en ce moment, tous les tickets/utilisateurs, appareils détectés, rapport des ventes, tableau de bord, profils, journal.

**Première utilisation (une seule fois) :** ouvrez votre Mikhmon comme d'habitude, copiez l'adresse complète de la barre du navigateur, collez-la dans le champ et touchez "Enregistrer". L'adresse et le nom de session sont retenus sur cet appareil (le mot de passe n'est jamais enregistré). Le bouton "Modifier" permet de la changer.

**À savoir :**
- Le téléphone doit être connecté au Wi-Fi 6 SHAMAN (même réseau que Mikhmon), sinon la page reste vide. Un bouton "📶 Rejoindre le Wi-Fi" est fourni.
- Mikhmon s'ouvre dans un nouvel onglet : l'application ne peut pas afficher elle-même les connexions en direct, car les navigateurs interdisent à une page HTTPS (GitHub Pages) de lire une adresse HTTP locale comme celle du routeur ou de Mikhmon. Ouvrir Mikhmon dans un onglet n'est pas concerné par cette interdiction.
- Les adresses des pages suivent la structure de Mikhmon v3. Selon la version, "Rapport des ventes" ou "Profils" peuvent différer : en cas de page vide, ouvrez la page à la main dans Mikhmon et dites-moi l'adresse affichée.

## Nouveau : le code ticket gardé dans WhatsApp (après un achat)

Quand le paiement est validé, la boîte du code affiche maintenant **deux étapes** :
1. **🔓 Me connecter au Wi-Fi** : ouvre la connexion dans un nouvel onglet (« Envoyer quand même » si le téléphone le demande). L'application surveille ensuite la connexion et affiche **✅ Vous êtes connecté à internet** dès qu'elle est établie (le téléphone vibre).
2. **💬 Garder mon code dans WhatsApp** : un seul appui ouvre WhatsApp avec le message déjà écrit (code, forfait, mode d'emploi, numéro d'assistance). Le client touche seulement « Envoyer » et le code reste dans ses messages (conversation avec son propre numéro).

**Pourquoi ça marche sans données mobiles :** le bouton utilise le lien direct de l'application WhatsApp (`whatsapp://`) et non la page web `wa.me`. Il ouvre WhatsApp immédiatement sans télécharger de page, et le message part dès que le Wi-Fi est connecté. Si WhatsApp ne s'ouvre pas au bout de 2 secondes, un lien de secours « WhatsApp ne s'ouvre pas ? Touchez ici » apparaît.

**Envoi 100 % automatique :** impossible depuis une page web. Android et WhatsApp exigent un appui du client pour envoyer un message ; seule l'API professionnelle WhatsApp Business (payante, avec un serveur) peut le faire sans appui. Le fonctionnement en un seul appui est donc le plus direct possible.

**Côté admin :** dans **Historique des achats**, chaque achat validé a un bouton **💬 Code** qui ouvre WhatsApp vers le client avec son code (utile s'il l'a perdu). Les numéros sont normalisés automatiquement (07 48..., +225 07 48..., 0748... donnent tous le bon format).

### Si WhatsApp affiche « Pas de connexion Internet » alors que le Wi-Fi marche

Ce message vient de WhatsApp et d'Android, pas de l'application ni du ticket. Quand le client se connecte par une page web (et non par la fenêtre « Se connecter au réseau Wi-Fi » d'Android), Android peut garder ce Wi-Fi marqué « sans internet » pendant un moment, et WhatsApp refuse alors de s'en servir, même si les sites s'ouvrent. L'application affiche maintenant toute seule, quand le client revient de WhatsApp, un encadré d'aide avec un bouton « 📶 Ouvrir les réglages Wi-Fi » : éteindre puis rallumer le Wi-Fi force Android à refaire son test, et le ticket reste actif.

## Prochaine étape possible

Quand vous serez prêt, dites-le-moi et on branche la suite :
- accès à l'API Wave Business ou compte CinetPay/PayDunya → paiement 100% automatique
- Firebase Cloud Function planifiée → suppression garantie après 30 jours même sans ouvrir le tableau de bord


## Protection forte (Firebase Authentication + règles Firestore)

**Ce que ça change :** avant, n'importe qui pouvait lire votre stock de codes et écrire dans la base. Maintenant : le **stock de tickets, les commandes, les agents, les gains et les réglages ne sont lisibles que par vous** (connecté en administrateur). Un client ne peut créer que **sa propre commande « en attente »** et lire sa propre commande ; il ne peut ni la valider, ni voir celle des autres. Un agent ne peut enregistrer une vente que sous un code agent valide.

**À faire dans cet ordre (≈ 10 minutes) :**

1. **Firebase → Authentication → Commencer → Méthode de connexion** : activez **E-mail/Mot de passe** et **Anonyme**, puis Enregistrer.
2. **Authentication → Utilisateurs → Ajouter un utilisateur** :
   - E-mail : `admin@shamanchooz.wifi` (exactement, ce n'est pas une vraie boîte mail)
   - Mot de passe : **choisissez un nouveau mot de passe solide**, que vous seul connaissez.
3. **GitHub** : uploadez `index.html` et `sw.js` (remplacez les anciens), supprimez `admin.html` et `client.html`. Attendez 1 à 2 minutes que GitHub Pages se mette à jour.
4. **Firebase → Firestore Database → Règles** : effacez tout, collez **tout** le contenu de `firestore.rules` (voir ci-dessous), puis **Publier**.
5. Ouvrez `…/index.html#admin` : entrez le **nouveau** mot de passe. Bouton **Se déconnecter** en haut à droite.

⚠️ Avec les nouvelles règles, les anciennes versions de l'app (sans connexion Firebase) ne fonctionnent plus : faites l'étape 3 **avant** l'étape 4.
Le Walled Garden MikroTik n'a rien à changer : `*.googleapis.com` et `*.gstatic.com` couvrent déjà la connexion Firebase.
Si ce même projet Firebase sert aussi à une autre application, ces règles remplacent tout : prévenez-moi avant de publier.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // ============================================================
    //  SHAMAN CHOOZ — Achat de codes tickets Wi-Fi
    //  Règles complètes : à copier-coller en une fois dans
    //  Firebase > Firestore Database > Règles > Publier.
    //  L'e-mail ci-dessous doit être celui de l'utilisateur
    //  administrateur créé dans Firebase > Authentication.
    // ============================================================

    // ---------- Outils ----------
    function signedIn() {
      return request.auth != null;
    }
    // Administrateur : connecté par e-mail + mot de passe avec CET e-mail précis
    function isAdmin() {
      return request.auth != null
        && request.auth.token.firebase.sign_in_provider == 'password'
        && request.auth.token.email == 'admin@shamanchooz.wifi';
    }
    // Propriétaire du document (clients et agents sont connectés anonymement)
    function isOwner() {
      return signedIn() && resource.data.uid == request.auth.uid;
    }
    function strOk(v, min, max) {
      return v is string && v.size() >= min && v.size() <= max;
    }
    function codeDoc(code) {
      return /databases/$(database)/documents/agent_codes/$(code);
    }
    // Code agent valide : actif, ou remplacé depuis moins de 7 jours (ventes déjà faites hors-ligne)
    function codeActive(code) {
      return get(codeDoc(code)).data.actif == true
        || request.time.toMillis() < get(codeDoc(code)).data.expireMs;
    }

    // ---------- Commandes en ligne ----------
    match /orders/{orderId} {
      allow list: if isAdmin();
      allow get: if isAdmin() || isOwner();
      // Un client crée SA commande, uniquement "en attente", sans pouvoir la valider lui-même
      allow create: if signedIn()
        && request.resource.data.keys().hasOnly(['phone', 'forfaitId', 'forfaitLabel', 'montant', 'statut', 'createdAt', 'uid', 'hasAgent', 'agentNom', 'agentCode', 'agentAt'])
        && request.resource.data.keys().hasAll(['phone', 'forfaitId', 'forfaitLabel', 'montant', 'statut', 'createdAt', 'uid'])
        && request.resource.data.uid == request.auth.uid
        && request.resource.data.statut == 'attente'
        && request.resource.data.createdAt == request.time
        && strOk(request.resource.data.phone, 8, 25)
        && strOk(request.resource.data.forfaitId, 1, 12)
        && strOk(request.resource.data.forfaitLabel, 1, 40)
        && request.resource.data.montant is number
        && request.resource.data.montant > 0
        && request.resource.data.montant <= 100000
        && (!('agentCode' in request.resource.data)
            || (request.resource.data.hasAgent == true
                && strOk(request.resource.data.agentCode, 6, 12)
                && strOk(request.resource.data.agentNom, 1, 60)
                && exists(codeDoc(request.resource.data.agentCode))));
      // Le client ne peut modifier que deux repères de suivi sur sa propre commande
      allow update: if isAdmin()
        || (isOwner() && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['connectAt', 'waSentAt']));
      allow delete: if isAdmin();
    }

    // ---------- Stock de tickets : administrateur uniquement ----------
    match /tickets/{ticketId} {
      allow read, write: if isAdmin();
    }

    // ---------- Agents commerciaux ----------
    match /agents/{agentId} {
      allow read, write: if isAdmin();
    }
    // Index des codes agents : un téléphone peut lire UN code précis (jamais la liste)
    match /agent_codes/{code} {
      allow get: if signedIn();
      allow list, write: if isAdmin();
    }
    // Ventes physiques déclarées par les agents
    match /agent_sales/{saleId} {
      allow read: if isAdmin();
      allow create: if isAdmin()
        || (signedIn()
            && request.resource.data.keys().hasOnly(['agentNom', 'agentCode', 'ticketCode', 'clientTime', 'mode', 'syncedAt', 'uid'])
            && request.resource.data.keys().hasAll(['agentNom', 'agentCode', 'ticketCode', 'clientTime', 'mode', 'uid'])
            && request.resource.data.uid == request.auth.uid
            && request.resource.data.mode == 'physique'
            && strOk(request.resource.data.agentCode, 6, 12)
            && strOk(request.resource.data.agentNom, 1, 60)
            && strOk(request.resource.data.ticketCode, 1, 20)
            && request.resource.data.clientTime is number
            && codeActive(request.resource.data.agentCode));
      allow update: if isAdmin()
        || (isOwner() && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['syncedAt']));
      allow delete: if isAdmin();
    }
    match /agent_payouts/{payoutId} {
      allow read, write: if isAdmin();
    }

    // ---------- Réglages ----------
    match /meta/{docId} {
      // annuaire des agents (empreintes + codes désactivés) : lisible par les téléphones
      allow get: if docId == 'agent_dir' && signedIn();
      // réglages (pourcentage de gains…) : administrateur uniquement
      allow read, write: if isAdmin();
    }
  }
}
```

## Agents commerciaux

**Créer un agent :** `#admin` → **🤝 Agents commerciaux** → nom + **pourcentage de gains de cet agent** → **Créer l'agent**. L'application génère son code personnel. Bouton **💬 Envoyer l'accès** pour le lui transmettre sur WhatsApp.

**Changer le code d'un agent (si trop compliqué à retenir) :** sur sa fiche → **🔑 Changer le code** → tapez un code de **6 à 12 lettres/chiffres avec au moins 1 lettre ET 1 chiffre** (ex. `KONE24`), ou laissez vide pour un code automatique. L'ancien code n'ouvre plus de session ; les ventes déjà faites avec l'ancien code et pas encore envoyées restent acceptées 7 jours.

**Changer le pourcentage d'un agent :** sur sa fiche → **% Changer le pourcentage**. Chaque agent a le sien. Le nouveau pourcentage s'applique aux ventes faites **à partir de maintenant** ; ses ventes passées gardent l'ancien pourcentage (historique affiché sur la fiche).

**Côté agent (boutique) :** juste sous les 4 boutons, la barre **Agent commercial** → nom + code → le voyant devient **vert**.
- Code généré automatiquement : reconnu **sur le téléphone, sans aucune connexion**.
- Code choisi par vous : reconnu grâce à l'annuaire des agents que le téléphone télécharge dès qu'il touche Firebase (c'est le cas via le Walled Garden du Wi-Fi SHAMAN). Sur un téléphone qui n'a jamais touché Firebase et sans aucune connexion, un code choisi par vous ne peut pas être vérifié : l'application l'explique au lieu d'afficher un faux voyant vert.
- *Ticket physique* : **Scanner le ticket** ou **Taper le code** connecte le client et enregistre la vente.
- *Achat en ligne* : la commande porte le nom de l'agent ; vous validez comme toujours.
- La vente est gardée sur le téléphone puis envoyée dès que possible (secours : « Prévenir par WhatsApp »).
- Sur le téléphone d'un client, laissez cochée **« Effacer mes infos après la vente »**.

**Côté admin :** par agent : ventes, chiffre d'affaires, commission, total déjà versé et **reste à payer** (bouton **Régler**), export CSV. Les ventes physiques sont vérifiées automatiquement dans votre stock (le forfait donne le montant, le ticket passe en « vendu ») quand vous ouvrez l'espace admin. Un cas anormal (ticket inconnu, doublon, déjà vendu en ligne…) apparaît **« À vérifier »** et n'est pas compté tant que vous n'avez pas confirmé ou exclu.

