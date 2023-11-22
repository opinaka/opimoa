

// mutator UI for argument count
Blockly.Blocks['arg_count'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("arg count:")
            .appendField(new Blockly.FieldNumber(0, 0, 10), "ARG_COUNT");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// argument count mutator mixin
const argCountMutatorMixin = {
    saveExtraState: function () {
        return {
            "argCount": this.argCount_,
        };
    },
    loadExtraState: function (state) {
        this.argCount_ = state["argCount"] || 0;
        this.updateShape_();
    },
    decompose: function (workspace) {
        const topBlock = workspace.newBlock('arg_count');
        topBlock.setFieldValue(this.argCount_, 'ARG_COUNT');
        topBlock.initSvg()
        return topBlock;
    },
    compose: function (topBlock) {
        this.argCount_ = parseInt(topBlock.getFieldValue('ARG_COUNT'));
        this.updateShape_();
    }
};
