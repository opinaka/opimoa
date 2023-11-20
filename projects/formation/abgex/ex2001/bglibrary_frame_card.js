// Adjonction de fonctionnalités à Blockly
// #######################################

/*
Le but est d'ajouter une sous-fenêtre, qui traite de cadres pouvant contenir des cartes.
*/

function OneCanvas() {
//===================
// Créateur de l'objet associé au canvas.
this.marginRight = 5;  // marge entre la droite du dernier cadre et la droite du canvas
this.marginBottom = 5 + 6; // marge entre le bas du dernier cadre et le bas du canvas   + 6 pour le numéro de la case.
this.backgroundColor = "rgb(255,255,250)"; // Couleur de fond du canvas
this.vDim = 1; // Facteur de conversion de unités arbitraires en pixels, pour adapter à la sous-fenêtre.
this.nbCards = 0; // Nombre de cartes existantes
// Les  id  vont de 101 à (100 + nbCards)
// Chaque carte mémorise la case dans laquelle elle se trouve et sa profondeur dans un tas. (1=dessus du tas)

this.cHide = ""; // Si vide, accepte la superposition de cartes.
                 // Si == "c", une carte placée sur une autre fait disparaitre la carte du dessous.
                 //            donc n'accepte pas la superposition de cartes.

this.CardFlipWidth = 80; // Durant l'animation de retournement, largeur de la carte.
this.CardFlipWidthInitial = 80; // Durant l'animation de retournement, largeur initiale de la carte
this.oImageBouge1 = null; // Carte à retourner ou a déplacer
this.oImageBouge2 = null; // Carte à échanger avec oImageBouge1
//
// Position de départ de la carte
this.nStartPosX = 0;
this.nStartPosY = 0;

// Position d'arrivée de la carte - position de départ de la carte
this.nDeltaPosX = 0;
this.nDeltaPosY = 0;

// Direction perpendiculaire à la trajectoire, pour l'incurver
this.PerpX = 0;
this.PerpY = 0;

// Largeur et hauteur de la carte au départ de l'animation
this.nCardWidth = 0;
this.nCardHeight = 0;

// Variation de largeur et de hauteur de l'image entre l'arrivée et le départ.
this.nDeltaWidth  = 0;
this.nDeltaHeight = 0;

// Pour les pas de déplacement de la carte sur sa trajectoire        
this.nStep = 0;
this.nStepStop = 0;

this.nCardsShift = 10;  // Pour décaler les cartes se trouvant sur le même tas.

this.fFrameCardsResize = false; 
// Indique si la sous-fenêtre des cartes a été redimensionnée en cours d'animation.
// Si oui, toute la fenêtre sera dessinée en fin d'animation.

// Résultat du dernier test d'existence du fichier correspondant à une carte.
// = -1 durant l'attente de réponse
// =  0 si le fichier n'existe pas
// =  1 si le fichier existe.
this.nCardExist = 0;

this.strSource = "../images/Carte"; // Source des images des cartes, un nombre entre 100 et 999 suivra
this.strExt = ".png"; // Extension des images des cartes. ".png", ".jpg" et ".gif" est habituel.

// Pour rester dans l'exécution du programme de l'interpréteur javascript et gérer les événements.
this.fProgramRun = true;
} // OneCanvas

var gloCanvas = new OneCanvas(); // Objet contenant les paramètres du canvas

function OneFrame() {
//===================
// Créateur de l'objet associé à un cadre.
// Les cadres contiendront des cartes.
this.posX = 0; // Position du cadre, en unité arbitraire. Sera adapté à la largeur de la sous-fenêtre.
this.posY = 0; // Position du cadre
this.deltaX = 50;  // Largeur du cadre
this.deltaY = 50;  // Hauteur du cadre
this.fWithNumber = true; // Indique si le numéro de case est affiché ou non
this.color = "rgb(0,0,255)"; // Couleur du cadre.  -1 => pas de couleur
this.background_color = "rgb(230,255,255)"; // Couleur de fond.  "" => pas de couleur 
this.width = 1; // Largeur du trait du cadre 
this.margin = 3; // marge entre le trait du cadre et la carte qu'il contiendra 
this.nNbCards = 0; // Nombre de cartes contenues dans ce cadre.
} // OneFrame

var MAX_FRAMES = 231;
var glaoFrames = new Array(MAX_FRAMES); // Crée un tableau de de cadres
var glnFramesMax = -1; // Indice maximal du nombre de cadres utilisés Indices vont de 0 à glnFramesMax.

for (var nn=0; nn<MAX_FRAMES; nn++) glaoFrames[nn] = new OneFrame(); // Crée les cadres
  
function myFrameCardsResize(myEvent) {
//====================================
// Pour adapter la taille du Canvas à la taille de la div "idFrameCards"
// L'intégralité du contenu est aussi redessiné.
var oDiv = document.getElementById('idFrameCards');
var oCanvas = document.getElementById('idFrameCardsCanvas');

var nWidth  = parseInt(oDiv.style.width); // Largeur du canvas
var nHeight = parseInt(oDiv.style.height) - 18; // Hauteur du canvas
oCanvas.width = nWidth;
oCanvas.height = nHeight;
//console.log(oDiv.style.width);
oCanvas.style.backgroundColor = gloCanvas.backgroundColor;

// Redessine le contenu du canevas.
//---------------------------------
// Création d'une variable pour accéder au canvas
var ctx = oCanvas.getContext("2d");

ctx.beginPath();

var nn = 0;

// Détermine les positions max des cadres, pour adapter leur dimensions au canvas
var maxX = 1;
var maxY = 1;
var temp = 0;
for (nn=1; nn<=glnFramesMax; nn++) {
  temp = glaoFrames[nn].posX + glaoFrames[nn].deltaX;
  if (maxX < temp) maxX = temp;
  
  temp = glaoFrames[nn].posY + glaoFrames[nn].deltaY;
  if (maxY < temp) maxY = temp;
  }
  
// Pour adapter la dimension des cadres aux dimensions du canvas
var vDim  = nWidth  / (maxX + gloCanvas.marginRight); 
var vDimY = nHeight / (maxY + gloCanvas.marginBottom); 
if (vDim > vDimY) vDim = vDimY; // garde la plus petite dimension.

// Mémorise le facteur de conversion d'unité, pour obtenir des pixels
gloCanvas.vDim = vDim;

for (nn=1; nn<=glnFramesMax; nn++) {
  ctx.strokeStyle = glaoFrames[nn].color;
  ctx.moveTo( (glaoFrames[nn].posX                        ) * vDim, (glaoFrames[nn].posY                        ) * vDim); 
  ctx.lineTo( (glaoFrames[nn].posX + glaoFrames[nn].deltaX) * vDim, (glaoFrames[nn].posY                        ) * vDim); 
  ctx.lineTo( (glaoFrames[nn].posX + glaoFrames[nn].deltaX) * vDim, (glaoFrames[nn].posY + glaoFrames[nn].deltaY) * vDim); 
  ctx.lineTo( (glaoFrames[nn].posX                        ) * vDim, (glaoFrames[nn].posY + glaoFrames[nn].deltaY) * vDim); 
  ctx.lineTo( (glaoFrames[nn].posX                        ) * vDim, (glaoFrames[nn].posY                        ) * vDim); 
  
  if (glaoFrames[nn].background_color != "") {
    ctx.fillStyle = glaoFrames[nn].background_color; 
    ctx.fillRect(glaoFrames[nn].posX * vDim, glaoFrames[nn].posY * vDim, glaoFrames[nn].deltaX * vDim, glaoFrames[nn].deltaY * vDim);
    }
  } // for
  
ctx.stroke(); // c'est ici que les traits sont effectivement tracés.

// Affiche les numéros de cases sous les cases. Peut être désactivé pour chaque case.
ctx.font = (1 + parseInt(vDim * 12)) + "px Arial";
ctx.fillStyle = "black";
for (nn=1; nn<=glnFramesMax; nn++) {
  if (glaoFrames[nn].fWithNumber) {
    ctx.fillText(nn, (glaoFrames[nn].posX + glaoFrames[nn].deltaX / 2 -  6)* vDim, 
                     (glaoFrames[nn].posY + glaoFrames[nn].deltaY     + 10)* vDim);
    }
  } // for

//----------------------------------------------------------------------------
// Placement des cartes et agustement de leur taille aux dimensions des cases.
var oImage = null; // une carte
var nCase = 0; // numéro de la case dans laquelle se trouve la carte.
var nDepth = 0; // Profondeur de la carte dans le tas

for (nn=1; nn<=gloCanvas.nbCards; nn++) {
  oImage = document.getElementById('idPos' + (100 + nn)); // La carte numéro : nn
  nCase = parseInt(oImage.getAttribute("data-frame"));
  nDepth = parseInt(oImage.getAttribute("data-depth"));
  oImage.style.left = ( glaoFrames[nCase].posX + glaoFrames[nCase].margin + 
                        (glaoFrames[nCase].nNbCards -nDepth)*gloCanvas.nCardsShift ) * vDim + "px";
  oImage.style.top  = (glaoFrames[nCase].posY + glaoFrames[nCase].margin) * vDim + "px";
  oImage.width      = (glaoFrames[nCase].deltaX - 2 * glaoFrames[nCase].margin ) * vDim;
  oImage.height     = (glaoFrames[nCase].deltaY - 2 * glaoFrames[nCase].margin ) * vDim;
  } // for

if ( (gloB.funcMouseMove != "") && (gloB.nTimerID1 != 0) ){
  // Si la fenêtre est redimensionnée durant une animation, indique de redessiner 
  // la sous-fenêtre en fin d'animation.
  gloCanvas.fFrameCardsResize = true;
  }
} // myFrameCardsResize


// ******************************************************************************************
// Définition de fonctions d'animations et de déplacement des cartes.
// ******************************************************************************************


