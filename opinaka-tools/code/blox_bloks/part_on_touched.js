

// RBXScriptSignal Touched ( BasePart otherPart )
// Fired when a part comes in contact with another part
Blockly.Blocks['part_on_touched'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("when")
            .appendField(new Blockly.FieldVariable("part"), "PART")
            .appendField("is touched by")
            .appendField(new Blockly.FieldVariable("other_part"), "OTHER_PART")
            .appendField("do");
        this.appendStatementInput("NAME")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['part_on_touched'] = function (block) {
    var variable_part = Blockly.Lua.variableDB_.getName(block.getFieldValue('PART'), Blockly.Variables.CATEGORY_NAME);
    var variable_other_part = Blockly.Lua.variableDB_.getName(block.getFieldValue('OTHER_PART'), Blockly.Variables.CATEGORY_NAME);
    var statements_name = Blockly.Lua.statementToCode(block, 'NAME');
    var code = `${variable_part}.Touched:Connect(function(${variable_other_part})
    ${statements_name}
end)\n`;
    return code;
};