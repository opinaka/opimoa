
// gui

// GuiButton
// RBXScriptSignal MouseButton1Click ( )
// Fired when the mouse has fully left clicked the GUI button
Blockly.Blocks['gui_button_mouse1_click'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("when")
            .appendField(new Blockly.FieldVariable("gui_button"), "BUTTON")
            .appendField("is clicked with the left mouse button");
        this.appendStatementInput("ACTION")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['gui_button_mouse1_click'] = function (block) {
    var variable_button = Blockly.Lua.nameDB_.getName(block.getFieldValue('BUTTON'), Blockly.Variables.CATEGORY_NAME);
    var statements_action = Blockly.Lua.statementToCode(block, 'ACTION');
    var code = `${variable_button}.MouseButton1Click:Connect(function()
${statements_action}
end)
`;
    return code;
}