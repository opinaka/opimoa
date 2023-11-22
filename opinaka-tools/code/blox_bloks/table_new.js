
// Create a new lua table with args
Blockly.Blocks['table_new'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("new table");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
        this.setMutator(new Blockly.Mutator(["anon_fn_arg"]))
        this.mixin(tableArgsMutator)
    },
}

Blockly.Lua['table_new'] = function (block) {
    var code = '{\n';
    var args = block.args;
    for (var i = 0; i < args.length; i++) {
        var argParts = args[i].split(':');
        var argName = argParts[0];
        // get value input for ARG + i
        var argValue = Blockly.Lua.valueToCode(block, 'ARG' + i, Blockly.Lua.ORDER_ATOMIC);
        code += `  ${argName} = ${argValue},\n`;
    }
    code += '}';
    return [code, Blockly.Lua.ORDER_ATOMIC];
};
