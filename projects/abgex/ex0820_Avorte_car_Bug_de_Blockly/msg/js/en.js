// ***** English *****

//'use strict';
goog.provide('bgBlockly.Msg.en');
//goog.require('bgBlockly.Msg');

bgBlockly.Msg["TEXT_AFFICHE_TITLE"] = "Display %1";
bgBlockly.Msg["TEXT_AFFICHE_TOOLTIP"] = "Display the text without a linefeed, give a number a string or a variable.";
bgBlockly.Msg["TEXT_AFFICHE_HELPURL"] = "";  // untranslated
bgBlockly.Msg["TEXT_AFFICHELN_TITLE"] = "DisplayLn %1";
bgBlockly.Msg["TEXT_AFFICHELN_TOOLTIP"] = "Display the text with a linefeed, give a number a string or a variable.";
bgBlockly.Msg["TEXT_AFFICHELN_HELPURL"] = "";  // untranslated
bgBlockly.Msg["TEXT_AFFICHERTL_TITLE"] = "DisplayRTL %1";
bgBlockly.Msg["TEXT_AFFICHERTL_TOOLTIP"] = "Display text from right to left,  give a number a string or a variable.";
bgBlockly.Msg["TEXT_AFFICHERTL_HELPURL"] = "";  // untranslated
bgBlockly.Msg["TEXTS_HUE"] = "160";

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
Blockly.Msg["CATEGORY_NAME_LOGIC"] = "Logic";
Blockly.Msg["CATEGORY_NAME_LOOPS"] = "Loops";
Blockly.Msg["CATEGORY_NAME_MATH"] = "Math";
Blockly.Msg["CATEGORY_NAME_TEXT"] = "Text";
Blockly.Msg["CATEGORY_NAME_LISTS"] = "Lists";
Blockly.Msg["CATEGORY_NAME_CARD"] = "Cards";
Blockly.Msg["CATEGORY_NAME_COLOUR"] = "Colour";
Blockly.Msg["CATEGORY_NAME_VARIABLES"] = "Variables";
Blockly.Msg["CATEGORY_NAME_FUNCTIONS"] = "Functions";

if (!gloLanguages['en']) {   

  function bgBlocklyLanguage_en() {
  //===============================
  // Class to translate texts in english
  this.HTML_WIN_TITLE = "ex0820, cards, multilanguages version";
  this.HTML_MAIN_TITLE = "Have a lot of fun...";

  // Main Menu
  this.HTML_FILES = "Files";
  this.HTML_EXECUTE = "Execute";
  this.HTML_VIEW = "View";
  this.HTML_PARAMETERS = "Parameters";
  this.HTML_HELP = "Help";

  // From Files
  this.HTML_LOAD_BLOCKLY_CODE = "Open...";
  this.HTML_SAVE_BLOCKLY_CODE = "Save as...";

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
  this.HTML_SHOW_CODE = "Show the JavaScript code";

  // From Parameters
  this.HTML_PARAMETERS_HIGHLIGHT = " With blocks illumination"
  this.HTML_PARAMETERS_NO_HIGHLIGHT = " Without blocks illumination"

  // From Help 
  this.HTML_HELP2 = "Help...";
  this.HTML_MESSAGE = "Message";
  this.HTML_MAIN_TITLE2 = "Have a lot of fun !!!";
  this.HTML_MESSAGE_READ = "OK, message read";

  // About message
  this.HTML_ABOUT1 = "About this programm";
  this.HTML_ABOUT2 = 
      " &nbsp;This programm has been developped À CONTINUER... a été développé par Bernard Gisin pour tester les possibilités de Blockly &nbsp;<br> "
    + " &nbsp;et pour donner des exemples à des enseignants informaticiens &nbsp;<br>"
    + " &nbsp;qui désirent développer des modules pour des élèves. &nbsp;<br>"
    + " <br>"
    + " &nbsp;À partir de l'ex1000, les développement seront multilangues, &nbsp;<br>"
    + " &nbsp;il n'y aura qu'a taduire certains textes se trouvant dans des fichiesr séparés. &nbsp;<br>"
    + " &nbsp;Ils utiliseront également une librairie, pour permettre de ne pas devoir écrire trop de code. &nbsp;<br>"
    + " &nbsp;À partir de l'ex2000, le développement devraient être assez complet pour être utilisable avec des élèves. &nbsp;<br>"
    + " <br><br>"
    ;
  this.HTML_ABOUT3 = "About...";
  this.HTML_MESSAGE_READ2 = "OK, message read";

  // From the 'Display' window
  this.HTML_DISPLAY = "Display";
  this.HTML_BUTTON_CLEAR = "Clear";

  // From the 'javascript Code' window
  this.HTML_CODE_JAVASCRIPT = "Javascript code";
  this.HTML_EXECUTE_JAVASCRIPT_CODE = "Execute javascript code";

  // Modify the startBlocks texts
  this.XML_SB_VALUE_IS = "The value is :";
  this.XML_SB_VALUE_IS2 = "The value is :";
  } // bgBlocklyLanguage_en

  gloLanguages['en'] = new bgBlocklyLanguage_en(); // Ajoute une propriété à l'objet : 'gloLanguages'
  }

TranslateAllAfterDownload('en');
