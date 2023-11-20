// Adjonction de fonctionnalités à Blockly   bgjavascript_abase.js
// #######################################

// c.f. https://developers.google.com/blockly/guides/app-integration/running-javascript
//"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

// Un créateur d'objet, pour conserver toutes les variables 'globales' du projet dans un objet.
function bgBlocklyVariables() {
//=============================
this.demoWorkspace = null; // Cette variable doit être global.
this.fRunStop = false; // Pour permettre l'arrêt de l'exécution
this.fRunPause = false; // Pour mettre l'exécution en mode pause
this.fRunPause_temp = false; // Pour mettre l'exécution en mode pause durant un temps déterminé
this.nTimerID_temp = 0; // Numéro du timer utilisé pour mettre en pause temporaire.
this.fRunOneStep = false; // Pour exécuter pas à pas
this.fIsRunning = false; // Indique si du code est en cours d'exécution on non.
this.nMoveStep = 1; // Pas de déplacement. Peut être agrandi, pour accélérer.
this.nAccelerate = 1; // Pour accélérer les mouvement, utile dans les mélanges.
this.nInterpreterSpeed = 1; // Détermine la vitesse d'exécution
    // Si == 1, vitesse avec illumination de chaque bloc
    // Si == 2, vitesse en illuminant que les blocs impliquant un mouvement, qui fait appelle au timer
    // Si == 3, vitesse sans illuminer des blocs, mais exécution une instruction après l'autre.
    // Si == 4, vitesse est maximale, sans animations, donc sans aucun appel au timer.
    // Si == 5, vitesse est maximale, sans animations, donc sans aucun appel au timer. utilise : "eval(code);"
this.nInterpreterStepSpeed = 2; // 2 => pas à pas entre deux animation
                                // 1 => pas à pas entre chaque illumination de bloc.
this.nTimeMSBlocks = 10; // Temps en [ms] entre deux appels à : "gloB.myInterpreter.step();", si "gloB.nInterpreterSpeed == 1"

// Ce qui suit permet de déplacer les fenêtres dans la fenêtre de Blockly
// ********* !!! Ajouter l'instuction : "onmousemove="myMouseMove(event);" à la balise <body> !!!! *****
this.oDivSel = 0; // pointeur sur le div lorsqu'il est sélectionné
this.nOffsetX = 0; // décalage entre le clique souris et la gauche de la fenetre
this.nOffsetY = 0; // décalage
this.nZIndex = 1000; // Pour définir quelle fenêtre est au-dessus de quelle autre.

this.nTimerID1 = 0;  // indiquera le numéro du timer actif, pour l'animation
this.nTimerID2 = 0;  // indiquera le numéro du timer actif pour le mélange

this.myInterpreter = null; /// Pour utiliser l'interpréteur javascript, qui permet une exécution au ralenti.

this.strbgLanguage = ''; // Pour le choix de la langue du document
this.oLanguage = null; // Objet contenant la langue chargée. Initialisée dans  msg/js/fr.js ou msg/js/en.js ou msg/js/de.js
this.oLanguage2 = null; // Objet contenant la langue chargée pour les 'title' des images.

this.funcAfterRunBlockly = null; // fonction exécutée après la fonction "RunBlockly", pour l'application finale.
this.funcBeforeRunBlockly = null; // fonction exécutée avant la fonction "RunBlockly", pour l'application finale.
this.funcAfterInitApi = null; // fonction exécutée après la fonction "initApi", pour enregistrer d'autre fonction dans l'interprésteur javascript.
this.funcRunFinished = null; // Pour appeler une fonction à la fin de l'exécution. Par défaut ne fait rien.

this.oDialog = null; // pour les messages apparaîssant dans les boîtes de dialogues
this.nDivResize = 0; // Indique si on déplace (=0) ou redimentionne (=1) la fenêtre.
this.oDivCalling = 0; // pointeur sur le div qui a appelé la fonction MyMouseDown
this.strDivName = ""; // nom de la div qui a appelé la fonction MyMouseDown

this.funcMouseMove = ""; // Pour des traitements supplémentaires au "MouseMove", si désiré.

this.strCodeAddEnd = ""; // Code à ajouté à la fin du code javascript.
// C'est utile si on veut exécuter une fonction définie dans Blockly, lors d'un événement,
// par exemple, dans ex2000, lorsqu'on clique sur une carte.

} // bgBlocklyVariables

var gloB = new bgBlocklyVariables(); // Création de l'objet contenant les paramètres globaux du projet.


function bgFuncDialog() {
//=======================
// Pour la création d'un objets, pour les boîtes de dialogues
// Les textes seront redéfini dans l'application finale. C.f. /msg/js/...
this.DialogTitle = [
   "Message"  // Message d'aide
  ,"À propos de ce programme" // Message About
  ];
this.DialogMessage = [ 
   "Amusez-vous !!!"  // Message d'aide
  ,"À propos" // Message About
  ];
this.DialogOK = [
   " OK, j'ai lu le message. "
  ," OK, j'ai lu le message. "
  ];
this.DialogMusic = [
   ""
  ,""
  ];
} // bgFuncDialog

gloB.oDialog = new bgFuncDialog(); // Création de l'objet pour les textes des boîtes de dialogues

// #############################################################################

function bgHighlightBlock(id) {
//===========================
// Pour que les blocks exécutés soient illuminés.
if (gloB.fRunOneStep) gloB.fRunPause = true; // S'arrête si on est en mode pas à pas.
return gloB.demoWorkspace.highlightBlock(id);
} // bgHighlightBlock

function onchange(event) {
//========================
// Appelé à chaque changement de l'espace de Blockly
// Si l'idBlocklyCoundUsed existe, 
// place le nombre de blocs utilisé dans le contenu de la balise ayatn cette id.
var oIdText = document.getElementById('idBlocklyCoundUsed');
if (oIdText != null) oIdText.innerHTML = 10000 - gloB.demoWorkspace.remainingCapacity();
} // onchange

// Cette fonction est exécutée depuis : "xhttp.onreadystatechange = function() {"
// Juste après que la toolbox ait été chargée.
function RunBlockly() {
//===================== 
// Si désiré, exécution d'une fonction utilisateur avant chargement de Blockly.
if (gloB.funcBeforeRunBlockly) gloB.funcBeforeRunBlockly();

// C'est ici que l'on insert les fonctionnalités Blockly
gloB.demoWorkspace = Blockly.inject('blocklyDiv',
    {media: '../../media/',
     maxBlocks: 10000, // On suppose que l'on atteindra jamais les 10000 blocs.
     toolbox: document.getElementById('toolbox')});

// C'est ici que l'on indique d'ajouter des blocs a l'ouverture de la page
Blockly.Xml.domToWorkspace(document.getElementById('idStartBlocks'), gloB.demoWorkspace);

// S'il y a des blocs définis, les recharge au démarrage.
var strText = sessionStorage.getItem("blockly_startBlocks"); // strText == null si pas trouvé.

if ( strText && (strText.length > 10) ) {
  // Il y a des blocs à récupérer suite à un changement de langue
  // Le texte spécifique aux blocs qui viennents d'être écrit, ne peut pas être traduit.
  gloB.demoWorkspace.clear();  // Enlève tous les blocs, c.f. : https://developers.google.com/blockly/reference/js/Blockly.WorkspaceSvg#cleanUp
  var xml = Blockly.Xml.textToDom(strText);
  Blockly.Xml.domToWorkspace(xml, gloB.demoWorkspace);

  // Efface ce qui a été récupéré
  sessionStorage.removeItem('blockly_startBlocks');
  }

// Ces lignes indique à Blockly d'illuminer les blocks exécutés.
Blockly.JavaScript.STATEMENT_PREFIX = 'bgHighlightBlock(%1);\n';
Blockly.JavaScript.addReservedWords('bgHighlightBlock');

gloB.demoWorkspace.addChangeListener(onchange);
onchange();  

// Si désiré, exécution d'une fonction utilisateur après chargement de Blockly.
if (gloB.funcAfterRunBlockly) gloB.funcAfterRunBlockly();
} // RunBlockly

