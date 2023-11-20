// Adjonction de fonctionnalités à Blockly
// #######################################

var demoWorkspace; // Cette variable doit être global.

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
xhttp.open("GET", strFile + "_toolbox.xml", true); // true indique que l'appel est asynchrone.
//xhttp.open("POST", strLang, true); // true indique que l'appel est asynchrone.
xhttp.send();  
} // Include_toolbox

function Include_startBlocks(strFile) {
//=====================================
// Charge le fichier contenant la StartBlocks, si désiré
// strFile est le début du nom du fichier .xml contenant la startBlocks liste
// C'est la partie qui précède : "_startBlocks.xml". La fin de nom du fichier doit se teriner ainsi.

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
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  //===================================
  if (xhttp.readyState == 4) { // && xhttp.status == 200) {
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

function showCode() {
//===================
// Generate JavaScript code and display it.
Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
var code = Blockly.JavaScript.workspaceToCode(demoWorkspace); 

window.document.nomForm2.nomTextarea2.value += code;
window.document.nomForm2.nomTextarea2.scrollTop = 100000;  // pour rester en fin du texte.
} // showCode

function showCodePython() {
//=========================
// Generate python code and display it.
Blockly.Python.INFINITE_LOOP_TRAP = null;
var code = Blockly.Python.workspaceToCode(demoWorkspace); 

window.document.nomForm3.nomTextarea3.value += code;
window.document.nomForm3.nomTextarea3.scrollTop = 100000;  // pour rester en fin du texte.
} // showCodePython

function runCode() {
//===================
// Generate JavaScript code and run it.
window.LoopTrap = 1000;
Blockly.JavaScript.INFINITE_LOOP_TRAP =
    'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
try {
  eval(code);
  } 
catch (e) {
  alert(e);
  }
} // runCode

// ###########################################################################

// Ce qui suit permet de déplacer les fenêtres dans la fenêtre de Blockly
// ********* !!! Ajouter l'instuction : "onmousemove="myMouseMove(event);" à la balise <body> !!!! *****
var gloDivSel = 0; // pointeur sur le div lorsqu'il est sélectionné
var gloDivCalling = 0; // pointeur sur le div qui a appelé la fonction MyMouseDown
var glnXOffset = 0; // décalage entre le clique souris et la gauche de la fenetre
var glnYOffset = 0; // décalage
var glnZIndex = 100; // Pour définir quelle fenêtre est au-dessus de quelle autre.
var glnDivResize = 0; // 0 pour déplacer, 1 pour redimensionner. 

function BlocklyResize(myEvent) {
//===============================
// La fenêtre où se trouve Blockly est redimensionnée.
// C.f. : "Resizable Workspace"
// C.f. : https://developers.google.com/blockly/guides/configure/web/resizable

var oBlocklyParent = document.getElementById('idCodeBlockly');
var oBlocklyDiv = document.getElementById('blocklyDiv');
oBlocklyDiv.style.width  = myEvent.pageX - parseInt(oBlocklyParent.style.left) + 'px';
oBlocklyDiv.style.height = myEvent.pageY - parseInt(oBlocklyParent.style.top) - parseInt(blocklyDiv.style.top)  + 'px';

Blockly.svgResize(demoWorkspace);
} //BlocklyResize


function myMouseDown(myEvent, oAppelant, strDivName, nResize) {
//=============================================================
// Permet de sélectionner un des  div  pour le déplacer.
// nResize = 0 pour des déplacements
// nResize = 1 pour des redimensionnement
glnDivResize = nResize; // Mémorise si on déplace ou redimensionne
glnZIndex++;
document.getElementById(strDivName).style.zIndex = glnZIndex;
if (oAppelant == null) return;

if (nResize == 0) oAppelant.style.cursor='move';
else              oAppelant.style.cursor='se-resize';

gloDivCalling = oAppelant;
gloDivSel = document.getElementById(strDivName);
glnXOffset = myEvent.pageX - parseInt(gloDivSel.style.left);
glnYOffset = myEvent.pageY - parseInt(gloDivSel.style.top);
} // myMouseDown

function myMouseMove(myEvent) {
//=============================
// Permet de déplacer le  div  si un a été sélectionné
if (gloDivSel != 0) {
  if (glnDivResize == 0) {
    gloDivSel.style.left = myEvent.pageX - glnXOffset + "px";
    gloDivSel.style.top  = myEvent.pageY - glnYOffset + "px";
    }
  else {
    gloDivSel.style.width  = myEvent.pageX - parseInt(gloDivSel.style.left) + "px";
    gloDivSel.style.height = myEvent.pageY - parseInt(gloDivSel.style.top)  + "px";  
    BlocklyResize(myEvent);
    }  
  }
} // myMouseMove

function myMouseOut(myEvent) {
//============================
// Gère le fait que la souris sort de la fenêtre principale
if (gloDivSel != 0) {  
  //console.log(myEvent.pageX, window.innerWidth);

  // Assure que le haut de la fenêtre reste visible
  if (myEvent.pageY <= 0) {    
    gloDivSel.style.top = '0px';
    }
  
  if ( (myEvent.pageY <= 0) || (myEvent.pageX <= 0)
    || (myEvent.pageX >= window.innerWidth) ) { 
    gloDivCalling.style.cursor = 'grab';
    gloDivCalling = 0;
    gloDivSel = 0;
    }
  }
  
} // myMouseOut

// ###########################################################################

// Adjonction de textes personalités dans les blocs
goog.provide('bgBlockly.Msg.fr');
goog.require('bgBlockly.Msg');

bgBlockly.Msg["TEXTS_HUE"] = "160";
bgBlockly.Msg["TEXT_AFFICHE_TITLE"] = "afficher %1";
bgBlockly.Msg["TEXT_AFFICHE_TOOLTIP"] = "Afficher le texte sans retour à la ligne, le nombre ou une autre valeur spécifiée.";
bgBlockly.Msg["TEXT_AFFICHE_HELPURL"] = "";  // untranslated
bgBlockly.Msg["TEXT_AFFICHELN_TITLE"] = "afficherLn %1";
bgBlockly.Msg["TEXT_AFFICHELN_TOOLTIP"] = "Afficher le texte avec retour à la ligne, le nombre ou une autre valeur spécifiée.";
bgBlockly.Msg["TEXT_AFFICHELN_HELPURL"] = "";  // untranslated
bgBlockly.Msg["TEXT_AFFICHE_EFFACE_TITLE"] = "Efface l'affichage";
bgBlockly.Msg["TEXT_AFFICHE_EFFACE_TOOLTIP"] = "Permet d'efface l'affichage";
bgBlockly.Msg["TEXT_AFFICHE_EFFACE_HELPURL"] = "";  // untranslated

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
//====================================================
// Défini la fonctionnalité du bloc
var msg = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_NONE) || '\'\'';
return "Display(" + (  msg + "+'\\n'") + ");\n"; // Insertion d'un retour de ligne à la fin de l'affichage : "\n"
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
return "window.document.nomForm1.nomTextarea1.value = '';\n";
};
