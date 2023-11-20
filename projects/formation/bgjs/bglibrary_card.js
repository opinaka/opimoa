// Adjonction de fonctionnalités à Blockly
// #######################################

// Le fichier  bglibrary_abase.js  doit être inclus avant celui-ci

// c.f. https://developers.google.com/blockly/guides/app-integration/running-javascript
//"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

// Juste pour annuler les messages d'erreurs de Netbeans
if (typeof(gloB) === 'undefined') {
  var gloB;
  var Blockly;
  var bgBlockly;
  }
  
// Pour la manipulations de cartes, c.f. ex0900 ; ex0910

// Un créateur d'objet, pour conserver toutes les variables 'globales' du projet dans un objet.
// Adjonction de variables globales
gloB.oImageBouge = null;  // référence à l'image en déplacement
gloB.nStartPosX = 0; // Position de départ
gloB.nStartPosY = 0; 
gloB.nStopPosX = 0; // Position d'arrivée
gloB.nStopPosY = 0; 
gloB.oImageBouge2 = null;  // référence à la deuxième image en déplacement, lors d'un échange d'images
gloB.nStartPosX2 = 0; // Position de départ
gloB.nStartPosY2 = 0; 
gloB.nStopPosX2 = 0; // Position d'arrivée
gloB.nStopPosY2 = 0; 

gloB.nCaseMax = 11; // Numéro de la dernière case
gloB.nCardsLeft = 100; // Position de la case '0'
gloB.nCardsTop = 120;  // Position du haut des cartes (en pixels)
gloB.nCardsDelta = 100; // Distance entre deux cases (en pixels)
gloB.nCardsShift = 10;  // Pour décaler les cartes se trouvant sur le même tas.
gloB.nMixCount = 1; // Compte le nombre de mélange
gloB.nMixDestination = gloB.nCaseMax; // Desination de la carte, pour les mélanges

gloB.cHide = ""; // Si vide, accepte la superposition de cartes.
                 // Si == "c", une carte placée sur une autre fait disparaitre la carte du dessous.
                 //            donc n'accepte pas la superposition de cartes.

function initApi_card(interpreter, scope) {
//=========================================
  // Add an API function for highlighting blocks.
var wrapper;

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

wrapper = function(nPosX, delayMS) { return CardFlip(nPosX, delayMS); };
interpreter.setProperty(scope, 'CardFlip', interpreter.createNativeFunction(wrapper));

} // initApi_card

gloB.funcAfterInitApi = initApi_card;

// ******************************************************************************************
// Définition des fonctionnalités des nouveaux blocs
// ******************************************************************************************

function Exchange_stop() {
//========================
// Arrête le comteur et indique qu'il est arrêté en mettant gloB.nTimerID1 à 0.
if (gloB.nTimerID1 !== 0) {
  clearInterval(gloB.nTimerID1);
  gloB.nTimerID1 = 0;
  }

// Positionne précisément les images. Utile si on va plus vite et moins précisément.
if (gloB.oImageBouge != null) {
  gloB.oImageBouge.style.left = gloB.nStopPosX + "px";
  gloB.oImageBouge.style.top  = gloB.nStopPosY + "px";

  // Remet la carte à sa hauteur initiale
  gloB.oImageBouge.style.zIndex = 501;
  }

if (gloB.oImageBouge2 != null) {
  gloB.oImageBouge2.style.left = gloB.nStartPosX + "px";
  gloB.oImageBouge2.style.top  = gloB.nStartPosY + "px";

  // Remet la carte à sa hauteur initiale
  gloB.oImageBouge2.style.zIndex = 501;
  }
} // Exchange_stop

