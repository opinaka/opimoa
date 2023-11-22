
// void Play ()
// Plays the AnimationTrack
Blockly.Blocks['animation_track_play'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("play")
            .appendField(new Blockly.FieldVariable("animation_track"), "ANIMATION_TRACK");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['animation_track_play'] = function (block) {
    var variable_animation_track = Blockly.Lua.variableDB_.getName(block.getFieldValue('ANIMATION_TRACK'), Blockly.Variables.CATEGORY_NAME);
    var code = `${variable_animation_track}:Play()\n`;
    return code;
};
