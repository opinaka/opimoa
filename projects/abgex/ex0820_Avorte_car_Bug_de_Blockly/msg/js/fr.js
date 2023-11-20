// 2019.01.28  Messages personnels de Bernard Gisin

//'use strict';

goog.provide('bgBlockly.Msg.fr');
//goog.require('bgBlockly.Msg');

bgBlockly.Msg["TEXT_AFFICHE_TITLE"] = "afficher %1";
bgBlockly.Msg["TEXT_AFFICHE_TOOLTIP"] = "Afficher le texte sans retour à la ligne, le nombre ou une autre valeur spécifiée.";
bgBlockly.Msg["TEXT_AFFICHE_HELPURL"] = "https://github.com/google/blockly/wiki/Text#printing-text";  // untranslated
bgBlockly.Msg["TEXT_AFFICHELN_TITLE"] = "afficherLn %1";
bgBlockly.Msg["TEXT_AFFICHELN_TOOLTIP"] = "Afficher le texte avec retour à la ligne, le nombre ou une autre valeur spécifiée.";
bgBlockly.Msg["TEXT_AFFICHELN_HELPURL"] = "https://github.com/google/blockly/wiki/Text#printing-text";  // untranslated
bgBlockly.Msg["TEXT_AFFICHERTL_TITLE"] = "afficherDaG %1";
bgBlockly.Msg["TEXT_AFFICHERTL_TOOLTIP"] = "Afficher le texte de droite à gauche, le nombre ou une autre valeur spécifiée.";
bgBlockly.Msg["TEXT_AFFICHERTL_HELPURL"] = "";  // untranslated
bgBlockly.Msg["TEXTS_HUE"] = "160";

bgBlockly.Msg["CARD_MOVEX1X2_TITLE"] = "déplace la carte de la case %1 à la case %2";
bgBlockly.Msg["CARD_MOVEX1X2_TOOLTIP"] = "déplace la carte d'une case à une autre.";
bgBlockly.Msg["CARD_MOVEX1X2_HELPURL"] = "";  // untranslated
bgBlockly.Msg["CARD_EXCHANGEX1X2_TITLE"] = "échange les cartes des cases %1 et %2";
bgBlockly.Msg["CARD_EXCHANGEX1X2_TOOLTIP"] = "échange deux cartes de leur place.";
bgBlockly.Msg["CARD_EXCHANGEX1X2_HELPURL"] = "";  // untranslated
bgBlockly.Msg["CARD_GET_CARD_TITLE"] = "Carte de case %1";
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
bgBlockly.Msg["CARDS_HUE"] = "20";


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

if (!gloLanguages['fr']) {   
  function bgBlocklyLanguage_fr() {
  //===============================
  // Classe pour traduire les textes en français
  this.HTML_WIN_TITLE = "ex0820, cartes, version multilanges.";
  this.HTML_MAIN_TITLE = "Amusez-vous...";

  // Menu principal
  this.HTML_FILES = "Fichiers";
  this.HTML_EXECUTE = "Exécution";
  this.HTML_VIEW = "Voir";
  this.HTML_PARAMETERS = "Paramètres";
  this.HTML_HELP = "Aide";

  // De Fichiers
  this.HTML_LOAD_BLOCKLY_CODE = "Ouvrir...";
  this.HTML_SAVE_BLOCKLY_CODE = "Enregistrer sous...";

  // De Exécution
  this.HTML_EXECUTE_SLOW1  = "Exécution lente";
  this.HTML_EXECUTE_SLOW2  = "Exécution plus rapide";
  this.HTML_EXECUTE_SLOW3  = "Exécution sans animation";
  this.HTML_EXECUTE_SLOW4  = "Exécution sans animation, avec 'exec'";
  this.HTML_EXECUTE_PAUSE  = "Met l'exécution en mode pause";
  this.HTML_EXECUTE_STOP   = "Arrête l'exécution";
  this.HTML_EXECUTE_FASTER = "Plus vite";
  this.HTML_EXECUTE_SLOWER = "Moins vite";

  // De Voir
  this.HTML_SHOW_CODE = "Montre le code en JavaScript";

  // De Paramètres
  this.HTML_PARAMETERS_HIGHLIGHT = "Avec illumination des blocs"
  this.HTML_PARAMETERS_NO_HIGHLIGHT = " Sans illumination des blocs"

  // De Aide 
  this.HTML_HELP2 = "Aide...";
  this.HTML_MESSAGE = "Message";
  this.HTML_MAIN_TITLE2 = "Amusez-vous !!!";
  this.HTML_MESSAGE_READ = "OK, j'ai lu le message";

  // Message de À propos...
  this.HTML_ABOUT = "À propos...";
  this.HTML_ABOUT2 = 
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
  this.HTML_MESSAGE_READ2 = "OK, j'ai lu le message";

  // De la fenêtre Affichage
  this.HTML_DISPLAY = "Affichage";
  this.HTML_BUTTON_CLEAR = "Effacer";

  // De la fenêtre 'Code javascript'
  this.HTML_CODE_JAVASCRIPT = "Code javascript";
  this.HTML_EXECUTE_JAVASCRIPT_CODE = "Exécute le code javascript";


  // Modifie les textes de la startBlocks
  this.XML_SB_VALUE_IS = "La valeur vaut :";
  this.XML_SB_VALUE_IS2 = "La valeur vaut :";

  } // bgBlocklyLanguage_fr

  gloLanguages['fr'] = new bgBlocklyLanguage_fr(); // Ajoute une propriété à l'objet : 'gloLanguages'
  }

TranslateAllAfterDownload('fr');
