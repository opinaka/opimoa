// cfg2000fr_evenements_choice.js
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
Montre des possibilités de gestion de clics sur des cartes.
 */
// ########################################################################################

function Config_Choice(nChoice) {
//===============================
// Chargement du fichier de configuration défini par le nombre nChoice.

if (nChoice == 1) ConfigLoad("cfg2000fr_evenements_v1.js");
if (nChoice == 2) ConfigLoad("cfg2000fr_evenements_v2.js");
if (nChoice == 3) ConfigLoad('cfg2000fr_evenements_v3.js');

// Le cas de nChoice == 4 correspond à "Annuler", il ne fait rien.
} // Config_Choice

// Création de la boîte de dialogue des choix de fichiers de configuration
Config_Choice_Init(420, 90); // À appeler au départ.  (Position gauche, position droite)   0 => garde la position par défaut.
Config_Choice_AddOne("Choix 1", "Exemple de gestion <b>d'événements</b> &nbsp;<br>");  // nChoice == 1
Config_Choice_AddOne("Choix 2", "Gestion d'événement.<br>Attrappe l'As de pique. &nbsp;");  // nChoice == 2
//Config_Choice_AddOne("Choix 3", "<b>Vide</b><br>Aucun code au départ. &nbsp;");  // nChoice == 3
Config_Choice_AddOne("Annuler", "Ne fait rien");  // nChoice == 4
Config_Choice_Start(); // À appeler à la fin, pour ouvrir la boîte de dialogue
 
