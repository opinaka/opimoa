// ***** Deutsch *****
// Texts from the library of Bernard Gisin

//'use strict';
goog.provide('bgBlockly.Msg.de');
goog.require('bgBlockly.Msg');
// TO BE TRANSLATED
bgBlockly.Msg["TEXT_AFFICHE_TITLE"] = "Anzeige %1";
bgBlockly.Msg["TEXT_AFFICHE_TOOLTIP"] = "Display the text without a linefeed, give a number a string or a variable.";
bgBlockly.Msg["TEXT_AFFICHE_HELPURL"] = "";  // untranslated
bgBlockly.Msg["TEXT_AFFICHELN_TITLE"] = "AnzeigeLn %1";
bgBlockly.Msg["TEXT_AFFICHELN_TOOLTIP"] = "Display the text with a linefeed, give a number a string or a variable.";
bgBlockly.Msg["TEXT_AFFICHELN_HELPURL"] = "";  // untranslated
bgBlockly.Msg["TEXT_AFFICHERTL_TITLE"] = "AnzeigeRTL %1";
bgBlockly.Msg["TEXT_AFFICHERTL_TOOLTIP"] = "Display text from right to left,  give a number a string or a variable.";
bgBlockly.Msg["TEXT_AFFICHERTL_HELPURL"] = "";  // untranslated
bgBlockly.Msg["TEXT_AFFICHE_EFFACE_TITLE"] = "Display loschen";
bgBlockly.Msg["TEXT_AFFICHE_EFFACE_TOOLTIP"] = "Allow to clear the Display";
bgBlockly.Msg["TEXT_AFFICHE_EFFACE_HELPURL"] = "";  // untranslated
bgBlockly.Msg["TEXT_HUE"] = "160";
bgBlockly.Msg["TEXTS_HUE"] = "160";

bgBlockly.Msg['TEXT_COMMENT_TITLE'] = "// %1";
bgBlockly.Msg['TEXT_COMMENT_TOOLTIP'] = "Ein Kommentar";
bgBlockly.Msg['TEXT_COMMENT_COLOR'] = "#FFFF80";

bgBlockly.Msg['TEXT_PAUSE_TITLE'] = "Pause %1 %2";
bgBlockly.Msg['TEXT_PAUSE_SPEED_NONE'] = "[s]. Then speed : unchanged";
bgBlockly.Msg['TEXT_PAUSE_SPEED_SLOW'] = "[s]. Then speed : slow";
bgBlockly.Msg['TEXT_PAUSE_SPEED_MEDIUM'] = "[s]. Then speed : medium";
bgBlockly.Msg['TEXT_PAUSE_SPEED_FAST'] = "[s]. Then speed : fast";
bgBlockly.Msg['TEXT_PAUSE_TOOLTIP'] = "Pause of ... secondes then continue at the indicated speed.";
bgBlockly.Msg['TEXT_PAUSE_HELPURL'] = "";
bgBlockly.Msg['TEXT_PAUSE_COLOR'] = "#808000";

bgBlockly.Msg['VARIABLE_SPY_TITLE'] = "Spy and wait %1 [s]";
bgBlockly.Msg['VARIABLE_SPY_TOOLTIP'] = "Display in a window all  variables and their values.";
bgBlockly.Msg['VARIABLE_SPY_HELPURL'] = "";
bgBlockly.Msg['VARIABLE_SPY_HUE'] = "20";

bgBlockly.Msg["TEXT_PARSE_NUMBER_TITLE"] = "Convert %1 %2";
bgBlockly.Msg["TEXT_PARSE_NUMBER_INT"] = "into an integer";
bgBlockly.Msg["TEXT_PARSE_NUMBER_FLOAT"] = "into a floating point number";
bgBlockly.Msg["TEXT_PARSE_NUMBER_TOOLTIP"] = "Convert a string into a number.";
bgBlockly.Msg["TEXT_PARSE_NUMBER_HELPURL"] = "";

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
bgBlockly.Msg["CARD_FLIP_TITLE"] = "Return the card from %1";
bgBlockly.Msg["CARD_FLIP_TOOLTIP"] = "Return the card being at the given position.";
bgBlockly.Msg["CARD_FLIP_HELPURL"] = "";  // untranslated
bgBlockly.Msg["CARDS_HUE"] = "20";

bgBlockly.Msg["CARD_EXIST_TEST_TITLE"] = "Test the existance of the image %1";
bgBlockly.Msg["CARD_EXIST_TEST_TOOLTIP"] = "Call then the resonse function to get the answer.";
bgBlockly.Msg["CARD_EXIST_TEST_HELPURL"] = "";

