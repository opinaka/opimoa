
Blockly.Blocks['anon_fn_args_container'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("args");
        this.appendStatementInput("ARGS")
            .setCheck(null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
