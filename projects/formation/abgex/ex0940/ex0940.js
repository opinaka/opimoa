// Adjonction de fonctionnalités à Blockly
// #######################################

gloB.glIdImage = "";    // id de l'image à déplacer
var glnStopPosX = 0; // Position d'arrêt lorsque la coordonnée X est à cette position. Centre de l'image
var glnStopPosY = 0; // Position d'arrêt lorsque la coordonnée Y est à cette position
var glnDeltaX = 0; // Différence de coordonnée X entre le départ à l'arrivée
var glnDeltaY = 0; // Différence de coordonnée X entre le départ à l'arrivée

var glnCanvasWidth = 0; // Largeur du canvas

// Mémorise toute l'image, une fois pour toute.
var glimgData;
// Couleur du pixel se trouvant en position (nX, nY) d'une image de 380 pixels de largeur :
// glimData.data[4*(nX + glnCanvasWidth*nY)  ]  ->  Rouge
// glimData.data[4*(nX + glnCanvasWidth*nY)+1]  ->  Vert
// glimData.data[4*(nX + glnCanvasWidth*nY)+2]  ->  Bleu
// glimData.data[4*(nX + glnCanvasWidth*nY)+3]  ->  Opacité  (0 = transparent, 255 = opaque )

// Adjonction d'une variable blobale
gloB.nAngle = 0; // Angle de rotation de l'image qui se déplace
gloB.nAngleStop = 0; // Angle de rotation après rotation

function CopyImage() {
//====================
// Copie l'image dans le Canvas.
var c = document.getElementById("idCanvas");
var ctx = c.getContext("2d");
var img = document.getElementById("idLabyrinthe");
ctx.drawImage(img, 0, 0); // duplifie l'image

// Mémorise toute l'image dans un tableau globale.
glimgData = ctx.getImageData(0, 0, c.width, c.height);

glnCanvasWidth = c.width; // Largeur du canvas
} // CopyImage

// ###########################################################################

function Stop_image() {
//=====================
// Arrête le comteur et indique qu'il est arrêté en mettant gloB.nTimerID1 à 0.
if (gloB.nTimerID1 !== 0) {
  clearInterval(gloB.nTimerID1);
  gloB.nTimerID1 = 0;
  }
} // Stop_image

function GetColor(idImage) {
//==========================
// Lit la couleur se trouvant sous la boule bleu, sous son milieu
// Positionne la boule bleu
var imgBouleBleueID = document.getElementById(idImage);

var nPosX = parseInt(imgBouleBleueID.style.left) + parseInt(imgBouleBleueID.style.width)  / 2;
var nPosY = parseInt(imgBouleBleueID.style.top)  + parseInt(imgBouleBleueID.style.height) / 2;    

// Quantité de rouge du pixel de l'image, sous la boule bleue
var nRedPix = glimgData.data[4*(nPosX + glnCanvasWidth*nPosY)];
var nGrePix = glimgData.data[4*(nPosX + glnCanvasWidth*nPosY)+1];
var nBluPix = glimgData.data[4*(nPosX + glnCanvasWidth*nPosY)+2];

//Display(nRedPix + " ; " + nGrePix + " ; " + nBluPix + "\n");
return( (nRedPix*1000 + nGrePix)*1000 + nBluPix);
} // GetColor

function Deplace_image() {
//========================
// Déplace l'image "gloB.glIdImage" à la position : (glnStopPosX , glnStopPosY)
// "px" signifie l'unité = le pixel

// Prend la position du centre de la boule "gloB.glIdImage"
var imgBouleBleueID = document.getElementById(gloB.glIdImage);
var nPosX = parseInt(imgBouleBleueID.style.left) + parseInt(imgBouleBleueID.style.width)  / 2;
var nPosY = parseInt(imgBouleBleueID.style.top)  + parseInt(imgBouleBleueID.style.height) / 2;
var nDX = Math.round(glnStopPosX - nPosX);
var nDY = Math.round(glnStopPosY - nPosY);

if ( (nDX == 0) && (nDY == 0) ) {
  Stop_image(); // La boule bleue est arribée à destination
  return;
  }

if ((nDX == 0) || ( Math.abs(nDX*glnDeltaY) < Math.abs(nDY*glnDeltaX) ) ) {
  // Déplacement vertical
  if (glnStopPosY > nPosY) {
    // Descent de 1 pixel
    nPosY += 1;
    }
  else if (glnStopPosY < nPosY) {
    // Monte de 1 pixel
    nPosY -= 1;
    }  
  }
else {
  // Déplacement horizontal
  if (glnStopPosX > nPosX) {
    // À droite de 1 pixel
    nPosX += 1;
    }
  else if (glnStopPosX < nPosX) {
    // À gauche de 1 pixel
    nPosX -= 1;
    }  
  else Stop_image(); // La boule bleue est arribée à destination.  On ne devrait jamais arriver ici.
  }

imgBouleBleueID.style.left = (nPosX - parseInt(imgBouleBleueID.style.width)  / 2) + "px";
imgBouleBleueID.style.top  = (nPosY - parseInt(imgBouleBleueID.style.height) / 2) + "px";
} // Deplace_image

