

// create tween
// value inputs with right-aligned labels: instance, tween info, goal
Blockly.Blocks['tween_create'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("create tween")
        this.appendValueInput("INSTANCE")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("instance");
        this.appendValueInput("TWEEN_INFO")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("tween info");
        this.appendValueInput("GOAL")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("goal");
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, "Tween");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['tween_create'] = function (block) {
    var value_instance = Blockly.Lua.valueToCode(block, 'INSTANCE', Blockly.Lua.ORDER_ATOMIC);
    var value_tween_info = Blockly.Lua.valueToCode(block, 'TWEEN_INFO', Blockly.Lua.ORDER_ATOMIC);
    var value_goal = Blockly.Lua.valueToCode(block, 'GOAL', Blockly.Lua.ORDER_ATOMIC);
    // game:GetService("TweenService")
    var code = `game:GetService("TweenService"):Create(${value_instance}, ${value_tween_info}, ${value_goal})`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};