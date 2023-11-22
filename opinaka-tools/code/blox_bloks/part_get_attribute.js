
// part blocks

// get various attributes of a part
// CanCollide, CFrame, Position, BrickColor, Transparency, CanTouch
Blockly.Blocks['part_get_attribute'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get")
            .appendField(new Blockly.FieldDropdown([
                ["CanCollide", "CanCollide"],
                ["CFrame", "CFrame"],
                ["Position", "Position"],
                ["BrickColor", "BrickColor"],
                ["Transparency", "Transparency"],
                ["CanTouch", "CanTouch"],
            ]), "ATTRIBUTE")
            .appendField("of")
            .appendField(new Blockly.FieldVariable("part"), "PART");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['part_get_attribute'] = function (block) {
    var variable_part = Blockly.Lua.variableDB_.getName(block.getFieldValue('PART'), Blockly.Variables.CATEGORY_NAME);
    var dropdown_attribute = block.getFieldValue('ATTRIBUTE');
    var code = `${variable_part}["${dropdown_attribute}"]`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
}
