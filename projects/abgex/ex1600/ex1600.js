// Adjonction de fonctionnalités à Blockly
// #######################################

// c.f. https://developers.google.com/blockly/guides/app-integration/running-javascript
//"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

var MAXCASES = 11;

var glnLevel = 1; // niveau dans les étapes des programmse
var glnLevelMax = 7;
var glnLevelReached = 1; // Niveau atteint

// Pour mémoriser la position initiale des cartes.
var glanMemorise_Cartes = new Array(MAXCASES);
  
var glstrCongratulations = ""; // Félicitation, niveau réalisé
var glstrNotCorrect = ""; // Niveau pas réalisé

var glnRepetition = 1; // Pour répéter plusieurs tris, pour tester la validité de l'algorithme


// Indique le nombre de cartes, des positions et des déplacements
gloB.nCaseMax   =   2; // Nombre de cartes
gloB.nCardsLeft  = 100; // Position de la case '0'
gloB.nCardsTop   = 120;  // Position du haut des cartes (en pixels)
gloB.nCardsDelta = 100; // Distance entre deux cases (en pixels)
gloB.nCardsShift =  10;  // Pour décaler les cartes se trouvant sur le même tas.

function RunAfterLoad() {
//=======================
// Code à exécuter, juste après le démarrage de Blockly
glnLevel = 1;
SetLevel(glnLevel);
DialogHelp(true);  // Pour la version définitive.
} // RunAfterLoad

// Code à exécuter, juste après le démarrage de Blockly
gloB.funcAfterRunBlockly = RunAfterLoad;


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


function LocalOnchange(event) {
//=============================
// Appelé à chaque changement de l'espace de Blockly
// Si l'idBlocklyCoundUsed existe, 
// place le nombre de blocs utilisé dans le contenu de la balise ayatn cette id.
var oIdText = document.getElementById('idBlocklyCoundUsed');
if (oIdText != null) oIdText.innerHTML = gloB.demoWorkspace.remainingCapacity();
} // LocalOnchange

function Place_cadres_cartes(nCarte_init, nCaseExclue_1, nCaseExclue_2) {
//=======================================================================
// Place automatiquement les cadres, les numéros et les cartes
// nCarte_init = nom de la première carte placée
var nn = 0;
var nCarte = nCarte_init; // Carte placée
var strInstr = '';

for (nn=0; nn<=gloB.nCaseMax; nn++) { // Place les cases
  strInstr += " <img src='../images/Cadre_noire_2px.png' alt='cadre noire' width=88 height=140\n" 
           +  " style='position:absolute; left:" + (100 * nn + 95) + "px; top:15px; z-index:90;'>\n"
           +  " <span style='position:absolute; left:" + (100 * nn + 136) + "px; top:160px;  z-index:90;'>" + nn + "</span>\n";
  } // for

for (nn=1; nn<=gloB.nCaseMax; nn++) { // Place les cartes
  if ( (nn != nCaseExclue_1) && (nn != nCaseExclue_2) ) {
    if (nCarte_init == 0) { // tirage au hasard des cartes placées
      nCarte = 301 + Math.floor(Math.random()*13);
      }
    else nCarte = nCarte_init + nn;

    strInstr += " <img src='../images/Carte" + nCarte + ".png' alt='" + nCarte + "' width=80 height=128"
             +  "\n id='idPos" + (100 + nn) + "1'" // Indique la position de la carte
             + "\n data-src='../images/Carte'" // Indique la source du nom du fichier image
             + "\n data-ext='.png'" // Indique le nom de l'extension du fichier image
             + "\n data-face='" + nCarte + "'" // Indique la face de la carte
             + "\n data-back='900'"            // Indique le dos de la carte
             + "\n data-visible='" + nCarte + "'" // Indique la face visible de la carte
             + "\n title='" + nCarte + "'" // Si on va sur la carte, indique le numéro correspondant à ce que l'on voit.
             + "\n style='position:absolute; left:" + (100 + 100 * nn) + "px; top:20px;  z-index:91;'>\n";
    }
  } // for

document.getElementById('idCartes').innerHTML = strInstr; 
} // Place_cadres_cartes

function SetToolBox(nLevel) {
//===========================
// Défini la "toolbox" correspondant au niveau donné
// Change la toolbox, pour lui ajouter des blocs de controles
// La moindre erreur fait que la nouvelle toolbox est ignorée.

// La toolbox sera constituée de différentes blocs.
var strToolbox_card_a = 
      '<xml>\n'
    + '<category name="%{BKY_CATEGORY_NAME_CARD}" colour="%{BKY_COLOUR_HUE}">\n'
    + '<block type="card_movex1x2">\n'
      + '<value name="POSX1">\n'
        + '<shadow type="math_number">\n'
          + '<field name="NUM">3</field>\n'
        + '</shadow>\n'
      + '</value>\n'
      + '<value name="POSX2">\n'
        + '<shadow type="math_number">\n'
          + '<field name="NUM">2</field>\n'
        + '</shadow>\n'
      + '</value>\n'
    + '</block>\n';

var strToolbox_card_b =
    '<block type="card_get_card">\n'
    + '<value name="POSX">\n'
      + '<shadow type="math_number">\n'
        + '<field name="NUM">3</field>\n'
      + '</shadow>\n'
    + '</value>\n'
  + '</block>\n';

var strToolbox_card_c =
    '<block type="card_exchangex1x2">\n'
    + '<value name="POSX1">\n'
      + '<shadow type="math_number">\n'
        + '<field name="NUM">3</field>\n'
      + '</shadow>\n'
    + '</value>\n'
    + '<value name="POSX2">\n'
      + '<shadow type="math_number">\n'
        + '<field name="NUM">2</field>\n'
      + '</shadow>\n'
    + '</value>\n'
    + '<data>1</data>\n'
  + '</block>\n';

var strToolbox_math = 
      '<category name="%{BKY_CATEGORY_NAME_MATH}" colour="%{BKY_MATH_HUE}">\n'
    + '<block type="math_number">\n'
      + '<field name="NUM">0</field>\n'
    + '</block>\n'
    + '<block type="math_arithmetic">'
      + '<value name="A">'
        + '<shadow type="math_number">'
          + '<field name="NUM">1</field>'
        + '</shadow>'
      + '</value>'
      + '<value name="B">'
        + '<shadow type="math_number">'
          + '<field name="NUM">1</field>'
        + '</shadow>'
      + '</value>'
    + '</block>'
  + '</category>\n';

var strToolbox_var_func =
    '<category name="%{BKY_CATEGORY_NAME_VARIABLES}" colour="%{BKY_VARIABLES_HUE}" custom="VARIABLE">\n'
  + '</category>\n'
  + '<category name="%{BKY_CATEGORY_NAME_FUNCTIONS}" colour="%{BKY_PROCEDURES_HUE}" custom="PROCEDURE">\n';

var strToolbox_text =
      '<category name="%{BKY_CATEGORY_NAME_TEXT}" colour="%{BKY_TEXTS_HUE}">\n'
    + '<block type="text"></block>\n'
    + '<block type="text_join"></block>\n'
    + '<block type="text_afficheln">\n'
      + '<value name="TEXT">\n'
        + '<shadow type="text"></shadow>\n'
      + '</value>\n'
    + '</block>\n'
    + '<block type="text_affiche">\n'
      + '<value name="TEXT">\n'
        + '<shadow type="text"></shadow>\n'
      + '</value>\n'
    + '</block>\n'
    + '<block type="text_comment">\n'
      + '<value name="COMMENT">\n'
        + '<shadow type="text">\n'
          + '<field id="XML_TB_COMMENT" name="TEXT">écrivez un commentaire...</field>\n'
        + '</shadow>\n'
      + '</value>\n'
    + '</block>\n'
    + '<block type="text_pause">\n'
      + '<value name="TIME">\n'
        + '<shadow type="math_number">\n'
          + '<field name="NUM">1.5</field>\n'
        + '</shadow>\n'
      + '</value>\n'
    + '</block>\n'
  + '</category>\n';

var strToolbox_logic_loops =
    '<category name="%{BKY_CATEGORY_NAME_LOGIC}" colour="%{BKY_LOGIC_HUE}">\n'
    + '<block type="controls_if"></block>\n'
    + '<block type="logic_compare"></block>\n'
    + '<block type="logic_operation"></block>\n'
    + '<block type="logic_negate"></block>\n'
    + '<block type="logic_boolean"></block>\n'
    + '<block type="logic_null"></block>\n'
    + '<block type="logic_ternary"></block>\n'
  + '</category>\n'
  + '<category name="%{BKY_CATEGORY_NAME_LOOPS}" colour="%{BKY_LOOPS_HUE}">\n'
    + '<block type="controls_repeat_ext">\n'
      + '<value name="TIMES">\n'
        + '<shadow type="math_number">\n'
          + '<field name="NUM">10</field>\n'
        + '</shadow>\n'
      + '</value>\n'
    + '</block>\n'
    + '<block type="controls_whileUntil"></block>\n'
    + '<block type="controls_for">\n'
      + '<value name="FROM">\n'
        + '<shadow type="math_number">\n'
          + '<field name="NUM">1</field>\n'
        + '</shadow>\n'
      + '</value>\n'
      + '<value name="TO">\n'
        + '<shadow type="math_number">\n'
          + '<field name="NUM">10</field>\n'
        + '</shadow>\n'
      + '</value>\n'
      + '<value name="BY">\n'
        + '<shadow type="math_number">\n'
          + '<field name="NUM">1</field>\n'
        + '</shadow>\n'
      + '</value>\n'
    + '</block>\n'
    + '<block type="controls_forEach"></block>\n'
    + '<block type="controls_flow_statements"></block>\n'
  + '</category>\n';


var strToolbox = strToolbox_card_a;

if ( (nLevel == 2) || (nLevel == 3) ) {
  strToolbox += '</category>\n' + strToolbox_math + strToolbox_var_func;
  }

if ( (nLevel == 4) || (nLevel == 5) || (nLevel == 6) ) {
  strToolbox += strToolbox_card_b + '</category>\n' 
             + strToolbox_logic_loops + strToolbox_math + strToolbox_text + strToolbox_var_func;
  }

if ( (nLevel >= 7) ) {
  strToolbox += strToolbox_card_b + strToolbox_card_c + '</category>\n' 
             + strToolbox_logic_loops + strToolbox_math + strToolbox_text + strToolbox_var_func;
  }
     
strToolbox += '</category>\n' + '</xml>\n'; // Fin

// Change le contenu de la toolbox, pour donner la possibilité d'avoir une fonction.
gloB.demoWorkspace.updateToolbox(strToolbox);

// Juste au niveau 3, on change le nombre de blocs ayant le droit d'être utilisés.
if (nLevel == 3) {
  // Change le nombre de blocs disponibles.
  // c.f. https://developers.google.com/blockly/guides/get-started/web
  // c.f. Blockly_Google/blockly/core/options.js
  gloB.demoWorkspace.options.maxBlocks = 20; // Limite le nombre de blocks utilisables pour la suite.

  // Change la fonction qui est appelée quand le workspace change.  
  gloB.demoWorkspace.addChangeListener(LocalOnchange);
  LocalOnchange();   
  }
else {
  gloB.demoWorkspace.options.maxBlocks = 10000; // Enlève la limite du nombre de blocks utilisables.

  // Met la fonction par défaut qui est appelée quand le workspace change.  
  gloB.demoWorkspace.addChangeListener(onchange);
  onchange();   
  }
} // SetToolBox

