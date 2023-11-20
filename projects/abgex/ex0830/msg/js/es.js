// ***** Espagnol *****

//'use strict';

goog.provide('bgBlockly.Msg.es');
goog.require('bgBlockly.Msg');

  function bgBlocklyLanguage_es() {
  //===============================
  // Classe pour traduire les textes en espagnol
  this.HTML_WIN_TITLE = "ex0830, cartas, espagnol.";
  this.HTML_MAIN_TITLE = "Brinca...";

  } // bgBlocklyLanguage_es

  function bgBlocklyLanguage2_es() {
  //===============================
  // Class to translate texts in english
  this.HTML_IMG_OPEN = "(Es)Open a Blockly file...";
  this.HTML_IMG_SAVE = "(Es)Save a Blockly file...";
  this.HTML_IMG_RUN = "(Es)Lance le programme défini par les blocs dans l'espace de travail.";
  this.HTML_IMG_RUNRUN = "(Es)Lance le programme, exécution plus rapide.";
  this.HTML_IMG_RUNRUNRUN = "(Es)Lance le programme, exécution à haute vitesse, sans animation.";
  this.HTML_IMG_ONESTEP = "(Es)Exécute un pas du code.";
  this.HTML_IMG_PAUSE = "(Es)Met l'exécution du programme en mode pause.";
  this.HTML_IMG_STOP = "(Es)Arrête l'exécution du programme.";
  this.HTML_IMG_FASTER = "(Es)Avance plus vite.";
  this.HTML_IMG_SLOWER = "(Es)Avance moins vite.";
  this.HTML_IMG_HELP = "(Es)Aide.";
  this.HTML_IMG_CODEJAVASCRIPT = "(Es)Montre le code javascript.";
  } // bgBlocklyLanguage2_es

gloLanguage = new bgBlocklyLanguage_es(); // Défini un objet contenant les traductions
gloLanguage2 = new bgBlocklyLanguage2_es(); // Défini un objet contenant les traductions

// Lance la traduction
TranslateAllAfterDownload();
