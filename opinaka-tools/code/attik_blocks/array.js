/*  
VITO MINCHILLI
+393283258767

*** SOLVED ***

This code is based on GOOGLE BLOCKLY
https://developers.google.com/blockly

BUG: When I add a field to a block, and I try to drag it, I receive the error: 
Error: The insertion marker manager tried to create a marker but the result is missing an input. If you are using a mutator, make sure your domToMutation method is properly defined.

To test it:
1. Drag the "array" block on the stage (on the right)
2. Click on + and try to drag again the "array block" on the stage
*/
Blockly.Blocks['xselect_groupby'] = {
    init: function() {
        this.appendValueInput('groupInput')
            .setCheck(['freeinput', "CONDITIONCHOOSER"])
            .setAlign(Blockly.ALIGN_LEFT)
            .appendField("GROUP BY ");
        this.setPreviousStatement(true, ['WHERE', 'FROM']);
        this.setNextStatement(true, ['GROUP BY', 'HAVING']);
        this.setColour('#8007f2');
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript['xselect_groupby'] = function(block) {
    var code = Blockly.JavaScript.statementToCode(block, 'groupInput');
    return 'group by ' + code + ';';
}



Blockly.Blocks["array"] = {
    init: function () {
      this.itemCount_ = 0;
      this.appendDummyInput("array").appendField("array");
      let appendFieldPlusIcon = new Blockly.FieldImage(
        "https://eliokit.com/media/plus.png",
        15,
        15,
        "Add",
        function (block) {
          block.sourceBlock_.appendArrayElementInput();
        }
      );
      this.appendDummyInput("close").appendField(appendFieldPlusIcon);
    },
    mutationToDom: function () {
      // You *must* create a <mutation></mutation> element. This element can have children.
      // https://developers.google.com/blockly/guides/create-custom-blocks/extensions
      var container = Blockly.utils.xml.createElement('mutation');
      container.setAttribute('items', this.itemCount_);
      return container;    
    },
    domToMutation: function (xmlElement) {
      this.itemCount_ = Number(xmlElement.getAttribute('items'));
      // This is a helper function which adds or removes inputs from the block.
      this.updateShape();
    },
    appendArrayElementInput: function () {
      this.itemCount_ += 1;
      this.updateShape();
    },
    deleteArrayElementInput: function (inputToDelete) {
      deleteArrayElementInput(this, inputToDelete);
    },
    updateShape: function () {
      for (let i = 0; i < this.itemCount_; i++) {
        if (!this.getInput("element_" + i)) {
          var appended_input = this.appendValueInput("element_" + i);
          var deleteArrayElementIcon = new    Blockly.FieldImage("https://eliokit.com/media/minus.png", 15, 15, "Remove", function (block) {
            block.sourceBlock_.deleteArrayElementInput(appended_input);
          });
          appended_input.appendField(deleteArrayElementIcon, 'delete_' + i);
  
          this.moveInputBefore("element_" + i, 'close');
        }
      }
    }
  };
  /*
  // Blockly starts here
  var workspace = Blockly.inject("blocklyDiv", {
    toolbox: document.getElementById("toolbox")
  });
  */
  var deleteArrayElementInput = function (block, inputToDelete) {
    var inputNameToDelete = inputToDelete.name;
    var inputIndexToDelete = Number(inputNameToDelete.match(/\d+/)[0]);
    var substructure = block.getInputTargetBlock(inputNameToDelete);
    if (substructure) substructure.dispose(true, true);
    block.removeInput(inputNameToDelete);
    block.itemCount_ -= 1;
   // rename all the subsequent element-inputs
    for (var i = inputIndexToDelete + 1; i <= block.itemCount_; i++) {
      var input = block.getInput('element_' + i);
      input.name = 'element_' + (i - 1);
    }
  }
