// Adjonction de fonctionnalités à Blockly
// #######################################
// Quelques références, par ordre de profondeur :
// https://developers.google.com/blockly/reference/js/Blockly.Workspace   sur le workspace
// https://developers.google.com/blockly/reference/js/Blockly.Toolbox     sur la Toolbox
// https://developers.google.com/blockly/reference/js/Blockly.Block       sur les blocs
// https://developers.google.com/blockly/reference/js/Blockly.Field       sur les Field
// https://developers.google.com/blockly/guides/configure/web/events

// https://developers.google.com/blockly/reference/js/Blockly.WorkspaceSvg   ???  est une extension (descendant) de Blockly.workspace

var demoWorkspace; // Cette variable doit être global.  C'est un objet de type : WorkspaceSvg qui est un descendant de Workspace

var glnCpt = 0; // Compte combien de fois myUpdate est appelé

// Mémorise l'objet qui est déplacé
var glnObject;   // est un Blockly.Block

function myUpdateFunction(event) {
//================================
// Met à jour le code automatiquement.
// c.f. https://developers.google.com/blockly/guides/configure/web/events
//var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
//window.document.nomForm2.nomTextarea2.value = glnCpt + "\n" + code;

glnObject = demoWorkspace.getBlockById(event.blockId);  // est un Blockly.Block
// event.blockId = glnObject.id  lorsque l'objet n'est pas null

//Display("id=" + demoWorkspace.getBlockById(event.blockId) + "\n");  // Retourne le texte alternatif de l'image
//Display("id1=" + event.blockId + "\n");  // Retourne l'id du Block, qui n'est pas une id d'une balise HTML
//Display("id2=" + glnObject.id + "\n");  // Retourne l'id du Block, qui n'est pas une id d'une balise HTML

showCode();
}

// Cette fonction est exécutée depuis : "xhttp.onreadystatechange = function() {"
// Juste après que la toolbox ait été chargée.
function RunBlockly() {
//===================== 
// C'est ici que l'on insert les fonctionnalités Blockly
// demoworkspace est un objet de type : Blockly.Workspace
demoWorkspace = Blockly.inject('blocklyDiv',
    {media: '../../media/',
     toolbox: document.getElementById('toolbox')});

// C'est ici que l'on indique d'ajouter des blocs a l'ouverture de la page
Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), demoWorkspace);

// Pour que la mise à jour soit affichée automatiquement
// c.f. https://developers.google.com/blockly/guides/configure/web/code-generators
demoWorkspace.addChangeListener(myUpdateFunction);
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

glnCpt++; // Pour compter combien de fois showCode() est appelé
window.document.nomForm2.nomTextarea2.value = glnCpt + '\n'; // Efface et affiche le compteur.

window.document.nomForm2.nomTextarea2.value += code;
window.document.nomForm2.nomTextarea2.scrollTop = 100000;  // pour rester en fin du texte.

// Pour afficher les coordonnées du block
// c.f. https://developers.google.com/blockly/reference/js/Blockly.Block
if (glnObject != null) {      
  // Coordonnées relativement à la région où se trouvent les blocks.
  //Display('X,Y= ' + glnObject.getRelativeToSurfaceXY().x + ' ; ' + glnObject.getRelativeToSurfaceXY().y + '\n');
  //Display('OrigineOffset X, Y = ' + demoWorkspace.getOriginOffsetInPixels().x + ' ; ' + demoWorkspace.getOriginOffsetInPixels().y + '\n');  // Position x, y du haut gauche de la région des blocks

  //Display('workspace width = ' + demoWorkspace.getWidth() + '\n');
  //??Display('workspace height = ' + demoWorkspace.getHeight() + '\n');  // getHeight() n'existe pas !?!
  //Display('Toolbox position = ' + demoWorkspace.toolboxPosition + '\n');
  // Display('Toolbox = ' + demoWorkspace.toolbox + '\n');  // Ne donne rien.
  //Display('Toolbox = ' + demoWorkspace.getToolbox + '\n');  // donne une fonction qui est censé retourné une référence au toolbox
  //Display('Toolbox = ' + demoWorkspace.toolbox_ + '\n');  // Ne donne rien.
  }
 
// Pour un Test 
// Si on touche à la souris
if ( (glnObject != null) && (glnObject.data == 'LIFE') ) {      
  // Pour un test, si la souris à assez à droite sur l'écran, fait apparaître l'image de la souris brulée en-dessous
  var imgMouseBurned = document.getElementById('idMouseBurned');
  if (glnObject.getRelativeToSurfaceXY().x > 200) {
    //Display(glnObject.getRelativeToSurfaceXY().x + ' ');
    imgMouseBurned.style.display = 'inline-block';
    imgMouseBurned.style.left = demoWorkspace.getOriginOffsetInPixels().x + glnObject.getRelativeToSurfaceXY().x + 10 + 'px';
    imgMouseBurned.style.top = demoWorkspace.getOriginOffsetInPixels().y + glnObject.getRelativeToSurfaceXY().y + 64 +  'px';
    }
  else {
    imgMouseBurned.style.display = 'none';
    }
  }
  
if (code.indexOf('PLUG_LIFE', 0) < 0) return; // Pas de souris mise dans la prise
  //Display('pos=' + code.indexOf('PLUG_LIFE', 0) + "\n");
  
