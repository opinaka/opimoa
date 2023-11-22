

// void task.spawn ( function functionOrThread, Variant ... )
// Accepts a function or a thread (as returned by coroutine.create) and calls/resumes it immediately through the engine’s scheduler. Arguments after the first are sent to the function/thread.
Blockly.Blocks['spawn_thread'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("spawn thread");
        this.appendStatementInput("FUNCTION")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['spawn_thread'] = function (block) {
    var statements_function = Blockly.Lua.statementToCode(block, 'FUNCTION');
    var code = `task.spawn(function()
    ${statements_function}
    end)\n`;
    return code;
};