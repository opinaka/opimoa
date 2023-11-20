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
    // Si == 3, vitesse est maximale, sans animations, donc sans aucun appel au timer. Non implémenté ici.

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

var NMAXCARD = 95; // Nombre de cartes
var glnTimerID2 = 0;  // indiquera le numéro du timer actif pour le mélange
var glnMixCount = 1; // Compte le nombre de mélange
var glnMixDestination = NMAXCARD+1; // Desination de la carte, pour les mélanges

var myInterpreter = null; /// Pour utiliser l'interpréteur javascript, qui permet une exécution au ralenti.

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

// Ces lignes indique à Blockly d'illuminer les blocks exécutés.
Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
Blockly.JavaScript.addReservedWords('highlightBlock');

demoWorkspace.addChangeListener(onchange);
onchange();  
} // RunBlockly

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
  nPosY1 = glnStopPosY + 220 * (nPosX1 - glnStartPosX) * (glnStopPosX - nPosX1) / (glnStopPosX - glnStartPosX) / (glnStopPosX - glnStartPosX);
  gloImageBouge.style.left = nPosX1 + "px";  // "px" signifie l'unité = le pixel
  gloImageBouge.style.top  = nPosY1 + "px";

  if ( ( (glnStartPosX <= glnStopPosX) && (glnStopPosX <= nPosX1) ) ||  // Start < Stop
       ( (glnStartPosX >= glnStopPosX) && (glnStopPosX >= nPosX1) ) ) { // Stop < Start
    Exchange_stop(); // Images destinations  
    return;
    }
  }