//##############################################################################
//***************************************************************************
// Lecture de la structure des blocks au format XML
// Permet de sauver cette structure dans un fichier .xml
// Permet de charger une structure de blocs qui ont été sauvés.
//***************************************************************************

function GetXML_code() {
//======================
// c.f. https://blockly-demo.appspot.com/static/tests/playground.html
// Pour récupérer le code XML des blocs 
// Le retourne sous forme de texte
var xml = Blockly.Xml.workspaceToDom(gloB.demoWorkspace);
var strS = Blockly.Xml.domToPrettyText(xml); // lit le code XML des blocs
//var strS = Blockly.Xml.domToText(xml); // lit le code XML des blocs
var nnS = 0;
var strRes = "";

// Enlève tous les " id=...", qui posent des problèmes.
// c.f. https://www.toutjavascript.com/reference/
for (nnS=0; nnS<strS.length-4; nnS++) {
  if ( (strS[nnS] == ' ') && (strS[nnS+1] == 'i') && (strS[nnS+2] == 'd') && (strS[nnS+3] == '=') ) { 
    // Saute toute la chaine : id="..."  jusqu'à la fermeture des guillemets
     nnS += 5;
     while ( (strS[nnS] != '"') && (nnS < strS.length-4) ) nnS++;
     nnS++; // Saute le dernier caractère qui est la fermeture des guillemets
     }
     
  strRes += strS[nnS];
  } // for

// Complète la fin de la copie
while (nnS < strS.length) { strRes += strS[nnS]; nnS++; }

return(strRes);
} // GetXML_code
  
function SaveFile(filename) {
//===========================
// Sauve le programme écrit en Blockly en code XML dans un fichier texte.
var strText = GetXML_code(); 
var element = document.createElement('a');
element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(strText));
element.setAttribute('download', filename);

element.style.display = 'none';
document.body.appendChild(element);
element.click();
document.body.removeChild(element);
} // SaveFile

function readSingleFile(event) {
//==============================
// c.f. : https://www.w3schools.com/jsref/dom_obj_fileupload.asp
// Charge le contenu du fichier sélectionné si la touche "OK" 
// a été pressée et exécute le code de "reader.onload".
var file = event.target.files[0];
if (!file) return;
    
var reader = new FileReader();
  
// Une fois que le fichier est lu, cette fonction est appelée. 
// c.f. https://developer.mozilla.org/fr/docs/Web/API/FileReader
reader.onload = function(event) {
//-------------------------------
  var contents = event.target.result;
  
  // Charge les nouveaux blocs qui sont dans un fichier texte d'extension .xml
  var xml = Blockly.Xml.textToDom(contents);
  Blockly.Xml.domToWorkspace(xml, gloB.demoWorkspace);    
  };
  
// Demande de lire le fichier
reader.readAsText(file);
} // readSingleFile

function LoadFile() {
//===================
// Lit un fichier et génère un événement qui va exécuter la fonction "readSingleFile(event)"
var element = document.createElement('input');
element.setAttribute('type', 'file');
element.setAttribute('is', 'input3');
element.setAttribute('onchange', 'readSingleFile(event);');

//element.style.display = 'none';
document.body.appendChild(element);
element.click();
document.body.removeChild(element);
} // LoadFile

//##############################################################################
//*************************************
// Spécifique au menu de l'application.
//*************************************

function parameter_select(strSel) {
//=================================
// Permet de sélectionner des paramètres.
if (strSel == 'with_highlight') {
  document.getElementById('idMenuParametre_with_illumination').innerHTML = 'v ';
  document.getElementById('idMenuParametre_without_illumination').innerHTML = '&nbsp; ';
  Blockly.JavaScript.STATEMENT_PREFIX = 'bgHighlightBlock(%1);\n'; // Permet dajouter la commande d'illumination des blocs.
  }
if (strSel == 'without_highlight') {
  document.getElementById('idMenuParametre_with_illumination').innerHTML = '&nbsp; ';
  document.getElementById('idMenuParametre_without_illumination').innerHTML = 'v ';
  Blockly.JavaScript.STATEMENT_PREFIX = ''; // Permet d'enlever la commande d'illumination des blocs.
  }
if (strSel == 'step_by_step_slow') {
  document.getElementById('idMenuParametre_step_by_step_slow').innerHTML = 'v';
  document.getElementById('idMenuParametre_step_by_step_move').innerHTML = '&nbsp; ';
  gloB.nInterpreterStepSpeed = 1;
  }
if (strSel == 'step_by_step_move') {
  document.getElementById('idMenuParametre_step_by_step_slow').innerHTML = '&nbsp; ';
  document.getElementById('idMenuParametre_step_by_step_move').innerHTML = 'v ';
  gloB.nInterpreterStepSpeed = 2;
  }
if (strSel == 'supperpose_off') {
  document.getElementById('idMenuParametre_supperpose_on').innerHTML = '&nbsp; ';
  document.getElementById('idMenuParametre_supperpose_off').innerHTML = 'v ';
  gloB.cHide = 'c';
  }
if (strSel == 'supperpose_on') {
  document.getElementById('idMenuParametre_supperpose_off').innerHTML = '&nbsp; ';
  document.getElementById('idMenuParametre_supperpose_on').innerHTML = 'v ';
  gloB.cHide = '';
  }
} // parameter_select

// *************************************
// Gestion de déplacement de fenêtres.
// *************************************

function BlocklyResize(myEvent) {
//===============================
// La fenêtre où se trouve Blockly est redimensionnée.
// C.f. : "Resizable Workspace"
// C.f. : https://developers.google.com/blockly/guides/configure/web/resizable

var oBlocklyParent = document.getElementById('idCodeBlockly');
var oBlocklyDiv = document.getElementById('blocklyDiv');
oBlocklyDiv.style.width  = myEvent.pageX - parseInt(oBlocklyParent.style.left) + 'px';
oBlocklyDiv.style.height = myEvent.pageY - parseInt(oBlocklyParent.style.top) - parseInt(blocklyDiv.style.top)  + 'px';

Blockly.svgResize(gloB.demoWorkspace);
} //BlocklyResize

function myMouseDown(myEvent, oAppelant, strDivName, nResize) {
//=============================================================
// Permet de sélectionner un des  div  pour le déplacer.
// nResize = 0 pour des déplacements
// nResize = 1 pour des redimensionnement
if (nResize != 1) nResize = 0; // Cas où le paramètre n'a pas été transmis.
gloB.nDivResize = nResize; // Mémorise si on déplace ou redimensionne
gloB.nZIndex++;
document.getElementById(strDivName).style.zIndex = gloB.nZIndex;
if (oAppelant == null) return;

if (nResize == 0) oAppelant.style.cursor='move';
else              oAppelant.style.cursor='se-resize';

gloB.oDivCalling = oAppelant; // Mémorise le div qui a appellé myMouseDown

gloB.oDivSel = document.getElementById(strDivName);
gloB.strDivName = strDivName; // Mémorise le nom de la div qui a appelé MyMouseDown
oAppelant.style.cursor='move';

if (gloB.oDivSel.style.left.length > 2) { // Sinon, ce champ n'est pas défini 
  gloB.nOffsetX = myEvent.pageX - parseInt(gloB.oDivSel.style.left);
  }
else if (gloB.oDivSel.style.right.length > 2) { // Sinon, ce champ n'est pas défini 
  gloB.nOffsetX = myEvent.pageX + parseInt(gloB.oDivSel.style.right);
  }

if (gloB.oDivSel.style.top.length > 2) { // Sinon, ce champ n'est pas défini 
  gloB.nOffsetY = myEvent.pageY - parseInt(gloB.oDivSel.style.top);
  }
else if (gloB.oDivSel.style.bottom.length > 2) { // Sinon, ce champ n'est pas défini 
  gloB.nOffsetY = myEvent.pageY + parseInt(gloB.oDivSel.style.bottom);
  }
} // myMouseDown

