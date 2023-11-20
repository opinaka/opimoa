// Adjonction de fonctionnalités à Blockly
// #######################################

// Indique le type de puzzle utilisé
gloB.puzzle_characteristics_type = "puzzle_characteristics";

function showBlocks() {
//==================
// Liste de tous les blocs
if (gloB.nTimerID1 != 0) {
  // Arrêt de l'animation
  clearInterval(gloB.nTimerID1);
  gloB.nTimerID1 = 0;
  return; // animation en cours, pas de tests.
  }

// c.f. https://developers.google.com/blockly/reference/js/Blockly.Workspace#getAllBlocks
var aoBlocks = gloB.demoWorkspace.getAllBlocks(false); 
var nn = 0;

if (gloB.nNbBlocks == 0) {
  // Parcours tous les blocks
  for (nn=0; nn<aoBlocks.length; nn++) {
    // Displayln(aoBlocks[nn].type);
    if (aoBlocks[nn].type == "puzzle_characteristics") {
      gloB.aoBlocks[gloB.nNbBlocks] = aoBlocks[nn];
      gloB.nNbBlocks++;
      }
    }
  }
else {
  // Les blocs sont déjà identifiés, fait les bouger.
  for (nn=0; nn<gloB.nNbBlocks; nn++) {
    gloB.aoBlocks[nn].moveBy(2, 5);
    }
    
  StartTimer();
  }
}// showBlocks
