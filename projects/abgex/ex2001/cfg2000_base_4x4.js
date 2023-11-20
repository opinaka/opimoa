// cfg2000_base_4x4.js
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
Exemple de configuration de base.
° Une ToolBox avec tous les blocs disponibles, les blocs de programme disponibles.
° Un exemple de StartBlocs, les blcs présents au départ.
° Un exemple simple de placement de 4 colonnes de 4 lignes de cadres où placer des cartes.
  Il y a toujour le cadre 0, qui permet de mettre temporairement des cartes ailleurs.
° Placement de cartes, qui pourront contenir des cartes.
° Définition de paramètres.
° Définition des fenêtres visibles et cachées, de leurs tailles et positions.
 */
// ########################################################################################

function cfgToolBoxInit() {
//=========================
// Définition de la toolbox utilisée.
// La moindre erreur fait que la nouvelle toolbox est ignorée.

// La toolbox sera constituée de différentes blocs.
var strToolbox = 
'<xml>\n'
+'\n  <category name="%{BKY_CATEGORY_NAME_LOGIC}" colour="%{BKY_LOGIC_HUE}">'
+'\n    <block type="controls_if"></block>'
+'\n    <block type="logic_compare"></block>'
+'\n    <block type="logic_operation"></block>'
+'\n    <block type="logic_negate"></block>'
+'\n    <block type="logic_boolean"></block>'
+'\n    <block type="logic_null"></block>'
+'\n    <block type="logic_ternary"></block>'
+'\n  </category>'
+'\n  <category name="%{BKY_CATEGORY_NAME_LOOPS}" colour="%{BKY_LOOPS_HUE}">'
+'\n    <block type="controls_repeat_ext">'
+'\n      <value name="TIMES">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">10</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="controls_whileUntil"></block>'
+'\n    <block type="controls_for">'
+'\n      <value name="FROM">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">1</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n      <value name="TO">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">10</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n      <value name="BY">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">1</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="controls_forEach"></block>'
+'\n    <block type="controls_flow_statements"></block>'
+'\n  </category>'
+'\n  <category name="%{BKY_CATEGORY_NAME_MATH}" colour="%{BKY_MATH_HUE}">'
+'\n    <block type="math_number">'
+'\n      <field name="NUM">123</field>'
+'\n    </block>'
+'\n    <block type="math_arithmetic">'
+'\n      <value name="A">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">1</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n      <value name="B">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">1</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="math_single">'
+'\n      <value name="NUM">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">9</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="math_trig">'
+'\n      <value name="NUM">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">45</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="math_constant"></block>'
+'\n    <block type="math_number_property">'
+'\n      <value name="NUMBER_TO_CHECK">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">0</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="math_round">'
+'\n      <value name="NUM">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">3.1</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="math_on_list"></block>'
+'\n    <block type="math_modulo">'
+'\n      <value name="DIVIDEND">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">64</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n      <value name="DIVISOR">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">10</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="math_constrain">'
+'\n      <value name="VALUE">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">50</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n      <value name="LOW">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">1</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n      <value name="HIGH">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">100</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="math_random_int">'
+'\n      <value name="FROM">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">1</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n      <value name="TO">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">100</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="math_random_float"></block>'
+'\n    <block type="math_atan2">'
+'\n      <value name="X">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">1</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n      <value name="Y">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">1</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n    </block>'
+'\n  </category>'
+'\n  <category name="%{BKY_CATEGORY_NAME_TEXT}" colour="%{BKY_TEXTS_HUE}">'
+'\n    <block type="text"></block>'
+'\n    <block type="text_join"></block>'
+'\n    <block type="text_afficheln">'
+'\n      <value name="TEXT">'
+'\n        <shadow type="text"></shadow>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="text_affiche">'
+'\n      <value name="TEXT">'
+'\n        <shadow type="text"></shadow>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="text_length">'
+'\n      <value name="VALUE">'
+'\n        <shadow type="text">'
+'\n          <field name="TEXT">abc</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="text_isEmpty">'
+'\n      <value name="VALUE">'
+'\n        <shadow type="text">'
+'\n          <field name="TEXT"></field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="text_indexOf">'
+'\n      <value name="VALUE">'
+'\n        <block type="variables_get">'
+'\n          <field name="VAR">{textVariable}</field>'
+'\n        </block>'
+'\n      </value>'
+'\n      <value name="FIND">'
+'\n        <shadow type="text">'
+'\n          <field name="TEXT">abc</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="text_charAt">'
+'\n      <value name="VALUE">'
+'\n        <block type="variables_get">'
+'\n          <field name="VAR">{textVariable}</field>'
+'\n        </block>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="text_getSubstring">'
+'\n      <value name="STRING">'
+'\n        <block type="variables_get">'
+'\n          <field name="VAR">{textVariable}</field>'
+'\n        </block>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="text_changeCase">'
+'\n      <value name="TEXT">'
+'\n        <shadow type="text">'
+'\n          <field name="TEXT">abc</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="text_trim">'
+'\n      <value name="TEXT">'
+'\n        <shadow type="text">'
+'\n          <field name="TEXT">abc</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="text_prompt_ext">'
+'\n      <value name="TEXT">'
+'\n        <shadow type="text">'
+'\n          <field name="TEXT">abc</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n    </block>'
+'\n  </category>'
+'\n  <category name="%{BKY_CATEGORY_NAME_TEXT} +" colour="%{BKY_TEXTS_HUE}">'
+'\n    <block type="text_comment">'
+'\n      <value name="COMMENT">'
+'\n        <shadow type="text">'
+'\n          <field id="XML_TB_COMMENT" name="TEXT">écrivez un commentaire...</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="text_affiche_efface">'
+'\n    </block>'
+'\n    <block type="variable_spy">'
+'\n      <value name="TIME">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">1.5</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="text_pause">'
+'\n      <value name="TIME">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">1.5</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n    </block>'
+'\n  </category>'
+'\n  <category name="%{BKY_CATEGORY_NAME_CARD}" colour="%{BKY_COLOUR_HUE}">'
+'\n    <block type="card_get_card">'
+'\n      <value name="FRAME1">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">1</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="card_flip">'
+'\n      <value name="FRAME1">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">1</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n      <data>1</data>'
+'\n    </block>'
+'\n    <block type="card_movef1f2">'
+'\n      <value name="FRAME1">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">3</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n      <value name="FRAME2">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">5</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n      <data>1</data>'
+'\n    </block>'
+'\n    <block type="card_exchangef1f2">'
+'\n      <value name="FRAME1">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">3</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n      <value name="FRAME2">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">5</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n      <data>1</data>'
+'\n    </block>'
+'\n    <block type="card_set_shift">'
+'\n      <value name="SHIFT">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">10</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n    </block>'
+'\n  </category>'
+'\n  <category name="%{BKY_CATEGORY_NAME_CARD} +" colour="%{BKY_COLOUR_HUE}">'
+'\n    <block type="card_add_one_card">'
+'\n      <value name="CARD">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">101</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n      <value name="BACK">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">900</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n      <value name="FRAME2">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">1</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n      <data>1</data>'
+'\n    </block>'
+'\n    <block type="card_remove_one_card">'
+'\n      <value name="FRAME1">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">1</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n      <data>1</data>'
+'\n    </block>'
+'\n    <block type="card_exist_test">'
+'\n      <value name="CARD">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">1</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="card_exist_response">'
+'\n    </block>'
+'\n    <block type="card_source_define">'
+'\n      <value name="SOURCE">'
+'\n        <shadow type="text">'
+'\n          <field name="TEXT">../images/Carte</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n      <value name="EXT">'
+'\n        <shadow type="text">'
+'\n          <field name="TEXT">.png</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="card_back_define">'
+'\n      <value name="BACK">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">900</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n      <value name="FRAME1">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">1</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="card_link_func_card">'
+'\n      <value name="FRAME1">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">1</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n      <value name="FUNC">'
+'\n        <shadow type="text">'
+'\n          <field name="TEXT"></field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n      <value name="PARAM1">'
+'\n        <shadow type="text">'
+'\n          <field name="TEXT"></field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n    </block>'
+'\n  </category>'
+'\n  <category name="%{BKY_CATEGORY_NAME_LISTS}" colour="%{BKY_LISTS_HUE}">'
+'\n    <block type="lists_create_with">'
+'\n      <mutation items="0"></mutation>'
+'\n    </block>'
+'\n    <block type="lists_create_with"></block>'
+'\n    <block type="lists_repeat">'
+'\n      <value name="NUM">'
+'\n        <shadow type="math_number">'
+'\n          <field name="NUM">5</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="lists_length"></block>'
+'\n    <block type="lists_isEmpty"></block>'
+'\n    <block type="lists_indexOf">'
+'\n      <value name="VALUE">'
+'\n        <block type="variables_get">'
+'\n          <field name="VAR">{listVariable}</field>'
+'\n        </block>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="lists_getIndex">'
+'\n      <value name="VALUE">'
+'\n        <block type="variables_get">'
+'\n          <field name="VAR">{lCOMMENTistVariable}</field>'
+'\n        </block>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="lists_setIndex">'
+'\n      <value name="LIST">'
+'\n        <block type="variables_get">'
+'\n          <field name="VAR">{listVariable}</field>'
+'\n        </block>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="lists_getSublist">'
+'\n      <value name="LIST">'
+'\n        <block type="variables_get">'
+'\n          <field name="VAR">{listVariable}</field>'
+'\n        </block>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="lists_split">'
+'\n      <value name="DELIM">'
+'\n        <shadow type="text">'
+'\n          <field name="TEXT">,</field>'
+'\n        </shadow>'
+'\n      </value>'
+'\n    </block>'
+'\n    <block type="lists_sort"></block>'
+'\n  </category>'
+'\n  <category name="%{BKY_CATEGORY_NAME_VARIABLES}" colour="%{BKY_VARIABLES_HUE}" custom="VARIABLE"></category>'
+'\n  <category name="%{BKY_CATEGORY_NAME_FUNCTIONS}" colour="%{BKY_PROCEDURES_HUE}" custom="PROCEDURE"></category>'
+'\n</xml>'
+'\n';

// Change le contenu de la toolbox, pour donner la possibilité d'avoir une fonction.
gloB.demoWorkspace.updateToolbox(strToolbox);
} // cfgToolBoxInit

