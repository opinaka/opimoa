
// Get an item from a Datastore
Blockly.Blocks['datastorage_svc_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get data ");
        this.appendValueInput("NAME")
            .setCheck(null);
        this.appendDummyInput()
            .appendField("from datastore ")
            .appendField(new Blockly.FieldVariable("datastore"), "DATASTORE");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// wrapper function for simpler usage
Blockly.Lua['datastorage_svc_get'] = function (block) {
    var value_name = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_ATOMIC);
    var variable_datastore = Blockly.Lua.variableDB_.getName(block.getFieldValue('DATASTORE'), Blockly.Variables.CATEGORY_NAME);
    // TODO: Assemble Lua into code variable.
    var code = `(function()
    local success, result = pcall(function()
        return ${variable_datastore}:GetAsync(${value_name})
    end)
    if not success then
        print(result)
        return nil
    end
    return result
end)()
`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};
