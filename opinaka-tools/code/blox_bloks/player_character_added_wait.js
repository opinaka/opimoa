
// PlayerService player added event wait
// RBXScriptSignal PlayerAdded ( Player player )
Blockly.Blocks['player_character_added_wait'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("wait for")
            .appendField(new Blockly.FieldVariable("player"), "PLAYER")
            .appendField("character to be added");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['player_character_added_wait'] = function (block) {
    var variable_player = Blockly.Lua.variableDB_.getName(block.getFieldValue('PLAYER'), Blockly.Variables.CATEGORY_NAME);
    var code = `${variable_player}.CharacterAdded:Wait()`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};