function GotoXY(idImage, nStopPosX, nStopPosY, delayMS) {
//========================================================
// Déplace la boule bleu en la position : (nStopPosX, nStopPosY),
// avec une attente de : delayMS [ms] entre chaque déplacement de un pixel.
// idImage est l' id  de l'image à déplacer.
// Elle est indiquée dans le champ  <data>  du champ  <block type="logo_gotoxy">  de la toolbox
gloB.glIdImage = idImage; // Mémorise de façon globale l'id de l'image à déplacer.
var imgBouleBleueID = document.getElementById(idImage);
glnDeltaX = parseInt(nStopPosX) - parseInt(imgBouleBleueID.style.left) - parseInt(imgBouleBleueID.style.width)  / 2;
glnDeltaY = parseInt(nStopPosY) - parseInt(imgBouleBleueID.style.top)  - parseInt(imgBouleBleueID.style.height) / 2;

glnStopPosX = nStopPosX;
glnStopPosY = nStopPosY;

if (gloB.nInterpreterSpeed <= 2) {
  if (gloB.nTimerID1 == 0) 
    gloB.nTimerID1 = setInterval('Deplace_image()', delayMS); // delayMS = temps en [ms] entre deux déplacement de 1 pixel
  }
else { // exécution rapide, sans animation.
  imgBouleBleueID.style.left = (glnStopPosX - parseInt(imgBouleBleueID.style.width)  / 2) + "px";
  imgBouleBleueID.style.top  = (glnStopPosY - parseInt(imgBouleBleueID.style.height) / 2) + "px";
  }
} // GotoXY

function GetPosXY(idImage, xory) {
//================================
// Retourne la coordonnée X ou Y du centre de la position de l'image ayant l'id : "idImage"
var imgBouleBleueID = document.getElementById(idImage);

if ((xory == 'x') || (xory == 'X'))  return (parseInt(imgBouleBleueID.style.left) + parseInt(imgBouleBleueID.style.width)  / 2);
if ((xory == 'y') || (xory == 'Y'))  return (parseInt(imgBouleBleueID.style.top)  + parseInt(imgBouleBleueID.style.height) / 2);
return 0; // Pas normal, 'xory' n'a pas la bonne valeur.
} // GetPosXY

function RotateOnce() {
//=====================
// Tourne l'image d'un angle de nDeltaAngle en degrés.
var imgBouleBleueID = document.getElementById(gloB.glIdImage);

if (gloB.nAngleStop >  gloB.nAngle) gloB.nAngle += 1;
else                                gloB.nAngle -= 1;
imgBouleBleueID.style.transform = "rotate(" + gloB.nAngle + "deg)";
// c.f. https://www.w3schools.com/cssref/css3_pr_transform.asp

if (gloB.nAngle == gloB.nAngleStop) Stop_image();
} // RotateOnce

function Set_Direction(idImage, nAngle, delayMS) {
//================================================
// Définit la direction de déplacement de l'image
gloB.glIdImage = idImage; // Mémorise de façon globale l'id de l'image à déplacer.
var imgBouleBleueID = document.getElementById(idImage);

gloB.nAngleStop = Math.round(nAngle);

if (gloB.nInterpreterSpeed <= 2) {
  if (gloB.nTimerID1 == 0) 
    gloB.nTimerID1 = setInterval('RotateOnce()', delayMS); // delayMS = temps en [ms] entre deux rotations de 1 degré
  }
else { // exécution rapide, sans animation.
  imgBouleBleueID.style.transform = "rotate(" + gloB.nAngleStop + "deg)";
  // c.f. https://www.w3schools.com/cssref/css3_pr_transform.asp
  gloB.nAngle = gloB.nAngleStop;
  }
} // Set_Direction

