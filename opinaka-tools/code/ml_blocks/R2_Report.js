
Blockly.defineBlocksWithJsonArray([
    {
        type: "R2_Report",
        output: "String",
        message0: "Generate Regression R2 score",
        message1: "Prediction %1",
        args1: [
            {
                type: "input_value",
                name: "Pred",
                check: "DataFrame"
            }],

        message2: "Ground Truth %1",
        args2: [
            {
                type: "input_value",
                name: "True",
                check: "DataFrame"
            }]
    }
]);