function initApi_card(interpreter, scope) {
//=========================================
  // Add an API function for highlighting blocks.
var wrapper;

wrapper = function(nFrame, nDepth) { return GetCardValue(nFrame, nDepth); };
interpreter.setProperty(scope, 'GetCardValue', interpreter.createNativeFunction(wrapper));

wrapper = function(nFrame, delayMS) { return CardFlip(nFrame, delayMS); };
interpreter.setProperty(scope, 'CardFlip', interpreter.createNativeFunction(wrapper));

wrapper = function(nFrame1, nFrame2, delayMS) { return CardMoveF1F2(nFrame1, nFrame2, delayMS); };
interpreter.setProperty(scope, 'CardMoveF1F2', interpreter.createNativeFunction(wrapper));

wrapper = function(nFrame1, nFrame2, delayMS) { return CardExchangeF1F2(nFrame1, nFrame2, delayMS); };
interpreter.setProperty(scope, 'CardExchangeF1F2', interpreter.createNativeFunction(wrapper));

wrapper = function(nCard) { return CardExistTest(nCard); };
interpreter.setProperty(scope, 'CardExistTest', interpreter.createNativeFunction(wrapper));

wrapper = function() { return CardExistResponse(); };
interpreter.setProperty(scope, 'CardExistResponse', interpreter.createNativeFunction(wrapper));

wrapper = function(nCard, nBack, nFrame2, delayMS) { return CardAddOne(nCard, nBack, nFrame2, delayMS); };
interpreter.setProperty(scope, 'CardAddOne', interpreter.createNativeFunction(wrapper));

wrapper = function(nFrame1, delayMS) { return CardRemoveOne(nFrame1, delayMS); };
interpreter.setProperty(scope, 'CardRemoveOne', interpreter.createNativeFunction(wrapper));

wrapper = function(nCardShiftNew, delayMS) { return CardSetShift(nCardShiftNew, delayMS); };
interpreter.setProperty(scope, 'CardSetShift', interpreter.createNativeFunction(wrapper));

wrapper = function(strSource, strExt) { return CardSourceDefine(strSource, strExt); };
interpreter.setProperty(scope, 'CardSourceDefine', interpreter.createNativeFunction(wrapper));

wrapper = function(nCard, nFrame1) { return cardBackDefine(nCard, nFrame1); };
interpreter.setProperty(scope, 'cardBackDefine', interpreter.createNativeFunction(wrapper));

wrapper = function(nFrame1, strFunction, strParam1) { return CardLinkFunction(nFrame1, strFunction, strParam1); };
interpreter.setProperty(scope, 'CardLinkFunction', interpreter.createNativeFunction(wrapper));

wrapper = function(nFrame1, nDepth) { return CardGetParam(nFrame1, nDepth); };
interpreter.setProperty(scope, 'CardGetParam', interpreter.createNativeFunction(wrapper));

wrapper = function(nFrame1, nDepth, strParam1) { return CardSetParam(nFrame1, nDepth, strParam1); };
interpreter.setProperty(scope, 'CardSetParam', interpreter.createNativeFunction(wrapper));

wrapper = function() { return ProgramRun(); };
interpreter.setProperty(scope, 'ProgramRun', interpreter.createNativeFunction(wrapper));

wrapper = function() { return ProgramStop(); };
interpreter.setProperty(scope, 'ProgramStop', interpreter.createNativeFunction(wrapper));
  
/*
wrapper = function(nMixCount, nAccelerate) { return MixCards(nMixCount, nAccelerate); };
interpreter.setProperty(scope, 'MixCards', interpreter.createNativeFunction(wrapper));

wrapper = function(nPosX, strColor) { return CaseBackground(nPosX, strColor); };
interpreter.setProperty(scope, 'CaseBackground', interpreter.createNativeFunction(wrapper));
*/

} // initApi_card

gloB.funcAfterInitApi = initApi_card;

// ******************************************************************************************
// Définition des fonctionnalités des nouveaux blocs
// ******************************************************************************************

function GetCardFromFrame(nFrame, nDepth) {
//=========================================
// Retourne l'index de la carte se trouvant dans le cadre  nFrame  à la profondeur nDepth.
// nDepth = 1 pour la carte du dessus.
// Retourne  0  s'il n'y a pas de carte.

if (nFrame < 0) return 0;

var oImage = null; // une carte
var nn = 0;
var nCardFrame = 0; // case dans laquelle se trouve la carte en cours de traitement
var nCardDepth = 0; // profondeur dans le tas de la carte en cours de traitement

// Cherche parmi toutes les cartes, s'il y en a une qui se trouve à l'endroit désiré.
for (nn=1; nn<=gloCanvas.nbCards; nn++) {
  oImage = document.getElementById('idPos' + (100 + nn)); // La carte numéro : nn
  nCardFrame = parseInt(oImage.getAttribute("data-frame"));
  
  if (nCardFrame == nFrame) {
    // Une carte dans le cadre désiré a été trouvée, teste si la profondeur correspond
    nCardDepth = parseInt(oImage.getAttribute("data-depth"));
    
    if (nCardDepth == nDepth) {
      // Une carte dans à la bonne profondeur trouvée, retourn l'index de cette carte
      return nn;
      }
    }
  } // for

return 0; // Pas de carte trouvée à l'endroit cherché
} // GetCardFromFrame

function GetCardValue(nFrame, nDepth) {
//=====================================
// Retourne la valeur de la carte se trouvant dans le cadre nFrame et la profondeur nDepth
// Retourne  0  s'il n'y a pas de carte.
// La valeur est négative s'il s'agit d'une carte dont le nom de fichier de termine pas par un nombre.

var nImage = GetCardFromFrame(nFrame, nDepth);
if (nImage == 0) return 0; // Il n'y a pas de carte à dans cette case et cette profondeur.

var oImage = document.getElementById('idPos' + (100 + nImage)); // Pointeur sur la carte

var strNum = oImage.getAttribute("data-face"); // Numéro de la face visible
return parseInt(strNum); // Numéro de la face visible
} // GetCardValue

function Stop_FilpAnimation() {
//=============================
// Arrête le comteur et indique qu'il est arrêté en mettant gloB.nTimerID1 à 0.
if (gloB.nTimerID1 !== 0) {
  clearInterval(gloB.nTimerID1);
  gloB.nTimerID1 = 0;
  }
} // Stop_FilpAnimation

function CardFlipAnimation() {
//============================
// Retourne la carte de la case  gloCanvas.oImageBouge1, avec animation du retournement.

gloCanvas.CardFlipWidth -= gloB.nMoveStep; // retourne la carte en réduisant la largeur de son image.
gloCanvas.oImageBouge1.width = Math.abs(gloCanvas.CardFlipWidth); // Change la largeur de l'image, ce qui lui donne l'impression d'être retournée.

if ( (gloCanvas.CardFlipWidth <= 0) && ((gloCanvas.CardFlipWidth > -gloB.nMoveStep)) ) {
  // Au moment où la carte est devenu de largeur toute petite, change la carte, comme si on la retournait
  var strFace = gloCanvas.oImageBouge1.getAttribute("data-face"); // Face visible
  var strFaceSrc = gloCanvas.oImageBouge1.getAttribute("data-face-src");
  var strFaceExt = gloCanvas.oImageBouge1.getAttribute("data-face-ext");
  var strBack = gloCanvas.oImageBouge1.getAttribute("data-back"); // Face cachée
  var strBackSrc = gloCanvas.oImageBouge1.getAttribute("data-back-src");
  var strBackExt = gloCanvas.oImageBouge1.getAttribute("data-back-ext");
  gloCanvas.oImageBouge1.setAttribute("data-face", strBack);
  gloCanvas.oImageBouge1.setAttribute("data-face-src", strBackSrc);
  gloCanvas.oImageBouge1.setAttribute("data-face-ext", strBackExt);
  gloCanvas.oImageBouge1.setAttribute("data-back", strFace);
  gloCanvas.oImageBouge1.setAttribute("data-back-src", strFaceSrc);
  gloCanvas.oImageBouge1.setAttribute("data-back-ext", strFaceExt);
  gloCanvas.oImageBouge1.setAttribute("title", strBack); // Le numéro affiché de la carte
  gloCanvas.oImageBouge1.setAttribute("alt", strBack); // Le numéro affiché de la carte
  if (parseInt(strBack) < 0) strBack = ""; // Numéro attribué par l'utilisateur.
  gloCanvas.oImageBouge1.src = strBackSrc + strBack + strBackExt;
  }

if (gloCanvas.CardFlipWidth <= -gloCanvas.CardFlipWidthInitial) {
  Stop_FilpAnimation();
  gloCanvas.oImageBouge1.width = Math.abs(gloCanvas.CardFlipWidthInitial);
  }
} // CardFlipAnimation
  
function CardFlip(nFrame, delayMS) {
//==================================
// Retourne la carte de la case  nFrame,  du dessus du tas, avec animation du retournement.
// C.f. http://html5doctor.com/html5-custom-data-attributes/  pour des information sur l'attribut "data-*"

var nImage = GetCardFromFrame(nFrame, 1);
if (nImage == 0) return; // Il n'y a pas de carte à dans cette case.

var oImage = document.getElementById('idPos' + (100 + nImage)); // Pointeur sur la carte
gloCanvas.oImageBouge1 = oImage;

// Largeur de l'image.
gloCanvas.CardFlipWidth = parseInt(oImage.width); // Largeur de l'image de la carte
gloCanvas.CardFlipWidthInitial = gloCanvas.CardFlipWidth; // Mémorise la largeur initiale de la carte

if (gloB.nInterpreterSpeed <= 2) {
  if (gloB.nTimerID1 == 0) gloB.nTimerID1 = setInterval('CardFlipAnimation()', delayMS); // delayMS = temps en [ms] entre deux déplacement animaations
  }
else { // exécution rapide, sans animation.
  // Change la carte, comme si on la retournait
  var strFace = gloCanvas.oImageBouge1.getAttribute("data-face"); // Face visible
  var strFaceSrc = gloCanvas.oImageBouge1.getAttribute("data-face-src");
  var strFaceExt = gloCanvas.oImageBouge1.getAttribute("data-face-ext");
  var strBack = gloCanvas.oImageBouge1.getAttribute("data-back"); // Face cachée
  var strBackSrc = gloCanvas.oImageBouge1.getAttribute("data-back-src");
  var strBackExt = gloCanvas.oImageBouge1.getAttribute("data-back-ext");
  gloCanvas.oImageBouge1.setAttribute("data-face", strBack);
  gloCanvas.oImageBouge1.setAttribute("data-face-src", strBackSrc);
  gloCanvas.oImageBouge1.setAttribute("data-face-ext", strBackExt);
  gloCanvas.oImageBouge1.setAttribute("data-back", strFace);
  gloCanvas.oImageBouge1.setAttribute("data-back-src", strFaceSrc);
  gloCanvas.oImageBouge1.setAttribute("data-back-ext", strFaceExt);
  gloCanvas.oImageBouge1.setAttribute("title", strBack); // Le numéro affiché de la carte
  gloCanvas.oImageBouge1.setAttribute("alt", strBack); // Le numéro affiché de la carte
  if (parseInt(strBack) < 0) strBack = ""; // Numéro attribué par l'utilisateur.
  gloCanvas.oImageBouge1.src = strBackSrc + strBack + strBackExt;
  }
} // CardFlip

function Stop_Carte() {
//=====================
// Arrête le comteur et indique qu'il est arrêté en mettant gloB.nTimerID1 à 0.
if (gloB.nTimerID1 !== 0) {
  clearInterval(gloB.nTimerID1);
  gloB.nTimerID1 = 0;

  if (gloCanvas.fFrameCardsResize) { // Pour assurer que les cartes sont bien en place.
    gloCanvas.fFrameCardsResize = false;
    myFrameCardsResize(null);
    } 
  }

// Remet les cartes à leurs hauteurs initiales
gloCanvas.oImageBouge1.style.zIndex = 501;
if (gloCanvas.oImageBouge2 != null) {
  gloCanvas.oImageBouge2.style.zIndex = 501;
  gloCanvas.oImageBouge2 = null;
  }

// Test s'il faut supprimer de la mémoire l'élément HTML contenant la carte.
//if (gloCanvas.oImageBouge1.getAttribute("data-frame") == "-1") {
  // Ne supprime pas la carte de la mémoire, car sinon 
  // il faudrait gérer le fait que certaines "idPos + (100 + ...)" n'ont plus d'id.
  // Cela complique un peu les traitement.
  // Cela devrait se faire dans :
  // ° GetCardFromFrame(...), juste après : oImage = document.getElementById('idPos' + (100 + nn));
  // ° myFrameCardsResize(myEvent), juste après : oImage = document.getElementById('idPos' + (100 + nn));
//  var strS = document.getElementById('idCards').innerHTML; console.log(strS);
//  gloCanvas.oImageBouge1.parentNode.removeChild(gloCanvas.oImageBouge1);
//  var strS = document.getElementById('idCards').innerHTML; console.log(strS);
//  }

} // Stop_Carte

