

// play tween
// tween is a variable input
Blockly.Blocks['tween_play'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("play tween")
            .appendField(new Blockly.FieldVariable("tween"), "TWEEN");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['tween_play'] = function (block) {
    var variable_tween = Blockly.Lua.variableDB_.getName(block.getFieldValue('TWEEN'), Blockly.Variables.CATEGORY_NAME);
    var code = `${variable_tween}:Play()\n`;
    return code;
};