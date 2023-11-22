
/*
* pycaret
*/

Blockly.defineBlocksWithJsonArray([
    {
        type: "pycaret_setup",
        colour: 0,
        previousStatement: null,
        nextStatement: null,
        message0: "Setup()",
        message1: "Input Dataset %1",
        args1: [
            {
                type: "input_value",
                name: "input_data",
                check: "DataFrame"
            }],
        message2: "Target Column %1",
        args2: [
            {
                type: "input_value",
                name: "input_column",
                check: "String"
            }],
        message3: "Algorithm Type Column %1",
        args3: [
            {
                type: "field_dropdown",
                name: "algorithm",
                options: [
                    ["Classification", "Classification"],
                    ["Regression", "Regression"]
                ],
            }],
        inputsInline: 0
    }
])