function Deplace_Carte() {
//========================
// Déplace la carte de la position de départ à la position d'arrivée
// "px" signifie l'unité = le pixel

gloCanvas.nStep++;
var vT = gloCanvas.nStep / gloCanvas.nStepStop;
var vPosX = gloCanvas.nStartPosX + vT*gloCanvas.nDeltaPosX + vT*(1 - vT)*gloCanvas.PerpX;
var vPosY = gloCanvas.nStartPosY + vT*gloCanvas.nDeltaPosY + vT*(1 - vT)*gloCanvas.PerpY;

gloCanvas.oImageBouge1.style.left = parseInt(vPosX) + "px";
gloCanvas.oImageBouge1.style.top  = parseInt(vPosY) + "px";

// Largeur et hauteur de la carte au cours du mouvement.
var vWidth  = gloCanvas.nCardWidth  + vT*gloCanvas.nDeltaWidth;
var vHeight = gloCanvas.nCardHeight + vT*gloCanvas.nDeltaHeight;

gloCanvas.oImageBouge1.width  = parseInt(vWidth);
gloCanvas.oImageBouge1.height = parseInt(vHeight);

if (gloCanvas.nStep == gloCanvas.nStepStop) { // Arrêt de déplacement de la carte
  Stop_Carte();
  }
} // Deplace_Carte

function CardMoveF1F2(nFrame1, nFrame2, delayMS) {
//================================================
// Déplace la carte de la case  nFrame1  à la case  nFrame2
// Ne fait rien, s'il n'y a pas de carte dans la case  nFrame1
// Ne fait rien si la case est en dehors des cases possibles.
// avec une attente de : delayMS [ms] entre chaque déplacement de un pixel.
var nFrame2Mem = nFrame2; // Mémorise le cadre d'arrivée, utile dans le cas d'effacer une carte, avec nFrame2 = -1
if (nFrame2 == -1) nFrame2 = 0; // On commence par déplacer la carte en case 0, normalement à lextérieur de la fenêtre.

if (  (nFrame1 == nFrame2) || (nFrame2 < 0) || (nFrame2  > glnFramesMax) ) return; // rien à faire

var nImage = GetCardFromFrame(nFrame1, 1); // Index de la carte se trouvant dans la case de départ
if (nImage == 0) return; // Il n'y a pas de carte à dans cette case.

var oImage = document.getElementById('idPos' + (100 + nImage)); // Pointeur sur la carte
gloCanvas.oImageBouge1 = oImage;  // Mémorise la carte à déplacer

// Mémorise le changement du nombre de cartes dans chacun des deux cadres
glaoFrames[nFrame1].nNbCards--;
glaoFrames[nFrame2].nNbCards++;

// Largeur et hauteur de la carte au départ.
gloCanvas.nCardWidth    = (glaoFrames[nFrame1].deltaX - 2 * glaoFrames[nFrame1].margin ) * gloCanvas.vDim;
gloCanvas.nCardHeight   = (glaoFrames[nFrame1].deltaY - 2 * glaoFrames[nFrame1].margin ) * gloCanvas.vDim;

// Variation de largeur et de hauteur de l'image entre l'arrivée et le départ.
gloCanvas.nDeltaWidth  = (glaoFrames[nFrame2].deltaX - 2 * glaoFrames[nFrame2].margin ) * gloCanvas.vDim - gloCanvas.nCardWidth;
gloCanvas.nDeltaHeight = (glaoFrames[nFrame2].deltaY - 2 * glaoFrames[nFrame2].margin ) * gloCanvas.vDim - gloCanvas.nCardHeight;

// Parcours toutes les cartes.
// Celles qui sont dans la même case d'arrivée, augmente leur profondeur de 1
// Celles qui sont dans la même case de départ, diminue leur profondeur de 1
var nn = 0;
var nCardFrame = 0; // case dans laquelle se trouve la carte en cours de traitement
var nCardDepth = 0; // profondeur dans le tas de la carte en cours de traitement
var nNumberCardAtEnd = 0; // Nombre de cartes sur le tas d'arrivée

for (nn=1; nn<=gloCanvas.nbCards; nn++) {
  oImage = document.getElementById('idPos' + (100 + nn)); // La carte numéro : nn
  nCardFrame = parseInt(oImage.getAttribute("data-frame")); // Cadre dans laquelle se trouve la carte
  
  if (nCardFrame == nFrame1) { 
    // Une carte dans le cadre de départ
    nCardDepth = parseInt(oImage.getAttribute("data-depth")) - 1;
    oImage.setAttribute("data-depth", nCardDepth);
    oImage.style.zIndex = 501 - nCardDepth;  
    }
  
  if (nCardFrame == nFrame2Mem) { 
    // Une carte dans le cadre d'arrivée
    nNumberCardAtEnd++;
    nCardDepth = parseInt(oImage.getAttribute("data-depth")) + 1;
    
    if (gloCanvas.cHide == "c") {
      // On ne peut pas mettre plus d'une carte par case. Les cartes du dessous sont éliminées
      oImage.style.visibility = 'hidden';
      oImage.setAttribute("data-frame", -1); // Mise hors des cases
      nCardDepth = 400; // Mis tout en bas
      } // Cache la carte, elle est irrécupérable.

    oImage.setAttribute("data-depth", nCardDepth);
    oImage.style.zIndex = 501 - nCardDepth;  
    }
  } // for

// Place la carte qui se déplace au-dessus des autres.
gloCanvas.oImageBouge1.setAttribute("data-depth", '1');
gloCanvas.oImageBouge1.style.zIndex = 700; // Momentané, durant le déplacement

// Indique la case dans laquelle se trouve la carte à la fin
gloCanvas.oImageBouge1.setAttribute("data-frame", nFrame2Mem);

if (gloB.nInterpreterSpeed <= 2) {
  // Animation de déplacement de la carte
  // Position de départ de la carte
  gloCanvas.nStartPosX = parseInt(gloCanvas.oImageBouge1.style.left);
  gloCanvas.nStartPosY = parseInt(gloCanvas.oImageBouge1.style.top);

  // Position d'arrivée de la carte - position de départ de la carte.
  // On décale la carte, s'il y en a déjà d'autres sur le tas.
  gloCanvas.nDeltaPosX =   (glaoFrames[nFrame2].posX + glaoFrames[nFrame2].margin + nNumberCardAtEnd*gloCanvas.nCardsShift) * gloCanvas.vDim 
                         - gloCanvas.nStartPosX;
  gloCanvas.nDeltaPosY =   (glaoFrames[nFrame2].posY + glaoFrames[nFrame2].margin) * gloCanvas.vDim
                         - gloCanvas.nStartPosY;

  // Perpendiculaire au déplacement, pour donner un effet de courbe
  if (gloCanvas.nDeltaPosX >= 0) { // Pour que la carte passe par le bas de la trajectoire directe.
    gloCanvas.PerpX = -gloCanvas.nDeltaPosY / 2;
    gloCanvas.PerpY =  gloCanvas.nDeltaPosX / 2;
    }
  else {
    gloCanvas.PerpX =  gloCanvas.nDeltaPosY / 2;
    gloCanvas.PerpY = -gloCanvas.nDeltaPosX / 2;
    }
    
  gloCanvas.nStep = 0; // Initialisation
  gloCanvas.nStepStop = 1 + Math.round( Math.sqrt(gloCanvas.nDeltaPosX*gloCanvas.nDeltaPosX + gloCanvas.nDeltaPosY*gloCanvas.nDeltaPosY) /
                                        gloB.nMoveStep); // Nombre de pas de déplacement de l'image.
  
  if (gloB.nTimerID1 == 0) gloB.nTimerID1 = setInterval('Deplace_Carte()', delayMS); // delayMS = temps en [ms] entre deux déplacement de 1 pixel
  }
else { // exécution rapide, sans animation.
  // Positionne l'image à l'arrivée
  gloCanvas.oImageBouge1.style.left = (glaoFrames[nFrame2].posX + glaoFrames[nFrame2].margin + nNumberCardAtEnd*gloCanvas.nCardsShift)
                                   * gloCanvas.vDim + "px";
  gloCanvas.oImageBouge1.style.top  = (glaoFrames[nFrame2].posY + glaoFrames[nFrame2].margin) * gloCanvas.vDim + "px";

  gloCanvas.oImageBouge1.width  = gloCanvas.nCardWidth  + gloCanvas.nDeltaWidth;
  gloCanvas.oImageBouge1.height = gloCanvas.nCardHeight + gloCanvas.nDeltaHeight;
  
  // Remet la carte à sa hauteur initiale
  gloCanvas.oImageBouge1.style.zIndex = 501;
  
//  if (nFrame2Mem == -1) {
    // Ne supprime pas la carte de la mémoire, car sinon 
    // il faudrait gérer le fait que certaines "idPos + (100 + ...)" n'ont plus d'id.
    // Cela complique un peu les traitement.
    // Cela devrait se faire dans :
    // ° GetCardFromFrame(...), juste après : oImage = document.getElementById('idPos' + (100 + nn));
    // ° myFrameCardsResize(myEvent), juste après : oImage = document.getElementById('idPos' + (100 + nn));
//    oImage.parentNode.removeChild(oImage);
//    }
  }

} // CardMoveF1F2

function Exchange_Cards() {
//=========================
// Échange les cartes des positions de départ et d'arrivée
// "px" signifie l'unité = le pixel

gloCanvas.nStep++;
var vT = gloCanvas.nStep / gloCanvas.nStepStop;

// Première carte à déplacer
var vPosX = gloCanvas.nStartPosX + vT*gloCanvas.nDeltaPosX + vT*(1 - vT)*gloCanvas.PerpX;
var vPosY = gloCanvas.nStartPosY + vT*gloCanvas.nDeltaPosY + vT*(1 - vT)*gloCanvas.PerpY;

gloCanvas.oImageBouge1.style.left = parseInt(vPosX) + "px";
gloCanvas.oImageBouge1.style.top  = parseInt(vPosY) + "px";

// Largeur et hauteur de la première carte au cours du mouvement.
var vWidth  = gloCanvas.nCardWidth  + vT*gloCanvas.nDeltaWidth;
var vHeight = gloCanvas.nCardHeight + vT*gloCanvas.nDeltaHeight;

gloCanvas.oImageBouge1.width  = parseInt(vWidth);
gloCanvas.oImageBouge1.height = parseInt(vHeight);

// Deuxième carte à déplacer
vT = 1 - vT;
vPosX = gloCanvas.nStartPosX + vT*gloCanvas.nDeltaPosX + vT*(1 - vT)*gloCanvas.PerpX;
vPosY = gloCanvas.nStartPosY + vT*gloCanvas.nDeltaPosY + vT*(1 - vT)*gloCanvas.PerpY;

gloCanvas.oImageBouge2.style.left = parseInt(vPosX) + "px";
gloCanvas.oImageBouge2.style.top  = parseInt(vPosY) + "px";

// Largeur et hauteur de la deuxième carte au cours du mouvement.
vWidth  = gloCanvas.nCardWidth  + vT*gloCanvas.nDeltaWidth;
vHeight = gloCanvas.nCardHeight + vT*gloCanvas.nDeltaHeight;

gloCanvas.oImageBouge2.width  = parseInt(vWidth);
gloCanvas.oImageBouge2.height = parseInt(vHeight);

if (gloCanvas.nStep == gloCanvas.nStepStop) { // Arrêt de déplacement de la carte
  Stop_Carte();
  }
} // Exchange_Cards

