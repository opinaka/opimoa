// Adjonction de fonctionnalités à Blockly
// #######################################

// c.f. https://developers.google.com/blockly/guides/app-integration/running-javascript
//"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

var MAXCASES = 11;

var glnLevel = 1; // niveau dans les étapes des programmse
var glnLevelMax = 7;
var glnLevelReached = 1; // Niveau atteint
  
var glstrCongratulations = ""; // Félicitation, niveau réalisé
var glstrNotCorrect = ""; // Niveau pas réalisé

var glnRepetition = 0; // Pour répéter plusieurs tris, pour tester la validité de l'algorithme

var glnCase = 2; // Case de placement de cartes
var glnCardTot = 0; // Nombre totale de cartes placées
var glnCardNum = 0; // Numéro de la carte en train d'être placée
var gloImage = null; // Objet "carte" déplacée.
var glnCardPosX0 =  -80; // Fixe pour toutes les cartes
var glnCardPosX1 =    0; // Sera défini plus loin
var glnCardPosY0 =  190;
var glnCardPosY1 =   20; // Fixe pour toutes les cartes
var glnTimeMax = 30; // Nombre de déplacement d'une carte pour la mettre en place
var glnTime    = glnTimeMax;
var glanCases  = new Array(101); // Cases où placer les cartes au départ
var glanDepths = new Array(101); // Profondeur de chaque carte dans son tas, au départ

// Indique le nombre de cartes, des positions et des déplacements
gloB.nCaseMax   =   3; // Nombre de cases
gloB.nCardsLeft  = 100; // Position de la case '0'
gloB.nCardsTop   = 120;  // Position du haut des cartes (en pixels)
gloB.nCardsDelta = 300; // Distance entre deux cases (en pixels)
gloB.nCardsShift =  10;  // Pour décaler les cartes se trouvant sur le même tas.
gloB.cHide = ""; // Si vide, accepte la superposition de cartes.

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

function Place_cartes_move() {
//============================
// Déplace les cartes pour les mettres en place
var idImage = 0;

if (glnTime == glnTimeMax) {
  // Passage à la carte suivante.
  glnCardNum -= 1;  

  if (glnCardNum <= 0) {
    // Toutes les cartes ont été placées, démarre l'exécution du code
    if (glnRepetition >= 1) runCode_slow(2, 10); // Exécute le code
    gloImage = null; // Permet de démarrer le code
    return; // fin des déplacement de cartes.
    }

  idImage = 'idPos' + (100 + glanCases[glnCardNum]); // Code la position de la carte
  idImage += glanDepths[glnCardNum]; // Code la profondeur de la carte dans le tas
  gloImage = document.getElementById(idImage); // carte de la case "glnCase" s'il y en a une
  
  glnTime = 0; // initialisation pour le déplacement de la carte
  glnCardPosX1 = 100 + 300 * glanCases[glnCardNum] + 10*(glanDepths[glnCardNum]-1); // Case de placement de la carte
  }

if (gloImage == null) return; // Cas où on change de niveau durant un placement de cartes.

glnTime += 1;
var vFrac = glnTime / glnTimeMax;
var vFrac2 = vFrac * vFrac;
gloImage.style.left = (glnCardPosX0 + (glnCardPosX1 - glnCardPosX0) * vFrac) + "px";
gloImage.style.top  = (glnCardPosY0 + (glnCardPosY1 - glnCardPosY0) * vFrac2 * vFrac2) + "px";

// Déplace une carte toutes les 15 [ms]
setTimeout(Place_cartes_move, 15);
} // Place_cartes_move