function SetLevel_1() {
//=====================
// Positionne une paire de deux cartes.
gloB.nCaseMax = 2; // Numéro de la dernière case
Place_cadres_cartes(311,0,0); // Place les cases et les cadres

// Changes quelques textes, en fonction de la langue
document.getElementById("HTML_MAIN_TITLE").innerHTML = gloB.oLanguage.HTML_MAIN_TITLE;
document.getElementById("HTML_MAIN_TITLE2").innerHTML = gloB.oLanguage.HTML_MAIN_TITLE2;
glstrCongratulations = gloB.oLanguage.HTML_GOOD_TEXT_1;
glstrNotCorrect = gloB.oLanguage.HTML_BAD_TEXT_1;
} // SetLevel_1

function SetLevel_2() {
//=====================
// Positionne 2 paires de deux cartes.
gloB.nCaseMax = 5; // Numéro de la dernière case
Place_cadres_cartes(308, 3, 0); // Place les cases et les cadres

// Changes quelques textes, en fonction de la langue
glstrCongratulations = gloB.oLanguage.HTML_GOOD_TEXT_2;
glstrNotCorrect = gloB.oLanguage.HTML_BAD_TEXT_2;
document.getElementById("HTML_MAIN_TITLE").innerHTML = gloB.oLanguage.HTML_MAIN_TITLE_2;
document.getElementById("HTML_MAIN_TITLE2").innerHTML = gloB.oLanguage.HTML_MAIN_TITLE2_2;
} // SetLevel_2

