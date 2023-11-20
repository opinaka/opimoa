// Adjonction de fonctionnalités à Blockly
// #######################################

// c.f. https://developers.google.com/blockly/guides/app-integration/running-javascript
//"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

var demoWorkspace; // Cette variable doit être global.
var glfRunStop = false; // Pour permettre l'arrêt de l'exécution
var glfRunPause = false; // Pour mettre l'exécution en mode pause
var glfRunOneStep = false; // Pour exécuter pas à pas
var glfIsRunning = false; // Indique si du code est en cours d'exécution on non.
var glnMoveStep = 1; // Pas de déplacement. Peut être agrandi, pour accélérer.
var glnAccelerate = 1; // Pour accélérer les mouvement, utile dans les mélanges.
var glnInterpreterSpeed = 1; // Détermine la vitesse d'exécution
    // Si == 1, vitesse avec illumination de chaque bloc
    // Si == 2, vitesse en illuminant que les blocs impliquant un mouvement, qui fait appelle au timer
    // Si == 3, vitesse est maximale, sans animations, donc sans aucun appel au timer.
    // Si == 4, vitesse est maximale, sans animations, donc sans aucun appel au timer. utilise : "eval(code);"
var glnTimeMSBlocks = 10; // Temps en [ms] entre deux appels à : "myInterpreter.step();", si "glnInterpreterSpeed == 1"

// Ce qui suit permet de déplacer les fenêtres dans la fenêtre de Blockly
// ********* !!! Ajouter l'instuction : "onmousemove="myMouseMove(event);" à la balise <body> !!!! *****
var gloDivSel = 0; // pointeur sur le div lorsqu'il est sélectionné
var glnXOffset = 0; // décalage entre le clique souris et la gauche de la fenetre
var glnYOffset = 0; // décalage
var glnZIndex = 1000; // Pour définir quelle fenêtre est au-dessus de quelle autre.

var glnTimerID1 = 0;  // indiquera le numéro du timer actif, pour l'animation
var gloImageBouge = null;  // référence à l'image en déplacement
var glnStartPosX = 0; // Position de départ
var glnStartPosY = 0; 
var glnStopPosX = 0; // Position d'arrivée
var glnStopPosY = 0; 
var gloImageBouge2 = null;  // référence à la deuxième image en déplacement, lors d'un échange d'images
var glnStartPosX2 = 0; // Position de départ
var glnStartPosY2 = 0; 
var glnStopPosX2 = 0; // Position d'arrivée
var glnStopPosY2 = 0; 

var NMAXCARD = 10; // Nombre de cartes
var glnTimerID2 = 0;  // indiquera le numéro du timer actif pour le mélange
var glnMixCount = 1; // Compte le nombre de mélange
var glnMixDestination = NMAXCARD+1; // Desination de la carte, pour les mélanges

var myInterpreter = null; /// Pour utiliser l'interpréteur javascript, qui permet une exécution au ralenti.

var glstrbgLanguage = ''; // Pour le choix de la langue du document

var gloLanguages = new bgBlocklyLanguageList; // Objet contenant la liste des langues chargées

function bgBlocklyLanguageList() {
//===============================
// Pour avoir un objet qui contient la liste des langues chargées.
// Se remplira au fur et à mesure que l'on visualise différentes langues.
//this.fr = 'fr';
}
  
function TranslateAllAfterDownload(strLang) {
//===========================================
// Les textes de la langue désirée sont en mémoire.
// Applique les traductions.

//Display(gloLanguages[strLang].HTML_WIN_TITLE + '\n');
//Display(gloLanguages[strLang]['HTML_WIN_TITLE'] + '\n');
//Display(gloLanguages[strLang].length + '\n'); // undefined

if (!demoWorkspace) return; // Au démarrage, rien à faire, 'demoWorkspace' n'est pas encore défini.

// Parcours tous les éléments de l'objet pour traduire les textes
var oo;
var oBalise;
for (oo in gloLanguages[strLang]) {  
  oBalise = document.getElementById(oo);
  if (oBalise) oBalise.innerHTML = gloLanguages[strLang][oo];
  //Display('[' + oo + '] : ' +  gloLanguages[strLang][oo] + '\n'); // Pour des tests
  }

// Reste à traduire les "title" des boutons
//
////Display(document.getElementById('toolbox').innerHTML + '\n');

/*
for (oo in Blockly.Msg) {  
  ////Display('[' + oo + '] : ' +  Blockly.Msg[oo] + '\n'); // Pour des tests
  }
*/

//demoWorkspace.getToolbox().dispose();  // Pour effacer la toolbox
//demoWorkspace.getToolbox().HtmlDiv = document.getElementById('toolbox');
// demoWorkspace.refreshToolboxSelection();

 
//Il semble qu'un bug de Blockly empêche de traduire la toolbox et les blocs présents,
//sans recharger toute la page. Dommage.

// Presque tout est traduit, sauf quelques textes de 'Math'. comme 'racine carrée'
// Est-ce un bug de Blockly ?
//demoWorkspace.toolbox = document.getElementById('toolbox');
//demoWorkspace.getToolbox().HtmlDiv = document.getElementById('toolbox'); 
demoWorkspace.updateToolbox(document.getElementById('toolbox'));
//demoWorkspace.refreshToolboxSelection();
alert(document.getElementById('toolbox').innerHTML);

// S'il y a des blocs définis, les sauvegarde, pour les recharger au démarrage.
var strText = GetXML_code();
demoWorkspace.clear();  // Enlève tous les blocs, c.f. : https://developers.google.com/blockly/reference/js/Blockly.WorkspaceSvg#cleanUp

var xml = Blockly.Xml.textToDom(strText);
Blockly.Xml.domToWorkspace(xml, demoWorkspace);  

// Efface la balise contenant la définition de la toolbox
document.body.removeChild(document.getElementById('toolbox'));
} // TranslateAllAfterDownload

function TranslateNext() {
//========================
// Pour traduire les textes de l'application dans la langue désirée.  
// glstrbgLanguage = 'de' ou strLang = 'en' ou strLang = 'fr'
// Si la langue désirée n'a jamais été appelée, 
// le fichier en javascript contenant les textes traduits est ouvert
// par Dynamic Script Loading.
// Sinon, les textes traduits sont déjà présents, il suffit d'appliquer les traductions.

//if (!gloLanguages[strLang]) {   
    var scriptElement = document.createElement('script');
    scriptElement.src = 'msg/js/' + glstrbgLanguage + '.js';
    document.body.appendChild(scriptElement);
//  }
//else TranslateAllAfterDownload(strLang);
} // TranslateNext


