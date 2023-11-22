
Blockly.defineBlocksWithJsonArray([
    {
        type: "create_dict",

        tooltip: "Create Dictionary",
        setHelpUrl: "https://docs.python.org/3/tutorial/datastructures.html",
        message0: "Create Dictionary",
        mutator: "DICT_mutator",
        output: "DICT"
    }
]);

Blockly.Constants.Logic.DICT_Logic = {
    elementcount_: 0,
    suppressPrefixSuffix: !0,
    mutationToDom: function () {
        if (!this.elementcount_) return null;
        var a = Blockly.utils.xml.createElement("mutation");
        this.elementcount_ && a.setAttribute("Element", this.elementcount_);
        return a;
    },
    domToMutation: function (a) {
        this.elementcount_ = parseInt(a.getAttribute("Element"), 10) || 0;
        this.rebuildShape_();
    },
    decompose: function (a) {
        var b = a.newBlock("Control_DICT");
        b.initSvg();
        for (var c = b.nextConnection, d = 1; d <= this.elementcount_; d++) {
            var e = a.newBlock("DICT_Element");
            e.initSvg();
            c.connect(e.previousConnection);
            c = e.nextConnection;
        }
        return b;
    },
    compose: function (a) {
        a = a.nextConnection.targetBlock();
        this.elementcount_ = 0;
        for (var b = [null], c = [null]; a && !a.isInsertionMarker();) {
            switch (a.type) {
                case "DICT_Element":
                    this.elementcount_++;
                    b.push(a.valueConnection_);
                    c.push(a.statementConnection_);
                    break;
                default:
                    throw TypeError("Unknown block type: " + a.type);
            }
            a = a.nextConnection && a.nextConnection.targetBlock();
        }
        this.updateShape_();
        this.reconnectChildBlocks_(b, c);
    },
    saveConnections: function (a) {
        a = a.nextConnection.targetBlock();
        for (var b = 1; a;) {
            switch (a.type) {
                case "DICT_Element":
                    var c = this.getInput("Key" + b),
                        d = this.getInput("Value" + b);
                    a.valueConnection_ = c && c.connection.targetConnection;
                    a.statementConnection_ = d && d.connection.targetConnection;
                    b++;
                    break;
                default:
                    throw TypeError("Unknown block type: " + a.type);
            }
            a = a.nextConnection && a.nextConnection.targetBlock();
        }
    },
    rebuildShape_: function () {
        var e = [null],
            f = [null];
        for (var d = 1; this.getInput("KEY" + d);) {
            var h = this.getInput("KEY" + d),
                i = this.getInput("VAL" + d);

            e.push(h.connection.targetConnection);
            f.push(i.connection.targetConnection);
            d++;
        }
        this.updateShape_();
        this.reconnectChildBlocks_(e, f);
    },
    updateShape_: function () {
        for (var a = 1; this.getInput("KEY" + a);) this.removeInput("KEY" + a), this.removeInput("VAL" + a), a++;
        for (var a = 1; a <= this.elementcount_; a++)
            this.appendValueInput("KEY" + a).appendField("Key"),
                this.appendValueInput("VAL" + a).appendField("Value");
    },
    reconnectChildBlocks_: function (b, c) {
        for (var d = 1; d <= this.elementcount_; d++) {
            Blockly.Mutator.reconnect(b[d], this, "KEY" + d);
            Blockly.Mutator.reconnect(c[d], this, "VAL" + d);
        }
    },
};
