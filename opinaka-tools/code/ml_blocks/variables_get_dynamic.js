Blockly.defineBlocksWithJsonArray([
    {
        type: "variables_get_dynamic",
        message0: "%1",
        args0: [{ type: "field_variable", name: "VAR", variable: "%{BKY_VARIABLES_DEFAULT_NAME}" }],
        output: null,
        style: "variable_dynamic_blocks",
        helpUrl: "%{BKY_VARIABLES_GET_HELPURL}",
        tooltip: "%{BKY_VARIABLES_GET_TOOLTIP}",
        extensions: ["contextMenu_variableDynamicSetterGetter"],
    },
    {
        type: "variables_set_dynamic",
        message0: "%{BKY_VARIABLES_SET}",
        args0: [
            { type: "field_variable", name: "VAR", variable: "%{BKY_VARIABLES_DEFAULT_NAME}" },
            { type: "input_value", name: "VALUE" },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "variable_dynamic_blocks",
        tooltip: "%{BKY_VARIABLES_SET_TOOLTIP}",
        helpUrl: "%{BKY_VARIABLES_SET_HELPURL}",
        extensions: ["contextMenu_variableDynamicSetterGetter"],
    },
]);