function myMouseMove(myEvent) {
//=============================
// Permet de déplacer le  div  si un a été sélectionné
// Permet aussi de le redimensionner. 
if (gloB.oDivSel != 0) {
  if (gloB.nDivResize == 0) {
    // Déplacement de la fenêtre
    if (gloB.oDivSel.style.left.length > 2) { // Sinon, ce champ n'est pas défini 
      gloB.oDivSel.style.left = myEvent.pageX - gloB.nOffsetX + "px";
      }
    else if (gloB.oDivSel.style.right.length > 2) { // Sinon, ce champ n'est pas défini 
      gloB.oDivSel.style.right = gloB.nOffsetX - myEvent.pageX + "px";
      }

    if (gloB.oDivSel.style.top.length > 2) { // Sinon, ce champ n'est pas défini 
      if (myEvent.pageY - gloB.nOffsetY > 47 ) gloB.oDivSel.style.top  = myEvent.pageY - gloB.nOffsetY + "px";
      else {
        gloB.oDivSel.style.top = 48 + "px";
        gloB.oDivCalling.style.cursor = 'grab';
        gloB.oDivCalling = 0;
        gloB.oDivSel = 0;
        }
      }
    else if (gloB.oDivSel.style.bottom.length > 2) { // Sinon, ce champ n'est pas défini 
      gloB.oDivSel.style.bottom  = gloB.nOffsetY - myEvent.pageY + "px";
      }
    }
  else {
    // Redimensionne le  div  sélectionné
    gloB.oDivSel.style.width  = myEvent.pageX - parseInt(gloB.oDivSel.style.left) + "px";
    gloB.oDivSel.style.height = myEvent.pageY - parseInt(gloB.oDivSel.style.top)  + "px";  
    if (gloB.strDivName == "idCodeBlockly") BlocklyResize(myEvent);
    if (gloB.funcMouseMove != "") gloB.funcMouseMove(myEvent); // pour des traitements supplémentaires
    }  
  }
} // myMouseMove

function myMouseOut(myEvent) {
//============================
// Gère le fait que la souris sort de la fenêtre principale
if (gloB.oDivSel != 0) {  
  //console.log(myEvent.pageX, window.innerWidth);

  // Assure que le haut de la fenêtre reste visible
  if (myEvent.pageY <= 0) {    
    gloB.oDivSel.style.top = '48px';
    }
  
  if ( (myEvent.pageY <= 0) || (myEvent.pageX <= 0)
    || (myEvent.pageX >= window.innerWidth) ) { 
    gloB.oDivCalling.style.cursor = 'grab';
    gloB.oDivCalling = 0;
    gloB.oDivSel = 0;
    gloB.funcMouseMove = ""; // Pas de fonction de traitement supplémentaire
    }
  }
  
} // myMouseOut

function CreateDialogHideWindow() {
//=================================
// Création d'une balise qui recouvre toute la fenêtre, en empêchant d'y accéder.
// C'est utile pour afficher une boîte de dialogue modale.
if (!document.getElementById("idDialogHideWindow")) {
  // Si la balise n'existe pas, on la crée.
  var divElement = document.createElement('div');
  divElement.id = "idDialogHideWindow";
  divElement.style = "position:absolute; display:none; left:0px; top:0px; right:0px; bottom:0px; background-color:#000000; opacity:0.7; z-index:90;";
  document.body.appendChild(divElement);
  }
} // CreateDialogHideWindow

function DialogGeneral(fUpdate, NumDialog, NumMessage) {
//=============================================================
// Affiche une boîte de dialogue.
// fUpdate == true, sauf en tout début d'application, lorsque la demoWorksapce n'a pas encore été créée.
// gloB.oDialog  est l'objet qui contient les textes à afficher.  c.f. ex0932 comme exemple.
// NumDialog, est un numéro qui identifie l'id de la boîte de dialogue.
// NumMessage, indique le contenu de la boîte de dialgue
// oText.DialogMusic[NumDialog] peut indiquer un fichier de musique à jouer.
// Sinon, il reste vide.

if (fUpdate) {
  // N'est pas fait lors du premier message, qui n'a pas encore terminé la mise à jour du 'Workspace'
  gloB.demoWorkspace.setVisible(false);
  gloB.demoWorkspace.setVisible(true);  // Deux instructions, pour enlever une sélection d'un nombre en train d'être éditer.
  }
gloB.nZIndex++;

if (gloB.oDialog.DialogMusic[NumMessage].length > 3) { // Joue un son doux pour indiquer que les connexions sont corrects.
  var divElement = document.getElementById("idDivSound" + NumDialog);
  if (!divElement) {
    // Si la balise n'existe pas, on la crée.
    divElement = document.createElement('div');
    divElement.id = "idDivSound" + NumDialog;
    document.body.appendChild(divElement);
    }
  divElement.innerHTML = "<audio autoplay> <source src='" + gloB.oDialog.DialogMusic[NumMessage] + "'></audio>";  // Joue un son
  }

// Création d'une balise qui permet de cacher toute la fenêtre pour ne laisser que la boîte de dialogue.
CreateDialogHideWindow();

// Textes de la boîte de dialogue.
document.getElementById('id_DIALOG_TITLE' + NumDialog).innerHTML = gloB.oDialog.DialogTitle[NumMessage];
document.getElementById('id_DIALOG_MESSAGE' + NumDialog).innerHTML = gloB.oDialog.DialogMessage[NumMessage];
document.getElementById('id_DIALOG_OK' + NumDialog).innerHTML = gloB.oDialog.DialogOK[NumMessage];;

document.getElementById('idDialogBoxGeneral' + NumDialog).style.zIndex = gloB.nZIndex+1;
document.getElementById('idDialogHideWindow').style.zIndex = gloB.nZIndex;
document.getElementById('idDialogHideWindow').style.display='block';
document.getElementById('idDialogBoxGeneral' + NumDialog).style.display='block';
} // DialogGeneral

function DialogHelp(fUpdate) {
//============================
// Affiche les instructions à réaliser.
if (fUpdate) {
  // N'est pas fait lors du premier message, qui n'a pas encore terminé la mise à jour du 'Workspace'
  gloB.demoWorkspace.setVisible(false);
  gloB.demoWorkspace.setVisible(true);  // Deux instructions, pour enlever une sélection d'un nombre en train d'être éditer.
  }
gloB.nZIndex++;
CreateDialogHideWindow();
document.getElementById('idDialogBoxHelp').style.zIndex = gloB.nZIndex+1;
document.getElementById('idDialogHideWindow').style.zIndex = gloB.nZIndex;
document.getElementById('idDialogHideWindow').style.display='block';
document.getElementById('idDialogBoxHelp').style.display='block';

// Si possible, donne le focus au bouton indiquant qu'on a lu le message
if (document.getElementById('HTML_MESSAGE_READ')) document.getElementById('HTML_MESSAGE_READ').focus();
} // DialogHelp