bgBlockly.Msg["CARD_EXIST_RESPONSE_TITLE"] = "Reponse to the last existence test";
bgBlockly.Msg["CARD_EXIST_RESPONSE_TOOLTIP"] = "Call before the 'Test the existence of the image'. 1=oui, 0=non, -1=unknown";
bgBlockly.Msg["CARD_EXIST_RESPONSE_HELPURL"] = "";

bgBlockly.Msg["CARD_ADD_ONE_CARD_TITLE"] = "Add the card %1 with back %2 at frame %3";
bgBlockly.Msg["CARD_ADD_ONE_CARD_TOOLTIP"] = "Add the give card with the given back into the given frame.";
bgBlockly.Msg["CARD_ADD_ONE_CARD_HELPURL"] = "";

bgBlockly.Msg["CARD_REMOVE_ONE_CARD_TITLE"] = "Delete card %1";
bgBlockly.Msg["CARD_REMOVE_ONE_CARD_TOOLTIP"] = "Delete the give card.";
bgBlockly.Msg["CARD_REMOVE_ONE_CARD_HELPURL"] = "";

bgBlockly.Msg["CARD_SET_SHIFT_TITLE"] = "Superposed cards shift = %1";
bgBlockly.Msg["CARD_SET_SHIFT_TOOLTIP"] = "Allow to define the shift of the superposed cards. 0=none, 10=standard.";
bgBlockly.Msg["CARD_SET_SHIFT_HELPURL"] = "";

bgBlockly.Msg["CARD_SOURCE_DEFINE_TITLE"] = "Images source = %1\nImages extension = %2";
bgBlockly.Msg["CARD_SOURCE_DEFINE_TOOLTIP"] = "Define the image source ('../images/Carte.' default) and image extension ('.png' default)";
bgBlockly.Msg["CARD_SOURCE_DEFINE_HELPURL"] = "";

bgBlockly.Msg["CARD_BACK_DEFINE_TITLE"] = "Set the back %1 to the card from the frame %2";
bgBlockly.Msg["CARD_BACK_DEFINE_TOOLTIP"] = "Define a new back image of the given frame. \nWill only be visible when the card will be flipped.";
bgBlockly.Msg["CARD_BACK_DEFINE_HELPURL"] = "";

bgBlockly.Msg["CARD_LINK_FUNC_CARD_TITLE"] = "If click on card from frame %1 \nexecute the function %2";
bgBlockly.Msg["CARD_LINK_FUNC_CARD_TOOLTIP"] = "Indicate to execute the given function, with the given parameter (which can be empty), if the card is clicked.";
bgBlockly.Msg["CARD_LINK_FUNC_CARD_HELPURL"] = "";

bgBlockly.Msg["CARD_GET_CARD_PARAM_TITLE"] = "Get the card parameter from frame %1";
bgBlockly.Msg["CARD_GET_CARD_PARAM_TOOLTIP"] = "Get the parameter of the desired card as a string. \nTo have a number the string should be converted.";
bgBlockly.Msg["CARD_GET_CARD_PARAM_HELPURL"] = "";

bgBlockly.Msg["CARD_SET_CARD_PARAM_TITLE"] = "Set the parameter of the card from the frame %1 to %2";
bgBlockly.Msg["CARD_SET_CARD_PARAM_TOOLTIP"] = "Set the parameter of the given card.";
bgBlockly.Msg["CARD_SET_CARD_PARAM_HELPURL"] = "";

bgBlockly.Msg["CARD_GET_CLICK_COUNT_TITLE"] = "Get clicks count from %1";
bgBlockly.Msg["CARD_GET_CLICK_COUNT_TOOLTIP"] = "Get the number of clicks done on the card from the given frame.";
bgBlockly.Msg["CARD_GET_CLICK_COUNT_HELPURL"] = "";

bgBlockly.Msg["CARD_RESET_CLICK_COUNT_TITLE"] = "Reset the clicks count from %1";
bgBlockly.Msg["CARD_RESET_CLICK_COUNT_TOOLTIP"] = "Set to 0 the number of clicks on the card from the given frame..";
bgBlockly.Msg["CARD_RESET_CLICK_COUNT_HELPURL"] = "";

bgBlockly.Msg["CARD_TEXT_WRITE_TITLE"] = "Text %1 At X = %2 Y = %3 Number %4";
bgBlockly.Msg["CARD_TEXT_WRITE_TOOLTIP"] = "write the given text at the given position, linked to the given number. If the text is empty, clear the text linked to this number.\nNumber between 0 and 9.";
bgBlockly.Msg["CARD_TEXT_WRITE_HELPURL"] = "";

