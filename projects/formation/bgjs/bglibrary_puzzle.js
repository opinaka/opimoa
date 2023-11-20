// Adjonction de fonctionnalités à Blockly
// #######################################

gloB.nMessageOn = true; // Indique si on affiche des messages ou non

// Tableau de références à des blocs, 
// dans le but de les faire bouger
gloB.aoBlocks = new Array; 
gloB.nNbBlocks = 0; // nombre d'éléments dans le tableau
gloB.nNbBlocksMin = 1; // Nombre de blocks minimals pour dire que le problème est résolu.
gloB.vTimeNow = 0; // en [s] Pour l'animation des blocs
gloB.nTimeDelta = 20; // temps en mili-secondes entre deux appels de la fonction Compteur
gloB.vTimeMax = 60; // Temps de l'animation en [s]

// Permet de redéfinir la fonction de création du bloc.
// C'est utile pour avoir une liste de plus (ou moins) que 5 choix.
// Ces fonctions sont définies plus loin dans ce fichier.
gloB.puzzle_characteristics_choice_func = null;
gloB.puzzle_image100x70_choice_func = null;
gloB.puzzle_traits_choice_func = null;

// Change suivant les puzzles utilisés
gloB.puzzle_characteristics_type = "puzzle_characteristics_choice";

// Traits à tester pour les puzzles complets
// Peut être redéfini par un développeur hors librairie.
gloB.puzzle_astrAnimal = ['BEE>BEE-6', 'CAT>CAT-4', 'DUCK>DUCK-2', 'SNAIL>SNAIL-0', 'MOUSE>MOUSE-4'];

// Liste de traits. La longueur des strings représentant les traits peut être arbitraire.
// Il n'est pas nécessaire que chaque animal ait le même nombre de traits.
// Tableau de tableaux de traits. L'ordre des traits pour un animal donné ne compte pas.
gloB.puzzle_aastrCode = [['HON','STI'], ['FUR','WHI'], ['BEA','FEA'], ['SHE','SLI'], ['FUR','WHI']];

// Sont définis plus loin :
//gloB.puzzle_test_animal_ok = function(strCode, strAnimal, aastrCode)
//gloB.puzzle_showCode(); 
  
function myUpdateFunction(event) {
//================================
// Met à jour le code automatiquement.
// c.f. https://developers.google.com/blockly/guides/configure/web/events
gloB.puzzle_showCode();
} // myUpdateFunction

// Pour que la mise à jour soit affichée automatiquement
// c.f. https://developers.google.com/blockly/guides/configure/web/code-generators
gloB.funcAfterRunBlockly = function() {
//"""""""""""""""""""""""""""""""""""""
  gloB.demoWorkspace.addChangeListener(myUpdateFunction);
  Blockly.JavaScript.STATEMENT_PREFIX = ''; // Permet d'enlever la commande d'illumination des blocs.
  };

function myTimer() {
//==================
// Est appelé chaque  gloB.nTimeDelta  millisecondes à l'aide du timer.
// Fait bouger des images d'étincelles
// Coordonnées de destination des blocs
var vStopX = 0.0;
var vStopY = 0.0;

// Position du bloc
var vX = 0.0;
var vY = 0.0;
var vDX = 0.0;
var vDY = 0.0;
var vNorme = 0.0;
var vCenterX = window.innerWidth / 2 - 250;
var vWidthX  = window.innerWidth / 2 - 260 ;
var vCenterY = window.innerHeight / 2 - 250;
var vWidthY  = window.innerHeight / 2 - 260;
//Displayln(vCenterX + '  ' + vWidthX + '  ' + vCenterY + '  ' + vWidthY);
// Temps depuis le début de l'animation en [s]
gloB.vTimeNow += gloB.nTimeDelta / 1000.0;

for (nn=0; nn<gloB.nNbBlocks; nn++) {
  // Coordonnées de destination des blocs
  var vStopX = vCenterX + vWidthX*Math.cos(gloB.vTimeNow*0.5 + 6.28*nn/gloB.nNbBlocks);
  var vStopY = vCenterY + vWidthY*Math.sin(gloB.vTimeNow*0.5 + 6.28*nn/gloB.nNbBlocks);

  // Position du bloc
  var vX = gloB.aoBlocks[nn].getRelativeToSurfaceXY().x;
  var vY = gloB.aoBlocks[nn].getRelativeToSurfaceXY().y;
  //Displayln(Math.round(vX) + '  ' + Math.round(vY) + '  ' + Math.round(vStopX) + '  ' + Math.round(vStopY) );
  // Déplacement
  vDX = vStopX - vX;
  vDY = vStopY - vY;
  vNorme = Math.sqrt(vDX*vDX + vDY*vDY);
  if (vNorme > 10) { // pour ne pas avoir un déplacement trop rapide
    //Displayln(vStopX + '  ' + vNorme);
    vDX = vDX * 10 / vNorme;
    vDY = vDY * 10 / vNorme;
    }  

  // Déplacement du block
  gloB.aoBlocks[nn].moveBy(vDX, vDY);
  }
  
if (gloB.vTimeNow > gloB.vTimeMax){
  // Arrêt de l'animation
  clearInterval(gloB.nTimerID1);
  gloB.nTimerID1 = 0;
  }
} // myTimer

