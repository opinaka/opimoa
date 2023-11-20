// conf2000_compteur_binaire.js
// Tout ce qui suit un double slash sont des commentaires, jusqu'à la fin de la ligne.
/*
Les blocs de lignes commençant par 'slash étoile' et terminant par 'étoile slash' sont des commentaires

Ceci est un fichier de configuration, qui permet de définir :
° la toolbox = l'ensemble des blocs disponibles
° la startblocs = les blocs présents au départ
° la définition des cases
° la définition des cartes présentes
° les fenêtres visibles et cachées
° la position des fenêtres
° la taille des fenêtres
° divers autres paramètres.

Ce fichier de configuration est un programme écrit en javascript.
Ceci rend la configuration très souple et puissante.
Il n'est pas nécessaire de tout comprendre pour prendre un fichier de configuration
existant, faire quelques modification et obtenir ainsi un nouveau fichier de fonfiguration.
 */
//-------------------------------------------------
/*
Ce fichier de configuration défini un compteur binaire.
 */
// ########################################################################################

function confToolBoxInit() {
//========================
// Définition de la toolbox utilisée.

} // confToolBoxInit

function confStartBlocksInit() {
//============================
// Définition des blocs présents au départ
// C'est long mais simple à faire.
// On :
// ° place les blocs désirés dans ex2000.html
// ° Fichiers enregistrer sous ...
// ° demande de voir le fichier dans un éditeur de texte.
// ° fait un copier-coller du texte.
// ° ajoute des  +'\n'  en début de chaque ligne (sauf la première)
// ° ajoute des  '  en fin de ligne.

gloB.demoWorkspace.clear();  // Enlève tous les blocs, c.f. : https://developers.google.com/blockly/reference/js/Blockly.WorkspaceSvg#cleanUp

var strText = 
'<xml xmlns="http://www.w3.org/1999/xhtml">'
+'\n  <variables>'
+'\n    <variable type="">i</variable>'
+'\n  </variables>'
+'\n  <block type="text_comment" x="39" y="120">'
+'\n    <value name="COMMENT">'
+'\n      <shadow type="text">'
+'\n        <field name="TEXT">Fait un compteur de 0 à 8</field>'
+'\n      </shadow>'
+'\n    </value>'
+'\n    <next>'
+'\n      <block type="controls_repeat_ext">'
+'\n        <value name="TIMES">'
+'\n          <shadow type="math_number">'
+'\n            <field name="NUM">8</field>'
+'\n          </shadow>'
+'\n        </value>'
+'\n        <statement name="DO">'
+'\n          <block type="controls_for">'
+'\n            <field name="VAR" variabletype="">i</field>'
+'\n            <value name="FROM">'
+'\n              <shadow type="math_number">'
+'\n                <field name="NUM">5</field>'
+'\n              </shadow>'
+'\n            </value>'
+'\n            <value name="TO">'
+'\n              <shadow type="math_number">'
+'\n                <field name="NUM">1</field>'
+'\n              </shadow>'
+'\n            </value>'
+'\n            <value name="BY">'
+'\n              <shadow type="math_number">'
+'\n                <field name="NUM">1</field>'
+'\n              </shadow>'
+'\n            </value>'
+'\n            <statement name="DO">'
+'\n              <block type="card_flip">'
+'\n                <data>1</data>'
+'\n                <value name="FRAME1">'
+'\n                  <shadow type="math_number">'
+'\n                    <field name="NUM">3</field>'
+'\n                  </shadow>'
+'\n                  <block type="variables_get">'
+'\n                    <field name="VAR" variabletype="">i</field>'
+'\n                  </block>'
+'\n                </value>'
+'\n                <next>'
+'\n                  <block type="controls_if">'
+'\n                    <value name="IF0">'
+'\n                      <block type="logic_compare">'
+'\n                        <field name="OP">EQ</field>'
+'\n                        <value name="A">'
+'\n                          <block type="card_get_card">'
+'\n                            <value name="FRAME1">'
+'\n                              <shadow type="math_number">'
+'\n                                <field name="NUM">3</field>'
+'\n                              </shadow>'
+'\n                              <block type="variables_get">'
+'\n                                <field name="VAR" variabletype="">i</field>'
+'\n                              </block>'
+'\n                            </value>'
+'\n                          </block>'
+'\n                        </value>'
+'\n                        <value name="B">'
+'\n                          <block type="math_number">'
+'\n                            <field name="NUM">1049</field>'
+'\n                          </block>'
+'\n                        </value>'
+'\n                      </block>'
+'\n                    </value>'
+'\n                    <statement name="DO0">'
+'\n                      <block type="controls_flow_statements">'
+'\n                        <field name="FLOW">BREAK</field>'
+'\n                      </block>'
+'\n                    </statement>'
+'\n                  </block>'
+'\n                </next>'
+'\n              </block>'
+'\n            </statement>'
+'\n            <next>'
+'\n              <block type="text_pause">'
+'\n                <field name="SPEED">NONE</field>'
+'\n                <value name="TIME">'
+'\n                  <shadow type="math_number">'
+'\n                    <field name="NUM">1</field>'
+'\n                  </shadow>'
+'\n                </value>'
+'\n              </block>'
+'\n            </next>'
+'\n          </block>'
+'\n        </statement>'
+'\n      </block>'
+'\n    </next>'
+'\n  </block>'
+'\n</xml>'
+'\n';

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

// Le cadre d'indice 0 sert à cacher des cartes ou
// est le point de départ d'apparition de nouvelles cartes.
// Ce cadre est défini dans la fonction myFramesInit() du fichier ex2000.js
} // confFramesInit

function confFrameCardsInit() {
//=============================
// Placement de cartes
confFramesInit(); // On commence par initialiser les cadres, leurs positions et tailles.

var nn = 0;
var nCase = 0; // Numéro de la case dans laquelle la carte est placée
var nCardFace = 1048; // Référence à l'image de la carte
var nCardBack = 1049;
var strInstr = "";

gloCanvas.strSource = "../images/ASCII";
gloCanvas.strExt = ".png";

gloCanvas.nbCards = 5; // Nombre de cartes
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
