Blockly.Constants.VariablesDynamic = {};
Blockly.Constants.VariablesDynamic.HUE = 310;
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
Blockly.Constants.VariablesDynamic.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN = {
    customContextMenu: function (a) {
        if (!this.isInFlyout) {
            var b = this.getFieldValue("VAR");
            var c = this.workspace.getVariableById(b).type;
            if ("variables_get_dynamic" == this.type) {
                b = "variables_set_dynamic";
                var d = Blockly.Msg.VARIABLES_GET_CREATE_SET;
            } else (b = "variables_get_dynamic"), (d = Blockly.Msg.VARIABLES_SET_CREATE_GET);
            var e = { enabled: 0 < this.workspace.remainingCapacity() },
                f = this.getField("VAR").getText();
            e.text = d.replace("%1", f);
            d = Blockly.utils.xml.createElement("field");
            d.setAttribute("name", "VAR");
            d.setAttribute("variabletype", c);
            d.appendChild(Blockly.utils.xml.createTextNode(f));
            f = Blockly.utils.xml.createElement("block");
            f.setAttribute("type", b);
            f.appendChild(d);
            e.callback = Blockly.ContextMenu.callbackFactory(this, f);
            a.push(e);
        } else if ("variables_get_dynamic" == this.type || "variables_get_reporter_dynamic" == this.type)
            (b = { text: Blockly.Msg.RENAME_VARIABLE, enabled: !0, callback: Blockly.Constants.Variables.RENAME_OPTION_CALLBACK_FACTORY(this) }),
                (f = this.getField("VAR").getText()),
                (e = { text: Blockly.Msg.DELETE_VARIABLE.replace("%1", f), enabled: !0, callback: Blockly.Constants.Variables.DELETE_OPTION_CALLBACK_FACTORY(this) }),
                a.unshift(b),
                a.unshift(e);
    },
    onchange: function (a) {
        a = this.getFieldValue("VAR");
        a = Blockly.Variables.getVariable(this.workspace, a);
        "variables_get_dynamic" == this.type ? this.outputConnection.setCheck(a.type) : this.getInput("VALUE").connection.setCheck(a.type);
    },
};
Blockly.Constants.VariablesDynamic.RENAME_OPTION_CALLBACK_FACTORY = function (a) {
    return function () {
        var b = a.workspace,
            c = a.getField("VAR").getVariable();
        Blockly.Variables.renameVariable(b, c);
    };
};
Blockly.Constants.VariablesDynamic.DELETE_OPTION_CALLBACK_FACTORY = function (a) {
    return function () {
        var b = a.workspace,
            c = a.getField("VAR").getVariable();
        b.deleteVariableById(c.getId());
        b.refreshToolboxSelection();
    };
};
Blockly.Extensions.registerMixin("contextMenu_variableDynamicSetterGetter", Blockly.Constants.VariablesDynamic.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN);