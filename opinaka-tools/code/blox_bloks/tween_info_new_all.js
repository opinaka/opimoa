
// new tween info (all the info)
Blockly.Blocks['tween_info_new_all'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("new tween info")
        this.appendValueInput("TIME")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("time");
        // easing style dropdown - Back, Quad, Sine, Cubic, Quart
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("easing style")
            .appendField(new Blockly.FieldDropdown([
                ["Back", "Enum.EasingStyle.Back"],
                ["Quad", "Enum.EasingStyle.Quad"],
                ["Sine", "Enum.EasingStyle.Sine"],
                ["Cubic", "Enum.EasingStyle.Cubic"],
                ["Quart", "Enum.EasingStyle.Quart"],
            ]), "EASING_STYLE");
        // easing direction dropdown - In, Out, InOut
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("easing direction")
            .appendField(new Blockly.FieldDropdown([
                ["In", "Enum.EasingDirection.In"],
                ["Out", "Enum.EasingDirection.Out"],
                ["InOut", "Enum.EasingDirection.InOut"],
            ]), "EASING_DIRECTION");
        // repeat count
        this.appendValueInput("REPEAT_COUNT")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("repeat count");
        // reverse
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("reverse")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "REVERSE");
        // delay time
        this.appendValueInput("DELAY_TIME")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("delay time");
        this.setOutput(true, "TweenInfo");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['tween_info_new_all'] = function (block) {
    var dropdown_easing_style = block.getFieldValue('EASING_STYLE');
    var dropdown_easing_direction = block.getFieldValue('EASING_DIRECTION');
    var value_time = Blockly.Lua.valueToCode(block, 'TIME', Blockly.Lua.ORDER_ATOMIC);
    var value_repeat_count = Blockly.Lua.valueToCode(block, 'REPEAT_COUNT', Blockly.Lua.ORDER_ATOMIC);
    var dropdown_reverse = block.getFieldValue('REVERSE');
    var value_delay_time = Blockly.Lua.valueToCode(block, 'DELAY_TIME', Blockly.Lua.ORDER_ATOMIC);
    var code = `TweenInfo.new(${value_time}, ${dropdown_easing_style}, ${dropdown_easing_direction}, ${value_repeat_count}, ${dropdown_reverse}, ${value_delay_time})`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};