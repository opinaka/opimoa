// 2019.01.28  Messages personnels de Bernard Gisin
// Texts de la librairie de Bernard Gisin

//'use strict';
goog.provide('bgBlockly.Msg.fr');
goog.require('bgBlockly.Msg');

bgBlockly.Msg["TEXT_AFFICHE_TITLE"] = "afficher %1";
bgBlockly.Msg["TEXT_AFFICHE_TOOLTIP"] = "Afficher le texte sans retour à la ligne, le nombre ou une autre valeur spécifiée.";
bgBlockly.Msg["TEXT_AFFICHE_HELPURL"] = "https://github.com/google/blockly/wiki/Text#printing-text";  // untranslated
bgBlockly.Msg["TEXT_AFFICHELN_TITLE"] = "afficherLn %1";
bgBlockly.Msg["TEXT_AFFICHELN_TOOLTIP"] = "Afficher le texte avec retour à la ligne, le nombre ou une autre valeur spécifiée.";
bgBlockly.Msg["TEXT_AFFICHELN_HELPURL"] = "https://github.com/google/blockly/wiki/Text#printing-text";  // untranslated
bgBlockly.Msg["TEXT_AFFICHERTL_TITLE"] = "afficherDaG %1";
bgBlockly.Msg["TEXT_AFFICHERTL_TOOLTIP"] = "Afficher le texte de droite à gauche, le nombre ou une autre valeur spécifiée.";
bgBlockly.Msg["TEXT_AFFICHERTL_HELPURL"] = "";  // untranslated
bgBlockly.Msg["TEXT_AFFICHE_EFFACE_TITLE"] = "Efface l'affichage";
bgBlockly.Msg["TEXT_AFFICHE_EFFACE_TOOLTIP"] = "Permet d'efface l'affichage";
bgBlockly.Msg["TEXT_AFFICHE_EFFACE_HELPURL"] = "";  // untranslated
bgBlockly.Msg["TEXT_HUE"] = "160";
bgBlockly.Msg["TEXTS_HUE"] = "160";

bgBlockly.Msg['TEXT_COMMENT_TITLE'] = "// %1";
bgBlockly.Msg['TEXT_COMMENT_TOOLTIP'] = "Un commentaire";
bgBlockly.Msg['TEXT_COMMENT_COLOR'] = "#FFFF80";

bgBlockly.Msg['TEXT_PAUSE_TITLE'] = "Pause de %1 %2";
bgBlockly.Msg['TEXT_PAUSE_SPEED_NONE'] = "[s]. Puis vitesse : inchangée";
bgBlockly.Msg['TEXT_PAUSE_SPEED_SLOW'] = "[s]. Puis vitesse : lente";
bgBlockly.Msg['TEXT_PAUSE_SPEED_MEDIUM'] = "[s]. Puis vitesse : moyenne";
bgBlockly.Msg['TEXT_PAUSE_SPEED_FAST'] = "[s]. Puis vitesse : rapide";
bgBlockly.Msg['TEXT_PAUSE_TOOLTIP'] = "Fait une pause de ... secondes puis continue à la vitesse indiquée.";
bgBlockly.Msg['TEXT_PAUSE_HELPURL'] = "";
bgBlockly.Msg['TEXT_PAUSE_COLOR'] = "#808000";

bgBlockly.Msg["TEXT_PARSE_NUMBER_TITLE"] = "Convertit %1 %2";
bgBlockly.Msg["TEXT_PARSE_NUMBER_INT"] = "en un nombre entier";
bgBlockly.Msg["TEXT_PARSE_NUMBER_FLOAT"] = "en un nombre à virgule";
bgBlockly.Msg["TEXT_PARSE_NUMBER_TOOLTIP"] = "Convertit une chaine de caractères en un nombre.";
bgBlockly.Msg["TEXT_PARSE_NUMBER_HELPURL"] = "";

bgBlockly.Msg['VARIABLE_SPY_TITLE'] = "Espionne et attend %1 [s]";
bgBlockly.Msg['VARIABLE_SPY_TOOLTIP'] = "Affichage dans une fenêtre de la valeur de toutes les variables.";
bgBlockly.Msg['VARIABLE_SPY_HELPURL'] = "";
bgBlockly.Msg['VARIABLE_SPY_HUE'] = "20";

