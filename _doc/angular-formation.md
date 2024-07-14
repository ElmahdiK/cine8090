01/02/2022

- ng v => //vérifier la version d'ANGULAR
- ng new snapface --style=scss --skip-tests=true (add routing ? no) => //créer un projet ANGULAR
- ng serve => //démarrer le serveur de développement (lancer l'application)
- ng generate component(ou ng g c) face-snap => //créer un component
- ng build(ou b) <project> [options] => //compiles an Angular app into an output directory named dist/ at the given output path. Must be executed from within a workspace directory.

- Angular est un framework JavaScript - il s'agit d'un ensemble d'outils et de composants à partir desquels on peut créer des applications.
- Le TypeScript est un langage qui apporte des syntaxes supplémentaires au JavaScript, notamment le typage strict.
- Le TypeScript est l'un des principaux langages d'Angular. Possède comme extension ".ts"
- CLI = Command Line Interface, ou interface en ligne de commande.

- On utilise la commande "ng new" pour créer une nouvelle application Angular.
- Le flag "--style=scss" dit au CLI d'Angular que vous souhaitez utiliser le SCSS.
- La balise "<app-root>" correspond au component AppComponent, le component racine de votre application.

- Un component Angular va regrouper : un fichier HTML + un fichier SCSS + un fichier TS

- On emploie les doubles accolades {{ }} pour la "string interpolation" => syntaxe qui permet d'afficher la valeur d'une variable venant du TypeScript dans le DOM.

- La liaison par attribut, ou "attribute binding" => syntaxe qui permet de lier la valeur d'une variable venant du TypeScript à un attribut d'un élément du template. Ex: l'attribut "src" d'une balise <img> On met des crochets [] autour de l'attribut pour lui lier une valeur. Ex: <img [src]="imageUrl">

- La liaison par événement, ou "event binding" => lier une méthode TypeScript à un événement du DOM. Ex: pour chaque clic sur un bouton, on appellera la méthode liée.
  On met le nom de l'événement entre parenthèses () Ex: <button (click)="myMethod()">.

- On utilise le décorateur @Input() pour rendre injectable une propriété de component.

- On utilise l'attribute binding – les crochets autour du nom de la propriété – pour lier une variable à une propriété personnalisée d'un component enfant. <app-coffee-cup [size]="largeSize"></app-coffee-cup>

21/02/2022

Partie 3 - Structurez un document avec des directives

QUIZZ

- Une directive est une classe TypeScript qui ajoute du comportement supplémentaire à un élément HTML (qui peut aussi être un component).
- La directive \*ngIf sert à ajouter ou non un élément au DOM selon une condition donnée.
  Elle ne "cache" pas les éléments qui ne remplissent pas la condition : elle ne les ajoute simplement pas au DOM.
- On doit passer une condition valable TypeScript à la directive \*ngIf : c'est la condition selon laquelle l'élément sera ajouté ou non au DOM. photoUrl et maPhoto sont des variables, et donc n'ont pas besoin d'être entourées par '
- la directive :
  - \*ngFor : permet d'ajouter un élément au DOM pour chaque élément du tableau passé en argument
  - \*ngIf : sert à ajouter ou non un élément au DOM selon une condition donnée
  - [ngClass] : sert à ajouter ou non des classes CSS à un élément du DOM
- Syntaxe pour *ngFor : <balise *ngFor="let element of array" [property]="element" > ("of" et on "in" !)
- L'astérisque signifie que ce sont des directives structurelles, qui modifieront donc la structure du document.
- [ngStyle] applique des valeurs dynamiques directement à des styles ;
- [ngClass] applique des classes CSS selon des conditions données.

- [ngStyle] prend un objet où les clés sont les styles à modifier et les valeurs correspondent aux valeurs qui doivent prendre ces styles. Pour passer la bonne valeur, il faut multiplier size par 100 et y ajouter le caractère % .
  Ex: <div [ngStyle]="{ width: size \* 100 + '%' }"></div>