function SetLevel_3() {
//=====================
// Positionne 3 paires de deux cartes.
gloB.nCaseMax = 8; // Numéro de la dernière case
Place_cadres_cartes(305, 3, 6); // Place les cases et les cadres

// Changes quelques textes, en fonction de la langue
document.getElementById("HTML_MAIN_TITLE").innerHTML = gloB.oLanguage.HTML_MAIN_TITLE_3;
document.getElementById("HTML_MAIN_TITLE2").innerHTML = gloB.oLanguage.HTML_MAIN_TITLE2_3;
glstrCongratulations = gloB.oLanguage.HTML_GOOD_TEXT_3;
glstrNotCorrect = gloB.oLanguage.HTML_BAD_TEXT_3;

document.getElementById("HTML_BEEN_USED_BEFORE").innerHTML = "Il reste ";
document.getElementById("HTML_BEEN_USED").innerHTML = " blocs utilisables.";
} // SetLevel_3

function SetLevel_4() {
//=====================
// Positionne 2 cartes.
gloB.nCaseMax = 2; // Numéro de la dernière case
Place_cadres_cartes(0, 0, 0); // Place les cases et les cadres

// Changes quelques textes, en fonction de la langue
document.getElementById("HTML_MAIN_TITLE").innerHTML = gloB.oLanguage.HTML_MAIN_TITLE_4;
document.getElementById("HTML_MAIN_TITLE2").innerHTML = gloB.oLanguage.HTML_MAIN_TITLE2_4;
glstrCongratulations = gloB.oLanguage.HTML_GOOD_TEXT_4;
glstrNotCorrect = gloB.oLanguage.HTML_BAD_TEXT_4;

document.getElementById("HTML_BEEN_USED_BEFORE").innerHTML = "";
document.getElementById("HTML_BEEN_USED").innerHTML = gloB.oLanguage.HTML_BEEN_USED;
} // SetLevel_4

function SetLevel_5() {
//=====================
// Positionne 3 cartes.
gloB.nCaseMax = 3; // Numéro de la dernière case
Place_cadres_cartes(0, 0, 0); // Place les cases et les cadres

// Changes quelques textes, en fonction de la langue
document.getElementById("HTML_MAIN_TITLE").innerHTML = gloB.oLanguage.HTML_MAIN_TITLE_5;
document.getElementById("HTML_MAIN_TITLE2").innerHTML = gloB.oLanguage.HTML_MAIN_TITLE2_5;
glstrCongratulations = gloB.oLanguage.HTML_GOOD_TEXT_5; 
glstrNotCorrect = gloB.oLanguage.HTML_BAD_TEXT_5;
} // SetLevel_5

