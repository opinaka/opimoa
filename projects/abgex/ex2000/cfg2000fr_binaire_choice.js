// conf2000fr_binaire_choice.js
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

if (nChoice == 1) ConfigLoad('cfg2000fr_base10_compteur_v3.js');
if (nChoice == 2) ConfigLoad("cfg2000fr_binaire_compteur_v1.js");
if (nChoice == 3) ConfigLoad("cfg2000fr_binaire_compteur_v3.js");
if (nChoice == 4) ConfigLoad("cfg2000fr_binaire_compteur_auto.js");
if (nChoice == 5) ConfigLoad("cfg2000fr_binaire_8_digits.js");
if (nChoice == 6) ConfigLoad('cfg2000fr_binaire_4_digits.js');

// Les autres cas correspondent à "Annuler", il ne fait rien.
} // Config_Choice

// Création de la boîte de dialogue des choix de fichiers de configuration
Config_Choice_Init(420, 90); // À appeler au départ.  (Position gauche, position droite)   0 => garde la position par défaut.
Config_Choice_AddOne("Choix 1", "Un compteur en base 10 à 4 chiffres. &nbsp;");   // nChoice == 1
Config_Choice_AddOne("Choix 2", "Un compteur binaire à 5 chiffres, à compléter. &nbsp;");
Config_Choice_AddOne("Choix 3", "Un compteur binaire à 5 chiffres, complet. &nbsp;");
Config_Choice_AddOne("Choix 4", "Un compteur binaire à 5 chiffres. &nbsp;<br>Avec comptage automatique");
Config_Choice_AddOne("Choix 5", "8 chiffres binaires");
Config_Choice_AddOne("Choix 6", "4 chiffres binaires"); 
Config_Choice_AddOne("Annuler", "Ne fait rien"); 
Config_Choice_Start(); // À appeler à la fin, pour ouvrir la boîte de dialogue
 
