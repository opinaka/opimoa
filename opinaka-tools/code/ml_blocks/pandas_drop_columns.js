
Blockly.defineBlocksWithJsonArray([
    {
        type: "pandas_drop_columns",
        message0: "Dataframe Drop Columns  ",
        message1: "Columns to Drop %1 ",
        tooltip: "Select columns mentioned in the list/string will be dropped pandas dataframe",

        args1: [
            {
                type: "input_value",
                name: "COLUMN",
                check: ["String", "Array"],
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
        output: ["DataFrame", "DataFrameSeries"]
    }
]);