function Rotate(idImage, nDeltaAngle, delayMS) {
//==============================================
// Tourne l'image d'un angle de nDeltaAngle en degrés.
Set_Direction(idImage, gloB.nAngleStop + nDeltaAngle, delayMS);
} // Rotate

function Forward(idImage, nPixels, delayMS) {
//===========================================
// Avance de nPixels dans la direction indiquée par gloB.nAngle.
gloB.glIdImage = idImage; // Mémorise de façon globale l'id de l'image à déplacer.
var imgBouleBleueID = document.getElementById(idImage);

var nPosX = parseInt(imgBouleBleueID.style.left) + parseInt(imgBouleBleueID.style.width)  / 2;
var nPosY = parseInt(imgBouleBleueID.style.top)  + parseInt(imgBouleBleueID.style.height) / 2;
var nStopPosX = Math.round(nPosX + nPixels*Math.cos(gloB.nAngle * Math.PI / 180));
var nStopPosY = Math.round(nPosY + nPixels*Math.sin(gloB.nAngle * Math.PI / 180));

GotoXY(idImage, nStopPosX, nStopPosY, delayMS);
} // Forward

function initApiLocal(interpreter, scope) {
//=========================================
  // Add an API function for highlighting blocks, suite à 'initApi' de bglibrary.js
var wrapper;

wrapper = function(idImage, nStopPosX, nStopPosY, delayMS) { return GotoXY(idImage, nStopPosX, nStopPosY, delayMS); };
interpreter.setProperty(scope, 'GotoXY', interpreter.createNativeFunction(wrapper));

wrapper = function(idImage, nPixels, delayMS) { return Forward(idImage, nPixels, delayMS); };
interpreter.setProperty(scope, 'Forward', interpreter.createNativeFunction(wrapper));

wrapper = function(idImage, nDegres, delayMS) { return Rotate(idImage, nDegres, delayMS); };
interpreter.setProperty(scope, 'Rotate', interpreter.createNativeFunction(wrapper));

wrapper = function(idImage, nDegres, delayMS) { return Set_Direction(idImage, nDegres, delayMS); };
interpreter.setProperty(scope, 'Set_Direction', interpreter.createNativeFunction(wrapper));

wrapper = function(idImage) { return GetColor(idImage); };
interpreter.setProperty(scope, 'GetColor', interpreter.createNativeFunction(wrapper));

wrapper = function(idImage, xory) { return GetPosXY(idImage, xory); };
interpreter.setProperty(scope, 'GetPosXY', interpreter.createNativeFunction(wrapper));
} // initApiLocal

gloB.funcAfterInitApi = initApiLocal;

// ###########################################################################

