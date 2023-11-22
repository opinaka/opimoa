

// Declare local variables. Uses declareLocalVariablesMutator mixin.
Blockly.Blocks['declare_local_variables'] = {
    init: function () {
        this.appendDummyInput("DUMMY")
            .appendField("declare local variables", "DECLARE_LABEL");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
        this.setMutator(new Blockly.Mutator(["anon_fn_arg"]))
        this.mixin(declareLocalVariablesMutator);
    }
}

Blockly.Lua['declare_local_variables'] = function (block) {
    var argsList = getArgList(block)
    var code = `local ${argsList}\n`;
    return code;
};
