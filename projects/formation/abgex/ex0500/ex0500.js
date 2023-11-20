// Adjonction de fonctionnalités à Blockly
// #######################################

// c.f. https://developers.google.com/blockly/guides/app-integration/running-javascript
//"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

var demoWorkspace; // Cette variable doit être global.

function highlightBlock(id) {
//===========================
// Pour que les blocks exécutés soient illuminés.
demoWorkspace.highlightBlock(id);
} // highlightBlock

// Cette fonction est exécutée depuis : "xhttp.onreadystatechange = function() {"
// Juste après que la toolbox ait été chargée.
function RunBlockly() {
//===================== 
// C'est ici que l'on insert les fonctionnalités Blockly
demoWorkspace = Blockly.inject('blocklyDiv',
    {media: '../../media/',
     toolbox: document.getElementById('toolbox')});

// C'est ici que l'on indique d'ajouter des blocs a l'ouverture de la page
Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), demoWorkspace);

// Ces lignes indique à Blockly d'illuminer les blocks exécutés.
Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
Blockly.JavaScript.addReservedWords('highlightBlock');

} // RunBlockly

function Include_toolbox(strFile) {
//=================================
// Charge le fichier contenant la toolbox
// strFile est le début du nom du fichier .xml contenant la startBlocks liste
// C'est la partie qui précède : "_toolbox.xml". La fin de nom du fichier doit se teriner ainsi.

// Pour charger la traduction des textes dans la langue désirée, mais sera non visible
// Création d'une balise : <div style="display:none" id="idLang"></div>
if (!document.getElementById("toolbox")) {
  // Si la balise n'existe pas, on la crée.
  var toolboxElement = document.createElement('xml');
  toolboxElement.id = "toolbox";
  toolboxElement.style = "display:none";
  document.body.appendChild(toolboxElement);
  }

// Utilisation de AJAX pour obtenir les textes dans la langue désirée.
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  //===================================
  if (xhttp.readyState == 4) { // && xhttp.status == 200) {
    // Le document a été chargé, on peut modifier le contenu de la balise <div id="idLang">
    document.getElementById("toolbox").innerHTML = xhttp.responseText;   
    RunBlockly();
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
// Si le fichier : "..._startBlocks.xml" n'existe pas, 
// il n'y a tout simplement pas de blocs au départ, mais le reste fonctionne normalement.

// Pour charger la traduction des textes dans la langue désirée, mais sera non visible
// Création d'une balise : <div style="display:none" id="idLang"></div>
if (!document.getElementById("startBlocks")) {
  // Si la balise n'existe pas, on la crée.
  var startBlocksElement = document.createElement('xml');
  startBlocksElement.id = "startBlocks";
  startBlocksElement.style = "display:none";
  document.body.appendChild(startBlocksElement);
  }

// Utilisation de AJAX pour obtenir les textes dans la langue désirée.
// c.f. https://www.w3schools.com/js/js_ajax_http.asp
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  //===================================
  if (xhttp.readyState == 4) { // && xhttp.status == 200) {
    // xhttp.status == 404  si le fichier n'a pas été trouvé.
    // Le document a été chargé, on peut modifier le contenu de la balise <div id="idLang">
    document.getElementById("startBlocks").innerHTML = xhttp.responseText;   
    Include_toolbox(strFile);
    }
  };   
  
// La méthode GET est généralement préférable, mais limite la taille du fichier à 8 ko, parfois 2 ko.
// La limite provient du fait que les données sont transmises via l'URL.
xhttp.open("GET", strFile + "_startBlocks.xml", true); // true indique que l'appel est asynchrone.
//xhttp.open("POST", strLang, true); // true indique que l'appel est asynchrone.
xhttp.send();  
} // Include_startBlocks

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

function GetXML() {
//=================
// Pour récupérer le code XML des blocs 

window.document.nomForm3.nomTextarea3.value = GetXML_code();
} // GetXML
  
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

// ###########################################################################

// Ce qui suit permet de déplacer les fenêtres dans la fenêtre de Blockly
// ********* !!! Ajouter l'instuction : "onmousemove="myMouseMove(event);" à la balise <body> !!!! *****
var gloDivSel = 0; // pointeur sur le div lorsqu'il est sélectionné
var glnXOffset = 0; // décalage entre le clique souris et la gauche de la fenetre
var glnYOffset = 0; // décalage
var glnZIndex = 100; // Pour définir quelle fenêtre est au-dessus de quelle autre.

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