- Les valeurs de l'objet passé à [ngClass] sont les conditions selon lesquelles les classes doivent être appliquées.
  Ex: <div [ngClass]="{ snapped: buttonText==='Oops, unSnap!' }">

1. Conditionnez l'affichage des éléments

- Vous pouvez ajouter des propriétés optionnelles à une classe en y ajoutant un point d'interrogation ? Ex: "location?: string;"

- Une directive est une classe qui vient ajouter du comportement à l'élément sur lequel elle est posée. Ex: _ngIf (directive structurelle à cause du "_")
- *ngIf : permet donc de structurer vos components selon les conditions que vous choisissez.
  Ex: <p *ngIf="faceSnap.location === 'Paris'">Photo prise à {{ faceSnap.location }}</p>

2. Affichez des listes

- Autre exemple de directive structurelle \*ngFor
- La directive \*ngFor vous permet d'insérer un élément dans le DOM pour chaque élément dans un tableau.
- La syntaxe "let element of array" vous donne accès à l'élément de chaque itération, vous permettant de l'injecter dans un component, par exemple.

3. Ajoutez du style dynamique

- Angular limite les styles d'un component au component même : les enfants d'un component n'héritent pas des styles de leur parent. Vous allez donc avoir des styles et des classes qui sont encapsulés. La seule exception est le fichier de styles principal "styles.scss" qui sert justement à déclarer des styles et des classes globaux.
- la directive [ngStyle] est une "directive par attribut" c'est pour cela qu'on utilise les crochets ! (contrairement aux astérisques pr les directives structurelle)
  Elle permet d'appliquer des styles qui dépendent de valeurs dynamiques, comme un texte qui, plus il y a de snaps, devient de plus en plus vert.
- [ngStyle] prend comme argument un objet où les clés correspondent aux styles CSS à modifier, et les valeurs aux valeurs que doivent prendre ces styles.
  Ex: <span [ngStyle]="{ color: 'rgb(0,'+faceSnap.snaps+',0)' }">ok</span>

4. Mettez de la classe

- La directive [ngClass] permet d'ajouter dynamiquement des classes à des éléments HTML.
- [ngClass] prend un objet en argument, comme [ngStyle], mais dont le fonctionnement est différent - les clés sont les noms de classe CSS à appliquer ; - les valeurs sont les conditions qui doivent être remplies pour que les classes correspondantes s'appliquent.
  Ex: <div [ngClass]="{ snapped: buttonText==='Oops, unSnap!' }"> - On a bel et bien un comportement de classe dynamique !
  Conclusion : - directives structurelles (pour modifier la structure du document) : *ngIf, *ngFor - directives par attribut (pour gérer dynamiquement les styles) : [ngStyle], [ngClass]

Partie 4 - Modifiez l'affichage des données avec les pipes

// pipes – outils pour gérer le format d'affichage d'une donnée sans modifier la donnée elle-même.
// changé la casse de vos chaînes de caractères avec UpperCasePipe, LowerCasePipe et TitleCasePipe
// modifié l'affichage de la date de création des FaceSnaps avec DatePipe, et vous avez vu les différentes manières de personnaliser l'affichage des dates en passant un argument de configuration à DatePipe
// manipulé le format d'affichage des nombres avec DecimalPipe, PercentPipe et CurrencyPipe

1. Changez la casse

- Un pipe est appliqué dans le HTML et va formater la valeur qu'on lui passe selon le pipe utilisé sans toucher à la donnée sous-jacente (data from server)
  - LowerCasePipe : on affiche le texte en minuscules
  - UpperCasePipe : on affiche le texte en majuscules
  - TitleCasePipe : on affiche le texte avec une majuscule au début de chaque mot, avec le reste du mot en minuscules
- On applique un pipe à une chaîne de caractères affichée avec la string interpolation. On rajoute le caractère pipe | puis le nom du pipe
  Ex: <h2>{{ faceSnap.title | uppercase }}</h2>
