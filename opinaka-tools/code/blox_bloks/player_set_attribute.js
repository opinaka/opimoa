

// Set various attributes of a Player
// Character, DisplayName, Name, UserId
Blockly.Blocks['player_set_attribute'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck(null)
            .appendField("set")
            .appendField(new Blockly.FieldDropdown([
                ["Character", "Character"],
                ["DisplayName", "DisplayName"],
                ["Name", "Name"],
                ["UserId", "UserId"],
            ]), "ATTRIBUTE")
            .appendField("of")
            .appendField(new Blockly.FieldVariable("player"), "PLAYER")
            .appendField("to");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['player_set_attribute'] = function (block) {
    var dropdown_attribute = block.getFieldValue('ATTRIBUTE');
    var variable_player = Blockly.Lua.variableDB_.getName(block.getFieldValue('PLAYER'), Blockly.Variables.CATEGORY_NAME);
    var value_value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_ATOMIC);
    var code = `${variable_player}.${dropdown_attribute} = ${value_value}\n`;
    return code;
};
