// ***** English *****
// Texts specific to this application.

//'use strict';

goog.provide('bgBlockly.Msg.en');
goog.require('bgBlockly.Msg');

bgBlockly.Msg["LOGO_GOTOXY_TITLE"] = "goto (%1 ; %2)";
bgBlockly.Msg["LOGO_GOTOXY_TOOLTIP"] = "Move to the given coordinates.";
bgBlockly.Msg["LOGO_GOTOXY_HELPURL"] = "";  // untranslated

bgBlockly.Msg["LOGO_FORWARD_TITLE"] = "forward %1";
bgBlockly.Msg["LOGO_FORWARD_TOOLTIP"] = "Forward the given number of pixels.";
bgBlockly.Msg["LOGO_FORWARD_HELPURL"] = "";  // untranslated

bgBlockly.Msg["LOGO_BACKWARD_TITLE"] = "back %1";
bgBlockly.Msg["LOGO_BACKWARD_TOOLTIP"] = "Backward the given number of pixels.";
bgBlockly.Msg["LOGO_BACKWARD_HELPURL"] = "";  // untranslated

bgBlockly.Msg["LOGO_FORWARD_BACKWARD_TITLE"] = "%1 de %2";
bgBlockly.Msg["LOGO_FORWARD_BACKWARD_DIRECTION_FORWARD"] = "forward";
bgBlockly.Msg["LOGO_FORWARD_BACKWARD_DIRECTION_BACKWARD"] = "backward";
bgBlockly.Msg["LOGO_FORWARD_BACKWARD_TOOLTIP"] = "forward or backward the given number of pixels.";
bgBlockly.Msg["LOGO_FORWARD_BACKWARD_HELPURL"] = "";  // untranslated

bgBlockly.Msg["LOGO_LEFT_TITLE"] = "turn left %1";
bgBlockly.Msg["LOGO_LEFT_TOOLTIP"] = "Turn left the given angle in degres.";
bgBlockly.Msg["LOGO_LEFT_HELPURL"] = "";  // untranslated

bgBlockly.Msg["LOGO_RIGHT_TITLE"] = "turn right %1";
bgBlockly.Msg["LOGO_RIGHT_TOOLTIP"] = "Turn right the given angle in degres.";
bgBlockly.Msg["LOGO_RIGHT_HELPURL"] = "";  // untranslated

bgBlockly.Msg["LOGO_LEFT_RIGHT_TITLE"] = "%1 %2";
bgBlockly.Msg["LOGO_LEFT_RIGHT_SENS_LEFT"] = "turn left ";
bgBlockly.Msg["LOGO_LEFT_RIGHT_SENS_RIGHT"] = "turn right";
bgBlockly.Msg["LOGO_LEFT_RIGHT_TOOLTIP"] = "Turn left or right the given angle in degres.";
bgBlockly.Msg["LOGO_LEFT_RIGHT_HELPURL"] = "";  // untranslated

bgBlockly.Msg["LOGO_SET_DIRECTION_TITLE"] = "direction set at %1";
bgBlockly.Msg["LOGO_SET_DIRECTION_TOOLTIP"] = "Define the displacement direction of the image.";
bgBlockly.Msg["LOGO_SET_DIRECTION_HELPURL"] = "";  // untranslated

bgBlockly.Msg["LOGO_GET_COLOR_TITLE"] = "read the color";
bgBlockly.Msg["LOGO_GET_COLOR_TOOLTIP"] = "Read the color being at the center of the image.";
bgBlockly.Msg["LOGO_GET_COLOR_HELPURL"] = "";  // untranslated

bgBlockly.Msg["LOGO_GET_POSXY_POSX"] = "Pos X";
bgBlockly.Msg["LOGO_GET_POSXY_POSY"] = "Pos Y";
bgBlockly.Msg["LOGO_GET_POSXY_TOOLTIP"] = "Read the coordinate X or Y of the image position.";
bgBlockly.Msg["LOGO_GET_POSXY_HELPURL"] = "";  // untranslated
bgBlockly.Msg["LOGOS_HUE"] = "20";

// Messages de Blockly
Blockly.Msg["CATEGORY_NAME_LOGO"] = "Move";

// To translate in english the texts contained in the "innerHTML" tags having the id : "HTML_..."
// ==============================================================================================
gloB.oLanguage.HTML_WIN_TITLE = "ex0940, Labyrinthe";
gloB.oLanguage.HTML_MAIN_TITLE = "Solve this labyrinthe...";
gloB.oLanguage.HTML_BEEN_USED = "block(s) has been used.";

// To translate in english the texts in the "title" attribute of the tags having the id : "HTML_IGM_..."
// =====================================================================================================
gloB.oLanguage2.HTML_IMG_OPEN = "Open a Blockly file..."; // Put here as an example, exist already in the library : "../../bgmsg/js/"

// Texts of the dialog boxes
//==========================
gloB.oDialog.DialogTitle = [
   "Message"  // Message d'aide
  ,"About this program" // Message About
  ,""
  ];
gloB.oDialog.DialogMessage = [ 
   "Solve this labyrinthe..."  // Message d'aide
  , // Message About
      " &nbsp;This programm has been developped À CONTINUER... a été développé par Bernard Gisin pour tester les possibilités de Blockly &nbsp;<br> "
    + " &nbsp;et pour donner des exemples à des enseignants informaticiens &nbsp;<br>"
    + " &nbsp;qui désirent développer des modules pour des élèves. &nbsp;<br>"
    + " <br>"
    + " &nbsp;À partir de l'ex1000, les développement seront multilangues, &nbsp;<br>"
    + " &nbsp;il n'y aura qu'a taduire certains textes se trouvant dans des fichiesr séparés. &nbsp;<br>"
    + " &nbsp;Ils utiliseront également une librairie, pour permettre de ne pas devoir écrire trop de code. &nbsp;<br>"
    + " &nbsp;À partir de l'ex2000, le développement devraient être assez complet pour être utilisable avec des élèves."
  ,""
  ];
gloB.oDialog.DialogTitle = [
   "Message"  // Message d'aide
  ,"About this program" // Message About
  ,""
  ];
gloB.oDialog.DialogOK = [
   " OK, message red "
  ," OK "
  ," OK "
  ];
gloB.oDialog.DialogMusic = [
   ""  // Pas de musique
  ,""
  ,""
  ];
