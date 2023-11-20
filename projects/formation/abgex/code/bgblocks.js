/**
2019.01.03  Adjonction de code par Bernard Gisin
Adjonction de nouvelles pièces de code javascript
**********************************************************************/

// Pour afficher du texte de droite à gauche
var glstrInfo = "";

function Display(strInfo) {
//=========================
// Ecrit dans une partie de la fenêtre, divers informations.
var myMessage = window.document.nomForm3.nomInfo3.value;
//if (strInfo[strInfo.length-1] == "_")  myMessage = myMessage + strInfo.substr(0, strInfo.length-1);
// c.f. https://www.toutjavascript.com/reference/

glstrInfo = "";
window.document.nomForm3.nomInfo3.value = myMessage + strInfo;
window.document.nomForm3.nomInfo3.scrollTop = 100000;  // pour rester en fin du texte.
/// window.document.nomForm3.nomInfo3.scrollBy(10,0);  pas correcte !?!
} // Display

function DisplayRTL(strInfo) {
//============================
// Ecrit dans une partie de la fenêtre, divers informations.
// La dernière ligne s'écrit de droite à gauche
var myMessage = window.document.nomForm3.nomInfo3.value;

//if (strInfo[strInfo.length-1] == "_")  myMessage = myMessage + strInfo.substr(0, strInfo.length-1);
myMessage = myMessage.substr(0, myMessage.length - glstrInfo.length); // Sous chaîne de ce qu'il y a dans l'affichage.
glstrInfo = strInfo + glstrInfo;
window.document.nomForm3.nomInfo3.value = myMessage + glstrInfo;
window.document.nomForm3.nomInfo3.scrollTop = 100000;  // pour rester en fin du texte.
/// window.document.nomForm3.nomInfo3.scrollBy(10,0);  pas correcte !?!
} // Display

Blockly.Blocks['text_affichertl'] = {
//"""""""""""""""""""""""""""""""""""
  init: function() {
    this.jsonInit({
      "message0": bgBlockly.Msg['TEXT_AFFICHERTL_TITLE'],
      "args0": [
        {
          "type": "input_value",
          "name": "TEXT"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": Blockly.Msg['TEXTS_HUE'],
      "tooltip": bgBlockly.Msg['TEXT_AFFICHERTL_TOOLTIP'],
      "helpUrl": bgBlockly.Msg['TEXT_AFFICHERTL_HELPURL']
    });
  }
};

Blockly.JavaScript['text_affichertl'] = function(block) {
//=======================================================
// Affichage de droite à gauche : rtl = Right To Left
var msg = Blockly.JavaScript.valueToCode(block, 'TEXT',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
return "DisplayRTL(" + msg + ");\n";
};

Blockly.Python['text_affichertl'] = function(block) {
//===================================================
// Affichage de droite à gauche : rtl = Right To Left
var msg = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_NONE) || '\'\'';
return "Print(" + msg + ")\n"; 
};

Blockly.Blocks['text_affiche'] = {
//""""""""""""""""""""""""""""""""
  init: function() {
    this.jsonInit({
      "message0": bgBlockly.Msg['TEXT_AFFICHE_TITLE'],
      "args0": [
        {
          "type": "input_value",
          "name": "TEXT"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": Blockly.Msg['TEXTS_HUE'],
      "tooltip": bgBlockly.Msg['TEXT_AFFICHE_TOOLTIP'],
      "helpUrl": bgBlockly.Msg['TEXT_AFFICHE_HELPURL']
    });
  }
};

Blockly.JavaScript['text_affiche'] = function(block) {
//====================================================
  // Print statement.
  var msg = Blockly.JavaScript.valueToCode(block, 'TEXT',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  return "Display(" + msg + ");\n";
};

Blockly.Python['text_affiche'] = function(block) {
//================================================
// Défini la fonctionnalité du bloc
var msg = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_NONE) || '\'\'';
return "Print(" + msg + ")\n"; 
};

Blockly.Blocks['text_afficheln'] = {
//""""""""""""""""""""""""""""""""""
  init: function() {
    this.jsonInit({
      "message0": bgBlockly.Msg['TEXT_AFFICHELN_TITLE'],
      "args0": [
        {
          "type": "input_value",
          "name": "TEXT"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": Blockly.Msg['TEXTS_HUE'],
      "tooltip": bgBlockly.Msg['TEXT_AFFICHELN_TOOLTIP'],
      "helpUrl": bgBlockly.Msg['TEXT_AFFICHELN_HELPURL']
    });
  }
};


Blockly.JavaScript['text_afficheln'] = function(block) {
//======================================================
  // Print statement.
  var msg = Blockly.JavaScript.valueToCode(block, 'TEXT',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  return "Display(" + msg + "+'\\n'" + ");\n";
};

Blockly.Python['text_afficheln'] = function(block) {
//==================================================
// Défini la fonctionnalité du bloc
var msg = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_NONE) || '\'\'';
return "Print(" + msg + "+'\\n'" + ")\n"; // Insertion d'un retour de ligne à la fin de l'affichage : "\n"
};