bgBlockly.Msg["CARD_TEXT_WRITE_FONT_TITLE"] = "Size %1 Font %2 Color %3 Number %4";
bgBlockly.Msg["CARD_TEXT_WRITE_FONT_TOOLTIP"] = "Define the size, the font and the color of the text linked to the giben number. Size in units given by the frame sizes.\nNumber between 0 and 9.";
bgBlockly.Msg["CARD_TEXT_WRITE_FONT_HELPURL"] = "";

bgBlockly.Msg["CARD_TEXT_WRITE_FONT_FREESANS"] = "FreeSans";
bgBlockly.Msg["CARD_TEXT_WRITE_FONT_FREESERIF"] = "FreeSerif";
bgBlockly.Msg["CARD_TEXT_WRITE_FONT_FREEMONO"] = "FreeMono";
bgBlockly.Msg["CARD_TEXT_WRITE_FONT_OPENSYMBOL"] = "OpenSymbol";
bgBlockly.Msg["CARD_TEXT_WRITE_FONT_ARIAL"] = "Arial";
bgBlockly.Msg["CARD_TEXT_WRITE_FONT_TIMESNEWROMAN"] = "Times New Roman";
bgBlockly.Msg["CARD_TEXT_WRITE_FONT_COURIERNEW"] = "Courier New";
bgBlockly.Msg["CARD_TEXT_WRITE_FONT_SYMBOL"] = "Symbol";
bgBlockly.Msg["CARD_TEXT_WRITE_FONT_ARIALBLACK"] = "Arial Black";

bgBlockly.Msg["CARD_TEXT_WRITE_COLOR_BLACK"] = "Black";
bgBlockly.Msg["CARD_TEXT_WRITE_COLOR_BLUE"] = "Blue";
bgBlockly.Msg["CARD_TEXT_WRITE_COLOR_GREEN"] = "Green";
bgBlockly.Msg["CARD_TEXT_WRITE_COLOR_RED"] = "Red";
bgBlockly.Msg["CARD_TEXT_WRITE_COLOR_CYAN"] = "Cyan";
bgBlockly.Msg["CARD_TEXT_WRITE_COLOR_MAGENTA"] = "Magenta";
bgBlockly.Msg["CARD_TEXT_WRITE_COLOR_YELLOW"] = "Yellow";
bgBlockly.Msg["CARD_TEXT_WRITE_COLOR_BROWN"] = "Braun";
bgBlockly.Msg["CARD_TEXT_WRITE_COLOR_WHITE"] = "White";
bgBlockly.Msg["CARD_TEXT_WRITE_COLOR_GRAY"] = "Gray";