function StartTimer() {
//=====================
// Démarre le timer et met dans la variable gloB.nTimerID1 le numéro de timer utilisé.
if (gloB.nTimerID1 === 0) {     
  // c.f. https://developers.google.com/blockly/reference/js/Blockly.Workspace#getAllBlocks
  var aoBlocks = gloB.demoWorkspace.getAllBlocks(false); 
  var nn = 0;

  // Parcours tous les blocks
  gloB.nNbBlocks = 0;
  for (nn=0; nn<aoBlocks.length; nn++) {
    if (aoBlocks[nn].type == gloB.puzzle_characteristics_type) {
      gloB.aoBlocks[gloB.nNbBlocks] = aoBlocks[nn];
      gloB.nNbBlocks++;
      }
    }

  gloB.vTimeNow = 0;
  gloB.vTimeMax = 60; // Durée max de l'animation en [s], qui est annulée par le OK de la boîte de dialogue
  gloB.nTimerID1 = setInterval("myTimer()", gloB.nTimeDelta); 
  }
} // StartTimer

gloB.puzzle_test_animal_ok = function(strCode, strAnimal, astrCodes) {
//====================================================================
// Test si un puzzle est correct.
// Retour  true  si oui,  false sinon
// strCode = le code complet
// strAnimal, le code de l'animal testé, avec son nombre de pattes.
// astrCode = tableau de traits que l'animal doit avoir
var nn = 0;
var n2 = 0;
var strS = ''; 
var nLen = astrCodes.length; // le nombre de traits attendu pour l'animal
var nLenTraits = 0; // Longueur de la 'string' qui caractérise les traits.

nn = strCode.indexOf(strAnimal, 0);
if (nn < 0) return false; // Puzzle pas correct
nn = strCode.indexOf('-', nn); // début du codage des traits
n2 = strCode.indexOf('/', nn); // fin de codage des traits
strS = strCode.substring(nn+2,n2); // texte qui suit le nom de l'animal

// Compte la longueur de la chaine qui caractérise les traits de l'animal
for (nn=0; nn<nLen; nn++) nLenTraits += astrCodes[nn].length;

if (strS.length != nLenTraits) return false; // N'a pas le bon nombre de traits.

// Compte que tous les traits attendus sont présents.
for (nn=0; nn<nLen; nn++) {
  if (strS.indexOf(astrCodes[nn]) < 0) return false; // un trait manque  }
  }
  
return true; // Le puzzle est complet et correcte, ni trop ni pas assez de traits.
}; // gloB.puzzle_test_animal_ok