Blockly.Blocks['logo_gotoxy'] = {
//================================
init: function() {
  this.jsonInit({
    "message0": bgBlockly.Msg['LOGO_GOTOXY_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "POSX",
        "check":"Number"
      }
      ,{
        "type": "input_value",
        "name": "POSY",
        "check":"Number"
      }
    ],
    "data": "idBouleBleue, 5", // Valeurs par défaut.
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour":  bgBlockly.Msg['LOGOS_HUE'],
    "tooltip": bgBlockly.Msg['LOGO_GOTOXY_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['LOGO_GOTOXY_HELPURL']
    });
  }
};
Blockly.JavaScript['logo_gotoxy'] = function(block) {
//===================================================
// Déplacement de la boule bleue à la position désirée.
var nPosX = Blockly.JavaScript.valueToCode(block, 'POSX',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
var nPosY = Blockly.JavaScript.valueToCode(block, 'POSY',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

var strId_image = "idBouleBleue"; // Valeur par défaut
var nTimeDelta  = 5; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  var aData = strData.split(","); // Récupère les différents paramètres
  strId_image = aData[0];
  nTimeDelta  = aData[1];
  } 

return "GotoXY('" + strId_image + "', " + nPosX + ", " + nPosY + ", " + nTimeDelta + ");\n";
// Le dernier paramètre est le temps d'attente entre chaque déplacement de 1 pixel
};

Blockly.Blocks['logo_forward'] = {
//================================
init: function() {
  this.jsonInit({
    "message0": bgBlockly.Msg['LOGO_FORWARD_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "PIXELS",
        "check":"Number"
      }
    ],
    "data": "idBouleBleue, 5", // Valeurs par défaut.
    "previousStatement": null,
    "nextStatement": null,
    "colour":  bgBlockly.Msg['LOGOS_HUE'],
    "tooltip": bgBlockly.Msg['LOGO_FORWARD_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['LOGO_FORWARD_HELPURL']
    });
  }
};
Blockly.JavaScript['logo_forward'] = function(block) {
//===================================================
// Déplacement de la boule bleue à la position désirée.
var nPixels = Blockly.JavaScript.valueToCode(block, 'PIXELS',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

var strId_image = "idBouleBleue"; // Valeur par défaut
var nTimeDelta  = 5; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  var aData = strData.split(","); // Récupère les différents paramètres
  strId_image = aData[0];
  nTimeDelta  = aData[1];
  } 

return "Forward('" + strId_image + "', " + nPixels + ", " + nTimeDelta + ");\n";
// Le dernier paramètre est le temps d'attente entre chaque déplacement de 1 pixel
};

Blockly.Blocks['logo_backward'] = {
//================================
init: function() {
  this.jsonInit({
    "message0": bgBlockly.Msg['LOGO_BACKWARD_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "PIXELS",
        "check":"Number"
      }
    ],
    "data": "idBouleBleue, 5", // Valeurs par défaut.
    //"inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour":  bgBlockly.Msg['LOGOS_HUE'],
    "tooltip": bgBlockly.Msg['LOGO_BACKWARD_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['LOGO_BACKWARD_HELPURL']
    });
  }
};
Blockly.JavaScript['logo_backward'] = function(block) {
//===================================================
// Déplacement de la boule bleue à la position désirée.
var nPixels = Blockly.JavaScript.valueToCode(block, 'PIXELS',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

var strId_image = "idBouleBleue"; // Valeur par défaut
var nTimeDelta  = 5; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  var aData = strData.split(","); // Récupère les différents paramètres
  strId_image = aData[0];
  nTimeDelta  = aData[1];
  } 

return "Forward('" + strId_image + "', -(" + nPixels + "), " + nTimeDelta + ");\n";
// Le dernier paramètre est le temps d'attente entre chaque déplacement de 1 pixel
};

Blockly.Blocks['logo_forward_backward'] = {
//=========================================
init: function() {
  this.jsonInit({
    "type": "logo_forward_backward",
    "message0": bgBlockly.Msg['LOGO_FORWARD_BACKWARD_TITLE'],
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DIRECTION",
        "options": [
          [
            bgBlockly.Msg['LOGO_FORWARD_BACKWARD_DIRECTION_FORWARD'],
            "FORWARD"
          ],
          [
            bgBlockly.Msg['LOGO_FORWARD_BACKWARD_DIRECTION_BACKWARD'],
            "BACKWARD"
          ]
        ]
      },
      {        
        "type": "input_value",
        "name": "PIXELS",
        "check":"Number"
      }
    ],
    "data": "idBouleBleue, 5", // Valeurs par défaut.
    "previousStatement": null,
    "nextStatement": null,
    "colour":  bgBlockly.Msg['LOGOS_HUE'],
    "tooltip": bgBlockly.Msg['LOGO_FORWARD_BACKWARD_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['LOGO_FORWARD_BACKWARD_HELPURL']
    });
  }
};
Blockly.JavaScript['logo_forward_backward'] = function(block) {
//===================================================
// Déplacement de la boule bleue à la position désirée.
var direction = block.getFieldValue('DIRECTION');
var nPixels = Blockly.JavaScript.valueToCode(block, 'PIXELS',
    Blockly.JavaScript.ORDER_ATOMIC) || '\'\'';

var strId_image = "idBouleBleue"; // Valeur par défaut
var nTimeDelta  = 5; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  var aData = strData.split(","); // Récupère les différents paramètres
  strId_image = aData[0];
  nTimeDelta  = aData[1];
  } 

if (direction == "FORWARD") 
  return "Forward('" + strId_image + "', " + nPixels + ", " + nTimeDelta + ");\n";
