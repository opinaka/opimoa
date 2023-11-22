
// void PromptGamePassPurchase ( Instance player , int64 gamePassId )
// Used to prompt a user to purchase a game pass with the given assetId.
Blockly.Blocks['marketplace_prompt_gamepass_purchase'] = {
    init: function () {
        this.appendValueInput("NAME")
            .setCheck(null)
            .appendField("prompt")
            .appendField(new Blockly.FieldVariable("player"), "PLAYER")
            .appendField("to purchase gamepass with id");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['marketplace_prompt_gamepass_purchase'] = function (block) {
    var variable_player = Blockly.Lua.nameDB_.getName(block.getFieldValue('PLAYER'), Blockly.Variables.CATEGORY_NAME);
    var value_name = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_ATOMIC);
    var code = `game:GetService("MarketplaceService"):PromptGamePassPurchase(${variable_player}, ${value_name})\n`;
    return code;
};
