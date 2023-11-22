
Blockly.defineBlocksWithJsonArray([
    {
        type: "pandas_sample",
        message0: "Dataframe Sampling  ",
        message1: "Sample Factor %1 ",
        tooltip: "Select columns mentioned in the list/string will be dropped pandas dataframe",

        args1: [
            {
                type: "input_value",
                name: "FACTOR",
                check: "Number",
                value: 0
            }],
        message2: "Input Dataframe %1",
        args2: [
            {
                type: "input_value",
                name: "DATAFRAME",
                check: "DataFrame",
                value: 0
            }],
        output: "DataFrame"
    }
]);
