
Blockly.defineBlocksWithJsonArray([
    { type: "controls_if_if", message0: "%{BKY_CONTROLS_IF_IF_TITLE_IF}", nextStatement: null, enableContextMenu: !1, style: "logic_blocks", tooltip: "%{BKY_CONTROLS_IF_IF_TOOLTIP}" },
    { type: "controls_if_elseif", message0: "%{BKY_CONTROLS_IF_ELSEIF_TITLE_ELSEIF}", previousStatement: null, nextStatement: null, enableContextMenu: !1, style: "logic_blocks", tooltip: "%{BKY_CONTROLS_IF_ELSEIF_TOOLTIP}" },
    { type: "controls_if_else", message0: "%{BKY_CONTROLS_IF_ELSE_TITLE_ELSE}", previousStatement: null, enableContextMenu: !1, style: "logic_blocks", tooltip: "%{BKY_CONTROLS_IF_ELSE_TOOLTIP}" },
]);
Blockly.Constants.Logic.TOOLTIPS_BY_OP = {
    EQ: "%{BKY_LOGIC_COMPARE_TOOLTIP_EQ}",
    NEQ: "%{BKY_LOGIC_COMPARE_TOOLTIP_NEQ}",
    LT: "%{BKY_LOGIC_COMPARE_TOOLTIP_LT}",
    LTE: "%{BKY_LOGIC_COMPARE_TOOLTIP_LTE}",
    GT: "%{BKY_LOGIC_COMPARE_TOOLTIP_GT}",
    GTE: "%{BKY_LOGIC_COMPARE_TOOLTIP_GTE}",
    AND: "%{BKY_LOGIC_OPERATION_TOOLTIP_AND}",
    OR: "%{BKY_LOGIC_OPERATION_TOOLTIP_OR}",
};
Blockly.Extensions.register("logic_op_tooltip", Blockly.Extensions.buildTooltipForDropdown("OP", Blockly.Constants.Logic.TOOLTIPS_BY_OP));
Blockly.Constants.Logic.CONTROLS_IF_MUTATOR_MIXIN = {
    elseifCount_: 0,
    elseCount_: 0,
    suppressPrefixSuffix: !0,
    mutationToDom: function () {
        if (!this.elseifCount_ && !this.elseCount_) return null;
        var a = Blockly.utils.xml.createElement("mutation");
        this.elseifCount_ && a.setAttribute("elseif", this.elseifCount_);
        this.elseCount_ && a.setAttribute("else", 1);
        return a;
    },
    domToMutation: function (a) {
        this.elseifCount_ = parseInt(a.getAttribute("elseif"), 10) || 0;
        this.elseCount_ = parseInt(a.getAttribute("else"), 10) || 0;
        this.rebuildShape_();
    },
    decompose: function (a) {
        var b = a.newBlock("controls_if_if");
        b.initSvg();
        for (var c = b.nextConnection, d = 1; d <= this.elseifCount_; d++) {
            var e = a.newBlock("controls_if_elseif");
            e.initSvg();
            c.connect(e.previousConnection);
            c = e.nextConnection;
        }
        this.elseCount_ && ((a = a.newBlock("controls_if_else")), a.initSvg(), c.connect(a.previousConnection));
        return b;
    },
    compose: function (a) {
        a = a.nextConnection.targetBlock();
        this.elseCount_ = this.elseifCount_ = 0;
        for (var b = [null], c = [null], d = null; a && !a.isInsertionMarker();) {
            switch (a.type) {
                case "controls_if_elseif":
                    this.elseifCount_++;
                    b.push(a.valueConnection_);
                    c.push(a.statementConnection_);
                    break;
                case "controls_if_else":
                    this.elseCount_++;
                    d = a.statementConnection_;
                    break;
                default:
                    throw TypeError("Unknown block type: " + a.type);
            }
            a = a.nextConnection && a.nextConnection.targetBlock();
        }
        this.updateShape_();
        this.reconnectChildBlocks_(b, c, d);
    },
    saveConnections: function (a) {
        a = a.nextConnection.targetBlock();
        for (var b = 1; a;) {
            switch (a.type) {
                case "controls_if_elseif":
                    var c = this.getInput("IF" + b),
                        d = this.getInput("DO" + b);
                    a.valueConnection_ = c && c.connection.targetConnection;
                    a.statementConnection_ = d && d.connection.targetConnection;
                    b++;
                    break;
                case "controls_if_else":
                    d = this.getInput("ELSE");
                    a.statementConnection_ = d && d.connection.targetConnection;
                    break;
                default:
                    throw TypeError("Unknown block type: " + a.type);
            }
            a = a.nextConnection && a.nextConnection.targetBlock();
        }
    },
    rebuildShape_: function () {
        var a = [null],
            b = [null],
            c = null;
        this.getInput("ELSE") && (c = this.getInput("ELSE").connection.targetConnection);
        for (var d = 1; this.getInput("IF" + d);) {
            var e = this.getInput("IF" + d),
                f = this.getInput("DO" + d);
            a.push(e.connection.targetConnection);
            b.push(f.connection.targetConnection);
            d++;
        }
        this.updateShape_();
        this.reconnectChildBlocks_(a, b, c);
    },
    updateShape_: function () {
        this.getInput("ELSE") && this.removeInput("ELSE");
        for (var a = 1; this.getInput("IF" + a);) this.removeInput("IF" + a), this.removeInput("DO" + a), a++;
        for (a = 1; a <= this.elseifCount_; a++)
            this.appendValueInput("IF" + a)
                .setCheck("Boolean")
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF),
                this.appendStatementInput("DO" + a).appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.elseCount_ && this.appendStatementInput("ELSE").appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
    },
    reconnectChildBlocks_: function (a, b, c) {
        for (var d = 1; d <= this.elseifCount_; d++) Blockly.Mutator.reconnect(a[d], this, "IF" + d), Blockly.Mutator.reconnect(b[d], this, "DO" + d);
        Blockly.Mutator.reconnect(c, this, "ELSE");
    },
};
Blockly.Extensions.registerMutator("controls_if_mutator", Blockly.Constants.Logic.CONTROLS_IF_MUTATOR_MIXIN, null, ["controls_if_elseif", "controls_if_else"]);
Blockly.Constants.Logic.CONTROLS_IF_TOOLTIP_EXTENSION = function () {
    this.setTooltip(
        function () {
            if (this.elseifCount_ || this.elseCount_) {
                if (!this.elseifCount_ && this.elseCount_) return Blockly.Msg.CONTROLS_IF_TOOLTIP_2;
                if (this.elseifCount_ && !this.elseCount_) return Blockly.Msg.CONTROLS_IF_TOOLTIP_3;
                if (this.elseifCount_ && this.elseCount_) return Blockly.Msg.CONTROLS_IF_TOOLTIP_4;
            } else return Blockly.Msg.CONTROLS_IF_TOOLTIP_1;
            return "";
        }.bind(this)
    );
};
Blockly.Extensions.register("controls_if_tooltip", Blockly.Constants.Logic.CONTROLS_IF_TOOLTIP_EXTENSION);
Blockly.Constants.Logic.LOGIC_COMPARE_ONCHANGE_MIXIN = {
    onchange: function (a) {
        this.prevBlocks_ || (this.prevBlocks_ = [null, null]);
        var b = this.getInputTargetBlock("A"),
            c = this.getInputTargetBlock("B");
        b &&
            c &&
            !this.workspace.connectionChecker.doTypeChecks(b.outputConnection, c.outputConnection) &&
            (Blockly.Events.setGroup(a.group),
                (a = this.prevBlocks_[0]),
                a !== b && (b.unplug(), !a || a.isDisposed() || a.isShadow() || this.getInput("A").connection.connect(a.outputConnection)),
                (b = this.prevBlocks_[1]),
                b !== c && (c.unplug(), !b || b.isDisposed() || b.isShadow() || this.getInput("B").connection.connect(b.outputConnection)),
                this.bumpNeighbours(),
                Blockly.Events.setGroup(!1));
        this.prevBlocks_[0] = this.getInputTargetBlock("A");
        this.prevBlocks_[1] = this.getInputTargetBlock("B");
    },
};
Blockly.Constants.Logic.LOGIC_COMPARE_EXTENSION = function () {
    this.mixin(Blockly.Constants.Logic.LOGIC_COMPARE_ONCHANGE_MIXIN);
};
Blockly.Extensions.register("logic_compare", Blockly.Constants.Logic.LOGIC_COMPARE_EXTENSION);
Blockly.Constants.Logic.LOGIC_TERNARY_ONCHANGE_MIXIN = {
    prevParentConnection_: null,
    onchange: function (a) {
        var b = this.getInputTargetBlock("THEN"),
            c = this.getInputTargetBlock("ELSE"),
            d = this.outputConnection.targetConnection;
        if ((b || c) && d)
            for (var e = 0; 2 > e; e++) {
                var f = 1 == e ? b : c;
                f &&
                    !f.workspace.connectionChecker.doTypeChecks(f.outputConnection, d) &&
                    (Blockly.Events.setGroup(a.group), d === this.prevParentConnection_ ? (this.unplug(), d.getSourceBlock().bumpNeighbours()) : (f.unplug(), f.bumpNeighbours()), Blockly.Events.setGroup(!1));
            }
        this.prevParentConnection_ = d;
    },
};