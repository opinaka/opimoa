
// TextLabel set various attributes
// Text, TextTransparency
Blockly.Blocks['gui_text_label_set_attribute'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck(null)
            .appendField("set")
            .appendField(new Blockly.FieldDropdown([
                ["Text", "Text"],
                ["TextTransparency", "TextTransparency"]
            ]), "ATTRIBUTE")
            .appendField("of")
            .appendField(new Blockly.FieldVariable("gui_text_label"), "GUI_TEXT_LABEL")
            .appendField("to");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['gui_text_label_set_attribute'] = function (block) {
    var dropdown_attribute = block.getFieldValue('ATTRIBUTE');
    var variable_gui_text_label = Blockly.Lua.nameDB_.getName(block.getFieldValue('GUI_TEXT_LABEL'), Blockly.Variables.CATEGORY_NAME);
    var value_value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_ATOMIC);
    var code = `${variable_gui_text_label}.${dropdown_attribute} = ${value_value}\n`;
    return code;
}