function SetLevel_6() {
//=====================
// Positionne 4 cartes.
gloB.nCaseMax = 4; // Numéro de la dernière case
Place_cadres_cartes(0, 0, 0); // Place les cases et les cadres

// Changes quelques textes, en fonction de la langue
document.getElementById("HTML_MAIN_TITLE").innerHTML = gloB.oLanguage.HTML_MAIN_TITLE_6;
document.getElementById("HTML_MAIN_TITLE2").innerHTML = gloB.oLanguage.HTML_MAIN_TITLE2_6;
glstrCongratulations = gloB.oLanguage.HTML_GOOD_TEXT_6; 
glstrNotCorrect = gloB.oLanguage.HTML_BAD_TEXT_6;
} // SetLevel_6

function SetLevel_7() {
//=====================
// Positionne les cartes.
// Il y a 10 cartes.
// La possibilité d'échanger deux cartes a été ajoutée.
gloB.nCaseMax = 10; // Numéro de la dernière case
Place_cadres_cartes(0, 0, 0); // Place les cases et les cadres

// Changes quelques textes, en fonction de la langue
document.getElementById("HTML_MAIN_TITLE").innerHTML = gloB.oLanguage.HTML_MAIN_TITLE_7;
document.getElementById("HTML_MAIN_TITLE2").innerHTML = gloB.oLanguage.HTML_MAIN_TITLE2_7;
glstrCongratulations = gloB.oLanguage.HTML_GOOD_TEXT_7;
glstrNotCorrect = gloB.oLanguage.HTML_BAD_TEXT_7;
} // SetLevel_7


function SetLevel() {
//===================
// Positionne les cartes, le startBlocks et la toolbox pour le niveau donné.
  // Pour placer automatiquement les cadres, les numéros et les cartes
var nn = 0;
var strInstr = '';

if (glnLevel == 1) SetLevel_1();
if (glnLevel == 2) SetLevel_2();
if (glnLevel == 3) SetLevel_3();
if (glnLevel == 4) SetLevel_4();
if (glnLevel == 5) SetLevel_5();
if (glnLevel == 6) SetLevel_6();
if (glnLevel == 7) SetLevel_7();

SetToolBox(glnLevel);

// c.f. http://www.juggling.ch/zgisin/a2014_oc3/page18_canvas.html
// c.f. https://www.w3schools.com/jsref/dom_obj_canvas.asp
var oCanvas = document.getElementById("idCanvasLevel");   
var oCtx = oCanvas.getContext("2d");
oCtx.strokeStyle="#e0e0e0";
oCtx.beginPath();
oCtx.clearRect(0, 0, oCanvas.width, oCanvas.height);

// Niveaux déjà complétés
oCtx.fillStyle='#808080';
var jj = 0;
for (jj=1; jj<=glnLevelReached; jj++) {
  oCtx.arc(30*jj, 16,    7,       0,        2*Math.PI);
        // posX, posY, rayon, angle départ, angle arrivée
  //oCtx.stroke(); // si on veut tracer le contour
  //oCtx.fillRect(10, 8, 10, 10);
  // posX, posY, largeur, hauteur
  }

oCtx.arc(30*glnLevel, 16, 14, 0, 2*Math.PI); // Niveau en cours
oCtx.fill();
oCtx.closePath();

// Niveaux à compléter
oCtx.strokeStyle='#8080ff';
var jj = 0;
for (jj=glnLevelReached+1; jj<glnLevelMax; jj++) {
  oCtx.beginPath();
  oCtx.arc(30*jj, 16,    7,       0,        2*Math.PI);
        // posX, posY, rayon, angle départ, angle arrivée
  oCtx.stroke();
  oCtx.closePath();
  }

// Indique le niveau en cours
oCtx.beginPath();
oCtx.fillStyle='#FFFFFF';
oCtx.font="normal normal bold 24px Arial";
oCtx.fillText(glnLevel, 30*glnLevel-6, 25);
oCtx.closePath();

// Indique quel est le dernier niveau
if (glnLevel < glnLevelMax) {
  oCtx.beginPath();
  oCtx.fillStyle='#808080';
  oCtx.arc(30*glnLevelMax, 16, 14, 0, 2*Math.PI);
  oCtx.fill();
  oCtx.fillStyle='#FFFFFF';
  oCtx.fillText(glnLevelMax, 30*glnLevelMax-6, 25);
  oCtx.closePath();
  }

if (glnLevel <= 3) document.getElementById("idDisplay").style.visibility = "hidden";
else               document.getElementById("idDisplay").style.visibility = "visible";

} // SetLevel