if (gloImageBouge2 != null) {
  nPosY2 = glnStartPosY + 220 * (nPosX2 - glnStartPosX) * (glnStopPosX - nPosX2) / (glnStopPosX - glnStartPosX) / (glnStopPosX - glnStartPosX);
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
glnStartPosX = 10 + nPosX1 * 10; 
glnStopPosX  = 10 + nPosX2 * 10; 

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

nPosY = glnStartPosY + 220 * (nPosX - glnStartPosX) * (glnStopPosX - nPosX) / (glnStopPosX - glnStartPosX) / (glnStopPosX - glnStartPosX);

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
glnStopPosX = 10 + nPosX2 * 10; 
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
// Arrête le comteur et indique qu'il est arrêté en mettant glnTimerID à 0.
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

// ###########################################################################

function showCode_slow() {
//========================
// Generate JavaScript code and display it.
Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
var code = Blockly.JavaScript.workspaceToCode(demoWorkspace); 

window.document.nomForm2.nomTextarea2.value += code;
window.document.nomForm2.nomTextarea2.scrollTop = 100000;  // pour rester en fin du texte.
} // showCode_slow

function nextStep1() {
//===================
if ( (glnTimerID1 != 0) || (glnTimerID2 != 0) || glfRunPause ) {
  // Attend qu'il n'y ait plus d'animation pour continuer.
  window.setTimeout(nextStep, 5);
  }
else if ( (!glfRunStop) && (myInterpreter.step()) ) {
  // Il n'y a plus d'image qui se déplace et il y a encore du code à exécuter.
  window.setTimeout(nextStep, 4);
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
bgBlockly.Msg["LOGO_MOVEX1X2_TOOLTIP"] = "déplace la carte d'une case à une autre.";
bgBlockly.Msg["LOGO_MOVEX1X2_HELPURL"] = "";  // untranslated
bgBlockly.Msg["LOGO_EXCHANGEX1X2_TITLE"] = "échange les cartes des cases %1 et %2";
bgBlockly.Msg["LOGO_EXCHANGEX1X2_TOOLTIP"] = "échange deux cartes de leur place.";
bgBlockly.Msg["LOGO_EXCHANGEX1X2_HELPURL"] = "";  // untranslated
bgBlockly.Msg["LOGO_GET_CARD_TITLE"] = "Carte de case %1";
bgBlockly.Msg["LOGO_GET_CARD_TOOLTIP"] = "Lit la valeur de la carte se trouvant dans la case donnée.";
bgBlockly.Msg["LOGO_GET_CARD_HELPURL"] = "";  // untranslated
bgBlockly.Msg["LOGO_MIX_CARD_TITLE"] = "Mélange %1 cartes, accélération de %2";
bgBlockly.Msg["LOGO_MIX_CARD_TOOLTIP"] = "Mélange des cartes. L'accélération = 1 pour la vitesse normale, 2 => deux fois plus vite.";
bgBlockly.Msg["LOGO_MIX_CARD_HELPURL"] = "";  // untranslated
bgBlockly.Msg["LOGO_CARDBACKGROUNDCOLOR_TITLE"] = "Couleur du fond de la carte %1 mis à %2";
bgBlockly.Msg["LOGO_CARDBACKGROUNDCOLOR_TOOLTIP"] = "Change la couleur du fond de la carte. #ffffff=blanc. Une chaine vide '' enlève la couleur.";
bgBlockly.Msg["LOGO_CARDBACKGROUNDCOLOR_HELPURL"] = "";  // untranslated
bgBlockly.Msg["LOGO_CASEBACKGROUNDCOLOR_TITLE"] = "Couleur du fond de la carte de la case %1 mis à %2";
bgBlockly.Msg["LOGO_CASEBACKGROUNDCOLOR_TOOLTIP"] = "Change la couleur du fond de la carte de la case. #ff0000=rouge. Une chaine vide '' enlève la couleur.";
bgBlockly.Msg["LOGO_CASEBACKGROUNDCOLOR_HELPURL"] = "";  // untranslated
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
  nTimeDelta  = parseInt(strData);
  } 

return "MoveX1X2(" + nPosX1 + ", " + nPosX2 + ", " + nTimeDelta + ");\n";
// Le dernier paramètre est le temps d'attente entre chaque déplacement de 1 pixel
};

Blockly.Blocks['logo_exchangex1x2'] = {
//=====================================
init: function() {
  this.jsonInit({
    "message0": bgBlockly.Msg['LOGO_EXCHANGEX1X2_TITLE'],
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
    "tooltip": bgBlockly.Msg['LOGO_EXCHANGEX1X2_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['LOGO_EXCHANGEX1X2_HELPURL']
    });
  }
};
Blockly.JavaScript['logo_exchangex1x2'] = function(block) {
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

Blockly.Blocks['logo_mix_cards'] = {
//==================================
init: function() {
  this.jsonInit({
    "type":"logo_mix_cards",
    "message0": bgBlockly.Msg['LOGO_MIX_CARD_TITLE'],
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
    "colour":  bgBlockly.Msg['LOGOS_HUE'],
    "tooltip": bgBlockly.Msg['LOGO_MIX_CARD_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['LOGO_MIX_CARD_HELPURL']
    });
  }
};
Blockly.JavaScript['logo_mix_cards'] = function(block) {
//=====================================================
// Mélange des cartes
var nMixNumber = Blockly.JavaScript.valueToCode(block, 'MIXNUMBER',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
var nMixAccel = Blockly.JavaScript.valueToCode(block, 'MIXACCEL',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

return "MixCards(" + nMixNumber + ", " + nMixAccel + ");\n";
};

Blockly.Blocks['logo_casebackground'] = {
//=======================================
init: function() {
  this.jsonInit({
    "message0": bgBlockly.Msg['LOGO_CASEBACKGROUNDCOLOR_TITLE'],
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
    "colour":  bgBlockly.Msg['LOGOS_HUE'],
    "tooltip": bgBlockly.Msg['LOGO_CASEBACKGROUNDCOLOR_TOOLTIP'],  
    "helpUrl": bgBlockly.Msg['LOGO_CASEBACKGROUNDCOLOR_HELPURL']
    });
  }
};
Blockly.JavaScript['logo_casebackground'] = function(block) {
//===========================================================
// Déplacement de la boule bleue à la position désirée.
var nPosX = Blockly.JavaScript.valueToCode(block, 'POSX',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
var strColor = Blockly.JavaScript.valueToCode(block, 'COLOR',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

return "CaseBackground(" + nPosX + ", " + strColor + ");\n";
// Le dernier paramètre est le temps d'attente entre chaque déplacement de 1 pixel
};

Blockly.Blocks['logo_cardbackground'] = {
//=======================================
init: function() {
  this.jsonInit({
    "message0": bgBlockly.Msg['LOGO_CARDBACKGROUNDCOLOR_TITLE'],
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
    "colour":  bgBlockly.Msg['LOGOS_HUE'],
    "tooltip": bgBlockly.Msg['LOGO_CARDBACKGROUNDCOLOR_TOOLTIP'],  
    "helpUrl": bgBlockly.Msg['LOGO_CARDBACKGROUNDCOLOR_HELPURL']
    });
  }
};
Blockly.JavaScript['logo_cardbackground'] = function(block) {
//===========================================================
// Déplacement de la boule bleue à la position désirée.
var nCard = Blockly.JavaScript.valueToCode(block, 'CARD',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
var strColor = Blockly.JavaScript.valueToCode(block, 'COLOR',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

return "CardBackground(" + nCard + ", " + strColor + ");\n";
// Le dernier paramètre est le temps d'attente entre chaque déplacement de 1 pixel
};