function cfgStartBlocksInit() {
//=============================
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
+'\n  <block type="card_remove_one_card" x="29" y="36">'
+'\n    <data>1</data>'
+'\n    <value name="FRAME1">'
+'\n      <shadow type="math_number">'
+'\n        <field name="NUM">5</field>'
+'\n      </shadow>'
+'\n    </value>'
+'\n    <next>'
+'\n      <block type="card_movef1f2">'
+'\n        <data>1</data>'
+'\n        <value name="FRAME1">'
+'\n          <shadow type="math_number">'
+'\n            <field name="NUM">1</field>'
+'\n          </shadow>'
+'\n        </value>'
+'\n        <value name="FRAME2">'
+'\n          <shadow type="math_number">'
+'\n            <field name="NUM">3</field>'
+'\n          </shadow>'
+'\n        </value>'
+'\n        <next>'
+'\n          <block type="card_add_one_card">'
+'\n            <data>1</data>'
+'\n            <value name="CARD">'
+'\n              <shadow type="math_number">'
+'\n                <field name="NUM">101</field>'
+'\n              </shadow>'
+'\n            </value>'
+'\n            <value name="BACK">'
+'\n              <shadow type="math_number">'
+'\n                <field name="NUM">910</field>'
+'\n              </shadow>'
+'\n            </value>'
+'\n            <value name="FRAME2">'
+'\n              <shadow type="math_number">'
+'\n                <field name="NUM">1</field>'
+'\n              </shadow>'
+'\n            </value>'
+'\n            <next>'
+'\n              <block type="card_flip">'
+'\n                <data>1</data>'
+'\n                <value name="FRAME1">'
+'\n                  <shadow type="math_number">'
+'\n                    <field name="NUM">3</field>'
+'\n                  </shadow>'
+'\n                </value>'
+'\n                <next>'
+'\n                  <block type="card_flip">'
+'\n                    <data>1</data>'
+'\n                    <value name="FRAME1">'
+'\n                      <shadow type="math_number">'
+'\n                        <field name="NUM">1</field>'
+'\n                      </shadow>'
+'\n                    </value>'
+'\n                  </block>'
+'\n                </next>'
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
} // cfgStartBlocksInit

