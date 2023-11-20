// ***** Français *****
// Textes specifiques à cette application.

//'use strict';

goog.provide('bgBlockly.Msg.fr');
goog.require('bgBlockly.Msg');

bgBlockly.Msg["LOGO_GOTOXY_TITLE"] = "vas en (%1 ; %2)";
bgBlockly.Msg["LOGO_GOTOXY_TOOLTIP"] = "Se déplace à la position donnée.";
bgBlockly.Msg["LOGO_GOTOXY_HELPURL"] = "";  // untranslated

bgBlockly.Msg["LOGO_FORWARD_TITLE"] = "avance de %1";
bgBlockly.Msg["LOGO_FORWARD_TOOLTIP"] = "Avance du nombre de pixels donnés.";
bgBlockly.Msg["LOGO_FORWARD_HELPURL"] = "";  // untranslated

bgBlockly.Msg["LOGO_BACKWARD_TITLE"] = "recule de %1";
bgBlockly.Msg["LOGO_BACKWARD_TOOLTIP"] = "Recule du nombre de pixels donnés.";
bgBlockly.Msg["LOGO_BACKWARD_HELPURL"] = "";  // untranslated

bgBlockly.Msg["LOGO_FORWARD_BACKWARD_TITLE"] = "%1 de %2";
bgBlockly.Msg["LOGO_FORWARD_BACKWARD_DIRECTION_FORWARD"] = "avance";
bgBlockly.Msg["LOGO_FORWARD_BACKWARD_DIRECTION_BACKWARD"] = "recule";
bgBlockly.Msg["LOGO_FORWARD_BACKWARD_TOOLTIP"] = "Avance ou recule du nombre de pixels donnés.";
bgBlockly.Msg["LOGO_FORWARD_BACKWARD_HELPURL"] = "";  // untranslated

bgBlockly.Msg["LOGO_LEFT_TITLE"] = "tourne à gauche de %1";
bgBlockly.Msg["LOGO_LEFT_TOOLTIP"] = "Tourne à gauche du nombre de degrés donnés.";
bgBlockly.Msg["LOGO_LEFT_HELPURL"] = "";  // untranslated

bgBlockly.Msg["LOGO_RIGHT_TITLE"] = "tourne à droite de %1";
bgBlockly.Msg["LOGO_RIGHT_TOOLTIP"] = "Tourne à droite du nombre de degrés donnés.";
bgBlockly.Msg["LOGO_RIGHT_HELPURL"] = "";  // untranslated

bgBlockly.Msg["LOGO_LEFT_RIGHT_TITLE"] = "%1 %2";
bgBlockly.Msg["LOGO_LEFT_RIGHT_SENS_LEFT"] = "tourne à gauche de";
bgBlockly.Msg["LOGO_LEFT_RIGHT_SENS_RIGHT"] = "tourne à droite de";
bgBlockly.Msg["LOGO_LEFT_RIGHT_TOOLTIP"] = "Tourne à gauche ou à droite du nombre de degrés donnés.";
bgBlockly.Msg["LOGO_LEFT_RIGHT_HELPURL"] = "";  // untranslated

bgBlockly.Msg["LOGO_SET_DIRECTION_TITLE"] = "direction mis à %1";
bgBlockly.Msg["LOGO_SET_DIRECTION_TOOLTIP"] = "Définit la direction de déplacement de l'image.";
bgBlockly.Msg["LOGO_SET_DIRECTION_HELPURL"] = "";  // untranslated

bgBlockly.Msg["LOGO_GET_COLOR_TITLE"] = "lit couleur";
bgBlockly.Msg["LOGO_GET_COLOR_TOOLTIP"] = "Lit la couleur se trouvant sous le centre de l'image.";
bgBlockly.Msg["LOGO_GET_COLOR_HELPURL"] = "";  // untranslated

bgBlockly.Msg["LOGO_GET_POSXY_POSX"] = "Pos X";
bgBlockly.Msg["LOGO_GET_POSXY_POSY"] = "Pos Y";
bgBlockly.Msg["LOGO_GET_POSXY_TOOLTIP"] = "Lit la coordonnée X ou Y de la position de l'image.";
bgBlockly.Msg["LOGO_GET_POSXY_HELPURL"] = "";  // untranslated
bgBlockly.Msg["LOGOS_HUE"] = "20";

// Messages de Blockly
Blockly.Msg["CATEGORY_NAME_LOGO"] = "Bouge";

// Pour traduire en français les textes des contenus "innerHTML" des balises ayant les id : "HTML_..."
//====================================================================================================
gloB.oLanguage.HTML_WIN_TITLE = "ex0940, Labyrinthe.";
gloB.oLanguage.HTML_MAIN_TITLE = "Résolvez ce labyrinthe...";
gloB.oLanguage.HTML_BEEN_USED = "bloc(s) ont été utilisés.";

// Pour traduire en français les textes des attribut "title" des balises ayant les id : "HTML_IMG_..."
//====================================================================================================
gloB.oLanguage2.HTML_IMG_OPEN = "Ouvrire un fichier Blockly...";  // Mis ici comme exemple, existe déjà dans la bibliothèque : "../../bgmsg/js/"
  
// Textes des boîtes de dialogues
//===============================
gloB.oDialog.DialogTitle = [
   "Message"  // Message d'aide
  ,"À propos de ce programme" // Message About
  ,""
  ];
gloB.oDialog.DialogMessage = [ 
   "Amusez-vous !!!"  // Message d'aide
  // Message About
  ," &nbsp;Ce programme a été développé par Bernard Gisin pour tester les possibilités de Blockly &nbsp;<br>"
    + " &nbsp;et pour donner des exemples à des enseignants informaticiens &nbsp;<br>"
    + " &nbsp;qui désirent développer des modules pour des élèves. &nbsp;<br>"
    + " <br>"
    + " &nbsp;À partir de l'ex1000, les développement seront multilangues, &nbsp;<br>"
    + " &nbsp;il n'y aura qu'a taduire certains textes se trouvant dans des fichiesr séparés. &nbsp;<br>"
    + " &nbsp;Ils utiliseront également une librairie, pour permettre de ne pas devoir écrire trop de code. &nbsp;<br>"
    + " &nbsp;À partir de l'ex2000, le développement devraient être assez complet pour être utilisable avec des élèves."
  ,""
  ];
gloB.oDialog.DialogOK = [
   " OK, j'ai lu le message. "
  ," OK "
  ," OK "
  ];
gloB.oDialog.DialogMusic = [
   ""  // Pas de musique
  ,""
  ,""
  ];
