
// Get an attribute of a table
Blockly.Blocks['table_get_attribute'] = {
    init: function () {
        this.appendValueInput("ATTRIBUTE")
            .setCheck(null)
            .appendField("get");
        this.appendDummyInput()
            .appendField("of")
            .appendField(new Blockly.FieldVariable("table"), "TABLE");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['table_get_attribute'] = function (block) {
    var value_attribute = Blockly.Lua.valueToCode(block, 'ATTRIBUTE', Blockly.Lua.ORDER_ATOMIC);
    var variable_table = Blockly.Lua.nameDB_.getName(block.getFieldValue('TABLE'), Blockly.Variables.CATEGORY_NAME);
    var code = `${variable_table}[${value_attribute}]`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};