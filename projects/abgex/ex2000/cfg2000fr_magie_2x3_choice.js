// conf2000fr_magie_2x3_choice.js
// Tout ce qui suit un double slash sont des commentaires, jusqu'à la fin de la ligne.
/*
Les blocs de lignes commençant par 'slash étoile' et terminant par 'étoile slash' sont des commentaires

Ce fichier de configuration est un programme écrit en javascript.
Ceci rend la configuration très souple et puissante.
Il n'est pas nécessaire de tout comprendre pour prendre un fichier de configuration
existant, faire quelques modification et obtenir ainsi un nouveau fichier de fonfiguration.
 */
//-------------------------------------------------
/*
Ce fichier permet d'afficher plusieurs choix de chargement de fichiers de configuration.
 */
// ########################################################################################

function Config_Choice(nChoice) {
//===============================
// Chargement du fichier de configuration défini par le nombre nChoice.

if (nChoice == 1) ConfigLoad("cfg2000fr_magie_2x3_v1.js");
if (nChoice == 2) ConfigLoad("cfg2000fr_magie_2x3_v2.js");
if (nChoice == 3) ConfigLoad('cfg2000fr_magie_2x3_v3.js');
if (nChoice == 4) ConfigLoad("cfg2000fr_magie_2x3_v0.js");
if (nChoice == 5) ConfigLoad('cfg2000fr_magie_2x4_v0.js');
if (nChoice == 6) ConfigLoad('cfg2000fr_magie_3x3_v0.js');

// Les autres cas de nChoice correspondent à "Annuler", il ne fait rien.
} // Config_Choice

// Création de la boîte de dialogue des choix de fichiers de configuration
Config_Choice_Init(380, 90); // À appeler au départ.  (Position gauche, position droite)   0 => garde la position par défaut.
Config_Choice_AddOne("Choix 1", "<b>Magie avec 8 cartes</b><br>L'ordinateur retrouve la carte choisie.<br>Version basique.");  // nChoice == 1
Config_Choice_AddOne("Choix 2", "<b>Magie avec 8 cartes</b><br>L'ordinateur retrouve la carte choisie.<br>Version améliorée.");  // nChoice == 2
Config_Choice_AddOne("Choix 3", "<b>Magie avec 8 cartes</b><br>L'ordinateur retrouve la carte choisie.<br>Version sophistiquée.");  // nChoice == 3
Config_Choice_AddOne("Choix 4", "<b>Magie avec 8 cartes</b><br>À vous d'écrire le code pour cette situation.");
Config_Choice_AddOne("Choix 5", "<b>Magie avec 16 cartes</b><br>À vous d'écrire le code pour cette situation.");
Config_Choice_AddOne("Choix 6", "<b>Magie avec 27 cartes</b><br>À vous d'écrire le code pour cette situation.");
Config_Choice_AddOne("Annuler", "Ne fait rien");
Config_Choice_Start(); // À appeler à la fin, pour ouvrir la boîte de dialogue
 