// Si on met dans la prise, la souris est grillée
 
  // On va changer l'image de la souris.
  if ( (glnObject != null) && (glnObject.data == 'LIFE') ) {      

    // c.f. https://developers.google.com/blockly/reference/js/Blockly.Block
    var myField = glnObject.getField('myMouse'); // Champ qui doit contenir un "FieldImage" ???

    if ( (myField != null) && (glnObject.data == 'LIFE') ) {
      // c.f. https://developers.google.com/blockly/reference/js/Blockly.Field
      //Display(myField.getSize().width + ' ...\n'); // Retourne la largeur de l'objet
      //Display(myField.getSize().height + ' ...\n'); // Retourne la hauteur de l'objet
      //Display(myField.getText() + ' ...\n'); // Retourne le texte associé à l'objet.
      //Display(myField.getValue() + ' ...\n'); // Retourne le nom du fichier image associé à l'objet
      //myField.setText('nouveau Texte'); // Change le texte associé à l'objet
      // myField.dispose(); // Efface l'image ou probablement le "FieldImage"
      Display('La souris est grillée\n');
      
      myField.setTooltip('Souris grillée !!!'); // Change le texte d'aide associé à l'objet
      myField.setValue('puzzle_mouse_burned.jpg'); // Change l'image de la souris
      myField.setText('Souris_grillee'); // Change le texte associé à la souris
      //Display(glnObject.data + "\n");
      glnObject.data = 'DEAD';
      }
    }
  
} // showCode

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

// Adjonction de textes personalités dans les blocs
goog.provide('bgBlockly.Msg.fr');
goog.require('bgBlockly.Msg');


Blockly.Blocks['puzzle_notebook'] = {
//""""""""""""""""""""""""""""""""""
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("puzzle_notebook.jpg", 100, 100, "Ordinateur portable"));
    this.setOutput(true, null);
    this.setColour(90);
    this.setTooltip("C'est un ordinateur portable");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['puzzle_notebook'] = function(block) {
//=======================================================
  var msg = "'Ordinateur portable'";
  return [msg, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['puzzle_screen'] = {
//""""""""""""""""""""""""""""""""""
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("puzzle_screen.jpg", 100, 100, "Écran"));
    this.setOutput(true, null);
    this.setColour(90);
    this.setTooltip("C'est un écran");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['puzzle_screen'] = function(block) {
//=====================================================
  var msg = "'un écran'";
  return [msg, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['puzzle_keyboard'] = {
//""""""""""""""""""""""""""""""""""""
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("puzzle_keyboard.jpg", 100, 100, "Clavier"));
    this.setOutput(true, null);
    this.setColour(90);
    this.setTooltip("C'est un clavier");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['puzzle_keyboard'] = function(block) {
//=======================================================
  var msg = "'un clavier'";
  return [msg, Blockly.JavaScript.ORDER_NONE];
};

var MOUSE = 1024;
Blockly.Blocks['puzzle_mouse'] = {
//""""""""""""""""""""""""""""""""""""
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("puzzle_mouse.jpg", 100, 100, "Souris"), 'myMouse');
    this.setOutput(true, null);
    this.setColour(90);
    this.setTooltip("C'est une souris");
    this.setHelpUrl("");
    this.data = 'LIFE';
  }
};
Blockly.JavaScript['puzzle_mouse'] = function(block) {
//=======================================================
// Je  modifie l'image d'un block.

var msg = this.data;
return [msg, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['puzzle_desktop'] = {
//""""""""""""""""""""""""""""""""
  init: function() {
    this.jsonInit({
      "message0": "Desktop %1 %2 %3 Écran %4 Clavier %5 Souris %6",
      "args0": [
        {
          "type": "input_dummy"
        },
        {
          "type": "field_image",
          "src": "puzzle_desktop.jpg",
          "width": 100,
          "height": 100,
          "alt": "230 V"
        },
        {
          "type": "input_dummy"
        },
        {
          "type": "input_value",
          "name": "SCREEN",
          "align": "CENTRE"
        },
        {
          "type": "input_value",
          "name": "KEABORD",
          "align": "CENTRE"
        },
        {
          "type": "input_value",
          "name": "MOUSE",
          "align": "CENTRE"
        }
      ],
      "inputsInline": false,
      "output": null,
      "colour": 230,
      "tooltip": "Prise de courant 230 V",
      "helpUrl": ""
    });
  }
};
Blockly.JavaScript['puzzle_desktop'] = function(block) {
//====================================================
  // Ajoute la suite d'instructions
  var msg1 = Blockly.JavaScript.valueToCode(block, 'SCREEN',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  var msg2 = Blockly.JavaScript.valueToCode(block, 'KEABORD',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  var msg3 = Blockly.JavaScript.valueToCode(block, 'MOUSE',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';

  var msg = "'Desktop avec : ' + " + msg1 + "+ ' et ' + " + msg2 + "+ ' et ' + " + msg3;
  return [msg, Blockly.JavaScript.ORDER_NONE];
};

// Test de définitions de blocs
Blockly.Blocks['puzzle_power_plug'] = {
//"""""""""""""""""""""""""""""""""""""
  init: function() {
    this.jsonInit({
      "message0": "Prise 230 V %1 %2 %3",
      "args0": [
        {
          "type": "input_dummy"
        },
        {
          "type": "field_image",
          "src": "puzzle_power_plug.jpg",
          "width": 100,
          "height": 100,
          "alt": "230 V"
        },
        {
          "type": "input_value",
          "name": "APPAREIL",
          "align": "CENTRE"
        }
      ],
      "inputsInline": false,
      "colour": 230,
      "tooltip": "Prise de courant 230 V",
      "helpUrl": ""      
    });
  }
};
Blockly.JavaScript['puzzle_power_plug'] = function(block) {
//=========================================================
// Ajoute la suite d'instructions
var msg = Blockly.JavaScript.valueToCode(block, 'APPAREIL',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
  
return "PLUG_" + msg + "\n";
};