function Include_toolbox_again(strFile) {
//======================================
// Charge le fichier contenant la toolbox
// strFile est le début du nom du fichier .xml contenant la startBlocks liste
// C'est la partie qui précède : "_toolbox.xml". La fin de nom du fichier doit se teriner ainsi.

// Pour charger la traduction des textes dans la langue désirée, mais sera non visible
// Création d'une balise : <div style="display:none" id="toolbox"></div>
if (!document.getElementById('toolbox')) {
  // Si la balise n'existe pas, on la crée.
  var toolboxElement = document.createElement('xml');
  toolboxElement.id = 'toolbox';
  toolboxElement.style = "display:none";
  document.body.appendChild(toolboxElement);
  alert(toolboxElement.id);
  }

// Utilisation de AJAX pour obtenir les textes dans la langue désirée.
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
//"""""""""""""""""""""""""""""""""""""
  if (xhttp.readyState == 4) { // && xhttp.status == 200) {
    // Le document a été chargé, on peut modifier le contenu de la balise <div id="idLang">
    document.getElementById('toolbox').innerHTML = xhttp.responseText;
    alert(document.getElementById('toolbox').innerHTML);
    TranslateNext();
    }
  };   
  
// La méthode GET est généralement préférable, mais limite la taille du fichier à 8 ko, parfois 2 ko.
// La limite provient du fait que les données sont transmises via l'URL.
xhttp.open("POST", strFile + "_toolbox.xml", true); // true indique que l'appel est asynchrone.
//xhttp.open("POST", strLang, true); // true indique que l'appel est asynchrone.
xhttp.send();  
} // Include_toolbox_again


function TranslateAll(strLang) {
//==============================
// Charge le fichier de la langue

// Utilisation de AJAX pour obtenir les textes dans la langue désirée.
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
//"""""""""""""""""""""""""""""""""""""
  if (this.readyState == 4) { // && this.status == 200) {
    // Charge la langue désirée, définie dans "strLang". Soit 'fr' ou 'en' ou 'de' ou 'es' ou etc.
    if (this.status < 400) eval(this.responseText); // Si le fichier n'existe pas, il y a une erreur 404
    Include_toolbox_again('ex0820');
    }
  };   
 
// La méthode GET est généralement préférable, mais limite la taille du fichier à 8 ko, parfois 2 ko.
// La limite provient du fait que les données sont transmises via l'URL.
glstrbgLanguage = strLang;
var strFile = "../../msg/js/" + strLang + ".js";
xhttp.open("POST", strFile, true); // true indique que l'appel est asynchrone.
xhttp.send();  
} // TranslateAll


// #############################################################################

function highlightBlock(id) {
//===========================
// Pour que les blocks exécutés soient illuminés.
demoWorkspace.highlightBlock(id);
} // highlightBlock

function onchange(event) {
//========================
// Appelé à chaque changement de l'espace de Blockly
// Si l'idBlocklyCoundUsed existe, 
// place le nombre de blocs utilisé dans le contenu de la balise ayatn cette id.
var oIdText = document.getElementById('idBlocklyCoundUsed');
if (oIdText != null) oIdText.innerHTML = 10000 - demoWorkspace.remainingCapacity();
} // onchange

// Cette fonction est exécutée depuis : "xhttp.onreadystatechange = function() {"
// Juste après que la toolbox ait été chargée.
function RunBlockly() {
//===================== 
// C'est ici que l'on insert les fonctionnalités Blockly
demoWorkspace = Blockly.inject('blocklyDiv',
    {media: '../../media/',
     maxBlocks: 10000, // On suppose que l'on atteindra jamais les 10000 blocs.
     toolbox: document.getElementById('toolbox')});

// C'est ici que l'on indique d'ajouter des blocs a l'ouverture de la page
Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), demoWorkspace);

// Efface la balise contenant la définition de la toolbox
document.body.removeChild(document.getElementById('toolbox'));


// S'il y a des blocs définis, les recharge au démarrage.
var strText = sessionStorage.getItem("blockly_startBlocks"); // strText == null si pas trouvé.

if ( strText && (strText.length > 10) ) {
  // Il y a des blocs à récupérer suite à un changement de langue
  // Le texte spécifique aux blocs qui viennents d'être écrit, ne peut pas être traduit.
  demoWorkspace.clear();  // Enlève tous les blocs, c.f. : https://developers.google.com/blockly/reference/js/Blockly.WorkspaceSvg#cleanUp
  var xml = Blockly.Xml.textToDom(strText);
  Blockly.Xml.domToWorkspace(xml, demoWorkspace);
  
  // Efface ce qui a été récupéré
  sessionStorage.removeItem('blockly_startBlocks');
  }

// Ces lignes indique à Blockly d'illuminer les blocks exécutés.
Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
Blockly.JavaScript.addReservedWords('highlightBlock');

demoWorkspace.addChangeListener(onchange);
onchange();  
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
var xml = Blockly.Xml.workspaceToDom(demoWorkspace);
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
  Blockly.Xml.domToWorkspace(xml, demoWorkspace);    
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
  Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n'; // Permet dajouter la commande d'illumination des blocs.
  }  
if (strSel == 'without_highlight') {
  document.getElementById('idMenuParametre_with_illumination').innerHTML = '&nbsp; ';
  document.getElementById('idMenuParametre_without_illumination').innerHTML = 'v ';
  Blockly.JavaScript.STATEMENT_PREFIX = ''; // Permet d'enlever la commande d'illumination des blocs.
  }  
} // parameter_select

// *************************************
// Gestion de déplacement de fenêtres.
// *************************************

function myMouseDown(myEvent, oAppelant, strDivName) {
//====================================================
// Permet de sélectionner un des  div  pour le déplacer.
glnZIndex++;
document.getElementById(strDivName).style.zIndex = glnZIndex;
if (oAppelant == null) return;

gloDivSel = document.getElementById(strDivName);
oAppelant.style.cursor='move';
glnXOffset = myEvent.pageX - parseInt(gloDivSel.style.left);
glnYOffset = myEvent.pageY - parseInt(gloDivSel.style.top);
} // myMouseDown

function myMouseMove(myEvent) {
//=============================
// Permet de déplacer le  div  si un a été sélectionné
if (gloDivSel != 0) {
   gloDivSel.style.left = myEvent.pageX - glnXOffset + "px";
   gloDivSel.style.top  = myEvent.pageY - glnYOffset + "px";
   }
} // myMouseMove

function ChangeSpeed(nValue, vCoef) {
//===================================
// Augmente ou diminue la vitesse de déplacement
glnMoveStep += nValue; 
if (glnMoveStep < 1) glnMoveStep = 1; 

// Augmente ou diminue la vitesse d'illumination des blocs
glnTimeMSBlocks = Math.round(glnTimeMSBlocks * vCoef); 
if (glnTimeMSBlocks < 1) glnTimeMSBlocks = 1;
} // myMouseMove

function PauseCode() {
//====================
// Exécution du code en mode pause
glfRunPause = true;
} // PauseCode

function StopCode() {
//====================
// Arrête l'exécution du code
glfRunStop = true; 
glfIsRunning = false;
} // StopCode