// ###########################################################################

function Display(strInfo) {
//=========================
// Ecrit dans une partie de la fenêtre, divers informations.
// La forme "nomForm1" a été définie dans la page HTML. 
// sous la définition de la '<div id="idDisplay" ...'.
var myMessage = window.document.nomForm1.nomTextarea1.value;
myMessage = myMessage + strInfo;
window.document.nomForm1.nomTextarea1.value = myMessage;
window.document.nomForm1.nomTextarea1.scrollTop = 100000;  // pour rester en fin du texte.
/// window.document.nomForm1.nomTextarea1.scrollBy(10,0);  pas correcte !?!
} // Display

// ###########################################################################

var glnTimerID1 = 0;  // indiquera le numéro du timer actif
var gloImageBouge = null;  // référence à l'image en déplacement
var glnStartPosX = 0; // Position de départ
var glnStartPosY = 0; 
var glnStopPosX = 0; // Position d'arrivée
var glnStopPosY = 0; 

function Stop_image() {
//=====================
// Arrête le comteur et indique qu'il est arrêté en mettant glnTimerID1 à 0.
if (glnTimerID1 !== 0) {
  clearInterval(glnTimerID1);
  glnTimerID1 = 0;
  
  // Remet la carte à sa hauteur initiale
  gloImageBouge.style.zIndex -= 100;

  }
} // Stop_image

function Deplace_image() {
//========================
// Déplace l'image "glIdImage" à la position : (glnStopPosX , glnStopPosY)
// "px" signifie l'unité = le pixel

var nPosX = parseInt(gloImageBouge.style.left);
var nPosY = parseInt(gloImageBouge.style.top);
var nDX = glnStopPosX - nPosX;

if (nDX == 0) {
  Stop_image(); // L'image est arribée à destination
  return;
  }

if (nDX < 0) nPosX--;
if (nDX > 0) nPosX++;

nPosY = glnStartPosY + 120 * (nPosX - glnStartPosX) * (glnStopPosX - nPosX) / (glnStopPosX - glnStartPosX)**2;


gloImageBouge.style.left = nPosX + "px";
gloImageBouge.style.top  = nPosY + "px";
} // Deplace_image

