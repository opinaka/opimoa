

Blockly.defineBlocksWithJsonArray([
    {
        type: "pandas_select_columns",
        message0: "Select DataFrame Columns  ",
        message1: "Columns to Select %1 ",
        tooltip: "Select columns mentioned in the list form pandas dataframe",
        setHelpUrl: "https://pandas.pydata.org/pandas-docs/stable/user_guide/indexing.html",

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
