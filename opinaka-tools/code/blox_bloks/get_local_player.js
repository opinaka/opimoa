

// PlayerService gets the LocalPlayer attribute
Blockly.Blocks['get_local_player'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get local player");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['get_local_player'] = function (block) {
    var code = `game:GetService("Players").LocalPlayer`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};
