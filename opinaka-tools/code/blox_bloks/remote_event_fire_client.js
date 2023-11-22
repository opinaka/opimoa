
// RemoteEvent
// void FireClient ( Player player , Tuple arguments )
// Fires RemoteEvent.OnClientEvent for the specified player.
Blockly.Blocks['remote_event_fire_client'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("send")
            .appendField(new Blockly.FieldVariable("remote event"), "REMOTE_EVENT")
            .appendField("to the client for")
            .appendField(new Blockly.FieldVariable("player"), "PLAYER");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
        this.setMutator(new Blockly.Mutator([]))
        this.argCount_ = [];
    },
    ...argCountMutatorMixin,
    updateShape_: function () {
        // remove TXT_WITH_ARGS field
        if (this.inputList[0].fieldRow.length == 5) {
            if (this.argCount_ == 0) {
                this.inputList[0].removeField("TXT_WITH_ARGS");
            }
        } else {
            if (this.argCount_ > 0) {
                this.inputList[0]
                    .appendField(new Blockly.FieldLabelSerializable("with args"), "TXT_WITH_ARGS")
            }
        }
        // synchronize value inputs with argCount_
        while (this.argCount_ < this.inputList.length - 1) {
            this.removeInput("ARG" + (this.inputList.length - 2));
        }
        while (this.argCount_ > this.inputList.length - 1) {
            this.appendValueInput("ARG" + (this.inputList.length - 1))
                .setCheck(null)
        }
    },
};

Blockly.Lua['remote_event_fire_client'] = function (block) {
    var variable_remote_event = Blockly.Lua.nameDB_.getName(block.getFieldValue('REMOTE_EVENT'), Blockly.Variables.CATEGORY_NAME);
    var variable_player = Blockly.Lua.nameDB_.getName(block.getFieldValue('PLAYER'), Blockly.Variables.CATEGORY_NAME);
    let values = [variable_player];
    for (let i = 0; i < block.argCount_; i++) {
        values.push(Blockly.Lua.valueToCode(block, 'ARG' + i, Blockly.Lua.ORDER_ATOMIC));
    }
    var code = `${variable_remote_event}:FireClient(${values.join(', ')})\n`;
    return code;
};