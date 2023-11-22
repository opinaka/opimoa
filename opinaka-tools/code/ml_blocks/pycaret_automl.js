
Blockly.defineBlocksWithJsonArray([
    {
        type: "pycaret_automl",
        colour: 0,
        output: "Pycaret_Model",
        message0: "AutoML()",
        message1: "Optimizer %1",
        args1: [
            {
                type: "field_dropdown",
                name: "optimizer",
                options: [
                    ["Accuracy", "Accuracy"],
                    ["AUC", "AUC"],
                    ["Recall", "Recall"],
                    ["Precision", "Precision"],
                    ["F1", "F1"],
                    ["Kappa", "Kappa"],
                    ["MCC", "MCC"],
                    ["MAE", "MAE"],
                    ["MSE", "MSE"],
                    ["RMSE", "RMSE"],
                    ["R2", "R2"],
                    ["RMSLE", "RMSLE"],
                    ["MAPE", "MAPE"],
                ],
            }],
        inputsInline: 0
    }
])
