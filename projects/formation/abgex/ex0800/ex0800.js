// Adjonction de fonctionnalités à Blockly
// #######################################

var demoWorkspace; // Cette variable doit être global.

function myUpdateFunction(event) {
//================================
// Met à jour le code automatiquement.
var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
window.document.nomForm4.nomTextarea4.value = code;
} // myUpdateFunction

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

// Pour que la mise à jour soit affichée automatiquement
// c.f. https://developers.google.com/blockly/guides/configure/web/code-generators
demoWorkspace.addChangeListener(myUpdateFunction);
} // RunBlockly

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
aoText = document.getElementsByTagName("lang");

// Boucle sur toutes les balises "lang" de la page de traduction qui vient d'être chargée.
for (nn=0; nn<aoText.length; nn++) {
  strId = aoText[nn].getAttribute("id").substr(1,60);
  oHTML = document.getElementById(strId);
  if (oHTML != null) oHTML.innerHTML = aoText[nn].innerHTML;  
  }

// Pour modifier les textes de la toolbox
// Il ne faut pas modifier le innerHTML, mais l'attribut 'name'
aoText = document.getElementsByTagName("lang2");

// Boucle sur toutes les balises "lang2" de la page de traduction qui vient d'être chargée.
for (nn=0; nn<aoText.length; nn++) {
  strId = aoText[nn].getAttribute("id").substr(1,60);
  oHTML = document.getElementById(strId);
  if (oHTML != null) oHTML.setAttribute('name', aoText[nn].innerHTML);
  }

// Il serait possible de recharger la toolbox après avoir traduit automatiquement les textes désirés.
// c.f. https://developers.google.com/blockly/guides/configure/web/toolbox#changing_the_toolbox
//demoWorkspace.updateToolbox(newTree);  // newTree = "tree nodes" ???
} // bgModifyLanguage

var glstrbgLanguage = '';

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
var strFile = "msg/" + strLanguage + ".xml";
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
var strFile = "msg/js/" + glstrbgLanguage + ".js";
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
//"""""""""""""""""""""""""""""""""""""
  if (xhttp.readyState == 4) { // && xhttp.status == 200) {
    // Le document a été chargé, on peut modifier le contenu de la balise <div id="idLang">
    document.getElementById("toolbox").innerHTML = xhttp.responseText;   
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

//##############################################################################

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