function Place_cadres_cartes() {
//==============================
// Place automatiquement les cadres, les numéros et les cartes
// Le "data-visible" définit la face visible de la carte.
// le "id" définit la position de la carte.
// le "data-back" défini la couleur du dos de la carte. 900 pour bleu, 910 pour rouge.
// C.f. http://html5doctor.com/html5-custom-data-attributes/  pour des information sur l'attribut "data-*"
// Carte900.png est le dos bleu d'une carte.
// Carte910.png est le dos rouge d'une carte.
// Si le numéro de 3 chiffres qui suit est >= 900, on considère que c'est le dos d'une carte.
var nn = 0;
var nCarte = 301; // Carte placée
var strCarteSrc = '900'; // Source de l'image visible de la carte
var strInstr = '';
var nbrCartes = 2; // nombre de cartes
var nCase = 2; // case n°2, celle du milieu
var vRand = 0.0; // Pour un nombre aléatoires entre 0 et 1.
var anDepth = [0, 0, 0, 0]; // Nombre de carte dans chaque case

if (glnLevel >= 5) nbrCartes = 10;

for (nn=1; nn<=gloB.nCaseMax; nn++) { // Place les cases
  strInstr += " <img src='../images/Cadre_noire_2px.png' alt='cadre noire' width=88 height=140\n" 
           +  " style='position:absolute; left:" + (300 * nn + 95) + "px; top:15px; z-index:90;'>\n"
           +  " <span style='position:absolute; left:" + (300 * nn + 136) + "px; top:160px;  z-index:90;'>" + nn + "</span>\n";
  } // for

glnCardTot = 0; // Pas de carte placée, au départ.

for (nn=1; nn<=nbrCartes; nn++) { // Place les cartes
    if (glnLevel <= 2) {
      if (nn == 1) nCarte = 301 + Math.floor(Math.random()*13); // tirage au hasard une carte rouge
      else  nCarte = 101 + Math.floor(Math.random()*13); // tirage au hasard une carte noire
      }
    else if (glnLevel == 3) {
      // On place une carte rouge et une noire, l'ordre est aléatoire
      if (nn == 1) {
        if (Math.random() > 0.5) {
          // Tire une carte rouge
          nCarte = 301 + Math.floor(Math.random()*13);
          }
        else {
          // Tire une carte noire
          nCarte = 101 + Math.floor(Math.random()*13);            
          }
        } // if (nn == 1)
      else { // Deuxième carte
        if (nCarte < 300) {
          // Tire une carte rouge
          nCarte = 301 + Math.floor(Math.random()*13);
          }
        else {
          // Tire une carte noire
          nCarte = 101 + Math.floor(Math.random()*13);            
          }
        }
      }
    else // glnLevel >= 4
      // On place des cartes rouges et des noires, aléatoirement
      if (Math.random() > 0.5) {
        // Tire une carte rouge
        nCarte = 301 + Math.floor(Math.random()*13);
        }
      else {
        // Tire une carte noire
        nCarte = 101 + Math.floor(Math.random()*13);            
        }
    
    strCarteSrc = nCarte;
    if (glnLevel == 2) strCarteSrc = "900"; // Pour que le dos de la carte soit visible.
    if ( (glnLevel >= 6) && (Math.random() > 0.67)) strCarteSrc = "900"; // Pour que le dos de la carte soit visible.
    if (glnLevel >= 7) {
      // La case où est placée la carte est tirée au hasard
      vRand = Math.random();
      if (vRand > 0.67)      nCase = 3;
      else if (vRand > 0.33) nCase = 2;
      else                   nCase = 1;
      }
    
    anDepth[nCase] += 1;
    glnCardTot += 1; // Compte le nombre de cartes sur le tas
    glanCases[glnCardTot] = nCase; // Mémorise la case de la carte
    glanDepths[glnCardTot] = anDepth[nCase]; // Mémorise la profondeur de la carte dans le tas

    strInstr += " <img src='../images/Carte" + strCarteSrc + ".png' alt='Carte " + nCarte + "' width=80 height=128"
             +  "\n id='idPos" + (100 + nCase) // Indique la position de la carte
             + anDepth[nCase] + "'" // Indique la position de la carte dans un tas
             + "\n data-src='../images/Carte'" // Indique la source du nom du fichier image
             + "\n data-ext='.png'" // Indique le nom de l'extension du fichier image
             + "\n data-face='" + nCarte + "'" // Indique la face de la carte
             + "\n data-back='900'"            // Indique le dos de la carte
             + "\n data-visible='" + strCarteSrc + "'" // Indique la face visible de la carte
             + "\n title='" + strCarteSrc + "'" // Si on va sur la carte, indique le numéro correspondant à ce que l'on voit.
             + "\n style='position:absolute; left:" + glnCardPosX0 + "px; top:190px;  z-index:" + (100-nn) + ";'>\n";
  } // for (nn=1; nn<=nbrCartes; nn++)
// C.f. http://html5doctor.com/html5-custom-data-attributes/  pour des information sur l'attribut "data-*"

document.getElementById('idCartes').innerHTML = strInstr; 

// Déplace une carte toutes les 15 [ms]
glnTime  = glnTimeMax;
glnCardNum  = glnCardTot+1; // Pour placer les cartes, on commence par la dernière

gloImage = null;
setTimeout(Place_cartes_move, 15);
} // Place_cadres_cartes

function Place_cartes() {
//=======================
// Ferme le dialogue
document.getElementById('idDialogWellSeparated').style.display='none';

// Place les cartes et fait un tri                      
Place_cadres_cartes();
}