function CanvasClick(event) {
//===========================
// c.f. https://www.w3schools.com/jsref/jsref_reference.asp
// pour event.offsetX, c.f. https://www.w3schools.com/jsref/obj_mouseevent.asp
// pour oCanvas.offsetLeft c.f. https://www.w3schools.com/jsref/prop_element_offsetleft.asp
var oCanvas = document.getElementById("idCanvasLevel");   

//Displayln((event.x - oCanvas.offsetLeft) + "  " +  (event.y - oCanvas.offsetTop - oCanvas.offsetParent.offsetTop) 
//        + "  " + event.offsetX + "  " + event.offsetY + "  ");

// Pour tester Si on a cliqué sur un niveau déjà fait et changer de niveau.
var nClickLevel = Math.round(event.offsetX / 30);

//var vDist2 = (event.offsetX - nClickLevel * 30)**2 + (event.offsetY - 16)**2;  // À partir de javascript version 7  ECMA7
var vDist2 = (event.offsetX - nClickLevel * 30)*(event.offsetX - nClickLevel * 30) + (event.offsetY - 16)*(event.offsetY - 16);

if (vDist2 < 40) { // On a cliqué sur un cercle de niveau
  // Si les touches Ctrl et Shift sont pressées, on peut accédé du niveau, 
  // même si les précédents n'ont pas été fait.
  if ( (event.ctrlKey) && (event.shiftKey) ) glnLevelReached = nClickLevel;

  if (nClickLevel <= glnLevelReached) {
    // Arrête une éventuelle exécution et changement de niveau
    StopCode();
    glnRepetition = 0;
    gloB.funcRunFinished = null; // Ne pas tester la réponse
    glnLevel = nClickLevel;
    SetLevel();
    }
  }
  
} // CanvasClick
  
function MemoriseSituationInitiale() {
//====================================
// Mémorise la position des cartes au début.

// Parcours les 5 places pour mémoriser les cartes qui s'y trouvent.
var nn = 0;
var idImage = 'idPos';
var oImage = null;

for (nn=0; nn<MAXCASES; nn++) {
  idImage = 'idPos' + (100 + nn);
  oImage = document.getElementById(idImage + '1');
  // L'id termine par '1' pour la carte du dessus du tas
  if (oImage == null) {
    // Pas de carte à cette place
    glanMemorise_Cartes[nn] = 0;
    }
    else {
    glanMemorise_Cartes[nn] = parseInt(oImage.getAttribute("data-visible"));
    }
  }
} // MemoriseSituationInitiale

