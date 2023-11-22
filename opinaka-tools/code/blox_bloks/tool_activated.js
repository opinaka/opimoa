
// End anonymous function mutator blocks

Blockly.Blocks['tool_activated'] = {
    init: function () {
        this.appendDummyInput("DUMMY")
            .appendField("when")
            .appendField(new Blockly.FieldVariable("tool"), "TOOL")
            .appendField("is activated");
        this.appendStatementInput("HANDLER")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
        this.setMutator(new Blockly.Mutator(["anon_fn_arg"]))
        this.mixin(anonFnArgsMutator)
    },
};

Blockly.Lua['tool_activated'] = function (block) {
    var variable_tool = Blockly.Lua.variableDB_.getName(block.getFieldValue('TOOL'), Blockly.Variables.CATEGORY_NAME);
    var argsList = getArgList(block)
    var statements_handler = Blockly.Lua.statementToCode(block, 'HANDLER');
    var code = (
        `${variable_tool}.Activated:Connect(function(${argsList})
    ${statements_handler}
end)\n`);
    return code;
};