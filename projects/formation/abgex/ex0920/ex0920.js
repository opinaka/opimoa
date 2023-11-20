// Adjonction de fonctionnalités à Blockly
// #######################################

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
