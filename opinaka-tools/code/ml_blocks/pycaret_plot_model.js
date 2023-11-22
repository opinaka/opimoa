
Blockly.defineBlocksWithJsonArray([
    {
        type: "pycaret_plot_model",
        colour: 0,
        previousStatement: null,
        nextStatement: null,
        message0: "Plot()",
        message1: "Model %1",
        args1: [
            {
                type: "input_value",
                check: "Pycaret_Model",
                name: "input_model",

            }],
        message2: "Plot %1",
        args2: [
            {
                type: "field_dropdown",
                name: "plot_data",
                options: [
                    ["Area Under the Curve", "auc"],
                    ["Discrimination Threshold", "threshold"],
                    ["Precision Recall Curve", "pr"],
                    ["Confusion Matrix", "confusion_matrix"],
                    ["Class Prediction Error", "error"],
                    ["Classification Report", "class_report"],
                    ["Decision Boundary", "boundary"],
                    ["Recursive Feature Selection", "rfe"],
                    ["Learning Curve", "learning"],
                    ["Manifold Learning", "manifold"],
                    ["Calibration Curve", "calibration"],
                    ["Validation Curve", "vc"],
                    ["Dimension Learning", "dimension"],
                    ["Feature Importance (Top 10)", "feature"],
                    ["Feature IImportance (all)", "feature_all"],
                    ["Model Hyperparameter", "parameter"],
                    ["Lift Curve", "lift"],
                    ["Gain Curve", "gain"],
                    ["KS Statistic Plot", "ks"],


                    ["Residuals Plot", "residuals"],
                    ["Cooks Distance Plot", "cooks"],
                ],
            }],
        inputsInline: 0
    }
])
