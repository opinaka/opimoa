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
var glIdImage;    // id de l'image à déplacer
var glnStopPosX = 0; // Position d'arrêt lorsque la coordonnée X est à cette position
var glnStopPosY = 0; // Position d'arrêt lorsque la coordonnée Y est à cette position
var glnDeltaX = 0; // Différence de coordonnée X entre le départ à l'arrivée
var glnDeltaY = 0; // Différence de coordonnée X entre le départ à l'arrivée

// Position de la boule bleue
var glnBBPosX =  56;
var glnBBPosY = 398;
var glnCanvasWidth = 0; // Largeur du canvas

// Mémorise toute l'image, une fois pour toute.
var glimgData;
// Couleur du pixel se trouvant en position (nX, nY) d'une image de 380 pixels de largeur :
// glimData.data[4*(nX + 380*nY)  ]  ->  Rouge
// glimData.data[4*(nX + 380*nY)+1]  ->  Vert
// glimData.data[4*(nX + 380*nY)+2]  ->  Bleu
// glimData.data[4*(nX + 380*nY)+3]  ->  Opacité  (0 = transparent, 255 = opac )

function CopyImage() {
//====================
// Copie l'image dans le Canvas.
var c = document.getElementById("idCanvas");
var ctx = c.getContext("2d");
var img = document.getElementById("idLabyrinthe");
ctx.drawImage(img, 0, 0); // duplifie l'image

// Mémorise toute l'image dans un tableau globale.
glimgData = ctx.getImageData(0, 0, c.width, c.height);

glnCanvasWidth = c.width; // Largeur du canvas

// Positionne la boule bleu
var imgBouleBleueID = document.getElementById("idBouleBleue");
imgBouleBleueID.style.left = glnBBPosX + "px";
imgBouleBleueID.style.top  = glnBBPosY + "px";
var nPosY = parseInt(imgBouleBleueID.style.top);
} // CopyImage

function Stop_image() {
//=====================
// Arrête le comteur et indique qu'il est arrêté en mettant glnTimerID1 à 0.
if (glnTimerID1 !== 0) {
  clearInterval(glnTimerID1);
  glnTimerID1 = 0;
  }
} // Stop_image

function GetColor() {
//===================
// Lit la couleur se trouvant sous la boule bleu, sous son milieu
// Positionne la boule bleu
var imgBouleBleueID = document.getElementById("idBouleBleue");

var nPosX = parseInt(imgBouleBleueID.style.left)-2 +10;
var nPosY = parseInt(imgBouleBleueID.style.top)-60 + 10;    

// Quantité de rouge du pixel de l'image, sous la boule bleue
var nRedPix = glimgData.data[4*(nPosX + glnCanvasWidth*nPosY)];
var nGrePix = glimgData.data[4*(nPosX + glnCanvasWidth*nPosY)+1];
var nBluPix = glimgData.data[4*(nPosX + glnCanvasWidth*nPosY)+2];

if (nRedPix < 250) { 
  // On quitte le jaune, s'arrête
  Display("Vous quittez le parcours, X = " + (nPosX-8) +  ", Y = " + (nPosY+50) + "\n");
  Stop_image();
  }
//Display(nRedPix + " ; " + nGrePix + " ; " + nBluPix + "\n");
} // GetColor

function Deplace_image() {
//========================
// Déplace l'image "glIdImage" à la position : (glnStopPosX , glnStopPosY)
// "px" signifie l'unité = le pixel

// Prend la position de la boule "glIdImage"
var imgBouleBleueID = document.getElementById(glIdImage);
var nPosX = parseInt(imgBouleBleueID.style.left);
var nPosY = parseInt(imgBouleBleueID.style.top);
var nDX = glnStopPosX - nPosX;
var nDY = glnStopPosY - nPosY;

if ( (nDX == 0) && (nDY == 0) ) {
  Stop_image(); // La boule bleue est arribée à destination
  return;
  }

if ((nDX == 0) || ( Math.abs(nDX*glnDeltaY) < Math.abs(nDY*glnDeltaX) ) ) {
  // Déplacement vertical
  if (glnStopPosY > nPosY) {
    // Descent de 1 pixel
    nPosY += 1;
    }
  else if (glnStopPosY < nPosY) {
    // Monte de 1 pixel
    nPosY -= 1;
    }  
  }
else {
  // Déplacement horizontal
  if (glnStopPosX > nPosX) {
    // À droite de 1 pixel
    nPosX += 1;
    }
  else if (glnStopPosX < nPosX) {
    // À gauche de 1 pixel
    nPosX -= 1;
    }  
  else Stop_image(); // La boule bleue est arribée à destination.  On ne devrait jamais arriver ici.
  }

imgBouleBleueID.style.left = nPosX + "px";
imgBouleBleueID.style.top  = nPosY + "px";
GetColor();
} // Deplace_image

