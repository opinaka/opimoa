
// Set StringValue.Value attribute
Blockly.Blocks['stringvalue_set_value'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck(null)
            .appendField("set value of")
            .appendField(new Blockly.FieldVariable("stringvalue"), "STRINGVALUE")
            .appendField("to");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['stringvalue_set_value'] = function (block) {
    var variable_stringvalue = Blockly.Lua.nameDB_.getName(block.getFieldValue('STRINGVALUE'), Blockly.Variables.CATEGORY_NAME);
    var value_value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_ATOMIC);
    var code = `${variable_stringvalue}.Value = ${value_value}\n`;
    return code;
};
