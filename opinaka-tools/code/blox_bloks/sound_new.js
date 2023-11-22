
// new sound
Blockly.Blocks['sound_new'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("new sound with id")
            .appendField(new Blockly.FieldTextInput("0123456789"), "SOUND_ID");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// lua function creates sound in wrapper function and returns it.
Blockly.Lua['sound_new'] = function (block) {
    var text_sound_id = block.getFieldValue('SOUND_ID');
    var code = `(function()
    local sound = Instance.new("Sound")
    sound.SoundId = "rbxassetid://${text_sound_id}"
    return sound
end)()`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};