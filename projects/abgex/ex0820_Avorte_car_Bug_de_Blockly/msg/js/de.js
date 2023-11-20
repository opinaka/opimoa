// ***** Deutsch *****

//'use strict';
goog.provide('bgBlockly.Msg.de');
//goog.require('bgBlockly.Msg');

// À TRADUIRE...
bgBlockly.Msg["TEXT_AFFICHE_TITLE"] = "Anzeige %1";
bgBlockly.Msg["TEXT_AFFICHE_TOOLTIP"] = "Display the text without a linefeed, give a number a string or a variable.";
bgBlockly.Msg["TEXT_AFFICHE_HELPURL"] = "";  // untranslated
bgBlockly.Msg["TEXT_AFFICHELN_TITLE"] = "AnzeigeLn %1";
bgBlockly.Msg["TEXT_AFFICHELN_TOOLTIP"] = "Display the text with a linefeed, give a number a string or a variable.";
bgBlockly.Msg["TEXT_AFFICHELN_HELPURL"] = "";  // untranslated
bgBlockly.Msg["TEXT_AFFICHERTL_TITLE"] = "AnzeigeRTL %1";
bgBlockly.Msg["TEXT_AFFICHERTL_TOOLTIP"] = "Display text from right to left,  give a number a string or a variable.";
bgBlockly.Msg["TEXT_AFFICHERTL_HELPURL"] = "";  // untranslated
bgBlockly.Msg["TEXTS_HUE"] = "160";

// À TRADUIRE...
bgBlockly.Msg["CARD_MOVEX1X2_TITLE"] = "move card from %1 to %2";
bgBlockly.Msg["CARD_MOVEX1X2_TOOLTIP"] = "move a card from one place to another one.";
bgBlockly.Msg["CARD_MOVEX1X2_HELPURL"] = "";  // untranslated
bgBlockly.Msg["CARD_EXCHANGEX1X2_TITLE"] = "exchange the cards from the places %1 and %2";
bgBlockly.Msg["CARD_EXCHANGEX1X2_TOOLTIP"] = "exchange two cards from their places.";
bgBlockly.Msg["CARD_EXCHANGEX1X2_HELPURL"] = "";  // untranslated
bgBlockly.Msg["CARD_GET_CARD_TITLE"] = "Card from %1";
bgBlockly.Msg["CARD_GET_CARD_TOOLTIP"] = "Read the card value from the given place.";
bgBlockly.Msg["CARD_GET_CARD_HELPURL"] = "";  // untranslated
bgBlockly.Msg["CARD_MIX_CARD_TITLE"] = "Mix %1 cards, acceleration : %2";
bgBlockly.Msg["CARD_MIX_CARD_TOOLTIP"] = "Mix cards. The acceleration = 1 for a normal speed, 2 => two times faster.";
bgBlockly.Msg["CARD_MIX_CARD_HELPURL"] = "";  // untranslated
bgBlockly.Msg["CARD_CARDBACKGROUNDCOLOR_TITLE"] = "Card %1 background color set to %2";
bgBlockly.Msg["CARD_CARDBACKGROUNDCOLOR_TOOLTIP"] = "Change the card background color. #ffffff=white. An empty string '' remove the color.";
bgBlockly.Msg["CARD_CARDBACKGROUNDCOLOR_HELPURL"] = "";  // untranslated
bgBlockly.Msg["CARD_CASEBACKGROUNDCOLOR_TITLE"] = "Change the card background set at %1 to color %2";
bgBlockly.Msg["CARD_CASEBACKGROUNDCOLOR_TOOLTIP"] = "Change the card background color being at the given place. #ff0000=red. An empty string '' remove the color.";
bgBlockly.Msg["CARD_CASEBACKGROUNDCOLOR_HELPURL"] = "";  // untranslated
bgBlockly.Msg["CARDS_HUE"] = "20";

// Messages from Blockly
Blockly.Msg["CATEGORY_NAME_LOGIC"] = "Logik";
Blockly.Msg["CATEGORY_NAME_LOOPS"] = "Loops";
Blockly.Msg["CATEGORY_NAME_MATH"] = "Math";
Blockly.Msg["CATEGORY_NAME_TEXT"] = "Text";
Blockly.Msg["CATEGORY_NAME_LISTS"] = "Liste";
Blockly.Msg["CATEGORY_NAME_CARD"] = "Karten";
Blockly.Msg["CATEGORY_NAME_COLOUR"] = "Farben";
Blockly.Msg["CATEGORY_NAME_VARIABLES"] = "Variables";
Blockly.Msg["CATEGORY_NAME_FUNCTIONS"] = "Functions";

