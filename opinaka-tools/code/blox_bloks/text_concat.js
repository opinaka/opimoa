
// text blocks

// Concat two strings
Blockly.Blocks['text_concat'] = {
    init: function () {
        this.appendValueInput("VALUE1")
            .setCheck(null)
            .appendField("concat");
        this.appendValueInput("VALUE2")
            .setCheck(null)
            .appendField("and");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['text_concat'] = function (block) {
    var value_value1 = Blockly.Lua.valueToCode(block, 'VALUE1', Blockly.Lua.ORDER_ATOMIC);
    var value_value2 = Blockly.Lua.valueToCode(block, 'VALUE2', Blockly.Lua.ORDER_ATOMIC);
    var code = `${value_value1}..${value_value2}`;
    return [code, Blockly.Lua.ORDER_NONE];
};