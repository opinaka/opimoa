

// Instance:GetChildren()
// Returns a table of all the children of an Instance.
Blockly.Blocks['instance_get_children'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get children of")
            .appendField(new Blockly.FieldVariable("instance"), "INSTANCE");
        this.setOutput(true, "Table");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['instance_get_children'] = function (block) {
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.CATEGORY_NAME);
    var code = `${variable_instance}:GetChildren()`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};