function DialogAbout() {
//======================
// Affiche une boîte de dialogue 'À propos de...'
gloB.demoWorkspace.setVisible(false);
gloB.demoWorkspace.setVisible(true);  // Deux instructions, pour enlever une sélection d'un nombre en train d'être éditer.
gloB.nZIndex++;
CreateDialogHideWindow();
document.getElementById('idDialogBoxAbout').style.zIndex = gloB.nZIndex+1;
document.getElementById('idDialogHideWindow').style.zIndex = gloB.nZIndex;
document.getElementById('idDialogHideWindow').style.display='block';
document.getElementById('idDialogBoxAbout').style.display='block';

// Si possible, donne le focus au bouton indiquant qu'on a lu le message
if (document.getElementById('HTML_MESSAGE_READ2')) document.getElementById('HTML_MESSAGE_READ2').focus();
} // DialogAbout

//#############################################################################3

//*************************
// Suite de fonctions pour le chargement de blockly, avec :
// ° la toolbox
// ° la startBlocks
// ° les langues dans le fichier bgmsg/ .js
//*************************

function ChooseLanguage(strLang) {
//================================
// Exécute Blockly dans la langue choisie dans strLang, qui vaut par exemple 'en' ou 'de' ou 'fr

// Récupère l'URL
var strS = window.location.href;

// Récupère le paramètre de l'URL
var n1 = strS.indexOf("?lang=");
if (n1 > 0) {
  // Il y a déjà une langue définie, il faut l'enlever
  strS = strS.substr(0, n1);
  }

// S'il y a des blocs définis, les sauvegarde, pour les recharger au démarrage.
var strText = GetXML_code();
if (strText.length > 10) sessionStorage.setItem('blockly_startBlocks', strText);

window.location.href = strS + '?lang=' + strLang; // Ceci recharche la page avec la nouvelle langue
} // ChooseLanguage
//--------------------------------------------------------------------------
  
function TranslateAllAfterDownload() {
//====================================
// Les textes de la langue désirée sont en mémoire.
// Applique les traductions.

// Parcours tous les éléments de l'objet pour traduire traduire en 'gloB.oLanguage' 
// les textes des contenus "innerHTML" des balises ayant les id : "HTML_..."
var oo;
var oBalise;
if (gloB.oLanguage) {
  for (oo in gloB.oLanguage) {  
    oBalise = document.getElementById(oo);
    if (oBalise) oBalise.innerHTML = gloB.oLanguage[oo];
    //Display('[' + oo + '] : ' +  gloB.oLanguage[oo] + '\n'); // Pour des tests
    }
  }

// Parcours tous les éléments de l'objet pour traduire en 'gloB.oLanguage' 
// les textes des attribut "title" des balises ayant les id : "HTML_IMG_..."
if (gloB.oLanguage2) {
  for (oo in gloB.oLanguage2) {  
    oBalise = document.getElementById(oo);
    if (oBalise) oBalise.setAttribute('title', gloB.oLanguage2[oo]);
    //Display('[' + oo + '] : ' +  gloB.oLanguage2[oo] + '\n'); // Pour des tests
    }
  }

// Change la langue sélectionnée dans la 'DropDown List' concernant les langues
var oLang = document.getElementById('idSelectLanguage');
if (oLang) oLang.value = gloB.strbgLanguage;

// Finalement, on démarre Blockly
RunBlockly();
} // TranslateAllAfterDownload

function TranslateLocalBlockly() {
//================================
// Charge le fichier de la langue de l'application finale.

// Utilisation de AJAX pour obtenir les textes dans la langue désirée.
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
//"""""""""""""""""""""""""""""""""""""
  if (this.readyState == 4) { // && this.status == 200) {
    // Charge la langue désirée, définie dans "strLang". Soit 'fr' ou 'en' ou 'de' ou 'es' ou etc.
    if (this.status < 400) eval(this.responseText); // Si le fichier n'existe pas, il y a une erreur 404
    TranslateAllAfterDownload();
    }
  };   
 
var strFile = "msg/js/" + gloB.strbgLanguage + ".js";
xhttp.open("POST", strFile, true); // true indique que l'appel est asynchrone.
xhttp.send();  
} // TranslateLocalBlockly

function TranslateBgBlockly() {
//=============================
// Charge le fichier de la langue de la librairie de Bernard Gisin, s'il est défini dans l'URL
  
// Utilisation de AJAX pour obtenir les textes dans la langue désirée.
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
//"""""""""""""""""""""""""""""""""""""
  if (this.readyState == 4) { // && this.status == 200) {
    // Charge la langue désirée, définie dans "strLang". Soit 'fr' ou 'en' ou 'de' ou 'es' ou etc.
    if (this.status < 400) eval(this.responseText); // Si le fichier n'existe pas, il y a une erreur 404
    TranslateLocalBlockly();
    }
  };   
 
var strFile = "../../bgmsg/js/" + gloB.strbgLanguage + ".js";
xhttp.open("POST", strFile, true); // true indique que l'appel est asynchrone.
xhttp.send();  
} // TranslateBgBlockly

function TranslateBlockly() {
//===========================
// Charge le fichier de la langue définie par Blockly, si elle est défini dans l'URL

// Récupère l'url de la page
// Si la langue est définie dans l'URL, alors utilise cette langue
var strS = window.location.href;
// Récupère le paramètre de l'URL
var n1 = strS.indexOf("?lang=");
if (n1 <= 0) {
  // Il n'y a pas de langue définie dans l'URL, pas de langue à charger.
  RunBlockly();
  return;
  }
  
// Utilisation de AJAX pour obtenir les textes dans la langue désirée.
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
//"""""""""""""""""""""""""""""""""""""
  if (this.readyState == 4) { // && this.status == 200) {
    // Charge la langue désirée, définie dans "strLang". Soit 'fr' ou 'en' ou 'de' ou 'es' ou etc.
    if (this.status < 400) eval(this.responseText); // Si le fichier n'existe pas, il y a une erreur 404
    TranslateBgBlockly();
    }
  };   
 
// La méthode GET est généralement préférable, mais limite la taille du fichier à 8 ko, parfois 2 ko.
// La limite provient du fait que les données sont transmises via l'URL.
gloB.strbgLanguage = strS.substr(n1+6, 20); // récupère la langue désirée = 'de' ou  = 'en' ou  = 'fr'
var strFile = "../../msg/js/" + gloB.strbgLanguage + ".js";
xhttp.open("POST", strFile, true); // true indique que l'appel est asynchrone.
xhttp.send();  
} // TranslateBlockly

function Include_toolbox(strFile) {
//=================================
// Charge le fichier contenant la toolbox
// strFile est le début du nom du fichier .xml contenant la toolbox liste
// C'est la partie qui précède : "_toolbox.xml". La fin de nom du fichier doit se teriner ainsi.

// Pour charger la traduction des textes dans la langue désirée, mais sera non visible
// Création d'une balise : <div style="display:none" id="toolbox"></div>
if (!document.getElementById('toolbox')) {
  // Si la balise n'existe pas, on la crée.
  var toolboxElement = document.createElement('xml');
  toolboxElement.id = 'toolbox';
  toolboxElement.style = "display:none";
  document.body.appendChild(toolboxElement);
  }

// Utilisation de AJAX pour obtenir les textes dans la langue désirée.
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
//"""""""""""""""""""""""""""""""""""""
  if (xhttp.readyState == 4) { // && xhttp.status == 200) {
    // Le document a été chargé, on peut modifier le contenu de la balise <div id="idLang">
    document.getElementById('toolbox').innerHTML = xhttp.responseText;   
    TranslateBlockly();
    }
  };   
  
// La méthode GET est généralement préférable, mais limite la taille du fichier à 8 ko, parfois 2 ko.
// La limite provient du fait que les données sont transmises via l'URL.
xhttp.open("POST", strFile + "_toolbox.xml", true); // true indique que l'appel est asynchrone.
//xhttp.open("POST", strLang, true); // true indique que l'appel est asynchrone.
xhttp.send();  
} // Include_toolbox

