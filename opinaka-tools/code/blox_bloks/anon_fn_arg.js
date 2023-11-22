

Blockly.Blocks['anon_fn_arg'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("input name:")
            .appendField(new Blockly.FieldTextInput("item"), "NAME");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

function getArgList(block) {
    const argNames = (block.args || []).map(arg => arg.split(":")[0])
    const argsList = argNames.length > 0 ? argNames.join(",") : ""
    return argsList
}
