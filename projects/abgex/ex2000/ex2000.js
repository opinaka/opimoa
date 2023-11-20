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

function window_select(idWin) {
//=============================
// Montre ou cache une fenêtre.
// idWin est l'id de la fenêtre à cacher ou à montrer
// idWin + "MenuWindow"  est la partie du menu qu'il faut remplacer par un 'v' ou par un &nbsp suivant la visibilité.
var oWin = document.getElementById(idWin);
var oMenu = document.getElementById(idWin + "MenuWindow");
        
if (oWin.style.visibility == "hidden") {
  // Rend la fenêtre visible
  oWin.style.visibility = "visible";
  oMenu.innerHTML = "v";
  
  // Pour que la fenêtre apparaîsse au-dessus des autres.
  gloB.nZIndex++;
  oWin.style.zIndex = gloB.nZIndex;
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
var oTextArea = document.getElementById(idWin + 'TextArea');
        
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

if ( (idWin == "idDisplay") || (idWin == "idCodeJavascript")
  || (idWin == "idCodePython") || (idWin == "idCodeLua") || (idWin == "idVariableSpy") ){
  // Dimensions en pixels
  //console.log(oTextArea.cols, "  ", oTextArea.rows, "  ", oTextArea.style.width, "  ", oTextArea.style.height, " ///");
  if (nHeight > 0) oTextArea.style.height = nHeight + "px";
  if (nWidth > 0)  oTextArea.style.width = nWidth + "px";
  }

if ( (idWin == "idCodeBlockly") || (idWin == "idFrameCards") ){
  // Dimensions en pixels
  if (nWidth > 0)  oWin.style.width  = nWidth + "px";
  if (nHeight > 0) oWin.style.height = nHeight + "px";
  }
} // window_config

function readConfigFile(event) {
//==============================
// c.f. : https://www.w3schools.com/jsref/dom_obj_fileupload.asp
// Charge le contenu du fichier sélectionné si la touche "OK" 
// a été pressée et exécute le code de "reader.onload".
//
// Voir http://researchhubs.com/post/computing/javascript/open-a-local-file-with-javascript.html
// Pour une autre manière de faire.
// c.f. aussi : https://developer.mozilla.org/en-US/docs/Web/API/FileReader

var file = event.target.files[0];
if (!file) return;

var reader = new FileReader();
  reader.onload = function(e) {
    // pour le code du fichier de configuration
    var strContent = e.target.result; // Texte contenu dans le fichier    
    //console.log(strContent); // Display file content

    // Efface le script contenant la source d'un fichier de configuration
    var oConfScript = document.getElementById("idScript_config_file");
    if (oConfScript) oConfScript.parentNode.removeChild(oConfScript);

    // Création d'un script contenant le fichier de configuration  
    var oHead = document.getElementsByTagName("head")[0];
    var oConfScript = document.createElement("script");
    oConfScript.setAttribute('id', 'idScript_config_file');

    // Chargement du nouveau fichier de configuration
    oConfScript.innerHTML = strContent;

    oHead.appendChild(oConfScript);
    };

  reader.readAsText(file);  
} // readConfigFile

function LoadConfigFile() {
//=========================
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
  // Efface le script contenant la source d'un fichier de configuration
  var oConfScript = document.getElementById("idScript_config_file");
  if (oConfScript) oConfScript.parentNode.removeChild(oConfScript);

  // Création d'un script contenant le fichier de configuration  
  var oHead = document.getElementsByTagName("head")[0];
  var oConfScript = document.createElement("script");
  oConfScript.setAttribute('id', 'idScript_config_file');
  
  // Chargement du nouveau fichier de configuration
  oConfScript.src = strFile;
  oHead.appendChild(oConfScript);
  }
} // ConfigLoad