function Include_startBlocks(strFile) {
//=====================================
// Charge le fichier contenant les StartBlocks, si désiré
// strFile est le début du nom du fichier .xml contenant la startBlocks liste
// C'est la partie qui précède : "_startBlocks.xml". La fin de nom du fichier doit se teriner ainsi.

// Pour charger la traduction des textes dans la langue désirée, mais sera non visible
// Création d'une balise : <div id="idDivStartBlocks" style="display:none"></div>
if (!document.getElementById("idDivStartBlocks")) {
  // Si la balise n'existe pas, on la crée.
  var startBlocksElement = document.createElement('div');
  startBlocksElement.id = "idDivStartBlocks";
  startBlocksElement.style = "display:none";
  document.body.appendChild(startBlocksElement);
  }

// Utilisation de AJAX pour obtenir les textes dans la langue désirée.
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
//"""""""""""""""""""""""""""""""""""""
  if (xhttp.readyState == 4) { // && xhttp.status == 200) {
    // Le document a été chargé, on peut modifier le contenu de la balise <div id="idLang">
    var divStartBlocksElement = document.getElementById("idDivStartBlocks");
    
    // Ajoute dans la balise <div> le bloc <xml> définissant les StartBlocks
    var strResponseText = xhttp.responseText;
    divStartBlocksElement.innerHTML = strResponseText;

    var xmlStartBlocksElement = divStartBlocksElement.firstElementChild; // l'élément <xml> normalement
    
    // Test que l'on a bien la balise <xml> désirée
    var strS = xmlStartBlocksElement.getAttribute("xmlns");

    if ( (strS != null) && (strS.length > 10) && (strS.substring(0,10) == "http://www") ) {
      // On ajoute une id et on cache le contenu de la balise
      xmlStartBlocksElement.id = "idStartBlocks";
      xmlStartBlocksElement.style = "display:none";
      }
    else {
      // Cas non normal, on charge les blocs en ajoutant la balise <xml>
      //alert("Il manque probablement l'attribut xmlns = 'http://www.w3.org/1999/xhtml' dans le fichier ..._startBlocks.xml");

      // On efface le contenu de la <div> "idDivStartBlocks"
      divStartBlocksElement.innerHTML = "";
      
      // On ajoute la balise <xml> pour inclure les StartBlocks
      // On ajoute également une id et on cache le contenu de la balise
      xmlStartBlocksElement = document.createElement('xml');
      xmlStartBlocksElement.id = "idStartBlocks";
      xmlStartBlocksElement.style = "display:none";
      document.body.appendChild(xmlStartBlocksElement);
      
      xmlStartBlocksElement.innerHTML = strResponseText;
      }
    
    // console.log(xmlStartBlocksElement.outerHTML); // Tests
    
    Include_toolbox(strFile);
    }
  };   
  
// La méthode GET est généralement préférable, mais limite la taille du fichier à 8 ko, parfois 2 ko.
// La limite provient du fait que les données sont transmises via l'URL.
xhttp.open("POST", strFile + "_startBlocks.xml", true); // true indique que l'appel est asynchrone.
//xhttp.open("POST", strLang, true); // true indique que l'appel est asynchrone.
xhttp.send();  
} // Include_startBlocks

// ###########################################################################

//************************************************************************
// Exécution du code à différentes vitesses.
//************************************************************************

function CommentOutCode(strCode) {
//================================
// Supprime tout ce qui n'est pas des
// définition de variables et de fonction.
// Pratiquement, supprime tout ce qui suit la définition de la dernière fonction.
// Ceci est utile pour exécuter une fonction définie dans les blocs de Blockly,
// lorsque l'on clique sur une carte, dans l'ex2000.
// C'est assez compliqué, car il faut faire un "parser", 
// qui reconnait une partie de la synthaxe javascipt, 
// pour détecter la fin de la fonction.
// Il peut y avoir des '{' et des '}' dans des commentaires ou des guillemets.

// Cherche la dernière occurence du mot 'function'
var nPos = strCode.lastIndexOf('function');

if (nPos > 0) {
  // la dernière occurence du mot 'function' a été trouvée
  // Cherche la fin de la fonction.
  nPos = strCode.indexOf('{', nPos); // Cherche la première '{'
  var nCount = 1;
  while ((nCount > 0) && (nPos < strCode.length-2)) { 
    // Cherche la fin de la fonction
    nPos++;
    if ( (strCode[nPos] == '{') && (strCode.charCodeAt(nPos+1) <= 13 ) ) {
      // L'accolade se termine par un retour à la ligne
      nCount++;
      }
    if (strCode[nPos] == '}') {
      if ( (strCode.charCodeAt(nPos+1) <= 13 ) || (strCode[nPos+1] == ' ') ) {  
        // L'accolade se termine par un retour à la ligne ou un espace.  Cas de la suite:   } else 
        nCount--;
        }
      }
    } // while
 
  // Supprime tout ce qui suit la dernière définition de fonction,
  // Donc ne garde que les caractères de 0 à nPos
  strCode = strCode.substr(0, nPos+1) + "\n";
  } // if

return strCode;
} // CommentOutCode

function ChangeSpeed(nValue, vCoef) {
//===================================
// Augmente ou diminue la vitesse de déplacement
gloB.nMoveStep += nValue; 
if (gloB.nMoveStep < 1) gloB.nMoveStep = 1; 

// Augmente ou diminue la vitesse d'illumination des blocs
gloB.nTimeMSBlocks = Math.round(gloB.nTimeMSBlocks * vCoef); 
if (gloB.nTimeMSBlocks < 1) gloB.nTimeMSBlocks = 1;
} // myMouseMove

function PauseCode() {
//====================
// Exécution du code en mode pause
Continue_execution(); // Pour arrêter la pause temporaire
gloB.fRunPause = true;
} // PauseCode

function StopCode() {
//====================
// Arrête l'exécution du code
gloB.fRunStop = true; 
gloB.fIsRunning = false;
gloB.fRunPause = false;
Continue_execution(); // Pour arrêter la pause temporaire
} // StopCode

function showCode_slow() {
//========================
// Generate JavaScript code and display it.
Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
var code = Blockly.JavaScript.workspaceToCode(gloB.demoWorkspace); 

window.document.idCodeJavascriptNameForm.idCodeJavascriptNameTextArea.value += code;
window.document.idCodeJavascriptNameForm.idCodeJavascriptNameTextArea.scrollTop = 100000;  // pour rester en fin du texte.
} // showCode_slow

function nextStep1() {
//===================
if ( (gloB.nTimerID1 != 0) || (gloB.nTimerID2 != 0) || gloB.fRunPause || gloB.fRunPause_temp ) {
  // Attend qu'il n'y ait plus d'animation pour continuer.
  window.setTimeout(nextStep, 5);
  }
else if ( (!gloB.fRunStop) && (gloB.myInterpreter.step()) ) {
  // Il n'y a plus d'image qui se déplace et il y a encore du code à exécuter.
  window.setTimeout(nextStep, gloB.nTimeMSBlocks);
  }
else {
  bgHighlightBlock(null); // Pour n'avoir aucun bloc illuminé à la fin.
  gloB.fIsRunning = false;
  gloB.fRunOneStep = false;
  if (gloB.funcRunFinished) gloB.funcRunFinished(); // Pour appeler une fonction à la fin de l'exécution
  }
} // nextStep1

