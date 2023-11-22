
Blockly.defineBlocksWithJsonArray([
    {
        type: "pycaret_blend_model",
        colour: 0,
        output: "Pycaret_Model",
        message0: "Blend Models()",
        message1: "List of Models %1",
        args1: [
            {
                type: "input_value",
                check: "Array",
                name: "input_models",

            }],
        message2: "Fold %1",
        args2: [
            {
                type: "input_value",
                check: "Number",
                name: "input_fold",

            }],
        message3: "method %1",
        args3: [
            {
                type: "field_dropdown",
                name: "input_method",
                options: [
                    ["Soft", "soft"],
                    ["Hard", "hard"],
                ]

            }],
        inputsInline: 0
    }
])