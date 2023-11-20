// Adjonction de fonctionnalités à Blockly
// #######################################

// c.f. https://developers.google.com/blockly/guides/app-integration/running-javascript
//"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

var demoWorkspace; // Cette variable doit être global.
var glfRunStop = false; // Pour permettre l'arrêt de l'exécution
var glnMoveStep = 1; // Pas de déplacement. Peut être agrandi, pour accélérer.
var glnAccelerate = 1; // Pour accélérer les mouvement, utile dans les mélanges.

function highlightBlock(id) {
//===========================
// Pour que les blocks exécutés soient illuminés.
demoWorkspace.highlightBlock(id);
} // highlightBlock

function onchange(event) {
//========================
// Appelé à chaque changement de l'espace de Blockly
document.getElementById('capacity').textContent = demoWorkspace.remainingCapacity();
} // onchange

// Cette fonction est exécutée depuis : "xhttp.onreadystatechange = function() {"
// Juste après que la toolbox ait été chargée.
function RunBlockly() {
//===================== 
// C'est ici que l'on insert les fonctionnalités Blockly
demoWorkspace = Blockly.inject('blocklyDiv',
    {media: '../../media/',
     maxBlocks: 20,
     toolbox: document.getElementById('toolbox')});

// C'est ici que l'on indique d'ajouter des blocs a l'ouverture de la page
Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), demoWorkspace);

// Ces lignes indique à Blockly d'illuminer les blocks exécutés.
Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
Blockly.JavaScript.addReservedWords('highlightBlock');

demoWorkspace.addChangeListener(onchange);
onchange();  
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
var glnZIndex = 1000; // Pour définir quelle fenêtre est au-dessus de quelle autre.

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

var glnTimerID1 = 0;  // indiquera le numéro du timer actif pour l'animation
var gloImageBouge = null;  // référence à l'image en déplacement
var glnStartPosX = 0; // Position de départ
var glnStartPosY = 0; 
var glnStopPosX = 0; // Position d'arrivée
var glnStopPosY = 0; 

var NMAXCARD = 8; // Nombre de cases
var glnMixTimerID1 = 0;  // indiquera le numéro du timer actif pour le mélange
var glnMixCount = 1; // Compte le nombre de mélange
var glnMixDestination = NMAXCARD+1; // Desination de la carte, pour les mélanges

// Pour mémoriser la position initiale des cartes.
var glanMemorise_Cartes = new Array(NMAXCARD+2);

function Stop_image() {
//=====================
// Arrête le comteur et indique qu'il est arrêté en mettant glnTimerID1 à 0.
if (glnTimerID1 != 0) {
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
  if (nProfondeur > 5) break;
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
  if (nProfondeur > 5) break;
  }

if (glnTimerID1 == 0) glnTimerID1 = setInterval('Deplace_image()', delayMS); // delayMS = temps en [ms] entre deux déplacement de 1 pixel

// Stop_image(); // Si on veut déplacer l'image sans animation.
} // MoveX1X2

function Stop() {
//===============
// Arrête le comteur et indique qu'il est arrêté en mettant glnTimerID à 0.
if (glnMixTimerID1 !== 0) {
  clearInterval(glnMixTimerID1);
  glnMixTimerID1 = 0;
  }
} // Stop

function IterateurMix() {
//=======================
// Exécute une itération du mélangeur de cartes.
if (glnTimerID1 != 0) return; // attend que le timer 1 soit arrêté.

if (glnMixCount <= 0) { Stop(); glnAccelerate = 1; return; } // Mélange terminé

if ( (glnMixCount == 1) || glfRunStop ) { 
  MoveX1X2(NMAXCARD+1, glnMixDestination, 0); // Dernière carte à se déplacer
  glnMixCount = 0;
  return;
  }

// NMAXCARD = nombre de cases pouvant contenir des cartes.
var n1 = 1 + Math.floor( NMAXCARD * Math.random() ); // Une case qui voit sa carte aller dans la case de destination
while (n1 == glnMixDestination) n1 = 1 + Math.floor( NMAXCARD * Math.random() ); // Assure que n1 != glnMixDestination
MoveX1X2(n1, glnMixDestination, 0); // 0 => vitesse maximale du timer.
glnMixDestination = n1;
glnMixCount--;
} // IterateurMix