function nextStep2() {
//===================
var fHasMoreCode = false;
var nCpt = 0;  // Une variable sentinelle, qui évite des boucles infinies.

if ( (gloB.nTimerID1 != 0) || (gloB.nTimerID2 != 0) || gloB.fRunPause || gloB.fRunPause_temp) {
  // Attend qu'il n'y ait plus d'animation pour continuer.
  window.setTimeout(nextStep, 5);
  }
//else if ( (!gloB.fRunStop) && (gloB.myInterpreter.step()) ) {
else { // Il n'y a plus d'image qui se déplace et il y a encore du code à exécuter.
  if (!gloB.fRunStop) {
    fHasMoreCode = gloB.myInterpreter.step();
    while (fHasMoreCode && (gloB.nTimerID1 == 0) && (gloB.nTimerID2 == 0) && !gloB.fRunPause && !gloB.fRunPause_temp &&  !gloB.fRunStop && (nCpt < 25000)) {
      // Exécute rapidement les instructions, tant qu'il n'y a pas d'animation
      nCpt += 1;
      fHasMoreCode = gloB.myInterpreter.step();
      }

    if (fHasMoreCode &&  !gloB.fRunStop) {
      window.setTimeout(nextStep, 1);
      }
    else {
      bgHighlightBlock(null); // Pour n'avoir aucun bloc illuminé à la fin.
      gloB.fIsRunning = false;
      gloB.fRunOneStep = false;
      if (gloB.funcRunFinished) gloB.funcRunFinished(); // Pour appeler une fonction à la fin de l'exécution
      }
    }
  else {
    bgHighlightBlock(null); // Pour n'avoir aucun bloc illuminé à la fin.
    gloB.fIsRunning = false;
    gloB.fRunOneStep = false;
    if (gloB.funcRunFinished) gloB.funcRunFinished(); // Pour appeler une fonction à la fin de l'exécution
    }
  }
} // nextStep2

function nextStep() {
//===================
if      (gloB.nInterpreterSpeed == 1) nextStep1();
else if (gloB.nInterpreterSpeed <= 3) nextStep2();
else if ( (gloB.nTimerID1 != 0) || (gloB.nTimerID2 != 0) ) nextStep2(); // Attend que les animations soient terminées pour aller à vitesse maximale
else if (gloB.nInterpreterSpeed == 4) {
  gloB.myInterpreter.run(); // si on veut une exécution sans pauses.
  gloB.fIsRunning = false;
  gloB.fRunOneStep = false;
  bgHighlightBlock(null); // Pour n'avoir aucun bloc illuminé à la fin.
  }
else { // gloB.nInterpreterSpeed == 5
  var code = Blockly.JavaScript.workspaceToCode(gloB.demoWorkspace);
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  eval(code); // N'utilise pas l'interpréteur : 'acorn_interpreter.js', mais exécute le code rapidement.
  gloB.fIsRunning = false;
  gloB.fRunOneStep = false;
  bgHighlightBlock(null); // Pour n'avoir aucun bloc illuminé à la fin.
  }
} // nextStep

function runCode_slow(nSpeed, timeMS) {
//=====================================
// Exécute le code javascript lentement.
// timeMS est le temps en millisecondes entre deux affichages.

gloB.nInterpreterSpeed = nSpeed;
gloB.nTimeMSBlocks = timeMS;
gloB.fRunPause = false;
Continue_execution(); // Pour arrêter la pause temporaire
if (gloB.fIsRunning) { gloB.fRunOneStep = false; return; }

// Si un timer est en route, l'arrêter.
if (gloB.nTimerID1 != 0) window.clearTimeout(gloB.nTimerID1);
gloB.nTimerID1 = 0;
if (gloB.nTimerID2 != 0) window.clearTimeout(gloB.nTimerID2);
gloB.nTimerID2 = 0;

window.LoopTrap = 1000;
Blockly.JavaScript.INFINITE_LOOP_TRAP =
    'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
//Blockly.JavaScript.addReservedWords('code'); // c.f. : https://developers.google.com/blockly/guides/app-integration/running-javascript
var code = Blockly.JavaScript.workspaceToCode(gloB.demoWorkspace);
Blockly.JavaScript.INFINITE_LOOP_TRAP = null;

// Si désiré, on met en commentaire tout ce qui n'est pas des
// définition de variables et de fonction, puis on ajoute du code javascript à la fin.
// En générale, ce code ajouté exécutera une fonction définie dans les blocs de Blockly.
if (gloB.strCodeAddEnd != "") code = CommentOutCode(code) + gloB.strCodeAddEnd;

gloB.strCodeAddEnd = ""; // Le code est enlevé pour la prochaine exécution.

try {
  gloB.fRunStop = false;
  gloB.fIsRunning = true;  
  gloB.myInterpreter = new Interpreter(code, initApi);
  
  if (gloB.nInterpreterSpeed <= 3) nextStep();
  else {
    if (gloB.nInterpreterSpeed == 4) gloB.myInterpreter.run(); // Exécution sans pauses.
    else eval(code); // N'utilise pas l'interpréteur : 'acorn_interpreter.js', mais exécute le code rapidement.
    gloB.fIsRunning = false;
    gloB.fRunOneStep = false;
    bgHighlightBlock(null); // Pour n'avoir aucun bloc illuminé à la fin.
    }
  } 
catch (e) {
  alert(e);
  }
} // runCode_slow

function runOneStep(nSpeed) {
//===========================
// Si nSpeed == 0, utilise le paramètre gloB.nInterpreterStepSpeed
gloB.fRunOneStep = true;
gloB.fRunPause = false; // Permet ainsi l'exécution d'un pas;
Continue_execution(); // Pour arrêter la pause temporaire
if (nSpeed == 3) gloB.nInterpreterSpeed = 3;
if (nSpeed == 2) gloB.nInterpreterSpeed = 2;
if (nSpeed == 1) gloB.nInterpreterSpeed = 1; 
if (nSpeed == 0) gloB.nInterpreterSpeed = gloB.nInterpreterStepSpeed; // Sinon, on ne change rien

if (!gloB.fIsRunning) runCode_slow(gloB.nInterpreterSpeed, 10);
} // runOneStep

function runMyCode_slow(code, timeMS) {
//=====================================
// Exécute le code javascript lentement.
// timeMS est le temps en millisecondes entre deux affichages.
gloB.nTimeMSBlocks = timeMS;

try {
  gloB.fRunPause = false;
  Continue_execution(); // Pour arrêter la pause temporaire
  gloB.fRunStop = false;
  gloB.fIsRunning = true;  
  gloB.myInterpreter = new Interpreter(code, initApi);
  
  if (gloB.nInterpreterSpeed <= 3) nextStep();  
  else {
    if (gloB.nInterpreterSpeed == 4) gloB.myInterpreter.run(); // Exécution sans pauses.
    else eval(code); // N'utilise pas l'interpréteur : 'acorn_interpreter.js', mais exécute le code rapidement.
    gloB.fIsRunning = false;
    bgHighlightBlock(null); // Pour n'avoir aucun bloc illuminé à la fin.
    }
  } 
catch (e) {
  alert(e);
  }
} // runMyCode_slow

