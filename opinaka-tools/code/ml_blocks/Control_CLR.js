

Blockly.defineBlocksWithJsonArray([
    { type: "Control_CLR", message0: "Control_CLR", nextStatement: null, enableContextMenu: !1, style: "logic_blocks" },
    { type: "CLR_Train", message0: "Training Data", previousStatement: null, nextStatement: null, enableContextMenu: !1, style: "logic_blocks" },
    { type: "CLR_Test", message0: "Testing Data", previousStatement: null, nextStatement: null, enableContextMenu: !1, style: "logic_blocks" },
    { type: "CLR_Valid", message0: "Validation Data", previousStatement: null, nextStatement: null, enableContextMenu: !1, style: "logic_blocks" },
    { type: "CLR_Params", message0: "Parameters", previousStatement: null, nextStatement: null, enableContextMenu: !1, style: "logic_blocks" }
]);

Blockly.Extensions.registerMutator("CLR_mutator", Blockly.Constants.Logic.CLR_Logic, null, ["CLR_Valid", "CLR_Train", "CLR_Params", "CLR_Test"]);