function eCode() {
//====================
// Exécution du code en mode pause
glfRunPause = true;
} // PauseCode
//#############################################################################3

//*************************
// Suite de fonction pour le chargement de blockly, avec :
// ° la toolbox
// ° la startBlocks
// ° les langues dans le fichier bgmsg/ .xml
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

function bgModifyLanguage() {
//===========================
// Après avoir chargé les fichiers de la langue désirée, 
// change les textes dans la langue désirée.

// contenant plusieurs balises <lang> contenant les textes traduits.
// c.f. msg/en.xml et msg/de.xml et msg/fr.xml
var nn = 0;
var aoText = null; // Pour référencer un ensemble de balises XML du fichier  'langue'.xml
var strId = '';    // Pour partourir les id des balises
var oHTML = null;  // Référence à un objet HTML

// Pour modifier le texte de la page HTML
aoText = document.getElementsByTagName("lang");  // aoText.length == 0, s'il n'y a rien

// Boucle sur toutes les balises "lang" de la page de traduction qui vient d'être chargée.
for (nn=0; nn<aoText.length; nn++) {
  strId = aoText[nn].getAttribute("id").substr(1,60);
  oHTML = document.getElementById(strId);
  if (oHTML != null) oHTML.innerHTML = aoText[nn].innerHTML;
  }

// Pour modifier les textes de la toolbox
// Il ne faut pas modifier le innerHTML, mais l'attribut 'name'
aoText = document.getElementsByTagName("lang2");  // aoText.length == 0, s'il n'y a rien

// Boucle sur toutes les balises "lang2" de la page de traduction qui vient d'être chargée.
for (nn=0; nn<aoText.length; nn++) {
  strId = aoText[nn].getAttribute("id").substr(1,60);
  oHTML = document.getElementById(strId);
  if (oHTML != null) oHTML.setAttribute('name', aoText[nn].innerHTML);
  }

// Change la langue sélectionnée dans la 'DropDown List' concernant les langues
var oLang = document.getElementById('idSelectLanguage');
if (oLang != null) oLang.value = glstrbgLanguage;

// Il serait possible de recharger la toolbox après avoir traduit automatiquement les textes désirés.
// c.f. https://developers.google.com/blockly/guides/configure/web/toolbox#changing_the_toolbox
//demoWorkspace.updateToolbox(newTree);  // newTree = "tree nodes" ???
} // bgModifyLanguage

function bgLoadLanguage_2(strLanguage) {
//======================================
// Charge le fichier personnel de la langue
// Pour charger la traduction des textes dans la langue désirée, mais sera non visible
// Création d'une balise : <div style="display:none" id="idLang"></div>
if (!document.getElementById("idLang")) {
  // Si la balise <div> ayant l'id "idLang" n'existe pas, on la crée.
  var divElement = document.createElement('div');
  divElement.id = "idLang";
  divElement.style = "display:none";
  document.body.appendChild(divElement);
  }

// Utilisation de AJAX pour obtenir les textes dans la langue désirée.
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  //===================================
  if (xhttp.readyState == 4) { // && xhttp.status == 200) {
    // Le document a été chargé, on peut modifier le contenu de la balise <div id="idLang">
    document.getElementById("idLang").innerHTML = xhttp.responseText;
    bgModifyLanguage(); // Effectue les modification des balises visibles, de langue.

    // Finalement, on démarre Blockly
    RunBlockly();
    }
  };   
  
// La méthode GET est généralement préférable, mais limite la taille du fichier à 8 ko, parfois 2 ko.
// La limite provient du fait que les données sont transmises via l'URL.
var strFile = "bgmsg/" + strLanguage + ".xml";
xhttp.open("POST", strFile, true); // true indique que l'appel est asynchrone.
//xhttp.open("POST", strLang, true); // true indique que l'appel est asynchrone.
xhttp.send();  
} // bgLoadLanguage_2

function bgLoadLanguage_1() {
//===========================
// Charge le fichier de la langue, s'il est défini dans l'URL

// Utilisation de AJAX pour obtenir les textes dans la langue désirée.
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
//"""""""""""""""""""""""""""""""""""""
  if (this.readyState == 4) { // && this.status == 200) {
    // Charge la langue désirée, définie dans "strLang". Soit 'fr' ou 'en' ou 'de' ou 'es' ou etc.
    if (this.status < 400) eval(this.responseText); // Si le fichier n'existe pas, il y a une erreur 404
    bgLoadLanguage_2(glstrbgLanguage);
    }
  };   
 
// La méthode GET est généralement préférable, mais limite la taille du fichier à 8 ko, parfois 2 ko.
// La limite provient du fait que les données sont transmises via l'URL.
var strFile = "bgmsg/js/" + glstrbgLanguage + ".js";
xhttp.open("POST", strFile, true); // true indique que l'appel est asynchrone.
xhttp.send();  
} // bgLoadLanguage_1

function bgLoadLanguage() {
//=========================
// Charge le fichier de la langue, s'il est défini dans l'URL

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
    bgLoadLanguage_1();
    }
  };   
 
// La méthode GET est généralement préférable, mais limite la taille du fichier à 8 ko, parfois 2 ko.
// La limite provient du fait que les données sont transmises via l'URL.
glstrbgLanguage = strS.substr(n1+6, 20); // récupère la langue désirée
var strFile = "../../msg/js/" + glstrbgLanguage + ".js";
xhttp.open("POST", strFile, true); // true indique que l'appel est asynchrone.
xhttp.send();  
} // bgLoadLanguage

