// Adjonction de fonctionnalités à Blockly
// #######################################

/*
function myUpdateFunction(event) {
//================================
// Met à jour le code automatiquement.
var code = Blockly.JavaScript.workspaceToCode(gloB.demoWorkspace);
window.document.nameFormJavascriptAuto.nameTextareaJavascriptAuto.value = code;
} // myUpdateFunction

// Pour que la mise à jour soit affichée automatiquement
// c.f. https://developers.google.com/blockly/guides/configure/web/code-generators
gloB.funcAfterRunBlockly = function() {
//"""""""""""""""""""""""""""""""""""""
  gloB.demoWorkspace.addChangeListener(myUpdateFunction);
  //myUpdateFunction();
  };
*/

function showCodeJavascript() {
//=============================
// Generate JavaScript code and display it.

// Mémorise si les blocs sont illuminé à l'exécution ou non.
var strMemorise = Blockly.JavaScript.STATEMENT_PREFIX;
Blockly.JavaScript.STATEMENT_PREFIX = ''; // Permet d'enlever la commande d'illumination des blocs.

Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
var code = Blockly.JavaScript.workspaceToCode(gloB.demoWorkspace); 

window.document.idCodeJavascriptNameForm.idCodeJavascriptNameTextArea.value += code;
window.document.idCodeJavascriptNameForm.idCodeJavascriptNameTextArea.scrollTop = 100000;  // pour rester en fin du texte.

if (strMemorise ) {
  Blockly.JavaScript.STATEMENT_PREFIX = 'bgHighlightBlock(%1);\n'; // Permet dajouter la commande d'illumination des blocs.
  }
} // showCodeJavascript

function runCodeJavascript(strCode) {
//===================================
// Exécute le code javascript, rapidement.
// Le code se trouve dans le string : strCode.
try {
  eval(strCode);
  }
catch (e) {
  // Il y a eu une erreur dans le code javascript, l'affiche. 
  alert(e);
  }
} // runCodeJavascript

function showCodePython() {
//=========================
// Generate python code and display it.
Blockly.Python.INFINITE_LOOP_TRAP = null;
var code = Blockly.Python.workspaceToCode(gloB.demoWorkspace); 

window.document.idCodePythonNameForm.idCodePythonNameTextArea.value += code;
window.document.idCodePythonNameForm.idCodePythonNameTextArea.scrollTop = 100000;  // pour rester en fin du texte.
} // showCodePython

function showCodeLua() {
//======================
// Generate lua code and display it.
Blockly.Lua.INFINITE_LOOP_TRAP = null;
var code = Blockly.Lua.workspaceToCode(gloB.demoWorkspace); 

window.document.idCodeLuaNameForm.idCodeLuaNameTextArea.value += code;
window.document.idCodeLuaNameForm.idCodeLuaNameTextArea.scrollTop = 100000;  // pour rester en fin du texte.
} // showCodeLua

function window_select(idWin, idMenu) {
//=====================================
// Montre ou cache une fenêtre.
// idWin est l'id de la fenêtre à cacher ou à montrer
// idMenu est la partie du menu qu'il faut remplacer par un 'v' ou par un &nbsp suivant la visibilité.
var oWin = document.getElementById(idWin);
var oMenu = document.getElementById(idMenu);
        
if (oWin.style.visibility == "hidden") {
  // Rend la fenêtre visible
  oWin.style.visibility = "visible";
  oMenu.innerHTML = "v";
  }
else {
  // Rend la fenêtre invisible
  oWin.style.visibility = "hidden";
  oMenu.innerHTML = "&nbsp;";
  }
} // window_select

function window_config(idWin, nVisible, nPosX, nPosY, nWidth, nHeight) {
//======================================================================
// Paramétrage des fenêtres.
// idWin est une référence à la fenêtre que l'on désire modifier.
// nVisible == 1 pour être visible ; == 0 pour être caché ; autre => ne change pas la visibilité 
// nPosX <= -9999 => ignoré, sinon définit la position X en pixels de la fenêtre.
// nPosY <= -9999 => ignoré, sinon définit la position Y en pixels de la fenêtre.
var oWin = document.getElementById(idWin);
var oMenu = document.getElementById(idWin + 'MenuWindow');
var oTextArea = document.getElementById(idWin + 'NameTextArea');
        
if (nVisible == 1) {
  // Rend la fenêtre visible
  oWin.style.visibility = "visible";
  oMenu.innerHTML = "v";
  }
if (nVisible == 0) {
  // Rend la fenêtre invisible
  oWin.style.visibility = "hidden";
  oMenu.innerHTML = "&nbsp;";
  }
// else, on laisse inchangé la visibilité de la fenêtre.

if (nPosX > -9999) {
  // Position horizontale de la fenêtre
  oWin.style.left = nPosX + 'px';
  }

if (nPosY > -9999) {
  // Position horizontale de la fenêtre
  oWin.style.top = nPosY + 'px';
  }

} // window_config

