
// sounds

// SoundService:PlayLocalSound(sound)
// Plays a sound locally
// sound is a variable
Blockly.Blocks['sound_service_play_local_sound'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("play local sound")
            .appendField(new Blockly.FieldVariable("sound"), "SOUND")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['sound_service_play_local_sound'] = function (block) {
    var variable_sound = Blockly.Lua.variableDB_.getName(block.getFieldValue('SOUND'), Blockly.Variables.CATEGORY_NAME);
    var code = `game:GetService("SoundService"):PlayLocalSound(${variable_sound})\n`;
    return code;
};
