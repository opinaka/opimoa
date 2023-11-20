// conf2000_magie_2x3.js
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
//==========================
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

//return; // Ne fait rien

gloB.demoWorkspace.clear();  // Enlève tous les blocs, c.f. : https://developers.google.com/blockly/reference/js/Blockly.WorkspaceSvg#cleanUp

var strText = 
'<xml xmlns="http://www.w3.org/1999/xhtml">'
+'\n  <variables>'
+'\n  <variable type="">nCadre</variable>'
+'\n  <variable type="">param1</variable>'
+'\n  <variable type="">i</variable>'
+'\n  </variables>'
+'\n  <block type="card_link_func_card" x="30" y="70">'
+'\n    <value name="FRAME1">'
+'\n      <shadow type="math_number">'
+'\n        <field name="NUM">9</field>'
+'\n      </shadow>'
+'\n    </value>'
+'\n    <value name="FUNC">'
+'\n      <shadow type="text">'
+'\n        <field name="TEXT">redistribue</field>'
+'\n      </shadow>'
+'\n    </value>'
+'\n    <next>'
+'\n      <block type="card_link_func_card">'
+'\n        <value name="FRAME1">'
+'\n          <shadow type="math_number">'
+'\n            <field name="NUM">10</field>'
+'\n          </shadow>'
+'\n        </value>'
+'\n        <value name="FUNC">'
+'\n          <shadow type="text">'
+'\n            <field name="TEXT">redistribue</field>'
+'\n          </shadow>'
+'\n        </value>'
+'\n      </block>'
+'\n    </next>'
+'\n  </block>'
+'\n  <block type="procedures_defnoreturn" x="25" y="266">'
+'\n    <mutation>'
+'\n      <arg name="nCadre" varid="z:@1#,z4;E[_0l(?8Dmo"></arg>'
+'\n      <arg name="param1" varid="x;!=[WUYXjfB[,~UNGj9"></arg>'
+'\n    </mutation>'
+'\n    <field name="NAME">redistribue</field>'
+'\n    <comment pinned="false" h="80" w="160">Décrire cette fonction…</comment>'
+'\n    <statement name="STACK">'
+'\n      <block type="controls_if">'
+'\n        <mutation else="1"></mutation>'
+'\n        <value name="IF0">'
+'\n          <block type="logic_compare">'
+'\n            <field name="OP">EQ</field>'
+'\n            <value name="A">'
+'\n              <block type="variables_get">'
+'\n                <field name="VAR" variabletype="">nCadre</field>'
+'\n          </block>'
+'\n            </value>'
+'\n            <value name="B">'
+'\n              <block type="math_number">'
+'\n                <field name="NUM">9</field>'
+'\n              </block>'
+'\n            </value>'
+'\n          </block>'
+'\n        </value>'
+'\n        <statement name="DO0">'
+'\n          <block type="controls_for">'
+'\n            <field name="VAR" variabletype="">i</field>'
+'\n            <value name="FROM">'
+'\n              <shadow type="math_number">'
+'\n                <field name="NUM">1</field>'
+'\n              </shadow>'
+'\n            </value>'
+'\n            <value name="TO">'
+'\n              <shadow type="math_number">'
+'\n                <field name="NUM">7</field>'
+'\n              </shadow>'
+'\n            </value>'
+'\n            <value name="BY">'
+'\n              <shadow type="math_number">'
+'\n                <field name="NUM">2</field>'
+'\n              </shadow>'
+'\n            </value>'
+'\n            <statement name="DO">'
+'\n              <block type="card_movef1f2">'
+'\n                <data>1</data>'
+'\n                <value name="FRAME1">'
+'\n                  <shadow type="math_number">'
+'\n                    <field name="NUM">0</field>'
+'\n                  </shadow>'
+'\n                  <block type="variables_get">'
+'\n                    <field name="VAR" variabletype="">i</field>'
+'\n                  </block>'
+'\n                </value>'
+'\n                <value name="FRAME2">'
+'\n                  <shadow type="math_number">'
+'\n                    <field name="NUM">0</field>'
+'\n                  </shadow>'
+'\n                </value>'
+'\n              </block>'
+'\n            </statement>'
+'\n            <next>'
+'\n              <block type="controls_for">'
+'\n                <field name="VAR" variabletype="">i</field>'
+'\n                <value name="FROM">'
+'\n                  <shadow type="math_number">'
+'\n                    <field name="NUM">2</field>'
+'\n                  </shadow>'
+'\n                </value>'
+'\n                <value name="TO">'
+'\n                  <shadow type="math_number">'
+'\n                    <field name="NUM">8</field>'
+'\n                  </shadow>'
+'\n                </value>'
+'\n                <value name="BY">'
+'\n                  <shadow type="math_number">'
+'\n                    <field name="NUM">2</field>'
+'\n                  </shadow>'
+'\n                </value>'
+'\n                <statement name="DO">'
+'\n                  <block type="card_movef1f2">'
+'\n                    <data>1</data>'
+'\n                    <value name="FRAME1">'
+'\n                      <shadow type="math_number">'
+'\n                        <field name="NUM">0</field>'
+'\n                      </shadow>'
+'\n                      <block type="variables_get">'
+'\n                        <field name="VAR" variabletype="">i</field>'
+'\n                      </block>'
+'\n                    </value>'
+'\n                    <value name="FRAME2">'
+'\n                      <shadow type="math_number">'
+'\n                        <field name="NUM">0</field>'
+'\n                      </shadow>'
+'\n                    </value>'
+'\n                  </block>'
+'\n                </statement>'
+'\n              </block>'
+'\n            </next>'
+'\n          </block>'
+'\n        </statement>'
+'\n        <statement name="ELSE">'
+'\n          <block type="controls_for">'
+'\n            <field name="VAR" variabletype="">i</field>'
+'\n            <value name="FROM">'
+'\n              <shadow type="math_number">'
+'\n                <field name="NUM">2</field>'
+'\n              </shadow>'
+'\n            </value>'
+'\n            <value name="TO">'
+'\n              <shadow type="math_number">'
+'\n                <field name="NUM">8</field>'
+'\n              </shadow>'
+'\n            </value>'
+'\n            <value name="BY">'
+'\n              <shadow type="math_number">'
+'\n                <field name="NUM">2</field>'
+'\n              </shadow>'
+'\n            </value>'
+'\n            <statement name="DO">'
+'\n              <block type="card_movef1f2">'
+'\n                <data>1</data>'
+'\n                <value name="FRAME1">'
+'\n                  <shadow type="math_number">'
+'\n                    <field name="NUM">0</field>'
+'\n                  </shadow>'
+'\n                  <block type="variables_get">'
+'\n                    <field name="VAR" variabletype="">i</field>'
+'\n                  </block>'
+'\n                </value>'
+'\n                <value name="FRAME2">'
+'\n                  <shadow type="math_number">'
+'\n                    <field name="NUM">0</field>'
+'\n                  </shadow>'
+'\n                </value>'
+'\n              </block>'
+'\n            </statement>'
+'\n            <next>'
+'\n              <block type="controls_for">'
+'\n                <field name="VAR" variabletype="">i</field>'
+'\n                <value name="FROM">'
+'\n                  <shadow type="math_number">'
+'\n                    <field name="NUM">1</field>'
+'\n                  </shadow>'
+'\n                </value>'
+'\n                <value name="TO">'
+'\n                  <shadow type="math_number">'
+'\n                    <field name="NUM">7</field>'
+'\n                  </shadow>'
+'\n                </value>'
+'\n                <value name="BY">'
+'\n                  <shadow type="math_number">'
+'\n                    <field name="NUM">2</field>'
+'\n                  </shadow>'
+'\n                </value>'
+'\n                <statement name="DO">'
+'\n                  <block type="card_movef1f2">'
+'\n                    <data>1</data>'
+'\n                    <value name="FRAME1">'
+'\n                      <shadow type="math_number">'
+'\n                        <field name="NUM">0</field>'
+'\n                      </shadow>'
+'\n                      <block type="variables_get">'
+'\n                        <field name="VAR" variabletype="">i</field>'
+'\n                      </block>'
+'\n                    </value>'
+'\n                    <value name="FRAME2">'
+'\n                      <shadow type="math_number">'
+'\n                        <field name="NUM">0</field>'
+'\n                      </shadow>'
+'\n                    </value>'
+'\n                  </block>'
+'\n                </statement>'
+'\n              </block>'
+'\n            </next>'
+'\n          </block>'
+'\n        </statement>'
+'\n        <next>'
+'\n          <block type="controls_for">'
+'\n            <field name="VAR" variabletype="">i</field>'
+'\n            <value name="FROM">'
+'\n              <shadow type="math_number">'
+'\n                <field name="NUM">8</field>'
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
+'\n              <block type="card_movef1f2">'
+'\n                <data>1</data>'
+'\n                <value name="FRAME1">'
+'\n                  <shadow type="math_number">'
+'\n                    <field name="NUM">0</field>'
+'\n                  </shadow>'
+'\n                </value>'
+'\n                <value name="FRAME2">'
+'\n                  <shadow type="math_number">'
+'\n                    <field name="NUM">0</field>'
+'\n                  </shadow>'
+'\n                  <block type="variables_get">'
+'\n                    <field name="VAR" variabletype="">i</field>'
+'\n                  </block>'
+'\n                </value>'
+'\n              </block>'
+'\n            </statement>'
+'\n          </block>'
+'\n        </next>'
+'\n      </block>'
+'\n    </statement>'
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
var nXmax = 2;
var nYmax = 5;
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