function readConfigFile(event) {
//==============================
// c.f. : https://www.w3schools.com/jsref/dom_obj_fileupload.asp
// Charge le contenu du fichier sélectionné si la touche "OK" 
// a été pressée et exécute le code de "reader.onload".
var file = event.target.files[0];
if (!file) return;

var oHead = document.getElementsByTagName("head")[0];
var oConfScript = document.createElement("script");
oConfScript.src = file.name;
oHead.appendChild(oConfScript);
} // readConfigFile

function LoadConfigFile() {
//===================
// Lit un fichier de configuration et génère un événement qui va exécuter la fonction "readConfigFile(event)"
var element = document.createElement('input');
element.setAttribute('type', 'file');
element.setAttribute('is', 'input3');
element.setAttribute('onchange', 'readConfigFile(event);');

//element.style.display = 'none';
document.body.appendChild(element);
element.click();
document.body.removeChild(element);
} // LoadConfigFile

function ConfigLoad(strFile) {
//============================
// Charge une configuration de ToolBox, StartBox, Cardes, Cartes et paramètres
// strFile est le fichier de configuration à charger.
// S'il est vide, une boîte de dialogue s'ouvre,
// pour demander le nom du fichier de configuration à charger.

if (strFile == '') {
  // Ouverture d'une boîte de dialogue demandant le nom du fichier de configuration à charger.
  strFile = LoadConfigFile();
  }
else {
  var oHead = document.getElementsByTagName("head")[0];
  var oConfScript = document.createElement("script");
  oConfScript.src = strFile;
  oHead.appendChild(oConfScript);
  }
} // ConfigLoad

function myFramesInit() {
//=======================
// Initialisation des cadres
 
// Définition de quelques cadres
// Les unités de position et de tailles sont arbitraires, car
// elles s'adaptent aux dimensions du canvas.
var nXmax = 3;
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

// Pour des tests
//glaoFrames[12].deltaX = 43;
//glaoFrames[12].deltaY = 67;
//glaoFrames[4].fWithNumber = false;

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
} // myFramesInit

function myFrameCardsInit() {
//===========================
// Placement de cartes
myFramesInit(); // On commence par initialiser les cadres, leurs positions et tailles.

var nn = 0;
var nCase = 0; // Numéro de la case dans laquelle la carte est placée
var nCarte = 300; // Référence à l'image de la carte
var strInstr = "";

gloCanvas.nbCards = 6; // Nombre de cartes
for (nn=1; nn<=gloCanvas.nbCards; nn++) { // Pour créer des instances de cartes
    nCarte++;
    nCase = nn;
    strInstr += " <img src='" + gloCanvas.strSource + nCarte + gloCanvas.strExt + "' alt='" + nCarte + "' width=80 height=128"
             +  "\n id='idPos" + (100 + nn) + "'" // Les id vont de 101 à (100 + gloCanvas.nbCards)
             +  "\n data-frame='" + (2*nn-1) + "'" // Indique la case dans laquelle la carte se trouve
             +  "\n data-depth='1'" // Indique la position de la carte dans un tas
             +  "\n data-face-src='" + gloCanvas.strSource + "'" // Indique la source du nom du fichier image de la face
             +  "\n data-face-ext='" + gloCanvas.strExt + "'"  // Indique le nom de l'extension du fichier image de la face
             +  "\n data-face='" + nCarte + "'" // Indique la face visible de la carte
             +  "\n data-back-src='" + gloCanvas.strSource + "'" // Indique la source du nom du fichier image du dos
             +  "\n data-back-ext='" + gloCanvas.strExt + "'"  // Indique le nom de l'extension du fichier image du dos
             +  "\n data-back='900'"            // Indique le dos de la carte
             +  "\n title='" + nCarte + "'" // Si on va sur la carte, indique le numéro correspondant à ce que l'on voit.
             +  "\n onclick='CallBlocklyFunc(\"idPos" + (100 + nn) + "\");'" // pour appeler une fonction définie dans Blockly lorsqu'on clique sur la carte.
             +  "\n data-func-exec=''" // Pour indiquer si un événement a demandé l'exécution de la fonction associée à la carte
             +  "\n data-func=''" // Nom de la fonction Blocly à appeler, vide s'il y en a aucune.
             +  "\n data-param1=' '" // Un paramètre optionnelle lors de l'appelle à la fonction Blockly
             +  "\n style='position:absolute; left:" + 70*nn + "px; top:190px;  z-index:" + 500 + ";'>\n";
    glaoFrames[2*nn-1].nNbCards = 1; // Certains cadres ont des cartes, c.f. "data-frame"
    } // for

document.getElementById('idCards').innerHTML = strInstr; 
} // myFrameCardsInit
