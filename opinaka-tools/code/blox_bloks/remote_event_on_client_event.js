

// RemoteEvent
// RBXScriptSignal OnClientEvent ( Tuple arguments )
Blockly.Blocks['remote_event_on_client_event'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("when")
            .appendField(new Blockly.FieldVariable("remote_event"), "REMOTE_EVENT")
            .appendField("is received on the client");
        this.appendDummyInput("ARGS")
            .appendField("with")
            .setVisible(false);
        this.appendStatementInput("ACTION")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
        this.setMutator(new Blockly.Mutator([]));
        this.argCount_ = [];
    },
    ...argCountMutatorMixin,
    updateShape_: function () {
        let argsInput = this.getInput("ARGS");
        if (this.argCount_ == 0) {
            argsInput.setVisible(false);
        } else {
            argsInput.setVisible(true);
            while (this.argCount_ < argsInput.fieldRow.length - 1) {
                argsInput.removeField("ARG" + (argsInput.fieldRow.length - 2));
            }
            while (this.argCount_ > argsInput.fieldRow.length - 1) {
                argsInput.appendField(new Blockly.FieldVariable("arg" + (argsInput.fieldRow.length - 1)), "ARG" + (argsInput.fieldRow.length - 1));
            }
        }
    },
};

Blockly.Lua['remote_event_on_client_event'] = function (block) {
    var variable_remote_event = Blockly.Lua.nameDB_.getName(block.getFieldValue('REMOTE_EVENT'), Blockly.Variables.CATEGORY_NAME);
    var statements_action = Blockly.Lua.statementToCode(block, 'ACTION');
    let args = [];
    for (let i = 0; i < block.argCount_; i++) {
        let arg = Blockly.Lua.nameDB_.getName(block.getFieldValue('ARG' + i), Blockly.Variables.CATEGORY_NAME);
        args.push(arg);
    }
    var code = `${variable_remote_event}.OnClientEvent:Connect(function(${args.join(', ')})
    ${statements_action}
end)
`;
    return code;
};
