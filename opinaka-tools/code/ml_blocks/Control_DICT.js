
Blockly.defineBlocksWithJsonArray([
    { type: "Control_DICT", message0: "Control_DICT", nextStatement: null, enableContextMenu: !1, style: "logic_blocks" },
    { type: "DICT_Element", message0: "Key : Value", previousStatement: null, nextStatement: null, enableContextMenu: !1, style: "logic_blocks" }
]);

Blockly.Extensions.registerMutator("DICT_mutator", Blockly.Constants.Logic.DICT_Logic, null, ["DICT_Element"]);