bgBlockly.Msg["CARD_MOVEX1X2_TITLE"] = "déplace la carte de la case %1 à la case %2";
bgBlockly.Msg["CARD_MOVEX1X2_TOOLTIP"] = "déplace la carte d'une case à une autre.";
bgBlockly.Msg["CARD_MOVEX1X2_HELPURL"] = "";  // untranslated
bgBlockly.Msg["CARD_EXCHANGEX1X2_TITLE"] = "échange les cartes des cases %1 et %2";
bgBlockly.Msg["CARD_EXCHANGEX1X2_TOOLTIP"] = "échange deux cartes de leur place.";
bgBlockly.Msg["CARD_EXCHANGEX1X2_HELPURL"] = "";  // untranslated
bgBlockly.Msg["CARD_GET_CARD_TITLE"] = "Carte de la case %1";
bgBlockly.Msg["CARD_GET_CARD_TOOLTIP"] = "Lit la valeur de la carte se trouvant dans la case donnée.";
bgBlockly.Msg["CARD_GET_CARD_HELPURL"] = "";  // untranslated
bgBlockly.Msg["CARD_MIX_CARD_TITLE"] = "Mélange %1 cartes, accélération de %2";
bgBlockly.Msg["CARD_MIX_CARD_TOOLTIP"] = "Mélange des cartes. L'accélération = 1 pour la vitesse normale, 2 => deux fois plus vite.";
bgBlockly.Msg["CARD_MIX_CARD_HELPURL"] = "";  // untranslated
bgBlockly.Msg["CARD_CARDBACKGROUNDCOLOR_TITLE"] = "Couleur du fond de la carte %1 mis à %2";
bgBlockly.Msg["CARD_CARDBACKGROUNDCOLOR_TOOLTIP"] = "Change la couleur du fond de la carte. #ffffff=blanc. Une chaine vide '' enlève la couleur.";
bgBlockly.Msg["CARD_CARDBACKGROUNDCOLOR_HELPURL"] = "";  // untranslated
bgBlockly.Msg["CARD_CASEBACKGROUNDCOLOR_TITLE"] = "Couleur du fond de la carte de la case %1 mis à %2";
bgBlockly.Msg["CARD_CASEBACKGROUNDCOLOR_TOOLTIP"] = "Change la couleur du fond de la carte de la case. #ff0000=rouge. Une chaine vide '' enlève la couleur.";
bgBlockly.Msg["CARD_CASEBACKGROUNDCOLOR_HELPURL"] = "";  // untranslated
bgBlockly.Msg["CARD_FLIP_TITLE"] = "Retourne la carte de la case %1";
bgBlockly.Msg["CARD_FLIP_TOOLTIP"] = "Retourne la carte d'une case donnée.";
bgBlockly.Msg["CARD_FLIP_HELPURL"] = "";  // untranslated
bgBlockly.Msg["CARDS_HUE"] = "20";

bgBlockly.Msg["CARD_EXIST_TEST_TITLE"] = "Teste l'existence de l'image de la carte %1";
bgBlockly.Msg["CARD_EXIST_TEST_TOOLTIP"] = "Appeler la fonction Réponse d'existence ensuite.";
bgBlockly.Msg["CARD_EXIST_TEST_HELPURL"] = "";

bgBlockly.Msg["CARD_EXIST_RESPONSE_TITLE"] = "Réponse au test d'existence d'image de carte";
bgBlockly.Msg["CARD_EXIST_RESPONSE_TOOLTIP"] = "Appeler en premier 'Teste l'existence de l'image de la carte'. 1=oui, 0=non, -1=ne sait pas.";
bgBlockly.Msg["CARD_EXIST_RESPONSE_HELPURL"] = "";

bgBlockly.Msg["CARD_ADD_ONE_CARD_TITLE"] = "Ajoute la carte %1 de dos %2 en case %3";
bgBlockly.Msg["CARD_ADD_ONE_CARD_TOOLTIP"] = "Ajoute la carte de n° donné et de n° de dos donné dans la case donnée.";
bgBlockly.Msg["CARD_ADD_ONE_CARD_HELPURL"] = "";

bgBlockly.Msg["CARD_REMOVE_ONE_CARD_TITLE"] = "Supprime la carte %1";
bgBlockly.Msg["CARD_REMOVE_ONE_CARD_TOOLTIP"] = "Supprime la carte de la case donnée.";
bgBlockly.Msg["CARD_REMOVE_ONE_CARD_HELPURL"] = "";

