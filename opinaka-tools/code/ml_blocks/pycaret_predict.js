
Blockly.defineBlocksWithJsonArray([
    {
        type: "pycaret_predict",
        colour: 0,
        output: "DataFrame",
        message0: "Predict()",
        message1: "Model %1",
        args1: [
            {
                type: "input_value",
                check: "pycaret_model",
                name: "input_model",

            }],
        message2: "Data %1",
        args2: [
            {
                type: "input_value",
                check: "DataFrame",
                name: "input_data",

            }],
        inputsInline: 0
    }
])