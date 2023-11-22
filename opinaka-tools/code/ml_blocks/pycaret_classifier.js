
Blockly.defineBlocksWithJsonArray([
    {
        type: "pycaret_classifier",
        colour: 0,
        output: "Pycaret_Model",
        message0: "Classifier()",
        message1: "Algorithm %1",
        args1: [
            {
                type: "field_dropdown",
                name: "model",
                options: [
                    ["Logistic Regression", "lr"],
                    ["K Nearest Neighbour", "knn"],
                    ["Naives Bayes", "nb"],
                    ["Decision Tree Classifier", "dt"],
                    ["SVM – Linear Kernel", "svm"],
                    ["SVM – Radial Kernel", "rbfsvm"],
                    ["Gaussian Process Classifier", "gpc"],
                    ["Multi Level Perceptron", "mlp"],
                    ["Ridge Classifier", "ridge"],
                    ["Random Forest Classifier", "rf"],
                    ["Quadratic Discriminant Analysis", "qda"],
                    ["Ada Boost Classifier", "ada"],
                    ["Gradient Boosting Classifier", "gbc"],
                    ["Linear Discriminant Analysis", "lda"],
                    ["Extra Trees Classifier", "et"],
                    ["Extreme Gradient Boosting", "xgboost"],
                    ["Light Gradient Boosting", "lightgbm"],
                    ["CatBoost Classifier", "catboost"],
                ],
            }
        ],
    }])