else
  return "Forward('" + strId_image + "', -(" + nPixels + "), " + nTimeDelta + ");\n";
};

Blockly.Blocks['logo_left'] = {
//=============================
init: function() {
  this.jsonInit({
    "message0": bgBlockly.Msg['LOGO_LEFT_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "ANGLE",
        "check":"Number"
      }
    ],
    "data": "idBouleBleue, 5", // Valeurs par défaut.
    "previousStatement": null,
    "nextStatement": null,
    "colour":  bgBlockly.Msg['LOGOS_HUE'],
    "tooltip": bgBlockly.Msg['LOGO_LEFT_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['LOGO_LEFT_HELPURL']
    });
  }
};
Blockly.JavaScript['logo_left'] = function(block) {
//=================================================
// Rotation à gauche de la boule bleue de l'angle désirée.
var nAngle = Blockly.JavaScript.valueToCode(block, 'ANGLE',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

var strId_image = "idBouleBleue"; // Valeur par défaut
var nTimeDelta  = 5; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  var aData = strData.split(","); // Récupère les différents paramètres
  strId_image = aData[0];
  nTimeDelta  = aData[1];
  } 

return "Rotate('" + strId_image + "', -(" + nAngle + "), " + nTimeDelta + ");\n";
// Le dernier paramètre est le temps d'attente entre chaque rotation de 1 degré
};

Blockly.Blocks['logo_right'] = {
//=============================
init: function() {
  this.jsonInit({
    "message0": bgBlockly.Msg['LOGO_RIGHT_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "ANGLE",
        "check":"Number"
      }
    ],
    "data": "idBouleBleue, 5", // Valeurs par défaut.
    "previousStatement": null,
    "nextStatement": null,
    "colour":  bgBlockly.Msg['LOGOS_HUE'],
    "tooltip": bgBlockly.Msg['LOGO_RIGHT_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['LOGO_RIGHT_HELPURL']
    });
  }
};
Blockly.JavaScript['logo_right'] = function(block) {
//==================================================
// Rotation à droite de la boule bleue de l'angle désirée.
var nAngle = Blockly.JavaScript.valueToCode(block, 'ANGLE',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

var strId_image = "idBouleBleue"; // Valeur par défaut
var nTimeDelta  = 5; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  var aData = strData.split(","); // Récupère les différents paramètres
  strId_image = aData[0];
  nTimeDelta  = aData[1];
  } 

return "Rotate('" + strId_image + "', " + nAngle + ", " + nTimeDelta + ");\n";
// Le dernier paramètre est le temps d'attente entre chaque rotation de 1 degré
};

Blockly.Blocks['logo_left_right'] = {
//===================================
init: function() {
  this.jsonInit({
    "type": "logo_left_right",
    "message0": bgBlockly.Msg['LOGO_LEFT_RIGHT_TITLE'],
    "args0": [
        {
        "type": "field_dropdown",
        "name": "SENS",
        "options": [
        [
          bgBlockly.Msg['LOGO_LEFT_RIGHT_SENS_LEFT'],
          "LEFT"
        ],
        [
          bgBlockly.Msg['LOGO_LEFT_RIGHT_SENS_RIGHT'],
          "RIGHT"
        ]
      ]
      },
      {
        "type": "input_value",
        "name": "ANGLE",
        "check": "Number"
      }
      ],
    "data": "idBouleBleue, 5", // Valeurs par défaut.
    "previousStatement": null,
    "nextStatement": null,
    "colour":  bgBlockly.Msg['LOGOS_HUE'],
    "tooltip": bgBlockly.Msg['LOGO_LEFT_RIGHT_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['LOGO_LEFT_RIGHT_HELPURL']
    });
  }
};
Blockly.JavaScript['logo_left_right'] = function(block) {
//==================================================
// Rotation à droite de la boule bleue de l'angle désirée.
var sens = block.getFieldValue('SENS');
var nAngle = Blockly.JavaScript.valueToCode(block, 'ANGLE',
    Blockly.JavaScript.ORDER_ATOMIC) || '\'\'';

var strId_image = "idBouleBleue"; // Valeur par défaut
var nTimeDelta  = 5; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  var aData = strData.split(","); // Récupère les différents paramètres
  strId_image = aData[0];
  nTimeDelta  = aData[1];
  } 

if (sens == "LEFT") 
  return "Rotate('" + strId_image + "', -(" + nAngle + "), " + nTimeDelta + ");\n";
else
  return "Rotate('" + strId_image + "', " + nAngle + ", " + nTimeDelta + ");\n";
// Le dernier paramètre est le temps d'attente entre chaque rotation de 1 degré
};

