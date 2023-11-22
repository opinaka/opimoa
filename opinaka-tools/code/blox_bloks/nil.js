

// Lua nil value
Blockly.Blocks['nil'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("nil");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['nil'] = function (block) {
    var code = 'nil';
    return [code, Blockly.Lua.ORDER_NONE];
};
