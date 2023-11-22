

// cancel tween
// tween is a variable input
Blockly.Blocks['tween_cancel'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("cancel tween")
            .appendField(new Blockly.FieldVariable("tween"), "TWEEN");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['tween_cancel'] = function (block) {
    var variable_tween = Blockly.Lua.variableDB_.getName(block.getFieldValue('TWEEN'), Blockly.Variables.CATEGORY_NAME);
    var code = `${variable_tween}:Cancel()\n`;
    return code;
};

// Begin anonymous function mutator blocks

const anonFnArgsMutator = {
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        this.args = this.args || []

        /** @type {!Element} */
        var container = Blockly.utils.xml.createElement("mutation")
        container.setAttribute("args", this.args.join(","))
        return container
    },

    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        this.args = xmlElement.getAttribute("args").split(",").filter(s => s.length > 0)
        this.updateArgs_()
    },

    saveExtraState: function () {
        return {
            args: this.args || []
        }
    },

    loadExtraState: function(state) {
        this.args = state.args
        this.updateArgs_()
    },

    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this {Blockly.Block}
     */
    decompose: function (workspace) {
        this.args = this.args || []
        var containerBlock = workspace.newBlock("anon_fn_args_container")
        containerBlock.initSvg()
        var connection = containerBlock.getInput("ARGS").connection
        for (let i = 0; i < this.args.length; i++) {
            const [argName, argId] = this.args[i].split(":")
            let argBlock = workspace.newBlock("anon_fn_arg")
            argBlock.argId = argId
            argBlock.setFieldValue(argName, "NAME")
            argBlock.initSvg()
            connection.connect(argBlock.previousConnection)
            connection = argBlock.nextConnection
        }
        return containerBlock
    },

    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this {Blockly.Block}
     */
    compose: function (containerBlock) {
        const args = []
        let argBlock = containerBlock.getInputTargetBlock("ARGS")
        while (argBlock && !argBlock.isInsertionMarker()) {
            const argName = argBlock.getFieldValue("NAME")
            let argId = argBlock.argId
            if (!argId) {
                argBlock.argId = Blockly.utils.genUid()
                argId = argBlock.argId
            }

            args.push(`${argName}:${argId}`)
            argBlock = argBlock.nextConnection && argBlock.nextConnection.targetBlock()
        }
        this.args = args
        if (this.manageVariables) {
            for (let arg of this.args) {
                const [argName, argId] = arg.split(":")
                let v = this.workspace.getVariableById(argId)
                if (v) {
                    if (v.name != argName) {
                        // renamed variable
                        this.workspace.renameVariableById(argId, argName)
                    }
                } else {
                    v = this.workspace.getVariable(argName)
                    if (!v) {
                        // new variable
                        this.workspace.createVariable(argName, null, argId)
                    }
                }
            }
        }
        
        this.updateArgs_()
    },

    manageVariables: true,

    updateArgs_: function () {
        if (this.args.length > 0) {
            const argsList = "with args: " + getArgList(this)
            if (!this.getFieldValue("ARGS")) {
                this.getInput("DUMMY").appendField(argsList, "ARGS")
            } else {
                this.setFieldValue(argsList, "ARGS")
            }
        } else {
            if (this.getFieldValue("ARGS")) {
                this.getInput("DUMMY").removeField("ARGS")
            }
        }
    }
}

const declareLocalVariablesMutator = {
    ...anonFnArgsMutator,

    updateArgs_: function() {

        // .appendField(new Blockly.FieldVariable("table"), "TABLE");
        
        // remove any FieldVariables that aren't in the args list
        const input = this.getInput("DUMMY")
        while (input.fieldRow.length > this.args.length + 1) {
            const field = input.fieldRow[input.fieldRow.length - 1]
            console.log(`removing ${field.name}`)
            input.removeField(field.name)
        }
        for (let i = 0; i < this.args.length; i++) {
            const [argName, argId] = this.args[i].split(":")
            if (i >= input.fieldRow.length - 1) {
                console.log(`adding ${argName} as VAR${i}`)
                const field = new Blockly.FieldVariable(argName)
                input.appendField(field, "VAR" + i);
            } else {
                const field = input.fieldRow[i + 1]
                console.log(`updating ${field.name} to ${argName}`)
                input.removeField(field.name)
                input.insertFieldAt(i + 1, new Blockly.FieldVariable(argName), "VAR" + i)
            }
        }
    }
}

// A value input for each arg
const tableArgsMutator = {
    ...anonFnArgsMutator,
    manageVariables: false,

    updateArgs_: function() {
        while (this.inputList.length < this.args.length + 1) {
            this.appendValueInput("ARG" + (this.inputList.length - 1))
                .setAlign(Blockly.ALIGN_RIGHT)
        }
        while (this.inputList.length > this.args.length + 1) {
            this.removeInput("ARG" + (this.inputList.length - 2))
        }
        for (let i = 0; i < this.args.length; i++) {
            const [argName, argId] = this.args[i].split(":")
            const input = this.getInput("ARG" + i)
            if (input.fieldRow.length > 0) {
                const field = input.fieldRow[0]
                if (field.name != argName) {
                    input.removeField(field.name)
                    input.appendField(argName, "ARG" + i)
                }
            } else {
                input.appendField(argName, "ARG" + i)
            }
        }
    },
}
