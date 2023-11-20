// cfg2000fr_vide_v1.js
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
Il n'est pas nécessaire de tout comprendre pour prendre un fichier de configuration existant, 
faire quelques modification et obtenir ainsi un nouveau fichier de fonfiguration.

Voir le fichier : bglibrary_frame_card.js  pour des paramètres.  En particulier :
° gloCanvas, qui est de type : OneCanvas()
° glaoFrames, qui est un tableau d'éléments de type : OneFrame()
° Le nombre de cases (cadres, Frames) va de 0 à glnFramesMax
  La case n° 0 est en dehors de la fenêtre. Elle sert à faire disparaître ou apparaître des cartes.
° glaoTexts, qui est un tableau d'éléments de type : OneTextMemory()
  Ses indices vont de 0 à 9 (MAX_TEXT_MEMORY-1).
  Il sert à afficher du texte dans le jeu de cartes.
 */
//-------------------------------------------------
/*
Exemple de configuration de base.
° Une ToolBox avec tous les blocs de programme disponibles, sauf ceux des cartes.
° Un exemple de StartBlocks, les blocs présents au départ.  Aucun bloc de programme au départ.
° Aucune carte n'est présente, les cartes ne sont pas manipulables.
° Présente le proglème de Syracuse
° Définition de paramètres.
° Définition des fenêtres visibles et cachées, de leurs tailles et positions.
 */
// ########################################################################################

function confToolBoxInit() {
//==========================
// Définition de la toolbox utilisée.
// La moindre erreur fait que la nouvelle toolbox est ignorée.
// Tous les blocs possibles sont disponibles ici.
// Pour un autre fichier de configuration, on peut tout copier,
// puis effacer les blocs non désirés.

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
+'\n    <block type="text_parse_to_number">'
+'\n      <value name="STR">'
+'\n        <shadow type="text">'
+'\n          <field name="TEXT">123</field>'
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

//return; // Ne fait rien, pour des tests.

gloB.demoWorkspace.clear();  // Enlève tous les blocs, c.f. : https://developers.google.com/blockly/reference/js/Blockly.WorkspaceSvg#cleanUp

/*
var strText = 
'<xml xmlns="http://www.w3.org/1999/xhtml">'
+'\n</xml>'
+'\n';
*/
//var xml = Blockly.Xml.textToDom(strText);
//Blockly.Xml.domToWorkspace(xml, gloB.demoWorkspace);
} // confStartBlocksInit

function confParamInit() {
//========================
// Définition de certains paramètres

// Si on enlève les commentaires.
// Change le fond de la fenêtre d'affichage ou de code Javascript ou Python ou Lua ou d'affichage des variables
//document.getElementById('idDisplayTextArea').style.backgroundColor = 'rgb(200, 255, 255)';
//document.getElementById('idCodeJavascriptTextArea').style.backgroundColor = 'rgb(200, 255, 255)';
//document.getElementById('idCodePythonTextArea').style.backgroundColor = 'rgb(200, 255, 255)';
//document.getElementById('idCodeLuaTextArea').style.backgroundColor = 'rgb(200, 255, 255)';
//document.getElementById('idVariableSpyTextArea').style.backgroundColor = 'rgb(200, 255, 255)';
// Ne pas changer ici. document.getElementById('idFrameCardsCanvas').style.backgroundColor = 'rgb(200, 255, 255)';  // c.f. gloCanvas.backgroundColor

// Exemple de changement de position et dimension de fenêtres
// function window_config(idWin, nVisible, nPosX, nPosY, nWidth, nHeight)  définit dans : ex2000.js
// idWin est une référence à la fenêtre à modifier.
// nVisible == 1 pour être visible ; == 0 pour être caché ; autre => ne change pas la visibilité 
// Positions et dimensions en pixels.  -9999 => reste inchangé.
// dimension <= 0 => reste inchangé
window_config('idDisplay', 1, -9999, -9999, 0, 0); // Fenêtre d'affichage
window_config('idCodeBlockly', -1, -9999, -9999, 0, 0); // Fenêtre Blockly, tout reste inchangé
window_config('idCodeJavascript', -1, -9999, -9999, 0, 0); // Fenêtre Javascript, tout, reste inchangé
window_config('idCodePython', -1, -9999, -9999, 0, 0); // Fenêtre Python
window_config('idCodeLua', 1, -9999, -9999, 0, 0); // Fenêtre Lua, fenêtre cachée, reste inchangé
window_config('idVariableSpy', 1, -9999, -9999, 0, 0); // Fenêtre des valeurs de variables cachée, 
window_config('idFrameCards', 0, 760, 80, 400, 600); // Fenêtre du jeu de cartes, cachée

} // confParamInit

function confFramesInit() {
//=========================
// Initialisation des cadres
// Ne fait rien.
} // confFramesInit

function confCardsInit() {
//========================
// Ne place aucune carte
} // confCardsInit

function confMessageBegin() {
//===========================
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
document.getElementById('HTML_MAIN_TITLE2').innerHTML =
  "&nbsp; <b>Vide au départ</b>. &nbsp;<br>"
+ "<br>"  // <br> est une balise pour sauter une ligne.  Toutes la synthaxe HTML est disponible. 
+ "&nbsp; À vous d'écrire le code à partir de zéro. &nbsp;<br>"
+ "&nbsp; <br>"
;

// Changement du titre du message
document.getElementById('HTML_MESSAGE').innerHTML =
  "&nbsp; Message à propos de cette configuration. &nbsp;"
;

// Change le contenu de la fenêtre "À propos..."
document.getElementById('HTML_ABOUT2').innerHTML =
  "&nbsp; Configuration créée par Bernard Gisin &nbsp;<br>"
+ "&nbsp; le 4 janvier 2020."
+ "<br><br>"
;

// Changement du titre de la boîte de dialogue "À propos de..."
document.getElementById('HTML_ABOUT1').innerHTML =
  "&nbsp; À propos de cette configuration. &nbsp;"
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
