
/*
* pycaret end
*/
/*
* pandas start
*/
Blockly.defineBlocksWithJsonArray([
    {
        type: "pandas_set_columns",
        message0: "Add Column to DataFrame  ",
        message1: "Columns to Set %1 ",
        previousStatement: null,
        nextStatement: null,
        tooltip: "Select columns mentioned in the list form pandas dataframe",
        setHelpUrl: "https://pandas.pydata.org/pandas-docs/stable/user_guide/indexing.html",

        args1: [
            {
                type: "input_value",
                name: "COLUMN",
                check: ["String", "Array"]
            }],
        message2: "Input Dataframe %1",
        args2: [
            {
                type: "input_value",
                name: "DATAFRAME_IN",
                check: "DataFrame"
            }],
        message3: "Output Dataframe %1",
        args3: [
            {
                type: "input_value",
                name: "DATAFRAME_OUT",
                check: "DataFrame"
            }]
    }
]);
