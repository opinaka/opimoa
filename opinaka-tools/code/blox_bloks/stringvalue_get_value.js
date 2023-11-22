

// StringValue.Value attribute
// Get a value of a string
Blockly.Blocks['stringvalue_get_value'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get value of")
            .appendField(new Blockly.FieldVariable("stringvalue"), "STRINGVALUE");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['stringvalue_get_value'] = function (block) {
    var variable_stringvalue = Blockly.Lua.nameDB_.getName(block.getFieldValue('STRINGVALUE'), Blockly.Variables.CATEGORY_NAME);
    var code = `${variable_stringvalue}.Value`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};
