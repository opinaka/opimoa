
Blockly.defineBlocksWithJsonArray([
    {
        type: "skl_train_test_split",
        tooltip: "Scikit learn test train split, X will be input and Y will be the target to Train ML model",
        setHelpUrl: "https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.train_test_split.html",

        previousStatement: null,
        nextStatement: null,
        message0: "Train Test Split",

        message1: "%1 %2 %3 %4 = %5",
        args1: [
            { type: "field_variable", name: "VAR", variable: "train_X" },
            { type: "field_variable", name: "VAR1", variable: "test_X" },
            { type: "field_variable", name: "VAR2", variable: "train_Y" },
            { type: "field_variable", name: "VAR3", variable: "test_Y" },
            { type: "input_value", name: "DATAFRAME", variable: "%{BKY_VARIABLES_DEFAULT_NAME}", check: "DataFrame" },

        ],
        extensions: ["contextMenu_variableSetterGetter"],
        message2: "Test Size %1  ",
        args2: [
            {
                type: "input_value",
                name: "TESTSIZE",
                check: "Number"
            }],
        message3: " Target Variable %1",
        args3: [
            {
                type: "input_value",
                name: "TARGETVAR",
                check: ["String", "Array"]
            }],
        message4: " Handle Missing Values %1",
        args4: [
            {
                type: "field_dropdown",
                name: "SPLIT",
                options: [["Delete", "dropNa"]]
            }],
        inputsInline: 0
    }

]);