function initApi(interpreter, scope) {
//====================================
// Add an API function for highlighting blocks.
// c.f. https://developers.google.com/blockly/guides/app-integration/running-javascript#js_interpreter
// Exemples, c.f. 
// https://blockly-demo.appspot.com/static/demos/interpreter/step-execution.html
// https://blockly-demo.appspot.com/static/demos/interpreter/async-execution.html
var wrapper;
        
// Si on désire avoir l'illumination des blocs
wrapper = function(id) { return bgHighlightBlock(id);  };
interpreter.setProperty(scope, 'bgHighlightBlock', interpreter.createNativeFunction(wrapper) );

// Add an API function for the alert() block, generated for "text_print" blocks.
wrapper = function(strText) { return alert(strText); };
interpreter.setProperty(scope, 'alert', interpreter.createNativeFunction(wrapper));

// Add an API function for the prompt() block.
wrapper = function(text) {
        text = text ? text.toString() : '';
        return interpreter.createPrimitive(prompt(text));
      };
interpreter.setProperty(scope, 'prompt', interpreter.createNativeFunction(wrapper));

// Ajoute une 'API function' pour le  block 'Display'
wrapper = function(text) { return Display(arguments.length ? text : ''); };
interpreter.setProperty(scope, 'Display', interpreter.createNativeFunction(wrapper));

// Ajoute une 'API function' pour le  block
wrapper = function() { return text_affiche_efface(); };
interpreter.setProperty(scope, 'text_affiche_efface', interpreter.createNativeFunction(wrapper));

// Ajoute une 'API function' pour le  block
wrapper = function(vTime, strSpeed) { return Pause_execution(vTime, strSpeed); };
interpreter.setProperty(scope, 'Pause_execution', interpreter.createNativeFunction(wrapper));

wrapper = function(vTime, strVariableName, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9, va, vb, vc, vd, ve, vf, vg, vh) 
              { return Variable_Spy(vTime, strVariableName, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9, va, vb, vc, vd, ve, vf, vg, vh); };
interpreter.setProperty(scope, 'Variable_Spy', interpreter.createNativeFunction(wrapper));

if (gloB.funcAfterInitApi) gloB.funcAfterInitApi(interpreter, scope);
} // initApi

// ###########################################################################

// ******************************************************************************************
// Définition des fonctionnalités des nouveaux blocs
// ******************************************************************************************

function Display(strInfo) {
//=========================
// Ecrit dans une partie de la fenêtre, divers informations.
// La forme "idDisplayNameForm" a été définie dans la page HTML. 
// sous la définition de la '<div id="idAffichage" ...'.
var myMessage = window.document.idDisplayNameForm.idDisplayNameTextArea.value;
myMessage = myMessage + strInfo;
window.document.idDisplayNameForm.idDisplayNameTextArea.value = myMessage;
window.document.idDisplayNameForm.idDisplayNameTextArea.scrollTop = 100000;  // pour rester en fin du texte.
/// window.document.idDisplayNameForm.idDisplayNameTextArea.scrollBy(10,0);  pas correcte !?!
} // Display

function Displayln(strInfo) {
//===========================
Display(strInfo + '\n');
} // Displayln

function text_affiche_efface() {
//==============================
// Efface le contenu de la fenêtre d'affichage des programmes javascript, Python, Lua, etc.
window.document.idDisplayNameForm.idDisplayNameTextArea.value = '';
}

function Continue_execution() {
//=============================
// Termine la pause de l'exécution.
// Initialise ce qu'il faut, même s'il n'y avait pas de pause.
if (gloB.nTimerID_temp != 0) window.clearTimeout(gloB.nTimerID_temp);
gloB.nTimerID_temp = 0;
gloB.fRunPause_temp = false; 
} // Continue_execution

function Pause_execution(vTime, strSpeed) {
//=========================================
// Permet de mettre l'exécution en pause durant vTime secondes.
// strSpeed indique à quelle vitesse continuer ensuite.
if ( (gloB.nInterpreterSpeed <= 3) && (vTime > 0)) {
  // Fait une pause, d'une durée de vTime secondes.
  if (gloB.nTimerID_temp != 0) window.clearTimeout(gloB.nTimerID_temp);
  gloB.nTimerID_temp = window.setTimeout(Continue_execution, Math.round(vTime*1000));
  gloB.fRunPause_temp = true; // Pour arrêter l'exécution durant nTime secondes
  }

if (strSpeed == 'SLOW') gloB.nInterpreterSpeed = 1;
if (strSpeed == 'MEDIUM') gloB.nInterpreterSpeed = 2;
if (strSpeed == 'FAST') gloB.nInterpreterSpeed = 3;
} // Pause_execution

function Variable_Spy(vTime, strVariablesName, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9, va, vb, vc, vd, ve, vf, vg, vh) {
//======================================================================================================================
// On est obligé d'envoyer chaque variable séparément, on ne peut pas les envoyer dans un tableau.
// Ecrit dans une partie de la fenêtre, divers informations.
// La forme "idVariableSpyNameTextArea" a été définie dans la page HTML. 
// sous la définition de la '<div id="idVariableSpy" ...'.
// vTime = temps de pause en secondes

if (strVariablesName != "0") {
  // Il y a des variables à afficher
  var aData = strVariablesName.split(", "); // Récupère les noms des différentes variables.
  var strMsg  = '';

// Longue suite, mais difficile de faire autrement à cause des v_j
  if (aData.length >  0) strMsg  = aData[ 0] + " : " + v0 + "\n";
  if (aData.length >  1) strMsg += aData[ 1] + " : " + v1 + "\n";
  if (aData.length >  2) strMsg += aData[ 2] + " : " + v2 + "\n";
  if (aData.length >  3) strMsg += aData[ 3] + " : " + v3 + "\n";
  if (aData.length >  4) strMsg += aData[ 4] + " : " + v4 + "\n";
  if (aData.length >  5) strMsg += aData[ 5] + " : " + v5 + "\n";
  if (aData.length >  6) strMsg += aData[ 6] + " : " + v6 + "\n";
  if (aData.length >  7) strMsg += aData[ 7] + " : " + v7 + "\n";
  if (aData.length >  8) strMsg += aData[ 8] + " : " + v8 + "\n";
  if (aData.length >  9) strMsg += aData[ 9] + " : " + v9 + "\n";
  if (aData.length > 10) strMsg += aData[10] + " : " + va + "\n";
  if (aData.length > 11) strMsg += aData[11] + " : " + vb + "\n";
  if (aData.length > 12) strMsg += aData[12] + " : " + vc + "\n";
  if (aData.length > 13) strMsg += aData[13] + " : " + vd + "\n";
  if (aData.length > 14) strMsg += aData[14] + " : " + ve + "\n";
  if (aData.length > 15) strMsg += aData[15] + " : " + vf + "\n";
  if (aData.length > 16) strMsg += aData[16] + " : " + vg + "\n";
  if (aData.length > 17) strMsg += aData[17] + " : " + vh + "\n";
      
  window.document.idVariableSpyNameForm.idVariableSpyNameTextArea.value = strMsg;
  }
  
// Attente avant de continuer l'exécution du programme
Pause_execution(vTime, '');
} // Variable_Spy

// ******************************************************************************************
// Définition de nouveaux blocs et du code javascript et parfois python qui leur est associé.
// ******************************************************************************************