function CardExchangeF1F2(nFrame1, nFrame2, delayMS) {
//====================================================
// Échange les cartes des cases  nFrame1  et  nFrame2
// Ne fait rien, s'il n'y a pas de carte dans l'une des cases  nFrame1 ou  nFrame2 
// Ne fait rien si une des cases est en dehors des cases possibles.
// avec une attente de : delayMS [ms] entre chaque déplacement de un pixel.

if (  (nFrame1 == nFrame2) || (nFrame2 < 0) || (nFrame2  > glnFramesMax)
                           || (nFrame1 < 0) || (nFrame1  > glnFramesMax) ) return; // rien à faire

var nImage1 = GetCardFromFrame(nFrame1, 1); // Index de la carte se trouvant dans la case de départ
if (nImage1 == 0) return; // Il n'y a pas de carte à dans cette case.

var nImage2 = GetCardFromFrame(nFrame2, 1); // Index de la carte se trouvant dans la case de départ
if (nImage2 == 0) return; // Il n'y a pas de carte à dans cette case.

var oImage1 = document.getElementById('idPos' + (100 + nImage1)); // Pointeur sur la carte 1
gloCanvas.oImageBouge1 = oImage1;  // Mémorise la carte 1 à déplacer

var oImage2 = document.getElementById('idPos' + (100 + nImage2)); // Pointeur sur la carte 2
gloCanvas.oImageBouge2 = oImage2;  // Mémorise la carte 2 à déplacer

// Place les cartes qui se déplacent au-dessus des autres.
gloCanvas.oImageBouge1.style.zIndex = 700; // Momentané, durant le déplacement
gloCanvas.oImageBouge2.style.zIndex = 700; // Momentané, durant le déplacement

// Indique les cases dans lesquelles se trouvent les cartes à la fin
gloCanvas.oImageBouge1.setAttribute("data-frame", nFrame2);
gloCanvas.oImageBouge2.setAttribute("data-frame", nFrame1);

if (gloB.nInterpreterSpeed <= 2) {
  // Animation de déplacement de la carte
  // Position de départ de la carte
  gloCanvas.nStartPosX = parseInt(gloCanvas.oImageBouge1.style.left);
  gloCanvas.nStartPosY = parseInt(gloCanvas.oImageBouge1.style.top);

  // Position d'arrivée de la carte - position de départ de la carte.
  // On décale la carte, s'il y en a déjà d'autres sur le tas.
  gloCanvas.nDeltaPosX = parseInt(gloCanvas.oImageBouge2.style.left) - gloCanvas.nStartPosX;
  gloCanvas.nDeltaPosY = parseInt(gloCanvas.oImageBouge2.style.top)  - gloCanvas.nStartPosY;

  // Perpendiculaire au déplacement, pour donner un effet de courbe
  if (gloCanvas.nDeltaPosX >= 0) { // Pour que la carte passe par le bas de la trajectoire directe.
    gloCanvas.PerpX = -gloCanvas.nDeltaPosY / 2;
    gloCanvas.PerpY =  gloCanvas.nDeltaPosX / 2;
    }
  else {
    gloCanvas.PerpX =  gloCanvas.nDeltaPosY / 2;
    gloCanvas.PerpY = -gloCanvas.nDeltaPosX / 2;
    }

  // Largeur et hauteur de la carte au départ.
  gloCanvas.nCardWidth    = (glaoFrames[nFrame1].deltaX - 2 * glaoFrames[nFrame1].margin ) * gloCanvas.vDim;
  gloCanvas.nCardHeight   = (glaoFrames[nFrame1].deltaY - 2 * glaoFrames[nFrame1].margin ) * gloCanvas.vDim;

  // Variation de largeur et de hauteur de l'image entre l'arrivée et le départ.
  gloCanvas.nDeltaWidth  = (glaoFrames[nFrame2].deltaX - 2 * glaoFrames[nFrame2].margin ) * gloCanvas.vDim - gloCanvas.nCardWidth;
  gloCanvas.nDeltaHeight = (glaoFrames[nFrame2].deltaY - 2 * glaoFrames[nFrame2].margin ) * gloCanvas.vDim - gloCanvas.nCardHeight;

  gloCanvas.nStep = 0; // Initialisation
  gloCanvas.nStepStop = 1 + Math.round( Math.sqrt(gloCanvas.nDeltaPosX*gloCanvas.nDeltaPosX + gloCanvas.nDeltaPosY*gloCanvas.nDeltaPosY) /
                                        gloB.nMoveStep); // Nombre de pas de déplacement de l'image.
  
  if (gloB.nTimerID1 == 0) gloB.nTimerID1 = setInterval('Exchange_Cards()', delayMS); // delayMS = temps en [ms] entre deux déplacement de 1 pixel
  }
else { // exécution rapide, sans animation.
  // Positionne les cartes à leurs places
  var memLeft = gloCanvas.oImageBouge1.style.left;
  var memTop  = gloCanvas.oImageBouge1.style.top;
  gloCanvas.oImageBouge1.style.left = gloCanvas.oImageBouge2.style.left;
  gloCanvas.oImageBouge1.style.top  = gloCanvas.oImageBouge2.style.top;

  gloCanvas.oImageBouge2.style.left = memLeft;
  gloCanvas.oImageBouge2.style.top  = memTop;

  // Échange la largeur des deux cartes.
  var memWidth  = gloCanvas.oImageBouge1.width;
  var memHeight = gloCanvas.oImageBouge1.height;
  gloCanvas.oImageBouge1.width  = gloCanvas.oImageBouge2.width;
  gloCanvas.oImageBouge1.height = gloCanvas.oImageBouge2.height;

  gloCanvas.oImageBouge2.width  = memWidth;
  gloCanvas.oImageBouge2.height = memHeight;

  // Remet les cartes à leurs hauteurs initiales
  gloCanvas.oImageBouge1.style.zIndex = 501;
  gloCanvas.oImageBouge2.style.zIndex = 501;
  gloCanvas.oImageBouge2 = null;
  }

} // CardExchangeF1F2

// Il est nécessaire d'avoir les 4 fonctions ci-dessous, 
// pour tester l'existance d'un fichier.
function MyImageCheck(imageSrc) {
//===============================
// Teste si le fichier d'une image existe.
// S'il existe, la variable globale gloCanvas.nCardExist est mise à 1
// S'il n'existe pas, la variable globale gloCanvas.nCardExist est mise à 0
// Durant l'attente de réponse, la variable globale gloCanvas.nCardExist est à -1
var img = new Image();

img.onload =
  function() { // Cas où le fichier de l'image existe.
    // c.f. https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload
    gloCanvas.nCardExist = 1;
    };
    
img.onerror = 
  function() { // Cas où le fichier de l'image n'existe pas.
    //var oImage = document.getElementById(idImage);
    //var strFace = "9" + oImage.getAttribute("data-face");
    //oImage.setAttribute("data-face", strFace);    
    //oImage.setAttribute("title", strFace); 
    //oImage.setAttribute("alt", strFace); 
    gloCanvas.nCardExist = 0; // le fichier de la carte n'existe pas
    };
    
img.src = imageSrc;
} // MyImageCheck

function Card_wait_existence_response() {
//=======================================
// Fonction appelée régulièrement par le Timer gloB.nTimerID1
// pour savoir si le fichier d'une image existe ou non.
// Tant que  gloCanvas.nCardExist  == -1, on a pas la réponse et il faut attendre.

if (gloCanvas.nCardExist != -1) {
  // On a la réponse sur l'existance du fichier,
  // on arrête le timer, donc le programme peut continuer.
  // gloCanvas.nCardExist == 1 si le fichier existe, 0 sinon.
  clearInterval(gloB.nTimerID1);
  gloB.nTimerID1 = 0;
  }
// Else, on continue d'attendre une réponse.
} // Card_wait_existence_response

function CardExistTest(nCard) {
//=============================
// Test si le fichier de la carte  nCard  existe
// Cela prend du temps, donc un timer doit être utilisé pour cela et 
// le programme doit être bloqué le temps d'obtenir une réponse.

// Test si le fichier de l'image de la carte existe.
gloCanvas.nCardExist = -1; // On ne sait pas si la carte existe ou non.
var strSrc = gloCanvas.strSource + nCard + gloCanvas.strExt;
if (nCard < 0) strSrc = gloCanvas.strSource + gloCanvas.strExt; // Cas de fichier non suivit par un nombre.

MyImageCheck(strSrc);

// Lance le Timer, qui bloquera l'exécution du programme, jusqu'à ce que l'on sache si 
// le fichier de la carte existe ou non
if (gloB.nTimerID1 == 0) gloB.nTimerID1 = setInterval('Card_wait_existence_response()', 20);
else console.log("Erreur dans CardExistTest, le timer n'est pas à 0.");

} // CardExistTest

function CardExistResponse() {
//============================
// Réponse au bloc précédent qui a testé si le fichier d'une carte donné existait ou non.
// C'est compliqué, car le temps du test est long et 
// on ne peut pas bloquer javascript pour attendre la réponse, 
// autrement qu'en utilisant un timer et en stockant la réponse dans une variable.
// Retourne  1 si le fichier de l'image existe.
// Retourne  0 s'il n'existe pas
// Retourne -1 si on ne sait pas encore s'il existe ou non.
return gloCanvas.nCardExist;
} // CardExistResponse

function CardAddOne(nCard, nBack, nFrame2, delayMS) {
//===================================================
// Adjonction de la CARTE  nCard  dans la case  nFrame1
// nBack = dos de la carte, 900 pour bleu, 910 pour rouge, autre est possible.
// delayMS = temps en ms entre deux déplacements de 1 pixel

if ( (nFrame2 < 0) || (nFrame2  > glnFramesMax) ) return; // rien à faire

// Place la carte dans la case 0, pour la déplacer ensuite dans la case désirée.
// Ainsi il y a un effet visuel d'adjonction de carte.
var nFrame1 = 0;

// Parcours toutes les cartes.
// Celles qui sont dans la même case, augmente leur profondeur de 1.
var nn = 0;
var nCardFrame = 0; // case dans laquelle se trouve la carte en cours de traitement
var nCardDepth = 0; // profondeur dans le tas de la carte en cours de traitement
var nNumberCardAtEnd = 0; // Nombre de cartes sur le tas d'arrivée

for (nn=1; nn<=gloCanvas.nbCards; nn++) {
  oImage = document.getElementById('idPos' + (100 + nn)); // La carte numéro : nn
  nCardFrame = parseInt(oImage.getAttribute("data-frame")); // Cadre dans laquelle se trouve la carte
  
  if (nCardFrame == nFrame1) { 
    // Une carte est dans le cadre où l'on ajoute une carte
    nNumberCardAtEnd++;
    nCardDepth = parseInt(oImage.getAttribute("data-depth")) + 1;

    oImage.setAttribute("data-depth", nCardDepth);
    oImage.style.zIndex = 501 - nCardDepth;  
    }
  } // for

var strSrc = gloCanvas.strSource + nCard + gloCanvas.strExt;
if (nCard < 0) strSrc = gloCanvas.strSource + gloCanvas.strExt; // Cas de fichier sans nombre à la fin du nom.

gloCanvas.nbCards++; // Augmente le nombres totale de cartes
var strInstr = " <img src='" + strSrc + "' alt='" + nCard + "' " //width=80 height=128"
             +  "\n id='idPos" + (100 + gloCanvas.nbCards) + "'" // Les id vont de 101 à (100 + gloCanvas.nbCards)
             +  "\n data-frame='" + nFrame1 + "'" // Indique la case dans laquelle la carte se trouve
             +  "\n data-depth='1'" // Indique la position de la carte dans un tas
             +  "\n data-face-src='" + gloCanvas.strSource + "'" // Indique la source du nom du fichier image
             +  "\n data-face-ext='" + gloCanvas.strExt + "'"  // Indique le nom de l'extension du fichier image
             +  "\n data-face='" + nCard + "'" // Indique la face visible de la carte
             +  "\n data-back-src='" + gloCanvas.strSource + "'" // Indique la source du nom du fichier image
             +  "\n data-back-ext='" + gloCanvas.strExt + "'"  // Indique le nom de l'extension du fichier image
             +  "\n data-back='" + nBack + "'"  // Indique le dos de la carte
             +  "\n title='" + nCard + "'" // Si on va sur la carte, indique le numéro correspondant à ce que l'on voit.
             +  "\n onclick='CallBlocklyFunc(\"idPos" + (100 + nn) + "\");'" // pour appeler une fonction définie dans Blockly lorsqu'on clique sur la carte.
             +  "\n data-func-exec=''" // Pour indiquer si un événement a demandé l'exécution de la fonction associée à la carte
             +  "\n data-func=''" // Nom de la fonction Blocly à appeler, vide s'il y en a aucune.
             +  "\n data-param1=' '" // Un paramètre optionnelle lors de l'appelle à la fonction Blockly
             +  "\n style='position:absolute;"
             +  "left:" + ( glaoFrames[nFrame1].posX + glaoFrames[nFrame1].margin + 
                           (glaoFrames[nFrame1].nNbCards -1)*gloCanvas.nCardsShift ) * gloCanvas.vDim + "px; "
             +  "top:"  + ( glaoFrames[nFrame1].posY + glaoFrames[nFrame1].margin)   * gloCanvas.vDim + "px; "
             + " z-index:500'>\n";
    glaoFrames[nFrame1].nNbCards++; // Ajoute une carte au cadre dans lequel on a ajouté la carte

// Ajoute la carte au code HTML
document.getElementById('idCards').innerHTML += strInstr; 

// Déplace la carte dans la case désirée.
CardMoveF1F2(nFrame1, nFrame2, delayMS);

/*
// Ne fonctionne pas à grande vitesse !
// checkImage("../images/Carte" + nCard + ".png", function(){ alert("good"); }, function(){ alert("bad"); } ); // Ceci fonctionne
// Si la carte n'existe pas, change son numéro en ajoutant un 9 devant. On additionne 9000 au numéro de sa face.
checkImage("../images/Carte" + nCard + ".png", 
  function(){ var rep = 1;}, // Ne fait rien.
  function() { // Cas où l'image n'existe pas.
    var oImage = document.getElementById("idPos" + (100 + gloCanvas.nbCards));
    var strFace = "9" + oImage.getAttribute("data-face");
    oImage.setAttribute("data-face", strFace);    
    oImage.setAttribute("title", strFace); 
    oImage.setAttribute("alt", strFace); 
    } );
*/
} // CardAddOne