function cfgParamInit() {
//=======================
// Définition de certains paramètres
// c.f. bglibrary_frame_card.js
// c.f. bglibrary_abase.js
gloCanvas.marginRight = 5;  // marge entre la droite du dernier cadre et la droite du canvas
gloCanvas.marginBottom = 5 + 6; // marge entre le bas du dernier cadre et le bas du canvas   + 6 pour le numéro de la case.
gloCanvas.backgroundColor = "rgb(255,255,250)"; // Couleur de fond du canvas

gloCanvas.cHide = ""; // Si vide, accepte la superposition de cartes.
                      // Si == "c", une carte placée sur une autre fait disparaitre la carte du dessous.
                      //            donc n'accepte pas la superposition de cartes.

// Pour les pas de déplacement de la carte sur sa trajectoire        
gloCanvas.nStep = 0;
gloCanvas.nStepStop = 0;

gloCanvas.nCardsShift = 10;  // Pour décaler les cartes se trouvant sur le même tas.

// Sont défini dans : cfgFrameCardsInit
gloCanvas.strSource = "../images/Carte"; // Source des images des cartes, un nombre entre 100 et 999 suivra
gloCanvas.strExt = ".png"; // Extension des images des cartes. ".png", ".jpg" et ".gif" est habituel.

// Si on enlève les commentaires.
// Change le fond de la fenêtre d'affichage ou de code Javascript ou Python ou Lua ou d'affichage des variables
//document.getElementById('idDisplayTextArea').style.backgroundColor = 'rgb(200, 255, 255)';
//document.getElementById('idCodeJavascriptTextArea').style.backgroundColor = 'rgb(200, 255, 255)';
//document.getElementById('idCodePythonTextArea').style.backgroundColor = 'rgb(200, 255, 255)';
//document.getElementById('idCodeLuaTextArea').style.backgroundColor = 'rgb(200, 255, 255)';
//document.getElementById('idVariableSpyTextArea').style.backgroundColor = 'rgb(200, 255, 255)';
// Ne pas changer ici. document.getElementById('idFrameCardsCanvas').style.backgroundColor = 'rgb(200, 255, 255)';  // c.f. gloCanvas.backgroundColor

// function window_config(idWin, nVisible, nPosX, nPosY, nWidth, nHeight)
// idWin est une référence à la fenêtre à modifier.
// nVisible == 1 pour être visible ; == 0 pour être caché ; autre => ne change pas la visibilité 
// Positions et dimensions en pixels.
window_config('idDisplay', 1, -9999, 90, 0, 0); // Fenêtre d'affichage
window_config('idCodeBlockly', -1, -9999, -9999, 0, 0); // Fenêtre Blockly, tout reste inchangé
window_config('idCodeJavascript', -1, -9999, -9999, 0, 0); // Fenêtre Javascript, tout, reste inchangé
window_config('idCodePython', -1, -9999, -9999, 0, 0); // Fenêtre Python, tout, reste inchangé
window_config('idCodeLua', 0, -9999, -9999, 0, 0); // Fenêtre Lua, fenêtre cachée, reste inchangé
window_config('idVariableSpy', 0, -9999, -9999, 0, 0); // Fenêtre des valeurs de variables cachée, tout, reste inchangé
window_config('idFrameCards', -1, -9999, -9999, 0, 0); // Fenêtre du jeu de cartes, tout, reste inchangé
} // cfgParamInit

