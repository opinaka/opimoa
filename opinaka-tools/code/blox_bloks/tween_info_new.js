


// TweenService

// new tween info (just the time)
Blockly.Blocks['tween_info_new'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("new tween info")
        this.appendValueInput("TIME")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("time");
        this.setOutput(true, "TweenInfo");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['tween_info_new'] = function (block) {
    var value_time = Blockly.Lua.valueToCode(block, 'TIME', Blockly.Lua.ORDER_ATOMIC);
    var code = `TweenInfo.new(${value_time})`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};