Blockly.Blocks['logo_set_direction'] = {
//======================================
init: function() {
  this.jsonInit({
    "message0": bgBlockly.Msg['LOGO_SET_DIRECTION_TITLE'],
    "args0": [
      {
        "type": "input_value",
        "name": "ANGLE",
        "check":"Number"
      }
    ],
    "data": "idBouleBleue, 5", // Valeurs par défaut.
    "previousStatement": null,
    "nextStatement": null,
    "colour":  bgBlockly.Msg['LOGOS_HUE'],
    "tooltip": bgBlockly.Msg['LOGO_SET_DIRECTION_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['LOGO_SET_DIRECTION_HELPURL']
    });
  }
};
Blockly.JavaScript['logo_set_direction'] = function(block) {
//==========================================================
// Rotation à droite de la boule bleue de l'angle désirée.
var nAngle = Blockly.JavaScript.valueToCode(block, 'ANGLE',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';

var strId_image = "idBouleBleue"; // Valeur par défaut
var nTimeDelta  = 5; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  var aData = strData.split(","); // Récupère les différents paramètres
  strId_image = aData[0];
  nTimeDelta  = aData[1];
  } 

return "Set_Direction('" + strId_image + "', " + (-nAngle) + ", " + nTimeDelta + ");\n";
// Le dernier paramètre est le temps d'attente entre chaque rotation de 1 degré
};

Blockly.Blocks['logo_get_color'] = {
//==================================
init: function() {
  this.jsonInit({
    "type":"logo_get_color",
    "message0": bgBlockly.Msg['LOGO_GET_COLOR_TITLE'],
    "output": "Number",
    "colour":  bgBlockly.Msg['LOGOS_HUE'],
    "tooltip": bgBlockly.Msg['LOGO_GET_COLOR_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['LOGO_GET_COLOR_HELPURL']
    });
  }
};
Blockly.JavaScript['logo_get_color'] = function(block) {
//======================================================
// Lecture de la coordonnée X ou Y de la position de l'image
var strId_image = "idBouleBleue"; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  strId_image = strData;
  } 

return ["GetColor('" + strId_image + "')", Blockly.JavaScript.ORDER_FUNCTION_CALL]; // c.f. blockly/generators/javascript/math.js
};

Blockly.Blocks['logo_get_posxy'] = {
//==================================
init: function() {
  this.jsonInit({
    "type":"logo_get_posxy",
    "message0": "%1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "GetPos",
        "options": [
          [bgBlockly.Msg['LOGO_GET_POSXY_POSX'], 'POSX'],
          [bgBlockly.Msg['LOGO_GET_POSXY_POSY'], 'POSY']
        ]
      }
    ],
    "output": "Number",
    "colour":  bgBlockly.Msg['LOGOS_HUE'],
    "tooltip": bgBlockly.Msg['LOGO_GET_POSXY_TOOLTIP'],  // Pour définir des textes personnalisés.
    "helpUrl": bgBlockly.Msg['LOGO_GET_POSXY_HELPURL']
    });
  }
};
Blockly.JavaScript['logo_get_posxy'] = function(block) {
//======================================================
// Lecture de la coordonnée X ou Y de la position de l'image
var strId_image = "idBouleBleue"; // Valeur par défaut

// Données d'utilisateur dans le champ <data> dans la toolbox
var strData = this.data;

if (strData != null) { // S'il y a une donnée, utilise-la
  strId_image = strData;
  } 

// Demande à Blockly quel ligne (X ou Y) de la "field_dropdown" a été sélectionné
var coordonate = block.getFieldValue('GetPos');

if (coordonate == "POSX") 
  return ["GetPosXY('" + strId_image + "', 'x')", Blockly.JavaScript.ORDER_FUNCTION_CALL]; // c.f. blockly/generators/javascript/math.js
else
  return ["GetPosXY('" + strId_image + "', y')", Blockly.JavaScript.ORDER_FUNCTION_CALL]; // c.f. blockly/generators/javascript/math.js
};
