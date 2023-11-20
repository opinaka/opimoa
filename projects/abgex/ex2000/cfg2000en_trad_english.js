// cfg2000en_trad_english.js
// Tout ce qui suit un double slash sont des commentaires, jusqu'à la fin de la ligne.
/*
Les blocs de lignes commençant par 'slash étoile' et terminant par 'étoile slash' sont des commentaires

Ceci est un fichier de configuration, qui permet de choisir une URL (adresse web),
qui contient le fichier de configuration désiré.

Ce fichier de configuration est un programme écrit en javascript.
Ceci rend la configuration très souple et puissante.
Il n'est pas nécessaire de tout comprendre pour prendre un fichier de configuration existant, 
faire quelques modification et obtenir ainsi un nouveau fichier de fonfiguration.

Ce fichier sert à traduire des parties en anglais.

Voir le fichier : ex2000.html  pour des tags à traduire.

 */
// ########################################################################################

document.getElementById('HTML_CONFIGURE').innerHTML = "Configuration...";

// All files : cfg2000fr_*.js  should be changed to cfg2000en_*.js
// and the contents of the files should be translated in english.

document.getElementById('HTML_CONFIGURE_010').innerHTML = "Some examples to choose...";
document.getElementById('HTML_CONFIGURE_010').setAttribute("onclick", "ConfigLoad('cfg2000fr_magie_2x3_v0.js');");  // Mettre le fichier à charger associé en anglais.
// Une autre manière de faire, plus compliquée
// document.getElementById('HTML_CONFIGURE_010').attributes.getNamedItem("onclick").value = "ConfigLoad('cfg2000fr_....js');";

document.getElementById('HTML_CONFIGURE_020').innerHTML = "Basic : 4 colums and 4 lines";
document.getElementById('HTML_CONFIGURE_020').setAttribute("onclick", "ConfigLoad('cfg2000fr_magie_2x4_v3.js');");  // Mettre le fichier à charger associé en anglais.

document.getElementById('HTML_CONFIGURE_030').innerHTML = "General, with m lines and n columns";
//document.getElementById('HTML_CONFIGURE_030').setAttribute("onclick", "ConfigLoad('cfg2000fr_....js');");  // Mettre le fichier à charger associé en anglais.


// À FAIRE .....  TO DO .....


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

alert("Change some configuration names and links in english. \nWill be visible in the menu 'Configuration'\nAll translations have to be done !!!");