bgBlockly.Msg["CARD_SET_SHIFT_TITLE"] = "Décalage de carte superposées = %1";
bgBlockly.Msg["CARD_SET_SHIFT_TOOLTIP"] = "Permet de définir quelle est le décalage de cartes superposées. 0=aucun décalage, 10=standard.";
bgBlockly.Msg["CARD_SET_SHIFT_HELPURL"] = "";

bgBlockly.Msg["CARD_SOURCE_DEFINE_TITLE"] = "Source des images = %1\nExtension des images = %2";
bgBlockly.Msg["CARD_SOURCE_DEFINE_TOOLTIP"] = "Définit la source des images ('../images/Carte.' par défaut) et l'extension ('.png' par défaut)";
bgBlockly.Msg["CARD_SOURCE_DEFINE_HELPURL"] = "";

bgBlockly.Msg["CARD_BACK_DEFINE_TITLE"] = "Met le dos %1 à la carte de la case %2";
bgBlockly.Msg["CARD_BACK_DEFINE_TOOLTIP"] = "Définit une nouvelle image du dos de la carte de la case donnée. Ne sera visible que lorsque la carte sera retournée.";
bgBlockly.Msg["CARD_BACK_DEFINE_HELPURL"] = "";

bgBlockly.Msg["CARD_LINK_FUNC_CARD_TITLE"] = "Si click sur la carte de la case %1 \nexécute la fonction %2";
bgBlockly.Msg["CARD_LINK_FUNC_CARD_TOOLTIP"] = "Indique d'exécuter la fonction donnée, avec le paramètre donné (qui peut être vide), si on clique sur la carte de la case donnée.";
bgBlockly.Msg["CARD_LINK_FUNC_CARD_HELPURL"] = "";

bgBlockly.Msg["CARD_GET_CARD_PARAM_TITLE"] = "Lit le paramètre de la carte de la case %1";
bgBlockly.Msg["CARD_GET_CARD_PARAM_TOOLTIP"] = "Lit le paramètre de la carte désirée, sous forme de chaîne de caractères. \nPour avoir un nombre, on peut le convertir.";
bgBlockly.Msg["CARD_GET_CARD_PARAM_HELPURL"] = "";

bgBlockly.Msg["CARD_SET_CARD_PARAM_TITLE"] = "Fixe le paramètre de la carte de la case %1 à %2";
bgBlockly.Msg["CARD_SET_CARD_PARAM_TOOLTIP"] = "Fixe le paramètre de la carte désirée.";
bgBlockly.Msg["CARD_SET_CARD_PARAM_HELPURL"] = "";

bgBlockly.Msg["CARD_GET_CLICK_COUNT_TITLE"] = "Nombre de clicks de %1";
bgBlockly.Msg["CARD_GET_CLICK_COUNT_TOOLTIP"] = "Lit le le nombre de clicks effectués sur la carte de la case donnée.";
bgBlockly.Msg["CARD_GET_CLICK_COUNT_HELPURL"] = "";

bgBlockly.Msg["CARD_RESET_CLICK_COUNT_TITLE"] = "Reset les clicks de %1";
bgBlockly.Msg["CARD_RESET_CLICK_COUNT_TOOLTIP"] = "Met à 0 le nombre de clicks effectués sur la carte de la case donnée.";
bgBlockly.Msg["CARD_RESET_CLICK_COUNT_HELPURL"] = "";

bgBlockly.Msg["CARD_TEXT_WRITE_TITLE"] = "Texte %1 En X = %2 Y = %3 Numéro %4";
bgBlockly.Msg["CARD_TEXT_WRITE_TOOLTIP"] = "Écrit le texte donné en la position donnée, liée au numéro donné. Si le texte est vide, efface le texte associé à ce numéro.\nNuméro entre 0 et 9.";
bgBlockly.Msg["CARD_TEXT_WRITE_HELPURL"] = "";

bgBlockly.Msg["CARD_TEXT_WRITE_FONT_TITLE"] = "Taille %1 Police %2 Couleur %3 Numéro %4";
bgBlockly.Msg["CARD_TEXT_WRITE_FONT_TOOLTIP"] = "Définit la taille, la police et la couleur du texte liée au numéro donné. Taille en unité dépendante des cases.\nNuméro entre 0 et 9.";
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