function Display_ok_and_resort() {
//================================
// Affiche que le tri c'est bien fait et fait un tri supplémentaire.
document.getElementById('idDialogWellSeparated').style.display='block';

// Indique de placer les cartes au hasard et fait un tri dans ... [ms]
setTimeout(Place_cartes, 800); 
} // Display_ok_and_resort
    
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
    '<block type="card_flip">\n'
      + '<value name="POSX">\n'
        + '<shadow type="math_number">\n'
          + '<field name="NUM">3</field>\n'
        + '</shadow>\n'
      + '</value>\n'
      + '<data>10</data>\n'
    + '</block>\n';

var strToolbox_card_c =
    '<block type="card_get_card">\n'
    + '<value name="POSX">\n'
      + '<shadow type="math_number">\n'
        + '<field name="NUM">3</field>\n'
      + '</shadow>\n'
    + '</value>\n'
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

if (nLevel == 2) {
  // Ajoute la possibilibé de retourner une carte.
  strToolbox += strToolbox_card_b;
  }

if (nLevel >= 3) { 
  strToolbox += strToolbox_card_b + strToolbox_card_c + '</category>\n' 
             + strToolbox_logic_loops + strToolbox_math + strToolbox_text + strToolbox_var_func;
  }
     
strToolbox += '</category>\n' + '</xml>\n'; // Fin

// Change le contenu de la toolbox, pour donner la possibilité d'avoir une fonction.
gloB.demoWorkspace.updateToolbox(strToolbox);

gloB.demoWorkspace.options.maxBlocks = 10000; // Enlève la limite du nombre de blocks utilisables.

// Met la fonction par défaut qui est appelée quand le workspace change.  
gloB.demoWorkspace.addChangeListener(onchange);
onchange();   
} // SetToolBox

function SetLevel_1() {
//=====================
// Place deux cartes faces visibles sur la deuxième case, celle du milieu
gloB.nCaseMax = 3; // Numéro de la dernière case
Place_cadres_cartes(); // Place 2 cases et 3 cadres

// Changes quelques textes, en fonction de la langue
document.getElementById("HTML_MAIN_TITLE").innerHTML = gloB.oLanguage.HTML_MAIN_TITLE;
document.getElementById("HTML_MAIN_TITLE2").innerHTML = gloB.oLanguage.HTML_MAIN_TITLE2;
glstrCongratulations = gloB.oLanguage.HTML_GOOD_TEXT_1;
glstrNotCorrect = gloB.oLanguage.HTML_BAD_TEXT_1;
} // SetLevel_1

function SetLevel_2() {
//=====================
// Place deux cartes faces visibles sur la deuxième case, celle du milieu
gloB.nCaseMax = 3; // Numéro de la dernière case
Place_cadres_cartes(); // Place 2 cases et 3 cadres, dos visible.

// Changes quelques textes, en fonction de la langue
glstrCongratulations = gloB.oLanguage.HTML_GOOD_TEXT_2;
glstrNotCorrect = gloB.oLanguage.HTML_BAD_TEXT_2;
document.getElementById("HTML_MAIN_TITLE").innerHTML = gloB.oLanguage.HTML_MAIN_TITLE_2;
document.getElementById("HTML_MAIN_TITLE2").innerHTML = gloB.oLanguage.HTML_MAIN_TITLE2_2;
} // SetLevel_2

function SetLevel_3() {
//=====================
// Positionne 3 paires de deux cartes.
gloB.nCaseMax = 3; // Numéro de la dernière case
Place_cadres_cartes(); // Place 2 cases et 3 cadres

// Changes quelques textes, en fonction de la langue
document.getElementById("HTML_MAIN_TITLE").innerHTML = gloB.oLanguage.HTML_MAIN_TITLE_3;
document.getElementById("HTML_MAIN_TITLE2").innerHTML = gloB.oLanguage.HTML_MAIN_TITLE2_3;
glstrCongratulations = gloB.oLanguage.HTML_GOOD_TEXT_3;
glstrNotCorrect = gloB.oLanguage.HTML_BAD_TEXT_3;
} // SetLevel_3

function SetLevel_4() {
//=====================
// Positionne 10 cartes.
gloB.nCaseMax = 3; // Numéro de la dernière case
Place_cadres_cartes(); // Place les cases et les cadres

// Changes quelques textes, en fonction de la langue
document.getElementById("HTML_MAIN_TITLE").innerHTML = gloB.oLanguage.HTML_MAIN_TITLE_4;
document.getElementById("HTML_MAIN_TITLE2").innerHTML = gloB.oLanguage.HTML_MAIN_TITLE2_4;
glstrCongratulations = gloB.oLanguage.HTML_GOOD_TEXT_4;
glstrNotCorrect = gloB.oLanguage.HTML_BAD_TEXT_4;
} // SetLevel_4

