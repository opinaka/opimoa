
// Set an item in a Datastore
Blockly.Blocks['datastorage_svc_set'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("set data ");
        this.appendValueInput("NAME")
            .setCheck(null);
        this.appendDummyInput()
            .appendField("in datastore ")
            .appendField(new Blockly.FieldVariable("datastore"), "DATASTORE");
        this.appendDummyInput()
            .appendField("to");
        this.appendValueInput("VALUE")
            .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['datastorage_svc_set'] = function (block) {
    var value_name = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_ATOMIC);
    var variable_datastore = Blockly.Lua.nameDB_.getName(block.getFieldValue('DATASTORE'), Blockly.Variables.CATEGORY_NAME);
    var value_value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_ATOMIC);
    var code = `local success, errorMessage = pcall(function()
    ${variable_datastore}:SetAsync(${value_name}, ${value_value})
end)
if not success then
    print(errorMessage)
end
`;
    return code;
};