bgBlockly.Msg["CARD_REMOVE_ALL_TITLE"] = "Eliminate all cards, speed = %1";
bgBlockly.Msg["CARD_REMOVE_ALL_TOOLTIP"] = "Eliminate all cards from the play window.";
bgBlockly.Msg["CARD_REMOVE_ALL_HELPURL"] = "";

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

  function bgBlocklyLanguage_de() {
  //===============================
  // Class un Texte in deutsch zu übersetzen, die in "innerHTML" tags sich befinden, mit den id : "HTML_..."
//  this.HTML_WIN_TITLE = "Text in the local messages : /msg/js/...";
//  this.HTML_MAIN_TITLE = "Text in the local messages : /msg/js/...";

  // Main menu
  this.HTML_FILES = "Daten";
  this.HTML_EXECUTE = "Run";
  this.HTML_VIEW = "Sehen";
  this.HTML_PARAMETERS = "Parameters";
  this.HTML_WINDOWS = "Windows";
  this.HTML_HELP = "Hilfe";

  // From Files
  this.HTML_LOAD_BLOCKLY_CODE = "Laden...";
  this.HTML_SAVE_BLOCKLY_CODE = "Speichern...";

  // From Execute
  this.HTML_EXECUTE_SLOW1  = "Execute slowly";
  this.HTML_EXECUTE_SLOW2  = "Execute faster";
  this.HTML_EXECUTE_SLOW3  = "Execute without animation";
  this.HTML_EXECUTE_SLOW4  = "Execute fast without animation";
  this.HTML_EXECUTE_SLOW5  = "Execute without animation, with 'exec'";
  this.HTML_EXECUTE_PAUSE  = "Pause execution";
  this.HTML_EXECUTE_STOP   = "Stop execution";
  this.HTML_EXECUTE_FASTER = "Faster";
  this.HTML_EXECUTE_SLOWER = "Slower";

  // From View
  this.HTML_SHOW_CODE = "Javascript Code sehen";

  // From Parameters
  this.HTML_PARAMETERS_HIGHLIGHT = " With blocks illumination"
  this.HTML_PARAMETERS_NO_HIGHLIGHT = " Without blocks illumination"
  this.HTML_PARAMETERS_STEP_BY_STEP_SLOW = " Step by step slow"
  this.HTML_PARAMETERS_SEPARATION1 = "_______________________________"
  this.HTML_PARAMETERS_STEP_BY_STEP_MOVE = " Step by step for mouvements"
  this.HTML_PARAMETERS_SEPARATION2 = "_______________________________"
  this.HTML_PARAMETERS_SUPERPOSE_ON  = " Cards supperposition is possible"
  this.HTML_PARAMETERS_SUPERPOSE_OFF = " Cards supperposition is not accepted"

  // From Windows
  this.HTML_WINDOWS_DISPLAY = "Display"
  this.HTML_WINDOWS_CODE_BLOCKLY = "Blockly code"
  this.HTML_WINDOWS_CODE_JAVASCRIPT = "Javascript code"
  this.HTML_WINDOWS_CODE_PYTHON = "Python code"
  this.HTML_WINDOWS_CODE_LUA = "Lua code"
  this.HTML_WINDOWS_VARIABLES = "Variables values"

  // From Help
  this.HTML_HELP2 = "Hilfe...";
  this.HTML_MESSAGE = "Mitteilung";
  this.HTML_MAIN_TITLE2 = "Habt viel Spass !!!";
  this.HTML_MESSAGE_READ = "OK, gelesen";

  // About message
  this.HTML_ABOUT1 = "(((About)))...";
//this.HTML_ABOUT2 = "Text in the local messages : /msg/js/...";
  this.HTML_ABOUT3 = "(((About)))...";
  this.HTML_MESSAGE_READ2 = "OK, gelesen";

  // From the 'Display' window
  this.HTML_DISPLAY = "Anzeige";
  this.HTML_BUTTON_CLEAR = "Löschen";

  // From the 'javascript Code' window
  this.HTML_CODE_JAVASCRIPT = "Javascript Code";
  this.HTML_EXECUTE_JAVASCRIPT_CODE = "Execute";
  this.HTML_CODE_JAVASCRIPT_FROM_BLOCKS = " Javascript code from blocks";

  // From the 'python Code' window
  this.HTML_CODE_PYTHON = "Python code";
  this.HTML_EXECUTE_PYTHON_CODE = "Execute";

  // From the 'lua Code' window
  this.HTML_CODE_LUA = "Lua code";
  this.HTML_EXECUTE_LUA_CODE = "Execute";

  // From the 'spy' window
  this.HTML_VARIABLE_SPY = "Variables values";

  // Modify the startBlocks texts
  this.XML_SB_VALUE_IS = "Der Wert ist :";
  this.XML_SB_VALUE_IS2 = "Der Wert ist :";

  // Modify the toolbox texts
  this.XML_TB_COMMENT = "Ein Komentar schreiben...";
  
  } // bgBlocklyLanguage_de

  function bgBlocklyLanguage2_de() {
  //===============================
  // Class un Texte in deutsch zu übersetzen, die in "title" tags sich befinden, mit den id : "HTML_..."
  this.HTML_IMG_OPEN = "Ein Blockly file laden...";
  this.HTML_IMG_SAVE = "Ein Blockly file speichern...";
  this.HTML_IMG_RUN = "(De)Lance le programme défini par les blocs dans l'espace de travail.";
  this.HTML_IMG_RUNRUN = "(De)Lance le programme, exécution plus rapide.";
  this.HTML_IMG_RUNRUNRUN = "(De)Lance le programme, exécution à haute vitesse, sans animation.";
  this.HTML_IMG_ONESTEP = "(De)Exécute un pas du code.";
  this.HTML_IMG_PAUSE = "(De)Met l'exécution du programme en mode pause.";
  this.HTML_IMG_STOP = "(De)Arrête l'exécution du programme.";
  this.HTML_IMG_FASTER = "(De)Avance plus vite.";
  this.HTML_IMG_SLOWER = "(De)Avance moins vite.";
  this.HTML_IMG_HELP = "(De)Aide.";
  this.HTML_IMG_CODEJAVASCRIPT = "(De)Montre le code javascript.";
  } // bgBlocklyLanguage2_de

gloB.oLanguage  = new bgBlocklyLanguage_de();  // Défine an objet containing the translation of the "innerHTML"
gloB.oLanguage2 = new bgBlocklyLanguage2_de(); // Défine an objet containing the translation of the "title"

