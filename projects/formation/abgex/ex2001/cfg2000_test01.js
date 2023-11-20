// conf2000_test01.js
// #######################################

function confToolBoxInit() {
//========================
// Définition de la toolbox utilisée.

} // confToolBoxInit

function confStartBlocksInit() {
//============================
// Définition des blocs présents au départ

gloB.demoWorkspace.clear();  // Enlève tous les blocs, c.f. : https://developers.google.com/blockly/reference/js/Blockly.WorkspaceSvg#cleanUp

var strText = 
 '<xml xmlns="http://www.w3.org/1999/xhtml">'
+'\n  <block type="card_flip" x="87" y="105">'
+'\n   <data>1</data>'
+'\n    <value name="FRAME1">'
+'\n      <shadow type="math_number">'
+'\n        <field name="NUM">1</field>'
+'\n      </shadow>'
+'\n    </value>'
+'\n  </block>'
+'\n</xml>\n';

var xml = Blockly.Xml.textToDom(strText);
Blockly.Xml.domToWorkspace(xml, gloB.demoWorkspace);

} // confStartBlocksInit

function confFramesInit() {
//=======================
// Initialisation des cadres

confToolBoxInit();
//setTimeout(confStartBlocksInit, 8000);
 
// Définition de quelques cadres
// Les unités de position et de tailles sont arbitraires, car
// elles s'adaptent aux dimensions du canvas.
var nXmax = 5;
var nYmax = 1;
var nn = 0;
for (var nY=0; nY<nYmax; nY++) {
  for (var nX=0; nX<nXmax; nX++) {
    nn++;
    glaoFrames[nn].posX = 5 + 96*nX;
    glaoFrames[nn].posY = 5 + (144 + 5)*nY;  // + 5 pour le numéro de la case.
    glaoFrames[nn].deltaX = 86;
    glaoFrames[nn].deltaY = 134;
    }
  }
glnFramesMax = nn;

glaoFrames[16].deltaX = 43;
glaoFrames[16].deltaY = 67;
glaoFrames[10].fWithNumber = false;

// Le cadre d'indice 0 sert à cacher des cartes ou
// est le point de départ d'apparition de nouvelles cartes.
glaoFrames[0].posX = -40;
glaoFrames[0].posY = -200;
glaoFrames[0].deltaX = 0;
glaoFrames[0].deltaY = 0;
glaoFrames[0].fWithNumber = false;
glaoFrames[0].background_color = ""; // Couleur de fond.  "" => pas de couleur 
glaoFrames[0].width  = 0; // Largeur du trait du cadre 
glaoFrames[0].margin = 0; // marge entre le trait du cadre et la carte qu'il contiendra 
} // confFramesInit

function confFrameCardsInit() {
//===========================
// Placement de cartes
confFramesInit(); // On commence par initialiser les cadres, leurs positions et tailles.

var nn = 0;
var nCase = 0; // Numéro de la case dans laquelle la carte est placée
var nCardFace = 500; // Référence à l'image de la carte
var nCardBack = 501;
var strInstr = "";

gloCanvas.strSource = "../images/Carte";
gloCanvas.strExt = ".png";

gloCanvas.nbCards = 2; // Nombre de cartes
for (nn=1; nn<=gloCanvas.nbCards; nn++) { // Pour créer des instances de cartes
    //nCarte++;
    nCase = nn;
    strInstr += " <img src='" + gloCanvas.strSource + nCardFace + gloCanvas.strExt + "' alt='" + nCardFace + "' width=80 height=128"
             +  "\n id='idPos" + (100 + nn) + "'" // Les id vont de 101 à (100 + gloCanvas.nbCards)
             +  "\n data-frame='" + (nn) + "'" // Indique la case dans laquelle la carte se trouve
             +  "\n data-depth='1'" // Indique la position de la carte dans un tas
             +  "\n data-face-src='" + gloCanvas.strSource + "'" // Indique la source du nom du fichier image de la face
             +  "\n data-face-ext='" + gloCanvas.strExt + "'"  // Indique le nom de l'extension du fichier image de la face
             +  "\n data-face='" + nCardFace + "'" // Indique la face visible de la carte
             +  "\n data-back-src='" + gloCanvas.strSource + "'" // Indique la source du nom du fichier image du dos
             +  "\n data-back-ext='" + gloCanvas.strExt + "'"  // Indique le nom de l'extension du fichier image du dos
             +  "\n data-back='" + nCardBack + "'"            // Indique le dos de la carte
             +  "\n title='" + nCardFace + "'" // Si on va sur la carte, indique le numéro correspondant à ce que l'on voit.
             +  "\n onclick='CallBlocklyFunc(\"idPos" + (100 + nn) + "\");'" // pour appeler une fonction définie dans Blockly lorsqu'on clique sur la carte.
             +  "\n data-func=''" // Nom de la fonction Blocly à appeler, vide s'il y en a aucune.
             +  "\n data-param1=''" // Un paramètre optionnelle lors de l'appelle à la fonction Blockly
             +  "\n style='position:absolute; left:" + 70*nn + "px; top:190px;  z-index:" + 500 + ";'>\n";
    glaoFrames[nn].nNbCards = 1; // Certains cadres ont des cartes, c.f. "data-frame"
    } // for

document.getElementById('idCards').innerHTML = strInstr; 
} // confFrameCardsInit

confToolBoxInit();
confStartBlocksInit();
confFramesInit();
confFrameCardsInit();

// Pour placer les cartes correctement dans les cadres.
myFrameCardsResize(null);
