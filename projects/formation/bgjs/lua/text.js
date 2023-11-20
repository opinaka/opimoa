/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*
Avant d'inclure ce fichier dans votre page html avecc :
  <script src="../../bgjs/Lua/text.js"></script>

il faut avoir inclus le fichier Blockly suivant :
  <script src="../../Lua.js"></script>
*/

// Adjonction de blocs permettant d'afficher du texte dans la fenêtre
//********************************************************************

Blockly.Lua['text_afficheln'] = function(block) {
//================================================
// Défini la fonctionnalité du bloc
var msg = Blockly.Lua.valueToCode(block, 'TEXT', Blockly.Lua.ORDER_NONE) || '\'\'';
return "print(" + (  msg + " .. '\\n'") + ")\n"; // Insertion d'un retour de ligne à la fin de l'affichage : "\n"
};

Blockly.Lua['text_affiche'] = function(block) {
//================================================
// Défini la fonctionnalité du bloc
var msg = Blockly.Lua.valueToCode(block, 'TEXT', Blockly.Lua.ORDER_NONE) || '\'\'';
return "print(" + msg + ")\n"; 
};

Blockly.Lua['text_comment'] = function(block) {
//====================================================
// Défini la fonctionnalité du bloc
var msg = Blockly.Lua.valueToCode(block, 'COMMENT', Blockly.Lua.ORDER_ATOMIC) || '\'\'';

// Enlève les guillmets placés automatiquement au début et en fin.
msg = msg.substr(1, msg.length-2); 
// Remplace le  \\  par un  \
msg = msg.replace(/\\\\/g, '\\'); //
// Remplace le  \'  par un  '
msg = msg.replace(/\\\'/g, '\'');
return '--" ' + msg + "\n"; 
};

Blockly.Lua['text_affiche_efface'] = function(block) {
//=======================================================
// Un bloque pour effacer l'affichage
return "ClearDisplay()\n";
};

Blockly.Lua['text_pause'] = function(block) {
//==================================================
// Défini la fonctionnalité du bloc
var vTime = Blockly.Lua.valueToCode(block, 'TIME', Blockly.Lua.ORDER_ATOMIC) || '\'\'';
var strSpeed = block.getFieldValue('SPEED');

return "Pause_execution( " + vTime + ", '" + strSpeed + "');\n";
};

Blockly.Lua['variable_spy'] = function(block) {
//====================================================
// Print statement.
var vTime = Blockly.Lua.valueToCode(block, 'TIME',
    Blockly.Lua.ORDER_NONE) || '\'\'';

var oVarMap = gloB.demoWorkspace.getVariableMap();
var aoVar = oVarMap.getAllVariables();
var msg1 = "";

// N'ajoute que les variables qui sont utilisées
// c.f. https://developers.google.com/blockly/reference/js/Blockly.VariableMap#getVariableUsesById
for (var nn=0; nn<aoVar.length; nn++) {
  if (oVarMap.getVariableUsesById(aoVar[nn].getId()).length > 0) {
    if (msg1 != '') msg1 += ', '; // Pour placer des virgules entre les variables
    msg1 += aoVar[nn].name;
    }
  }

if (msg1 == '') msg1 = '0'; // pour indiquer qu'il n'y a rien à afficher.

return "Variable_Spy(" + vTime + ", '" + msg1 + "', " + msg1 + ");\n";
};

Blockly.Lua['text_parse_to_number'] = function(block) {
//=====================================================
// Transforme une chaine de caractère (un string) en un nombre
// Nombre entier si TYPE == 'INT'
// Nombre à virgule si TYPE == 'FLOAT'
// 0 sinon.
var strS = Blockly.Lua.valueToCode(block, 'STR',
    Blockly.Lua.ORDER_NONE) || '\'\'';
var strType = block.getFieldValue('TYPE');

if (strType == 'INT') {
  return ["math.floor(tonumber(" + strS + "))", Blockly.Lua.ORDER_HIGH]; // c.f. blockly/generators/lua/math.js
  }
else if (strType == 'FLOAT') {
  return ["tonumber(" + strS + ")", Blockly.Lua.ORDER_HIGH];
  }
else {
  return ["tonumber('0')", Blockly.Lua.ORDER_HIGH];
  }
};


