// Adjonction de fonctionnalités à Blockly
// #######################################

var glnTimerID0 = 0;  // indiquera le numéro du timer actif, pour l'animation de la souris brulée
var glnTime = 0;  // indique le temps écoulé en millième de secondes
var glnTimeDelta = 50; // temps en mili-secondes entre deux appels de la fonction Compteur
var gloField = null; // Référence au Field qui contient l'image de la souris.
var glnMessageOn = true; // Indique si on affiche des messages ou non
var glnObject = null; // Référence au dernier objet utilisé.
// var gloPuz = new localFuncPuzzles(); // Création de l'objet  C.f. plus loin

function myUpdateFunction(event) {
//================================
// Met à jour le code automatiquement.
// c.f. https://developers.google.com/blockly/guides/configure/web/events
glnObject = gloB.demoWorkspace.getBlockById(event.blockId);  // est un Blockly.Block
showCode();
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
// Est appelé chaque  glnTimeDelta  millisecondes à l'aide du timer.
// Fait bouger des images d'étincelles
var nTimeMax = 3000; // Temps de l'animation en [ms]
glnTime = glnTime + glnTimeDelta;

// Fait apparaître lentement la souris grillée
var imgMouseBurned = document.getElementById('idMouseBurned');
imgMouseBurned.style.opacity = glnTime / nTimeMax;

// Déplace les images des étincelles et les rends opaques  
var nn = 0;
var imgElement;
for (nn=100; nn<=120; nn++) {
  imgElement = document.getElementById('idImg_' + nn);
  imgElement.style.left = parseInt(imgElement.style.left) + 15*(Math.random()-0.45) + 'px';
  imgElement.style.top = parseInt(imgElement.style.top) - 1 - Math.random() + 'px';
  imgElement.style.opacity = 1.0 - glnTime / nTimeMax;
  imgElement.style.width = 22 * (1.1 - glnTime / nTimeMax) + 'px';
  }

if (glnTime >= nTimeMax) { // L'animation dure  nTimeMax  milli-secondes
  clearInterval(glnTimerID0);
  glnTimerID0 = 0;
  imgMouseBurned.style.display = 'none'; // Cache
  //Display('La souris est grillée\n');


  gloField.setTooltip(gloPuz.Tooltip[4]); // Change le texte d'aide associé à l'objet
  gloField.setValue(gloPuz.Image[4]); // Change l'image de la souris
  gloField.setText(gloPuz.Alt[4]); // Change le texte associé à la souris
  gloField = null;

  // Destruction des images d'éteincelles
  var nn = 0;
  var imgElement;
  for (nn=100; nn<=120; nn++) {
    imgElement = document.getElementById('idImg_' + nn);    
    // c.f. https://developer.mozilla.org/fr/docs/Web/API/Node/removeChild
    document.body.removeChild(imgElement);  // Element supprimé de la mémoire.
    }
    
  // Destruction de l'objet son
  divElement = document.getElementById('c');    
  // c.f. https://developer.mozilla.org/fr/docs/Web/API/Node/removeChild
  document.body.removeChild(divElement);  // Element supprimé de la mémoire.
  }
} // myTimer

function StartTimer() {
//=====================
// Démarre le timer et met dans la variable glnTimerID0 le numéro de timer utilisé.
if (glnTimerID0 === 0) { 
  // Créations d'images d'éteincelles, qui vont monter et disparaîtres.
  // La souris brulée var arrapaître lentement.
  var imgMouseBurned = document.getElementById('idMouseBurned');    
  imgMouseBurned.style.opacity = 0; // Complètement transparent au départ
  imgMouseBurned.style.display = 'inline-block'; // rend visible 
  // Positionne l'image de la souris brulée sur l'image de la souris.
  imgMouseBurned.style.left = gloB.demoWorkspace.getOriginOffsetInPixels().x + glnObject.getRelativeToSurfaceXY().x + 10 + 'px';
  imgMouseBurned.style.top = parseInt(document.getElementById('blocklyDiv').style.top) + glnObject.getRelativeToSurfaceXY().y + 5 + 'px';

  // Création d'images d'éteincelles
  var nn = 0;
  var imgElement;
  for (nn=100; nn<=120; nn++) {
    imgElement = document.createElement('img');
    imgElement.id = "idImg_" + nn ;
    imgElement.src = 'images/etincelle.png';
    imgElement.style.position = 'absolute';
    imgElement.style.left = gloB.demoWorkspace.getOriginOffsetInPixels().x + glnObject.getRelativeToSurfaceXY().x
                           + 20 + 50 * Math.random() + 'px';
    imgElement.style.top = parseInt(document.getElementById('blocklyDiv').style.top) + glnObject.getRelativeToSurfaceXY().y 
                           + 80 * Math.random() + 'px';
    imgElement.style.opacity = 1.0;
    imgElement.style.display = 'inline-block';
    document.body.appendChild(imgElement);
    }  
  
  // Création d'un élément pour jouer un son
  divElement = document.createElement('div');
  divElement.id = "idDivSon";
  divElement.innerHTML = "<audio autoplay> <source src='../medias/grillade.mp3'></audio>";  
  document.body.appendChild(divElement);

  glnTime = 0;
  glnTimerID0 = setInterval("myTimer()", glnTimeDelta); 
  }
} // StartTimer