gloB.puzzle_showCode = function() {
//=================================
// Utilise le code javascript généré, pour tester la validité des puzzles.
if (gloB.nTimerID1 != 0) return; // animation en cours, pas de tests.
var aoBlocks = gloB.demoWorkspace.getAllBlocks(false); 
var nn = 0;
var n2 = 0;
var strS = ''; 
var nCpt = 0;
var nCountOK = 0;

Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
var code = Blockly.JavaScript.workspaceToCode(gloB.demoWorkspace); 

if (window.document.idDisplayNameForm) {
  window.document.idDisplayNameForm.idDisplayNameTextArea.value = code;
  window.document.idDisplayNameForm.idDisplayNameTextArea.scrollTop = 100000;  // pour rester en fin du texte.
  }

// Parcours tous les blocks,
// est utile pour compter le nombre de characteristics présents et
// pour l'animation des blocs.
gloB.nNbBlocks = 0;
for (nn=0; nn<aoBlocks.length; nn++) {
  // Displayln(aoBlocks[nn].type);
  if (aoBlocks[nn].type == gloB.puzzle_characteristics_type) {
    gloB.aoBlocks[gloB.nNbBlocks] = aoBlocks[nn];
    gloB.nNbBlocks++;
    }
  }

// Enlève tous les retours de ligne
//code = code.replace(/\n/g, '');

for (nn=0; nn<gloB.puzzle_astrAnimal.length; nn++) {
  if (gloB.puzzle_test_animal_ok(code, gloB.puzzle_astrAnimal[nn], gloB.puzzle_aastrCode[nn])) {
    nCountOK++;
    //Displayln(astrAnimal[nn] + ' is OK');
    }
  }
 
if ( (nCountOK >= gloB.nNbBlocks) && (nCountOK >= gloB.nNbBlocksMin) ){
  // Toutes les connexions sont correctes.
  if (gloB.nMessageOn) {
    StartTimer(); // Animation finale des blocs
    DialogGeneral(true, 0, 2);  // alert('Bravo, toutes les connexions sont correctes.');
    gloB.nMessageOn = false; // Ne réaffiche plus de message
    }
  }
else {
  // Les connexions ne sont pas toutes correctes
  // Affichera un message lorsqu'elles seront tous correctes.
  gloB.nMessageOn = true;
  }
}; // gloB.puzzle_showCode

// ###########################################################################

