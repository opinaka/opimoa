
// table loops

// Iterates through a table using the pairs function
Blockly.Blocks['table_pairs_foreach'] = {
    init: function () {
        this.appendValueInput("NAME")
            .setCheck(null)
            .appendField("for each")
            .appendField(new Blockly.FieldVariable("item"), "ITEM")
            .appendField("in");
        this.appendDummyInput()
            .appendField("do");
        this.appendStatementInput("HANDLER")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['table_pairs_foreach'] = function (block) {
    var variable_item = Blockly.Lua.nameDB_.getName(block.getFieldValue('ITEM'), Blockly.Variables.CATEGORY_NAME);
    var value_name = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_ATOMIC);
    var statements_handler = Blockly.Lua.statementToCode(block, 'HANDLER');

    var code = `for i, ${variable_item} in pairs(${value_name}) do
${statements_handler}
end
`;
    return code;
};
