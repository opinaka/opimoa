
// PlayerService get players function
// Objects GetPlayers ( )
// Returns a table of all presently connected Player objects
Blockly.Blocks['get_players'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get players");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['get_players'] = function (block) {
    var code = `game:GetService("Players"):GetPlayers()`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};