- Les pipes existent uniquement pour modifier le formatage affiché d'une donnée : on ne peut pas les utiliser ailleurs que dans le template, et il est fortement déconseillé de les utiliser ailleurs que dans une string interpolation.

2. Formatez les dates - DatePipe permet de formater les dates, et sans configuration fournit un formatage par défaut. - DatePipe fournit des configurations prédéfinies avec des noms comme short, longDate ou mediumTime - DatePipe permet également de personnaliser totalement le format d'affichage des dates avec des chaînes de caractères qui encodent le format souhaité, par exemple 'à HH:mm, le d MMMM yyyy'
   Ex: <p>Mise en ligne {{ faceSnap.createdDate | date: 'le dd/MM/yy à HH:mm' }}</p>

- Pour changer la locale de votre application en français, il faudra ajouter quelques lignes dans votre fichier app.module.ts

3. Formatez les chiffres - DecimalPipe | number – facilite l'affichage de nombres avec des chiffres après la virgule (qui met une virgule plutôt qu'un point, par exemple). - PercentPipe | percent – formate les chiffres en pourcentage. - CurrencyPipe – permet d'afficher des nombres sous forme de monnaie très facilement.
   // il existe d'autres pipes qui seront importants dans la suite de votre apprentissage Angular – notamment le pipe async pour les Observables (voir https://angular.io/api/common#pipes)

=> DecimalPipe

- On peut aussi spécifier d'arrondir à un chiffre après la virgule en spécifiant un chiffre maximum après la virgule
  Ex: <p>{{ 4346234.36 | number: '1.0-1' }}</p> => 4 346 234.4
- Plus besoin de se prendre la tête avec la fonction Math.round() ! Angular peut afficher les nombres arrondis sans toucher à la donnée sous-jacente.

=> PercentPipe

