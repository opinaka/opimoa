
// datastore

// Get DataStore from the DataStoreService by name
// GlobalDataStore GetDataStore ( string name )
Blockly.Blocks['datastorage_svc_get_datastore'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get datastore named ");
        this.appendValueInput("NAME")
            .setCheck(null);
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['datastorage_svc_get_datastore'] = function (block) {
    var value_name = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_ATOMIC);
    var code = `game:GetService("DataStoreService"):GetDataStore(${value_name})`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};