function Exchange_pictures() {
//============================
// Déplace l'image  1  de gloB.nStartPosX à gloB.nStopPosX et
// déplace l'image  2  de gloB.nStopPosX  à gloB.nStartPosX.

var nPosX1 = -1;
var nPosY1 = -1;
var nPosX2 = -1;
var nPosY2 = -1;
var nDX = 1; // Pour savoir dans quelle direction les images se déplacent.

if (gloB.oImageBouge  != null) { nPosX1 = parseInt(gloB.oImageBouge.style.left);  nDX = gloB.nStopPosX - nPosX1; }
if (gloB.oImageBouge2 != null) { nPosX2 = parseInt(gloB.oImageBouge2.style.left); nDX = nPosX2 - gloB.nStartPosX; }

if (nDX > 0) { nPosX1 += gloB.nMoveStep*gloB.nAccelerate; nPosX2 -= gloB.nMoveStep*gloB.nAccelerate; } // image 1 à gauche de image 2
if (nDX < 0) { nPosX1 -= gloB.nMoveStep*gloB.nAccelerate; nPosX2 += gloB.nMoveStep*gloB.nAccelerate; }

// Positionne les deux cartes
if (gloB.oImageBouge != null) {
  nPosY1 = gloB.nStopPosY + gloB.nCardsTop * (nPosX1 - gloB.nStartPosX) * (gloB.nStopPosX - nPosX1) / (gloB.nStopPosX - gloB.nStartPosX) / (gloB.nStopPosX - gloB.nStartPosX);
  gloB.oImageBouge.style.left = nPosX1 + "px";  // "px" signifie l'unité = le pixel
  gloB.oImageBouge.style.top  = nPosY1 + "px";

  if ( ( (gloB.nStartPosX <= gloB.nStopPosX) && (gloB.nStopPosX <= nPosX1) ) ||  // Start < Stop
       ( (gloB.nStartPosX >= gloB.nStopPosX) && (gloB.nStopPosX >= nPosX1) ) ) { // Stop < Start
    Exchange_stop(); // Images destinations  
    return;
    }
  }

if (gloB.oImageBouge2 != null) {
  nPosY2 = gloB.nStartPosY + gloB.nCardsTop * (nPosX2 - gloB.nStartPosX) * (gloB.nStopPosX - nPosX2) / (gloB.nStopPosX - gloB.nStartPosX) / (gloB.nStopPosX - gloB.nStartPosX);
  gloB.oImageBouge2.style.left = nPosX2 + "px";
  gloB.oImageBouge2.style.top  = nPosY2 + "px";

  if ( ( (gloB.nStartPosX <= gloB.nStopPosX) && (gloB.nStartPosX >= nPosX2) ) ||  // Start < Stop
       ( (gloB.nStartPosX >= gloB.nStopPosX) && (gloB.nStartPosX <= nPosX2) ) ) { // Stop < Start
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
   || (nPosX1 < 0) || (nPosX1  > gloB.nCaseMax)
   || (nPosX2 < 0) || (nPosX2  > gloB.nCaseMax) ) return; // rien à faire

var idImage1 = 'idPos' + (100 + nPosX1);
gloB.oImageBouge = document.getElementById(idImage1 + '1');

var idImage2 = 'idPos' + (100 + nPosX2);
gloB.oImageBouge2 = document.getElementById(idImage2 + '1');
// L'id termine par '1' pour la carte du dessus du tas

if ( (gloB.oImageBouge == null) && (gloB.oImageBouge2 == null) ) return; // rien n'a faire, pas de carte aux endroits indiqués.

// Position des images
gloB.nStartPosX = gloB.nCardsLeft + nPosX1 * gloB.nCardsDelta; 
gloB.nStopPosX  = gloB.nCardsLeft + nPosX2 * gloB.nCardsDelta; 

// S'il y a une carte à l'un des deux endroits, mais pas à l'autre, 
// il faut faire remonter les cartes du tas qui contient une carte.
if ( (gloB.oImageBouge == null) || (gloB.oImageBouge2 == null) ) {
  var nPosXX = nPosX1;
  if (gloB.oImageBouge == null) nPosXX = nPosX2; // Définit la case qui contient une ou des cartes.

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
if (gloB.oImageBouge != null) {
  gloB.nStartPosY = parseInt(gloB.oImageBouge.style.top);
  
  // Place la carte au-dessus des autres.
  gloB.oImageBouge.setAttribute('id', idImage2 + '1'); // Change l'id de la carte, en fonction de sa position.
  gloB.oImageBouge.style.zIndex = 700;  
  }
  
if (gloB.oImageBouge2 != null) {
  gloB.nStartPosY = parseInt(gloB.oImageBouge2.style.top);
  
  // Place la carte au-dessus des autres.
  gloB.oImageBouge2.setAttribute('id', idImage1 + '1'); // Change l'id de la carte, en fonction de sa position.
  gloB.oImageBouge2.style.zIndex = 700;  
  }
   
// Position d'arrivée de l'image
gloB.nStopPosY = gloB.nStartPosY; // Même position Y à l'arrivée que au départ

if (gloB.nInterpreterSpeed <= 2) {
  if (gloB.nTimerID1 == 0) gloB.nTimerID1 = setInterval('Exchange_pictures()', delayMS); // delayMS = temps en [ms] entre deux déplacement de 1 pixel
  }
else { // exécution rapide, sans animation.
  // Positionne les deux cartes
  if (gloB.oImageBouge != null) {
    gloB.oImageBouge.style.left = gloB.nStopPosX + "px";
    gloB.oImageBouge.style.top  = gloB.nStopPosY + "px";

    // Remet la carte à sa hauteur initiale
    gloB.oImageBouge.style.zIndex = 501;
    }
    
  if (gloB.oImageBouge2 != null) {
    gloB.oImageBouge2.style.left = gloB.nStartPosX + "px";
    gloB.oImageBouge2.style.top  = gloB.nStartPosY + "px";

    // Remet la carte à sa hauteur initiale
    gloB.oImageBouge2.style.zIndex = 501;
    }
  }

} // ExangeX1X2

// ###########################################################################

function Stop_image() {
//=====================
// Arrête le comteur et indique qu'il est arrêté en mettant gloB.nTimerID1 à 0.
if (gloB.nTimerID1 !== 0) {
  clearInterval(gloB.nTimerID1);
  gloB.nTimerID1 = 0;
  }

// Positionne précisément l'image. Utile si on va plus vite et moins précisément.
gloB.oImageBouge.style.left = gloB.nStopPosX + "px";
gloB.oImageBouge.style.top  = gloB.nStartPosY + "px";

// Remet la carte à sa hauteur initiale
gloB.oImageBouge.style.zIndex = 501;
} // Stop_image

function Deplace_image() {
//========================
// Déplace l'image "glIdImage" à la position : (gloB.nStopPosX , gloB.nStopPosY)
// "px" signifie l'unité = le pixel

var nPosX = parseInt(gloB.oImageBouge.style.left);
var nPosY = parseInt(gloB.oImageBouge.style.top);
var nDX = gloB.nStopPosX - nPosX;

if ( (gloB.nStartPosX <= gloB.nStopPosX) && (gloB.nStopPosX <= nPosX) ) { // Arrêt de déplacement vers la droite
  Stop_image(); // L'image est arribée à destination
  return;
  }

if ( (gloB.nStartPosX >= gloB.nStopPosX) && (gloB.nStopPosX >= nPosX) ) { // Arrêt de déplacement vers la gauche
  Stop_image(); // L'image est arribée à destination
  return;
  }

if (nDX < 0) nPosX -= gloB.nMoveStep*gloB.nAccelerate;
if (nDX > 0) nPosX += gloB.nMoveStep*gloB.nAccelerate;

nPosY = gloB.nStartPosY + gloB.nCardsTop * (nPosX - gloB.nStartPosX) * (gloB.nStopPosX - nPosX) / (gloB.nStopPosX - gloB.nStartPosX) / (gloB.nStopPosX - gloB.nStartPosX);

gloB.oImageBouge.style.left = nPosX + "px";
gloB.oImageBouge.style.top  = nPosY + "px";
} // Deplace_image

function MoveX1X2(nPosX1, nPosX2, delayMS) {
//==========================================
// Déplace l'image qui se trouve en position X1, en position X2.
// Ne fait rien, s'il n'y a pas d'image en position X1
// avec une attente de : delayMS [ms] entre chaque déplacement de un pixel.
// L'id de l'image est définie par sa position. 'idPosx1' est l'id de l'image à la position  x

if (  (nPosX1 == nPosX2) || (nPosX2 < 0) || (nPosX2  > gloB.nCaseMax) ) return; // rien à faire

var idImage = 'idPos' + (100 + nPosX1);
gloB.oImageBouge = document.getElementById(idImage + '1');
// L'id termine par '1' pour la carte du dessus du tas
if (gloB.oImageBouge == null) return; // rien n'a faire, pas de carte à l'endroit indiqué.

// Position de départ de l'image
gloB.nStartPosX = parseInt(gloB.oImageBouge.style.left);
gloB.nStartPosY = parseInt(gloB.oImageBouge.style.top);

// Position d'arrivée de l'image
gloB.nStopPosX = gloB.nCardsLeft + nPosX2 * gloB.nCardsDelta; 
gloB.nStopPosY = gloB.nStartPosY; // Même position Y à l'arrivée que au départ

// Parcours toutes les cartes qui sont aux même endroit, à l'arrivée.
// Change l'id en incrémentant la profondeur de 1
// Sont id est du type idPosxy
// x = la position de la carte
// y = la profondeur. Plus  y  est grand, plus la carte est sous le tas.
var nProfondeur = 1;
var idCase2 = 'idPos' + (100 + nPosX2);
var oImage2Last = document.getElementById(idCase2 + nProfondeur);
var oImage2 = oImage2Last;
while (oImage2Last != null) { 
  // Il y a encore une carte sur le tas
  nProfondeur += 1; // Cherche plus en profondeur
  oImage2 = document.getElementById(idCase2 + nProfondeur);
  oImage2Last.setAttribute('id', idCase2 + nProfondeur + gloB.cHide ); // Change l'id de la carte, en fonction de sa position.
  oImage2Last.style.zIndex = 500 - nProfondeur;
  if (gloB.cHide == "c") oImage2Last.style.visibility = 'hidden'; // Cache la carte, elle est irrécupérable.
  oImage2Last = oImage2;
  }
// Si nProfondeur == 1, c'est qu'il n'y avait aucune carte à cette position.
// Si nProfondeur > 1, c'est qu'il y a une ou des cartes à cette position.

// Place la carte au-dessus des autres.
gloB.oImageBouge.setAttribute('id', idCase2 + '1'); // Change l'id de la carte, en fonction de sa position.
gloB.oImageBouge.style.zIndex = 700;

if (gloB.cHide != "c") gloB.nStopPosX += gloB.nCardsShift*(nProfondeur - 1); // Pour décaler les cartes, si la superposition est acceptée

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

if (gloB.nInterpreterSpeed <= 2) {
  if (gloB.nTimerID1 == 0) gloB.nTimerID1 = setInterval('Deplace_image()', delayMS); // delayMS = temps en [ms] entre deux déplacement de 1 pixel
  }
else { // exécution rapide, sans animation.
  // Positionne l'image à l'arrivée
  gloB.oImageBouge.style.left = gloB.nStopPosX + "px";
  gloB.oImageBouge.style.top  = gloB.nStartPosY + "px";

  // Remet la carte à sa hauteur initiale
  gloB.oImageBouge.style.zIndex = 501;
  }

} // MoveX1X2

//"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

function MixStop() {
//===============
// Arrête le comteur et indique qu'il est arrêté en mettant gloB.nTimerID1 à 0.
if (gloB.nTimerID2 !== 0) {
  clearInterval(gloB.nTimerID2);
  gloB.nTimerID2 = 0;
  }
} // Stop

function IterateurMix() {
//=======================
// Exécute une itération du générateur.
if (gloB.nTimerID1 != 0) return; // attend que le timer 1 soit arrêté.

if (gloB.nMixCount <= 0) { MixStop(); gloB.nAccelerate = 1; return; } // Mélange terminé

if ( (gloB.nMixCount == 1) || gloB.fRunStop ) { 
  MoveX1X2(gloB.nCaseMax, gloB.nMixDestination, 0); // Dernière carte à se déplacer
  gloB.nMixCount = 0;
  return;
  }

// gloB.nCaseMax = numéro de la dernière cases pouvant contenir des cartes.
var n1 = Math.floor( gloB.nCaseMax * Math.random() ); // Une case qui voit sa carte aller dans la case de destination
while ( (n1 == gloB.nMixDestination) || (document.getElementById('idPos' + (100 + n1) + '1') == null) ) {
  // Assure que n1 != gloB.nMixDestination et qu'il y a une carte dans la case de départ
  n1 = Math.floor( gloB.nCaseMax * Math.random() );
  }
  
MoveX1X2(n1, gloB.nMixDestination, 0); // 0 => vitesse maximale du timer.
gloB.nMixDestination = n1;
gloB.nMixCount--;
} // IterateurMix

function MixCards(nMixCount, nAccelerate) {
//=========================================
// Mélange les cartes
// nMixCount indique le nombre de cartes mélangées. Si == 1, alors pas de mélange.
// nAccelerate indique l'accélération de déplacement, 1 = pas d'accélération.

if (nMixCount <= 0) return 0; // rien à faire

gloB.nMixCount = nMixCount + 1;
gloB.nAccelerate = nAccelerate; // Pour accélérer la vitesse des mélanges
if (gloB.nAccelerate < 1) gloB.nAccelerate = 1;

gloB.nMixDestination = gloB.nCaseMax; // Position de destination de la première carte

if (gloB.nInterpreterSpeed <= 2) {
  if (gloB.nTimerID2 == 0) gloB.nTimerID2 = setInterval(IterateurMix, 5);
  }
else { // exécution rapide, sans animation.
  while (gloB.nMixCount > 1) {
    // gloB.nCaseMax = numéro de la dernière case pouvant contenir des cartes.
    var n1 = Math.floor( gloB.nCaseMax * Math.random() ); // Une case qui voit sa carte aller dans la case de destination
    while ( (n1 == gloB.nMixDestination) || (document.getElementById('idPos' + (100 + n1) + '1') == null) ) {
      // Assure que n1 != gloB.nMixDestination et qu'il y a une carte dans la case de départ
      n1 = Math.floor( gloB.nCaseMax * Math.random() );
      }
      
    MoveX1X2(n1, gloB.nMixDestination, 0); // 0 => vitesse maximale du timer.
    gloB.nMixDestination = n1;
    gloB.nMixCount--;
    }

  if (gloB.nMixCount == 1) { 
    MoveX1X2(gloB.nCaseMax, gloB.nMixDestination, 0); // Dernière carte à se déplacer
    gloB.nAccelerate = 1;
    return 0;
    }
  }

return 0;
} // MixCards

function GetCardValue(nPosX) {
//============================
// Retourne la valeur de la carte se trouvant à la position donnée.
// Retourne  0  s'il n'y a pas de carte.

var idImage = 'idPos' + (100 + nPosX) + '1'; // // L'id termine par '1' pour la carte du dessus du tas
var oImage = document.getElementById(idImage);
if (oImage == null) return 0; // Il n'y a pas de carte

return parseInt(oImage.getAttribute("data-visible")); // Numéro de la face visible
} // GetCardValue

function GetCardValue2(nPosX, nDepth) {
//=====================================
// Retourne la valeur de la carte se trouvant à la position et la profondeur donnée.
// Retourne  0  s'il n'y a pas de carte.

var idImage = ('idPos' + (100 + nPosX)) + nDepth; // // nDepth définit la profondeur dans le tas. 1 = dessus
var oImage = document.getElementById(idImage);
if (oImage == null) return 0; // Il n'y a pas de carte

return parseInt(oImage.getAttribute("data-visible")); // Numéro de la face visible
} // GetCardValue2

function CaseBackground(nPosX, strColor) {
//========================================
// Change la couleur de fond de la carte se trouvant à la position nPosX
// Ne fait rien, s'il n'y a pas de carte.
// Si strColor == '', annule la couleur de fond.

var idImage = 'idPos' + (100 + nPosX) + '1'; // L'id termine par '1' pour la carte du dessus du tas
var oImage = document.getElementById(idImage);

if (oImage == null) return 0; // Il n'y a pas de carte

oImage.style.backgroundColor = strColor;
return 1;
} // CaseBackground

function Stop_FilpAnimation() {
//=============================
// Arrête le comteur et indique qu'il est arrêté en mettant gloB.nTimerID1 à 0.
if (gloB.nTimerID1 !== 0) {
  clearInterval(gloB.nTimerID1);
  gloB.nTimerID1 = 0;
  }
} // Stop_FilpAnimation

gloB.CardFlipWidth = 80;
gloB.CardFlipWidthInitial = 80;

function CardFlipAnimation(nCard, delayMS) {
//==========================================
// Retourne la carte de la case  nPosX,  avec animation du retournement.
// C.f. http://html5doctor.com/html5-custom-data-attributes/  pour des information sur l'attribut "data-*"

gloB.CardFlipWidth -= gloB.nMoveStep; // retourne la carte en réduisant la largeur de son image.
gloB.oImageBouge.width = Math.abs(gloB.CardFlipWidth);

var strVisible = gloB.oImageBouge.getAttribute("data-visible"); // Face visible

if ( (gloB.CardFlipWidth <= 0) && ((gloB.CardFlipWidth > -gloB.nMoveStep)) ) {
  // Au moment où la carte est devenu de largeur toute petite, change la carte, comme si on la retournait
  if (strVisible == gloB.oImageBouge.getAttribute("data-face")) {
    // C'est la face visible que l'on voit actuellement, change
    strVisible = gloB.oImageBouge.getAttribute("data-back");
    }
  else {
    // C'est le dos de la carte que l'on voit actuellement, change
    strVisible = gloB.oImageBouge.getAttribute("data-face");
    } 

  gloB.oImageBouge.src = gloB.oImageBouge.getAttribute("data-src") + strVisible + gloB.oImageBouge.getAttribute("data-ext");
  gloB.oImageBouge.setAttribute("data-visible", strVisible);
  if (gloB.oImageBouge.getAttribute("title")) gloB.oImageBouge.setAttribute("title", strVisible); // Le numéro affiché de la carte
  }

if (gloB.CardFlipWidth <= -gloB.CardFlipWidthInitial) {
  Stop_FilpAnimation();
  gloB.oImageBouge.width = Math.abs(gloB.CardFlipWidthInitial);
  }
} // CardFlipAnimation
  
function CardFlip(nPosX, delayMS) {
//=================================
// Retourne la carte de la case  nPosX.

var idImage = 'idPos' + (100 + nPosX) + '1'; // L'id termine par '1' pour la carte du dessus du tas
var oImage = document.getElementById(idImage);

if (oImage == null) return 0; // Il n'y a pas de carte.
if (!oImage.src) return 0; // Ce n'est pas une image.

gloB.oImageBouge = oImage; // Carte à retourner

// Largeur de l'image.
gloB.CardFlipWidth = parseInt(gloB.oImageBouge.width);
gloB.CardFlipWidthInitial = gloB.CardFlipWidth; // Mémorise la largeur initiale de la carte

if (gloB.nInterpreterSpeed <= 2) {
  if (gloB.nTimerID1 == 0) gloB.nTimerID1 = setInterval('CardFlipAnimation()', delayMS); // delayMS = temps en [ms] entre deux déplacement animaations
  }
else { // exécution rapide, sans animation.
  // Change la carte, comme si on la retournait
  var strVisible = oImage.getAttribute("data-visible"); // Face visible
  
  if (strVisible == oImage.getAttribute("data-face")) {
    // C'est la face visible que l'on voit actuellement, change
    strVisible = oImage.getAttribute("data-back");
    }
  else {
    // C'est le dos de la carte que l'on voit actuellement, change
    strVisible = oImage.getAttribute("data-face");
    } 
    
  oImage.src = oImage.getAttribute("data-src") + strVisible + oImage.getAttribute("data-ext");
  oImage.setAttribute("data-visible", strVisible);
  if (oImage.getAttribute("title")) oImage.setAttribute("title", strVisible); // Le numéro affiché de la carte
  }
} // CardFlip

// ******************************************************************************************
// Définition de nouveaux blocs et du code javascript et parfois python qui leur est associé.
// ******************************************************************************************

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

Blockly.Blocks['card_flip'] = {
//=============================
// Pour retourner la carte de la case donnée
init: function() {
  this.jsonInit({
    "message0": bgBlockly.Msg['CARD_FLIP_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "POSX",
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
// Retournement de la carte de la case  POSX
var nPosX = Blockly.JavaScript.valueToCode(block, 'POSX',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

var nTimeDelta  = 5; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  nTimeDelta  = parseInt(strData);
  } 

return "CardFlip(" + nPosX + ", " + nTimeDelta + ");\n";
// Le dernier paramètre est le temps d'attente entre chaque animation
};
