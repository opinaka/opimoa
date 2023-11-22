
// Gets the parent attribute of the current script
Blockly.Blocks['script_get_parent'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get the parent of this script");
        this.setOutput(true, "Instance");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['script_get_parent'] = function (block) {
    var code = "script.Parent";
    return [code, Blockly.Lua.ORDER_ATOMIC];
};