// Adjonction de blocs permettant d'afficher du texte dans la fenêtre
//********************************************************************
Blockly.Blocks['text_affiche'] = {
//================================
init: function() {
  this.jsonInit({
    "type": "text_affiche",
    "message0": bgBlockly.Msg['TEXT_AFFICHE_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour":  bgBlockly.Msg['TEXTS_HUE'],
    "tooltip": bgBlockly.Msg['TEXT_AFFICHE_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['TEXT_AFFICHE_HELPURL']
    });
  }
};
Blockly.JavaScript['text_affiche'] = function(block) {
//====================================================
// Print statement.
var msg = Blockly.JavaScript.valueToCode(block, 'TEXT',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
return "Display(" + msg + ");\n";
};

Blockly.Blocks['text_afficheln'] = {
//==================================
// Définit l'aspect du bloc
init: function() {
  this.jsonInit({
    "type": "text_afficheln",
    "message0": bgBlockly.Msg['TEXT_AFFICHELN_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour":  bgBlockly.Msg['TEXTS_HUE'],
    "tooltip": bgBlockly.Msg['TEXT_AFFICHELN_TOOLTIP'],
    "helpUrl": bgBlockly.Msg['TEXT_AFFICHELN_HELPURL']
    });
  }
};
Blockly.JavaScript['text_afficheln'] = function(block) {
//======================================================
// Défini la fonctionnalité du bloc
var msg = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_NONE) || '\'\'';
return "Display(" + (  msg + "+'\\n'") + ");\n"; // Insertion d'un retour de ligne à la fin de l'affichage : "\n"
};

Blockly.Blocks['text_comment'] = {
//================================
// Définit l'aspect du bloc
init: function() {
  this.jsonInit({
    "type": "text_comment",
    "message0": bgBlockly.Msg['TEXT_COMMENT_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "COMMENT"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": bgBlockly.Msg['TEXT_COMMENT_COLOR'],
    "tooltip": bgBlockly.Msg['TEXT_COMMENT_TOOLTIP'],
    "helpUrl": ""
    });
  }
};
Blockly.JavaScript['text_comment'] = function(block) {
//====================================================
// Défini la fonctionnalité du bloc
var msg = Blockly.JavaScript.valueToCode(block, 'COMMENT', Blockly.JavaScript.ORDER_ATOMIC) || '\'\'';

// Enlève les guillmets placés automatiquement au début et en fin.
msg = msg.substr(1, msg.length-2); 
// Remplace le  \\  par un  \
msg = msg.replace(/\\\\/g, '\\'); //
// Remplace le  \'  par un  '
msg = msg.replace(/\\\'/g, '\'');
return "// " + msg + "\n"; 
};

Blockly.Blocks['text_affiche_efface'] = {
//=======================================
// Pour effacer l'affichage
init: function() {
  this.jsonInit({
    "message0": bgBlockly.Msg['TEXT_AFFICHE_EFFACE_TITLE'],
    "previousStatement": null,
    "nextStatement": null,
    "colour":  bgBlockly.Msg['TEXTS_HUE'],
    "tooltip": bgBlockly.Msg['TEXT_AFFICHE_EFFACE_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['TEXT_AFFICHE_EFFACE_HELPURL']
    });
  }
};
Blockly.JavaScript['text_affiche_efface'] = function(block) {
//===========================================================
// Un bloque pour effacer l'affichage
return "text_affiche_efface();\n";
};

Blockly.Blocks['text_pause'] = {
//==============================
// Définit l'aspect du bloc
init: function() {
  this.jsonInit({
    "type": "text_pause",
    "message0": bgBlockly.Msg['TEXT_PAUSE_TITLE'],
    "args0": [
       {
         "type": "input_value",
         "name": "TIME",
         "check": "Number"
       },
       {
         "type": "field_dropdown",
         "name": "SPEED",
         "options": [
           [
             bgBlockly.Msg["TEXT_PAUSE_SPEED_NONE"],
             "NONE"
           ],
           [
             bgBlockly.Msg["TEXT_PAUSE_SPEED_SLOW"],
             "SLOW"
           ],
           [
             bgBlockly.Msg["TEXT_PAUSE_SPEED_MEDIUM"],
             "MEDIUM"
           ],
           [
             bgBlockly.Msg["TEXT_PAUSE_SPEED_FAST"],
             "FAST"
           ]
         ]
       }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": bgBlockly.Msg['TEXT_PAUSE_COLOR'],
    "tooltip": bgBlockly.Msg['TEXT_PAUSE_TOOLTIP'],
    "helpUrl": bgBlockly.Msg['TEXT_PAUSE_HELPURL']
    });
  }
};
Blockly.JavaScript['text_pause'] = function(block) {
//==================================================
// Défini la fonctionnalité du bloc
var vTime = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_ATOMIC) || '\'\'';
var strSpeed = block.getFieldValue('SPEED');

return "Pause_execution( " + vTime + ", '" + strSpeed + "');\n"; 
};

Blockly.Blocks['variable_spy'] = {
//================================
init: function() {
  this.jsonInit({
    "type": "variable_spy",
    "message0": bgBlockly.Msg['VARIABLE_SPY_TITLE'],
    "args0": [
      {
         "type": "input_value",
         "name": "TIME",
         "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour":  bgBlockly.Msg['VARIABLE_SPY_HUE'],
    "tooltip": bgBlockly.Msg['VARIABLE_SPY_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['VARIABLE_SPY_HELPURL']
    });
  }
};
Blockly.JavaScript['variable_spy'] = function(block) {
//====================================================
// Print statement.
var vTime = Blockly.JavaScript.valueToCode(block, 'TIME',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

// Liste de toutes les variables :
// c.f. https://developers.google.com/blockly/reference/js/Blockly.WorkspaceSvg?hl=th#getVariableMap
// c.f. https://developers.google.com/blockly/reference/js/Blockly.VariableMap#getVariable
var oVarMap = gloB.demoWorkspace.getVariableMap();
var aoVar = oVarMap.getAllVariables();
var msg1 = "";

// N'ajoute que les variables qui sont utilisées
// c.f. https://developers.google.com/blockly/reference/js/Blockly.VariableMap#getVariableUsesById
for (var nn=0; nn<aoVar.length; nn++) {
  if (oVarMap.getVariableUsesById(aoVar[nn].getId()).length > 0) {
    if (msg1 != '') msg1 += ', '; // Pour placer des virgules entre les variables
    msg1 += aoVar[nn].name;
    }
  }

if (msg1 == '') msg1 = '0'; // pour indiquer qu'il n'y a rien à afficher.

return "Variable_Spy(" + vTime + ", '" + msg1 + "', " + msg1 + ");\n";
//return "Variable_Spy(" + aoVar + ", " + aoVar[0].name + ", " + vTime + ");\n"; // NE MARCHE PAS
};

Blockly.Blocks['text_parse_to_number'] = {
//========================================
init: function() {
  this.jsonInit({
    "type":"text_parse_to_number",
    "message0": bgBlockly.Msg['TEXT_PARSE_NUMBER_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "STR",
        "check":"String"
      },
       {
         "type": "field_dropdown",
         "name": "TYPE",
         "options": [
           [
             bgBlockly.Msg["TEXT_PARSE_NUMBER_INT"],
             "INT"
           ],
           [
             bgBlockly.Msg["TEXT_PARSE_NUMBER_FLOAT"],
             "FLOAT"
           ]
         ]
       }
    ],
    "output": "Number",
    "colour":  bgBlockly.Msg['TEXTS_HUE'],
    "tooltip": bgBlockly.Msg['TEXT_PARSE_NUMBER_TOOLTIP'], 
    "helpUrl": bgBlockly.Msg['TEXT_PARSE_NUMBER_HELPURL']
    });
  }
};
Blockly.JavaScript['text_parse_to_number'] = function(block) {
//============================================================
// Transforme une chaine de caractère (un string) en un nombre
// Nombre entier si TYPE == 'INT'
// Nombre à virgule si TYPE == 'FLOAT'
// 0 sinon.
var strS = Blockly.JavaScript.valueToCode(block, 'STR',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
var strType = block.getFieldValue('TYPE');

if (strType == 'INT') {
  return ["parseInt(" + strS + ")", Blockly.JavaScript.ORDER_FUNCTION_CALL]; // c.f. blockly/generators/javascript/math.js
  }
else if (strType == 'FLOAT') {
  return ["parseFloat(" + strS + ")", Blockly.JavaScript.ORDER_FUNCTION_CALL]; // c.f. blockly/generators/javascript/math.js
  }
else {
  return ["parseInt('0')", Blockly.JavaScript.ORDER_FUNCTION_CALL]; // c.f. blockly/generators/javascript/math.js
  }
};
