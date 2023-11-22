

// Animator loads an animation
// AnimationTrack LoadAnimation ( Animation animation )
// Loads an Animation onto an Animator, returning an AnimationTrack
Blockly.Blocks['animator_load_animation'] = {
    init: function () {
        this.appendValueInput("ANIMATION")
            .setCheck(null)
            .appendField("load")
            .appendField(new Blockly.FieldVariable("animator"), "ANIMATOR")
            .appendField("with animation");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['animator_load_animation'] = function (block) {
    var variable_animator = Blockly.Lua.variableDB_.getName(block.getFieldValue('ANIMATOR'), Blockly.Variables.CATEGORY_NAME);
    var value_animation = Blockly.Lua.valueToCode(block, 'ANIMATION', Blockly.Lua.ORDER_ATOMIC);
    var code = `${variable_animator}:LoadAnimation(${value_animation})`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};
