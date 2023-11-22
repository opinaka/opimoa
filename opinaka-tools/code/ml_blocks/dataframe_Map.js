

Blockly.defineBlocksWithJsonArray([
    {
        type: "dataframe_Map",
        message0: "DataFrame Map \n %1 Apply to %2",
        args0: [
            { type: "input_value", name: "Map", check: "DICT" },
            { type: "input_value", name: "Series", check: "DataFrameSeries" },
        ],
        inputsInline: !0,
        output: ["DataFrame", "DataFrameSeries"],
    }
]);