function GotoXY(idImage, nStopPosX, nStopPosY, delayMS) {
//========================================================
// Déplace la boule bleu en la position : (nStopPosX, nStopPosY),
// avec une attente de : delayMS [ms] entre chaque déplacement de un pixel.
// idImage est l' id  de l'image à déplacer.
// Elle est indiquée dans le champ  <data>  du champ  <block type="logo_gotoxy">  de la toolbox

glIdImage = idImage; // Mémorise de façon gllobale l'id de l'image à déplacer.
var imgBouleBleueID = document.getElementById(glIdImage);
glnDeltaX = parseInt(nStopPosX) - parseInt(imgBouleBleueID.style.left);
glnDeltaY = parseInt(nStopPosY) - parseInt(imgBouleBleueID.style.top);

glnStopPosX = nStopPosX;
glnStopPosY = nStopPosY;

if (glnTimerID1 == 0) glnTimerID1 = setInterval('Deplace_image()', delayMS); // delayMS = temps en [ms] entre deux déplacement de 1 pixel
} // BougeImageHorizontalement

// ###########################################################################

var glnTimerID0 = 0;  // indiquera le numéro du timer actif
var glGen; // le générateur

function Stop() {
//===============
// Arrête le comteur et indique qu'il est arrêté en mettant glnTimerID0 à 0.
if (glnTimerID0 !== 0) {
  clearInterval(glnTimerID0);
  glnTimerID0 = 0;
  Stop_image(); // Arrête aussi l'image, au cas où elle bougerait.
  document.getElementById("divInfo").innerHTML += "Terminé<br>"; 
  }
} // Stop

function Iterateur() {
//===================
// Exécute une itération du générateur.
if (glnTimerID1 != 0) return; // attend que le timer 1 soit arrêté.
if (glGen.next().value == 0) Stop();
} // Compteur

function SlowDown(code, timeMS) {
//===============================
// Modifie le code à exécuter, pour qu'il s'exécute au ralenti.
// timeMS est le temps d'attente après chaque affichage. "DisplayLn(...)"
var kk = 0;

// On place le code dans une fonction "generator"
code =  "function* Ralenti() {\n" + code + "\nyield 0;\n}"
      + "\nglGen = Ralenti();\n"
      + "Iterateur();\n"
      + "if (glnTimerID0 == 0) { glnTimerID0 = setInterval('Iterateur()'," + timeMS + "); }\n";
// On a ajouté les deux lignes suivantes à la suite du code, pour exécuter le code lentement.
// glGen = Ralenti(); // Initialise le générateur
// if (glnTimerID0 === 0) { glnTimerID0 = setInterval("Iterateur()", timeMS); } 
// La deuxième ligne démarre le compteur et met dans la variable glnTimerID0 le numéro de timer utilisé.

return code;
}

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
bgBlockly.Msg["LOGO_GOTOXY_TITLE"] = "vas en (%1 ; %2)";
bgBlockly.Msg["LOGO_GOTOXY_TOOLTIP"] = "Se déplace à la position donnée.";
bgBlockly.Msg["LOGO_GOTOXY_HELPURL"] = "";  // untranslated
bgBlockly.Msg["LOGO_GET_POSX_TITLE"] = "Pos X";
bgBlockly.Msg["LOGO_GET_POSX_TOOLTIP"] = "Lit la coordonnée X de la position de l'image.";
bgBlockly.Msg["LOGO_GET_POSX_HELPURL"] = "";  // untranslated
bgBlockly.Msg["LOGO_GET_POSY_TITLE"] = "Pos Y";
bgBlockly.Msg["LOGO_GET_POSY_TOOLTIP"] = "Lit la coordonnée Y de la position de l'image.";
bgBlockly.Msg["LOGO_GET_POSY_HELPURL"] = "";  // untranslated
bgBlockly.Msg["LOGO_GET_POSXY_POSX"] = "Pos X";
bgBlockly.Msg["LOGO_GET_POSXY_POSY"] = "Pos Y";
bgBlockly.Msg["LOGO_GET_POSXY_TOOLTIP"] = "Lit la coordonnée X ou Y de la position de l'image.";
bgBlockly.Msg["LOGO_GET_POSXY_HELPURL"] = "";  // untranslated
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

Blockly.Blocks['logo_gotoxy'] = {
//================================
init: function() {
  this.jsonInit({
    "message0": bgBlockly.Msg['LOGO_GOTOXY_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "POSX",
        "check":"Number"
      }
      ,{
        "type": "input_value",
        "name": "POSY",
        "check":"Number"
      }
    ],
    "data": "idBouleBleue, 5", // Valeurs par défaut.
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour":  bgBlockly.Msg['LOGOS_HUE'],
    "tooltip": bgBlockly.Msg['LOGO_GOTOXY_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['LOGO_GOTOXY_HELPURL']
    });
  }
};

