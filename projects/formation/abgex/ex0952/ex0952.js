// Adjonction de fonctionnalités à Blockly
// #######################################

// Indique le type de puzzle utilisé
gloB.puzzle_characteristics_type = "puzzle_characteristics_choice";

function showBlocks() {
//=====================
// Liste de tous les blocs
if (gloB.nTimerID1 != 0) {
  // Arrêt de l'animation
  clearInterval(gloB.nTimerID1);
  gloB.nTimerID1 = 0;
  return; 
  }

// c.f. https://developers.google.com/blockly/reference/js/Blockly.Workspace#getAllBlocks
var aoBlocks = gloB.demoWorkspace.getAllBlocks(false); 
var nn = 0;

// Parcours tous les blocks
gloB.nNbBlocks = 0;
for (nn=0; nn<aoBlocks.length; nn++) {
  // Displayln(aoBlocks[nn].type);
  if (aoBlocks[nn].type == "puzzle_characteristics_choice") {
    gloB.aoBlocks[gloB.nNbBlocks] = aoBlocks[nn];
    gloB.nNbBlocks++;
    }
  }

StartTimer();
}// showBlocks
