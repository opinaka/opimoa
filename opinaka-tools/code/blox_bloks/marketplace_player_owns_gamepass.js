

// checks if player owns gamepass
Blockly.Blocks['marketplace_player_owns_gamepass'] = {
    init: function () {
        this.appendValueInput("NAME")
            .setCheck(null)
            .appendField(new Blockly.FieldVariable("player"), "PLAYER")
            .appendField("owns gamepass with id");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['marketplace_player_owns_gamepass'] = function (block) {
    var variable_player = Blockly.Lua.nameDB_.getName(block.getFieldValue('PLAYER'), Blockly.Variables.CATEGORY_NAME);
    var value_name = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_ATOMIC);
    var code = `(function()
    local hasPass = false
    local success, message = pcall(function()
        hasPass = game:GetService("MarketplaceService"):UserOwnsGamePassAsync(${variable_player}.UserId, ${value_name})
    end)
    if not success then
        warn("Error while checking if player has pass: " .. tostring(message))
        return false
    end
    return hasPass
end)()`;

    return [code, Blockly.Lua.ORDER_ATOMIC];
};