Blockly.JavaScript['logo_gotoxy'] = function(block) {
//===================================================
// Déplacement de la boule bleue à la position désirée.
var nPosX = Blockly.JavaScript.valueToCode(block, 'POSX',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
var nPosY = Blockly.JavaScript.valueToCode(block, 'POSY',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

var strId_image = "idBouleBleue"; // Valeur par défaut
var nTimeDelta  = 5; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  var aData = strData.split(","); // Récupère les différents paramètres
  strId_image = aData[0];
  nTimeDelta  = aData[1];
  } 

return "GotoXY('" + strId_image + "', " + nPosX + ", " + nPosY + ", " + nTimeDelta + ");\n" + "yield 1;\n";
// Le dernier paramètre est le temps d'attente entre chaque déplacement de 1 pixel
};

Blockly.Blocks['logo_get_posx'] = {
//================================
init: function() {
  this.jsonInit({
    "type":"logo_get_posx",
    "message0": bgBlockly.Msg['LOGO_GET_POSX_TITLE'],
    "data": "idBouleBleue", // Valeurs par défaut.
    "output": "Number",
    "colour":  bgBlockly.Msg['LOGOS_HUE'],
    "tooltip": bgBlockly.Msg['LOGO_GET_POSX_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['LOGO_GET_POSX_HELPURL']
    });
  }
};

function GetPosX(strId_image) {
//=============================
// Retourne la coordonnée X de la position de l'image ayant l'id : "strId_image"
var imgID = document.getElementById(strId_image);

return parseInt(imgID.style.left);
} // GetPosX

Blockly.JavaScript['logo_get_posx'] = function(block) {
//===================================================
// Lecture de la coordonnée X de la position de l'image
var strId_image = "idBouleBleue"; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  strId_image = strData;
  } 

return ["GetPosX('" + strId_image + "')", Blockly.JavaScript.ORDER_FUNCTION_CALL]; // c.f. blockly/generators/javascript/math.js
};

Blockly.Blocks['logo_get_posy'] = {
//=================================
init: function() {
  this.jsonInit({
    "type":"logo_get_posy",
    "message0": bgBlockly.Msg['LOGO_GET_POSY_TITLE'],
    "data": "idBouleBleue", // Valeurs par défaut.
    "output": "Number",
    "colour":  bgBlockly.Msg['LOGOS_HUE'],
    "tooltip": bgBlockly.Msg['LOGO_GET_POSY_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['LOGO_GET_POSY_HELPURL']
    });
  }
};

function GetPosY(strId_image) {
//=============================
// Retourne la coordonnée Y de la position de l'image ayant l'id : "strId_image"
var imgID = document.getElementById(strId_image);

return parseInt(imgID.style.top);
} // GetPosY

Blockly.JavaScript['logo_get_posy'] = function(block) {
//=====================================================
// Lecture de la coordonnée Y de la position de l'image
var strId_image = "idBouleBleue"; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  strId_image = strData;
  } 

return ["GetPosY('" + strId_image + "')", Blockly.JavaScript.ORDER_FUNCTION_CALL]; // c.f. blockly/generators/javascript/math.js
};

Blockly.Blocks['logo_get_posxy'] = {
//==================================
init: function() {
  this.jsonInit({
    "type":"logo_get_posxy",
    "message0": "%1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "GetPos",
        "options": [
          [bgBlockly.Msg['LOGO_GET_POSXY_POSX'], 'POSX'],
          [bgBlockly.Msg['LOGO_GET_POSXY_POSY'], 'POSY']
        ]
      }
    ],
    "output": "Number",
    "colour":  bgBlockly.Msg['LOGOS_HUE'],
    "tooltip": bgBlockly.Msg['LOGO_GET_POSXY_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['LOGO_GET_POSXY_HELPURL']
    });
  }
};

Blockly.JavaScript['logo_get_posxy'] = function(block) {
//======================================================
// Lecture de la coordonnée X ou Y de la position de l'image
var strId_image = "idBouleBleue"; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  strId_image = strData;
  } 

// Demande à Blockly quel ligne (X ou Y) de la "field_dropdown" a été sélectionné
var coordonate = block.getFieldValue('GetPos');

if (coordonate == "POSX") 
  return ["GetPosX('" + strId_image + "')", Blockly.JavaScript.ORDER_FUNCTION_CALL]; // c.f. blockly/generators/javascript/math.js
else
  return ["GetPosY('" + strId_image + "')", Blockly.JavaScript.ORDER_FUNCTION_CALL]; // c.f. blockly/generators/javascript/math.js
};