// Deux cases pour les choix de colonnes
glaoFrames[9].posX  += 22;
glaoFrames[9].deltaX = 43;
glaoFrames[9].deltaY = 67;
glaoFrames[9].fWithNumber = false;

glaoFrames[10].posX  += 22;
glaoFrames[10].deltaX = 43;
glaoFrames[10].deltaY = 67;
glaoFrames[10].fWithNumber = false;

// Le cadre d'indice 0 sert à cacher des cartes ou
// est le point de départ d'apparition de nouvelles cartes.
// Ce cadre est défini dans la fonction myFramesInit() du fichier ex2000.js
} // confFramesInit

function confFrameCardsInit() {
//===========================
// Placement de cartes
confFramesInit(); // On commence par initialiser les cadres, leurs positions et tailles.

var nn = 0;
var nCase = 0; // Numéro de la case dans laquelle la carte est placée
var nCardFace = 101; // Référence à l'image de la carte
var nCardBack = 900;
var strInstr = "";

gloCanvas.strSource = "../images/Carte";
gloCanvas.strExt = ".png";

gloCanvas.nbCards = 10; // Nombre de cartes
for (nn=1; nn<=gloCanvas.nbCards; nn++) { // Pour créer des instances de cartes
    nCardFace = 100 + nn;
    nCase = nn;
    if (nn ==  9) {nCardFace = 900; }
    if (nn == 10) {nCardFace = 910; }
    
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
             +  "\n data-func-exec=''" // Pour indiquer si un événement a demandé l'exécution de la fonction associée à la carte
             +  "\n data-func=''" // Nom de la fonction Blocly à appeler, vide s'il y en a aucune.
             +  "\n data-param1=' '" // Un paramètre optionnelle lors de l'appelle à la fonction Blockly
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