function SetLevel_5() {
//=====================
// Positionne 3 cartes.
gloB.nCaseMax = 3; // Numéro de la dernière case
Place_cadres_cartes(); // Place les cases et les cadres

// Changes quelques textes, en fonction de la langue
document.getElementById("HTML_MAIN_TITLE").innerHTML = gloB.oLanguage.HTML_MAIN_TITLE_5;
document.getElementById("HTML_MAIN_TITLE2").innerHTML = gloB.oLanguage.HTML_MAIN_TITLE2_5;
glstrCongratulations = gloB.oLanguage.HTML_GOOD_TEXT_5; 
glstrNotCorrect = gloB.oLanguage.HTML_BAD_TEXT_5;
} // SetLevel_5

function SetLevel_6() {
//=====================
// Positionne 4 cartes.
gloB.nCaseMax = 3; // Numéro de la dernière case
Place_cadres_cartes(); // Place les cases et les cadres

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
gloB.nCaseMax = 3; // Numéro de la dernière case
Place_cadres_cartes(); // Place les cases et les cadres

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
// À EFFACER
} // MemoriseSituationInitiale

function TestReponse() {
//======================
// Test si les deux cartes ont bien été permutées.
var nCarteNum = 0;
var fOK = true; // On part de l'hypothèse que l'algorithme est correct.
var nCardDepth = 1; // Niveau de la carte dans une pile

if (glnLevel <= 3) {
  // Teste que la rouge est à gauche et la noire à droite.
  // Teste aussi que les cartes sont retournées 
  nCarteNum = GetCardValue(1);
  if ( (nCarteNum < 300) || (nCarteNum > 413) ) fOK = false; // La face visible de la case 1 n'est pas rouge

  nCarteNum = GetCardValue(3);
  if ( (nCarteNum < 100) || (nCarteNum > 213) ) fOK = false; // La face visible de la case 3 n'est pas noire  
  } // if (glnLevel <= 3) {
else { // Teste que les cartes rouges sont à gauche et les noires à droite
  nCarteNum = GetCardValue(2);
  if (nCarteNum > 0) fOK = false; // Il reste une carte dans la case du milieu
  
  // Teste que toutes les cartes de la case 1 sont rouges
  nCardDepth = 1;
  nCarteNum = GetCardValue2(1, nCardDepth);
  while ((nCarteNum > 0) && fOK) {
    // Teste que la carte est rouge
    if ( (nCarteNum < 300) || (nCarteNum > 413) ) fOK = false;
    // Passage à la carte de dessous, s'il y en a une
    nCardDepth += 1;
    nCarteNum = GetCardValue2(1, nCardDepth);
    }
  
  // Teste que toutes les cartes de la case 3 sont noires
  nCardDepth = 1;
  nCarteNum = GetCardValue2(3, nCardDepth);
  while ((nCarteNum > 0) && fOK) {
    // Teste que la carte est noir
    if (nCarteNum > 213) fOK = false;
    // Passage à la carte de dessous, s'il y en a une
    nCardDepth += 1;
    nCarteNum = GetCardValue2(3, nCardDepth);
    }
  } // else

if (fOK) {
  glnRepetition--;
  if (glnRepetition >= 1) { // Plusieurs répétions, pour tester l'algorithme.
    Display_ok_and_resort();
    // runCode_slow(2, 10); // Le code sera exécuté après le placement des cartes.
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
  glnRepetition = 0; // Pas de test de tri supplémentaire.
  PlaySound('../medias/chimes.mp3', glstrNotCorrect);
  SetLevel(glnLevel);
  }
} // TestReponse

function LocalRunCode_slow(nSpeed, timeMS) {
//==========================================
// Exécution du code
 
if (gloImage != null) return; // Placement des cartes en cours.
 
// Pour qu'à la fin d'une exécution,
// le résultat du code soit testé.
gloB.funcRunFinished = TestReponse;

glnRepetition = 1; // nombre de fois que l'on répète l'algorithme.

if ( (glnLevel == 3) || (glnLevel == 4) ) {
  glnRepetition = 5; // Teste plusieurs fois l'algorithme
  // Place_cadres_cartes(); // Place les cartes au hasard
  }

MemoriseSituationInitiale();
runCode_slow(nSpeed, timeMS); // Exécute le code
} // LocalRunCode_slow
