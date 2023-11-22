Blockly.defineBlocksWithJsonArray([
    {
        type: "CLR_SVM",
        tooltip: "Support Vector Machine Classification Algorithm",
        setHelpUrl: "https://scikit-learn.org/stable/modules/svm.html",
        message0: "Support Vector Machine",
        style: "logic_blocks",
        mutator: "CLR_mutator",
        output: "Sklearn_Model"
    }
]);

Blockly.Constants.Logic.CLR_Logic = {
    //elseifCount_ -> validCount_
    // elseCount_ -> parmCount_
    validCount_: 0,
    parmCount_: 0,
    trainCount_: 0,
    testCount_: 0,
    suppressPrefixSuffix: !0,
    mutationToDom: function () {
        if (!this.validCount_ && !this.parmCount_ && !this.trainCount_ && !this.testCount_) return null;
        var a = Blockly.utils.xml.createElement("mutation");
        this.validCount_ && a.setAttribute("ValidData", this.validCount_);
        this.parmCount_ && a.setAttribute("Params", 1);
        this.trainCount_ && a.setAttribute("TrainData", this.trainCount_)
        this.testCount_ && a.setAttribute("TestData", 1)
        return a;
    },
    domToMutation: function (a) {
        this.validCount_ = parseInt(a.getAttribute("ValidData"), 10) || 0;
        this.parmCount_ = parseInt(a.getAttribute("Params"), 10) || 0;
        this.trainCount_ = parseInt(a.getAttribute("TrainData"), 10) || 0;
        this.testCount_ = parseInt(a.getAttribute("TestData"), 10) || 0;
        this.rebuildShape_();
    },
    decompose: function (a) {
        var b = a.newBlock("Control_CLR");
        b.initSvg();
        for (var c = b.nextConnection, d = 1; d <= this.validCount_; d++) {
            var e = a.newBlock("CLR_Valid");
            e.initSvg();
            c.connect(e.previousConnection);
            c = e.nextConnection;
        }
        for (var c = b.nextConnection, d = 1; d <= this.trainCount_; d++) {
            var e = a.newBlock("CLR_Train");
            e.initSvg();
            c.connect(e.previousConnection);
            c = e.nextConnection;
        }
        this.parmCount_ && ((e = a.newBlock("CLR_Params")), e.initSvg(), c.connect(e.previousConnection), c = e.nextConnection);
        this.testCount_ && ((e = a.newBlock("CLR_Test")), e.initSvg(), c.connect(e.previousConnection), c = e.nextConnection);

        return b;
    },
    compose: function (a) {
        a = a.nextConnection.targetBlock();
        this.parmCount_ = this.validCount_ = this.testCount_ = this.trainCount_ = 0;
        for (var b = [null], c = [null], d = null, e = [null], f = [null], g = null; a && !a.isInsertionMarker();) {
            switch (a.type) {
                case "CLR_Valid":
                    this.validCount_++;
                    b.push(a.valueConnection_);
                    c.push(a.statementConnection_);
                    break;
                case "CLR_Train":
                    this.trainCount_++;
                    e.push(a.valueConnection_);
                    f.push(a.statementConnection_);
                    break;
                case "CLR_Params":
                    this.parmCount_++;
                    d = a.statementConnection_;
                    break;
                case "CLR_Test":
                    this.testCount_++;
                    g = a.statementConnection_;
                    break;
                default:
                    throw TypeError("Unknown block type: " + a.type);
            }
            a = a.nextConnection && a.nextConnection.targetBlock();
        }
        this.updateShape_();
        this.reconnectChildBlocks_(b, c, d, e, f, g);
    },
    saveConnections: function (a) {
        a = a.nextConnection.targetBlock();
        for (var b = 1; a;) {
            switch (a.type) {
                case "CLR_Valid":
                    var c = this.getInput("X - Valid"),
                        d = this.getInput("y - Valid");
                    a.valueConnection_ = c && c.connection.targetConnection;
                    a.statementConnection_ = d && d.connection.targetConnection;
                    b++;
                    break;
                case "CLR_Train":
                    var c = this.getInput("X - Train"),
                        d = this.getInput("y - Train");
                    a.valueConnection_ = c && c.connection.targetConnection;
                    a.statementConnection_ = d && d.connection.targetConnection;
                    b++;
                    break;
                case "CLR_Params":
                    var d = this.getInput("Control Parameters");
                    a.statementConnection_ = d && d.connection.targetConnection;
                    break;
                case "CLR_Test":
                    var d = this.getInput("X - Test");
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
            c = null,
            e = [null],
            f = [null],
            g = null;
        this.getInput("PARAMS") && (c = this.getInput("PARAMS").connection.targetConnection);
        this.getInput("XTEST") && (g = this.getInput("XTEST").connection.targetConnection);

        for (var d = 1; this.getInput("XTRAIN");) {
            var h = this.getInput("XTRAIN"),
                i = this.getInput("YTRAIN");

            e.push(h.connection.targetConnection);
            f.push(i.connection.targetConnection);
            d++;
        }
        for (var d = 1; this.getInput("XVALID");) {
            var h = this.getInput("XVALID"),
                i = this.getInput("YVALID");
            a.push(h.connection.targetConnection);
            b.push(i.connection.targetConnection);
            d++;
        }


        this.updateShape_();
        this.reconnectChildBlocks_(a, b, c, e, f, g);
    },
    updateShape_: function () {
        this.getInput("PARAMS") && this.removeInput("PARAMS");
        this.getInput("XTEST") && this.removeInput("XTEST");
        this.getInput("TMODEL") && this.removeInput("TMODEL");

        if (this.validCount_ > 1) {
            this.validCount_ = 1
        }
        if (this.trainCount_ > 1) {
            this.trainCount_ = 1
        }
        var model = false
        for (var a = 1; this.getInput("XTRAIN");) this.removeInput("XTRAIN"), this.removeInput("YTRAIN"), a++;
        for (a = 1; a <= this.trainCount_; a++)
            this.appendValueInput("XTRAIN").appendField("X - Train").setCheck("DataFrame"),
                this.appendValueInput("YTRAIN").appendField("y - Train").setCheck("DataFrame"), model = true;
        for (var a = 1; this.getInput("XVALID");) this.removeInput("XVALID"), this.removeInput("YVALID"), a++;
        for (a = 1; a <= this.validCount_; a++)
            this.appendValueInput("XVALID").appendField("X - Valid").setCheck("DataFrame"),
                this.appendValueInput("YVALID").appendField("y - Valid").setCheck("DataFrame"), model = true;

        //this.removeInput("TModel");


        this.parmCount_ && this.appendValueInput("PARAMS").appendField("Control Parameters");
        if (this.testCount_ > 0) {
            this.testCount_ && this.appendValueInput("XTEST").appendField("X - Test").setCheck("DataFrame");
            model = true;
        }

        if (model) {
            this.appendValueInput("TMODEL").appendField("Model").setCheck("Sklearn_Model")
        }

    },
    reconnectChildBlocks_: function (a, b, c, e, f, g) {
        var d = 0
        Blockly.Mutator.reconnect(a[d], this, "XVALID");
        Blockly.Mutator.reconnect(b[d], this, "YVALID");
        Blockly.Mutator.reconnect(e[d], this, "XTRAIN");
        Blockly.Mutator.reconnect(f[d], this, "YTRAIN");
        Blockly.Mutator.reconnect(c, this, "PARAMS");
        Blockly.Mutator.reconnect(g, this, "XTEST");

    },
};



Blockly.defineBlocksWithJsonArray([
    { type: "Control_CLR", message0: "Control_CLR", nextStatement: null, enableContextMenu: !1, style: "logic_blocks" },
    { type: "CLR_Train", message0: "Training Data", previousStatement: null, nextStatement: null, enableContextMenu: !1, style: "logic_blocks" },
    { type: "CLR_Test", message0: "Testing Data", previousStatement: null, nextStatement: null, enableContextMenu: !1, style: "logic_blocks" },
    { type: "CLR_Valid", message0: "Validation Data", previousStatement: null, nextStatement: null, enableContextMenu: !1, style: "logic_blocks" },
    { type: "CLR_Params", message0: "Parameters", previousStatement: null, nextStatement: null, enableContextMenu: !1, style: "logic_blocks" }
]);

Blockly.Extensions.registerMutator("CLR_mutator", Blockly.Constants.Logic.CLR_Logic, null, ["CLR_Valid", "CLR_Train", "CLR_Params", "CLR_Test"]);