function MixCards(nMixCount, nAccelerate) {
//=========================================
// Mélange les cartes
// nMixCount indique le nombre de cartes mélangées. Si == 1, alors pas de mélange.
// nAccelerate indique l'accélération de déplacement, 1 = pas d'accélération.

glnMixCount = nMixCount + 1;
glnAccelerate = nAccelerate; // Pour accélérer la vitesse des mélanges
if (glnAccelerate < 1) glnAccelerate = 1;

glnMixDestination = NMAXCARD+1; // Position de destination de la première carte
if (glnMixTimerID1 == 0) glnMixTimerID1 = setInterval(IterateurMix, 5);

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

function MemoriseSituationInitiale() {
//====================================
// Mémorise la position des cartes au début.

// Parcours les  NMAXCARD  places pour mémoriser les cartes qui s'y trouvent.
var nn = 0;
var idImage = 'idPos';
var oImage = null;

for (nn=1; nn<=NMAXCARD+1; nn++) {
  idImage = 'idPos' + (100 + nn);
  oImage = document.getElementById(idImage + '1');
  // L'id termine par '1' pour la carte du dessus du tas
  if (oImage == null) {
    // Pas de carte à cette place
    glanMemorise_Cartes[nn] = 0;
    }
    else {
    glanMemorise_Cartes[nn] = parseInt(oImage.getAttribute("name"));    
    }
  }

//for (nn=1; nn<=NMAXCARD+1; nn++) { Display(nn + ' > ' + glanMemorise_Cartes[nn] + ' ; '); } Display('\n');
} // MemoriseSituationInitiale

function TestReponse() {
//======================
// Test si les deux cartes ont bien été permutées.
var nCarteNum = 0;
var nInit = 0; // Case avant déplacements
var nFin = 0;  // Case après déplacements
var idImage = 'idPos';
var anCase_Carte = new Array(NMAXCARD+2);
var oImage = null;
var fOK = true; // On part de l'hypothèse que les cartes ont bien été permuttées

// Enregistre le contenu des  NMAXCARD  cases
for (nFin=1; nFin<=NMAXCARD+1; nFin++) {
  idImage = 'idPos' + (100 + nFin);
  oImage = document.getElementById(idImage + '1');
  // L'id termine par '1' pour la carte du dessus du tas
  if (oImage == null) anCase_Carte[nFin] = 0;   // Pas de carte à cette place
  else anCase_Carte[nFin] = parseInt(oImage.getAttribute("name")); // Numéro de la carte  
  }

// En parcourrant les NMAXCARD cases, test de permuttation.
// Si, avant déplacements, une carte se trouve dans la case 'nInit'
// cherche la case 'nFin' qui contenait cette carte après déplacements.
// On a donc : Carte_avant[nInit] == Carte_après[nFin]
// Pour avoir eu une permuttation de deux cartes, il faut que : Carte_avant[nFin] == Carte_après[nInit]
for (nFin=1; nFin<=NMAXCARD; nFin++) {
  if (anCase_Carte[nFin] == 0) {
    if (glanMemorise_Cartes[nFin] != 0) { fOK = false; break; } // Il y avait une carte dans une case au départ où il n'y en a plus
    }
  else {
    // Il y a une carte à cette place.
    // Cherche dans quelle case se trouvait cette carte au départ
    for (nInit=1; nInit<=NMAXCARD+1; nInit++) {
      if (glanMemorise_Cartes[nInit] == anCase_Carte[nFin]) break; // case trouvée, mise dans nInit
      }
    if (nInit > NMAXCARD) { fOK = false; break; } // La carte était en dehors des NMAXCARD cases.
    if (nInit == nFin) { fOK = false; break; } // La carte se trouvant dans la même case qu'au départ.
    if (glanMemorise_Cartes[nFin] != anCase_Carte[nInit]) { fOK = false; break; } // Il n'y a pas eu permuttation de deux cartes
    }
  } // for

if (fOK) PlaySound('../medias/carill2.mp3', "Bravo, trois paires de cartes ont bien été permuttées");
else     PlaySound('../medias/chimes.mp3', "Une ou des paires de cartes n'ont pas été permuttées");
} // TestReponse

// ###########################################################################

function showCode_slow(timeMS) {
//==============================
// Generate JavaScript code and display it.
Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
var code = Blockly.JavaScript.workspaceToCode(demoWorkspace); 

window.document.nomForm2.nomTextarea2.value += code;
window.document.nomForm2.nomTextarea2.scrollTop = 100000;  // pour rester en fin du texte.
} // showCode_slow

var myInterpreter;

function nextStep() {
//===================
if ( (glnTimerID1 != 0) ) {
  // Attend qu'il n'y ait plus d'animation pour continuer.
  window.setTimeout(nextStep, 5);
  }
else if (myInterpreter.step()) {
  // Il n'y a plus d'image qui se déplace et il y a encore du code à exécuter.
  window.setTimeout(nextStep, 1);
  }
else {
  highlightBlock(null); // Pour n'avoir aucun bloc illuminé à la fin.
  TestReponse();
  }
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

} // initApi

function runCode_slow(timeMS) {
//=============================
// Exécute le code javascript lentement.
// timeMS est le temps en millisecondes entre deux affichages.
window.LoopTrap = 1000;
Blockly.JavaScript.INFINITE_LOOP_TRAP =
    'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
Blockly.JavaScript.INFINITE_LOOP_TRAP = null;

try {
  MemoriseSituationInitiale(); // Mémorise le contenu des 5 cases au départ.
  myInterpreter = new Interpreter(code, initApi);
  nextStep();  
  //myInterpreter.run(); // si on veut une exécution sans pauses.

  //eval(code); // A été remplacé par les deux lignes ci-dessus.
  } 
catch (e) {
  alert(e);
  }
} // runCode_slow

function runMyCode_slow(code, timeMS) {
//=====================================
// Exécute le code javascript lentement.
// timeMS est le temps en millisecondes entre deux affichages.

try {
  MemoriseSituationInitiale(); // Mémorise le contenu des 5 cases au départ.
  myInterpreter = new Interpreter(code, initApi);
  nextStep();  
  //myInterpreter.run(); // si on veut une exécution sans pauses.

  //eval(code); // A été remplacé par les deux lignes ci-dessus.
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
