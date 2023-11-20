// cfg2000fr_url.js
// Tout ce qui suit un double slash sont des commentaires, jusqu'à la fin de la ligne.
/*
Les blocs de lignes commençant par 'slash étoile' et terminant par 'étoile slash' sont des commentaires

Ceci est un fichier de configuration, qui permet de choisir une URL (adresse web),
qui contient le fichier de configuration désiré.

Ce fichier de configuration est un programme écrit en javascript.
Ceci rend la configuration très souple et puissante.
Il n'est pas nécessaire de tout comprendre pour prendre un fichier de configuration existant, 
faire quelques modification et obtenir ainsi un nouveau fichier de fonfiguration.

Voir le fichier : bglibrary_frame_card.js  pour des paramètres.  En particulier :
° gloCanvas, qui est de type : OneCanvas()
° glaoFrames, qui est un tableau d'éléments de type : OneFrame()
° Le nombre de cases (cadres, Frames) va de 0 à glnFramesMax
  La case n° 0 est en dehors de la fenêtre. Elle sert à faire disparaître ou apparaître des cartes.
° glaoTexts, qui est un tableau d'éléments de type : OneTextMemory()
  Ses indices vont de 0 à 9 (MAX_TEXT_MEMORY-1).
  Il sert à afficher du texte dans le jeu de cartes.
 */
// ########################################################################################

function Config_Choice(nChoice) {
//===============================
// Chargement du fichier de configuration défini par le nombre nChoice.

if (nChoice == 1) {
  // Exécution des fonctions d'initialisations.
  var strURL = document.getElementById("idDialogBoxConfigText01").value;  
  ConfigLoad(strURL);
  }

// Le cas de nChoice == 2 correspond à "Annuler", il ne fait rien.
} // Config_Choice

// Création de la boîte de dialogue des choix de fichiers de configuration
Config_Choice_Init(420, 90); // À appeler au départ.  (Position gauche, position droite)   0 => garde la position par défaut.

// Ajoute le code HTML de la boîte de dialogue de choix du nombre de lignes et colonnes des cases de cartes.
var strInstr =
'<form onsubmit="Config_Choice_Call(1); return false;">'
+"\n<div style='border:solid black 1px;'>"
+"\n  <button type='button' style='font-size:80%; display:inline-block;'"
+"\n          onclick='Config_Choice_Call(1);'>"
+"\n    Charger"
+"\n  </button>"
+"\n  <div style='display:inline-block; vertical-align:middle;'>"
+"\n    Configuration définie dans une URL (adresse Web)<br>"
+"\n    <br>"
+"\n    URL = <input type='text' id='idDialogBoxConfigText01' size='60' value='http://www.juggling.ch/gisin/program/blockly/abgex/ex2000/cfg2000fr_base_4x4.js' autofocus><br>"
+"\n    <br>"
+"\n    Changer l'adresse Web, pour charger un fichier de configuration personnel. &nbsp;<br>"
+"\n  </div>"
+"\n</div>"
+"\n"
+"\n<div style='border:solid black 1px;'>"
+"\n  <button type='button' style='font-size:80%; display:inline-block;'"
+"\n          onclick='Config_Choice_Call(2);'>"
+"\n    Annuler"
+"\n  </button>"
+"\n  <div style='display:inline-block; vertical-align:middle;'>"
+"\n    Ne fait rien.<br>"
+"\n  </div>"
+"\n</div>"
+'\n  <input type="submit" value="Submit URL" style="display:none;">'
+"\n</form>"
;

//alert(strInstr);

document.getElementById('idDialogBoxConfigChoices').innerHTML = strInstr;

glnConfigCount = 2; // Un bouton de choix de config et un bouton d'annulation.

Config_Choice_Start(); // À appeler à la fin, pour ouvrir la boîte de dialogue