function ConfigInitClear() {
//==========================
// Appelé au départ, pour initialiser et effacer ce qui a pu resté de configurations précédentes.
// Par exemple, tous les textes qui ont été écrit précédemment sont effacés.

// Efface tous les textes qui pourraient avoir été écrit.
for (var nn=0; nn<MAX_TEXT_MEMORY; nn++) glaoTexts[nn].strText = "";

// Élimine toutes les cartes
document.getElementById('idCards').innerHTML = "";
gloCanvas.nbCards = 0;

for (nn=1; nn<=glnFramesMax; nn++) {
  glaoFrames[nn].posX = 0; // Position du cadre, en unité arbitraire. Sera adapté à la largeur de la sous-fenêtre.
  glaoFrames[nn].posY = 0; // Position du cadre
  glaoFrames[nn].deltaX = 50;  // Largeur du cadre
  glaoFrames[nn].deltaY = 50;  // Hauteur du cadre
  glaoFrames[nn].fWithNumber = true; // Indique si le numéro de case est affiché ou non
  glaoFrames[nn].color = "rgb(0,0,255)"; // Couleur du cadre.  -1 => pas de couleur
  glaoFrames[nn].background_color = "rgb(230,255,255)"; // Couleur de fond.  "" => pas de couleur 
  glaoFrames[nn].width = 1; // Largeur du trait du cadre 
  glaoFrames[nn].margin = 3; // marge entre le trait du cadre et la carte qu'il contiendra 
  glaoFrames[nn].nNbCards = 0;
  }

glaoFrames[0].nNbCards = 0;
glnFramesMax = 0;
} // ConfigInitClear


function Config_Choice_Call(nChoice) {
//====================================
// Chargement du fichier de configuration défini par le nombre nChoice.
// N'est normalement pas appelé directement.
// Est utilisé dans le code généré par "Config_Choice_AddOne".
 
// Cache la fenêtre de dialogue
document.getElementById('idDialogHideWindow').style.display='none';
document.getElementById('idDialogBoxConfig').style.display='none';

// Appelle le fichier de configuration écrit par le créateur d'une configuration particulière
Config_Choice(nChoice);
} // Config_Choice_Call

// Compteur des choix de fichiers de configuration
var glnConfigCount = 0;

function Config_Choice_Init(nLeft, nTop) {
//========================================
// Initialisation de la construction du dialogue de choix de configuration
// À appeler avant d'appeler plusieurs fois "Config_Choice_AddOne", pour créer la boîte de dialogue
// nLeft, nTop permet de positionner la boîte de dialogue.  Ne fait rien si <= 0.
glnConfigCount = 0;
document.getElementById('idDialogBoxConfigChoices').innerHTML = "";

var oDialog = document.getElementById('idDialogBoxConfig');
if (nLeft > 0) oDialog.style.left = nLeft + "px";
if (nTop > 0)  oDialog.style.top  = nTop + "px";
} // Config_Choice_Init

function Config_Choice_AddOne(strButton, strText) {
//=================================================
// Ajoute un choix dans la boîte de dialogue de choix de configuration

glnConfigCount += 1; // Choix suivant

var strInstr =
  "\n<div style='border:solid black 1px;'>"
+ "\n  <button type='button' style='font-size:80%; display:inline-block;'"
+ "\n          onclick='Config_Choice_Call(" + glnConfigCount + ");'>"
+ "\n    " + strButton
+ "\n  </button>"
+ "\n  <div style='display:inline-block; vertical-align:middle;'>"
+ "\n    " + strText
+ "\n  </div>"
+ "\n</div>";

document.getElementById('idDialogBoxConfigChoices').innerHTML += strInstr;
} // Config_Choice_AddOne

function Config_Choice_Start() {
//==============================
// Ouvre la boîte de dialogue de choix de fichiers de configuration, qui vient d'être créée.
// À appelé une fois que la boîte de dialogue a été créée avec les appels successifs de "Config_Choice_AddOne"
gloB.nZIndex++;
document.getElementById('idDialogBoxConfig').style.zIndex = gloB.nZIndex+1;
document.getElementById('idDialogHideWindow').style.zIndex = gloB.nZIndex;
document.getElementById('idDialogHideWindow').style.display='block';
document.getElementById("idDialogBoxConfig").style.display = "block";
} // Config_Choice_Start

// ############################################################################
// ############################################################################

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
             +  "\n data-click-count='0'" // Compte le nombre de clicks sur la carte.
             +  "\n data-func=''" // Nom de la fonction Blocly à appeler, vide s'il y en a aucune.
             +  "\n data-param1=' '" // Un paramètre optionnelle lors de l'appelle à la fonction Blockly
             +  "\n style='position:absolute; left:" + 70*nn + "px; top:190px;  z-index:" + 500 + ";'>\n";
    glaoFrames[2*nn-1].nNbCards = 1; // Certains cadres ont des cartes, c.f. "data-frame"
    } // for

document.getElementById('idCards').innerHTML = strInstr; 
} // myFrameCardsInit
