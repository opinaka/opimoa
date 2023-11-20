// cfg2000fr_binaire_4_digits.js
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
Place 8 cases avec 8 cartes, pour traiter du binaire.
 */
// ########################################################################################

function confToolBoxInit() {
//==========================
// Définition de la toolbox utilisée.

} // confToolBoxInit

function confStartBlocksInit() {
//==============================
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
+'\n    <variable type="">nbr</variable>'
+'\n    <variable type="">binaire</variable>'
+'\n    <variable type="">i</variable>'
+'\n  </variables>'
+'\n  <block type="text_comment" x="10" y="10">'
+'\n    <value name="COMMENT">'
+'\n      <shadow type="text">'
+'\n        <field name="TEXT">traiter du binaire</field>'
+'\n      </shadow>'
+'\n    </value>'
+'\n    <next>'
+'\n      <block type="variables_set">'
+'\n        <field name="VAR" variabletype="">nbr</field>'
+'\n        <value name="VALUE">'
+'\n          <block type="math_number">'
+'\n            <field name="NUM">13</field>'
+'\n          </block>'
+'\n        </value>'
+'\n        <next>'
+'\n          <block type="variables_set">'
+'\n            <field name="VAR" variabletype="">binaire</field>'
+'\n            <value name="VALUE">'
+'\n              <block type="math_number">'
+'\n                <field name="NUM">0</field>'
+'\n              </block>'
+'\n            </value>'
+'\n            <next>'
+'\n              <block type="controls_for">'
+'\n                <field name="VAR" variabletype="">i</field>'
+'\n                <value name="FROM">'
+'\n                  <shadow type="math_number">'
+'\n                    <field name="NUM">0</field>'
+'\n                  </shadow>'
+'\n                </value>'
+'\n                <value name="TO">'
+'\n                  <shadow type="math_number">'
+'\n                    <field name="NUM">3</field>'
+'\n                  </shadow>'
+'\n                </value>'
+'\n                <value name="BY">'
+'\n                  <shadow type="math_number">'
+'\n                    <field name="NUM">1</field>'
+'\n                  </shadow>'
+'\n                </value>'
+'\n                <statement name="DO">'
+'\n                  <block type="card_flip">'
+'\n                    <data>1</data>'
+'\n                    <value name="FRAME1">'
+'\n                      <shadow type="math_number">'
+'\n                        <field name="NUM">3</field>'
+'\n                      </shadow>'
+'\n                      <block type="math_arithmetic">'
+'\n                        <field name="OP">ADD</field>'
+'\n                        <value name="A">'
+'\n                          <shadow type="math_number">'
+'\n                            <field name="NUM">5</field>'
+'\n                          </shadow>'
+'\n                          <block type="variables_get">'
+'\n                            <field name="VAR" variabletype="">i</field>'
+'\n                          </block>'
+'\n                        </value>'
+'\n                        <value name="B">'
+'\n                          <shadow type="math_number">'
+'\n                            <field name="NUM">1</field>'
+'\n                          </shadow>'
+'\n                        </value>'
+'\n                      </block>'
+'\n                    </value>'
+'\n                    <next>'
+'\n                      <block type="text_afficheln">'
+'\n                        <value name="TEXT">'
+'\n                          <shadow type="text">'
+'\n                            <field name="TEXT"></field>'
+'\n                          </shadow>'
+'\n                          <block type="variables_get">'
+'\n                            <field name="VAR" variabletype="">i</field>'
+'\n                          </block>'
+'\n                        </value>'
+'\n                      </block>'
+'\n                    </next>'
+'\n                  </block>'
+'\n                </statement>'
+'\n              </block>'
+'\n            </next>'
+'\n          </block>'
+'\n        </next>'
+'\n      </block>'
+'\n    </next>'
+'\n  </block>'
+'\n</xml>'
+'\n';

var xml = Blockly.Xml.textToDom(strText);
Blockly.Xml.domToWorkspace(xml, gloB.demoWorkspace);
} // confStartBlocksInit

function confParamInit() {
//========================
// Définition de certains paramètres
// c.f. bglibrary_frame_card.js
// c.f. bglibrary_abase.js
gloCanvas.marginRight = 5;  // marge entre la droite du dernier cadre et la droite du canvas
gloCanvas.marginBottom = 5 + 6; // marge entre le bas du dernier cadre et le bas du canvas   + 6 pour le numéro de la case.
gloCanvas.backgroundColor = "rgb(255,255,250)"; // Couleur de fond du canvas

// Sont défini dans : confFrameCardsInit
gloCanvas.strSource = "../images/Carte"; // Source des images des cartes, un nombre entre 100 et 999 suivra
gloCanvas.strExt = ".png"; // Extension des images des cartes. ".png", ".jpg" et ".gif" est habituel.

// function window_config(idWin, nVisible, nPosX, nPosY, nWidth, nHeight)  définit dans : ex2000.js
// idWin est une référence à la fenêtre à modifier.
// nVisible == 1 pour être visible ; == 0 pour être caché ; autre => ne change pas la visibilité 
// Positions et dimensions en pixels.  -9999 => reste inchangé.
// dimension <= 0 => reste inchangé
window_config('idDisplay', 1, -9999, -9999, 0, 0); // Fenêtre d'affichage
window_config('idCodeBlockly', -1, -9999, -9999, 0, 0); // Fenêtre Blockly, tout reste inchangé
window_config('idCodeJavascript', -1, -9999, -9999, 0, 0); // Fenêtre Javascript, tout, reste inchangé
window_config('idCodePython', 0, -9999, -9999, 0, 0); // Fenêtre Python, carchée, reste inchangé
window_config('idCodeLua', 0, -9999, -9999, 0, 0); // Fenêtre Lua, carchée, reste inchangé
window_config('idVariableSpy', 0, -9999, -9999, 0, 0); // Fenêtre des valeurs de variables cachée, carchée, reste inchangé 
window_config('idFrameCards', 1, -9999, -9999, 0, 0); // Fenêtre du jeu de cartes, tout, reste inchangé
} // confParamInit