function TestReponse() {
//======================
// Test si les deux cartes ont bien été permutées.
var nCarteNum = 0;
var nInit = 0; // Case avant déplacements
var nFin = 0;  // Case après déplacements
var idImage = 'idPos';
var anCase_Carte = new Array(MAXCASES);
var oImage = null;
var fOK = true; // On part de l'hypothèse que les cartes ont bien été permuttées
var nCarteLast = 0; // Carte de la dernière case

// Enregistre le contenu des  MAXCASES  cases
for (nFin=0; nFin<MAXCASES; nFin++) {
  idImage = 'idPos' + (100 + nFin);
  oImage = document.getElementById(idImage + '1');
  // L'id termine par '1' pour la carte du dessus du tas
  if (oImage == null) anCase_Carte[nFin] = 0;   // Pas de carte à cette place
  else anCase_Carte[nFin] = parseInt(oImage.getAttribute("data-visible")); // Numéro de la carte  
  }

if (glnLevel <= 3) {
  // En parcourrant les NMAXCARD cases, test de permuttation.
  // Si, avant déplacements, une carte se trouve dans la case 'nInit'
  // cherche la case 'nFin' qui contenait cette carte après déplacements.
  // On a donc : Carte_avant[nInit] == Carte_après[nFin]
  // Pour avoir eu une permuttation de deux cartes, il faut que : Carte_avant[nFin] == Carte_après[nInit]
  for (nFin=0; nFin<MAXCASES; nFin++) {
    if (anCase_Carte[nFin] == 0) {
      if (glanMemorise_Cartes[nFin] != 0) { fOK = false; break; } // Il y avait une carte dans une case au départ où il n'y en a plus
      }
    else {
      // Il y a une carte à cette place.
      // Cherche dans quelle case se trouvait cette carte au départ
      for (nInit=0; nInit<MAXCASES; nInit++) {
        if (glanMemorise_Cartes[nInit] == anCase_Carte[nFin]) break; // case trouvée, mise dans nInit
        }

      if (nInit == nFin) { fOK = false; break; } // La carte se trouvant dans la même case qu'au départ.
      if (glanMemorise_Cartes[nFin] != anCase_Carte[nInit]) { fOK = false; break; } // Il n'y a pas eu permuttation de deux cartes
      }
    } // for
  } // if (glnLevel <= 3) {
else { // Test que les cartes sont bien triées
  // Teste que les cases > 0 contiennent des cartes et
  // qu'elles sont ordonnées.
  nCarteLast = 0;
  for (nFin=1; nFin<=gloB.nCaseMax; nFin++) {
    if (anCase_Carte[nFin] == 0) { fOK = false; break; } // Il n'y a pas de carte dans cette case
    else {
      if (nCarteLast > anCase_Carte[nFin] ) { fOK = false; break; } // Il y avait une carte dans une case au départ où il n'y en a plus
      nCarteLast = anCase_Carte[nFin];
      }
    }
  }

if (fOK) {
  if (glnRepetition > 1 && !gloB.fRunStop) { // Plusieurs répétions, pour tester l'algorithme.
    glnRepetition--;
    Place_cadres_cartes(0, 0, 0); // Place les cartes au hasard
    runCode_slow(2, 10); // Exécute le code
    return;
    }
  
  PlaySound('../medias/carill2.mp3', glstrCongratulations);
  // Passage au niveau suivant
  if (glnLevel < glnLevelMax) {
    glnLevel++; 
    if (glnLevelReached < glnLevel) glnLevelReached = glnLevel; // Mémorise le niveau atteint
    SetLevel();
    DialogHelp(true);
    }
  else { // Tous les niveaux ont été effectués avec succés.
    // On peut ajouter un dialogue spécial ici... ???
    }
  }
else {
  PlaySound('../medias/chimes.mp3', glstrNotCorrect);
  SetLevel(glnLevel);
  }
} // TestReponse

function LocalRunCode_slow(nSpeed, timeMS) {
//==========================================
// Exécution du code
 
// Pour qu'à la fin d'une exécution,
// le résultat du code soit testé.
gloB.funcRunFinished = TestReponse;

glnRepetition = 1;

if ( (glnLevel == 4) || (glnLevel == 5) ) {
glnRepetition = 6; // Teste plusieurs fois l'algorithme de tri.
// Place_cadres_cartes(0, 0, 0); // Place les cartes au hasard
}
if (glnLevel == 6) glnRepetition = 3; // Teste plusieurs fois l'algorithme de tri.
if (glnLevel == 7) glnRepetition = 2; // Teste plusieurs fois l'algorithme de tri.

MemoriseSituationInitiale();
runCode_slow(nSpeed, timeMS); // Exécute le code
} // LocalRunCode_slow
