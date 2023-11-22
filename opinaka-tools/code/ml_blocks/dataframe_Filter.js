
Blockly.defineBlocksWithJsonArray([
    {
        type: "dataframe_Filter",
        message0: "DataFrame Filter \n %1 %2 %3 Apply to %4",
        args0: [
            { type: "input_value", name: "A" },
            {
                type: "field_dropdown",
                name: "OP",
                options: [
                    ["=", "EQ"],
                    ["\u2260", "NEQ"],
                    ["\u200f<", "LT"],
                    ["\u200f\u2264", "LTE"],
                    ["\u200f>", "GT"],
                    ["\u200f\u2265", "GTE"],
                ],
            },
            { type: "input_value", name: "B" },
            { type: "input_value", name: "C" },
        ],
        inputsInline: !0,
        output: "DataFrame",
    }
]);
