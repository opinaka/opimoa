

// Set various attributes of GuiObject
// Visible
Blockly.Blocks['gui_object_set_attribute'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck(null)
            .appendField("set")
            .appendField(new Blockly.FieldDropdown([["Visible", "Visible"]]), "ATTRIBUTE")
            .appendField("of")
            .appendField(new Blockly.FieldVariable("gui_object"), "GUI_OBJECT")
            .appendField("to");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['gui_object_set_attribute'] = function (block) {
    var dropdown_attribute = block.getFieldValue('ATTRIBUTE');
    var variable_gui_object = Blockly.Lua.nameDB_.getName(block.getFieldValue('GUI_OBJECT'), Blockly.Variables.CATEGORY_NAME);
    var value_value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_ATOMIC);
    var code = `${variable_gui_object}.${dropdown_attribute} = ${value_value}\n`;
    return code;
};
