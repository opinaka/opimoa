

// Sound:Play() function
Blockly.Blocks['sound_play'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("play")
            .appendField(new Blockly.FieldVariable("sound"), "SOUND");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['sound_play'] = function (block) {
    var variable_sound = Blockly.Lua.variableDB_.getName(block.getFieldValue('SOUND'), Blockly.Variables.CATEGORY_NAME);
    var code = `${variable_sound}:Play()\n`;
    return code;
};