function MoveX1X2(nPosX1, nPosX2, delayMS) {
//==========================================
// Déplace l'image qui se trouve en position X1, en position X2.
// Ne fait rien, s'il n'y a pas d'image en position X1
// avec une attente de : delayMS [ms] entre chaque déplacement de un pixel.
// L'id de l'image est définie par sa position. 'idPosx' est l'id de l'image à la position  x

if (  (nPosX1 == nPosX2) || (nPosX2 < 0) || (nPosX2  > 6) ) return; // rien à faire

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

// S'il y a plusieurs cartes sur le même tas, il faut modifier l'id
// le z-index de chaque carte.
// Parcours toutes les cartes qui sont aux même endroit que l'endroit de départ
// Cherche celle qui est le plus bas. Sont id est du type idPosxy
// x = la position de la carte
// y = la profondeur. Plus  y  est grand, plus la carte est sous le tas.
var nProfondeur = 2;
var idCase1 = 'idPos' + (100 + nPosX1);
var oImage1 = document.getElementById(idCase1 + nProfondeur);
while (oImage1 != null) { // Il y a encore une carte sur le tas
  nProfondeur += 1; // Cherche plus en profondeur
  oImage1 = document.getElementById(idCase1 + nProfondeur);  
  }
// Si nProfondeur == 1, c'est qu'il n'y avait aucune carte à cette position.
// Si nProfondeur > 1, c'est qu'il y a une ou des cartes à cette position.

// La carte sous le tas a été trouvé, change leur id et leur z-index
// Parcours les cartes de la plus profonde (sous le tas) à la première du tas.
nProfondeur -= 1; // Remonte d'une carte
while (nProfondeur > 1) {
  oImage1 = document.getElementById(idCase1 + nProfondeur);
  oImage1.setAttribute('id', idCase1 + (nProfondeur-1) ); // Change l'id de la carte, en fonction de sa position.
  oImage1.style.zIndex = 9000 - (nProfondeur - 1);
  nProfondeur -= 1; // Remonte d'une carte
  }
// ++++++++++++++++++++++++++++++++++++++++++

// L'id de la carte bougée change en fonction de sa position d'arrivée.
// Gestion de la superposition de cartes
// Le z-index de la carte sera supérieur à celui des autrs cartes du même tas. Au départ, tous les z-index sont à 9000

// Parcours toutes les cartes qui sont aux même endroit.
// Cherche celle qui est le plus bas. Sont id est du type idPosxy
// x = la position de la carte
// y = la profondeur. Plus  y  est grand, plus la carte est sous le tas.
var nProfondeur = 1;
var idCase2 = 'idPos' + (100 + nPosX2);
var oImage2 = document.getElementById(idCase2 + nProfondeur);
while (oImage2 != null) { // Il y a encore une carte sur le tas
  nProfondeur += 1; // Cherche plus en profondeur
  oImage2 = document.getElementById(idCase2 + nProfondeur);
  }
// Si nProfondeur == 1, c'est qu'il n'y avait aucune carte à cette position.
// Si nProfondeur > 1, c'est qu'il y a une ou des cartes à cette position.

// La carte sous le tas a été trouvé, change leur id et leur z-index
// Parcours les cartes de la plus profonde (sous le tas) à la première du tas.
while (nProfondeur > 1) {
  oImage2 = document.getElementById(idCase2 + (nProfondeur-1));
  oImage2.setAttribute('id', idCase2 + nProfondeur); // Change l'id de la carte, en fonction de sa position.
  oImage2.style.zIndex = 9000 - nProfondeur;
  nProfondeur -= 1; // Remonte d'une carte
  }

gloImageBouge.setAttribute('id', idCase2 + '1'); // Change l'id de la carte, en fonction de sa position.
gloImageBouge.style.zIndex = 9000;

// Place la carte au-dessus des autres.
gloImageBouge.style.zIndex += 100;

if (glnTimerID1 == 0) glnTimerID1 = setInterval('Deplace_image()', delayMS); // delayMS = temps en [ms] entre deux déplacement de 1 pixel
} // MoveX1X2

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

// ###########################################################################

var glnTimerID0 = 0;  // indiquera le numéro du timer actif
var glGen; // le générateur

function Stop() {
//===============
// Arrête le comteur et indique qu'il est arrêté en mettant glnTimerID0 à 0.
if (glnTimerID0 !== 0) {
  clearInterval(glnTimerID0);
  glnTimerID0 = 0;
  }
} // Stop

function Iterateur() {
//===================
// Exécute une itération du générateur.
if (glnTimerID1 != 0) return; // attend que le timer 2 soit arrêté.
if (glGen.next().value == 0) Stop();
} // Compteur

function SlowDown(code, timeMS) {
//===============================
// Modifie le code à exécuter, pour qu'il s'exécute au ralenti.
// timeMS est le temps d'attente après chaque affichage. "DisplayLn(...)"
var kk = 0;

// On place le code dans une fonction "generator"
code =  "function* Ralenti() {\n" + code 
      + "highlightBlock(null);\n"
      + "\nyield 0;\n}"
      + "\nglGen = Ralenti();\n"
      + "Iterateur();\n"
      + "if (glnTimerID0 == 0) { glnTimerID0 = setInterval('Iterateur()'," + timeMS + "); }\n";
// On a ajouté les deux lignes suivantes à la suite du code, pour exécuter le code lentement.
// glGen = Ralenti(); // Initialise le générateur
// if (glnTimerID0 === 0) { glnTimerID0 = setInterval("Iterateur()", timeMS); } 
// La deuxième ligne démarre le compteur et met dans la variable glnTimerID0 le numéro de timer utilisé.

return code;
} // SlowDown

function showCode_slow(timeMS) {
//==============================
// Generate JavaScript code and display it.
Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
var code = Blockly.JavaScript.workspaceToCode(demoWorkspace); 

// Modifie le code pour qu'il s'exécute au ralenti.
code = SlowDown(code, timeMS);

window.document.nomForm2.nomTextarea2.value += code;
window.document.nomForm2.nomTextarea2.scrollTop = 100000;  // pour rester en fin du texte.
} // showCode_slow

// La fonctionnalité "afficheLn" de Blockly a été modifiée
// pour que l'instruction  "yield 1;"  soit ajoutée après l'affichage.
// *******************************************************************