bgBlockly.Msg["CARD_TEXT_WRITE_COLOR_BLACK"] = "Noire";
bgBlockly.Msg["CARD_TEXT_WRITE_COLOR_BLUE"] = "Bleue";
bgBlockly.Msg["CARD_TEXT_WRITE_COLOR_GREEN"] = "Verte";
bgBlockly.Msg["CARD_TEXT_WRITE_COLOR_RED"] = "Rouge";
bgBlockly.Msg["CARD_TEXT_WRITE_COLOR_CYAN"] = "Cyan";
bgBlockly.Msg["CARD_TEXT_WRITE_COLOR_MAGENTA"] = "Magenta";
bgBlockly.Msg["CARD_TEXT_WRITE_COLOR_YELLOW"] = "Jaune";
bgBlockly.Msg["CARD_TEXT_WRITE_COLOR_BROWN"] = "Brune";
bgBlockly.Msg["CARD_TEXT_WRITE_COLOR_WHITE"] = "Blanche";
bgBlockly.Msg["CARD_TEXT_WRITE_COLOR_GRAY"] = "Grise";

bgBlockly.Msg["CARD_REMOVE_ALL_TITLE"] = "Retire toutes les cartes, vitesse = %1";
bgBlockly.Msg["CARD_REMOVE_ALL_TOOLTIP"] = "Retire toutes les cartes du jeu.";
bgBlockly.Msg["CARD_REMOVE_ALL_HELPURL"] = "";

