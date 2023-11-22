
// Get various attributes of a Player
// Character, DisplayName, Name, UserId
Blockly.Blocks['player_get_attribute'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get")
            .appendField(new Blockly.FieldDropdown([
                ["Character", "Character"],
                ["DisplayName", "DisplayName"],
                ["Name", "Name"],
                ["UserId", "UserId"],
            ]), "ATTRIBUTE")
            .appendField("of")
            .appendField(new Blockly.FieldVariable("player"), "PLAYER");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['player_get_attribute'] = function (block) {
    var dropdown_attribute = block.getFieldValue('ATTRIBUTE');
    var variable_player = Blockly.Lua.variableDB_.getName(block.getFieldValue('PLAYER'), Blockly.Variables.CATEGORY_NAME);
    var code = `${variable_player}.${dropdown_attribute}`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};