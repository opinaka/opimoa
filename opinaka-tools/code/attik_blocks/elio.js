//---------------------------------------------------------
// ELIO PLAY
// The ELIO KIT visual code editor based on Google Blockly
//---------------------------------------------------------

var version = "1.5.1"; // // IO object

// BSSID -> MAC solved
// deleteValueKeyPairInput solved

var appKey;
  //dropDownStrings: [{id: "sensors", name: "sensor"},{id: "status", name: "status"},{id: "var", name: "var"},{id: "comparisonOperator", name: ""},{id: "logicOperator", name: ""},{id: "assignmentOperator", name: ""},{id: "arithmeticOperator", name: ""}],

var play = {
  colors: ["#000000","#FFFFFF","#FF8800","#FFFF00","#88FF00","#00FF00","#00FF88","#00FFFF","#0088FF","#0000FF","#8800FF","#FF0088","#FF0000"],
  notes: {'C4':262,'C#4':277,'D4':294,'D#4':311,'E4':330,'F4':349,'F#4':370,'G4':392,'G#4':415,'A4':440,'A#4':466,'B4':494,'C5':523,'C#5':554,'D5':587,'D#5':622,'E5':659,'F5':698,'F#5':734,'G5':784,'G#5':831,'A5':880,'A#5':932,'B5':988,'C6':1046,'C#6':1109,'D6':1175,'D#6':1245,'E6':1319,'F6':1397,'F#6':1480,'G6':1568,'G#6':1661,'A6':1760,'A#6':1865,'B6':1976,'C7':2093,'C#7':2217,'D7':2349,'D#7':2489,'E7':2637,'F7':2794,'F#7':2960,'G7':3136,'G#7':3322,'A7':3520,'A#7':3729,'B7':3951},
  /* groups: [
    {id: 'events', name: 'Events', color: 47}, {id: 'actions', name: 'Actions', color: 204}, {id: 'controls', name: 'Controls', color: 317}, {id: 'values', name: 'Values', color: 25}
  ], */
  categories: [
    {id: 'events', name:'Events', blocks:['on', 'thresholds', 'offset'], color: 47},
    {id: 'actions', name:'Actions', blocks:['led', 'buzzer', 'ir', 'webhook', 'port', 'system'], color: 204}, // 'vibration', 
    {id: 'controls', name:'Controls', blocks:['task', 'if', 'set', 'assignmentOperator', 'arithmeticOperator', 'comparisonOperator', 'logicOperator'], color: 317},
    {id: 'values', name:'Values', blocks:['var', 'sensors', 'status', 'ports', 'number', 'string', 'array', 'color', 'boolean'], color: 25}
  ],
  values: {},
  units: {
    "batteryVoltage": "V",
    "light": "lx",
    "tempC": "Â°",
    "tempOutC": "Â°",
    "humidity": "%",
    "pressure": "hPa",
    "altitude": "m",
    "tvoc": "ppb",
    "proximity": "cm",
    "cubePosition": "",
    "time": ""
  },
  blocks: {
    root: {
      //name: '',
      type: "object",
      output: false,
      /* dx: 20,
      dy: 20, */
      color: 317, //270,
      properties: {do: []},
      required: ['do'],
      code: {do: []},
      inline: false,
      deletable: false,
      editable: false,
      movable: true,
      tooltip: "The root of your app"
    },
    array: {
      type: "array",
      output: true,
      color: 333, //317, // 350
      code: [],
      inline: false,
      min: 0,
      deletable: false,
      editable: true,
      movable: true,
      tooltip: "A list of actions. Clic + to add actions and - to remove actions"
    },
    on: {
      name: "on",
      type: "object",
      output: true,
      color: 47,
      properties: {bootPressed:[], upPressed:[], downPressed:[], plugged:[], unplugged:[], wirelessChargingStarted:[], wirelessChargingFinished:[], sunDetected:[], sunUndetected:[], bright:[], dark:[], lowIR:[], highIR:[], near:[], far:[], hot:[], cold:[], clean:[], polluted:[], wakeup:[], tap:[], freeFall:[], dodecahedricPositionChanged:[], cubicPositionChanged:[], touchCircle: [], touchSquare: [], touchTriangle: [], touchX: [], touchLeft: [], touchRight: [], touchPlus: [], touchMinus: [], D1High: [], D1Low: [], D2High: [], D2Low: [], D3High: [], D3Low: [], D4High: [], D4Low: [], D5High: [], D5Low: [], IO2High: [], IO2Low: [], IO39High: [], IO39Low: [], IO40High: [], IO40Low: [], IO41High: [], IO41Low: [], IO44High: [], IO44Low: [] }, // doubleTap:[] // humid:[], dry:[], 
      required: [],
      code: {},
      deletable: true,
      editable: true,
      movable: true,
      tooltip: "Event manager block. Choose the event and connect to it a list of actions"
    },
    thresholds: {
      name: "thresholds",
      type: "object",
      output: true,
      color: 47,
      properties: {bright: 1, dark: 1, lowIR: 1, highIR: 1, near: 10, far: 10, hot: 30, cold: 17, pollured: 1, clean: 1}, // humid: 60, dry: 30, 
      required: [],
      code: {},
      inline: false,
      deletable: true,
      editable: true,
      movable: true,
      tooltip: "Change the thresholds for the events bright, dark, near, far, etc."
    },
    offset: {
      name: "offset",
      type: "object",
      output: true,
      color: 47,
      properties: {bright: 0, dark: 0, lowIR: 0, highIR: 0, near: 0, far: 0, hot: 0, cold: 0, pollured: 0, clean: 0}, // humid: 0, dry: 0, 
      required: [],
      code: {},
      inline: false,
      deletable: true,
      editable: true,
      movable: true,
      tooltip: "Corrects the value detected by the sensors"
    },
    task: {
      name: 'task',
      type: 'object',
      output: true,
      color: 317,
      properties: {id:1, play:1, after: 0, every: 5, do: []},
      required: ["id", "play", "do"],
      code: {id:0, play: 1, every: 5, do: []},
      values: {
        "id": {'0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9},
        "play": {'infinite': -1,'stop': 0,'1 time':1,'2 times':2,'3 times':3,'4 times':4,'5 times':5,'6 time':6,'7 times':7,'8 times':8,'9 times':9,'10 times':10},
        "after": {'0s':0,'1s':1,'2s':2,'5s':5,'10s':10,'30s':30,'1m':60,'2m':120,'5m':300,'10m':600,'30m':1800,'1h':3600,'2h':7200,'6h':21600,'12h':43200,'24h':86400},
        "every": {'0s':0,'1s':1,'2s':2,'5s':5,'10s':10,'30s':30,'1m':60,'2m':120,'5m':300,'10m':600,'30m':1800,'1h':3600,'2h':7200,'6h':21600,'12h':43200,'24h':86400},
      },
      deletable: true,
      editable: true,
      movable: true,
      tooltip: "Defines a loop to repeat a list of actions to be executed at an interval of time"
    },
    if: {
      name: 'if',
      type: 'object',
      output: true,
      color: 317,
      properties: {is: ["a","==",0], then: [], else: []},
      required: ['is', 'then'],
      code: {is: ["a","==",0], then: []},
      inline: false,
      deletable: true,
      editable: true,
      movable: true,
      tooltip: "Conditional statement that branches between two list of actions based on the result of a condition"
    },
    is: {
      type: 'array',
      output: true,
      color: 317,
      code: ["a","==",0],
      min: 3,
      inline: true,
      deletable: false,
      editable: true,
      movable: true
    },
    set: {
      name: 'set',
      type: 'array',
      output: true,
      color: 317,
      code: ["a", "=", 0],
      min: 3,
      max: 3,
      inline: true,
      deletable: true,
      editable: true,
      movable: true,
      tooltip: "Block used to assign values to variables"
    },
    speech: {
      name: 'speech',
      type: 'object',
      output: true,
      color: 204,
      properties: {"text":"", "language": "en"},
      required: ['text'],
      code: {"text":"Hello!"},
      inline: false,
      deletable: false,
      editable: true,
      movable: true,
      values: {
        "language": {
          "English (US)":"en","English (UK)":"en_GB","Deutsch":"de","EspaÃ±ol":"es","FranÃ§ais":"fr","æ—¥æœ¬èªž":"ja","Italiano":"it","PortuguÃªs":"pt_BR","ä¸­æ–‡(ç®€ä½“)":"zh_CN"
        },
        // "in":"Bahasa Indonesia","ko":"í•œêµ­ì–´","zh_TW":"ä¸­æ–‡(ç¹é«”)","tr_TR":"Turkish (Turkey)"
        //"voice": {"male":"Joey","female": "Salli"}
      },
      tooltip: "Speech a text in the selected language"
    },
    led: {
      name: 'led',
      type: 'object',
      output: true,
      color: 204,
      properties: {id:0, color:1, duration:0, brightness:255}, // doubleTap:[]
      required: [],
      code: {id:0, color:1},
      inline: false,
      deletable: true,
      editable: true,
      movable: true,
      values: {
        "id": {'All':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6}, // add values if MEDIA
        "duration": {'infinite':0,'1s':1,'2s':2,'5s':5,'10s':10,'30s':30,'1m':60,'2m':120,'5m':300,'10m':600,'30m':1800,'1h':3600,'2h':7200,'6h':21600,'12h':43200,'24h':86400},
        "brightness": {'0%':0,'10%':25,'20%':51,'30%':76,'40%':102,'50%':127,'60%':153,'70%':178,'80%':204,'90%':229,'100%':255},   
      },
      tooltip: "Action that manages the color LED chain"
    },
   /*  vibration: {
      name: 'vibration',
      type: 'object',
      output: true,
      color: 204,
      properties: {play:1}, // doubleTap:[]
      required: ['play'],
      code: {play:1},
      inline: false,
      deletable: true,
      editable: true,
      movable: true,
      values: {
        "play": {'infinite': -1,'stop': 0,'1 time':1,'2 times':2,'3 times':3,'4 times':4,'5 times':5,'6 time':6,'7 times':7,'8 times':8,'9 times':9,'10 times':10}
      }
    }, */
    buzzer: {
      name: 'buzzer',
      type: 'object',
      output: true,
      color: 204,
      properties: {frequency:440, volume:2, play: 1}, // doubleTap:[]
      required: ['frequency', 'volume'],
      code: {frequency:440, volume:2},
      inline: false,
      deletable: true,
      editable: true,
      movable: true,
      values: {
        "play": {'infinite': -1,'stop': 0,'1 time':1,'2 times':2,'3 times':3,'4 times':4,'5 times':5},
        "frequency": {'C4':262,'C#4':277,'D4':294,'D#4':311,'E4':330,'F4':349,'F#4':370,'G4':392,'G#4':415,'A4':440,'A#4':466,'B4':494,'C5':523,'C#5':554,'D5':587,'D#5':622,'E5':659,'F5':698,'F#5':734,'G5':784,'G#5':831,'A5':880,'A#5':932,'B5':988,'C6':1046,'C#6':1109,'D6':1175,'D#6':1245,'E6':1319,'F6':1397,'F#6':1480,'G6':1568,'G#6':1661,'A6':1760,'A#6':1865,'B6':1976,'C7':2093,'C#7':2217,'D7':2349,'D#7':2489,'E7':2637,'F7':2794,'F#7':2960,'G7':3136,'G#7':3322,'A7':3520,'A#7':3729,'B7':3951},
        "volume": {'0':0,'1':1,'2':2,'3':3,'4':4}
      },
      tooltip: "Action that manages the buzzer"
    },
    ir: {
      name: 'ir',
      type: 'object',
      output: true,
      color: 204, 
      properties: {command: "send", key: 0, recordTime: 5, success: [], error: []},
      required: ['command', 'key'],
      code: {command: "send", key: 0},
      inline: false,
      deletable: true,
      editable: true,
      movable: true,
      values: {
        command: {'send':'send','record':'record'},
        key: {'0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'11':11,'12':12,'13':13,'14':14,'15':15}
      },
      tooltip: "To record and send IR commands. Each command is stored in keys from 0 to 15"
    },
    webhook: {
      name: 'webhook',
      type: 'object',
      output: true,
      color: 204,
      properties: {"url":"", "values": true, "query":"q", "result":"r", "success":[], "error":[], "var":"a"},
      required: ['url', 'values'],
      code: {"url":"", "var":"a", "values": true},
      inline: false,
      deletable: false,
      editable: true,
      movable: true,
      values: {
      },
      tooltip: "Send a POST request to an URL optionally sending the values of the sensors. QUERY defines the variable to send and RESULT the variable that receive the result"
    },
    port: {
      name: "port",
      type: "object",
      output: true,
      color: 204,
      properties: {D1:0, D2:0, D3:0, D4:0, D5:0, LED:0, IO39:0, IO40:0, IO41:0},
      required: [],
      code: {},
      deletable: true,
      editable: true,
      movable: true,
      tooltip: "Sets the value of the digital ports"
    },
    system: {
      name: "system",
      type: "object",
      output: true,
      color: 204,
      properties: {D1: "OUTPUT", D2: "OUTPUT", D3: "OUTPUT", D4: "INPUT", D5: "INPUT", IO39: "OUTPUT", IO40: "OUTPUT", IO41: "OUTPUT"},
      required: [],
      code: {},
      deletable: true,
      editable: true,
      movable: true,
      tooltip: "System settings including the mode of use of the digital ports"
    },
    sensors: {
      name: 'sensor',
      type: 'string',
      output: true,
      color: 25,
      list: ['light','IRlight','proximity','tempOutC','pressure','altitude','tvoc','xRotation','yRotation','zRotation','xAcceleration','yAcceleration','zAcceleration','cubePosition', 'dodecahedronPosition'], // 'tempC','tempF','humidity',
      code: {},
      inline: true,
      deletable: true,
      editable: true,
      movable: true
    },
    status: {
      name: 'status',
      type: 'string',
      output: true,
      color: 25,
      list: ['connected','plugged','wirelessCharging','sunDetected','sunUndetected','batteryFull','batteryVoltage','batteryLow','hour','minute','second','year','month','day','weekday','time'],
      code: {},
      inline: true,
      deletable: true,
      editable: true,
      movable: true
    },
    ports: {
      name: 'port',
      type: 'string',
      output: true,
      color: 25,
      list: ['D1','D2','D3','D4','D5','LED','IO39','IO40','IO41'],
      code: {},
      inline: true,
      deletable: true,
      editable: true,
      movable: true
    },
    var: {
      name: 'var',
      type: 'string',
      output: true,
      color: 25,
      list: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
      inline: true,
      deletable: true,
      editable: true,
      movable: true
    },
    comparisonOperator: {
      type: 'string',
      output: true,
      name: '',
      color: 100,
      list: ['==', '!=', '<', '>', '<=', '>='],
      inline: true,
      deletable: true,
      editable: true,
      movable: true
    },
    logicOperator: {
      type: 'string',
      output: true,
      name: '',
      color: 100,
      list: ['and', 'or'],
      inline: true,
      deletable: true,
      editable: true,
      movable: true
    },
    assignmentOperator: {
      type: 'string',
      output: true,
      name: '',
      color: 100,
      list: ['=','+=','-=','*=','/=', "floor", "ceil", "round"],
      inline: true,
      deletable: true,
      editable: true,
      movable: true
    },
    arithmeticOperator: {
      type: 'string',
      output: true,
      name: '',
      color: 100,
      list: ['+','-','*','/'],
      inline: true,
      deletable: true,
      editable: true,
      movable: true
    }
  }
}

//-----------------------------------------------------
// Blockly JSON Generator
//-----------------------------------------------------

Blockly.JSON = new Blockly.Generator("JSON");

/* SYMBOLS */

Blockly.selectionArrow = function () { return Blockly.RTL ? "â†" : "â†’"; };
Blockly.noSymbol = function () { return Blockly.RTL ? "" : ""; };
Blockly.keyValueArrow = function () { return Blockly.RTL ? "â‡" : "â‡’"; };

/* CONSTANTS */ 

// Until Blockly 9.3.3 
Blockly.HSV_SATURATION = 0.75; // 0 (inclusive) to 1 (exclusive), defaulting to 0.45
Blockly.HSV_VALUE = 0.9; // 0 (inclusive) to 1 (exclusive), defaulting to 0.65
// From Blockly 10.0.0
/* Blockly.colour.setHsvSaturation(0.75);
Blockly.colour.setHsvValue(0.9); */


Blockly.FieldColour.COLOURS = play.colors;
Blockly.FieldColour.TITLES = ["Black","White","Red","Orange","Yellow","Green","Lime","Spring green","Light blue","Blue","Violet","Fuchsia","Purple"];
Blockly.FieldColour.COLUMNS = play.colors.length;

/*-------------------------
       BLOCKS DEFS       
-------------------------*/

var blocklyInit = function () {

  for (let blockType of ['root', 'array', 'on', 'thresholds', 'offset', 'speech', 'led', 'buzzer', 'ir', 'webhook', 'port', 'system', 'task','if', 'set']) {

    Blockly.Blocks[blockType] = {
      init: function () {
        blockInit(this);
      },
      mutationToDom: function () {
        //console.log('mutationToDom');
        // You *must* create a <mutation></mutation> element. This element can have children.
        // https://developers.google.com/blockly/guides/create-custom-blocks/extensions
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;    
      },
      domToMutation: function (xmlElement) {
        //console.log('domToMutation');
        this.itemCount_ = Number(xmlElement.getAttribute('items'));
        // This is a helper function which adds or removes inputs from the block.
        this.updateShape();
      },
      updateShape: function () {
        updateShape(this);
      },
      appendInputAndUpdate: function () {
        console.log('appendInputAndUpdate type:' +this.type + ' itemCount_:' +this.itemCount_);
        this.itemCount_ += 1;
        this.updateShape();
      },
      deleteKeyValuePairInput: function (inputToDelete) {
        deleteValueKeyPairInput(this, inputToDelete);
      }
    };
  }

  // Predefined values

  for (let blockType of ['sensors', 'status', 'ports', 'var', 'assignmentOperator', 'arithmeticOperator', 'comparisonOperator', 'logicOperator']) {

    Blockly.Blocks[blockType] = {
      init: function () {
        var setup = play.blocks[blockType]
        this.itemCount_= 0;
        var dropDownItems = [];
        for (var item of setup.list) {
          dropDownItems.push([item, item]);
        }
        this.appendDummyInput(blockType)
          .setAlign(Blockly.ALIGN_LEFT)
          .appendField(setup.name + ' ')
          .appendField(new Blockly.FieldDropdown(dropDownItems), blockType);
        this.setInputsInline(false);
        this.setOutput(true, ["element"]);
        this.setColour(setup.color);
      }
    };
  }

  // Blocks standard values

  Blockly.Blocks['number'] = {
    //id: 'number',
    init: function () {
      this.itemCount_= 0;
      this.setColour(25); // or 333
      this.setOutput(true, ["element"]);
      this.appendDummyInput()
        .setAlign(Blockly.ALIGN_LEFT)
        .appendField(new Blockly.FieldTextInput('0', Blockly.FieldTextInput.numberValidator), "number");
    }
  };

  Blockly.Blocks['string'] = {
    init: function () {
      this.itemCount_= 0;
      this.setColour(25); // or 333
      this.setOutput(true, ["element"]);
      this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField('"')
        .appendField(new Blockly.FieldTextInput(''), 'string')
        .appendField('"');
    }
  };
/* 
  Blockly.Blocks['ledcolor'] = { // obsolete?
    init: function() {
      this.itemCount_= 0;
      this.setOutput(true, ["element"]);
      this.setColour(25);
      this.appendDummyInput()
          .appendField(new Blockly.FieldColour('#FFFFFF'), 'ledcolor');
    }
  }; */

  Blockly.Blocks['color'] = {
    init: function() {
      this.itemCount_= 0;
      this.setOutput(true, ["element"]);
      this.setColour(25);
      this.appendDummyInput()
          .appendField(new Blockly.FieldColour('#FFFFFF'), 'color');
    }
  };

  Blockly.Blocks['boolean'] = {
    init: function() {
      this.itemCount_= 0;
      this.appendDummyInput("boolean")
          .appendField(new Blockly.FieldDropdown([["true","true"], ["false","false"]]), "boolean");
      this.setInputsInline(false);
      this.setOutput(true, Boolean);
      this.setColour(25); // or 333
      //this.setOutput(true, ["element"]);
    }
  };


  /* Blockly.Blocks['true'] = {
    init: function () {
      this.setColour(50);
      this.setOutput(true, ["element"]);

      this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField('true');
    }
  };

  Blockly.Blocks['false'] = {
    init: function () {
      this.setColour(20);
      this.setOutput(true, ["element"]);
      this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField('false');
    }
  }; */

  /*---------------------------
    BLOCKLY to JSON
  ---------------------------*/

  // Object blocks
  Blockly.JSON['root'] = function (block) {return updateObject(block);}
  Blockly.JSON['on'] = function (block) {return updateObject(block);}
  Blockly.JSON['thresholds'] = function (block) {return updateObject(block);}
  Blockly.JSON['offset'] = function (block) {return updateObject(block);}
  Blockly.JSON['task'] = function (block) {return updateObject(block);};
  Blockly.JSON['if'] = function (block) {return updateObject(block);};
  Blockly.JSON['speech'] = function (block) {return updateObject(block);}
  Blockly.JSON['led'] = function (block) {return updateObject(block);}
  //Blockly.JSON['vibration'] = function (block) {return updateObject(block);}
  Blockly.JSON['buzzer'] = function (block) {return updateObject(block);}
  Blockly.JSON['ir'] = function (block) {return updateObject(block);};
  Blockly.JSON['webhook'] = function (block) {return updateObject(block);}
  Blockly.JSON['port'] = function (block) {return updateObject(block);}
  Blockly.JSON['system'] = function (block) {return updateObject(block);}

  // Dropdown blocks
  Blockly.JSON['sensors'] = function (block) {return getDropDownValue(block);};
  Blockly.JSON['status'] = function (block) {return getDropDownValue(block);};
  Blockly.JSON['ports'] = function (block) {return getDropDownValue(block);};
  Blockly.JSON['var'] = function (block) {return getDropDownValue(block);};
  Blockly.JSON['assignmentOperator'] = function (block) {return getDropDownValue(block);};
  Blockly.JSON['arithmeticOperator'] = function (block) {return getDropDownValue(block);};
  Blockly.JSON['comparisonOperator'] = function (block) {return getDropDownValue(block);};
  Blockly.JSON['logicOperator'] = function (block) {return getDropDownValue(block);};

  // Standard value blocks
  Blockly.JSON['string'] = function (block) {return block.getFieldValue("string");};
  Blockly.JSON['number'] = function (block) {return Number(block.getFieldValue("number"));};

  Blockly.JSON['color'] = function (block) {
    var string_colour = block.getFieldValue('color');
    var colorConverted = play.colors.indexOf(string_colour.toUpperCase());
    return colorConverted;
  };

  Blockly.JSON['boolean'] = function (block) {
    var string_value = block.getFieldValue("boolean");
    switch (string_value) {
      case "true":
        return true;
      case "false":
        return false;
    }
  };

  /* Blockly.JSON['true'] = function (block) {return true;};
  Blockly.JSON['false'] = function (block) {return false;}; */


  /* Blockly.JSON['dictionary'] = function (block) {
    var dictionary = {};

    for (var i = 0; i < block.length; i++) {
      var pair_key = block.getFieldValue("key_field_" + i);
      var pair_value = this.generalBlockToObj(
        block.getInputTargetBlock("element_" + i)
      );

      dictionary[pair_key] = pair_value;
    }
    return dictionary;
  }; */

  //  JSON ARRAY TO WORKSPACE

  Blockly.JSON['array'] = function (block) {
    var array = [];
    for (var i = 0; i < block.itemCount_; i++) {
      var element_value = this.generalBlockToObj(block.getInputTargetBlock("element_" + i));
      if (element_value !== undefined && element_value !== null) array.push(element_value);
    }
    return array;
  };


  Blockly.JSON['set'] = function (block) {
    /* console.log('Blockly.JSON[set]');
    console.log(block); */

    var blockName = 'set';
    var defaultCode = play.blocks[blockName].code;
    var array = [];
    //console.log(' block.itemCount_');
    //console.log( block.itemCount_);
  for (var i = 0; i < block.itemCount_; i++) {
      var element_value = this.generalBlockToObj(block.getInputTargetBlock("element_" + i));
      //console.log('element_value');
      //console.log(element_value);
      array[i] = element_value;
    }
    if (block.itemCount_ == 0) { // use default array code
      var i=0;
      for (var key in defaultCode) {
          block.appendInputAndUpdate();
          //block.setFieldValue(key, 'key_field_' + i); 
          var elementConnection = block.getInput('element_' + i).connection;
          Blockly.JSON.buildAndConnect(defaultCode[key], elementConnection, key, blockName);
          i++;
      }
    }  
    var result = {};
    /* console.log('result[blockName]');
    console.log(result[blockName]);
    console.log('blockName');
    console.log(blockName);
    console.log('array');
    console.log(array); */
    result[blockName] = array;
    return result;
  };

// Create the dropDown blocks based on predefined values

for (var method in play.blocks) {
  for (var property in play.blocks[method].values) {
      var blockId = method + property;
      Blockly.Blocks[method+property] = {
        method: method, 
        property: property, 
        init: function () {dropDownBlockInit(this)} // creates the dropDown field
      };
      Blockly.JSON[blockId] = function (block) { 
        var id = block.method + block.property;
        var blockValue = block.getFieldValue(id);  // gets the value of the dropDown
        if (!isNaN(Number(blockValue))) blockValue = Number(blockValue);
        return blockValue;
      };
  }
}


} // of blocklyInit

/*---------------------------
  BLOCKLY METHODS
---------------------------*/

//  JSON -> WORKSPACE

var updateObject = function(block) {
  /* console.log('updateObject');
  console.log('block.type:'+block.type); */

  //console.log('block.itemCount_:'+block.itemCount_);
  //console.log(block)
  var defaultProperties = play.blocks[block.type].properties;
  var defaultCode = play.blocks[block.type].code;
  if (block.itemCount_ == 0) {
    // update the block in the Workspace
    var i=0;
    for (var key in defaultCode) {
        block.appendInputAndUpdate();
        block.setFieldValue(key, 'key_field_' + i); 
        var elementConnection = block.getInput('element_' + i).connection;
        Blockly.JSON.buildAndConnect(defaultCode[key], elementConnection, key, block.type);
        i++;
    }
    var result = {};
    result[block.type] = defaultCode;
    return result;
  } else {
    var updatedCode = {};
    for (var i = 0; i < block.itemCount_; i++) {
      var pair_key = block.getFieldValue("key_field_" + i);
      var pair_value = Blockly.JSON.generalBlockToObj(block.getInputTargetBlock("element_" + i));
      if (pair_key && pair_value == null) {
        // update the added property with the default value
        pair_value = defaultProperties[pair_key];
        var elementConnection = block.getInput('element_' + i).connection;
        Blockly.JSON.buildAndConnect(pair_value, elementConnection, pair_key, block.type);
      }
      updatedCode[pair_key] = pair_value;
    }
    var result = {};
    if (block.type == 'root') {
      result = updatedCode;// alert(JSON.stringify(updatedCode));
    } else 
      result[block.type] = updatedCode;
    return result;
  }
}

var getDropDownValue = function (block) {
  return block.getFieldValue(block.type);
}

var blockInit = function (block) {
  let setup = play.blocks[block.type];
  block.itemCount_ = 0; // and should remove the inputs, useful to reset the block
  block.setColour(setup.color);
  block.setOutput(setup.output, ["element"]);
  //block.appendDummyInput('open_bracket').appendField(" on ");
  if (setup.name)
    block.appendDummyInput(block.type).setAlign(Blockly.ALIGN_LEFT).appendField(setup.name + ' ');
  let addToArray = (setup.type == 'array' && (!setup.max || setup.max < block.itemCount_));
  let addToObject = (setup.type == 'object' && setup.editable);
  if (block.type !== 'root' && (setup.type == 'array' || setup.type == 'object')) {
    var appendFieldPlusIcon = new Blockly.FieldImage("media/plus.png", 15, 15, "Add", function (blockObj) {
      blockObj.sourceBlock_.appendInputAndUpdate();
      /* blockObj.sourceBlock_.itemCount_ += 1;
      appendArrayElementInput(blockObj.sourceBlock_, blockObj.sourceBlock_.itemCount_); */
    });
    block.appendDummyInput('close_bracket').appendField(appendFieldPlusIcon);
  }
  block.setInputsInline(setup.inline || false);
  block.setDeletable(setup.deletable || true);
  block.setEditable(setup.editable || true);
  block.setMovable(setup.movable || true);
  if (setup.tooltip) block.setTooltip(setup.tooltip);
  if (setup.helpUrl) block.setHelpUrl(setup.helpUrl);
}

var updateShape = function (block) {
  //console.log('updateShape');
  let setup = play.blocks[block.type];
  switch (setup.type) {
    case 'array':
      for (let i = 0; i < block.itemCount_; i++) {
        if (!block.getInput("element_" + i))
          appendArrayElementInput(block, i);
      }
    break;
    case 'object':
      for (let i = 0; i < block.itemCount_; i++) {
        if (!block.getInput("element_" + i))
          appendKeyValuePairInput(block, i);
      }
      //appendKeyValuePairInput(block);
    break;
  }

    // updateShape should be used also in the other objects

  
}

/*---------------------------
  ARRAY APPEND / DELETE
---------------------------*/

var appendArrayElementInput = function (block, lastIndex) {
  var blockName = block.type;
  var minLength = play.blocks[block.type].min;
  var maxLength = play.blocks[block.type].max;
  var appended_input = block.appendValueInput("element_" + lastIndex);
  let deleteArrayElementIcon = new Blockly.FieldImage("media/minus.png", 15, 15, "Remove", function (blockObj) {
    deleteArrayElementInput(blockObj.sourceBlock_, appended_input);
    //blockObj.sourceBlock_.deleteArrayElementInput(appended_input);
  });
  appended_input.appendField(deleteArrayElementIcon, 'delete_' + lastIndex);
  block.moveInputBefore("element_" + lastIndex, 'close_bracket');
} 

var deleteArrayElementInput = function (block, inputToDelete) {
  var inputIndexToDelete = parseInt(inputToDelete.name.match(/\d+/)[0]);
  var minLength = play.blocks[block.type].min;
  if (block.itemCount_ > minLength) {
    var inputNameToDelete = inputToDelete.name;
    var substructure = block.getInputTargetBlock(inputNameToDelete);
    if (substructure) substructure.dispose(true, true);
    block.removeInput(inputNameToDelete);
    block.itemCount_ -= 1;
    for (var i = inputIndexToDelete + 1; i <= block.itemCount_; i++) { // rename all the subsequent element-inputs
      var input = block.getInput('element_' + i);
      input.name = 'element_' + (i - 1);
    }
  }
}

/*---------------------------
  OBJECT APPEND / DELETE
---------------------------*/

var appendKeyValuePairInput = function (block, lastIndex) {
  //console.log('appendKeyValuePairInput');

  //for (let i = 0; i < block.itemCount_; i++) {
  //  var lastIndex = i;
    if (!block.getInput("element_" + lastIndex)) {

      var defaultProperties = play.blocks[block.type].properties;
      var defautRequired = play.blocks[block.type].required; //alert(JSON.stringify(defautRequired));
      var blockOptions = [];
      var optionUsed = [];

      // blockOptions gets the list of unused properties
      for (var inputItem in block.inputList) {
        if (block.inputList[inputItem].fieldRow && block.inputList[inputItem].fieldRow[1] && block.inputList[inputItem].fieldRow[1].textContent_) optionUsed.push(block.inputList[inputItem].fieldRow[1].textContent_.data); // instead of .fieldRow[1].text
      }
      for (var defaultProperty in defaultProperties) {
        if (optionUsed.indexOf(defaultProperty) == -1) blockOptions.push([defaultProperty,defaultProperty]);
      }
      /* console.log('optionUsed');
      console.log(optionUsed);
      console.log('blockOptions');
      console.log(blockOptions); */

      if (blockOptions.length > 0) { // there are unused properties
        var appended_input = block.appendValueInput('element_'+lastIndex);
        if (block.type !== 'root') {
          var minusIcon = new Blockly.FieldImage("media/minus.png", 15, 15, "Remove", function (blockObj) {
            deleteValueKeyPairInput(blockObj.sourceBlock_, appended_input);
            //block.sourceBlock_.deleteKeyValuePairInput(appended_input);
          });
          appended_input.appendField(minusIcon);
          //new Blockly.FieldTextbutton('â€“', function () { this.sourceBlock_.deleteKeyValuePairInput(appended_input); })
        }
        appended_input.appendField(new Blockly.FieldDropdown(blockOptions), 'key_field_'+lastIndex);
        if (block.type !== 'root')
          block.moveInputBefore('element_'+lastIndex, 'close_bracket');
        return appended_input;
      }
    }
  //}
}


var deleteValueKeyPairInput = function (block, inputToDelete) {
  var inputNameToDelete = inputToDelete.name;
  var inputIndexToDelete = parseInt(inputToDelete.name.match(/\d+/)[0]);
  //var minLength = play.blocks[block.type].min;
  var index = inputNameToDelete.split('element_')[1]; // = inputIndexToDelete
  var key = block.getFieldValue("key_field_" + index);
  var required = play.blocks[block.type].required.includes(key);
  if (!required) {
    //var inputNameToDelete = inputToDelete.name;
    var substructure = block.getInputTargetBlock(inputNameToDelete);
    if (substructure) substructure.dispose(true, true);
    block.removeInput(inputNameToDelete);
    var lastIndex = block.itemCount_ - 1;
    //console.log('block.itemCount_');
    //console.log(block.itemCount_);
    block.itemCount_ -= 1;
    //console.log('block.itemCount_');
    //console.log(block.itemCount_);
    //console.log('inputIndexToDelete');
    //console.log(inputIndexToDelete);

    //var input = this.getInput('element_' + inputIndexToDelete);

    for (var i = inputIndexToDelete + 1; i <= block.itemCount_; i++) { // rename all the subsequent element-inputs
      //console.log('i');
      //console.log(i);

      var input = block.getInput('element_' + i);
      //console.log('input');
      //console.log(input);
      input.name = 'element_' + (i - 1);
      //console.log('input.name');
      //console.log(input.name);
      var key_field = block.getField('key_field_' + i);
      //console.log('key_field');
      //console.log(key_field);
      key_field.name = 'key_field_' + (i - 1);
      //console.log('key_field.name');
      //console.log(key_field.name);
    }
  }
}

var dropDownBlockInit = function (block) {
  var dropDownItems = [];
  var id = block.method + block.property;
  var values = play.blocks[block.method].values[block.property];
  for (var key in values) {
    dropDownItems.push([key, String(values[key])]);
  }
  block.appendDummyInput(id)
    .setAlign(Blockly.ALIGN_LEFT)
    .appendField(block.name) // operator name
    .appendField(new Blockly.FieldDropdown(dropDownItems), id);
  block.setInputsInline(true);
  block.setOutput(true, ["element"]);
  block.setColour(25);
}; 

// BLOCKS to JSON methods

Blockly.JSON.fromWorkspace = function (workspace) {
  var json_text = "";
  var json_structure;
  var top_blocks = workspace.getTopBlocks(false); //false
  for (var i in top_blocks) {
    var top_block = top_blocks[i];

    if (top_block.type == 'root') {
      json_structure = this.generalBlockToObj(top_block);

      // root position
      let topBlockPos = top_block.getRelativeToSurfaceXY();
      if (topBlockPos.x == 0 && topBlockPos.x == 0) {
        top_block.moveBy(20,20);
      }

      // validation
      if (!Array.isArray(json_structure.do)) {
        if (typeof json_structure.do == 'object') json_structure.do = [json_structure.do];
        else if (typeof json_structure.do == 'string') json_structure.do = [];
        else if (typeof json_structure.do == 'number') json_structure.do = [];
      }
    } else {
      // unlinked code can be stored inside an object
      // stage: []
    }
  }

  if (json_structure) json_text = JSON.stringify(json_structure, null, '\t') + "\n\n";

  return json_text;

  /* 
  var currentCode = '';
 
  if (currentCode !== json_text && currentCode !== undefined) {
    currentCode = json_text;
    //Blockly.JSON.toWorkspace(currentCode, Blockly.getMainWorkspace());
    //console.log(currentCode);
    return json_text;
  } else {
    return json_text;
  } */


};

Blockly.JSON.generalBlockToObj = function (block) { // Blocks to JSON
  //console.log('generalBlockToObj');
  if (block) {
    var func = this[block.type]; // dispatcher
    if (func) {
      return func.call(this, block);
    } else {
      console.log("Don't know how to generate JSON code for a '" + block.type + "'");
    }
  } else {
    // block drag start and end without connection
    //console.log("The function generalBlockToObj requires a block parameter");
  }
};

// JSON to BLOCKS methods

Blockly.JSON.toWorkspace = function (json_structure, workspace) {
  console.log('toWorkspace');
  if (!json_structure) json_structure = play.blocks['root'].code;

  workspace.clear();
  //var startBlock = Blockly.Block.obtain(workspace, 'root');
  var startBlock = workspace.newBlock('root');
  startBlock.initSvg(); 
  startBlock.render();
  /* console.log('startBlock');
  console.log(startBlock); */

  /* var workspace = Blockly.getMainWorkspace();
  var json = {"blocks":{"blocks":[{"type":"root","id":"root","x":0,"y":0,"fields":{"do":[]}}]}};


  */

  if (json_structure.do) 
    buildAndConnectObjectProperty(startBlock, 0, 'do', json_structure.do, 'root');


  // we should save also the name of the app

//Blockly.serialization.workspaces.load(json);

    /* 

    /* //Un modo per implementare l'esecuzione parallela Ã¨ generare il codice per ogni blocco singolarmente:

    import {javascriptGenerator} from 'blockly/javascript';

    var json = Blockly.serialization.workspaces.save(workspace);

    // Store top blocks separately, and remove them from the JSON.
    var blocks = json['blocks']['blocks'];
    var topBlocks = blocks.slice();  // Create shallow copy.
    blocks.length = 0;

    // Load each block into the workspace individually and generate code.
    var allCode = [];
    var headless = new Blockly.Workspace();
    for (var i = 0; block < topBlocks.length; i++) {
      var block = topBlocks[i];
      blocks.push(block);
      Blockly.serialization.workspaces.load(json, headless);
      allCode.push(javascriptGenerator.workspaceToCode(headless));
      blocks.length = 0;
    } */

};


Blockly.JSON.buildAndConnect = function (json_structure, parentConnection, parentKey, parentType) {
  /* console.log('buildAndConnect parentKey:'+parentKey + ' parentType:'+parentType);
  console.log(json_structure); */
  //console.log(parentConnection);
  if (json_structure === null) {
      return;
  } else {
      var type = typeof (json_structure);
      if (parentKey == 'color') {type = 'color'; }
      else if (play.blocks['sensors'].list.includes(json_structure)) type = 'sensors';
      else if (play.blocks['status'].list.includes(json_structure)) type = 'status';
      else if (play.blocks['ports'].list.includes(json_structure)) type = 'ports';
      else if (play.blocks['var'].list.includes(json_structure)) type = 'var';
      else if (parentType && play.blocks[parentType] && play.blocks[parentType].values && play.blocks[parentType].values[parentKey] !== undefined) {
        var value = play.blocks[parentType].values[parentKey][json_structure];
        type = parentType+parentKey;
      } else if (type == 'string') {
        if (json_structure.startsWith('#') && json_structure.length == 7) type= 'color';
        else if (play.blocks['comparisonOperator'].list.includes(json_structure)) type = 'comparisonOperator';
        else if (play.blocks['logicOperator'].list.includes(json_structure)) type = 'logicOperator';
        else if (play.blocks['assignmentOperator'].list.includes(json_structure)) type = 'assignmentOperator';
        else if (play.blocks['arithmeticOperator'].list.includes(json_structure)) type = 'arithmeticOperator';
        //else if (play.blocks['IRcommand'].list.includes(json_structure)) type = 'IRcommand';
      } else if (type == 'object') {
        if (json_structure instanceof Array) {
          type = 'array';                
        } else if (json_structure instanceof Object) {
          if (json_structure.on) {type = 'on'; json_structure = json_structure.on;} 
          else if (json_structure.thresholds) {type = 'thresholds'; json_structure = json_structure.thresholds;}
          else if (json_structure.offset) {type = 'offset'; json_structure = json_structure.offset;}
          else if (json_structure.ir) {type = 'ir'; json_structure = json_structure.ir;}
          else if (json_structure.if) {type = 'if'; json_structure = json_structure.if;}
          else if (json_structure.set) {type = 'set'; json_structure = json_structure.set;}
          else if (json_structure.task) {type = 'task'; json_structure = json_structure.task;}
          else if (json_structure.speech) {type = 'speech'; json_structure = json_structure.speech;}
          else if (json_structure.led) {type = 'led'; json_structure = json_structure.led;}
          //else if (json_structure.vibration) {type = 'vibration'; json_structure = json_structure.vibration;}
          else if (json_structure.buzzer) {type = 'buzzer'; json_structure = json_structure.buzzer;}
          else if (json_structure.webhook) {type = 'webhook'; json_structure = json_structure.webhook;}
          else if (json_structure.port) {type = 'port'; json_structure = json_structure.port;}
          else if (json_structure.system) {type = 'system'; json_structure = json_structure.system;}
          else {type = "dictionary";}
        }
      }

      // create and connect the block
      //var targetBlock = Blockly.Block.obtain(parentConnection.sourceBlock_.workspace, type); // 


      var workspace = parentConnection.sourceBlock_.workspace;
      var targetBlock = workspace.newBlock(type);

      /* console.log('updated type:' + type);
      console.log('targetBlock');
      console.log(targetBlock); */

      targetBlock.initSvg();
      targetBlock.render();
      var childConnection = targetBlock.outputConnection; // connect the block
      parentConnection.connect(childConnection);

      switch (type) {
        default: 
        /* console.log('default type: '+type);
        console.log('json_structure');
        console.log(json_structure);
        console.log('targetBlock');
        console.log(targetBlock); */

          targetBlock.setFieldValue(String(json_structure), type); // set the value of the dropdown list
        break;
        case 'color':
          if (typeof json_structure == 'number') {
            //if (json_structure[key] > 13) json_structure[key] = 1 + Math.floor((json_structure[key]-2)/12);
            json_structure =  play.colors[json_structure];
          }
          targetBlock.setFieldValue(String(json_structure), 'color');
        break;
          // array types
        case 'set':
        case 'array':
          //console.log('set json_structure');
          //console.log(json_structure);
          for (var i in json_structure) {
              buildAndConnectArrayElement(targetBlock, i, json_structure[i], parentKey);
          }
        break;
        // object types
        case 'dictionary': // not used
        case 'buzzer':
        case 'speech':
        //case 'vibration':
        case 'led':
        case 'ir':
        case 'webhook':
        case 'port':
        case 'system':
        case 'task':
        case 'if':
        case 'on':
        case 'thresholds':
          var i = 0;
          for (var key in json_structure) {
            buildAndConnectObjectProperty(targetBlock, i, key, json_structure[key], type);
            i++;
          }
        break;
      }
  }
};

var buildAndConnectObjectProperty = function (block, index, key, value, parentType) {
  /* console.log('buildAndConnectObjectProperty index:' + index+ ' key:' + key + ' parentType:' + parentType);
  console.log('value');
  console.log(value); */
  
  //block.appendInputAndUpdate();
  block.itemCount_ += 1;
  appendKeyValuePairInput(block, index);

  block.setFieldValue(key, 'key_field_' + index);
  Blockly.JSON.buildAndConnect(value, block.getInput('element_' + index).connection, key, parentType);
}

var buildAndConnectArrayElement = function (block, index, value, parentKey) {
  /* console.log('buildAndConnectArrayElement ' +  ' index:' + index + ' parentKey:' + parentKey);
  console.log('value');
  console.log(value); */
  if (parentKey == 'is') {
    block.setInputsInline(true);
  }

  //block.appendArrayElementInput(parentKey);
  //block.appendInputAndUpdate();
  block.itemCount_ += 1;
  appendArrayElementInput(block, index);

  Blockly.JSON.buildAndConnect(value, block.getInput('element_' + index).connection, index, parentKey);
}



// -------------
// JSON AREA
// -------------

//var imwriting = false;
function workspaceChanged() {
  //console.log('workspaceChanged');

  // WORKSPACE -> LOCAL
  //var workspace = Blockly.getMainWorkspace();
  var jsonBlocks = Blockly.serialization.workspaces.save(Blockly.getMainWorkspace());
  /* console.log('jsonBlocks');
  console.log(jsonBlocks); */
  localStorage.setItem('appBlocks', JSON.stringify(jsonBlocks));

  // Update JSON area
  var jsonFromWorkspace = Blockly.JSON.fromWorkspace(Blockly.getMainWorkspace()) || '{}';
  localStorage.setItem('appJson', jsonFromWorkspace);
  //var jsonFromJSONarea = document.getElementById('json_area').value || '{}';

  window.updateJSONArea(jsonFromWorkspace);

  //if (JSON.stringify(JSON.parse(jsonFromWorkspace)) !== JSON.stringify(JSON.parse(jsonFromJSONarea)))
  //  interpretJSONarea();
  //imwriting = false;
}

window.getAppBlocks = function () {
  return JSON.parse(localStorage.getItem('appBlocks'));
}

window.getAppJson = function () {
  return JSON.parse(localStorage.getItem('appJson'));
}

window.installApp = function (runCommand) {
  if (jsonicBlocks['play'].userOut()) {
    window.location.href = '/account';
  } else {
    var element = document.querySelector('#appCode');
    var editor = ace.edit(element); 
    var jsonFromJSONarea = editor.getValue();

    if (window.JSONisValid()) {
      // AWS Publish
      var jsonApp = JSON.parse(jsonFromJSONarea);
      
      if (!jsonApp.setup) {
        if (runCommand == 'run') {
          jsonApp.setup = {
            "reset": true
          }
        }
        /* if (runCommand == 'save') {
          jsonApp.setup = {
            "reset": true,
            "save": true,
            "restart": true
          }
        } */
      }
      
      console.log('jsonApp');
      console.log(jsonApp);

      var appPath = 'run';
      if (runCommand == 'save') appPath = 'app';
      var feedback = publish(appPath, jsonApp);
      return feedback;
    } else {
      alert('Syntax error');
    }
  }
}

window.runColor = function (colorId) {
 if (jsonicBlocks['play'].userOut()) {
    window.location.href = '/account';
  } else {
    console.log('runColor');
    console.log(colorId);
    var runCode = {
      /* "setup": {
        "reset": false,
        "save": false,
        "restart": false
      }, */
      "setup": {
        "reset": true
      },
      "do": [
        {
          "led": {
            "id": 0,
            "color": colorId
          }
        }
      ]
    };
    var feedback = publish('run', runCode);
    return feedback;
  }
}

window.runNote = function (noteId) {
 if (jsonicBlocks['play'].userOut()) {
    window.location.href = '/account';
  } else {
    console.log('runNote');
    console.log(noteId);
    var runCode = {
      "setup": {
        "reset": true
      },
      "do": [
        {
          "buzzer": {
            "frequency": 440,
            "volume": 2
          }
        }
      ]
    };
    var feedback = publish('run', runCode);
    return feedback;
  }
}

/* window.installAppAndSave = function () {
  var feedback = window.installApp();
  //setTimeout(function () {
  //  window.publishCommand('save');
  //}, 1000);
} */

window.JSONisValid = function () {
  var element = document.querySelector('#appCode');
  var editor = ace.edit(element); 
  var jsonFromJSONarea = editor.getValue();
  var jsonNoNull = (jsonFromJSONarea !== 'null' && (jsonFromJSONarea.indexOf('null,') < 0));
  var jsonSyntax = (jsonFromJSONarea == JSON.stringify(JSON.parse(jsonFromJSONarea)));
  return (jsonNoNull);
}

function interpretJSONarea() {
    var element = document.querySelector('#appCode');
    var editor = ace.edit(element); 
    //imwriting = true;
    //var jsonFromJSONarea = document.getElementById('json_area').value;
    var jsonFromJSONarea = JSON.parse(editor.getValue());

    Blockly.JSON.toWorkspace(jsonFromJSONarea, Blockly.getMainWorkspace());
}

/*-----------------------
  UTILITIES
-----------------------*/

function isColor(strColor) {
  var s = new Option().style;
  s.color = strColor;
  var test1 = s.color == strColor;
  var test2 = /^#[0-9A-F]{6}$/i.test(strColor);
  if (test1 == true || test2 == true) {
    return true;
  } else {
    return false;
  }
}

var findValues = function (obj, key) {
  //return Boolean(JSON.stringify(obj).indexOf('"' + string + '":') >= 0)
  let matrix = [...JSON.stringify(obj).matchAll(new RegExp('\"?' + key + '\"?\:\s*\"([^,\"]+)', 'gi'))];
  var results = [];
  for (var element of matrix)
      results.push(element[1]);
  return results;
  //return Boolean(JSON.stringify(obj).match(new RegExp('\"?' + key + '\"?\:\s+\"' + value + '\"'))) // JSON5 compatible
}     

// -------------
// AWS
// -------------

// gets MQTT client 
function initClient() { 	 
  //console.log('initClient');

  const clientId = Math.random().toString(36).substring(7); 
  const _client = new Paho.MQTT.Client(getEndpoint(), clientId);

  // publish method added to simplify messaging 
  _client.publish = function(topic, payload) { 
  let payloadText = JSON.stringify(payload); 
  let message = new Paho.MQTT.Message(payloadText); 
  message.destinationName = topic; 
  message.qos = 0; 
  _client.send(message); 
  } 
  return _client; 
} 

function getEndpoint() { 
  //console.log('getEndpoint');
// WARNING!!! It is not recommended to expose 
// sensitive credential information in code. 
// Consider setting the following AWS values 
// from a secure source. 

        // example: us-east-1 
        const REGION = "eu-central-1";   

        // example: blahblahblah-ats.iot.your-region.amazonaws.com 
        const IOT_ENDPOINT = "a3uciqpeh5tg4c-ats.iot.eu-central-1.amazonaws.com";  

        // your AWS access key ID 
        const KEY_ID = "AKIA3MKGGM5KEW7AFGFB"; 

        // your AWS secret access key 
        const SECRET_KEY = "DOz+pzToYbeQOQPjV6eI/r929OHLxIzR7HMSivfn"; 

        // date & time 
        const dt = (new Date()).toISOString().replace(/[^0-9]/g, ""); 
        const ymd = dt.slice(0,8); 
        const fdt = `${ymd}T${dt.slice(8,14)}Z` 
        
    const scope = `${ymd}/${REGION}/iotdevicegateway/aws4_request`; 
        const ks = encodeURIComponent(`${KEY_ID}/${scope}`); 
        let qs = `X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=${ks}&X-Amz-Date=${fdt}&X-Amz-SignedHeaders=host`; 
        const req = `GET\n/mqtt\n${qs}\nhost:${IOT_ENDPOINT}\n\nhost\n${p4.sha256('')}`; 
        qs += '&X-Amz-Signature=' + p4.sign( 
        p4.getSignatureKey( SECRET_KEY, ymd, REGION, 'iotdevicegateway'), 
        `AWS4-HMAC-SHA256\n${fdt}\n${scope}\n${p4.sha256(req)}`
        ); 
        return `wss://${IOT_ENDPOINT}/mqtt?${qs}`; 
}  


function p4(){}; 
p4.sign = function(key, msg) { 
    const hash = CryptoJS.HmacSHA256(msg, key); 
    return hash.toString(CryptoJS.enc.Hex); 
}; 
p4.sha256 = function(msg) { 
    const hash = CryptoJS.SHA256(msg); 
    return hash.toString(CryptoJS.enc.Hex); 
}; 
p4.getSignatureKey = function(key, dateStamp, regionName, serviceName) { 
    const kDate = CryptoJS.HmacSHA256(dateStamp, 'AWS4' + key); 
    const kRegion = CryptoJS.HmacSHA256(regionName, kDate); 
    const kService = CryptoJS.HmacSHA256(serviceName, kRegion); 
    const kSigning = CryptoJS.HmacSHA256('aws4_request', kService); 
    return kSigning; 
};  


function getClient(success) { 
    //console.log('getClient');
    if (!success) success = ()=> console.log("AWS connected"); 
    const _client = initClient(); 
    const connectOptions = { 
    useSSL: true, 
    timeout: 3, 
    mqttVersion: 4, 
    onSuccess: success 
    }; 
    _client.connect(connectOptions); 
    return _client;  
}  
 
function publish(appPath, jsonApp) {
  //var selectedDevice = window.deviceToMac(localStorage.getItem('device'));
  var selectedDevice = localStorage.getItem('device');
  if (selectedDevice && selectedDevice !== '') {
      console.log('AWS publish to: ' + "/" + selectedDevice + "/" + appPath);
      console.log(jsonApp);
      var feedback = client.publish("/" + selectedDevice + "/" + appPath, jsonApp); 
      if (feedback) console.log(feedback);
    return feedback
  } else { 
    jsonic.alert('Select a device');
  }
}



window.publishCommand = function (command) {
  //var selectedDevice = window.deviceToMac(localStorage.getItem('device'));
  var selectedDevice = localStorage.getItem('device');
  if (selectedDevice && selectedDevice !== '') {
    //console.clear();
    console.log('AWS publish to:' + "/" + selectedDevice + "/command");
    var commandObj = {name: command, time: getTimestamp()};
    console.log(commandObj);
    var feedback = client.publish("/" + selectedDevice + "/command", commandObj); 
    if (feedback) console.log(feedback);
    return feedback
  } else {
    jsonic.alert('Select a device');
  }
}

window.selectDevice = function (deviceId) { // window.subscribeDevice = 
  console.log('selectDevice');
  localStorage.setItem('device',deviceId);
  //var selectedDevice = window.deviceToMac(localStorage.getItem('device'));
  //var selectedDevice =localStorage.getItem('device');
  if (deviceId && deviceId !== '') {
    console.log('AWS subscribe topic: '+'/'+deviceId+'/values');
    var feedback = subscribe('/'+deviceId+'/values');
    if (feedback) console.log(feedback);
  } else {
    console.log('Select a device');
  }
}

window.newDevice = function (macAddress) {
  //alert(macAddress);
  // to uppercase
  macAddress = macAddress.toUpperCase();
  if (macAddress.length == 12) {
    macAddress = macAddress.substring(0,2) + ':' + macAddress.substring(2,4) + ':' + macAddress.substring(4,6) + ':' + macAddress.substring(6,8) + ':' + macAddress.substring(8,10) + ':' + macAddress.substring(10,12);
  }
  //localStorage.setItem('device',macAddress);
  window.selectDevice(macAddress);
}

window.deviceToMac = function (deviceId) {
  return self.replaceAll(deviceId, '-', ':');
}

window.macToDevice = function (macId) {
  return self.replaceAll(macId, ':', '-');
}

function subscribe(path) {
  //console.log('subscribe');
  if (client) {
    return client.subscribe(path);
  } else {
    return 'AWS client not ready for subscribtion';
  } 
}


var epochToTime = function (epoch) {
  if (epoch) {
    var myDate = new Date( epoch *1000);
    var myDateString = myDate.toLocaleString();
    var myDateArray = myDateString.split(' ');
    return myDateArray[1];
  } else {
    return undefined
  }
}

/* var setLiveVar = function (id, value) {
  console.log('setLiveVar'+id+':'+value);
  var element = document.querySelector('#liveValue'+id);
  if (value !== undefined) {
    jsonic.show({selector:'#liveButton'+id});
    element.innerHTML = String(value);
  } else {
    //var element = document.querySelector('#liveButton'+id);
    jsonic.hide({selector:'#liveButton'+id});
  }
} */


var setLiveValue = function (id, value) {
  if (value !== undefined) {
    if (play.units[id]) value += play.units[id];
  } else {
    value = '';
  }
  /* var element = document.querySelector('#liveValue'+id);
  if (element && value) element.innerHTML = String(value); */
  //var element = document.querySelector('#liveVal'+id);
  var selectedDevice = localStorage.getItem('device');
  var element = document.querySelector('.liveValue[data-device="'+selectedDevice+'"][data-id="'+id+'"]');; // works
  if (element && value) element.innerHTML = String(value);
}


var setLiveFlag = function (id, value) {
  var selectedDevice = localStorage.getItem('device');
  //console.log('setLiveFlag id:'+ id+' value:'+ value+' device:'+ selectedDevice);
  if (id !== undefined) {
    if (!value || value == "0") {
      jsonic.run({
        "do": [
          {"attr": {"selector": '.liveFlag[data-value="'+selectedDevice+'-'+id+'"]', "removeClass": "bg-[#E58139]"}},
          {"attr": {"selector": '.liveFlag[data-value="'+selectedDevice+'-'+id+'"]', "removeClass": "text-[white]"}},
          {"attr": {"selector": '.liveFlag[data-value="'+selectedDevice+'-'+id+'"]', "addClass": "text-[#E58139]"}}
        ]
      });
    } else {
      jsonic.run({
        "do": [
          {"attr": {"selector": '.liveFlag[data-value="'+selectedDevice+'-'+id+'"]', "addClass": "bg-[#E58139]"}},
          {"attr": {"selector": '.liveFlag[data-value="'+selectedDevice+'-'+id+'"]', "removeClass": "text-[#E58139]"}},
          {"attr": {"selector": '.liveFlag[data-value="'+selectedDevice+'-'+id+'"]', "addClass": "text-[white]"}}
        ]
      });
    }

    /* var element = document.querySelector('.liveFlag[data-value="'+selectedDevice+'-'+id+'"]');
    //var element = document.querySelector('[data-device="'+selectedDevice+'"][data-id="'+id+'"]');; // works
    if (element) {
      //jsonic.show({selector:'#liveButton'+id});
      if (!value || value == "0") {
        element.classList.remove('bg-[#E58139]');
        element.classList.remove('text-[white]');
      } else { 
        element.classList.add('bg-[#E58139]');
        element.classList.add('text-[white]');
      }
    } else { 
      console.log('element not defined in setLiveFlag');
    } */
  } else 
    console.log('id not defined in setLiveFlag');
}

//var data = {values: {}}; // WARNING: data is reserved root object

var batteryPercent = function (batteryVoltage) {
  var batP = Math.round(123-123/Math.pow(1+Math.pow(Number(batteryVoltage)/3.7,80),0.270));  // 0.165 -> 0.25
  //if (batP > 100) batP = 100;
  return batP;

  /* var batteryVoltageRounded = Math.round(play.values.batteryVoltage*100)/100;
  switch (value) {
    case "events":
    tb.setSelectedItem(tb.getToolboxItemById('blockly-0'));
    break;
  return Math.round((111.11 * Number(batteryVoltage) - 233.33));  */
}

window.deviceAlive = false;

window.deviceUnreachable = function () {
  if (!window.deviceAlive) {
    jsonic.run({
      "do": [
        {"attr": {"selector": ".liveFlag", "removeClass": "text-[#E58139]"}},
        {"attr": {"selector": ".liveFlag", "removeClass": "border-[#E58139]"}},
        {"attr": {"selector": ".liveFlag", "removeClass": "bg-[#E58139]"}},
        {"attr": {"selector": ".liveFlag", "removeClass": "text-[white]"}}
      ]
    });
  }
}

var processMessage = function (message) { 
  console.log('AWS processMessage');
  //console.log(message);
  window.deviceAlive = true;

  play.values = JSON.parse(message.payloadString);
  console.log(play.values);

  if (!play.values.version) play.values.version = '';
  if (play.values.proximity == 0) play.values.proximity = '-'; else play.values.proximity = Math.round(play.values.proximity);

  jsonic.run({
    "do": [
      {"clearTimeout": {"name": "deviceUnreachable"}},
      {"attr": {"selector": ".liveFlag", "addClass": "text-[#E58139]"}},
      {"attr": {"selector": ".liveFlag", "addClass": "border-[#E58139]"}}
    ]
  });

  jsonic.json.data.play = play;
  //document.querySelector('.liveValue[data-value=["tempC"]').innerHTML = 2;
  setLiveFlag('plugged', play.values.plugged);
  setLiveFlag('wirelessCharging', play.values.wirelessCharging);
  //setLiveFlag('sunDetected', play.values.sunDetected);
  setLiveValue('batteryVoltage', (Math.round(Number(play.values.batteryVoltage)*100)/100).toFixed(2));
  //setLiveValue('batteryVoltage', batteryPercent(play.values.batteryVoltage));
  setLiveValue('light', Math.round(play.values.light));
  //setLiveValue('tempC', Math.round(play.values.tempC*10)/10);
  //setLiveValue('humidity', Math.round(play.values.humidity*10)/10);
  setLiveValue('tempOutC', Math.round(play.values.tempOutC*10)/10);
  setLiveValue('pressure', Math.round(play.values.pressure));
  setLiveValue('altitude', Math.round(play.values.altitude));
  setLiveValue('tvoc', Math.round(play.values.tvoc));
  setLiveValue('proximity', play.values.proximity);
  setLiveValue('cubePosition', play.values.cubePosition);
  setLiveValue('time', epochToTime(play.values.time));
  setLiveValue('version', 'Firmware: '+play.values.version);

} 

var getTimestamp = function () {
  // we need also an API to get the time
  // like .getTime()?
  return Math.floor(Date.now());
}

//-------------------------
// INIT (Blockly and AWS)
//-------------------------

let client = {}; 
var mainWorkspace = null;

var init = function () { 
    console.log('ELIO Play Version: '+ version);

    // BLOCKLY
    blocklyInit();
    blocklyToolbox();

    mainWorkspace = Blockly.inject(document.getElementById('blocklyDiv'), {
        //rtl: true,
        toolbox: blocklyToolbox(), //document.getElementById('toolbox'), // toolbox
        //media: 'media/',    // to avoid reaching to the web for icons
        sounds: true,
        collapse: true,
        comments: true,
        disable: false,
        scrollbars: true,
        trashcan: false // those ones are automatically true when there are categories
    });
    mainWorkspace.addChangeListener(workspaceChanged);

    // Custom categories TOOLBOX
    jsonic.run(blocklyToolboxApp);


 /*    var workspace = Blockly.getMainWorkspace();
    workspace.addChangeListener(workspaceChanged); */

    // From LOCAL to WORKSPACE
    /* var jsonBlocks = localStorage.getItem('appBlocks');
    if (jsonBlocks) {
      jsonBlocks = JSON.parse(jsonBlocks);
      var feedback = Blockly.serialization.workspaces.load(jsonBlocks, workspace);
    } else {
      var jsonAppDefault = {"do": []};
      Blockly.JSON.toWorkspace(jsonAppDefault, Blockly.getMainWorkspace()); 
    } */
/* 
    var localApp = localApp = {"do": []};
    Blockly.JSON.toWorkspace(localApp, Blockly.getMainWorkspace()); 
    var workspace = Blockly.getMainWorkspace();
    workspace.addChangeListener(workspaceChanged);
    //document.getElementById("json_area").addEventListener("input", (event) => interpretJSONarea()); */

        
    // AWS
    // https://github.com/aws-samples/aws-iot-examples/blob/master/mqttSample/js/app.js

    client = getClient(awsConnected); 
    client.onMessageArrived = processMessage; 
    client.onConnectionLost = function(e) { 
        console.log(e); 
        window.deviceUnreachable();
    }

    processMessage(); 

}  

var blocklyToolbox = function () {
  var toolbox = {
    "kind": "categoryToolbox",
    "contents": []
  };
  for (let category of play.categories) {
    var catContents = [];
    for (let blockName of category.blocks) {
      catContents.push({"kind": "block", "type": blockName});
    }
    toolbox.contents.push({"kind": "category", "name": category.name, "contents": catContents});
  }
  return toolbox;
  /* console.log('toolbox');
  console.log(toolbox); */  
}

/* window.newAppKey = function () {
  // APP
  appKey = localStorage.getItem('appKey');
  if (!appKey) {
    alert('getAppKey');
    jsonic.run(getAppKey);
  } else {
    alert(appKey);
  }
} */
 

window.selectBlocklyCategory = function (value) {
  console.log('selectBlocklyCategory');
  console.log(value);
  var workspace = Blockly.getMainWorkspace();
  //Code.workspace.verticalFlyout.CORNER_RADIUS;
  var tb = workspace.getToolbox();
  switch (value) {
    case "events":
    tb.setSelectedItem(tb.getToolboxItemById('blockly-0'));
    break;
    case "actions":
    tb.setSelectedItem(tb.getToolboxItemById('blockly-1'));
    break;
    case "controls":
    tb.setSelectedItem(tb.getToolboxItemById('blockly-2'));
    break;
    case "values":
    tb.setSelectedItem(tb.getToolboxItemById('blockly-3'));
    break;
  }
}


var awsConnected = function () {
  console.log('AWS connected');
  var device = localStorage.getItem('device');
  if (device)
    window.selectDevice(device);

}



// BLOCKLY

window.myVersion = function() {
    return x2js.getVersion();
}

window.convertXml2JSon = function (xmlText) {
    //console.log('convertXml2JSon');
    //console.log(xmlText);
    var x2js = new X2JS();
    var jsonCode = x2js.xml_str2json(xmlText);
    return jsonCode;
}

window.convertJSon2XML = function(jsonText) {
    console.log('convertJSon2XML');
    if (X2JS) {
      var x2js = new X2JS();
      if (!x2js) alert();
      //var jsonBlocks = JSON.parse(jsonText);
      /* console.log('%c'+'jsonBlocks', 'color:red');
      console.log(jsonBlocks); */
      if (typeof jsonText !== 'object') {
        jsonText = JSON.parse(jsonText);
      }
      console.log('jsonText');
      console.log(jsonText);
      //console.log(x2js.json2xml_str(jsonText));
      //return x2js.json2xml_str($.parseJSON(jsonText));
      //return x2js.json2xml_str(x2js.parseXmlString(jsonText)); /* DOESN'T WORK*/
      var xmlCode = x2js.json2xml_str(jsonText);
      console.log(xmlCode);
      return xmlCode; /* YES */
  } else {
    console.log('X2JS library required');
  } 
}

var  localAppSetup = function () {
  var appSetup = localStorage.getItem('appSetup');
  if (appSetup) {
    return JSON.parse(appSetup);
  } else {
    return {}
  }
}

var localAppBlocks = function () {
  var appBlocks = localStorage.getItem('appBlocks');
  if (appBlocks) {
    return JSON.parse(appBlocks);
  } else {
    return false
  }
}

window.restoreApp = function() {
  var appKey = localStorage.getItem('appKey');
  var appSetup = window.localAppSetup();
  var appBlocks = window.localAppBlocks();
  window.loadBlocks(appBlocks);
}

window.loadBlocks = function(appBlocks) {
  /* console.log('loadBlocks');
  console.log(appBlocks); */
  if (appBlocks) {
    try {
      var feedback = Blockly.serialization.workspaces.load(appBlocks, Blockly.getMainWorkspace());
    } catch (e) {
      console.log('loadBlocks error catch:');
      console.log(e);
      //return false;
    }
  }
}

window.newApp = function() {
  //workspace.removeChangeListener(workspaceChanged);
  Blockly.JSON.toWorkspace({"do": []}, Blockly.getMainWorkspace()); 
  //workspace.clear(); needed?
  //workspace.addChangeListener(workspaceChanged);
}

window.openApp = function(appJson) {
  // xml is the same block xml you stored
  console.log('openApp');
  console.log(appJson);
  //window.updateJSONArea(appJson);
  Blockly.JSON.toWorkspace(appJson, Blockly.getMainWorkspace());

  //localStorage.setItem('appSetup', JSON.stringify(appObj.setup));
/*   localStorage.removeItem('blocks');
  localStorage.removeItem('json'); */

/*   // From LOCAL to WORKSPACE
  if (appBlocks) {
    window.loadBlocks(appBlocks);
    //window.updateJSONArea(appObj.json);
    //localStorage.setItem('json', JSON.stringify(appObj.json));
  } else {
    // should load a default blocks app
  } */


} 


window.updateJSONArea = function(jsonObj) {
  var editor = ace.edit(document.querySelector('#appCode')); // ACE Editor
  var jsonFromJSONarea = editor.getValue();
  if (JSON.stringify(JSON.parse(jsonObj)) !== JSON.stringify(jsonFromJSONarea))
    editor.setValue(jsonObj, -1);
}


/* window.loadXMLApp = function(xml) {
  // xml is the same block xml you stored
  console.log('loadXMLApp');
  console.log(xml);
  if (typeof xml != "string" || xml.length < 5) {
      return false;
  }
  try {
      console.log('try');

      const xmlStr = xml;
      const parser = new DOMParser();
      const xmlObj = parser.parseFromString(xmlStr, "application/xml");

      Blockly.getMainWorkspace().clear();
      var dom = Blockly.Xml.textToDom(xml);
      Blockly.Xml.domToWorkspace(Blockly.getMainWorkspace(), dom);

      //Blockly.JSON.toWorkspace(localApp, Blockly.getMainWorkspace()); 

      return true;
  } catch (e) {
      console.log('catch');
      console.log(e);
      //return false;
  }
} */
 

/**
 * Discard all blocks from the workspace.
 */

var methods = {
  discard: function() {
    var workspace = Blockly.getMainWorkspace(); //workspace;
    /* console.log('workspace');
    console.log(Blockly.getMainWorkspace()); */
    var count = workspace.getAllBlocks(false).length;
    console.log('blocks count:'+count);
    if (count < 2) {// || window.confirm(Blockly.Msg['DELETE_ALL_BLOCKS'].replace('%1', count))) {
        workspace.clear();
        if (window.location.hash) {
          window.location.hash = '';
        }
    } else {
      if (Blockly.selected && Blockly.selected.isDeletable()) {
          Blockly.hideChaff();
          Blockly.selected.dispose(true, true);
      }
    }
  },
  undo: function() {
    var workspace = Blockly.getMainWorkspace(); //workspace;
    workspace.undo(false);
  },
  redo: function() {
    var workspace = Blockly.getMainWorkspace(); //workspace;
    workspace.undo(true);
  }
}

// -------------
// JSONIC
// -------------

var jsonicBlockCode;
        
jsonicBlockCode = {
    "setup": {
        "log": true,
        "modules": [
          {
              "name": "resources",
              "url": "https://jsonic.io/app/modules/lib/resources.json"
          },
          {
              "name": "base",
              "url": "https://jsonic.io/app/modules/lib/base.json"
          },
          {
            "name": "icons",
            "url": "https://jsonic.io/app/modules/lib/icons.json"
          },
          {
              "name": "elio.icons",
              "url": "https://eliokit.com/app/modules/elio.icons.json"
          }
      ],
      "config": {
        "tailwindcss": {
            "theme": {
                "colors": {
                    "devices": "#E25356",
                    "apps": "#F79940",
                    "events": "#F7BC34",
                    "controls": "#C3C63A",
                    "sensors": "#75BC60",
                    "actions": "#4596D8",
                    "math": "#636CD6",
                    "variables": "#B365AE",
                    "sounds": "#E15EAC",
                    "private": "#39A0E5",
                    "shared": "#75BC60",
                    "published": "#75BC60",
                    "pending": "#39A0E5",
                    "review": "#B365AE",
                    "info": "#E25356"
                },
                "fontFamily": {
                    "sans": [
                        "Quicksand",
                        "sans-serif"
                    ]
                },
                "screens": {
                    "sm": "640px",
                    "md": "768px",
                    "lg": "1024px",
                    "xl": "1280px",
                    "2xl": "1536px"
                },
                "spacing": {}
            },
            "corePlugins": {
                "preflight": false
            },
            "extend": {
            },
            "prefix": ""
        }
    },
    "firebase": {
          "apiKey": "AIzaSyDpau68VWxqRaFC25YKB4DARKw3255ajg0",
          "authDomain": "elio-311317.firebaseapp.com",
          "databaseURL": "https://elio-311317-default-rtdb.firebaseio.com",
          "projectId": "elio-311317",
          "storageBucket": "elio-311317.appspot.com",
          "messagingSenderId": "65847941940",
          "appId": "1:65847941940:web:c15a4c8df81732aa966361"
      }
    },
    "plugins": [
      {
        "name": "@firebase/database",
        "version": "8.6.8"
      },
      {
        "name": "@firebase/auth",
        "version": "8.6.8"
      },
      {
        "name": "iconify",
        "version": "2.1.0"
      },
      {
        "name": "ace-builds",
        "version": "1.5.0"
      }/* ,
      {
        "name": "blockly",
        "version": ""
      } */
    ],
    "on": {
      "init": [
        {
          "firebase": {
              "initializeApp": "{setup firebase}"
          }
        },
        {
          "database": {
              "do": "init"
          }
        },
        {
          "auth init": {
            "onAuthStateChanged": [
              {
                "if": {
                  "is": "{user:in}",
                  "then": [
                    {
                      "set": {
                        "data user": {
                          "id": "{user:uid}",
                          "name": "{user:displayName}",
                          "photo": "{user:photoURL}"
                        }
                      }
                    },
                    {
                      "auth:userIcon": {
                      }
                    },
                    {
                      "if": {
                        "not": "{local:appKey}",
                        "then": [
                          {
                            "elio:new": {
                            }
                          }
                        ],
                        "else": [
                          {
                            "elio:restore": {
                            }
                          }
                        ]
                      }
                    },
                    {
                      "if": {
                        "not": "{local:appGroup}",
                        "then": [
                          {
                            "local set": {
                              "appGroup": "dev"
                            }
                          }
                        ]
                      }
                    },
                    {
                      "elio:list": {
                        "setup": {
                          "group": "dev",
                          "database": {
                            "path": "appsdev",
                            "orderByChild": "user/id",
                            "equalTo": "{user:uid}"
                          },
                          "selector": ".appsList"
                        }
                      }
                    },
                    {
                      "elio:devicesList": {
                        "setup": {
                          "database": {
                            "path": "devices",
                            "orderByChild": "user/id",
                            "equalTo": "{user:uid}"
                          },
                          "selector": ".devicesList"
                        }
                      }
                    },
                    {
                      "elio:updateButtons": {
                        "setup": {
                          "group": "{local:appGroup}"
                        }
                      }
                    },
                    {
                        "console": {
                          "log": "Logged in: {user:displayName}",
                          "color": "green"
                        }
                    }
                  ],
                  "else": [
                    {
                      "alert": {
                        "title": "Login required",
                        "text": "Redirecting to login page",
                        "timer": 1000
                      }
                    },
                    {
                      "link": "/account"
                    }
                  ]
                }
              }
            ]
          }
        },


        {
          "html": [
            {
              "selector": ".devicesHeader",
              "jsonic:button": {
              "setup": {
                  "id": "deviceListButton",
                  "color": "#713089",
                  "class": "select-none",
                  "background": "white",
                  "size": "40px",
                  "icon": "jsonic:menu",
                  "text": {
                    "lang": {
                        "en": "List",
                        "it": "Lista"
                    }
                  },
                  "on": {
                    "mousedown": [
                      {
                        "html": {
                          "selector": "#deviceName",
                          "empty": true,
                          "html": {
                            "lang": {
                                "en": "My devices",
                                "it": "I miei dispositivi"
                            }
                          }
                        }
                      },
                      {
                        "attr": {
                          "selector": "#deviceListButton",
                          "addClass": "invisible"
                        }
                      },
                      {
                        "attr": {
                          "selector": "#devicesList",
                          "removeClass": "hidden"
                        }
                      },
                      {
                        "elio:closeDevice": {
                        }
                      }
                    ]
                  }
                }
              }
            },
            {
              "selector": ".devicesHeader",
              "div id=deviceName text-[#713089] text-ellipsis whitespace-nowrap overflow-hidden": " "
            },
            { 
              "selector": ".devicesHeader",
              "jsonic:button": {
              "setup": {
                  "id": "devicesNew",
                  "class": "select-none",
                  "color": "#713089",
                  "background": "white",
                  "size": "40px",
                  "icon": "jsonic:plus",
                  "text": {
                    "lang": {
                        "en": "Add",
                        "it": "Aggiungi"
                    }
                  },
                  "on": {
                    "mousedown": [
                      {
                        "elio:newDevice": {}
                      }
                    ]
                  }
                }
              }
            }
          ]
        },
      

        {
          "html": [
            {
              "selector": ".appsHeader",
              "div": [
                {
                  "html": [
                    {
                      "jsonic:button": {
                        "setup": {
                            "id": "dev",
                            "class": "appsSwitchButtons elioButtonActive select-none",
                            "color": "#713089",
                            "background": "white",
                            "size": "40px",
                            "icon": "jsonic:lock",
                            "text": {
                              "lang": {
                                  "en": "Private",
                                  "it": "Private"
                              }
                            },
                            "on": {
                              "mousedown": [
                                {
                                  "elio:updateUI": {
                                    "setup": {
                                      "group": "dev"
                                    }
                                  }
                                }
                              ]
                            }
                        }
                      }
                    },
                    {
                      "jsonic:button": {
                      "setup": {
                          "id": "pub",
                          "class": "appsSwitchButtons select-none",
                          "color": "#713089",
                          "background": "white",
                          "size": "40px",
                          "icon": "jsonic:share",
                          "text": {
                            "lang": {
                                "en": "Shared",
                                "it": "Condivise"
                            }
                          },
                          "on": {
                            "mousedown": [
                              {
                                "elio:updateUI": {
                                  "setup": {
                                    "group": "pub"
                                  }
                                }
                              }
                            ]
                          }
                        }
                      }
                    }
                  ]
                },
                {
                  "jsonic:button": {
                  "setup": {
                      "id": "appsNew",
                      "class": "select-none",
                      "color": "#713089",
                      "background": "white",
                      "size": "40px",
                      "icon": "jsonic:plus",
                      "text": {
                        "lang": {
                            "en": "New",
                            "it": "Nuova"
                        }
                      },
                      "on": {
                        "mousedown": [
                          {
                            "elio:new": {}
                          }
                        ]
                      }
                    }
                  }
                }
              ]
            }
          ]        

        },

        {
            "html": {
              "selector":{
                  "class": "play",
                  "data-value": "header"
              },
              "div": {
                  "attr": {
                      "class": "headerBar",
                      "data-value": "icons"
                  },
                  "style": {
                      "background": "#713089",
                      "border-right": "1px solid #1E1F28"
                  },
                  "html": [
                    {
                      "div": {
                        "attr": {
                            "id": "appButtons",
                            "class": "inline-flex"
                        },
                        "html": [
                          {
                            "jsonic:button": {
                              "setup": {
                                "id": "devices",
                                "class": "elioButtonActive select-none",
                                "color": "#713089",
                                "background": "white",
                                "icon": "elio:logo",
                                "size": "40px",
                                "text": {
                                  "lang": {
                                      "en": "Device",
                                      "it": "Device"
                                  }
                                },
                                "on": {
                                    "mousedown": [
                                      {
                                        "attr": {
                                          "selector": "#devices",
                                          "toggleClass": "elioButtonActive"
                                        }
                                      },
                                      {
                                        "attr": {
                                          "selector": "#code",
                                          "removeClass": "elioButtonActive"
                                        }
                                      },
                                      {
                                        "attr": {
                                          "selector": "#apps",
                                          "removeClass": "elioButtonActive"
                                        }
                                      },
                                      {
                                        "elio:updatePlayUI": {
                                        }
                                      }
                                    /*   {
                                        "alert": {
                                          "title": "Device",
                                          "text": "Add the address of your device",
                                          "input": "text",
                                          "inputLabel": "MAC address",
                                          "inputValue": "{js:selectedDevice}",
                                          "inputPlaceholder": "{00:00:00:00:00:00}",
                                          "footer2": "You can obtain the MAC address installing the firmware",
                                          "cancelButtonText": "Cancel",
                                          "confirmButtonText": "Confirm",
                                          "showConfirmButton": true,
                                          "showCancelButton": true,
                                          "on": {
                                            "value": [
                                              {
                                                "js": "window.selectDevice();"
                                              },
                                              {
                                                "set": {
                                                  "data selectedDevice": "{alert:value}"
                                                }
                                              },
                                              {
                                                "local set": {
                                                  "device": "{alert:value}"
                                                }
                                              },
                                              {
                                                "html_commented": {
                                                  "selector": {
                                                    "id": "deviceName"
                                                  },
                                                  "text": "{alert:value}"
                                                }
                                              },
                                            ]
                                          }
                                        }
                                      } */
                                    ]
                                }
                              }
                            }
                          },
                          {
                            "jsonic:button": {
                              "setup": {
                                "class": "select-none",
                                "id": "apps",
                                "color": "#713089",
                                "background": "white",
                                "icon": "elio:apps",
                                "size": "40px",
                                "text": {
                                  "lang": {
                                      "en": "App",
                                      "it": "App"
                                  }
                                },
                                "on": {
                                  "mousedown": [
                                    {
                                      "attr": {
                                        "selector": "#apps",
                                        "toggleClass": "elioButtonActive"
                                      }
                                    },
                                    {
                                      "attr": {
                                        "selector": "#code",
                                        "removeClass": "elioButtonActive"
                                      }
                                    },
                                    {
                                      "attr": {
                                        "selector": "#devices",
                                        "removeClass": "elioButtonActive"
                                      }
                                    },
                                    {
                                      "elio:updatePlayUI": {
                                      }
                                    }
                                  ]
                                }
                              }
                            }
                          }
                        ]
                      }
                    },
                    {
                      "div": {
                          "attr": {
                              "id": "tasksButtons",
                              "class": "inline-flex"
                          },
                          "html": [
                          /*    {
                                "for": {
                                    "name": "item",
                                    "of": [
                                        //"history",
                                        "remove",
                                        "undo",
                                        "redo"
                                    ],
                                    "html": {
                                      "div": {
                                          "attr": {
                                              "class": "playIcon",
                                              "data-value": "{item}"
                                          },
                                          "i": {
                                              "attr": {
                                                  "class": "iconify",
                                                  "data-icon": "elio:{item}",
                                                  "data-value": "{item}",
                                                  "data-inline": "true"
                                              },
                                              "style": {
                                                  "color": "#713089",
                                                  "background": "white",
                                                  "font-size": "40px",
                                                  "margin": "5px",
                                                  "border-radius": "800px"
                                              }
                                          },
                                          "on": {
                                            "mousedown": {
                                                "switch": {
                                                  "expression": "{on:target.dataset.value}",
                                                  "cases": {
                                                    "undo": {
                                                      "js": "methods.undo()"
                                                    },
                                                    "redo": {
                                                      "js": "methods.redo()"
                                                    },
                                                    "remove": {
                                                      "js": "methods.discard()"
                                                    }
                                                }
                                              }
                                            }
                                          }
                                      }
                                    }
                                }
                            }, */
                            {
                              "jsonic:button": {
                                "setup": {
                                  "id": "runButton",
                                  "class": "headerButton hidden text-[#713089] active:text-[white] bg-[white] active:bg-[#713089] active:border-[white] select-none",
                                  "icon": "elio:run",
                                  "size": "40px",
                                  "text": {
                                      "lang": {
                                          "en": "Run",
                                          "it": "Esegui"
                                      }
                                  },
                                  "on": {
                                      "mousedown": [
                                        {
                                          "if": {
                                            "is": "{js:window.JSONisValid()}",
                                            "then": [
                                              {
                                                "js": "window.installApp('run')"
                                              },
                                              {
                                                  "set": {
                                                      "var.ts": "{time:timestamp}"
                                                  }
                                              }
                                            ],
                                            "else": [
                                              {
                                                "alert": {
                                                  "title": "Syntax error",
                                                  "text": "The app includes null objects or invalid syntax",
                                                  "confirmButtonText": "Ok",
                                                  "showConfirmButton": true
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      ]
                                  }
                                }
                              }
                            },
                            {
                              "jsonic:button": {
                                "setup": {
                                  "id": "saveButton",
                                  "class": "headerButton hidden text-[#713089] active:text-[white] bg-[white] active:bg-[#713089] active:border-[white] select-none",
                                  "icon": "jsonic:export",
                                  "size": "40px",
                                  "text": {
                                      "lang": {
                                          "en": "Save",
                                          "it": "Salva"
                                      }
                                  },
                                  "on": {
                                      "mousedown": [
                                        {
                                          "if": {
                                            "is": "{js:window.JSONisValid()}",
                                            "then": [
                                              {
                                                "set": {
                                                  "data selectedAppData setup time": "{time:timestamp}",
                                                  "data selectedAppData user": "{data user}",
                                                }
                                              },
                                              {
                                                "if": {
                                                  "not": "{data selectedAppData setup title}",
                                                  "then": [
                                                    {
                                                      "alert": {
                                                        "title": "App title",
                                                        "text": "Give a name to your new app!",
                                                        "input": "text",
                                                        "inputValue": "",
                                                        "inputPlaceholder": "Title",
                                                        "inputAttributes": {
                                                          "maxlength": 50,
                                                          "autocapitalize": "off",
                                                          "autocorrect": "on"
                                                        },
                                                        "cancelButtonText": "Cancel",
                                                        "confirmButtonText": "Confirm",
                                                        "showConfirmButton": true,
                                                        "showCancelButton": true,
                                                        "footer": "Try to explain the main function of the apps",
                                                        "on": {
                                                          "value": [
                                                            {
                                                              "set": {
                                                                "data selectedAppData setup title": "{alert:value}"
                                                              }
                                                            },
                                                            {
                                                              "elio:save": {
                                                              }
                                                            }
                                                          ]
                                                        }
                                                      }
                                                    }
                                                  ],
                                                  "else": [
                                                    {
                                                      "elio:save": {
                                                      }
                                                    }
                                                  ]
                                                }
                                              }
                                            ],
                                            "else": [
                                              {
                                                "alert": {
                                                  "title": "Syntax error",
                                                  "text": "The app includes null objects or invalid syntax",
                                                  "confirmButtonText": "Ok",
                                                  "showConfirmButton": true
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      ]
                                  }
                                }
                              }
                            },
                            {
                              "jsonic:button": {
                                "setup": {
                                  "id": "importButton",
                                  "class": "headerButton hidden text-[#713089] active:text-[white] bg-[white] active:bg-[#713089] active:border-[white] select-none",
                                  "color": "#713089",
                                  "background": "white",
                                  "icon": "jsonic:export",
                                  "size": "40px",
                                  "text": {
                                      "lang": {
                                          "en": "Import",
                                          "it": "Importa"
                                      }
                                  },
                                  "on": {
                                    "mousedown": [
                                      {
                                        "set": {
                                          "data selectedAppData setup status": "",
                                          "data selectedAppData setup time": "{time:timestamp}",
                                          "data selectedAppData setup fork": "{local:appKey}",
                                          "data selectedAppData user": "{data user}"
                                        }
                                      },
                                      {
                                        "local set": {
                                          "appKey": "{firebaseKey:app}"
                                        }
                                      },
                                      {
                                        "local set": {
                                          "appGroup": "dev"
                                        }
                                      },
                                      {
                                        "local set": {
                                          "appSetup": "{data selectedAppData setup}"
                                        }
                                      },
                                      {
                                        "elio:updateButtons": {
                                          "setup": {
                                            "group": "dev"
                                          }
                                        }
                                      },
                                      {
                                        "elio:updateUI": {
                                          "setup": {
                                            "group": "dev"
                                          }
                                        }
                                      },
                                      {
                                        "database": {
                                          "do": "set",
                                          "path": "appsdev/{local:appKey}",
                                          "value": "{data selectedAppData}",
                                          "on": {
                                            "success": [
                                              {
                                                "set": {
                                                  "data appCode json": "{js:window.getAppJson()}"
                                                  //"data appCode blocks": "{js:window.getAppBlocks()}",
                                                }
                                              },
                                              {
                                                "database": {
                                                  "do": "set",
                                                  "path": "codedev/{local:appKey}",
                                                  "value": "{data appCode}",
                                                  "on": {
                                                      "success": [
                                                        {
                                                          "database": {
                                                            "do": "increase",
                                                            "path":"appspub/{data selectedAppData setup fork}/stat/download"
                                                          }
                                                        },
                                                        {
                                                          "alert": {
                                                            "title": "App impoted",
                                                            "text": "The application is imported in your private library",
                                                            "confirmButtonText": "Close",
                                                            "showConfirmButton": true
                                                          }
                                                        }
                                                      ]
                                                  }
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      }
                                    ]
                                  }
                                }
                              }
                            }
                          ]
                      }
                    },
                    {
                      "div": {
                        "attr": {
                            "id": "rightButtons",
                            "class": "inline-flex"
                        },
                        "html": [
                          {
                            "jsonic:button": {
                              "setup": {
                                "id": "code",
                                "class": "select-none",
                                "color": "#713089",
                                "background": "white",
                                    "icon": "elio:code",
                                "size": "40px",
                                "text": {
                                    "lang": {
                                        "en": "Code",
                                        "it": "Codice"
                                    }
                                },
                                "on": {
                                  "mousedown": [
                                    {
                                      "attr": {
                                        "selector": "#code",
                                        "toggleClass": "elioButtonActive"
                                      }
                                    },
                                    {
                                      "attr": {
                                        "selector": "#apps",
                                        "removeClass": "elioButtonActive"
                                      }
                                    },
                                    {
                                      "attr": {
                                        "selector": "#devices",
                                        "removeClass": "elioButtonActive"
                                      }
                                    },
                                    {
                                      "elio:updatePlayUI": {
                                      }
                                    }
                                  ]
                                }
                              }
                            }
                          }
                        /*   ,
                          {
                            "jsonic:button": {
                              "setup": {
                                "id": "live",
                                "class": "headerButton",
                                "color": "#713089",
                                "background": "white",
                                "icon": "elio:sensors",
                                "size": "40px",
                                "text": {
                                    "lang": {
                                        "en": "Live",
                                        "it": "Live"
                                    }
                                },
                                "on": {
                                    "mousedown": [
                                      {
                                        "attr": {
                                          "selector": "#live",
                                          "toggleClass": "elioButtonActive"
                                        }
                                      },
                                      {
                                        "attr": {
                                          "selector": {
                                            "class": "play",
                                            "data-value": "live" 
                                          },
                                          "toggleClass": "hidden"
                                        }
                                      },
                                      {
                                        "attr": {
                                          "selector": {
                                            "class": "stageHeight"
                                          },
                                          "toggleClass": "stageHeightWithLive"
                                        }
                                      },
                                      {
                                        "js": "setTimeout(function() {Blockly.svgResize(Blockly.getMainWorkspace());},10)"
                                      },
                                      {
                                        "if": {
                                          "not": "{data live}",
                                          "then": [
                                            {
                                              "data live": true
                                            },
                                            {
                                              "setInterval": {
                                                "name": "live",
                                                "duration": 5000,
                                                "do": [
                                                  {
                                                    "js": "window.publishCommand('publish')"
                                                  }
                                                ]
                                              }
                                            }
                                          ],
                                          "else": [
                                            {
                                              "data live": false
                                            },
                                            {
                                              "clearInterval": {
                                                "name": "live"
                                              }
                                            }
                                          ]
                                        }
                                      }
                                    ]
                                }
                              }
                            }
                          } */
                        ]
                      }
                    }
                  ]
              }
            }
        },
        {
            "html": {
                "selector":{
                    "class": "play",
                    "data-value": "code"
                },
                "empty": true,
                "div": {
                    "attr": {
                        "class": "stageHeight",
                        "id": "appCode"
                    },
                    "style": {
                        "background": "transparent",
                        "overflow-y": "hidden"
                    },
                    "ace": {
                        "mode": "ace/mode/json",
                        "options": {
                            "fontSize": "11pt",
                            "selectionStyle": "line",
                            "highlightActiveLine": false,
                            "wrap": true,
                            "showLineNumbers": true,
                            "showGutter": true,
                            "highlightGutterLine": false,
                            "fixedWidthGutter": false,
                            "showPrintMargin": false,
                            "tabSize": 3,
                            "readOnly": false
                        },
                        "on": {
                          "change": [
                            {
                              "local set": {
                                "app": "{ace:#appCode}"
                              }
                            }
                          ]
                        }
                    }
                }
            }
        },
        {
          "html": {
            "selector": {
              "class": "play",
              "data-value": "blockly"
            },
            "div": {
              "attr": {
                "class": "button absolute right-[5px] top-[15px] p-0 m-0 z-10",
                "data-value": "info"
              },
              "html": [
                {
                  "jsonic:button": {
                    "id": "infoButton",
                    "class": "select-none",
                    "color": "#713089",
                    "border": "#713089",
                    "background": "white",
                    "size": "40px",
                    "icon": "jsonic:info",
                    "text": ""
                  }
                }
              ],
              "on": {
                "mousedown": [
                  {
                    "if": {
                      "is": "'{local:appGroup}' == 'pub'",
                      "then": [
                        {
                          "alert": {
                            "title": "{data selectedAppData setup title}",
                            "text": "{data selectedAppData setup info}",
                            "confirmButtonText": "Close",
                            "showConfirmButton": true,
                            "footer": "Click on Import to take and modify this app"
                          }
                        }
                      ],
                      "else": [
                        {
                          "alert": {
                            "title": "{data selectedAppData setup title}",
                            //"title": "{js:('{data selectedAppData setup title}' !== '') ? '{data selectedAppData setup title}' : '{text:information}';}",
                            "text": "Give more information about your app",
                            "input": "textarea",
                            "inputValue": "{data selectedAppData setup info}",
                            "inputPlaceholder": "",
                            "inputAttributes": {
                              "maxlength": 500,
                              "autocorrect": "on"
                            },
                            "cancelButtonText": "Cancel",
                            "confirmButtonText": "Confirm",
                            "showConfirmButton": true,
                            "showCancelButton": true,
                            "footer": "Describe the behavior of the application in detail",
                            "on": {
                              "value": [
                                {
                                  "set": {
                                    "data selectedAppData setup info": "{alert:value}"
                                  }
                                }
                              ]
                            }
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          }
        },
        {
          "html": {
            "selector": {
              "class": "play",
              "data-value": "code"
            },
            "div": {
              "attr": {
                  "class": "button absolute right-[0px] top-[15px] m-0",
                  "data-value": "blocks"
              },
              "jsonic:button": {
                "id": "blocksButton",
                "class": "select-none",
                "color": "#713089",
                "border": "#713089",
                "background": "white",
                "size": "40px",
                "icon": "elio:apps",
                "text": ""
              },
              "on": {
                "mousedown": [
                  {
                    "alert": {
                      "title": "Update blocks",
                      "text": "Confirm that you want to update the blocks?",
                      "showCancelButton": true,
                      "cancelButtonText": "Cancel",
                      "confirmButtonText": "Update",
                      "on": {
                        "isConfirmed": [
                          {
                            "js": "interpretJSONarea()"
                          }
                        ]
                      }
                    }
                  }
                ]
              },
              "matchMedia": {
                "(max-width: 767.98px)": [
                  {
                    "attr": {
                      "selector": ".play[data-value=code]",
                      "addClass": "hidden"
                    }
                  },
                  {
                    "attr": {
                      "selector": {
                        "class": "play",
                        "data-value": "blockly"
                      },
                      "addClass": "w-[100vw]"
                    }
                  }
                ],
                "(min-width: 767.99px)": [
                  {
                    "attr": {
                      "selector": ".play[data-value=code]",
                      "removeClass": "hidden"
                    }
                  },
                  {
                    "attr": {
                      "selector": {
                        "class": "play",
                        "data-value": "blockly"
                      },
                      "removeClass": "w-[100vw]"
                    }
                  }
                ]
              }
            }
          }
        },
        
        {
            "js": "init()"
        }
      ]
    },
    "data": {
      "selectedDevice": ""
    },
    "parts": {
      "elio": {
        "newDevice": {
          "if": {
            "is": "typeof Android !== 'undefined'",
            "then": [
              {
                "elio:connectDevice": {}
              }
            ],
            "else": [
              {
                "elio:addDevice": {}
              }
            ]
          }
        },
        "connectDevice": {
          "alert": {
            "title": "Connect a new ELIO",
            "text": "Send the WIFI password of the local network to your ELIO device",
            "input": "password",
            "inputLabel": "WIFI password",
            "inputValue": "",
            "inputPlaceholder": "",
            "footer": "Make sure your local network supports 2,4 Ghz",
            "cancelButtonText": "Cancel",
            "confirmButtonText": "Confirm",
            "showConfirmButton": true,
            "showCancelButton": true,
            "on": {
              "value": [
                {
                  "js": "Android.connectEsp('{alert:value}', window.connectSuccess, window.connectError)"
                }
              ]
            }
          }          
        },

        "addDevice": {
          "alert": {
            "title": "Connect a new ELIO",
            "text": "Add the address of your ELIO device",
            "input": "text",
            "inputLabel": "MAC/BSSID address",
            "inputValue": "",
            "inputPlaceholder": "00:00:00:00:00:00",
            //"footer": "You can obtain the BSSID of the device connecting it to the local network with the app Esptouch available on Google Play and App Store",
            "footer": "<span class=\"inline\">You can obtain the MAC/BSSID id of the device connecting it to the local network with the app Esptouch available on <a href=\"https://play.google.com/store/apps/details?id=com.dparts.esptouch\" target=\"_blank\">Google Play</a> and <a href=\"https://apps.apple.com/us/app/espressif-esptouch/id1071176700\" target=\"_blank\">App Store</a></span>",
            "cancelButtonText": "Cancel",
            "confirmButtonText": "Confirm",
            "showConfirmButton": true,
            "showCancelButton": true,
            "on": {
              "value": [
               /*  {
                  "elio:changeDevice": {
                    "key": "{data deviceKey}"
                  }
                }, */
                {
                  "elio:saveDevice": {
                    "mac": "{alert:value}"
                  }
                }
/*                 {
                  "set": {
                    "data selectedDevice": "{alert:value}"
                  }
                },
 */                
              ]
            }
          }          
        },

        "changeDevice": {
          "do": [
            {
              "js": "window.selectDevice('{setup:key}');"
            }
          ]
        },

        "saveDevice": {
            "do": [
              {
                "js": "window.newDevice('{setup:mac}')"
              },
              {
                "set": {
                  "data selectedDeviceData setup title": "Elio di {user:firstName}",
                  "data selectedDeviceData setup time": "{time:timestamp}",
                  "data selectedDeviceData setup apikey": "{firebaseKey:app}",
                  "data selectedDeviceData user": "{data user}",
                }
              },
              {
                "database": {
                  "do": "set",
                  "path": "devices/{local:device}",
                  "value": "{data selectedDeviceData}",
                  "on": {
                    "success": [
                      {
                        "alert": {
                          "title": {
                            "lang": {
                              "en": "Save device",
                              "it": "Salva dispositivo"
                            }
                          },
                          "text": {
                            "lang": {
                              "en": "Device saved successfully",
                              "it": "Il dispositivo Ã¨ stato salvato con successo"
                            }
                          }
                        }
                      }
                    ]
                  } 
                }
              }
            ]
        },

        "renameDevice": {
          "do": [
            {
              "alert": {
                "title": "Rename",
                "input": "text",
                "inputValue": "{database:devices {setup:key} setup title}",
                "inputPlaceholder": "",
                "inputAttributes": {
                  "maxlength": 50,
                  "autocapitalize": "off",
                  "autocorrect": "on"
                },
                "cancelButtonText": "Cancel",
                "confirmButtonText": "Confirm",
                "showConfirmButton": true,
                "showCancelButton": true,
                "footer": "It's useful to name it to distinguish the devices",
                "on": {
                  "value": [
                    {
                      "database": {
                        "do": "set",
                        "path": "devices/{setup:key}/setup/title",
                        "value": "{alert:value}",
                        "on": {
                          "success": [
                          ]
                        }
                      }
                    }
                  ]
                }
              }
            }
          ]
        },

        "new": {
          "do": [
            {
              "local set": {
                "appKey": "{firebaseKey:app}"
              }
            },
            {
              "local set": {
                "appGroup": "dev"
              }
            },
            {
              "elio:updateButtons": {
                "setup": {
                  "group": "dev"
                }
              }
            },
            {
              "elio:updateUI": {
                "setup": {
                  "group": "dev"
                }
              }
            },
            {
              "set": {
                "data selectedAppData": {}
              }
            },
            {
              "set": {
                "data selectedAppData setup status": "",
                "data selectedAppData setup info": ""
              }
            },
            {
              "local set": {
                "appSaved": 0
              }
            },
            {
              "js": "window.newApp();"
            }
          ]
        },
        "restore": {
          "do": [
            {
              "set": {
                "data selectedAppData setup": "{local:appSetup}"
              }
            },
            {
              "js": "window.loadBlocks({local:appBlocks});"
            }
          ]
        },
        "open": {
          "do": [
            {
              "local set": {
                "appKey": "{setup:key}"
              }
            },
            {
              "local set": {
                "appGroup": "{setup:group}"
              }
            },
            {
              "database": {
                  "do": "get",
                  "path": "code{setup:group}/{setup:key}/json",
                  "on": {
                      "success": [
                        {
                          "elio:updateButtons": {
                            "setup": {
                              "group": "{local:appGroup}"
                            }
                          }
                        },
                        {
                          "set": {
                              "data selectedAppData setup": "{database:apps{local:appGroup} {setup:key} setup}"
                              //"data selectedAppData blocks": "{on:data}"
                          }
                        },
                        {
                          "local set": {
                            "appSetup": "{data selectedAppData setup}"
                          }
                        },
                        {
                          "js": "window.openApp({on:data})"
                        }
                      ]
                  }
              }
            }
          ]
        },
        "save": {
          "do": [
            {
              "local set": {
                "appSetup": "{data selectedAppData setup}"
              }
            },
            {
              "database": {
                "do": "set",
                "path": "apps{local:appGroup}/{local:appKey}",
                "value": "{data selectedAppData}",
                "on": {
                    "success": [
                      {
                        "set": {
                          "var deviceApp": {},
                          "var deviceApp id": "{local:appKey}",
                          "var deviceApp title": "{data selectedAppData setup title}",
                          "var deviceApp info": "{data selectedAppData setup info}",
                          "var deviceApp group": "{local:appGroup}",
                          "var deviceApp time": "{time:timestamp}"
                        }
                      },
                      {
                        "database": {
                          "do": "set",
                          "path": "devices/{local:device}/app",
                          "value": "{var deviceApp}",
                          "on": {
                            "success": [
                              {
                                "set": {
                                  "data appCode json": "{js:window.getAppJson()}"
                                  //"data appCode blocks": "{js:window.getAppBlocks()}",
                                }
                              },
                              {
                                "database": {
                                  "do": "set",
                                  "path": "code{local:appGroup}/{local:appKey}",
                                  "value": "{data appCode}",
                                    "on": {
                                      "success": [
                                        {
                                          "local set": {
                                            "appSaved": 1
                                          }
                                        },
                                        {
                                          "alert": {
                                            "title": "Save and restart ",
                                            "text": "Please wait, ELIO is restarting...",
                                            "timer": 15000,
                                            "confirmButtonText": "Done",
                                            "timerProgressBar": true,
                                            "showConfirmButton": true
                                          }
                                        },
                                        {
                                          "js": "window.installApp('save')"
                                        }
                                      ]
                                  }
                                }
                              }
                            ]
                          }
                        }
                      }
                    ],
                    "error": [
                      {
                        "alert": "Server error. Try again"
                      }
                    ]
                }
              }
            }
          ]
        },
        "rename": {
          "do": [
            {
              "alert": {
                "title": "Rename",
                "input": "text",
                "inputValue": "{database:apps{local:appGroup} {setup:key} setup title}",
                "inputPlaceholder": "Title",
                "inputAttributes": {
                  "maxlength": 50,
                  "autocapitalize": "off",
                  "autocorrect": "on"
                },
                "cancelButtonText": "Cancel",
                "confirmButtonText": "Confirm",
                "showConfirmButton": true,
                "showCancelButton": true,
                "footer": "Try to identify the main functions of your app with the title",
                "on": {
                  "value": [
                    {
                      "database": {
                        "do": "set",
                        "path": "apps{setup:group}/{setup:key}/setup/title",
                        "value": "{alert:value}",
                        "on": {
                          "success": [
                          ]
                        }
                      }
                    }
                  ]
                }
              }
            }
          ]
        },
        "share": {
          "do": [
            {
              "alert": {
                "title": "Share {database:apps{setup:group} {setup:key} setup title}",
                "text": "Do you confirm that you want to publish the app and share it with the community?",
                "showCancelButton": true,
                "cancelButtonText": "Cancel",
                "confirmButtonText": "Share",
                "on": {
                  "isConfirmed": [
                    {
                      "set": {
                        "data pubAppSetup title": "{database:apps{setup:group} {setup:key} setup title}",
                        "data pubAppSetup info": "{database:apps{setup:group} {setup:key} setup info}",
                        "data pubAppSetup status": "",
                        "data pubAppSetup time": "{time:timestamp}"
                        //"data publishedAppData stat download": 0
                      }
                    },
                    {
                      "database": {
                        "do": "set",
                        "path": "appspub/{setup:key}/setup",
                        "value": "{data pubAppSetup}",
                        "on": {
                          "success": [
                            {
                              "database": {
                                "do": "set",
                                "path": "appspub/{setup:key}/user",
                                "value": "{data user}",
                                "on": {
                                  "success": [
                                    {
                                      "set": {
                                        "data appCode json": "{js:window.getAppJson()}"
                                        //"data appCode blocks": "{js:window.getAppBlocks()}",
                                      }
                                    },
                                    {
                                      "database": {
                                        "do": "set",
                                        "path": "codepub/{setup:key}",
                                        "value": "{data appCode}",
                                        "on": {
                                          "success": [
                                            {
                                              "database": {
                                                "do": "set",
                                                "path": "appsdev/{setup:key}/setup/status",
                                                "value": "shared",
                                                "on": {
                                                  "success": [
                                                    {
                                                      "alert": {
                                                        "title": "App shared",
                                                        "text": "Your application [{database:apps{setup:group} {setup:key} setup title}] is published and now is available to the community",
                                                        "confirmButtonText": "Close",
                                                        "showConfirmButton": true
                                                      }
                                                    }
                                                  ]
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      }
                                    }
                                  ]
                                }
                              }
                            }
                          ]
                        }
                      }
                    }
                  ]
                }
              }
            }
          ]
        },
        "update": {
          "do": [
            {
              "alert": {
                "title": "Update {database:apps{setup:group} {setup:key} setup title}",
                "text": "Do you confirm that you want to publish the update to the app?",
                "showCancelButton": true,
                "cancelButtonText": "Cancel",
                "confirmButtonText": "Update",
                "on": {
                  "isConfirmed": [
                    {
                      "set": {
                        "data pubAppSetup title": "{database:apps{setup:group} {setup:key} setup title}",
                        "data pubAppSetup info": "{database:apps{setup:group} {setup:key} setup info}",
                        "data pubAppSetup status": "",
                        "data pubAppSetup time": "{time:timestamp}"
                        //"data publishedAppData stat download": 0
                      }
                    },
                    {
                      "database": {
                        "do": "set",
                        "path": "appspub/{setup:key}/setup",
                        "value": "{data pubAppSetup}",
                        "on": {
                          "success": [
                            {
                              "database": {
                                "do": "set",
                                "path": "appspub/{setup:key}/user",
                                "value": "{data user}",
                                "on": {
                                  "success": [
                                    {
                                      "set": {
                                        "data appCode json": "{js:window.getAppJson()}"
                                        //"data appCode blocks": "{js:window.getAppBlocks()}",
                                      }
                                    },
                                    {
                                      "database": {
                                        "do": "set",
                                        "path": "codepub/{setup:key}",
                                        "value": "{data appCode}",
                                        "on": {
                                          "success": [
                                            {
                                              "database": {
                                                "do": "set",
                                                "path": "appsdev/{setup:key}/setup/status",
                                                "value": "shared",
                                                "on": {
                                                  "success": [
                                                    {
                                                      "alert": {
                                                        "title": "App shared",
                                                        "text": "Your application [{database:apps{setup:group} {setup:key} setup title}] is published and now is available to the community",
                                                        "confirmButtonText": "Close",
                                                        "showConfirmButton": true
                                                      }
                                                    }
                                                  ]
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      }
                                    }
                                  ]
                                }
                              }
                            }
                          ]
                        }
                      }
                    }
                  ]
                }
              }
            }
          ]
        },
        "updateButtons": {
          "do": [
            {
              "set": {
                "var appUser": "{database:apps{local:appGroup} {local:appKey} user id}"
              }
            },
            {
              "if": {
                "is": "'{setup:group}' == 'dev'",
                "then": [
                  {
                    "show": "#runButton,#saveButton"
                  },
                  {
                    "hide": "#importButton"
                  }
                ],
                "else": [
                  {
                    "if": {
                      "is": "'{user:uid}' !== '{var appUser}'",
                      "then": [
                        {
                          "show": "#runButton,#importButton"
                        },
                        {
                          "hide": "#saveButton"
                        }
                      ],
                      "else": [
                        {
                          "show": "#runButton"
                        },
                        {
                          "hide": "#importButton,#saveButton"
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        },
        "updatePlayUI": {
          "do": [
            {
              "if": {
                "selector": "#code",
                "hasClass": "elioButtonActive",
                "then": [
                  {
                    "show": ".play[data-value='code']"
                  },
                  {
                    "var codeOn": 1
                  }
                ],
                "else": [
                  {
                    "hide": ".play[data-value='code']"
                  },
                  {
                    "var codeOn": 0
                  }
                ]
              }             
            },
            {
              "if": {
                "selector": "#apps",
                "hasClass": "elioButtonActive",
                "then": [
                  {
                    "show": ".play[data-value='apps']"
                  },
                  {
                    "var appsOn": 1
                  }
                ],
                "else": [
                  {
                    "hide": ".play[data-value='apps']"
                  },
                  {
                    "var appsOn": 0
                  }
                ]
              }             
            },
            {
              "if": {
                "selector": "#devices",
                "hasClass": "elioButtonActive",
                "then": [
                  {
                    "show": ".play[data-value='devices']"
                  },
                  {
                    "var devicesOn": 1
                  }
                ],
                "else": [
                  {
                    "data live": false
                  },
                  {
                    "clearInterval": {
                      "name": "live"
                    }
                  },
                  {
                    "hide": ".play[data-value='devices']"
                  },
                  {
                    "var devicesOn": 0
                  }
                ]
              }             
            },
            {
              "if": {
                "is": "{var appsOn} || {var codeOn} || {var devicesOn}",
                "then": [
                  {
                    "console": {
                      "log": "{var appsOn} || {var codeOn} || {var devicesOn}"
                    }
                  },
                  {
                    "attr": {
                      "selector": "#blocklyDiv",
                      "removeClass": "w-[100vw]"
                    }
                  }
                ],
                "else": [
                  {
                    "attr": {
                      "selector": "#blocklyDiv",
                      "addClass": "w-[100vw]"
                    }
                  }
                ]
              }
            },
            {
              "if": {
                "is": "!{var appsOn} && !{var codeOn} && window.innerWidth < 1024",
                "then": [
                  {
                    "attr": {
                      "selector": "#playCode",
                      "removeClass": "hidden"
                    }
                  }
                ]
              }
            },
            {
              "js": "setTimeout(function() {Blockly.svgResize(Blockly.getMainWorkspace());},10)"
            },
  
            {
              "js": "window.workspaceChanged()"
            }
          ]
        },
        "updateUI": {
          "do": [
            {
              "choose": {
                "id": "{setup:group}",
                "class": "appsSwitchButtons",
                "selection": "elioButtonActive"
              }
            },
            {
              "if": {
                "is": "'{setup:group}' == 'pub'",
                "then": [
                  {
                    "elio:list": {
                      "setup": {
                        "group": "pub",
                        "database": {
                          "path": "appspub",
                          //"orderByKey": "pub"
                        },
                        "selector": ".appsList"
                      }
                    }
                  }
                ],
                "else": [
                  {
                    "elio:list": {
                      "setup": {
                        "group": "dev",
                        "database": {
                          "path": "appsdev",
                          "orderByChild": "user/id",
                          "equalTo": "{user:uid}"
                        },
                        "selector": ".appsList"
                      }
                    }
                  }
                ]
              }
            }
          ]
        },
        "list": {
          "note": "bootstrap required: list-group-item list-group-item-action",
          "html": {
            "selector": "{setup:selector}",
            "empty": true,
            "animate": {
              "transition": "fadeIn",
              "duration": "500ms"
            },
            "ul": {
              "attr": {
                  "id": "appsListItems",
                  "class": "m-0 p-0 list-group list-group-flush"
              },
              "database": "{setup:database}",
              "template": {
                  "attr": {
                      "class": "appsItem flex items-center justify-between px-[10px] min-h-[54px] border-t-[1px] border-solid border-[#ddd]",
                      "data-value": "{item:key}"
                  },
                  "html": [
                      {
                        "span text-ellipsis overflow-hidden": {
                            "attr": {
                                "class": "appsListItemName px-[5px] py-[5px] text-[16px] text-left w-[90%]",
                                "data-value": "{item:key}"
                            },
                            "html": [
                              {
                                "span": "{database:apps{setup:group} {item:key} setup title}"
                              },
                              {
                                "span": {
                                  "if": "'{database:apps{setup:group} {item:key} setup status}' !== ''",
                                  "attr": {
                                    "class": "text-[11px] text-white mx-2 px-2 py-1 rounded-full bg-{database:apps{setup:group} {item:key} setup status}"
                                  },
                                  "text": "{database:apps{setup:group} {item:key} setup status}"
                                }
                              }
                            ],
                            "on": {
                                "init": [
                                  {
                                    "if": {
                                      "is": "'{setup:group}' == '{local:appGroup}'",
                                      "then": [
                                        {
                                          "choose": {
                                              // "selector": ".deviceItem[data-value='{local:appKey}']",
                                              "data-value": "{local:appKey}",
                                              "class": "appsItem",
                                              "selection": "elioRowActive"
                                          }
                                        }
                                      ]
                                    }
                                  }
                                ],
                                "mousedown": [
                                    {
                                      "choose": {
                                          // "selector": ".deviceItem[data-value='{item:key}']",
                                          "data-value": "{item:key}",
                                          "class": "appsItem",
                                          "selection": "elioRowActive"
                                      }
                                    },
                                    {
                                      "elio:open": {
                                        "key": "{item:key}", // {on:target.dataset.value}
                                        "group": "{setup:group}"
                                      }
                                    }
                                ]
                            }
                        }
                      },
                      {
                        "div flex items-center justify-end": {
                          "html": [
                            {
                              "span": {
                                "attr": {
                                  "data-value": "{item:key}",
                                  "class": "download inline-flex items-center content-center text-[back] text-[13px] bg-[#ddd] rounded-full px-[1px] mr-[10px] w-[50px]"
                                },
                                "span": [
                                  {
                                    "attr": {
                                      "data-icon": "jsonic:export",
                                      "class": "iconify text-[24px]",
                                      "data-inline": "true",
                                    }
                                  },
                                  {
                                    "text": "{database:apps{setup:group} {item:key} stat download}"
                                  }
                                ],
                                "on": {
                                  "init": [
                                    {
                                      "if": {
                                        "not": "{database:apps{setup:group} {item:key} stat download}",
                                        "then": [
                                          {
                                            "attr": {
                                              "selector": ".download[data-value='{item:key}']",
                                              "addClass": "invisible"
                                            }
                                          }      
                                        ]
                                      }
                                    },
                                    {
                                      "if": {
                                        "is": "'{setup:group}' !== 'pub'",
                                        "then": [
                                          {
                                            "attr": {
                                              "selector": ".download[data-value='{item:key}']",
                                              "addClass": "hidden"
                                            }
                                          }      
                                        ]
                                      }
                                    }
                                  ]
                                }      
                              }
                            },
                            
                            {
                              "span": {
                                "if": "'{setup:group}' == 'dev' && '{database:apps{setup:group} {item:key} setup status}' !== 'shared'",
                                "attr": {
                                  "class": "mx-1 mt-0 mb-0 py-0 px-[8px] h-[40px] rounded-full cursor-pointer inline-flex align-center items-center bg-[white] border-solid border-[1px] border-[#713089] text-[17px] text-[#713089] active:text-[white] bg-[white] active:bg-[#713089] active:border-[white] select-none",
                                  "id": "shareButton{item:key}"
                                },
                                "html": [
                                  {
                                    "span": {
                                      "if": "'{database:apps{setup:group} {item:key} setup status}' !== 'shared'",
                                      "attr": {
                                         "class": "iconify text-[40px] mx-0",
                                         "data-icon": "jsonic:share"
                                      }
                                    }
                                  },
                                  {
                                    "span": {
                                      "if": "'{database:apps{setup:group} {item:key} setup status}' !== 'shared'",
                                      "attr": {
                                        "class": "mx-0 px-[5px]"
                                      },
                                      "text":  {
                                        "lang": {
                                            "en": "Share",
                                            "it": "Condividi"
                                        }
                                      }
                                    }
                                  }
                                ],
                                "on": {
                                  "mousedown": [
                                    {
                                      "elio:share": {
                                        "group": "{setup:group}",
                                        "key": "{item:key}"
                                      }
                                    } 
                                  ]
                                }
                              }
                            },

                            {
                              "span id=updateButton{item:key} bg-[#ddd] text-[11px] text-[black] mx-2 px-2 py-1 rounded-full": {
                                "if": "'{setup:group}' == 'dev' && '{database:apps{setup:group} {item:key} setup status}' == 'shared'",
                                "text":  {
                                  "lang": {
                                      "en": "Update",
                                      "it": "Aggiorna"
                                  }
                                },
                                "on": {
                                  "mousedown": [
                                    {
                                      "elio:update": {
                                        "group": "{setup:group}",
                                        "key": "{item:key}"
                                      }
                                    } 
                                  ]
                                }
                              }
                            }
                          ]
                        }
                      },
                     {
                          "span": [
                              {
                                "attr": {
                                  "class": "cursor-pointer"
                                },
                                "figure": {
                                  "attr": {
                                    "class": "my-auto"
                                  },
                                  "img": {
                                    "if": "'{setup:group}' == 'pub'",
                                    "attr": {
                                      "class": "userImage rounded-full bg-white",
                                      "data-value": "{item:key}",
                                      "src": "{database:apps{setup:group} {item:key} user photo}",
                                      "width": "40px",
                                      "height": "40px",
                                      "alt": "{database:apps{setup:group} {item:key} user name}"
                                    },
                                    "animate": {
                                      "transition": "fadeIn",
                                      "duration": "500ms"
                                    },
                                    "on": [],
                                    "figcaption": {
                                      "text": "{database:apps{setup:group} {item:key} user name}"
                                    }
                                  }
                                }
                              },
                                   /*  {
                                  "for": {
                                      "name": "addon",
                                      "of": [
                                          "bulb",
                                          "light",
                                          "motion",
                                          "guard",
                                          "temp",
                                          "humidity",
                                          "co2",
                                          "mic"
                                      ],
                                      "html": {
                                          "div": {
                                              "if": "{database:apps.{item:key}.versions.1632129720359.parts.{addon}}",
                                              "attr": {
                                                  "class": "appsDeviceAddons text-left bg-black text-white rounded-full w-[40px] h-[40px] mx-1 float-left",
                                                  "data-value": "{item:key}{addon}"
                                              },
                                              "style": {
                                                  "background": "black",
                                                  "color": "white"
                                              },
                                              "span": {
                                                  "attr": {
                                                      "class": "iconify-inline",
                                                      "data-icon": "elio:{addon}",
                                                      "data-value": "{item:key}{addon}"
                                                  },
                                                  "style": {
                                                      "color": "white",
                                                      "font-size": "40px"
                                                  }
                                              }
                                          }
                                      }
                                  }
                              }, */
                              {
                                "span text-[black] w-[40px] h-[40px]": {
                                  "if": "'{setup:group}' == 'dev'",
                                  "attr": {
                                      //"id": "appsDevicedropdown{item:key}",
                                      "class": "points",
                                      "data-value": "{item:key}"
                                  },
                                  "i text-[black] text-[40px]": {
                                      "attr": {
                                          "class": "iconify",
                                          "data-icon": "jsonic:points",
                                          "data-value": "{item:key}",
                                          "data-inline": "true"
                                      }
                                  },
                                  "on": {
                                      "mousedown": [
                                       /*  {
                                            "set": {
                                                "data dropdownItem": "{on:target.dataset.value}",
                                            }
                                        }, */
                                        {
                                          "alert": {
                                            "title": "{database:apps{local:appGroup} {on:target.dataset.value} setup title}",
                                            "text": "{database:apps{local:appGroup} {on:target.dataset.value} setup info}",
                                            "showDenyButton": true,
                                            "showCancelButton": true,
                                            "cancelButtonText": "Cancel",
                                            "confirmButtonText": "Rename",
                                            "denyButtonText": "Remove",
                                            "on": {
                                              "isConfirmed": [
                                                {
                                                  "elio:rename": {
                                                    "group": "{local:appGroup}",
                                                    "key": "{on:target.dataset.value}"
                                                  }
                                                }
                                              ],
                                              "isDenied": [
                                                {
                                                  "alert": {
                                                    "title": "Remove",
                                                    "text": "Do you confirm to remove the selected app?",
                                                    "showCancelButton": true,
                                                    "cancelButtonText": "Cancel",
                                                    "confirmButtonText": "Confirm",
                                                    "on": {
                                                      "isConfirmed": [
                                                        {
                                                          "database": {
                                                            "do": "remove",
                                                            "path": "apps{local:appGroup}/{on:target.dataset.value}",
                                                            "on": {
                                                              "success": [
                                                                {
                                                                  "elio:new": {}
                                                                }
                                                              ],
                                                              "error": [
                                                                {
                                                                  "alert": "Error"
                                                                }
                                                              ]
                                                            }
                                                          }
                                                        }
                                                      ]
                                                    }
                                                  }
                                                }
                                              ]
                                            }
                                          }
                                        }
                                      ]
                                  }
                                }
                              }
                            ]
                          
                      } 
                  ]
              }
            }
          }
        },
        "devicesList": {
          "note": "bootstrap required: list-group-item list-group-item-action",
          "html": {
            "selector": "{setup:selector}",
            "empty": true,
            "animate": {
              "transition": "fadeIn",
              "duration": "500ms"
            },
            "ul": {
              "attr": {
                  "id": "appsDeviceListItems",
                  "class": "m-0 p-0 border-solid border-1 border-[#ddd]"
              },
              "database": "{setup:database}",
              "template": {
                  "attr": {
                      "class": "deviceItem flex items-center justify-between px-[10px] min-h-[54px] border-t-[1px] border-solid border-[#ddd]",
                      "data-value": "{item:key}"
                  },
                  "html": [
                    {
                      "span": {
                          "attr": {
                              "class": "appsDeviceListName ms-2 me-2 text-[16px] text-left w-[90%]",
                              "data-value": "{item:key}"
                          },
                          "html": [
                            {
                              "span": "{database:devices {item:key} setup title}"
                            },
                            {
                              "span": {
                                "attr": {
                                  "class": "text-[11px] mx-2 px-2 py-1 rounded-full text-[#E15EAC] bg-[white] border-[1px] border-solid border-[#E15EAC] text-ellipsis whitespace-nowrap overflow-hidden"
                                },
                                "text": "{database:devices {item:key} app title}"
                              }
                            }
                          ],
                          "on": {
                            "init": [
                              {
                                "if": {
                                  "is": "'{item:key}' == '{local:device}'",
                                  "then": [
                                    {
                                      "choose": {
                                          //"selector": ".deviceItem[data-value='{local:device}']",
                                          "data-value": "{local:device}",
                                          "class": "deviceItem",
                                          "selection": "elioRowActive"
                                      }
                                    },
                                    {
                                      "elio:openDevice": {}
                                    }
                                  ]
                                }
                              }
                            ],
                            "mousedown": [
                              {
                                "choose": {
                                    // "selector": ".deviceItem[data-value='{item:key}']",
                                    // "selectable": "deviceItem",
                                    "data-value": "{item:key}",
                                    "class": "deviceItem",
                                    "selection": "elioRowActive"
                                }
                              },
                              {
                                "js": "window.selectDevice('{item:key}');"
                              },
                              {
                                "set": {
                                  "data selectedDeviceData setup": "{database:devices {item:key} setup}",
                                  "data selectedDeviceData user": "{database:devices {item:key} user}"
                                }
                              },
                              {
                                "attr": {
                                  "selector": "#devicesList",
                                  "addClass": "hidden"
                                }
                              },
                              {
                                "attr": {
                                  "selector": "#deviceLive",
                                  "removeClass": "hidden"
                                }
                              },
                              {
                                "attr": {
                                  "selector": "#deviceListButton",
                                  "removeClass": "invisible"
                                }
                              },
                              {
                                "elio:openDevice": {}
                              },
                              /* {
                                "alert": {
                                  "title": "{database:devices {item:key} setup title}",
                                  "text": "The device {database:devices {item:key} setup title} is now selected. Open an app and Run it on the device.",
                                  "footer": "Mac address: {item:key}",
                                  "confirmButtonText": "Ok",
                                  "showConfirmButton": true
                                }
                              } */
                            ]
                          }
                      }
                    },
                     {
                      "span": [
                        {
                          "span text-[black] w-[40px] h-[40px]": {
                            "attr": {
                                "class": "points",
                                "data-value": "{item:key}"
                            },
                            "i text-[black] text-[40px]": {
                                "attr": {
                                    "class": "iconify",
                                    "data-icon": "jsonic:points",
                                    "data-value": "{item:key}",
                                    "data-inline": "true"
                                }
                            },
                            "on": {
                                "mousedown": [
                                  {
                                    "set": {
                                        "data dropdownItem": "{on:target.dataset.value}",
                                    }
                                  },
                                  {
                                    "alert": {
                                      "title": "{database:devices {data dropdownItem} setup title}",
                                      "text": "Select the action required",
                                      "showDenyButton": true,
                                      "showCancelButton": true,
                                      "cancelButtonText": "Cancel",
                                      "confirmButtonText": "Rename",
                                      "denyButtonText": "Remove",
                                      "on": {
                                        "isConfirmed": [
                                          {
                                            "elio:renameDevice": {
                                              "key": "{data dropdownItem}"
                                            }
                                          }
                                        ],
                                        "isDenied": [
                                          {
                                            "alert": {
                                              "title": "Remove",
                                              "text": "Do you confirm to remove the selected device?",
                                              "showCancelButton": true,
                                              "cancelButtonText": "Cancel",
                                              "confirmButtonText": "Confirm",
                                              "on": {
                                                "isConfirmed": [
                                                  {
                                                    "database": {
                                                      "do": "remove",
                                                      "path": "devices/{on:target.dataset.value}",
                                                      "on": {
                                                        "success": [
                                                        ],
                                                        "error": [
                                                          {
                                                            "alert": "Error"
                                                          }
                                                        ]
                                                      }
                                                    }
                                                  }
                                                ]
                                              }
                                            }
                                          }
                                        ]
                                      }
                                    }
                                  }
                                ]
                            }
                           /*  "ul": {
                                "attr": {
                                    "class": "dropdown-menu dropdown-menu-right d-none",
                                    "aria-labelledby": "dropdown{item:key}"
                                },
                                "html": [
                                    {
                                        "li": {
                                            "attr": {
                                                "class": "appsDeviceDropdownLi",
                                                "data-value": "0"
                                            },
                                            "a": {
                                                "attr": {
                                                    "class": "dropdown-item",
                                                    "data-value": "1",
                                                    "href": "#"
                                                },
                                                "text": "btnErase",
                                                "on": {
                                                    "mousedown": "app.removeDevice"
                                                }
                                            }
                                        }
                                    },
                                    {
                                        "li": {
                                            "attr": {
                                                "class": "appsDeviceDropdownLi",
                                                "data-value": "1"
                                            },
                                            "a": {
                                                "attr": {
                                                    "class": "dropdown-item",
                                                    "data-value": "1",
                                                    "href": "#"
                                                },
                                                "text": "btnErase",
                                                "on": {
                                                    "mousedown": "app.renameDevice"
                                                }
                                            }
                                        }
                                    }
                                ]
                            } */
                          }
                        }
                      ]
                    } 
                  ]
              }
            }
          }
        },
        "openDevice": {
          "do": [
            {
              "html": {
                "selector": "#deviceName",
                "empty": true,
                "html": "{database:devices {local:device} setup title}"
              }
            },
            {
              "data live": true
            },
            {
              "var deviceObj": "{database:devices {local:device}}"
            },
            {
              "html": {
                "empty": true,
                "selector": "#deviceLive",
                "div": {
                  "for": {
                    "name": "device",
                    "of": "{database:devices}",
                    "html": [
                      {
                        "div data-value={device:key} liveDevice text-center hidden('{device:key}'!=='{local:device}')": {
                          "html": [
                            {
                              "set": {
                                "var deviceApp": "{database:devices {device:key}}"
                              }
                            },
                            {
                              "span bg-[#E15EAC] text-[white] border-1 border-solid border-transparent active:bg-[white] active:text-[#E15EAC] active:border-[#E15EAC] pl-[10px] pr-[15px] rounded-full select-none inline-flex items-center content-center": {
                                "html": [
                                  {
                                    "i data-icon=elio:apps data-inline=true iconify text-[40px] inline": {
                                    }
                                  },
                                  {
                                    "span text-ellipsis whitespace-nowrap overflow-hidden inline": "{var deviceApp app title}"
                                  }
                                ],
                                "on": {
                                  "mousedown": [
                                    {
                                      "attr": {
                                        "selector": "#devices",
                                        "removeClass": "elioButtonActive"
                                      }
                                    },
                                    {
                                      "attr": {
                                        "selector": "#apps",
                                        "addClass": "elioButtonActive"
                                      }
                                    },
                                    {
                                      "attr": {
                                        "selector": "#code",
                                        "removeClass": "elioButtonActive"
                                      }
                                    },
                                    {
                                      "elio:updatePlayUI": {
                                      }
                                    },
                                    {
                                      "choose": {
                                          // "selector": ".deviceItem[data-value='{item:key}']",
                                          "data-value": "{database:devices {device:key} app id}",
                                          "class": "appsItem",
                                          "selection": "elioRowActive"
                                      }
                                    },
                                    {
                                      "elio:open": {
                                        "key": "{database:devices {device:key} app id}", // {on:target.dataset.value}
                                        "group": "{local:appGroup}"
                                      }
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              "div text-center mt-[10px]": [
                                {
                                  "for": {
                                    "name": "addon",
                                    "of": [
                                      //{icon:"jsonic:wifi", id:"signal", value:"10db"},
                                      {icon:"jsonic:systempower", id:"plugged", value:""},
                                      {icon:"elio:wc", id:"wirelessCharging", value:""},
                                      //{icon:"elio:sun", id:"sunDetected", value:""},
                                      {icon:"jsonic:systembattery", id:"batteryVoltage", value:"0", unit:"V"},
                                      {icon:"elio:light", id:"light", value:"0", unit:"lx"},
                                      //{icon:"elio:light", id:"IRlight", value:"0.0"},
                                      //{icon:"elio:temp", id:"tempC", value:"0", unit:"Â°"},
                                      //{icon:"elio:humidity", id:"humidity", value:"0", unit:"%"},
                                      {icon:"elio:tvoc", id:"tvoc", value:"0", unit:"ppb"},
                                      {icon:"elio:temp", id:"tempOutC", value:"0", unit:"Â°"},
                                      {icon:"elio:barometer", id:"pressure", value:"0", unit:"hPa"},
                                      {icon:"other:mountain", id:"altitude", value:"0", unit:"m"},
                                      {icon:"elio:distance", id:"proximity", value:"0", unit:"cm"},
                                      {icon:"jsonic:sphere", id:"cubePosition", value:"0"},
                                      {icon:"elio:history", id:"time", value:"00:00"}
                                    ],
                                    "html": [
                                      {
                                        "div liveFlag data-value={device:key}-{addon:id} data-device={device:key} data-id={addon:id} inline-flex items-center content-center rounded-full px-[10px] m-[3px] h-[40px] bg-[white] text-[#bbb] border-[#bbb] border-solid border-[1px] select-none": {
                                          "html": [
                                            {
                                              "i iconify data-icon={addon:icon} data-inline=true text-[40px]": {
                                              }
                                            },
                                            {
                                              "span liveValue data-value={device:key}-{addon:id} data-device={device:key} data-id={addon:id}": "{addon:value}"
                                            }
                                          ]
                                        }
                                      }
                                    ]
                                  }
                                }
                              ]
                            },
                            {
                              "div text-center mt-[10px] mb-[10px] mx-auto px[20px] grid grid-cols-4 w-[340px]": [
                                {
                                  "for": {
                                    "name": "touch",
                                    "of": [
                                      {icon:"elio:touchcircle", id:"touchCircle"},
                                      {icon:"elio:touchsquare", id:"touchSquare"},
                                      {icon:"elio:touchtriangle", id:"touchTriangle"},
                                      {icon:"elio:touchx", id:"touchX"},
                                      {icon:"elio:touchleft", id:"touchLeft"},
                                      {icon:"elio:touchright", id:"touchRight"},
                                      {icon:"elio:touchminus", id:"touchMinus"},
                                      {icon:"elio:touchplus", id:"touchPlus"}
                                    ],
                                    "html": [
                                      {
                                        "div": {
                                          "attr": {
                                              "class": "touchButton my-[3px]",
                                              "data-value": "{device:key}-{touch:id}"
                                            },
                                          "html": [
                                            {
                                              "jsonic:icon": {
                                                "setup": {
                                                  "name": "{touch:icon}",
                                                  "width":60,
                                                  "height":60,
                                                  "inline": true,
                                                  "class": "border-[#4596D8] border-solid border-[1px] bg-[white] active:bg-[#4596D8] text-[#4596D8] active:text-[white] select-none",
                                                  "flip": "false",
                                                  "text":" "
                                                }
                                              }
                                            }
                                          ],
                                          "on": {
                                            "mousedown": [
                                              {
                                                "animate": {
                                                  "transition": "pulse"
                                                }
                                              },
                                              {
                                                "js": "window.publishCommand('{touch:id}')"
                                              }
                                            ]
                                          }  
                                        }
                                      }
                                    ]
                                  }
                                }
                              ]
                            },
                            {
                              "div text-center mt-[10px] mb-[10px] mx-[10px] inline-block": [
                                {
                                  "for": {
                                    "name": "color",
                                    "of": [{"hex":"#000000"},{"hex":"#FFFFFF"},{"hex":"#FF8800"},{"hex":"#FFFF00"},{"hex":"#88FF00"},{"hex":"#00FF00"},{"hex":"#00FF88"},{"hex":"#00FFFF"},{"hex":"#0088FF"},{"hex":"#0000FF"},{"hex":"#8800FF"},{"hex":"#FF0088"},{"hex":"#FF0000"}],
                                    "html": [
                                      {
                                        "div float-left inline": {
                                            "div id=touchColor{color:index} rounded-full w-[60px] h-[60px] m-[3px] bg-[{color:hex}] border-[#ccc] opacity-80 active:opacity-100 border-solid  border-[1px] cursor-pointer select-none": {

                                            },
                                          "on": {
                                            "mousedown": [
                                              {
                                                "animate": {
                                                  "transition": "pulse"
                                                }
                                              },
                                              {
                                                "js": "window.runColor({color:index})"
                                              }
                                            ]
                                          }  
                                        }
                                      }
                                    ]
                                  }
                                }
                              ]
                            },
                            {
                              "div text-center mt-[10px] mb-[10px] mx-[10px] inline-block": [
                                {
                                  "span mx-1 my-auto py-0 px-[8px] h-[40px] rounded-full cursor-pointer inline-flex align-center items-center text-[17px] border-solid border-[1px] border-[#4596D8] text-[#4596D8] bg-[white] active:text-[white] active:bg-[#4596D8]": {
                                    "html": [
                                      {
                                        "span mx-auto px-[5px]": "Make a sound"
                                      }
                                    ],
                                    "on": {
                                      "mousedown": [
                                        {
                                          "js": "window.runNote('A4')"
                                        }
                                      ]
                                    }
                                  }
                                }
                              ]
                            },
                            {
                              "div bg-[#eee] text-[#333] mt-[30px] px-[15px] py-[5px] flex items-center justify-between ": {
                                "html": [
                                  {
                                    "span": {
                                      "text": "MAC: {device:key}",
                                    }
                                  },
                                  {
                                    "span": {
                                      "attr": {
                                        "class": "liveValue",
                                        "data-device": "{device:key}",
                                        "data-id": "version",
                                        "data-value": "{device:key}-version"
                                      }
                                    }
                                  },
                                  {
                                    "span mx-1 my-auto py-0 px-[8px] h-[40px] rounded-full cursor-pointer inline-flex align-center items-center bg-[white] border-solid border-[1px] border-[black] text-[17px] text-[black]": {
                                      "html": [
                                        {
                                          "span mx-0 px-[5px]": "API"
                                        }
                                      ],
                                      "on": {
                                        "mousedown": [
                                          {
                                            "alert": {
                                              "title": "ELIO API",
                                              "text": "To drive this device from another software, follow the API documentation and use the following API key",
                                              "input": "text",
                                              "inputLabel": "API key",
                                              "inputValue": "{database:devices {local:device} setup apikey}",
                                              "inputPlaceholder": "API key",
                                              "cancelButtonText": "Close",
                                              "confirmButtonText": "Generate",
                                              "showConfirmButton": true,
                                              "showCancelButton": true,
                                              "footer": "API documentation on&nbsp;<a href=\"/api\" target=\"_blank\">elioiot.com/api</a>",
                                              "on": {
                                                "value": [
                                                  {
                                                    "set": {
                                                      "var apikey": "{firebaseKey:app}"
                                                    }
                                                  },
                                                  {
                                                    "database": {
                                                      "do": "set",
                                                      "path": "devices/{local:device}/setup/apikey",
                                                      "value": "{var apikey}",
                                                        "on": {
                                                          "success": [
                                                            {
                                                              "alert": {
                                                                "title": "API key",
                                                                "text": "This is the new API key",
                                                                "input": "text",
                                                                "inputValue": "{var apikey}",
                                                                "cancelButtonText": "Close"
                                                              }
                                                            }
                                                          ]
                                                      }
                                                    }
                                                  }
                    
                                                ]
                                              }
                                            }
                                          }
                                        ]
                                      }
                                    }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              }
            },
            {
              "setInterval": {
                "name": "live",
                "duration": 5000,
                "do": [
                  {
                    "setTimeout": {
                      "name": "deviceUnreachable",
                      "duration": 2000,
                      "do": [
                        {
                          "js": "window.deviceUnreachable()"
                        }
                      ]
                    }
                  },
                  {
                    "js": "window.deviceAlive = false"
                  },
                  {
                    "js": "window.publishCommand('publish')"
                  }
                ]
              }
            },
            {
              "animate": {
                "selector": "#deviceLive,#deviceName",
                "transition": "fadeIn"
              }
            }
          ]
        },
        "closeDevice": {
          "do": [
            {
              "attr": {
                "selector": "#deviceLive",
                "addClass": "hidden"
              }
            },
            {
              "data live": false
            },
            {
              "clearInterval": {
                "name": "live"
              }
            }
          ]
        }
      }
    },
  "texts": {
    "untitled": {
      "it": "Untitled",
      "en": "Senza titolo"
    },
    "information": {
      "it": "Informationi",
      "en": "Information"
    }
  }
};

jsonicBlocks['play'] = new jsonicApp(); // jsonicBlocks is defined in jsonic plugin
jsonicBlocks['play'].init(jsonicBlockCode);

var blocklyToolboxApp = {
  "do": [
    {
      "attr": {
        "selector": ".blocklyToolboxDiv",
        "addClass": "stageHeight"
      }
    },
    {
      "for": {
        "name": "iconsId",
        "of": [
          {"id": "0", "icon": "jsonic:events", "text": "Events", "color":"#E5C039"}, // FCB900
          {"id": "1", "icon": "jsonic:bulb", "text": "Actions", "color":"#39A0E5"},
          {"id": "2", "icon": "jsonic:controls", "text": "Controls", "color":"#E539B4"}, // AF2086
          {"id": "3", "icon": "jsonic:values", "text": "Values", "color":"#E58139"} // FF6900
        ],
        "html": {
          "empty": true, 
          "selector": "div[id='blockly-{iconsId:id}'] > .blocklyTreeLabel",
          "jsonic:icon": {
              "attr": {
                  "class": "toolboxIcon",
                  "data-value": "blockly-{iconsId:id}"
              },
              "setup": {
                  "name": "{iconsId:icon}",
                  "color": "white",
                  "width": 60,
                  "height": 60,
                  "class": "select-none",
                  "padding": "10px",
                  "background": "{iconsId:color}",
                  "text": "{iconsId:text}",
                  "textStyle": {
                      "color": "black",
                      "font-size": "15px"
                  },
                  "on": {
                    "mousedown": {
                      "attr": {
                        "selector": ".blocklyFlyoutScrollbar",
                        "addClass": "hidden"
                      }
                    }
                  }
              }
          }
        }
      }
    }
  ]
};    

/* var Android = {
  connectEsp: function (pwd, connectSuccess, connectError) {
    connectSuccess('mac');
  },
  getSSID: "TESTSSID",
  getBSSID: "TESTBSSID"
} */

window.connectSuccess = function (mac) {
  console.log('window.connectSuccess');
  setTimeout(function () {

    jsonicBlocks['play'].run({
      "do": [
        {
          "elio:saveDevice": {
            "mac": mac
          }
        }
      ]
    });

  }, 1000);
}

window.connectError = function (error) {
  jsonicBlocks['play'].run({
    "do": [
      {
        "alert": {
          "title": "Connection error",
          "icon": "error",
          "text": "An error occurred trying to connect your ELIO device to the local network",
          "confirmButtonText": "Ok",
          "showConfirmButton": true
        }
      }
    ]
  });
}