
// marketplace PromptGamePassPurchaseFinished event
// RBXScriptSignal 
// PromptGamePassPurchaseFinished ( Instance player , int64 gamePassId , bool wasPurchased )
Blockly.Blocks['marketplace_game_pass_purchased'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("when a gamepass with")
            .appendField(new Blockly.FieldVariable("id"), "GAMEPASS")
            .appendField("is purchased by")
            .appendField(new Blockly.FieldVariable("player"), "PLAYER");
        this.appendStatementInput("HANDLER")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['marketplace_game_pass_purchased'] = function (block) {
    var variable_gamepass = Blockly.Lua.nameDB_.getName(block.getFieldValue('GAMEPASS'), Blockly.Variables.CATEGORY_NAME);
    var variable_player = Blockly.Lua.nameDB_.getName(block.getFieldValue('PLAYER'), Blockly.Variables.CATEGORY_NAME);
    var statements_handler = Blockly.Lua.statementToCode(block, 'HANDLER');
    var code = `game:GetService("MarketplaceService").PromptGamePassPurchaseFinished:Connect(function(${variable_player}, ${variable_gamepass}, purchaseSuccess)
    if purchaseSuccess == true then
        ${statements_handler}
    end
end)`;
    return code;
};