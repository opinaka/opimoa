Blockly.Blocks.variables = {};
Blockly.Constants.Variables = {};
Blockly.Constants.Variables.HUE = 330;
Blockly.defineBlocksWithJsonArray([
    {
        type: "variables_get",
        message0: "%1",
        args0: [{ type: "field_variable", name: "VAR", variable: "%{BKY_VARIABLES_DEFAULT_NAME}" }],
        output: null,
        style: "variable_blocks",
        helpUrl: "%{BKY_VARIABLES_GET_HELPURL}",
        tooltip: "%{BKY_VARIABLES_GET_TOOLTIP}",
        extensions: ["contextMenu_variableSetterGetter"],
    },
    {
        type: "variables_set",
        message0: "%{BKY_VARIABLES_SET}",
        args0: [
            { type: "field_variable", name: "VAR", variable: "%{BKY_VARIABLES_DEFAULT_NAME}" },
            { type: "input_value", name: "VALUE" },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "variable_blocks",
        tooltip: "%{BKY_VARIABLES_SET_TOOLTIP}",
        helpUrl: "%{BKY_VARIABLES_SET_HELPURL}",
        extensions: ["contextMenu_variableSetterGetter"],
    },
]);
Blockly.Constants.Variables.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN = {
    customContextMenu: function (a) {
        if (!this.isInFlyout) {
            if ("variables_get" == this.type)
                var b = "variables_set",
                    c = Blockly.Msg.VARIABLES_GET_CREATE_SET;
            else (b = "variables_get"), (c = Blockly.Msg.VARIABLES_SET_CREATE_GET);
            var d = { enabled: 0 < this.workspace.remainingCapacity() },
                e = this.getField("VAR").getText();
            d.text = c.replace("%1", e);
            c = Blockly.utils.xml.createElement("field");
            c.setAttribute("name", "VAR");
            c.appendChild(Blockly.utils.xml.createTextNode(e));
            e = Blockly.utils.xml.createElement("block");
            e.setAttribute("type", b);
            e.appendChild(c);
            d.callback = Blockly.ContextMenu.callbackFactory(this, e);
            a.push(d);
        } else if ("variables_get" == this.type || "variables_get_reporter" == this.type)
            (b = { text: Blockly.Msg.RENAME_VARIABLE, enabled: !0, callback: Blockly.Constants.Variables.RENAME_OPTION_CALLBACK_FACTORY(this) }),
                (e = this.getField("VAR").getText()),
                (d = { text: Blockly.Msg.DELETE_VARIABLE.replace("%1", e), enabled: !0, callback: Blockly.Constants.Variables.DELETE_OPTION_CALLBACK_FACTORY(this) }),
                a.unshift(b),
                a.unshift(d);
    },
};
Blockly.Constants.Variables.RENAME_OPTION_CALLBACK_FACTORY = function (a) {
    return function () {
        var b = a.workspace,
            c = a.getField("VAR").getVariable();
        Blockly.Variables.renameVariable(b, c);
    };
};
Blockly.Constants.Variables.DELETE_OPTION_CALLBACK_FACTORY = function (a) {
    return function () {
        var b = a.workspace,
            c = a.getField("VAR").getVariable();
        b.deleteVariableById(c.getId());
        b.refreshToolboxSelection();
    };
};
Blockly.Extensions.registerMixin("contextMenu_variableSetterGetter", Blockly.Constants.Variables.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN);
