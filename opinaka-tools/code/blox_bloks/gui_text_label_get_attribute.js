
// TextLabel get various attributes
// Text, TextTransparency
Blockly.Blocks['gui_text_label_get_attribute'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get")
            .appendField(new Blockly.FieldDropdown([
                ["Text", "Text"],
                ["TextTransparency", "TextTransparency"]
            ]), "ATTRIBUTE")
            .appendField("of")
            .appendField(new Blockly.FieldVariable("gui_text_label"), "GUI_TEXT_LABEL");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    },
};

Blockly.Lua['gui_text_label_get_attribute'] = function (block) {
    var dropdown_attribute = block.getFieldValue('ATTRIBUTE');
    var variable_gui_text_label = Blockly.Lua.nameDB_.getName(block.getFieldValue('GUI_TEXT_LABEL'), Blockly.Variables.CATEGORY_NAME);
    var code = `${variable_gui_text_label}.${dropdown_attribute}`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
}
