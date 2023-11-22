
Blockly.Extensions.registerMixin("logic_ternary", Blockly.Constants.Logic.LOGIC_TERNARY_ONCHANGE_MIXIN);
Blockly.Blocks.loops = {};
Blockly.Constants.Loops = {};
Blockly.Constants.Loops.HUE = 120;
Blockly.defineBlocksWithJsonArray([
    {
        type: "controls_repeat_ext",
        message0: "%{BKY_CONTROLS_REPEAT_TITLE}",
        args0: [{ type: "input_value", name: "TIMES", check: "Number" }],
        message1: "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
        args1: [{ type: "input_statement", name: "DO" }],
        previousStatement: null,
        nextStatement: null,
        style: "loop_blocks",
        tooltip: "%{BKY_CONTROLS_REPEAT_TOOLTIP}",
        helpUrl: "%{BKY_CONTROLS_REPEAT_HELPURL}",
    },
    {
        type: "controls_repeat",
        message0: "%{BKY_CONTROLS_REPEAT_TITLE}",
        args0: [{ type: "field_number", name: "TIMES", value: 10, min: 0, precision: 1 }],
        message1: "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
        args1: [{ type: "input_statement", name: "DO" }],
        previousStatement: null,
        nextStatement: null,
        style: "loop_blocks",
        tooltip: "%{BKY_CONTROLS_REPEAT_TOOLTIP}",
        helpUrl: "%{BKY_CONTROLS_REPEAT_HELPURL}",
    },
    {
        type: "controls_whileUntil",
        message0: "%1 %2",
        args0: [
            {
                type: "field_dropdown",
                name: "MODE",
                options: [
                    ["%{BKY_CONTROLS_WHILEUNTIL_OPERATOR_WHILE}", "WHILE"],
                    ["%{BKY_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL}", "UNTIL"],
                ],
            },
            { type: "input_value", name: "BOOL", check: "Boolean" },
        ],
        message1: "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
        args1: [{ type: "input_statement", name: "DO" }],
        previousStatement: null,
        nextStatement: null,
        style: "loop_blocks",
        helpUrl: "%{BKY_CONTROLS_WHILEUNTIL_HELPURL}",
        extensions: ["controls_whileUntil_tooltip"],
    },
    {
        type: "controls_for",
        message0: "%{BKY_CONTROLS_FOR_TITLE}",
        args0: [
            { type: "field_variable", name: "VAR", variable: null },
            { type: "input_value", name: "FROM", check: "Number", align: "RIGHT" },
            { type: "input_value", name: "TO", check: "Number", align: "RIGHT" },
            { type: "input_value", name: "BY", check: "Number", align: "RIGHT" },
        ],
        message1: "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
        args1: [{ type: "input_statement", name: "DO" }],
        inputsInline: !0,
        previousStatement: null,
        nextStatement: null,
        style: "loop_blocks",
        helpUrl: "%{BKY_CONTROLS_FOR_HELPURL}",
        extensions: ["contextMenu_newGetVariableBlock", "controls_for_tooltip"],
    },
    {
        type: "controls_forEach",
        message0: "%{BKY_CONTROLS_FOREACH_TITLE}",
        args0: [
            { type: "field_variable", name: "VAR", variable: null },
            { type: "input_value", name: "LIST", check: "Array" },
        ],
        message1: "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
        args1: [{ type: "input_statement", name: "DO" }],
        previousStatement: null,
        nextStatement: null,
        style: "loop_blocks",
        helpUrl: "%{BKY_CONTROLS_FOREACH_HELPURL}",
        extensions: ["contextMenu_newGetVariableBlock", "controls_forEach_tooltip"],
    },
    {
        type: "controls_flow_statements",
        message0: "%1",
        args0: [
            {
                type: "field_dropdown",
                name: "FLOW",
                options: [
                    ["%{BKY_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK}", "BREAK"],
                    ["%{BKY_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE}", "CONTINUE"],
                ],
            },
        ],
        previousStatement: null,
        style: "loop_blocks",
        helpUrl: "%{BKY_CONTROLS_FLOW_STATEMENTS_HELPURL}",
        extensions: ["controls_flow_tooltip", "controls_flow_in_loop_check"],
    },
]);
Blockly.Constants.Loops.WHILE_UNTIL_TOOLTIPS = { WHILE: "%{BKY_CONTROLS_WHILEUNTIL_TOOLTIP_WHILE}", UNTIL: "%{BKY_CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL}" };
Blockly.Extensions.register("controls_whileUntil_tooltip", Blockly.Extensions.buildTooltipForDropdown("MODE", Blockly.Constants.Loops.WHILE_UNTIL_TOOLTIPS));
Blockly.Constants.Loops.BREAK_CONTINUE_TOOLTIPS = { BREAK: "%{BKY_CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK}", CONTINUE: "%{BKY_CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE}" };
Blockly.Extensions.register("controls_flow_tooltip", Blockly.Extensions.buildTooltipForDropdown("FLOW", Blockly.Constants.Loops.BREAK_CONTINUE_TOOLTIPS));
Blockly.Constants.Loops.CUSTOM_CONTEXT_MENU_CREATE_VARIABLES_GET_MIXIN = {
    customContextMenu: function (a) {
        if (!this.isInFlyout) {
            var b = this.getField("VAR").getVariable(),
                c = b.name;
            if (!this.isCollapsed() && null != c) {
                var d = { enabled: !0 };
                d.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace("%1", c);
                b = Blockly.Variables.generateVariableFieldDom(b);
                c = Blockly.utils.xml.createElement("block");
                c.setAttribute("type", "variables_get");
                c.appendChild(b);
                d.callback = Blockly.ContextMenu.callbackFactory(this, c);
                a.push(d);
            }
        }
    },
};
Blockly.Extensions.registerMixin("contextMenu_newGetVariableBlock", Blockly.Constants.Loops.CUSTOM_CONTEXT_MENU_CREATE_VARIABLES_GET_MIXIN);
Blockly.Extensions.register("controls_for_tooltip", Blockly.Extensions.buildTooltipWithFieldText("%{BKY_CONTROLS_FOR_TOOLTIP}", "VAR"));
Blockly.Extensions.register("controls_forEach_tooltip", Blockly.Extensions.buildTooltipWithFieldText("%{BKY_CONTROLS_FOREACH_TOOLTIP}", "VAR"));
Blockly.Constants.Loops.CONTROL_FLOW_IN_LOOP_CHECK_MIXIN = {
    LOOP_TYPES: ["controls_repeat", "controls_repeat_ext", "controls_forEach", "controls_for", "controls_whileUntil"],
    suppressPrefixSuffix: !0,
    getSurroundLoop: function (a) {
        do {
            if (-1 != Blockly.Constants.Loops.CONTROL_FLOW_IN_LOOP_CHECK_MIXIN.LOOP_TYPES.indexOf(a.type)) return a;
            a = a.getSurroundParent();
        } while (a);
        return null;
    },
    onchange: function (a) {
        if (this.workspace.isDragging && !this.workspace.isDragging() && a.type == Blockly.Events.BLOCK_MOVE) {
            var b = Blockly.Constants.Loops.CONTROL_FLOW_IN_LOOP_CHECK_MIXIN.getSurroundLoop(this);
            this.setWarningText(b ? null : Blockly.Msg.CONTROLS_FLOW_STATEMENTS_WARNING);
            if (!this.isInFlyout) {
                var c = Blockly.Events.getGroup();
                Blockly.Events.setGroup(a.group);
                this.setEnabled(b);
                Blockly.Events.setGroup(c);
            }
        }
    },
};
/*
* Custom
*/