function cfgFramesInit() {
//========================
// Initialisation des cadres
 
// Définition de quelques cadres
// Les unités de position et de tailles sont arbitraires, car
// elles s'adaptent aux dimensions du canvas.
var nXmax = 4;
var nYmax = 4;
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
} // cfgFramesInit

function cfgCardsInit() {
//=======================
// Placement de cartes

var nn = 0;
var nCase = 0; // Numéro de la case dans laquelle la carte est placée
var nCardFace = 110; // Référence à l'image de la carte, la face visible.
var nCardBack = 900; // Dos de la carte, peut être n'impore quelle image.  900=> dos bleu ; 910=> dos rouge ; 920=>dos blanc ;
var strInstr = "";

gloCanvas.strSource = "../images/Carte";    // pour des images de cartes. 101..113=>pique ; 201..2013=>treffle ; 301..313=>coeur ; 401..413=>carreau
// gloCanvas.strSource = "../images/ASCII"; // pour des images du code ASCII. Nombre = 1000 + code ASCII
                                            // exemples :  nCadeFace = 1048 correspond à 0  ;  nCadeFace = 1065 correspond à A
gloCanvas.strExt = ".png";

gloCanvas.nbCards = 2; // Nombre de cartes placées
for (nn=1; nn<=gloCanvas.nbCards; nn++) { // Pour créer des instances de cartes
    nCardFace = 110 + nn;
    nCase = 4*nn - 3;
    
    strInstr += " <img src='" + gloCanvas.strSource + nCardFace + gloCanvas.strExt + "' alt='" + nCardFace + "' width=80 height=128"
             +  "\n id='idPos" + (100 + nn) + "'" // Les id vont de 101 à (100 + gloCanvas.nbCards)
             +  "\n data-frame='" + (nCase) + "'" // Indique la case dans laquelle la carte se trouve
             +  "\n data-depth='1'" // Indique la position de la carte dans un tas
             +  "\n data-face-src='" + gloCanvas.strSource + "'" // Indique la source du nom du fichier image de la face
             +  "\n data-face-ext='" + gloCanvas.strExt + "'"  // Indique le nom de l'extension du fichier image de la face
             +  "\n data-face='" + nCardFace + "'" // Indique la face visible de la carte
             +  "\n data-back-src='" + gloCanvas.strSource + "'" // Indique la source du nom du fichier image du dos
             +  "\n data-back-ext='" + gloCanvas.strExt + "'"  // Indique le nom de l'extension du fichier image du dos
             +  "\n data-back='" + nCardBack + "'"            // Indique le dos de la carte
             +  "\n title='" + nCardFace + "'" // Si on va sur la carte, indique le numéro correspondant à ce que l'on voit.
             +  "\n onclick='CallBlocklyFunc(\"idPos" + (100 + nCase) + "\");'" // pour appeler une fonction définie dans Blockly lorsqu'on clique sur la carte.
             +  "\n data-func=''" // Nom de la fonction Blocly à appeler, vide s'il y en a aucune.
             +  "\n data-param1=''" // Un paramètre optionnelle lors de l'appelle à la fonction Blockly
             +  "\n style='position:absolute; left:" + 70*nn + "px; top:190px;  z-index:" + 500 + ";'>\n";
    glaoFrames[nCase].nNbCards = 1; // Certains cadres ont des cartes, c.f. "data-frame"
    } // for

document.getElementById('idCards').innerHTML = strInstr;
} // cfgCardsInit

// Exécution des 4 fonctions d'initialisations.
cfgToolBoxInit();
cfgStartBlocksInit();
cfgParamInit();
cfgFramesInit();
cfgCardsInit();

// Pour placer les cartes correctement dans les cadres.
myFrameCardsResize(null);