

// Instance WaitForChild ( string childName , double timeOut )
// Returns the child of the Instance with the given name. If the child does not exist, it will yield the current thread until it does.
Blockly.Blocks['instance_wait_for_child'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("wait for child of")
            .appendField(new Blockly.FieldVariable("instance"), "INSTANCE");
        this.appendValueInput("NAME")
            .setCheck("String")
            .appendField("named");
        this.appendDummyInput()
            .appendField("with timeout")
            .appendField(new Blockly.FieldNumber(1), "TIMEOUT");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['instance_wait_for_child'] = function (block) {
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.CATEGORY_NAME);
    var value_name = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_ATOMIC);
    var number_timeout = block.getFieldValue('TIMEOUT');
    var code = `${variable_instance}:WaitForChild(${value_name}, ${number_timeout})`;
    return [code, Blockly.Lua.ORDER_NONE];
};