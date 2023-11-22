

// Set an attribute of a table
Blockly.Blocks['table_set_attribute'] = {
    init: function () {
        this.appendValueInput("ATTRIBUTE")
            .setCheck(null)
            .appendField("set");
        this.appendValueInput("VALUE")
            .setCheck(null)
            .appendField("of")
            .appendField(new Blockly.FieldVariable("table"), "TABLE")
            .appendField("to");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['table_set_attribute'] = function (block) {
    var value_attribute = Blockly.Lua.valueToCode(block, 'ATTRIBUTE', Blockly.Lua.ORDER_ATOMIC);
    var variable_table = Blockly.Lua.nameDB_.getName(block.getFieldValue('TABLE'), Blockly.Variables.CATEGORY_NAME);
    var value_value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_ATOMIC);
    var code = `${variable_table}[${value_attribute}] = ${value_value}\n`;
    return code;
};