// Messages de Blockly
Blockly.Msg["CATEGORY_NAME_LOGIC"] = "Logique";
Blockly.Msg["CATEGORY_NAME_LOOPS"] = "Boucles";
Blockly.Msg["CATEGORY_NAME_MATH"] = "Math";
Blockly.Msg["CATEGORY_NAME_TEXT"] = "Texte";
Blockly.Msg["CATEGORY_NAME_LISTS"] = "Listes";
Blockly.Msg["CATEGORY_NAME_CARD"] = "Cartes";
Blockly.Msg["CATEGORY_NAME_COLOUR"] = "Couleur";
Blockly.Msg["CATEGORY_NAME_VARIABLES"] = "Variables";
Blockly.Msg["CATEGORY_NAME_FUNCTIONS"] = "Fonctions";

  function bgBlocklyLanguage_fr() {
  //===============================
  // Classe pour traduire en français les textes des contenus "innerHTML" des balises ayant les id : "HTML_..."
//  this.HTML_WIN_TITLE = "Texte dans les messages locaux : /msg/js/...";
//  this.HTML_MAIN_TITLE = "Texte dans les messages locaux : /msg/js/...";

  // Menu principal
  this.HTML_FILES = "Fichiers";
  this.HTML_EXECUTE = "Exécution";
  this.HTML_VIEW = "Voir";
  this.HTML_PARAMETERS = "Paramètres";
  this.HTML_WINDOWS = "Fenêtres";
  this.HTML_HELP = "Aide";

  // De Fichiers
  this.HTML_LOAD_BLOCKLY_CODE = "Ouvrir...";
  this.HTML_SAVE_BLOCKLY_CODE = "Enregistrer sous...";

  // De Exécution
  this.HTML_EXECUTE_SLOW1  = "Exécution lente";
  this.HTML_EXECUTE_SLOW2  = "Exécution plus rapide";
  this.HTML_EXECUTE_SLOW3  = "Exécution sans animation";
  this.HTML_EXECUTE_SLOW4  = "Exécution rapide sans animation";
  this.HTML_EXECUTE_SLOW5  = "Exécution sans animation, avec 'exec'";
  this.HTML_EXECUTE_PAUSE  = "Met l'exécution en mode pause";
  this.HTML_EXECUTE_STOP   = "Arrête l'exécution";
  this.HTML_EXECUTE_FASTER = "Plus vite";
  this.HTML_EXECUTE_SLOWER = "Moins vite";

  // De Voir
  this.HTML_SHOW_CODE = "Montre le code en JavaScript";

  // De Paramètres
  this.HTML_PARAMETERS_HIGHLIGHT = "Avec illumination des blocs"
  this.HTML_PARAMETERS_NO_HIGHLIGHT = " Sans illumination des blocs"
  this.HTML_PARAMETERS_STEP_BY_STEP_SLOW = " Pas à pas lent"
  this.HTML_PARAMETERS_SEPARATION1 = "_______________________________"
  this.HTML_PARAMETERS_STEP_BY_STEP_MOVE = " Pas à pas des mouvements"
  this.HTML_PARAMETERS_SEPARATION2 = "_______________________________"
  this.HTML_PARAMETERS_SUPERPOSE_ON  = " Superposition possible de cartes"
  this.HTML_PARAMETERS_SUPERPOSE_OFF = " Pas de superposition de cartes"

  // De Fenêtres
  this.HTML_WINDOWS_DISPLAY = "Affichage"
  this.HTML_WINDOWS_CODE_BLOCKLY = "Code blockly"
  this.HTML_WINDOWS_CODE_JAVASCRIPT = "Code javascript"
  this.HTML_WINDOWS_CODE_PYTHON = "Code python"
  this.HTML_WINDOWS_CODE_LUA = "Code lua"
  this.HTML_WINDOWS_VARIABLES = "Valeurs de variables"

  // De Aide 
  this.HTML_HELP2 = "Aide...";
  this.HTML_MESSAGE = "Message";
  this.HTML_MAIN_TITLE2 = "&nbsp; Amusez-vous !!!&nbsp; ";
  this.HTML_MESSAGE_READ = "&nbsp; OK, j'ai lu le message &nbsp;";

  // Message de À propos...
  this.HTML_ABOUT = "À propos...";
//this.HTML_ABOUT2 = "Texte dans les messages locaux : /msg/js/...";
  this.HTML_ABOUT3 = "À propos...";
  this.HTML_MESSAGE_READ2 = "&nbsp; OK, j'ai lu le message &nbsp;";

  // De la fenêtre Affichage
  this.HTML_DISPLAY = "Affichage";
  this.HTML_BUTTON_CLEAR = "Effacer";

  // De la fenêtre 'Code javascript'
  this.HTML_CODE_JAVASCRIPT = " Code javascript";
  this.HTML_EXECUTE_JAVASCRIPT_CODE = "Exécuter";
  this.HTML_CODE_JAVASCRIPT_FROM_BLOCKS = " Code javascript des blocs";

  // From the 'python Code' window
  this.HTML_CODE_PYTHON = "Code python";
  this.HTML_EXECUTE_PYTHON_CODE = "Exécuter";

  // From the 'lua Code' window
  this.HTML_CODE_LUA = "Code Lua";
  this.HTML_EXECUTE_LUA_CODE = "Exécuter";

  // From the 'spy' window
  this.HTML_VARIABLE_SPY = "Valeurs de variables";

  // Modifie les textes de la startBlocks
  this.XML_SB_VALUE_IS = "La valeur vaut :";
  this.XML_SB_VALUE_IS2 = "La valeur vaut :";

  // Modifie les textes de la toolbox
  this.XML_TB_COMMENT = "écrivez un commentaire...";

  } // bgBlocklyLanguage_fr

  function bgBlocklyLanguage2_fr() {
  //===============================
  // Classe pour traduire en français les textes des attribut "title" des balises ayant les id : "HTML_IMG_..."
  this.HTML_IMG_OPEN = "Ouvrire un fichier Blockly...";
  this.HTML_IMG_SAVE = "Sauver un fichier Blockly...";
  this.HTML_IMG_RUN = "Lance le programme défini par les blocs, exécution lente.";
  this.HTML_IMG_RUNRUN = "Lance le programme, exécution plus rapide.";
  this.HTML_IMG_RUNRUNRUN = "Lance le programme, exécution à haute vitesse, sans animation.";
  this.HTML_IMG_ONESTEP = "Exécute un pas du code.";
  this.HTML_IMG_PAUSE = "Met l'exécution du programme en mode pause.";
  this.HTML_IMG_STOP = "Arrête l'exécution du programme.";
  this.HTML_IMG_FASTER = "Avance plus vite.";
  this.HTML_IMG_SLOWER = "Avance moins vite.";
  this.HTML_IMG_HELP = "Aide.";
  this.HTML_IMG_CODEJAVASCRIPT = "Montre le code javascript.";
  } // bgBlocklyLanguage2_fr

gloB.oLanguage = new bgBlocklyLanguage_fr();   // Défini un objet contenant les traductions du contenu "innerHTML".
gloB.oLanguage2 = new bgBlocklyLanguage2_fr(); // Défini un objet contenant les traductions des "title" des balises.

