// Adjonction de fonctionnalités à Blockly
// #######################################

// Indique le type de puzzle utilisé
gloB.puzzle_characteristics_type = "puzzle_characteristics_choice";

// Traits à tester pour les puzzles complets
// Peut être redéfini par un développeur hors librairie.
gloB.puzzle_astrAnimal = ['BEE>BEE-6', 'CAT>CAT-4', 'DUCK>DUCK-2', 'SNAIL>SNAIL-0', 'MOUSE>MOUSE-4', 'FISH>FISH-0'];

// Liste de traits. La longueur des strings représentant les traits peut être arbitraire.
// Il n'est pas nécessaire que chaque animal ait le même nombre de traits.
// Tableau de tableaux de traits. L'ordre des traits pour un animal donné ne compte pas.
gloB.puzzle_aastrCode = [ ['HON','STI','FLY'], ['FUR','WHI','RUN'], ['BEA','FEA','SWIM','FLY'], 
                          ['SHE','SLI','CRAWL'], ['FUR','WHI','RUN'], ['SCALES','GRIL','SWIM']];

// Indique qu'un minimum de 3 puzzles doivent être présent.
// Tous les puzzles présents doivent être corrects.
gloB.nNbBlocksMin = 3; // Nombre de blocks minimals pour dire que le problème est résolu.


// Test d'avoir un pointeur sur une variable en javascript.
// c.f. https://stackoverflow.com/questions/10231868/pointers-in-javascript
var aaa = 10;
var pointer = 'aaa'; // En évaluant la variable  pointer,  on a bien le contenu de la variable aaa.
function test1() {
//================
// Fonctionne très bien.
aaa += 5;
Displayln(eval(pointer)); // aaa + 5
} // test1

function test2() {
//================
// Fonctionne très bien aussi
aaa += 5;
Displayln(window[pointer]); // aaa + 5
} // test2

function test3() {
//================
Displayln('Ne fait rien, est disponible pour des tests');
} // test3


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

// ******************************************************************************

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
        ]
       ,[
          bgBlockly.Msg["XML_CHAR_MOUSE"],
          "MOUSE"
        ]
       ,[
          bgBlockly.Msg["XML_CHAR_FISH"],
          "FISH"
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
        ]
       ,[
          {
            "src": "images/mouse.jpg",
            "width": 100,
            "height": 70,
            "alt": "mouse"
          },
          "MOUSE"
        ]
       ,[
          {
            "src": "images/fish.jpg",
            "width": 100,
            "height": 70,
            "alt": "fish"
          },
          "FISH"
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

// Adjonction de traits possibles.
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
        ]
       ,[
          bgBlockly.Msg["XML_TRAITS_SLIME"],
          "SLI"
        ]
       ,[
          bgBlockly.Msg["XML_TRAITS_CRAWL"],
          "CRAWL"
        ]
       ,[
          bgBlockly.Msg["XML_TRAITS_FLY"],
          "FLY"
        ]
       ,[
          bgBlockly.Msg["XML_TRAITS_RUN"],
          "RUN"
        ]
       ,[
          bgBlockly.Msg["XML_TRAITS_GRIL"],
          "GRIL"
        ]
       ,[
          bgBlockly.Msg["XML_TRAITS_SCALES"],
          "SCALES"
        ]
       ,[
          bgBlockly.Msg["XML_TRAITS_SWIM"],
          "SWIM"
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