//Pas utilisé
function checkImage(imageSrc, good, bad) {
//========================================
// Test si une image existe.
// Si elle n'existe pas, appelle la fonction bad.
var img = new Image();
img.onload = good; // Appelle la fonction good au chargement.
img.onerror = bad;
img.src = imageSrc;
} // checkImage

function CardRemoveOne(nFrame1, delayMS) {
//========================================
// Efface la carte qui se trouve dans le cadre  nFrame1,
// la supprime totalement, elle ne sera plus accéssible.

CardMoveF1F2(nFrame1, -1, delayMS); // delayMS = temps en ms entre deux déplacements d'un pixel.
// La case de destination -1, indique qu'il faut supprimer la carte.
} // CardRemoveOne

function CardSetShift(nCardShiftNew, delayMS) {
//=============================================
// Change le décalage des cartes lorsqu'elles sont superposées.
// Pour l'instant, il n'y a pas d'animation, donc  delayMS  n'est pas utilisé.

gloCanvas.nCardsShift = nCardShiftNew;
myFrameCardsResize(null); // Redessine le toute, pour voir le nouveau décalage des cartes.
} // CardSetShift

function CardSourceDefine(strSourceNew, strExtNew) {
//==================================================
// Définit la source des fichiers images. "../images/Carte" par défaut.
// Définit également l'extension des fichiers images, soit '.png', soit '.jpg' ou '.jpeg', soit '.gif'.  '.png' par défaut.
// Le numéro entre 100 et 999 sera ajouté à la source de l'image.

gloCanvas.strSource = strSourceNew;
gloCanvas.strExt = strExtNew;
} // CardSourceDefine

function cardBackDefine(nCard, nFrame1) {
//=======================================
// Change l'image du dos de la carte.
// Ceci ne sera visible que lorsque la carte sera retournée.
// Si nCard < 0, le numéro ne sera pas utilisé dans le nom de fichier, 
// ce qui permet d'inclure des fichiers d'images ne terminant pas par un nombre.
// Si on cherche le nombre correspondant à l'image, on obtient un nombre négatif.

if ( (nFrame1 <= 0) || (nFrame1 > glnFramesMax) ) return; // rien à faire

var nImage = GetCardFromFrame(nFrame1, 1); // Index de la carte se trouvant dans la case nFrame1

if (nImage == 0) return; // Il n'y a pas de carte à dans cette case.

var oImage = document.getElementById('idPos' + (100 + nImage)); // Pointeur sur la carte

oImage.setAttribute("data-back", nCard);
oImage.setAttribute("data-back-src", gloCanvas.strSource);
oImage.setAttribute("data-back-ext", gloCanvas.strExt);
} // cardBackDefine

function CallBlocklyFunc(idCard) {
//================================
// idCard  est l'id de la carte sur laquelle on a cliqué.
// Si le nom de la fonction est donnée dans 'data-func', appelle la fonction Blockly correspondante
// lorsque l'on clique sur la carte.
// Deux paramètres seront transmis :
// 1) la case dans laquelle se trouve la carte
// 2) le paramètre stocké dans data-param1
// Vu que le code javascript généré par Blockly est relancé,
// aucune variable n'a mémorisé sa valeur depuis la précédente exécution.
// C'est pour cela que deux blocs supplémentaires sont ajoutés,
// pour sauver et charger des valeurs d'une exécution à l'autre.
// Elles sont dans la carétogrie "Variables".

var oImage = document.getElementById(idCard); // Pointeur sur la carte

if (gloB.fIsRunning) { // Code Blockly en cours d'exécution
  // En cours d'exécution, gestion des événements.
  // Indique d'exécuter la fonction associée à la carte
  oImage.setAttribute("data-func-exec", "exec");
  oImage.setAttribute("data-param1", "exec");  // !!!! ???? TEMPORAIRE, POUR DES TESTS
  console.log('set exec', idCard);
  return;
  }

var strFunc = oImage.getAttribute("data-func");
if (strFunc == "") return; // aucune fonction associée.

var strFrame  = oImage.getAttribute("data-frame");  // Case dans laquelle se trouve la carte, sera le premier paramètre transmis à la fonction
var strParam1 = oImage.getAttribute("data-param1"); // Deuxième paramètre transmis à la fonction.

gloB.strCodeAddEnd = strFunc + "(" + strFrame + ", '" + strParam1 + "');";

// Exécution du code dans l'interpréteur de code.
// Vu que  gloB.strCodeAddEnd  n'est pas vide, un pré-traitement et post-traitement sera fait dans runCode_slow
runCode_slow(gloB.nInterpreterSpeed, gloB.nTimeMSBlocks);
} // CallBlocklyFunc

function CardLinkFunction(nFrame1, strFunction) {
//===============================================
// Indique d'exécuter la fonction Blockly  strFunction  avec le paramètre  strParam1
// lorsque l'on clique sur la carte de la case  nFrame.
// La fonction  strFunction de Blockly sera appelée avec deux paramètres, c.f. "CallBlocklyFunc"

if ( (nFrame1 <= 0) || (nFrame1 > glnFramesMax) ) return; // rien à faire

var nImage = GetCardFromFrame(nFrame1, 1); // Index de la carte se trouvant dans la case nFrame1

if (nImage == 0) return; // Il n'y a pas de carte à dans cette case.

var oImage = document.getElementById('idPos' + (100 + nImage)); // Pointeur sur la carte

oImage.setAttribute("data-func", strFunction);
} // CardLinkFunction

function CardGetParam(nFrame1, nDepth) {
//======================================
// nFrame1  est le numéro du case dans laquelle se trouve la carte désirée
// nDepth indique la profondeur de la carte dans le tas.  1 = le dessus du tas.
// Retourne le paramètre associé à la carte de la case donnée.

if ( (nFrame1 < 0) || (nFrame1 > glnFramesMax) ) return ""; // case non existant

var nImage = GetCardFromFrame(nFrame1, nDepth); // Index de la carte se trouvant dans la case nFrame1

if (nImage == 0) return ""; // Il n'y a pas de carte à dans cette case.

var oImage = document.getElementById('idPos' + (100 + nImage)); // Pointeur sur la carte

return oImage.getAttribute("data-param1");
} // CardGetParam

function CardSetParam(nFrame1, nDepth, strParam1) {
//=================================================
// nFrame1  est le numéro du case dans laquelle se trouve la carte désirée
// nDepth indique la profondeur de la carte dans le tas.  1 = le dessus du tas.
// Fixe le paramètre associé à la carte de la case donnée.

if ( (nFrame1 < 0) || (nFrame1 > glnFramesMax) ) return ""; // case non existant

var nImage = GetCardFromFrame(nFrame1, nDepth); // Index de la carte se trouvant dans la case nFrame1

if (nImage == 0) return ""; // Il n'y a pas de carte à dans cette case.

var oImage = document.getElementById('idPos' + (100 + nImage)); // Pointeur sur la carte

oImage.setAttribute("data-param1", strParam1);
} // CardSetParam

// ******************************************************************************************
// Pour des Tests.
// Le but est de rester dans le programme en cours d'exécution et de gérer les événements.
// Pour cela, la possibilité d'exécuter une fonction définie dans un string est utile.
// ******************************************************************************************

/* Parse a string function definition and return a function object. Does not use eval.
 * @param {string} str
 * @return {function}
 *
 * Example:
 *  var f = function (x, y) { return x * y; };
 *  var g = parseFunction(f.toString());
 *  g(33, 3); //=> 99
 *  c.f. https://gist.github.com/lamberta/3768814
 */
function parseFunction(str) {
  var fn_body_idx = str.indexOf('{'),
      fn_body = str.substring(fn_body_idx+1, str.lastIndexOf('}')),
      fn_declare = str.substring(0, fn_body_idx),
      fn_params = fn_declare.substring(fn_declare.indexOf('(')+1, fn_declare.lastIndexOf(')')),
      args = fn_params.split(',');

  args.push(fn_body);

  function Fn () {
    return Function.apply(this, args);
  }
  Fn.prototype = Function.prototype;
	
  return new Fn();
} // parseFunction


function ProgramRun() {
//======================
// Boucle en restant dans l'exécution du programme javascript généré par Blockly.
// Permet de gérer des événements en restant dans l'exécution du programme par l'interpréteur.
// Normalement, javascript n'est pas multitâches, 
// donc le code qui suit ne pourrait pas gérer des événements.
// Mais le fait d'utiliser l'interpréteur javascript, 
// rend la main au système après chaque instruction et permet ainsi de gérer les événements.
// Question, cela fonctionne-t-il avec tous les modes de vitesses de l'interpréteur ???
var oImage = null;    // Pointeur sur une carte
var nn = 0;
var strFuncExec = ''; // Si non vide, exécute la fonction associée à la carte
var strFuncCard = ''; // Fonction associée à une carte, sous forme de chaine de caractères
var nFrame = 1;       // Case dans laquelle se trouve la carte
var strParam1 = '';   // Paramètre associée à une carte
var myFunction;       // fonction crée qui exécutera la fonction associée à la carte

gloCanvas.fProgramRun = true;


//while (gloCanvas.fProgramRun) {
  // Test si un événement a eu lieu et implique l'exécution d'une fonction

  // Cherche parmi toutes les cartes, s'il y en a une qui a déclenché un événement click
  for (nn=1; nn<=gloCanvas.nbCards; nn++) {
    oImage = document.getElementById('idPos' + (100 + nn)); // La carte numéro : nn
    strFuncExec = oImage.getAttribute("data-func-exec");
  
    if ( (strFuncExec != null) && (strFuncExec != '') ) {
      // Une carte dans le cadre désiré a été trouvée, teste si la profondeur correspond
      strFuncCard = oImage.getAttribute("data-func");
      nFrame      = parseInt(oImage.getAttribute("data-frame"));
      strParam1   = oImage.getAttribute("data-param1");
      oImage.setAttribute("data-func-exec", ""); // Remet à vide l'indication d'exécuter la fonction.

      // Crée une fonction, qui exécute la fonction désirée qui est définie dans un string.
      myFunction = new Function("nFrame", "strParam1", strFuncCard);

      // Appelle la fonction associée à la carte, avec deux paramètres
      myFunction(nFrame, strParam1);  //   !!!! ???? NE FONCTIONNE PAS, CAR N'ARRIVE PAS À ACCÉDER À UNE FONCTION DU CODE INTERPRÉTÉ
      console.log('call', nFrame, "*" + strParam1 + "*");
      }
    } // for
//  } // while (true)
} // ProgramRun