function Include_toolbox(strFile) {
//=================================
// Charge le fichier contenant la toolbox
// strFile est le début du nom du fichier .xml contenant la startBlocks liste
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
    bgLoadLanguage();
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
// Charge le fichier contenant la StartBlocks, si désiré
// strFile est le début du nom du fichier .xml contenant la startBlocks liste
// C'est la partie qui précède : "_startBlocks.xml". La fin de nom du fichier doit se teriner ainsi.

// Pour charger la traduction des textes dans la langue désirée, mais sera non visible
// Création d'une balise : <div style="display:none" id="startBlocks"></div>
if (!document.getElementById("startBlocks")) {
  // Si la balise n'existe pas, on la crée.
  var startBlocksElement = document.createElement('xml');
  startBlocksElement.id = "startBlocks";
  startBlocksElement.style = "display:none";
  document.body.appendChild(startBlocksElement);
  }

// Utilisation de AJAX pour obtenir les textes dans la langue désirée.
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
//"""""""""""""""""""""""""""""""""""""
  if (xhttp.readyState == 4) { // && xhttp.status == 200) {
    // Le document a été chargé, on peut modifier le contenu de la balise <div id="idLang">
    document.getElementById("startBlocks").innerHTML = xhttp.responseText;   
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

function showCode_slow() {
//========================
// Generate JavaScript code and display it.
Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
var code = Blockly.JavaScript.workspaceToCode(demoWorkspace); 

window.document.idCodeJavascriptNameForm.idCodeJavascriptNameTextArea.value += code;
window.document.idCodeJavascriptNameForm.idCodeJavascriptNameTextArea.scrollTop = 100000;  // pour rester en fin du texte.
} // showCode_slow

function nextStep1() {
//===================
if ( (glnTimerID1 != 0) || (glnTimerID2 != 0) || glfRunPause ) {
  // Attend qu'il n'y ait plus d'animation pour continuer.
  window.setTimeout(nextStep, 5);
  }
else if ( (!glfRunStop) && (myInterpreter.step()) ) {
  // Il n'y a plus d'image qui se déplace et il y a encore du code à exécuter.
  window.setTimeout(nextStep, glnTimeMSBlocks);
  }
else {
  highlightBlock(null); // Pour n'avoir aucun bloc illuminé à la fin.
  glfIsRunning = false;
  glfRunOneStep = false;
  }
} // nextStep1

function nextStep2() {
//===================
var fHasMoreCode = false;

if ( (glnTimerID1 != 0) || (glnTimerID2 != 0) || glfRunPause) {
  // Attend qu'il n'y ait plus d'animation pour continuer.
  window.setTimeout(nextStep, 5);
  }
//else if ( (!glfRunStop) && (myInterpreter.step()) ) {
else { // Il n'y a plus d'image qui se déplace et il y a encore du code à exécuter.
  if (!glfRunStop) {
    fHasMoreCode = myInterpreter.step();
    while (fHasMoreCode && (glnTimerID1 == 0) && (glnTimerID2 == 0) ) {
      // Exécute rapidement les instructions, tant qu'il n'y a pas d'animation
      fHasMoreCode = myInterpreter.step(); 
      }

    if (fHasMoreCode) {
      window.setTimeout(nextStep, 1);
      }
    else {
      highlightBlock(null); // Pour n'avoir aucun bloc illuminé à la fin.
      glfIsRunning = false;
      glfRunOneStep = false;
      }
    }
  else {
    highlightBlock(null); // Pour n'avoir aucun bloc illuminé à la fin.
    glfIsRunning = false;
    glfRunOneStep = false;
    }
  }
} // nextStep2

function nextStep() {
//===================
if      (glnInterpreterSpeed == 1) nextStep1();
else if (glnInterpreterSpeed == 2) nextStep2();
else if ( (glnTimerID1 != 0) || (glnTimerID2 != 0) ) nextStep2(); // Attend que les animations soient terminées pour aller à vitesse maximale
else if (glnInterpreterSpeed == 3) {
  myInterpreter.run(); // si on veut une exécution sans pauses.
  glfIsRunning = false;
  glfRunOneStep = false;
  highlightBlock(null); // Pour n'avoir aucun bloc illuminé à la fin.
  }
else { // glnInterpreterSpeed == 4
  var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  eval(code); // N'utilise pas l'interpréteur : 'acorn_interpreter.js', mais exécute le code rapidement.
  glfIsRunning = false;
  glfRunOneStep = false;
  highlightBlock(null); // Pour n'avoir aucun bloc illuminé à la fin.
  }
if (glfRunOneStep) glfRunPause = true;
} // nextStep

function initApi(interpreter, scope) {
//====================================
  // Add an API function for highlighting blocks.
var wrapper;
        
// Si on désire avoir l'illumination des blocs
wrapper = function(id) { return demoWorkspace.highlightBlock(id);  };
interpreter.setProperty(scope, 'highlightBlock', interpreter.createNativeFunction(wrapper) );

// Ajoute une 'API function' pour le  block 'Display'
wrapper = function(text) { return Display(arguments.length ? text : ''); };
interpreter.setProperty(scope, 'Display', interpreter.createNativeFunction(wrapper));

wrapper = function(nPosX1, nPosX2, delayMS) { return MoveX1X2(nPosX1, nPosX2, delayMS); };
interpreter.setProperty(scope, 'MoveX1X2', interpreter.createNativeFunction(wrapper));

wrapper = function(nPosX) { return GetCardValue(nPosX); };
interpreter.setProperty(scope, 'GetCardValue', interpreter.createNativeFunction(wrapper));

wrapper = function(nMixCount, nAccelerate) { return MixCards(nMixCount, nAccelerate); };
interpreter.setProperty(scope, 'MixCards', interpreter.createNativeFunction(wrapper));

wrapper = function(nPosX1, nPosX2, delayMS) { return ExangeX1X2(nPosX1, nPosX2, delayMS); };
interpreter.setProperty(scope, 'ExangeX1X2', interpreter.createNativeFunction(wrapper));

wrapper = function(nPosX, strColor) { return CaseBackground(nPosX, strColor); };
interpreter.setProperty(scope, 'CaseBackground', interpreter.createNativeFunction(wrapper));

wrapper = function(nCard, strColor) { return CardBackground(nCard, strColor); };
interpreter.setProperty(scope, 'CardBackground', interpreter.createNativeFunction(wrapper));

} // initApi

function runCode_slow(nSpeed, timeMS) {
//=====================================
// Exécute le code javascript lentement.
// timeMS est le temps en millisecondes entre deux affichages.

glnInterpreterSpeed = nSpeed;
glnTimeMSBlocks = timeMS;
glfRunPause = false;
if (glfIsRunning) { glfRunOneStep = false; return; }

window.LoopTrap = 1000;
Blockly.JavaScript.INFINITE_LOOP_TRAP =
    'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
//Blockly.JavaScript.addReservedWords('code'); // c.f. : https://developers.google.com/blockly/guides/app-integration/running-javascript
var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
Blockly.JavaScript.INFINITE_LOOP_TRAP = null;

try {
  glfRunStop = false;
  glfIsRunning = true;  
  myInterpreter = new Interpreter(code, initApi);
  
  if (glnInterpreterSpeed <= 2) nextStep();
  else {
    if (glnInterpreterSpeed == 3) myInterpreter.run(); // Exécution sans pauses.
    else eval(code); // N'utilise pas l'interpréteur : 'acorn_interpreter.js', mais exécute le code rapidement.
    glfIsRunning = false;
    glfRunOneStep = false;
    highlightBlock(null); // Pour n'avoir aucun bloc illuminé à la fin.
    }
  } 
catch (e) {
  alert(e);
  }
} // runCode_slow

function runOneStep() {
//=====================
glfRunOneStep = true;
glfRunPause = false; // Permet ainsi l'exécution d'un pas;
glnInterpreterSpeed = 2; // La seul vitesse raisonnable pour l'exécution pas à pas.
if (!glfIsRunning) runCode_slow(2, 10);
} // runOneStep

function runMyCode_slow(code, timeMS) {
//=====================================
// Exécute le code javascript lentement.
// timeMS est le temps en millisecondes entre deux affichages.
glnTimeMSBlocks = timeMS;

try {
  glfRunPause = false;
  glfRunStop = false;
  glfIsRunning = true;  
  myInterpreter = new Interpreter(code, initApi);
  
  if (glnInterpreterSpeed <= 2) nextStep();  
  else {
    if (glnInterpreterSpeed == 3) myInterpreter.run(); // Exécution sans pauses.
    else eval(code); // N'utilise pas l'interpréteur : 'acorn_interpreter.js', mais exécute le code rapidement.
    glfIsRunning = false;
    highlightBlock(null); // Pour n'avoir aucun bloc illuminé à la fin.
    }
  } 
catch (e) {
  alert(e);
  }
} // runMyCode_slow

// ###########################################################################

// ******************************************************************************************
// Définition des fonctionnalités des nouveaux blocs
// ******************************************************************************************

function Display(strInfo) {
//=========================
// Ecrit dans une partie de la fenêtre, divers informations.
// La forme "idDisplayNameForm" a été définie dans la page HTML. 
// sous la définition de la '<div id="idDisplay" ...'.
var myMessage = window.document.idDisplayNameForm.idDisplayNameTextArea.value;
myMessage = myMessage + strInfo;
window.document.idDisplayNameForm.idDisplayNameTextArea.value = myMessage;
window.document.idDisplayNameForm.idDisplayNameTextArea.scrollTop = 100000;  // pour rester en fin du texte.
/// window.document.idDisplayNameForm.idDisplayNameTextArea.scrollBy(10,0);  pas correcte !?!
} // Display

// ###########################################################################

function Exchange_stop() {
//========================
// Arrête le comteur et indique qu'il est arrêté en mettant glnTimerID1 à 0.
if (glnTimerID1 !== 0) {
  clearInterval(glnTimerID1);
  glnTimerID1 = 0;
  }

// Positionne précisément les images. Utile si on va plus vite et moins précisément.
if (gloImageBouge != null) {
  gloImageBouge.style.left = glnStopPosX + "px";
  gloImageBouge.style.top  = glnStopPosY + "px";

  // Remet la carte à sa hauteur initiale
  gloImageBouge.style.zIndex = 501;
  }

if (gloImageBouge2 != null) {
  gloImageBouge2.style.left = glnStartPosX + "px";
  gloImageBouge2.style.top  = glnStartPosY + "px";

  // Remet la carte à sa hauteur initiale
  gloImageBouge2.style.zIndex = 501;
  }
} // Exchange_stop

function Exchange_pictures() {
//============================
// Déplace l'image  1  de glnStartPosX à glnStopPosX et
// déplace l'image  2  de glnStopPosX  à glnStartPosX.

var nPosX1 = -1;
var nPosY1 = -1;
var nPosX2 = -1;
var nPosY2 = -1;
var nDX = 1; // Pour savoir dans quelle direction les images se déplacent.

if (gloImageBouge  != null) { nPosX1 = parseInt(gloImageBouge.style.left);  nDX = glnStopPosX - nPosX1; }
if (gloImageBouge2 != null) { nPosX2 = parseInt(gloImageBouge2.style.left); nDX = nPosX2 - glnStartPosX; }

if (nDX > 0) { nPosX1 += glnMoveStep*glnAccelerate; nPosX2 -= glnMoveStep*glnAccelerate; } // image 1 à gauche de image 2
if (nDX < 0) { nPosX1 -= glnMoveStep*glnAccelerate; nPosX2 += glnMoveStep*glnAccelerate; }

// Positionne les deux cartes
if (gloImageBouge != null) {
  nPosY1 = glnStopPosY + 120 * (nPosX1 - glnStartPosX) * (glnStopPosX - nPosX1) / (glnStopPosX - glnStartPosX) / (glnStopPosX - glnStartPosX);
  gloImageBouge.style.left = nPosX1 + "px";  // "px" signifie l'unité = le pixel
  gloImageBouge.style.top  = nPosY1 + "px";

  if ( ( (glnStartPosX <= glnStopPosX) && (glnStopPosX <= nPosX1) ) ||  // Start < Stop
       ( (glnStartPosX >= glnStopPosX) && (glnStopPosX >= nPosX1) ) ) { // Stop < Start
    Exchange_stop(); // Images destinations  
    return;
    }
  }

if (gloImageBouge2 != null) {
  nPosY2 = glnStartPosY + 120 * (nPosX2 - glnStartPosX) * (glnStopPosX - nPosX2) / (glnStopPosX - glnStartPosX) / (glnStopPosX - glnStartPosX);
  gloImageBouge2.style.left = nPosX2 + "px";
  gloImageBouge2.style.top  = nPosY2 + "px";

  if ( ( (glnStartPosX <= glnStopPosX) && (glnStartPosX >= nPosX2) ) ||  // Start < Stop
       ( (glnStartPosX >= glnStopPosX) && (glnStartPosX <= nPosX2) ) ) { // Stop < Start
    Exchange_stop(); // Images destinations  
    return;
    }
  }
} // Exchange_pictures

function ExangeX1X2(nPosX1, nPosX2, delayMS) {
//============================================
// Échange les images qui se trouve en position X1, en position X2.
// Ne fait rien, si les deux positions sont identique ou une est hors champ
// avec une attente de : delayMS [ms] entre chaque déplacement de un pixel.
// L'id de l'image est définie par sa position. 'idPosx1' est l'id de l'image à la position  x

if (  (nPosX1 == nPosX2) 
   || (nPosX1 < 0) || (nPosX1  > NMAXCARD+1)
   || (nPosX2 < 0) || (nPosX2  > NMAXCARD+1) ) return; // rien à faire

var idImage1 = 'idPos' + (100 + nPosX1);
gloImageBouge = document.getElementById(idImage1 + '1');

var idImage2 = 'idPos' + (100 + nPosX2);
gloImageBouge2 = document.getElementById(idImage2 + '1');
// L'id termine par '1' pour la carte du dessus du tas

if ( (gloImageBouge == null) && (gloImageBouge2 == null) ) return; // rien n'a faire, pas de carte aux endroits indiqués.

// Position des images
glnStartPosX = 100 + nPosX1 * 100; 
glnStopPosX  = 100 + nPosX2 * 100; 

// S'il y a une carte à l'un des deux endroits, mais pas à l'autre, 
// il faut faire remonter les cartes du tas qui contient une carte.
if ( (gloImageBouge == null) || (gloImageBouge2 == null) ) {
  var nPosXX = nPosX1;
  if (gloImageBouge == null) nPosXX = nPosX2; // Définit la case qui contient une ou des cartes.

  // On fait remonter de un toutes les cartes de la case ayant une carte (en nPosXX)
  // Parcours toutes les cartes qui sont aux même endroit.
  // Change l'id en décréémentant la profondeur de 1
  // Sont id est du type idPosxy
  // x = la position de la carte
  // y = la profondeur. Plus  y  est grand, plus la carte est sous le tas.
  var idCase0 = 'idPos' + (100 + nPosXX);
  var nProfondeur = 2;
  var oImage0 = document.getElementById(idCase0 + nProfondeur);
  while (oImage0 != null) { 
    // Il y a encore une carte sur le tas
    oImage0.setAttribute('id', idCase0 + (nProfondeur-1) ); // Change l'id de la carte, en fonction de sa position.
    oImage0.style.zIndex = 500 - (nProfondeur-1);  
    nProfondeur += 1; // Cherche plus en profondeur
    oImage0 = document.getElementById(idCase0 + nProfondeur);
    }
  }

// Au moins une des deux case n'est pas vide.
if (gloImageBouge != null) {
  glnStartPosY = parseInt(gloImageBouge.style.top);
  
  // Place la carte au-dessus des autres.
  gloImageBouge.setAttribute('id', idImage2 + '1'); // Change l'id de la carte, en fonction de sa position.
  gloImageBouge.style.zIndex = 700;  
  }
  
if (gloImageBouge2 != null) {
  glnStartPosY = parseInt(gloImageBouge2.style.top);
  
  // Place la carte au-dessus des autres.
  gloImageBouge2.setAttribute('id', idImage1 + '1'); // Change l'id de la carte, en fonction de sa position.
  gloImageBouge2.style.zIndex = 700;  
  }
   
// Position d'arrivée de l'image
glnStopPosY = glnStartPosY; // Même position Y à l'arrivée que au départ

if (glnInterpreterSpeed <= 2) {
  if (glnTimerID1 == 0) glnTimerID1 = setInterval('Exchange_pictures()', delayMS); // delayMS = temps en [ms] entre deux déplacement de 1 pixel
  }
else { // exécution rapide, sans animation.
  // Positionne les deux cartes
  if (gloImageBouge != null) {
    gloImageBouge.style.left = glnStopPosX + "px";
    gloImageBouge.style.top  = glnStopPosY + "px";

    // Remet la carte à sa hauteur initiale
    gloImageBouge.style.zIndex = 501;
    }
    
  if (gloImageBouge2 != null) {
    gloImageBouge2.style.left = glnStartPosX + "px";
    gloImageBouge2.style.top  = glnStartPosY + "px";

    // Remet la carte à sa hauteur initiale
    gloImageBouge2.style.zIndex = 501;
    }
  }

} // ExangeX1X2

// ###########################################################################

function Stop_image() {
//=====================
// Arrête le comteur et indique qu'il est arrêté en mettant glnTimerID1 à 0.
if (glnTimerID1 !== 0) {
  clearInterval(glnTimerID1);
  glnTimerID1 = 0;
  }

// Positionne précisément l'image. Utile si on va plus vite et moins précisément.
gloImageBouge.style.left = glnStopPosX + "px";
gloImageBouge.style.top  = glnStartPosY + "px";

// Remet la carte à sa hauteur initiale
gloImageBouge.style.zIndex = 501;
} // Stop_image

function Deplace_image() {
//========================
// Déplace l'image "glIdImage" à la position : (glnStopPosX , glnStopPosY)
// "px" signifie l'unité = le pixel

var nPosX = parseInt(gloImageBouge.style.left);
var nPosY = parseInt(gloImageBouge.style.top);
var nDX = glnStopPosX - nPosX;

if ( (glnStartPosX <= glnStopPosX) && (glnStopPosX <= nPosX) ) { // Arrêt de déplacement vers la droite
  Stop_image(); // L'image est arribée à destination
  return;
  }

if ( (glnStartPosX >= glnStopPosX) && (glnStopPosX >= nPosX) ) { // Arrêt de déplacement vers la gauche
  Stop_image(); // L'image est arribée à destination
  return;
  }

if (nDX < 0) nPosX -= glnMoveStep*glnAccelerate;
if (nDX > 0) nPosX += glnMoveStep*glnAccelerate;

nPosY = glnStartPosY + 120 * (nPosX - glnStartPosX) * (glnStopPosX - nPosX) / (glnStopPosX - glnStartPosX) / (glnStopPosX - glnStartPosX);

gloImageBouge.style.left = nPosX + "px";
gloImageBouge.style.top  = nPosY + "px";
} // Deplace_image

function MoveX1X2(nPosX1, nPosX2, delayMS) {
//==========================================
// Déplace l'image qui se trouve en position X1, en position X2.
// Ne fait rien, s'il n'y a pas d'image en position X1
// avec une attente de : delayMS [ms] entre chaque déplacement de un pixel.
// L'id de l'image est définie par sa position. 'idPosx1' est l'id de l'image à la position  x

if (  (nPosX1 == nPosX2) || (nPosX2 < 0) || (nPosX2  > NMAXCARD+1) ) return; // rien à faire

var idImage = 'idPos' + (100 + nPosX1);
gloImageBouge = document.getElementById(idImage + '1');
// L'id termine par '1' pour la carte du dessus du tas
if (gloImageBouge == null) return; // rien n'a faire, pas de carte à l'endroit indiqué.

// Position de départ de l'image
glnStartPosX = parseInt(gloImageBouge.style.left);
glnStartPosY = parseInt(gloImageBouge.style.top);

// Position d'arrivée de l'image
glnStopPosX = 100 + nPosX2 * 100; 
glnStopPosY = glnStartPosY; // Même position Y à l'arrivée que au départ

// Parcours toutes les cartes qui sont aux même endroit, à l'arrivée.
// Change l'id en incrémentant la profondeur de 1
// Sont id est du type idPosxy
// x = la position de la carte
// y = la profondeur. Plus  y  est grand, plus la carte est sous le tas.
var idCase2 = 'idPos' + (100 + nPosX2);
var nProfondeur = 1;
var oImage2Last = document.getElementById(idCase2 + nProfondeur);
var oImage2 = oImage2Last;
while (oImage2Last != null) { 
  // Il y a encore une carte sur le tas
  nProfondeur += 1; // Cherche plus en profondeur
  oImage2 = document.getElementById(idCase2 + nProfondeur);
  oImage2Last.setAttribute('id', idCase2 + nProfondeur ); // Change l'id de la carte, en fonction de sa position.
  oImage2Last.style.zIndex = 500 - nProfondeur;  
  oImage2Last = oImage2;
  }
// Si nProfondeur == 1, c'est qu'il n'y avait aucune carte à cette position.
// Si nProfondeur > 1, c'est qu'il y a une ou des cartes à cette position.
// Place la carte au-dessus des autres.
gloImageBouge.setAttribute('id', idCase2 + '1'); // Change l'id de la carte, en fonction de sa position.
gloImageBouge.style.zIndex = 700;

glnStopPosX += 10*(nProfondeur - 1); // Pour décaler les cartes

// On fait remonter de un toutes les cartes de la case de départ.
// Parcours toutes les cartes qui sont aux même endroit, au départ
// Change l'id en décréémentant la profondeur de 1
// Sont id est du type idPosxy
// x = la position de la carte
// y = la profondeur. Plus  y  est grand, plus la carte est sous le tas.
var idCase1 = 'idPos' + (100 + nPosX1);
var nProfondeur = 2;
var oImage1 = document.getElementById(idCase1 + nProfondeur);
while (oImage1 != null) { 
  // Il y a encore une carte sur le tas
  oImage1.setAttribute('id', idCase1 + (nProfondeur-1) ); // Change l'id de la carte, en fonction de sa position.
  oImage1.style.zIndex = 500 - (nProfondeur-1);  
  nProfondeur += 1; // Cherche plus en profondeur
  oImage1 = document.getElementById(idCase1 + nProfondeur);
  }

if (glnInterpreterSpeed <= 2) {
  if (glnTimerID1 == 0) glnTimerID1 = setInterval('Deplace_image()', delayMS); // delayMS = temps en [ms] entre deux déplacement de 1 pixel
  }
else { // exécution rapide, sans animation.
  // Positionne l'image à l'arrivée
  gloImageBouge.style.left = glnStopPosX + "px";
  gloImageBouge.style.top  = glnStartPosY + "px";

  // Remet la carte à sa hauteur initiale
  gloImageBouge.style.zIndex = 501;
  }

} // MoveX1X2

//"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

function MixStop() {
//===============
// Arrête le comteur et indique qu'il est arrêté en mettant glnTimerID2 à 0.
if (glnTimerID2 !== 0) {
  clearInterval(glnTimerID2);
  glnTimerID2 = 0;
  }
} // Stop

function IterateurMix() {
//=======================
// Exécute une itération du générateur.
if (glnTimerID1 != 0) return; // attend que le timer 1 soit arrêté.

if (glnMixCount <= 0) { MixStop(); glnAccelerate = 1; return; } // Mélange terminé

if ( (glnMixCount == 1) || glfRunStop ) { 
  MoveX1X2(NMAXCARD+1, glnMixDestination, 0); // Dernière carte à se déplacer
  glnMixCount = 0;
  return;
  }

// NMAXCARD = nombre de cases pouvant contenir des cartes.
var n1 = 1 + Math.floor( NMAXCARD * Math.random() ); // Une case qui voit sa carte aller dans la case de destination
while ( (n1 == glnMixDestination) || (document.getElementById('idPos' + (100 + n1) + '1') == null) ) {
  // Assure que n1 != glnMixDestination et qu'il y a une carte dans la case de départ
  n1 = 1 + Math.floor( NMAXCARD * Math.random() );
  }
  
MoveX1X2(n1, glnMixDestination, 0); // 0 => vitesse maximale du timer.
glnMixDestination = n1;
glnMixCount--;
} // IterateurMix

function MixCards(nMixCount, nAccelerate) {
//=========================================
// Mélange les cartes
// nMixCount indique le nombre de cartes mélangées. Si == 1, alors pas de mélange.
// nAccelerate indique l'accélération de déplacement, 1 = pas d'accélération.

if (nMixCount <= 0) return 0; // rien à faire

glnMixCount = nMixCount + 1;
glnAccelerate = nAccelerate; // Pour accélérer la vitesse des mélanges
if (glnAccelerate < 1) glnAccelerate = 1;

glnMixDestination = NMAXCARD+1; // Position de destination de la première carte

if (glnInterpreterSpeed <= 2) {
  if (glnTimerID2 == 0) glnTimerID2 = setInterval(IterateurMix, 5);
  }
else { // exécution rapide, sans animation.
  while (glnMixCount > 1) {
    // NMAXCARD = nombre de cases pouvant contenir des cartes.
    var n1 = 1 + Math.floor( NMAXCARD * Math.random() ); // Une case qui voit sa carte aller dans la case de destination
    while ( (n1 == glnMixDestination) || (document.getElementById('idPos' + (100 + n1) + '1') == null) ) {
      // Assure que n1 != glnMixDestination et qu'il y a une carte dans la case de départ
      n1 = 1 + Math.floor( NMAXCARD * Math.random() );
      }
      
    MoveX1X2(n1, glnMixDestination, 0); // 0 => vitesse maximale du timer.
    glnMixDestination = n1;
    glnMixCount--;
    }

  if (glnMixCount == 1) { 
    MoveX1X2(NMAXCARD+1, glnMixDestination, 0); // Dernière carte à se déplacer
    glnAccelerate = 1;
    return 0;
    }
  }

return 0;
} // MixCards

function GetCardValue(nPosX) {
//============================
// Retourne la valeur de la carte se trouvant à la position donnée.
// Retourne  0  s'il n'y a pas de carte.

var idImage = 'idPos' + (100 + nPosX);
var oImage = document.getElementById(idImage + '1');
// L'id termine par '1' pour la carte du dessus du tas
if (oImage == null) return 0; // Il n'y a pas de carte

return parseInt(oImage.getAttribute("name"));
} // GetCardValue

function CaseBackground(nPosX, strColor) {
//========================================
// Change la couleur de fond de la carte se trouvant à la position nPosX
// Ne fait rien, s'il n'y a pas de carte.
// Si strColor == '', annule la couleur de fond.

var idImage = 'idPos' + (100 + nPosX);
var oImage = document.getElementById(idImage + '1');
// L'id termine par '1' pour la carte du dessus du tas
if (oImage == null) return 0; // Il n'y a pas de carte

oImage.style.backgroundColor = strColor;
return 1;
} // CaseBackground

function CardBackground(nCard, strColor) {
//========================================
// Change la couleur de fond de la carte  nCard
// Ne fait rien, s'il la carte n'est pas trouvée.
// Si strColor == '', annule la couleur de fond.

var aoImages = document.getElementsByName(nCard);
if (aoImages.length == 0) return; // Pas de carte trouvée.
if (aoImages[0] == null) return 0; // Ne devrait pas arriver !?!

aoImages[0].style.backgroundColor = strColor;
return 1;
} // CardBackground

function PlaySound(strFile, message) {
//====================================
// Joue le son contenu dans le fichier : strFile
// Affiche le message dans une alerte.

// Création d'un élément pour jouer un son
var divElement = document.createElement('div');
divElement.id = "idDivSon";
divElement.innerHTML = "<audio autoplay> <source src='" + strFile + "'></audio>";  
document.body.appendChild(divElement);

alert(message);

document.body.removeChild(divElement);  // Element supprimé de la mémoire.
} // PlaySound

// ******************************************************************************************
// Définition de nouveaux blocs et du code javascript et parfois python qui leur est associé.
// ******************************************************************************************

// Adjonction de blocs permettant d'afficher du texte dans la fenêtre
//********************************************************************
Blockly.Blocks['text_affiche'] = {
//================================
init: function() {
  this.jsonInit({
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

// Adjonction de blocs pour déplacer et traiter des images (de cartes).
//*********************************************************************
Blockly.Blocks['card_movex1x2'] = {
//================================
init: function() {
  this.jsonInit({
    "message0": bgBlockly.Msg['CARD_MOVEX1X2_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "POSX1",
        "check":"Number"
      }
      ,{
        "type": "input_value",
        "name": "POSX2",
        "check":"Number"
      }
    ],
    "data": "5", // Valeurs par défaut.
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour":  bgBlockly.Msg['CARDS_HUE'],
    "tooltip": bgBlockly.Msg['CARD_MOVEX1X2_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['CARD_MOVEX1X2_HELPURL']
    });
  }
};
Blockly.JavaScript['card_movex1x2'] = function(block) {
//===================================================
// Déplacement de la boule bleue à la position désirée.
var nPosX1 = Blockly.JavaScript.valueToCode(block, 'POSX1',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
var nPosX2 = Blockly.JavaScript.valueToCode(block, 'POSX2',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

var nTimeDelta  = 5; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  nTimeDelta  = parseInt(strData);
  } 

return "MoveX1X2(" + nPosX1 + ", " + nPosX2 + ", " + nTimeDelta + ");\n";
// Le dernier paramètre est le temps d'attente entre chaque déplacement de 1 pixel
};

Blockly.Blocks['card_exchangex1x2'] = {
//=====================================
init: function() {
  this.jsonInit({
    "message0": bgBlockly.Msg['CARD_EXCHANGEX1X2_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "POSX1",
        "check":"Number"
      }
      ,{
        "type": "input_value",
        "name": "POSX2",
        "check":"Number"
      }
    ],
    "data": "5", // Valeurs par défaut.
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour":  bgBlockly.Msg['CARDS_HUE'],
    "tooltip": bgBlockly.Msg['CARD_EXCHANGEX1X2_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['CARD_EXCHANGEX1X2_HELPURL']
    });
  }
};
Blockly.JavaScript['card_exchangex1x2'] = function(block) {
//=========================================================
// Échange de deux images de leur place
var nPosX1 = Blockly.JavaScript.valueToCode(block, 'POSX1',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
var nPosX2 = Blockly.JavaScript.valueToCode(block, 'POSX2',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

var nTimeDelta  = 5; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  nTimeDelta  = parseInt(strData);
  } 

return "ExangeX1X2(" + nPosX1 + ", " + nPosX2 + ", " + nTimeDelta + ");\n";
// Le dernier paramètre est le temps d'attente entre chaque déplacement de 1 pixel
};

Blockly.Blocks['card_get_card'] = {
//==================================
init: function() {
  this.jsonInit({
    "type":"card_get_card",
    "message0": bgBlockly.Msg['CARD_GET_CARD_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "POSX",
        "check":"Number"
      }
    ],
    "output": "Number",
    "colour":  bgBlockly.Msg['CARDS_HUE'],
    "tooltip": bgBlockly.Msg['CARD_GET_CARD_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['CARD_GET_CARD_HELPURL']
    });
  }
};
Blockly.JavaScript['card_get_card'] = function(block) {
//=====================================================
// Lecture de la valeur de la carte se trouvant dans la case donnée
var nPosX = Blockly.JavaScript.valueToCode(block, 'POSX',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

return ["GetCardValue(" + nPosX + ")", Blockly.JavaScript.ORDER_FUNCTION_CALL]; // c.f. blockly/generators/javascript/math.js
};

Blockly.Blocks['card_mix_cards'] = {
//==================================
init: function() {
  this.jsonInit({
    "type":"card_mix_cards",
    "message0": bgBlockly.Msg['CARD_MIX_CARD_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "MIXNUMBER",
        "check":"Number"
      }
      ,{
        "type": "input_value",
        "name": "MIXACCEL",
        "check":"Number"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour":  bgBlockly.Msg['CARDS_HUE'],
    "tooltip": bgBlockly.Msg['CARD_MIX_CARD_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['CARD_MIX_CARD_HELPURL']
    });
  }
};
Blockly.JavaScript['card_mix_cards'] = function(block) {
//=====================================================
// Mélange des cartes
var nMixNumber = Blockly.JavaScript.valueToCode(block, 'MIXNUMBER',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
var nMixAccel = Blockly.JavaScript.valueToCode(block, 'MIXACCEL',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

return "MixCards(" + nMixNumber + ", " + nMixAccel + ");\n";
};

Blockly.Blocks['card_casebackground'] = {
//=======================================
init: function() {
  this.jsonInit({
    "message0": bgBlockly.Msg['CARD_CASEBACKGROUNDCOLOR_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "POSX",
        "check":"Number"
      }
      ,{
        "type": "input_value",
        "name": "COLOR",
        "check":"String"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour":  bgBlockly.Msg['CARDS_HUE'],
    "tooltip": bgBlockly.Msg['CARD_CASEBACKGROUNDCOLOR_TOOLTIP'],  
    "helpUrl": bgBlockly.Msg['CARD_CASEBACKGROUNDCOLOR_HELPURL']
    });
  }
};
Blockly.JavaScript['card_casebackground'] = function(block) {
//===========================================================
// Déplacement de la boule bleue à la position désirée.
var nPosX = Blockly.JavaScript.valueToCode(block, 'POSX',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
var strColor = Blockly.JavaScript.valueToCode(block, 'COLOR',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

return "CaseBackground(" + nPosX + ", " + strColor + ");\n";
// Le dernier paramètre est le temps d'attente entre chaque déplacement de 1 pixel
};

Blockly.Blocks['card_cardbackground'] = {
//=======================================
init: function() {
  this.jsonInit({
    "message0": bgBlockly.Msg['CARD_CARDBACKGROUNDCOLOR_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "CARD",
        "check":"Number"
      }
      ,{
        "type": "input_value",
        "name": "COLOR",
        "check":"String"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour":  bgBlockly.Msg['CARDS_HUE'],
    "tooltip": bgBlockly.Msg['CARD_CARDBACKGROUNDCOLOR_TOOLTIP'],  
    "helpUrl": bgBlockly.Msg['CARD_CARDBACKGROUNDCOLOR_HELPURL']
    });
  }
};
Blockly.JavaScript['card_cardbackground'] = function(block) {
//===========================================================
// Déplacement de la boule bleue à la position désirée.
var nCard = Blockly.JavaScript.valueToCode(block, 'CARD',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
var strColor = Blockly.JavaScript.valueToCode(block, 'COLOR',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

return "CardBackground(" + nCard + ", " + strColor + ");\n";
// Le dernier paramètre est le temps d'attente entre chaque déplacement de 1 pixel
};
