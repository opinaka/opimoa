// cfg2000fr_trad_francais.js
// Tout ce qui suit un double slash sont des commentaires, jusqu'à la fin de la ligne.
/*
Les blocs de lignes commençant par 'slash étoile' et terminant par 'étoile slash' sont des commentaires

Ceci est un fichier de configuration, qui permet de choisir une URL (adresse web),
qui contient le fichier de configuration désiré.

Ce fichier de configuration est un programme écrit en javascript.
Ceci rend la configuration très souple et puissante.
Il n'est pas nécessaire de tout comprendre pour prendre un fichier de configuration existant, 
faire quelques modification et obtenir ainsi un nouveau fichier de fonfiguration.

Ce fichier sert à traduire des parties en français.
Il peut aussi servir à corriger des erreurs dans la page Web,
à partir d'un fichier se trouvant sur un autre site Web, créé par un prof. ou une autre personne.

Voir le fichier : ex2000.html  pour des tags à traduire.

 */
// ########################################################################################

document.getElementById('HTML_CONFIGURE').innerHTML = "Configuration";

document.getElementById('HTML_CONFIGURE_010').innerHTML = "Divers exemples, au choix...";
document.getElementById('HTML_CONFIGURE_010').setAttribute("onclick", "ConfigLoad('cfg2000fr_exemples_choice.js');");  // Mettre le fichier à charger associé en français.
// Une autre manière de faire, plus compliquée
// document.getElementById('HTML_CONFIGURE_010').attributes.getNamedItem("onclick").value = "ConfigLoad('cfg2000fr_exemples_choice.js');";

document.getElementById('HTML_CONFIGURE_020').innerHTML = "Base : 4 lignes et 4 colonnes";
document.getElementById('HTML_CONFIGURE_020').setAttribute("onclick", "ConfigLoad('cfg2000fr_base_4x4.js');");  // Mettre le fichier à charger associé en français.

document.getElementById('HTML_CONFIGURE_030').innerHTML = "Général, avec m lignes et n colonnes...";
document.getElementById('HTML_CONFIGURE_030').setAttribute("onclick", "ConfigLoad('cfg2000fr_cartes_mxn.js');");  // Mettre le fichier à charger associé en français.

document.getElementById('HTML_CONFIGURE_040').innerHTML = "Sur le binaire...";
document.getElementById('HTML_CONFIGURE_040').setAttribute("onclick", "ConfigLoad('cfg2000fr_binaire_choice.js');");

document.getElementById('HTML_CONFIGURE_050').innerHTML = "Magie avec 8 cartes...";
document.getElementById('HTML_CONFIGURE_050').setAttribute("onclick", "ConfigLoad('cfg2000fr_magie_2x3_choice.js');");

document.getElementById('HTML_CONFIGURE_060').innerHTML = "Gestion d'événements...";
document.getElementById('HTML_CONFIGURE_060').setAttribute("onclick", "ConfigLoad('cfg2000fr_evenements_choice.js');");

document.getElementById('HTML_CONFIGURE_002').innerHTML = "Charge un fichier de configuration...";
document.getElementById('HTML_CONFIGURE_002').setAttribute("onclick", "ConfigLoad('');");

document.getElementById('HTML_CONFIGURE_005').innerHTML = "Configuration d'une URL...";
document.getElementById('HTML_CONFIGURE_005').setAttribute("onclick", "ConfigLoad('cfg2000fr_url.js');");

document.getElementById('HTML_CONFIGURE_006').innerHTML = "Traduction / Langage...";
document.getElementById('HTML_CONFIGURE_006').setAttribute("onclick", "ConfigLoad('cfg2000fr_traduction.js');");

alert("Change des noms et des liens dans le menu de configuration. \nDes changements peuvent être visibles dans le menu 'Configuration'");
