Blockly.Blocks['js_function_expression'] = {
    /**
     * Block for redering a function expression.
     * @this Blockly.Block
     */
    init: function() {
        this.setColour(290);
        this.appendDummyInput()
            .appendField("function");
        this.appendValueInput('NAME');
        this.appendValueInput('PARAM0')
            .appendField("(");
        this.appendDummyInput('END')
            .appendField(")");
        this.appendStatementInput('STACK');
        this.setInputsInline(true);

        this.setTooltip('Function expression.');


        this.setOutput(true);

    }
};
Blockly.JavaScript['js_function_expression'] = function(block) {
    var branch = Blockly.JavaScript.statementToCode(block, 'STACK');
    var name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    var args = [];
    for (var i = 0; i < block.paramCount; i++) {
        args[i] = Blockly.JavaScript.valueToCode(block, 'PARAM' + i, Blockly.JavaScript.ORDER_ATOMIC);
    }
    var code = 'yak.' + name + '=' + 'function ' +  '(' + args.join(', ') + ') {\n' + branch + '}';
    if (block.outputConnection) {
        return [code, Blockly.JavaScript.ORDER_ATOMIC];
    } else {
        return code + ';\n';
    }
};