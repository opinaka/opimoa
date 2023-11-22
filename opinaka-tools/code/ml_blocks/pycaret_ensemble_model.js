

Blockly.defineBlocksWithJsonArray([
    {
        type: "pycaret_ensemble_model",
        colour: 0,
        output: "Pycaret_Model",
        message0: "Ensemble Models()",
        message1: "Input Model %1",
        args1: [
            {
                type: "input_value",
                check: "Pycaret_Model",
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
                    ["Boosting", "Boosting"],
                    ["Bagging", "Bagging"],
                ]

            }],
        inputsInline: 0
    }
])