if (!gloLanguages['en']) {   

  function bgBlocklyLanguage_de() {
  //===============================
  // Class um Texte in deutsch zu übersetzen
  this.HTML_WIN_TITLE = "ex0820, DEUTSCHE VERSION in den Haupt Title";
  this.HTML_MAIN_TITLE = "Habt viel Spass...";

  // Main menu
  this.HTML_FILES = "Daten";
  this.HTML_EXECUTE = "Run";
  this.HTML_VIEW = "Sehen";
  this.HTML_PARAMETERS = "Parameters";
  this.HTML_HELP = "Hilfe";

  // From Files
  this.HTML_LOAD_BLOCKLY_CODE = "Laden...";
  this.HTML_SAVE_BLOCKLY_CODE = "Speichern...";

  // From Execute
  this.HTML_EXECUTE_SLOW1  = "Execute slowly";
  this.HTML_EXECUTE_SLOW2  = "Execute faster";
  this.HTML_EXECUTE_SLOW3  = "Execute without animation";
  this.HTML_EXECUTE_SLOW4  = "Execute without animation, with 'exec'";
  this.HTML_EXECUTE_PAUSE  = "Pause execution";
  this.HTML_EXECUTE_STOP   = "Stop execution";
  this.HTML_EXECUTE_FASTER = "Faster";
  this.HTML_EXECUTE_SLOWER = "Slower";

  // From View
  this.HTML_SHOW_CODE = "Javascript Code sehen";

  // From Parameters
  this.HTML_PARAMETERS_HIGHLIGHT = " With blocks illumination"
  this.HTML_PARAMETERS_NO_HIGHLIGHT = " Without blocks illumination"

  // From HRLP
  this.HTML_HELP2 = "Hilfe...";
  this.HTML_MESSAGE = "Mitteilung";
  this.HTML_MAIN_TITLE2 = "Habt viel Spass !!!";
  this.HTML_MESSAGE_READ = "OK, gelesen";

  // About message
  this.HTML_ABOUT1 = "(((About)))...";
  this.HTML_ABOUT2 = 
      "TO BE TRANSLATED in German<br>"
    + " &nbsp;This programm has been developped À CONTINUER... a été développé par Bernard Gisin pour tester les possibilités de Blockly &nbsp;<br> "
    + " &nbsp;et pour donner des exemples à des enseignants informaticiens &nbsp;<br>"
    + " &nbsp;qui désirent développer des modules pour des élèves. &nbsp;<br>"
    + " <br>"
    + " &nbsp;À partir de l'ex1000, les développement seront multilangues, &nbsp;<br>"
    + " &nbsp;il n'y aura qu'a taduire certains textes se trouvant dans des fichiesr séparés. &nbsp;<br>"
    + " &nbsp;Ils utiliseront également une librairie, pour permettre de ne pas devoir écrire trop de code. &nbsp;<br>"
    + " &nbsp;À partir de l'ex2000, le développement devraient être assez complet pour être utilisable avec des élèves. &nbsp;<br>"
    + " <br><br>"
    ;
  this.HTML_ABOUT3 = "(((About)))...";
  this.HTML_MESSAGE_READ2 = "OK, gelesen";

  // From the 'Display' window
  this.HTML_DISPLAY = "Anzeige";
  this.HTML_BUTTON_CLEAR = "Löschen";

  // From the 'javascript Code' window
  this.HTML_CODE_JAVASCRIPT = "Javascript code";
  this.HTML_EXECUTE_BLOCKLY_CODE = "Execute";

  // From the 'javascript Code' window
  this.HTML_CODE_JAVASCRIPT = "Javascript Code";
  this.HTML_EXECUTE_JAVASCRIPT_CODE = "Run javascript Code";

  // Modify the startBlocks texts
  this.XML_SB_VALUE_IS = "Der Wert ist :";
  this.XML_SB_VALUE_IS2 = "Der Wert ist :";
  } // bgBlocklyLanguage_de

  gloLanguages['de'] = new bgBlocklyLanguage_de(); // Ajoute une propriété à l'objet : 'gloLanguages'
  }

TranslateAllAfterDownload('de');