function runCode_slow(timeMS) {
//=============================
// Exécute le code javascript lentement.
// timeMS est le temps en millisecondes entre deux affichages.
window.LoopTrap = 1000;
Blockly.JavaScript.INFINITE_LOOP_TRAP =
    'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
Blockly.JavaScript.INFINITE_LOOP_TRAP = null;

// Modifie le code pour qu'il s'exécute au ralenti.
code = SlowDown(code, timeMS);

try {
  eval(code);
  } 
catch (e) {
  alert(e);
  }
} // runCode_slow

// ###########################################################################

// Adjonction de textes personalités dans les blocs
goog.provide('bgBlockly.Msg.fr');
goog.require('bgBlockly.Msg');

bgBlockly.Msg["TEXT_AFFICHE_TITLE"] = "afficher %1";
bgBlockly.Msg["TEXT_AFFICHE_TOOLTIP"] = "Afficher le texte sans retour à la ligne, le nombre ou une autre valeur spécifiée.";
bgBlockly.Msg["TEXT_AFFICHE_HELPURL"] = "";  // untranslated
bgBlockly.Msg["TEXT_AFFICHELN_TITLE"] = "afficherLn %1";
bgBlockly.Msg["TEXT_AFFICHELN_TOOLTIP"] = "Afficher le texte avec retour à la ligne, le nombre ou une autre valeur spécifiée.";
bgBlockly.Msg["TEXT_AFFICHELN_HELPURL"] = "";  // untranslated
bgBlockly.Msg["TEXTS_HUE"] = "160";

bgBlockly.Msg["LOGO_MOVEX1X2_TITLE"] = "déplace la carte de la case %1 à la case %2";
bgBlockly.Msg["LOGO_MOVEX1X2_TOOLTIP"] = "Déplace la carte d'une case à une autre.";
bgBlockly.Msg["LOGO_MOVEX1X2_HELPURL"] = "";  // untranslated
bgBlockly.Msg["LOGO_GET_CARD_TITLE"] = "Carte de case %1";
bgBlockly.Msg["LOGO_GET_CARD_TOOLTIP"] = "Lit la valeur de la carte se trouvant dans la case donnée.";
bgBlockly.Msg["LOGO_GET_CARD_HELPURL"] = "";  // untranslated
bgBlockly.Msg["LOGOS_HUE"] = "20";

// Adjonction d'un bloc permettant d'afficher du texte dans la fenêtre
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
return "Display(" + (  msg + "+'\\n'") + ");\n" + "yield 1;\n"; // Insertion d'un retour de ligne à la fin de l'affichage : "\n"
};

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

Blockly.Blocks['logo_movex1x2'] = {
//================================
init: function() {
  this.jsonInit({
    "message0": bgBlockly.Msg['LOGO_MOVEX1X2_TITLE'],
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
    "colour":  bgBlockly.Msg['LOGOS_HUE'],
    "tooltip": bgBlockly.Msg['LOGO_MOVEX1X2_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['LOGO_MOVEX1X2_HELPURL']
    });
  }
};
Blockly.JavaScript['logo_movex1x2'] = function(block) {
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
  nTimeDelta  = strData;
  } 

return "MoveX1X2(" + nPosX1 + ", " + nPosX2 + ", " + nTimeDelta + ");\n" + "yield 1;\n";
// Le dernier paramètre est le temps d'attente entre chaque déplacement de 1 pixel
};

Blockly.Blocks['logo_get_card'] = {
//==================================
init: function() {
  this.jsonInit({
    "type":"logo_get_card",
    "message0": bgBlockly.Msg['LOGO_GET_CARD_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "POSX",
        "check":"Number"
      }
    ],
    "output": "Number",
    "colour":  bgBlockly.Msg['LOGOS_HUE'],
    "tooltip": bgBlockly.Msg['LOGO_GET_CARD_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['LOGO_GET_CARD_HELPURL']
    });
  }
};
Blockly.JavaScript['logo_get_card'] = function(block) {
//=====================================================
// Lecture de la valeur de la carte se trouvant dans la case donnée
var nPosX = Blockly.JavaScript.valueToCode(block, 'POSX',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

return ["GetCardValue(" + nPosX + ")", Blockly.JavaScript.ORDER_FUNCTION_CALL]; // c.f. blockly/generators/javascript/math.js
};