function ProgramStop() {
//=======================
// Indication d'arrêter le programme
gloCanvas.fProgramRun = false;
} // ProgramStop

// ******************************************************************************************
// Définition de nouveaux blocs et du code javascript et parfois python qui leur est associé.
// ******************************************************************************************

Blockly.Blocks['card_get_card'] = {
//==================================
init: function() {
  this.jsonInit({
    "type":"card_get_card",
    "message0": bgBlockly.Msg['CARD_GET_CARD_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "FRAME1",
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
var nFrame = Blockly.JavaScript.valueToCode(block, 'FRAME1',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

return ["GetCardValue(" + nFrame + ", 1)", Blockly.JavaScript.ORDER_FUNCTION_CALL]; // c.f. blockly/generators/javascript/math.js
};

Blockly.Blocks['card_flip'] = {
//=============================
// Pour retourner la carte de la case donnée
init: function() {
  this.jsonInit({
    "message0": bgBlockly.Msg['CARD_FLIP_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "FRAME1",
        "check":"Number"
      }
    ],
    "data": "5", // Valeurs par défaut.
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour":  bgBlockly.Msg['CARDS_HUE'],
    "tooltip": bgBlockly.Msg['CARD_FLIP_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['CARD_FLIP_HELPURL']
    });
  }
};
Blockly.JavaScript['card_flip'] = function(block) {
//===================================================
// Retournement de la carte de la case  FRAME1
var nFrame = Blockly.JavaScript.valueToCode(block, 'FRAME1',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

var nTimeDelta  = 5; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  nTimeDelta  = parseInt(strData);
  } 

return "CardFlip(" + nFrame + ", " + nTimeDelta + ");\n";
// Le dernier paramètre est le temps d'attente entre chaque animation
};

Blockly.Blocks['card_movef1f2'] = {
//=================================
init: function() {
  this.jsonInit({
    "message0": bgBlockly.Msg['CARD_MOVEX1X2_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "FRAME1",
        "check":"Number"
      }
      ,{
        "type": "input_value",
        "name": "FRAME2",
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
Blockly.JavaScript['card_movef1f2'] = function(block) {
//===================================================
// Déplacement de la carte de la case  FRAME1  à la case  FRAME2
var nFrame1 = Blockly.JavaScript.valueToCode(block, 'FRAME1',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
var nFrame2 = Blockly.JavaScript.valueToCode(block, 'FRAME2',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

var nTimeDelta  = 5; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  nTimeDelta  = parseInt(strData);
  } 

return "CardMoveF1F2(" + nFrame1 + ", " + nFrame2 + ", " + nTimeDelta + ");\n";
// Le dernier paramètre est le temps d'attente entre chaque déplacement de 1 pixel
};

Blockly.Blocks['card_exchangef1f2'] = {
//=====================================
init: function() {
  this.jsonInit({
    "message0": bgBlockly.Msg['CARD_EXCHANGEX1X2_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "FRAME1",
        "check":"Number"
      }
      ,{
        "type": "input_value",
        "name": "FRAME2",
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
Blockly.JavaScript['card_exchangef1f2'] = function(block) {
//=========================================================
// Échange des cartes des  FRAME1  et  FRAME2
var nFrame1 = Blockly.JavaScript.valueToCode(block, 'FRAME1',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
var nFrame2 = Blockly.JavaScript.valueToCode(block, 'FRAME2',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

var nTimeDelta  = 5; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  nTimeDelta  = parseInt(strData);
  } 

return "CardExchangeF1F2(" + nFrame1 + ", " + nFrame2 + ", " + nTimeDelta + ");\n";
// Le dernier paramètre est le temps d'attente entre chaque déplacement de 1 pixel
};

/*  c.f. ../../bgmsg/js/fr.js
bgBlockly.Msg["CARD_EXIST_TEST_TITLE"] = "Teste l'existence de l'image de la carte %1";
bgBlockly.Msg["CARD_EXIST_TEST_TOOLTIP"] = "Appeler la fonction Réponse d'existence ensuite.";
bgBlockly.Msg["CARD_EXIST_TEST_HELPURL"] = "";

bgBlockly.Msg["CARD_EXIST_RESPONSE_TITLE"] = "Réponse au test d'existence d'image de carte";
bgBlockly.Msg["CARD_EXIST_RESPONSE_TOOLTIP"] = "Appeler en premier 'Teste l'existence de l'image de la carte'. 1=oui, 0=non, -1=ne sait pas.";
bgBlockly.Msg["CARD_EXIST_RESPONSE_HELPURL"] = "";

bgBlockly.Msg["CARD_ADD_ONE_CARD_TITLE"] = "Ajoute la carte %1 de dos %2 en case %3";
bgBlockly.Msg["CARD_ADD_ONE_CARD_TOOLTIP"] = "Ajoute la carte de n° donné et de n° de dos donné dans la case donnée.";
bgBlockly.Msg["CARD_ADD_ONE_CARD_HELPURL"] = "";
*/

Blockly.Blocks['card_exist_test'] = {
//===================================
init: function() {
  this.jsonInit({
    "message0": bgBlockly.Msg['CARD_EXIST_TEST_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "CARD",
        "check":"Number"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour":  bgBlockly.Msg['CARDS_HUE'],
    "tooltip": bgBlockly.Msg['CARD_EXIST_TEST_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['CARD_EXIST_TEST_HELPURL']
    });
  }
};
Blockly.JavaScript['card_exist_test'] = function(block) {
//=======================================================
// Test l'existence d'un fichier correspondant à la carte  CARD 
var nCard   = Blockly.JavaScript.valueToCode(block, 'CARD',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

return "CardExistTest(" + nCard + ");\n";
};

Blockly.Blocks['card_exist_response'] = {
//=======================================
init: function() {
  this.jsonInit({
    "message0": bgBlockly.Msg['CARD_EXIST_RESPONSE_TITLE'],
    "args0": [
    ],
    "output": "Number",
    "colour":  bgBlockly.Msg['CARDS_HUE'],
    "tooltip": bgBlockly.Msg['CARD_EXIST_RESPONSE_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['CARD_EXIST_RESPONSE_HELPURL']
    });
  }
};
Blockly.JavaScript['card_exist_response'] = function(block) {
//===========================================================
// Retourne un nombre indiquant l'existance ou non du fichier corresopndant à la carte testée dans un bloc précédent.
return ["CardExistResponse()", Blockly.JavaScript.ORDER_FUNCTION_CALL]; // c.f. blockly/generators/javascript/math.js
};

Blockly.Blocks['card_add_one_card'] = {
//=====================================
init: function() {
  this.jsonInit({
    "message0": bgBlockly.Msg['CARD_ADD_ONE_CARD_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "CARD",
        "check":"Number"
      }
      ,{
        "type": "input_value",
        "name": "BACK",
        "check":"Number"
      }
      ,{
        "type": "input_value",
        "name": "FRAME2",
        "check":"Number"
      }
    ],
    "data": "5", // Valeurs par défaut.
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour":  bgBlockly.Msg['CARDS_HUE'],
    "tooltip": bgBlockly.Msg['CARD_ADD_ONE_CARD_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['CARD_ADD_ONE_CARD_HELPURL']
    });
  }
};
Blockly.JavaScript['card_add_one_card'] = function(block) {
//=========================================================
// Ajoute la carte  CARD  avec le dos  BACK dans la case  FRAME2
var nCard   = Blockly.JavaScript.valueToCode(block, 'CARD',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
var nBack   = Blockly.JavaScript.valueToCode(block, 'BACK',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
var nFrame2 = Blockly.JavaScript.valueToCode(block, 'FRAME2',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

var nTimeDelta  = 5; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  nTimeDelta  = parseInt(strData);
  } 

return "CardAddOne(" + nCard + ", " + nBack + ", " + nFrame2 + ", " + nTimeDelta + ");\n";
};

Blockly.Blocks['card_remove_one_card'] = {
//========================================
init: function() {
  this.jsonInit({
    "message0": bgBlockly.Msg['CARD_REMOVE_ONE_CARD_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "FRAME1",
        "check":"Number"
      }
    ],
    "data": "5", // Valeurs par défaut.
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour":  bgBlockly.Msg['CARDS_HUE'],
    "tooltip": bgBlockly.Msg['CARD_REMOVE_ONE_CARD_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['CARD_REMOVE_ONE_CARD_HELPURL']
    });
  }
};
Blockly.JavaScript['card_remove_one_card'] = function(block) {
//============================================================
// Supprime la carte de la case  FRAME1
var nFrame1 = Blockly.JavaScript.valueToCode(block, 'FRAME1',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

var nTimeDelta  = 5; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  nTimeDelta  = parseInt(strData);
  } 

return "CardRemoveOne(" + nFrame1 + ", " + nTimeDelta + ");\n";
// Le dernier paramètre est le temps d'attente entre chaque déplacement de 1 pixel
};

Blockly.Blocks['card_set_shift'] = {
//==================================
init: function() {
  this.jsonInit({
    "message0": bgBlockly.Msg['CARD_SET_SHIFT_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "SHIFT",
        "check":"Number"
      }
    ],
    "data": "5", // Valeurs par défaut.
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour":  bgBlockly.Msg['CARDS_HUE'],
    "tooltip": bgBlockly.Msg['CARD_SET_SHIFT_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['CARD_SET_SHIFT_HELPURL']
    });
  }
};
Blockly.JavaScript['card_set_shift'] = function(block) {
//======================================================
// Définit le décalage de cartes superposées.
var nShift = Blockly.JavaScript.valueToCode(block, 'SHIFT',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

var nTimeDelta  = 5; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  nTimeDelta  = parseInt(strData);
  } 

return "CardSetShift(" + nShift + ", " + nTimeDelta + ");\n";
// Le dernier paramètre est le temps d'attente entre chaque déplacement de 1 pixel
// Pas utilisé pour l'instant.
};

Blockly.Blocks['card_source_define'] = {
//=====================================
init: function() {
  this.jsonInit({
    "message0": bgBlockly.Msg['CARD_SOURCE_DEFINE_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "SOURCE",
        "check":"String"
      }
      ,{
        "type": "input_value",
        "name": "EXT",
        "check":"String"
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour":  bgBlockly.Msg['CARDS_HUE'],
    "tooltip": bgBlockly.Msg['CARD_SOURCE_DEFINE_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['CARD_SOURCE_DEFINE_HELPURL']
    });
  }
};
Blockly.JavaScript['card_source_define'] = function(block) {
//=========================================================
// Définir la source et l'extension des fichiers définissant les images des nouvelles cartes.
var strSource = Blockly.JavaScript.valueToCode(block, 'SOURCE',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
var strExt = Blockly.JavaScript.valueToCode(block, 'EXT',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

return "CardSourceDefine(" + strSource + ", " + strExt + ");\n";
};

Blockly.Blocks['card_back_define'] = {
//=====================================
init: function() {
  this.jsonInit({
    "message0": bgBlockly.Msg['CARD_BACK_DEFINE_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "BACK",
        "check":"Number"
      }
      ,{
        "type": "input_value",
        "name": "FRAME1",
        "check":"Number"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour":  bgBlockly.Msg['CARDS_HUE'],
    "tooltip": bgBlockly.Msg['CARD_BACK_DEFINE_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['CARD_BACK_DEFINE_HELPURL']
    });
  }
};
Blockly.JavaScript['card_back_define'] = function(block) {
//========================================================
// Définit le dos à BACK de la case  FRAME1
var nCard = Blockly.JavaScript.valueToCode(block, 'BACK',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
var nFrame1 = Blockly.JavaScript.valueToCode(block, 'FRAME1',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

return "cardBackDefine(" + nCard + ", " + nFrame1 + ");\n";
};

Blockly.Blocks['card_link_func_card'] = {
//=====================================
init: function() {
  this.jsonInit({
    "message0": bgBlockly.Msg['CARD_LINK_FUNC_CARD_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "FRAME1",
        "check":"Number"
      }
      ,{
        "type": "input_value",
        "name": "FUNC",
        "check":"String"
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour":  bgBlockly.Msg['CARDS_HUE'],
    "tooltip": bgBlockly.Msg['CARD_LINK_FUNC_CARD_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['CARD_LINK_FUNC_CARD_HELPURL']
    });
  }
};
Blockly.JavaScript['card_link_func_card'] = function(block) {
//===========================================================
// Fait en sorte que lorsque l'on clique sur la carte se trouvant dans la FRAME1,
// on exécute la fonction  FUNC  du code BLOCKLY,
// en lui envoyant le paramètre de la case dans laquelle elle se trouve et le paramètre  PARAM.
var nFrame1   = Blockly.JavaScript.valueToCode(block, 'FRAME1',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
var strFunction   = Blockly.JavaScript.valueToCode(block, 'FUNC',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

return "CardLinkFunction(" + nFrame1 + ", " + strFunction + ");\n";
};

/*
bgBlockly.Msg["CARD_GET_CARD_PARAM_TITLE"] = "Lit le paramètre de la carte de la case %1";
bgBlockly.Msg["CARD_GET_CARD_PARAM_TOOLTIP"] = "Lit le paramètre de la carte désirée, sous forme de chaîne de caractères. \nPour avoir un nombre, on peut le convertir.";
bgBlockly.Msg["CARD_GET_CARD_PARAM_HELPURL"] = "";
*/
Blockly.Blocks['card_get_card_param'] = {
//=======================================
init: function() {
  this.jsonInit({
    "type":"card_get_card_param",
    "message0": bgBlockly.Msg['CARD_GET_CARD_PARAM_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "FRAME1",
        "check":"Number"
      }
    ],
    "output": "String",
    "colour":  bgBlockly.Msg['CARDS_HUE'],
    "tooltip": bgBlockly.Msg['CARD_GET_CARD_PARAM_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['CARD_GET_CARD_PARAM_HELPURL']
    });
  }
};
Blockly.JavaScript['card_get_card_param'] = function(block) {
//===========================================================
// Retourne le paramètre associé à la carte se trouvant dans la case  FRAME1
var nFrame = Blockly.JavaScript.valueToCode(block, 'FRAME1',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

return ["CardGetParam(" + nFrame + ", 1)", Blockly.JavaScript.ORDER_FUNCTION_CALL]; // c.f. blockly/generators/javascript/math.js
};

/*
bgBlockly.Msg["CARD_SET_CARD_PARAM_TITLE"] = "Fixe le paramètre de la carte de la case %1 à %2";
bgBlockly.Msg["CARD_SET_CARD_PARAM_TOOLTIP"] = "Fixe le paramètre de la carte désirée.";
bgBlockly.Msg["CARD_SET_CARD_PARAM_HELPURL"] = "";
*/
Blockly.Blocks['card_set_card_param'] = {
//=======================================
init: function() {
  this.jsonInit({
    "type":"card_set_card_param",
    "message0": bgBlockly.Msg['CARD_SET_CARD_PARAM_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "FRAME1",
        "check":"Number"
      }
      ,{
        "type": "input_value",
        "name": "PARAM1",
        "check":"String"
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour":  bgBlockly.Msg['CARDS_HUE'],
    "tooltip": bgBlockly.Msg['CARD_SET_CARD_PARAM_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['CARD_SET_CARD_PARAM_HELPURL']
    });
  }
};
Blockly.JavaScript['card_set_card_param'] = function(block) {
//===========================================================
// Fixe à  PARAM1  la valeur du paramètre de la carte de la case  FRAME1 
var nFrame1 = Blockly.JavaScript.valueToCode(block, 'FRAME1',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
var strParam1   = Blockly.JavaScript.valueToCode(block, 'PARAM1',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

return "CardSetParam(" + nFrame1 + ", 1, " + strParam1 + ");\n";
};


bgBlockly.Msg["CARD_PROGRAMM_RUN_TITLE"] = "Reste dans le programme";
bgBlockly.Msg["CARD_PROGRAMM_RUN_TOOLTIP"] = "Continue l'exécution du programme. \nPermet de gérer les événement. \nLe bloc 'Programme STOP' arrête l'exécution.";
bgBlockly.Msg["CARD_PROGRAMM_RUN_HELPURL"] = "";

Blockly.Blocks['card_program_run'] = {
//=====================================
init: function() {
  this.jsonInit({
    "type":"card_program_run",
    "message0": bgBlockly.Msg['CARD_PROGRAMM_RUN_TITLE'],
    "args0": [
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour":  bgBlockly.Msg['CARDS_HUE'],
    "tooltip": bgBlockly.Msg['CARD_PROGRAMM_RUN_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['CARD_PROGRAMM_RUN_HELPURL']
    });
  }
};
Blockly.JavaScript['card_program_run'] = function(block) {
//=========================================================
// Lance une fonction qui boucle et teste si des événements ont eu lieu,
// pour exécuter la fonction associée à l'événement.
// Il faudra exécuter le bloc 'Programme STOP' pour arrêter le programme.

return "ProgramRun();\n";
};

// ******************************************************************************************
// Définition du code python associé au nouveaux blocs
// ******************************************************************************************

Blockly.Python['card_get_card'] = function(block) {
//=================================================
// Lecture de la valeur de la carte se trouvant dans la case donnée
var nFrame1 = Blockly.Python.valueToCode(block, 'FRAME1',
    Blockly.Python.ORDER_NONE) || '\'\'';

return ["GetCardValue(" + nFrame1 + ", 1)", Blockly.Python.ORDER_FUNCTION_CALL]; // c.f. blockly/generators/python/math.js
};

Blockly.Python['card_flip'] = function(block) {
//=============================================
// Retournement de la carte de la case  FRAME1
var nFrame1 = Blockly.Python.valueToCode(block, 'FRAME1',
    Blockly.Python.ORDER_NONE) || '\'\'';

var nTimeDelta  = 5; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  nTimeDelta  = parseInt(strData);
  } 

return "CardFlip(" + nFrame1 + ", " + nTimeDelta + ")\n";
// Le dernier paramètre est le temps d'attente entre chaque animation
// Non utilisé, car il n'y a pas d'animation lors de l'exécution du code Python.
};

Blockly.Python['card_movef1f2'] = function(block) {
//===================================================
// Déplacement de la carte de la case  FRAME1  à la case  FRAME2
var nFrame1 = Blockly.Python.valueToCode(block, 'FRAME1',
    Blockly.Python.ORDER_NONE) || '\'\'';
var nFrame2 = Blockly.Python.valueToCode(block, 'FRAME2',
    Blockly.Python.ORDER_NONE) || '\'\'';

var nTimeDelta  = 5; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  nTimeDelta  = parseInt(strData);
  } 

return "CardMoveF1F2(" + nFrame1 + ", " + nFrame2 + ", " + nTimeDelta + ")\n";
// Le dernier paramètre est le temps d'attente entre chaque déplacement de 1 pixel
// Non utilisé, car il n'y a pas d'animation lors de l'exécution du code Python.
};

Blockly.Python['card_exchangef1f2'] = function(block) {
//===================================================
// Échange des cartes des  FRAME1  et  FRAME2
var nFrame1 = Blockly.Python.valueToCode(block, 'FRAME1',
    Blockly.Python.ORDER_NONE) || '\'\'';
var nFrame2 = Blockly.Python.valueToCode(block, 'FRAME2',
    Blockly.Python.ORDER_NONE) || '\'\'';

var nTimeDelta  = 5; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  nTimeDelta  = parseInt(strData);
  } 

return "CardExchangeF1F2(" + nFrame1 + ", " + nFrame2 + ", " + nTimeDelta + ")\n";
// Le dernier paramètre est le temps d'attente entre chaque déplacement de 1 pixel
// Non utilisé, car il n'y a pas d'animation lors de l'exécution du code Python.
};

Blockly.Python['card_exist_test'] = function(block) {
//=====================================================
// Test l'existence d'un fichier correspondant à la carte  CARD 
// NE FONCTIONNE PAS, CAR N'A pas le temps d'attendre la réponse
var nCard = Blockly.Python.valueToCode(block, 'CARD',
    Blockly.Python.ORDER_NONE) || '\'\'';

return "CardExistTest_NOT_WORKING(" + nCard + ")\n";
};

Blockly.Python['card_exist_response'] = function(block) {
//=====================================================
// Retourne un nombre indiquant l'existance ou non du fichier corresopndant à la carte testée dans un bloc précédent.
// NE FONCTIONNE PAS, CAR N'A pas le temps d'attendre la réponse
return ["CardExistResponse_NOT_WORKING()", Blockly.Python.ORDER_FUNCTION_CALL]; // c.f. blockly/generators/python/math.js
};

Blockly.Python['card_add_one_card'] = function(block) {
//=====================================================
// Ajoute la carte  CARD  avec le dos  BACK dans la case  FRAME2
var nCard = Blockly.Python.valueToCode(block, 'CARD',
    Blockly.Python.ORDER_NONE) || '\'\'';
var nBack = Blockly.Python.valueToCode(block, 'BACK',
    Blockly.Python.ORDER_NONE) || '\'\'';
var nFrame2 = Blockly.Python.valueToCode(block, 'FRAME2',
    Blockly.Python.ORDER_NONE) || '\'\'';

var nTimeDelta  = 5; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  nTimeDelta  = parseInt(strData);
  } 

return "CardAddOne(" + nCard + ", " + nBack + ", " + nFrame2 + ", " + nTimeDelta + ")\n";
};

Blockly.Python['card_remove_one_card'] = function(block) {
//========================================================
// Supprime la carte de la case  FRAME1
var nShift = Blockly.Python.valueToCode(block, 'FRAME1',
    Blockly.Python.ORDER_NONE) || '\'\'';

var nTimeDelta  = 5; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  nTimeDelta  = parseInt(strData);
  } 

return "CardRemoveOne(" + nShift + ", " + nTimeDelta + ")\n";
// Le dernier paramètre est le temps d'attente entre chaque déplacement de 1 pixel
};

Blockly.Python['card_set_shift'] = function(block) {
//==================================================
// Supprime la carte de la case  FRAME1
var nFrame1 = Blockly.Python.valueToCode(block, 'SHIFT',
    Blockly.Python.ORDER_NONE) || '\'\'';

var nTimeDelta  = 5; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  nTimeDelta  = parseInt(strData);
  } 

return "CardSetShift(" + nFrame1 + ", " + nTimeDelta + ")\n";
// Le dernier paramètre est le temps d'attente entre chaque déplacement de 1 pixel
// Pas utilisé pour l'instant.
};

Blockly.Python['card_source_define'] = function(block) {
//======================================================
// Définir la source et l'extension des fichiers définissant les images des nouvelles cartes.
var strSource = Blockly.Python.valueToCode(block, 'SOURCE',
    Blockly.Python.ORDER_NONE) || '\'\'';
var strExt = Blockly.Python.valueToCode(block, 'EXT',
    Blockly.Python.ORDER_NONE) || '\'\'';

return "CardSourceDefine(" + strSource + ", " + strExt + ")\n";
};

Blockly.Python['card_back_define'] = function(block) {
//====================================================
// Définit le dos à BACK de la case  FRAME1
var nCard = Blockly.Python.valueToCode(block, 'BACK',
    Blockly.Python.ORDER_NONE) || '\'\'';
var nFrame1 = Blockly.Python.valueToCode(block, 'FRAME1',
    Blockly.Python.ORDER_NONE) || '\'\'';

return "cardBackDefine(" + nCard + ", " + nFrame1 + ")\n";
};

Blockly.Python['card_link_func_card'] = function(block) {
//=======================================================
// Fait en sorte que lorsque l'on clique sur la carte se trouvant dans la FRAME1,
// on exécute la fonction  FUNC  du code BLOCKLY,
// en lui envoyant le paramètre de la case dans laquelle elle se trouve et le paramètre  PARAM.
var nFrame1 = Blockly.Python.valueToCode(block, 'FRAME1',
    Blockly.Python.ORDER_NONE) || '\'\'';
var strFunction = Blockly.Python.valueToCode(block, 'FUNC',
    Blockly.Python.ORDER_NONE) || '\'\'';

return "CardLinkFunction(" + nFrame1 + ", " + strFunction + ")\n";
};

Blockly.Python['card_get_card_param'] = function(block) {
//=======================================================
// Retourne le paramètre associé à la carte se trouvant dans la case  FRAME1
var nFrame1 = Blockly.Python.valueToCode(block, 'FRAME1',
    Blockly.Python.ORDER_NONE) || '\'\'';

return ["CardGetParam(" + nFrame1 + ", 1)", Blockly.Python.ORDER_FUNCTION_CALL]; // c.f. blockly/generators/python/math.js
};

Blockly.Python['card_set_card_param'] = function(block) {
//=======================================================
// Fixe à  PARAM1  la valeur du paramètre de la carte de la case  FRAME1
var nFrame1 = Blockly.Python.valueToCode(block, 'FRAME1',
    Blockly.Python.ORDER_NONE) || '\'\'';
var strParam1 = Blockly.Python.valueToCode(block, 'PARAM1',
    Blockly.Python.ORDER_NONE) || '\'\'';

return "CardSetParam(" + nFrame1 + ", 1, " + strParam1 + ")\n";
};

// ******************************************************************************************
// Définition du code Lua associé au nouveaux blocs
// ******************************************************************************************

Blockly.Lua['card_get_card'] = function(block) {
//==============================================
// Lecture de la valeur de la carte se trouvant dans la case donnée
var nFrame1 = Blockly.Lua.valueToCode(block, 'FRAME1',
    Blockly.Lua.ORDER_NONE) || '\'\'';

return ["GetCardValue(" + nFrame1 + ", 1)", Blockly.Lua.ORDER_HIGH]; // c.f. blockly/generators/lua/math.js
};

Blockly.Lua['card_flip'] = function(block) {
//=============================================
// Retournement de la carte de la case  FRAME1
var nFrame1 = Blockly.Lua.valueToCode(block, 'FRAME1',
    Blockly.Lua.ORDER_NONE) || '\'\'';

var nTimeDelta  = 5; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  nTimeDelta  = parseInt(strData);
  } 

return "CardFlip(" + nFrame1 + ", " + nTimeDelta + ");\n";
// Le dernier paramètre est le temps d'attente entre chaque animation
// Non utilisé, car il n'y a pas d'animation lors de l'exécution du code Lua.
};

Blockly.Lua['card_movef1f2'] = function(block) {
//===================================================
// Déplacement de la carte de la case  FRAME1  à la case  FRAME2
var nFrame1 = Blockly.Lua.valueToCode(block, 'FRAME1',
    Blockly.Lua.ORDER_NONE) || '\'\'';
var nFrame2 = Blockly.Lua.valueToCode(block, 'FRAME2',
    Blockly.Lua.ORDER_NONE) || '\'\'';

var nTimeDelta  = 5; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  nTimeDelta  = parseInt(strData);
  } 

return "CardMoveF1F2(" + nFrame1 + ", " + nFrame2 + ", " + nTimeDelta + ");\n";
// Le dernier paramètre est le temps d'attente entre chaque déplacement de 1 pixel
// Non utilisé, car il n'y a pas d'animation lors de l'exécution du code Lua.
};

Blockly.Lua['card_exchangef1f2'] = function(block) {
//===================================================
// Échange des cartes des  FRAME1  et  FRAME2
var nFrame1 = Blockly.Lua.valueToCode(block, 'FRAME1',
    Blockly.Lua.ORDER_NONE) || '\'\'';
var nFrame2 = Blockly.Lua.valueToCode(block, 'FRAME2',
    Blockly.Lua.ORDER_NONE) || '\'\'';

var nTimeDelta  = 5; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  nTimeDelta  = parseInt(strData);
  } 

return "CardExchangeF1F2(" + nFrame1 + ", " + nFrame2 + ", " + nTimeDelta + ");\n";
// Le dernier paramètre est le temps d'attente entre chaque déplacement de 1 pixel
// Non utilisé, car il n'y a pas d'animation lors de l'exécution du code Lua.
};

Blockly.Lua['card_exist_test'] = function(block) {
//================================================
// Test l'existence d'un fichier correspondant à la carte  CARD 
// NE FONCTIONNE PAS, CAR N'A pas le temps d'attendre la réponse
var nCard = Blockly.Lua.valueToCode(block, 'CARD',
    Blockly.Lua.ORDER_NONE) || '\'\'';

return "CardExistTest_NOT_WORKING(" + nCard + ");\n";
};

Blockly.Lua['card_exist_response'] = function(block) {
//====================================================
// Retourne un nombre indiquant l'existance ou non du fichier corresopndant à la carte testée dans un bloc précédent.
// NE FONCTIONNE PAS, CAR N'A pas le temps d'attendre la réponse
return ["CardExistResponse_NOT_WORKING()", Blockly.Lua.ORDER_HIGH]; // c.f. blockly/generators/lua/math.js
};

Blockly.Lua['card_add_one_card'] = function(block) {
//===================================================
// Ajoute la carte  CARD  avec le dos  BACK dans la case  FRAME2
var nCard = Blockly.Lua.valueToCode(block, 'CARD',
    Blockly.Lua.ORDER_NONE) || '\'\'';
var nBack = Blockly.Lua.valueToCode(block, 'BACK',
    Blockly.Lua.ORDER_NONE) || '\'\'';
var nFrame2 = Blockly.Lua.valueToCode(block, 'FRAME2',
    Blockly.Lua.ORDER_NONE) || '\'\'';

var nTimeDelta  = 5; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  nTimeDelta  = parseInt(strData);
  } 

return "CardAddOne(" + nCard + ", " + nBack + ", " + nFrame2 + ", " + nTimeDelta + ");\n";
};

Blockly.Lua['card_remove_one_card'] = function(block) {
//=====================================================
// Supprime la carte de la case  FRAME1
var nFrame1 = Blockly.Lua.valueToCode(block, 'FRAME1',
    Blockly.Lua.ORDER_NONE) || '\'\'';

var nTimeDelta  = 5; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  nTimeDelta  = parseInt(strData);
  } 

return "CardRemoveOne(" + nFrame1 + ", " + nTimeDelta + ");\n";
// Le dernier paramètre est le temps d'attente entre chaque déplacement de 1 pixel
};

Blockly.Lua['card_set_shift'] = function(block) {
//===============================================
// Supprime la carte de la case  FRAME1
var nShift = Blockly.Lua.valueToCode(block, 'SHIFT',
    Blockly.Lua.ORDER_NONE) || '\'\'';

var nTimeDelta  = 5; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  nTimeDelta  = parseInt(strData);
  } 

return "CardSetShift(" + nShift + ", " + nTimeDelta + ");\n";
// Le dernier paramètre est le temps d'attente entre chaque déplacement de 1 pixel
// Pas utilisé pour l'instant.
};

Blockly.Lua['card_source_define'] = function(block) {
//======================================================
// Définit la source et l'extension des fichiers définissant les images des nouvelles cartes.
var strSource = Blockly.Lua.valueToCode(block, 'SOURCE',
    Blockly.Lua.ORDER_NONE) || '\'\'';
var strExt = Blockly.Lua.valueToCode(block, 'EXT',
    Blockly.Lua.ORDER_NONE) || '\'\'';

return "CardSourceDefine(" + strSource + ", " + strExt + ");\n";
};

Blockly.Lua['card_back_define'] = function(block) {
//====================================================
// Définit le dos à BACK de la case  FRAME1
var nCard = Blockly.Lua.valueToCode(block, 'BACK',
    Blockly.Lua.ORDER_NONE) || '\'\'';
var nFrame1 = Blockly.Lua.valueToCode(block, 'FRAME1',
    Blockly.Lua.ORDER_NONE) || '\'\'';

return "cardBackDefine(" + nCard + ", " + nFrame1 + ");\n";
};

Blockly.Lua['card_link_func_card'] = function(block) {
//====================================================
// Fait en sorte que lorsque l'on clique sur la carte se trouvant dans la FRAME1,
// on exécute la fonction  FUNC  du code BLOCKLY,
// en lui envoyant le paramètre de la case dans laquelle elle se trouve et le paramètre  PARAM.
var nFrame1 = Blockly.Lua.valueToCode(block, 'FRAME1',
    Blockly.Lua.ORDER_NONE) || '\'\'';
var strFunction = Blockly.Lua.valueToCode(block, 'FUNC',
    Blockly.Lua.ORDER_NONE) || '\'\'';

return "CardLinkFunction(" + nFrame1 + ", " + strFunction + ");\n";
};

Blockly.Lua['card_get_card_param'] = function(block) {
//====================================================
// Retourne le paramètre associé à la carte se trouvant dans la case  FRAME1
var nFrame1 = Blockly.Lua.valueToCode(block, 'FRAME1',
    Blockly.Lua.ORDER_NONE) || '\'\'';

return ["CardGetParam(" + nFrame1 + ", 1)", Blockly.Lua.ORDER_HIGH]; // c.f. blockly/generators/lua/math.js
};

Blockly.Lua['card_set_card_param'] = function(block) {
//====================================================
// Fixe à  PARAM1  la valeur du paramètre de la carte de la case  FRAME1
var nFrame1 = Blockly.Lua.valueToCode(block, 'FRAME1',
    Blockly.Lua.ORDER_NONE) || '\'\'';
var strParam1 = Blockly.Lua.valueToCode(block, 'PARAM1',
    Blockly.Lua.ORDER_NONE) || '\'\'';

return "CardSetParam(" + nFrame1 + ", 1, " + strParam1 + ");\n";
};

