
Blockly.defineBlocksWithJsonArray([
    {
        type: "Print",
        previousStatement: null,
        nextStatement: null,
        message0: "Print %1",
        args0: [
            { type: "input_value", name: "INPUT" }
        ],
        message1: " End: %1",
        args1: [
            {
                type: "field_dropdown",
                name: "END",
                options: [["New Line", "newLine"],
                ["Tab", "tab"],
                ["Space", "space"],
                ["Comma", "comma"]]
            }],
        inputsInline: 0
    }
]);