function showCode() {
//===================
// Generate JavaScript code and display it.
Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
var code = Blockly.JavaScript.workspaceToCode(gloB.demoWorkspace); 

window.document.idCodeJavascriptNameForm.idCodeJavascriptNameTextArea.value += code;
window.document.idCodeJavascriptNameForm.idCodeJavascriptNameTextArea.scrollTop = 100000;  // pour rester en fin du texte.

if (glnObject == null) {
  return; // rien à faire si pas de bloc actif. C'est le cas si un bloc a été détruit.
  }

if (code.indexOf('PLUG_LIFE', 0) >= 0) { // Il y a une souris dans la prise 230 V
  // Si on met dans la prise, la souris est grillée
 
  // On va changer l'image de la souris.
  if ( (glnObject != null) && (glnObject.message == 'LIFE') ) {      

    // c.f. https://developers.google.com/blockly/reference/js/Blockly.Block
    gloField = glnObject.getField('nameField'); // Champ qui doit contenir un "FieldImage"

    if ( (gloField != null) && (glnObject.message == 'LIFE') ) {
      // Lance une animation qui fait griller la souris
      glnObject.message = 'DEAD';
      StartTimer();

      // Faire cracher Blockly, si on élimine la souris morte.
      //glnObject.type = gloPuz.Type[4];  // La souris change de type, pour devenir brulée. Si on change de langue.
      }
    }
  }
else { // Pas de souris mise dans la prise
  // Test la cohérence pour voir s'il y a un branchement et s'il est correct.
  //"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
  if (code.indexOf('PLUG_Desktop', 0) >= 0) {
    // Le desktop a été branché à la prise.
    
    if (code.indexOf('PLUG_Desktop>Ecran-Clavier.LIFE', 0) >= 0) {
      // Toutes les connexions sont corrects.
      if (glnMessageOn) {
        if (code.length <= 31) {
          // Tous les branchements sont corrects.  
          DialogGeneral(true, 0, 2);  // alert('Bravo, toutes les connexions sont correctes.');
                                     // Le 2e paramètre correspond au '0' qui suit l'id : "idDialogBoxGeneral" de ex0932.html        
          glnMessageOn = false; // Ne réaffiche plus de message
          }
        else { // Il reste du rangement à faire
          DialogGeneral(true, 0, 3);  // alert("Il reste du chenille qu'il faut ranger. ");
          glnObject.unplug(false);  // Déconnecte le block de son parent. C.f. https://developers.google.com/blockly/reference/js/Blockly.Block#unplug
          glnMessageOn = true;
          }
        }  
      }
    else {
      // Connection du Desktop à la prise avant que tous les branchements soient corrects 
      DialogGeneral(true, 0, 4);  // alert('Il faut effectuer tout les branchement correctement au desktop avant de le connecter à la prise.');
      //glnObject.dispose(false);  // Efface l'objet
      glnObject.unplug(false);  // Déconnecte le block de son parent. C.f. https://developers.google.com/blockly/reference/js/Blockly.Block#unplug
      glnMessageOn = true;
      }
    }
  else {
    // Le desktop n'est pas branché à la prise
    glnMessageOn = true; 
    }
  }
} // showCode

// ###########################################################################