function confFramesInit() {
//=========================
// Initialisation des cadres

confToolBoxInit();
//setTimeout(confStartBlocksInit, 8000);
 
// Définition de quelques cadres
// Les unités de position et de tailles sont arbitraires, car
// elles s'adaptent aux dimensions du canvas.
var nXmax = 4;
var nYmax = 1;
var nn = 0;
for (var nY=0; nY<nYmax; nY++) {
  for (var nX=0; nX<nXmax; nX++) {
    nn++;
    glaoFrames[nn].posX = 5 + 96*(nXmax -1 - nX);
    glaoFrames[nn].posY = 5 + (144 + 5)*nY;  // + 5 pour le numéro de la case.
    glaoFrames[nn].deltaX = 86;
    glaoFrames[nn].deltaY = 134;
    glaoFrames[nn].fWithNumber = false;
    }
  }
glnFramesMax = nn;

// Le cadre d'indice 0 sert à cacher des cartes ou
// est le point de départ d'apparition de nouvelles cartes.
// Ce cadre est défini dans la fonction myFramesInit() du fichier ex2000.js
} // confFramesInit

function confCardsInit() {
//========================
// Placement de cartes

var nn = 0;
var nCase = 0; // Numéro de la case dans laquelle la carte est placée
var nCardFace = 1048; // Référence à l'image de la carte
var nCardBack = 1049;
var strInstr = "";

gloCanvas.strSource = "../images/ASCII";
gloCanvas.strExt = ".png";

gloCanvas.nbCards = glnFramesMax; // Nombre de cartes
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
             +  "\n data-click-count='0'" // Compte le nombre de clicks sur la carte.
             +  "\n data-func=''" // Nom de la fonction Blocly à appeler, vide s'il y en a aucune.
             +  "\n data-param1=''" // Un paramètre optionnelle lors de l'appelle à la fonction Blockly
             +  "\n style='position:absolute; left:" + 70*nn + "px; top:190px;  z-index:" + 500 + ";'>\n";
    glaoFrames[nn].nNbCards = 1; // Certains cadres ont des cartes, c.f. "data-frame"
    } // for

document.getElementById('idCards').innerHTML = strInstr; 


// Écriture de texte par dessus la dernière carte, celle qui est blanche
// n°, posX, posY, texte
CardTextWrite(0, 34, 160, "2^3            2^2            2^1           2^0");
} // confCardsInit

function confMessageBegin() {
//==========================
// Permet d'afficher un message au départ,
// que l'on peut revoir en cliquant sur le point d'interrogation
// Si on en veut aucun, on peut laisser cette fonction vide, 
// ou ne pas l'appeler ci-dessous.

// &nbsp;  insert un espace
// <br>    insert un retour à la ligne 
// <b> .. </b>  pour mettre du texte en gras
// toutes les balises HTML sont acceptée, y compris les styles CSS.

// Consultez le code source du fichier "ex2000.html" pour d'autres "id" 
// permettant de faire d'autres modifications depuis ici.

// Change le contenu de la fenêtre "A'de..."
// <br> est une balise pour sauter une ligne.  Toutes la synthaxe HTML est disponible. 
document.getElementById('HTML_MAIN_TITLE2').innerHTML = ""
+ "&nbsp; Pour traiter des nombres en binaire &nbsp;<br>"
+ "&nbsp; de manière visuelle. &nbsp;<br>"
;

// Changement du titre du message
document.getElementById('HTML_MESSAGE').innerHTML =
  "&nbsp; Traitement binaire. &nbsp;"
;

// Change le contenu de la fenêtre "À propos..."
document.getElementById('HTML_ABOUT2').innerHTML =
  "&nbsp; Configuration créée par Bernard Gisin &nbsp;<br>"
+ "&nbsp; le 9 janvier 2020."
+ "<br><br>"
;

// Changement du titre de la boîte de dialogue "À propos de..."
document.getElementById('HTML_ABOUT1').innerHTML =
  "&nbsp; Pour traiter du binaire. &nbsp;"
;

DialogHelp(true);
} // confMessageBegin


// Exécution des fonctions d'initialisations.
ConfigInitClear(); // Pour préparer une nouvelle configuration
confToolBoxInit();
confStartBlocksInit();
confParamInit();
confFramesInit();
confCardsInit();

// Pour placer les cartes correctement dans les cadres.
myFrameCardsResize(null);

// Boîte de dialogue initiale, expliquant ce qu'il faut faire.
// Elle revient si on clique sur le point d'interrogation.
confMessageBegin();

