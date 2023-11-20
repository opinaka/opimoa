// 2019.04.22  Messages personnels de Bernard Gisin
// Textes specifiques à cette application.

//'use strict';

goog.provide('bgBlockly.Msg.fr');
goog.require('bgBlockly.Msg');

bgBlockly.Msg['PUZZLE_NOTEBOOK_TOOLTIP'] = "C'est un ordinateur portable";
bgBlockly.Msg['PUZZLE_SCREEN_TOOLTIP'] = "C'est un écran";
bgBlockly.Msg['PUZZLE_KEYBOARD_TOOLTIP'] = "C'est un clavier";
bgBlockly.Msg['PUZZLE_MOUSE_TOOLTIP'] = "C'est une souris";

bgBlockly.Msg['PUZZLE_DESKTOP_TITLE'] = "Desktop %1 %2 %3 Écran %4 Clavier %5 Souris %6";
bgBlockly.Msg['PUZZLE_DESKTOP_TOOLTIP'] = "Représente un Desktop";
bgBlockly.Msg['PUZZLE_DESKTOP_HUE'] = 230;

bgBlockly.Msg['PUZZLE_POWER_PLUG_TITLE'] = "Prise 230 V %1 %2 %3";
bgBlockly.Msg['PUZZLE_POWER_PLUG_TOOLTIP'] = "Prise de courant 230 V";
bgBlockly.Msg['PUZZLE_POWER_PLUG_HUE'] = 230;

bgBlockly.Msg['PUZZLE_COMPUTER_HUE'] = 90;

// Pour traduire en français les textes des contenus "innerHTML" des balises ayant les id : "HTML_..."
//====================================================================================================
gloB.oLanguage.HTML_WIN_TITLE = "ex0930, Composantes d'un d'ordinateur.";
gloB.oLanguage.HTML_MAIN_TITLE = "Composantes d'un d'ordinateur...";
gloB.oLanguage.HTML_MESSAGE = "Composantes d'un d'ordinateur.";
gloB.oLanguage.HTML_MAIN_TITLE2 = "Le but est d'étudier les diverses composantes d'un ordinateur.";

// Pour les messages de branchements, dans des alertes
gloB.oLanguage.TEXT_CONGRATULATION = "Bravo, toutes les connexions sont correctes. ";
gloB.oLanguage.TEXT_CLEANING_TO_DO = "Il reste du chenille qu'il faut ranger. ";
gloB.oLanguage.TEXT_CONNECTION_REMAINING = "Il faut effectuer tout les branchement correctement au desktop avant de le connecter à la prise.";

gloB.oLanguage.TEXT_MOUSE_BURNED1 = "Souris grillée !!!";
gloB.oLanguage.TEXT_MOUSE_BURNED2 = "Souris_grillee";

// Message "À propos de...
gloB.oLanguage.HTML_ABOUT2 = 
      " &nbsp;Ce programme a été développé par Bernard Gisin pour tester les possibilités de Blockly &nbsp;<br>"
    + " &nbsp;et pour donner des exemples à des enseignants informaticiens &nbsp;<br>"
    + " &nbsp;qui désirent développer des modules pour des élèves. &nbsp;<br>"
    + " <br>"
    + " &nbsp;À partir de l'ex1000, les développement seront multilangues, &nbsp;<br>"
    + " &nbsp;il n'y aura qu'a taduire certains textes se trouvant dans des fichiesr séparés. &nbsp;<br>"
    + " &nbsp;Ils utiliseront également une librairie, pour permettre de ne pas devoir écrire trop de code. &nbsp;<br>"
    + " &nbsp;À partir de l'ex2000, le développement devraient être assez complet pour être utilisable avec des élèves. &nbsp;<br>"
    + " <br><br>"
    ;

// Pour traduire en français les textes des attribut "title" des balises ayant les id : "HTML_IMG_..."
//====================================================================================================
gloB.oLanguage2.HTML_IMG_OPEN = "Ouvrire un fichier Blockly...";  // Mis ici comme exemple, existe déjà dans la bibliothèque : "../../bgmsg/js/"
  
