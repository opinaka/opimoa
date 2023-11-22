

Blockly.defineBlocksWithJsonArray([
    {
        type: "dict_append",
        previousStatement: null,
        nextStatement: null,
        tooltip: "Add Key and Value Dictionary",
        setHelpUrl: "https://docs.python.org/3/tutorial/datastructures.html",
        message0: "Add Values to Dictionary",
        message1: "Input Dictionary %1",
        args1: [
            {
                type: "input_value",
                name: "DICTIONARY",
                check: "DICT"
            }],

        message2: "Key %1",
        args2: [
            {
                type: "input_value",
                name: "KEY"
            }],
        message3: "Value %1",
        args3: [
            {
                type: "input_value",
                name: "VALUE",
            }]
    }
]);