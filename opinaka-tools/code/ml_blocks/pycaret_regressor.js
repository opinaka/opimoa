
Blockly.defineBlocksWithJsonArray([
    {
        type: "pycaret_regressor",
        output: "Pycaret_Model",
        colour: 0,
        message0: "Regression()",
        message1: "Algorithm %1",
        args1: [
            {
                type: "field_dropdown",
                name: "model",
                options: [
                    ["Linear Regression", "lr"],
                    ["Lasso Regression", "lasso"],
                    ["Ridge Regression", "ridge"],
                    ["Elastic Net", "en"],
                    ["Least Angle Regression", "lar"],
                    ["Lasso Least Angle Regression", "llar"],
                    ["Orthogonal Matching Pursuit", "omp"],
                    ["Bayesian Ridge", "br"],
                    ["Automatic Relevance Determination", "ard"],
                    ["Passive Aggressive Regressor", "par"],
                    ["Random Sample Consensus", "ransac"],
                    ["TheilSen Regressor", "tr"],
                    ["Huber Regressor", "huber"],
                    ["Kernel Ridge", "kr"],
                    ["Support Vector Machine", "svm"],
                    ["K Neighbors Regressor", "knn"],
                    ["Decision Tree", "dt"],
                    ["Random Forest", "rf"],
                    ["Extra Trees Regressor", "et"],
                    ["AdaBoost Regressor", "gbr"],
                    ["Gradient Boosting Regressor", "gbr"],
                    ["Multi Level Perceptron", "mlp"],
                    ["Extreme Gradient Boosting", "xgboost"],
                    ["Light Gradient Boosting", "lightgbm"],
                    ["CatBoost Regressor", "catboost"],
                ],
            }
        ]
    }])
