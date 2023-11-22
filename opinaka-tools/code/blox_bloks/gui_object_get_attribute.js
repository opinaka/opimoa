

// get various attributes of GuiObject
// Visible
Blockly.Blocks['gui_object_get_attribute'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get")
            .appendField(new Blockly.FieldDropdown([["Visible", "Visible"]]), "ATTRIBUTE")
            .appendField("of")
            .appendField(new Blockly.FieldVariable("gui_object"), "GUI_OBJECT");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['gui_object_get_attribute'] = function (block) {
    var dropdown_attribute = block.getFieldValue('ATTRIBUTE');
    var variable_gui_object = Blockly.Lua.nameDB_.getName(block.getFieldValue('GUI_OBJECT'), Blockly.Variables.CATEGORY_NAME);
    var code = `${variable_gui_object}.${dropdown_attribute}`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};