Blockly.Blocks['puzzle_desktop'] = {
//""""""""""""""""""""""""""""""""
  init: function() {
    this.jsonInit({
      "message0": bgBlockly.Msg['PUZZLE_DESKTOP_TITLE'],
      "args0": [
        {
          "type": "input_dummy"
        },
        {
          "type": "field_image",
          "src": "images/puzzle_desktop.jpg",
          "width": 100,
          "height": 100,
          "alt": "desktop"
        },
        {
          "type": "input_dummy"
        },
        {
          "type": "input_value",
          "name": "SCREEN",
          "align": "CENTRE"
        },
        {
          "type": "input_value",
          "name": "KEABORD",
          "align": "CENTRE"
        },
        {
          "type": "input_value",
          "name": "MOUSE",
          "align": "CENTRE"
        }
      ],
      "inputsInline": false,
      "output": null,
      "colour": 230,
      "tooltip": bgBlockly.Msg['PUZZLE_DESKTOP_TOOLTIP'],
      "helpUrl": ""
    });
  }
};
Blockly.JavaScript['puzzle_desktop'] = function(block) {
//====================================================
  // Ajoute la suite d'instructions
  var msg1 = Blockly.JavaScript.valueToCode(block, 'SCREEN',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  var msg2 = Blockly.JavaScript.valueToCode(block, 'KEABORD',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  var msg3 = Blockly.JavaScript.valueToCode(block, 'MOUSE',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';

  var msg = "Desktop>" + msg1 + "-" + msg2 + "." + msg3;
  return [msg, Blockly.JavaScript.ORDER_NONE];
};

// Test de définitions de blocs
Blockly.Blocks['puzzle_power_plug'] = {
//"""""""""""""""""""""""""""""""""""""
  init: function() {
    this.jsonInit({
      "message0":bgBlockly.Msg['PUZZLE_POWER_PLUG_TITLE'],
      "args0": [
        {
          "type": "input_dummy"
        },
        {
          "type": "field_image",
          "src": "images/puzzle_power_plug.jpg",
          "width": 100,
          "height": 100,
          "alt": "230 V"
        },
        {
          "type": "input_value",
          "name": "APPAREIL",
          "align": "CENTRE"
        }
      ],
      "inputsInline": false,
      "colour": 230,
      "tooltip": bgBlockly.Msg['PUZZLE_POWER_PLUG_TOOLTIP'],
      "helpUrl": ""      
    });
  }
};
Blockly.JavaScript['puzzle_power_plug'] = function(block) {
//=========================================================
// Ajoute la suite d'instructions
var msg = Blockly.JavaScript.valueToCode(block, 'APPAREIL',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
  
return "PLUG_" + msg;
};
//---------------------------------------------------------------------

function localFuncPuzzles() {
//===========================
// Pour la création d'un objets, qui créera des Blocks pour la toolbox
this.Type = [ "1000_puzzle_notebook"
             ,"1001_puzzle_screen"
             ,"1002_puzzle_keyboard"
             ,"1003_puzzle_mouse"
             ,"1004_puzzle_mouse_burned"
             ,"1005_puzzle_mouse_computer"
            ];
this.Image = [ "images/puzzle_notebook.jpg"
              ,"images/puzzle_screen.jpg"
              ,"images/puzzle_keyboard.jpg"
              ,"images/puzzle_mouse.jpg"
              ,"images/puzzle_mouse_burned.jpg"
              ,"images/puzzle_mouse_computer.jpg"
             ];
this.Alt = [ "Ordinateur portable"
            ,"Écran"
            ,"Clavier"
            ,"Souris"
            ,"Souris_grillee"
            ,"Souris"
          ];
this.Tooltip = [ "C'est un ordinateur portable"
                ,"C'est un écran"
                ,"C'est un clavier"
                ,"C'est une souris"
                ,"Souris grillée !!!"
                ,"C'est une souris"
               ];
this.Msg = [ "Portable"
            ,"Ecran"
            ,"Clavier"
            ,"LIFE"
            ,"DEAD"
            ,"LIFE"
           ];
} // localFuncPuzzles

var gloPuz = new localFuncPuzzles(); // Création de l'objet

function AddPuzzles() {
//=====================
// Adjonction automatique de puzzles
var nn = 0;
for (nn=0; nn<gloPuz.Type.length; nn++) {  
  Blockly.Blocks[gloPuz.Type[nn]] = {
    init: function() {
      var kk = parseInt(this.type) - 1000;
      this.appendDummyInput()
          .appendField(new Blockly.FieldImage(gloPuz.Image[kk], 100, 100, gloPuz.Alt[kk]), 'nameField');
      this.setOutput(true, null);
      this.setColour(90);
      this.setTooltip(gloPuz.Tooltip[kk]);
      this.setHelpUrl("");
      this.message = gloPuz.Msg[kk];
      // this.data  peut être défini avec <data>...</data> dans la toolbox ou la startbox.
      }
    };
    
  Blockly.JavaScript[gloPuz.Type[nn]] = function(block) {
    return [this.message, Blockly.JavaScript.ORDER_NONE];
    };
  
  } // for
} // AddPuzzles

AddPuzzles();