- Pour transformer des nombres entre 0 et 1 en pourcentage (ex. : 0.4 = 40 %), il suffit d'utiliser PercentPipe
  Ex: <p>{{ 0.336 | percent }}</p> => 34% (PercentPipe arrondit par défaut les pourcentages à l'entier le plus proche.)
  Il peut cependant être configurer comme DecimalPipe
  Ex: <p>{{ 0.336 | percent: '1.0-1' }}</p> => 33.6%

DecimalPipe et PercentPipe acceptent un argument de configuration sous la forme :
'chiffresMinAvantVirgule.chiffresMinAprèsVirgule-chiffresMaxAprèsVirgule'

=> CurrencyPipe

- CurrencyPipe facilite l'affichage des montants d'argent, et accepte plusieurs arguments de configuration séparés par des deux-points :
- En effet, pour passer un deuxième argument à un pipe, on remet un deux-points : et on passe le deuxième argument
  Ex: <p>{{ 344.36 | currency: 'EUR' : 'code' }}</p>

22/02/2022

Partie 5 - Améliorez la structure de votre application avec les services et le routing

1. Partagez des données avec les Services

- Les services permettent de centraliser les données et la logique pour les différents domaines de votre application.
- Créer un service est aussi simple qu'ajouter le décorateur @Injectable() à une classe.
- Pour injecter un service dans un component, ajoutez un argument au constructor du component qui a le type du service, par exemple private userService: UserService

2. Centralisez votre logique avec les Services

- Centraliser les interactions dans un service sous forme de méthodes crée une structure plus modulaire, qui facilite la maintenance et les évolutions de votre application.
- Comme dans toute base de code, refactorisez pour éviter de répéter des blocs de code (le principe DRY : Don't Repeat Yourself).
- Les literal types permettent de créer rapidement des types personnalisés, souvent utilisés pour limiter les choix pour un argument de méthode, par exemple : fileType: 'image' | 'video'

3. Passez en SPA avec le routing

- Un module de routing contient un tableau de type Routes qui contient les routes de l'application.
- Une route est un objet de type { path: 'myPath', component: MyComponent } qui spécifie le component à afficher pour chaque route.
- On appelle RouterModule.forRoot() en passant le tableau de routes pour enregistrer les routes dans le routeur Angular.
- On enregistre le module de routing dans AppModule pour ajouter le routeur configuré à l'application.
- On ajoute une balise <router-outlet> pour dire à quel niveau du template le component de la route active doit être inséré.
- Pour ajouter des fichiers statiques à une application (comme des images), on les stocke dans le dossier assets

(Pour dist : ng build) => pour que ça marche ajouter à la fin du fichier .browserslistrc :
not ios_saf 15.2-15.3
not safari 15.2-15.3

4. Passez d'une route à l'autre

- Créez des liens qui permettent de passer d'une route à l'autre avec la directive "routerLink".
- Ajoutez des classes CSS aux liens correspondants à la route activée avec "routerLinkActive"
- Ignorez l'activation des routes enfants avec [routerLinkActiveOptions]="{ exact: true }"
- Injectez le Router dans vos components et utilisez sa méthode navigateByUrl() pour de la navigation programmatique.

5. Activez les routes avec ActivatedRoute

- On récupère les paramètres de la route activée en injectant ActivatedRoute, et via son objet "snapshot.params"
- Pour naviguer vers une route absolue (et non relative), n'oubliez pas d'ajouter un / au début de la route demandée.

// Vous avez centralisé données et logique dans un service que vous avez ensuite injecté dans les components concernés.
// Vous avez ajouté un module de routing à votre application, et trois routes fonctionnelles.
// Vous avez mis en place deux systèmes pour que vos utilisateurs puissent changer de route : les routerLinks et le Router.

Quizz:

- Le décorateur @Injectable() transforme une classe en service.
- En passant un objet de configuration { providedIn: 'root' } au décorateur @Injectable() , on s'assure d'enregistrer le service à la racine de l'application
- Pour injecter un service dans un component, on passe un argument du type du service au constructor avec un modificateur d'accès ; ex. : constructor(private myService: MyService) {}
- Dans le constructor, on injecte le service. Dans ngOnInit() , on initialise la propriété en appelant la méthode.
- addCowbell(howMuch: 'some' | 'more', when: number): Cowbell[] {}
- La déclaration de route spécifiée a besoin d'un path de type string et d'un component qui est le type du component correspondant. Ex: { path: 'coffee', component: CoffeeComponent }
- La directive "routerLink" expose l'attribut "routerLinkActive" qui prend comme argument le nom de la classe à appliquer sous forme de string . Il n'y a donc pas besoin des crochets de la liaison par attribut.
  Ex: <a routerLink="/stuff" routerLinkActive="active-link">Stuff</a>
- La balise <router-outlet> spécifie l'emplacement du component à afficher
- Navigation : this.router.navigateByUrl('new-gadgets');
- Le paramètre se récupère via la clé params de l'objet snapshot de ActivatedRoute. Il faut le cast en number avant d'appeler la méthode, car les params de route sont de type string .
  Ex: this.oldAmount = +this.route.snapshot.params['oldAmount'];

Conclusion: Félicitations !
Vous avez terminé ce cours d'introduction à Angular ! Vous avez créé une Single Page App qui utilise plusieurs des différentes briques d'une application Angular complète. Vous avez déjà énormément appris.

Mais ce n'est pas fini ! L'objectif de ce cours a été de vous aider à construire les fondations d'un apprentissage complet :
il vous reste plein de choses à apprendre pour être totalement opérationnel.
Par exemple : - les Observables : un sujet énorme en Angular, qui permet de créer des applications réactives et performantes ; - les formulaires : permettez à vos utilisateurs d'interagir de manière totalement dynamique avec l'application ; - les requêtes HTTP : quasiment toute application moderne a besoin de communiquer avec un serveur d'une manière ou d'une autre ; - les modules : améliorez la structure et les performances de vos applications, en les séparant en modules et en implémentant le lazy loading.

2022-02-24
Observables (http response): a sequence of items that arrive asynchronously over time
