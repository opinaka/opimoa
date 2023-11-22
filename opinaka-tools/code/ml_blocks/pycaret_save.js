
Blockly.defineBlocksWithJsonArray([
    {
        type: "pycaret_save",
        colour: 0,
        previousStatement: null,
        nextStatement: null,
        message0: "Save()",
        message1: "Model %1",
        args1: [
            {
                type: "input_value",
                check: "Pycaret_Model",
                name: "input_model",

            }],
        message2: "Name %1",
        args2: [
            {
                type: "input_value",
                check: "String",
                name: "input_data",

            }],
        inputsInline: 0
    }
])