Blockly.Blocks['puzzle_characteristics'] = {
//""""""""""""""""""""""""""""""""""""""""""
// c.f. https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks#label
  init: function() {
    this.jsonInit({
      "type": "puzzle_characteristics",
      "message0": bgBlockly.Msg["PUZZLE_CHARACTERISTICS_TITLE"],
      "args0": [
        {
          "type": "field_label",
          "text": "chat",
          "name": "myAnimal"
        },
        {
          "type": "input_dummy"
        },
        {
          "type": "input_value",
          "name": "IMAGE",
          "check": "type_picture",
          "align": "RIGHT"
        },
        {
          "type": "field_dropdown",
          "name": "LEGS",
          "options": [
            [
              "0",
              "0"
            ],
            [
              "2",
              "2"
            ],
            [
              "4",
              "4"
            ],
            [
              "6",
              "6"
            ]
          ]
        },
        {
          "type": "input_dummy"
        },
        {
          "type": "input_statement",
          "name": "CHARACTERS"
        }
      ],
      "inputsInline": false,
      "colour": bgBlockly.Msg["PUZZLE_CHARACTERISTICS_HUE"],
      "tooltip": "",
      "helpUrl": ""
    });
  }
};
/*
Blockly.Blocks['puzzle_characteristics'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Chat", "myAnimal");
    this.appendValueInput("IMAGE")
        .setCheck("type_picture")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("image :");
    this.appendDummyInput()
        .appendField("jambes :")
        .appendField(new Blockly.FieldDropdown([["0","0"], ["2","2"], ["4","4"], ["6","6"]]), "LEGS");
    this.appendStatementInput("CHARACTERS")
        .setCheck(null)
        .appendField("traits :");
    this.setInputsInline(false);
    this.setColour(120);
 this.setTooltip("Caractéristiques");
 this.setHelpUrl("");
  }
};
*/
Blockly.JavaScript['puzzle_characteristics'] = function(block) {
//==============================================================
// Pour information : block === this
// Ajoute la suite d'instructions
var msg_image = Blockly.JavaScript.valueToCode(block, 'IMAGE',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
var msg_legs = block.getFieldValue('LEGS');

// Pas d'indentation désirée, 
// c.f. https://developers.google.com/blockly/reference/js/Blockly.Generator#INDENT
Blockly.JavaScript.INDENT = ""; 

var msg_characters = Blockly.JavaScript.statementToCode(block, 'CHARACTERS');

// Données d'utilisateur dans le champ <data> dans la toolbox et de la StartBlocks
var strData = block.data;
var strName = '???';
var strVal  = '?';

if (strData != null) { // S'il y a une donnée, utilise-la
  var aData = strData.split(","); // Récupère les différents paramètres
  strName = aData[0];
  strVal  = aData[1];
  } 

strName =  bgBlockly.Msg[strName]; // Pour être multilangue

//Display(msg_image + '  ' + msg_legs + '  ' + '' + '  ' + 
//        block.getFieldValue("myAnimal") + '  ' + this.data + '\n');
block.getField("myAnimal").setText(strName); // Change le premier mot du bloc
var msg = strVal + ">" + msg_image + "-" + msg_legs + msg_characters + "/";

return msg; // Retourne une instruction, pas une valeur
};

// Test de définitions de blocs
Blockly.Blocks['puzzle_image100x70'] = {
//""""""""""""""""""""""""""""""""""""""
  init: function() {
    this.jsonInit({
      "type": "puzzle_image100x70",
      "message0": "%1",
      "args0": [
        {
          "type": "field_image",
          "src": "images/bee.jpg",
          "width": 100,
          "height": 70,
          "alt": "image",
          "name": "theAnimal"
        }
      ],
      "data": "ask,?",
      "output": null,
      "colour": bgBlockly.Msg["PUZZLE_IMAGE100X70_HUE"],
      "tooltip": "",
      "helpUrl": ""
    });
  }
};
Blockly.JavaScript['puzzle_image100x70'] = function(block) {
//==========================================================
// Pour information : block === this
//block.getField("theAnimal").setText(this.data); // Change le premier mot du bloc
var oField = block.getField('theAnimal'); // Champ qui doit contenir un "field_image"
//Display(oField.getValue() + '  ' + block.data +  '\n');

// Données d'utilisateur dans le champ <data> dans la toolbox et de la StartBlocks
var strData = block.data;
var strName = '???';
var strVal  = '?';

if (strData != null) { // S'il y a une donnée, utilise-la
  var aData = strData.split(","); // Récupère les différents paramètres
  strName = aData[0];
  strVal  = aData[1];
  } 

//block.setTooltip(strName); // Change le texte d'aide associé à l'objet
oField.setValue('images/' + strName + '.jpg'); // Change l'image

 // Retourne une valeur, pas une instruction
return [strVal, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['puzzle_traits'] = {
//"""""""""""""""""""""""""""""""""
// c.f. https://developers.google.com/blockly/
//      guides/create-custom-blocks/define-blocks#label
  init: function() {
    this.jsonInit({
      "type": "puzzle_traits",
       "message0": "%1",
       "args0": [{
           "type": "field_label",
           "text": "moustache",
           "name": "myTraits"
         }],
      "data": "un traits",   
      "previousStatement": null,
      "nextStatement": null,
      "colour": bgBlockly.Msg["PUZZLE_TRAITS_HUE"],
      "tooltip": "traits",
      "helpUrl": ""
    });
  }
};
Blockly.JavaScript['puzzle_traits'] = function(block) {
//=====================================================
// Pour information : block === this
//block.getField("myTraits").setText(this.data); // Change le premier mot du bloc
var oField = block.getField('myTraits'); // Champ qui doit contenir un "field_image"
//Display(oField.getValue() + '  ' + block.data +  '\n');

// Données d'utilisateur dans le champ <data> dans la toolbox et de la StartBlocks
var strData = block.data;
var strName = '???';
var strVal  = '?';

if (strData != null) { // S'il y a une donnée, utilise-la
  var aData = strData.split(","); // Récupère les différents paramètres
  strName = aData[0];
  strVal  = aData[1];
  } 

strName =  bgBlockly.Msg[strName]; // Pour être multilangue
block.setTooltip(strName); // Change le texte d'aide associé à l'objet
oField.setValue(strName); // Change le texte

return strVal; // Retourne une instruction, pas une valeur
};

// ###########################################################################

gloB.puzzle_characteristics_choice_func = function(obj) {
//=======================================================
obj.jsonInit({
  "type": "puzzle_characteristics_choice",
  "message0": bgBlockly.Msg["PUZZLE_CHARACTERISTICS_TITLE"],
  "args0": [
    {
      "type": "field_dropdown",
      "name": "myAnimal",
      "options": [
        [
          bgBlockly.Msg["XML_CHAR_BEE"],
          "BEE"
        ],
        [
          bgBlockly.Msg["XML_CHAR_CAT"],
          "CAT"
        ],
        [
          bgBlockly.Msg["XML_CHAR_DUCK"],
          "DUCK"
        ],
        [
          bgBlockly.Msg["XML_CHAR_SNAIL"],
          "SNAIL"
        ],
        [
          bgBlockly.Msg["XML_CHAR_MOUSE"],
          "MOUSE"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "IMAGE",
      "check": "type_picture",
      "align": "RIGHT"
    },
    {
      "type": "field_dropdown",
      "name": "LEGS",
      "options": [
        [
          "0",
          "0"
        ],
        [
          "2",
          "2"
        ],
        [
          "4",
          "4"
        ],
        [
          "6",
          "6"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CHARACTERS"
    }
  ],
  "inputsInline": false,
  "colour": 120,
  "tooltip": "",
  "helpUrl": ""
  });
}; // gloB.puzzle_characteristics_choice_func
/*
function puzzle_characteristics_choice_func(obj) {
//================================================
// Il reste des champ à traduire...
obj.appendDummyInput()
    .appendField(new Blockly.FieldDropdown([
        [bgBlockly.Msg["XML_CHAR_BEE"],"BEE"]
       ,[bgBlockly.Msg["XML_CHAR_CAT"],"CAT"]
       ,[bgBlockly.Msg["XML_CHAR_DUCK"],"DUCK"]
       ,[bgBlockly.Msg["XML_CHAR_SNAIL"],"SNAIL"]
       ,[bgBlockly.Msg["XML_CHAR_MOUSE"],"MOUSE"]
      ]), "myAnimal");
obj.appendValueInput("IMAGE")
    .setCheck("type_picture")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField("image :");
obj.appendDummyInput()
    .appendField("jambes :")
    .appendField(new Blockly.FieldDropdown([["0","0"], ["2","2"], ["4","4"], ["6","6"]]), "LEGS");
obj.appendStatementInput("CHARACTERS")
    .setCheck(null)
    .appendField("traits :");
obj.setInputsInline(false);
obj.setColour(120);
obj.setTooltip("");
obj.setHelpUrl("");
} // puzzle_characteristics_choice_func
*/
Blockly.Blocks['puzzle_characteristics_choice'] = {
  init: function() {
    // La fonction utilisée ci-dessous peut être redéfinie par un développeur hors librairie
    gloB.puzzle_characteristics_choice_func(this);
  }
};
Blockly.JavaScript['puzzle_characteristics_choice'] = function(block) {
//=====================================================================
// Pour information : block === this
// Ajoute la suite d'instructions
var msg_image = Blockly.JavaScript.valueToCode(block, 'IMAGE',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
var msg_legs = block.getFieldValue('LEGS');

// Pas d'indentation désirée, 
// c.f. https://developers.google.com/blockly/reference/js/Blockly.Generator#INDENT
Blockly.JavaScript.INDENT = ""; 

var msg_characters = Blockly.JavaScript.statementToCode(block, 'CHARACTERS');

//Display(msg_image + '  ' + msg_legs + '  ' + '' + '  ' + 
//        block.getFieldValue("myAnimal") + '  ' + this.data + '\n');
var strVal = block.getFieldValue("myAnimal");
var msg = strVal + ">" + msg_image + "-" + msg_legs + msg_characters + "/";

return msg; // Retourne une instruction, pas une valeur
};

gloB.puzzle_image100x70_choice_func = function(obj) {
//===================================================
obj.jsonInit({
  "type": "puzzle_image100x70_choice",
  "message0": "%1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "CHOICE",
      "options": [
        [
          {
            "src": "images/bee.jpg",
            "width": 100,
            "height": 70,
            "alt": "bee"
          },
          "BEE"
        ],
        [
          {
            "src": "images/cat.jpg",
            "width": 100,
            "height": 70,
            "alt": "cat"
          },
          "CAT"
        ],
        [
          {
            "src": "images/duck.jpg",
            "width": 100,
            "height": 70,
            "alt": "duck"
          },
          "DUCK"
        ],
        [
          {
            "src": "images/snail.jpg",
            "width": 100,
            "height": 70,
            "alt": "snail"
          },
          "SNAIL"
        ],
        [
          {
            "src": "images/mouse.jpg",
            "width": 100,
            "height": 70,
            "alt": "mouse"
          },
          "MOUSE"
        ]
      ]
    }
  ],
  "output": null,
  "colour": 30,
  "tooltip": "",
  "helpUrl": ""
  });
}; // gloB.puzzle_image100x70_choice_func
Blockly.Blocks['puzzle_image100x70_choice'] = {
//"""""""""""""""""""""""""""""""""""""""""""""
  init: function() {
    // La fonction utilisée ci-dessous peut être redéfinie par un développeur hors librairie
    gloB.puzzle_image100x70_choice_func(this);
  }
};
/*
Blockly.Blocks['puzzle_image100x70_choice'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          [{"src":"images/bee.jpg","width":100,"height":70,"alt":"bee"},"BEE"], 
          [{"src":"images/cat.jpg","width":100,"height":70,"alt":"cat"},"CAT"], 
          [{"src":"images/duck.jpg","width":100,"height":70,"alt":"duck"},"DUCK"], 
          [{"src":"images/snail.jpg","width":100,"height":70,"alt":"snail"},"SNAIL"], 
          [{"src":"images/mouse.jpg","width":100,"height":70,"alt":"mouse"},"MOUSE"]]), 
          "CHOICE");
    this.setOutput(true, null);
    this.setColour(30);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
*/
Blockly.JavaScript['puzzle_image100x70_choice'] = function(block) {
//=================================================================
// Pour information : block === this
//var oField = block.getField('CHOICE'); // Champ qui doit contenir un "field_image"

var strName = block.getFieldValue('CHOICE');

 // Retourne une valeur, pas une instruction
return [strName, Blockly.JavaScript.ORDER_NONE];
};

gloB.puzzle_traits_choice_func = function(obj) {
//==============================================
obj.jsonInit({
  "type": "puzzle_traits_choice",
  "message0": "%1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "CHOICE",
      "options": [
        [
          bgBlockly.Msg["XML_TRAITS_HONEY"],  
          "HON"
        ],
        [
          bgBlockly.Msg["XML_TRAITS_STINGER"],
          "STI"
        ],
        [
          bgBlockly.Msg["XML_TRAITS_FUR"],
          "FUR"
        ],
        [
          bgBlockly.Msg["XML_TRAITS_WHISKERS"],
          "WHI"
        ],
        [
          bgBlockly.Msg["XML_TRAITS_BEAK"],
          "BEA"
        ],
        [
          bgBlockly.Msg["XML_TRAITS_FEATHERS"],
          "FEA"
        ],
        [
          bgBlockly.Msg["XML_TRAITS_SHELL"],
          "SHE"
        ],
        [
          bgBlockly.Msg["XML_TRAITS_SLIME"],
          "SLI"
        ]
      ]
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 290,
  "tooltip": "",
  "helpUrl": ""
  });
}; // gloB.puzzle_traits_choice_func
Blockly.Blocks['puzzle_traits_choice'] = {
//""""""""""""""""""""""""""""""""""""""""
  init: function() {
    // La fonction utilisée ci-dessous peut être redéfinie par un développeur hors librairie
    gloB.puzzle_traits_choice_func(this);
  }
};
/*
Blockly.Blocks['puzzle_traits_choice'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
            ["Miel","HONEY"], ["Dare","STINGER"], ["Fourrure","Fur"], 
            ["Moustaches","WHISKERS"], ["Bec","BEAK"]
        ]), "CHOICE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
*/
Blockly.JavaScript['puzzle_traits_choice'] = function(block) {
//============================================================
// Pour information : block === this
//var oField = block.getField('CHOICE'); // Champ qui doit contenir un "field_image"

var strName = block.getFieldValue('CHOICE');
return strName; // Retourne une instruction, pas une valeur
};
