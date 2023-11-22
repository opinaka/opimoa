
// control blocks

// number task.wait ( number duration = 0 )
// Yields the current thread until the given duration (in seconds) has elapsed, then resumes the thread on the next Heartbeat step. The actual amount of time elapsed is returned.
Blockly.Blocks['wait'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("wait")
            .appendField(new Blockly.FieldNumber(0, 0), "AMOUNT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['wait'] = function (block) {
    var number_amount = block.getFieldValue('AMOUNT');
    var code = `task.wait(${number_amount})\n`;
    return code;
};