    //attik
    Blockly.defineBlocksWithJsonArray([
        {
            "type": "aggregate_min",
            "message0": "MIN %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "min",
                    "check": ["CONDITIONCHOOSER", 'freeinput']
                },
            ],
            "inputsInline": true,
            "output": 'aggregate_min',
            "colour": '#C440C4',
            "tooltip": "",
            "helpUrl": "",
            "extensions": 'aggregate_Extensions'
        },
        {
            "type": "aggregate_avg",
            "message0": "AVG %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "avg",
                    "check": ["CONDITIONCHOOSER", 'freeinput']
                }
            ],
            "inputsInline": true,
            "output": 'aggregate_avg',
            "colour": '#C440C4',
            "tooltip": "",
            "helpUrl": "",
            "extensions": 'aggregate_Extensions'
        },
        {
            "type": "aggregate_max",
            "message0": "MAX %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "max",
                    "check": ["CONDITIONCHOOSER", 'freeinput']
                }
            ],
            "inputsInline": true,
            "output": 'aggregate_max',
            "colour": '#C440C4',
            "tooltip": "",
            "helpUrl": "",
            "extensions": 'aggregate_Extensions'
        },
        {
            "type": "aggregate_sum",
            "message0": "SUM %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "sum",
                    "check": ["CONDITIONCHOOSER", 'freeinput', 'MATH']
                }
            ],
            "inputsInline": true,
            "output": 'aggregate_sum',
            "colour": '#C440C4',
            "tooltip": "",
            "helpUrl": "",
            "extensions": 'aggregate_Extensions'
        },
        {
            "type": "aggregate_count",
            "message0": "COUNT %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "count",
                    "check": ["CONDITIONCHOOSER", 'freeinput']
                }
            ],
            "inputsInline": true,
            "output": 'aggregate_count',
            "colour": '#C440C4',
            "tooltip": "",
            "helpUrl": "",
            "extensions": 'aggregate_Extensions'
        }
    ]);
    Blockly.Blocks['allchooser'] = {
        init: function() {
            this.appendDummyInput('allInput')
                .setAlign(Blockly.ALIGN_CENTRE)
                .appendField("*");
            this.setOutput(true, "ALL");
            this.setColour('#f1bf06');
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };
    Blockly.defineBlocksWithJsonArray([
        {
            "type": "and",
            "message0": "AND %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "Con0",
                    "check": ["Number", "COMPARE", "NULLIFIER", "INNIFIER", "OR", 'NOT', 'AND', 'BETWEEN']
                }
            ],
            "message1": "    %1",
            "args1": [
                {
                    "type": "input_value",
                    "name": "sCon0",
                    "check": ["Number", "COMPARE", "NULLIFIER", "INNIFIER", "OR", 'NOT', 'AND', 'BETWEEN']
                }
            ],
            "output": "AND",
            "colour": '#5270DE',
            "helpUrl": "",
        },
    ]);
    Blockly.defineBlocksWithJsonArray([
        {
            "type": "tablename_as",
            "message0": "%1 AS %2",
            "args0": [
                {
                    "type": "input_value",
                    "name": "as_oldName",
                    "check": ["aggregate_min", "aggregate_max", "aggregate_avg", "aggregate_count", "aggregate_sum", "CONDITIONCHOOSER", "freeinput"]
                },
                {
                    "type": "input_value",
                    "name": "as_newName",
                    "check": ["freeinput"]
                }
            ],
            "inputsInline": true,
            "output": 'tablename_as',
            "colour": '#0ddb69',
            "tooltip": "",
            "helpUrl": "",
            'extensions': 'assExtensions'
        },
    ]);//AS-Modifier
    Blockly.defineBlocksWithJsonArray([
        {
            "type": "between",//AND-BLOCK
            "message0": "    %1",//Text on Block (First Input) --> messages need to be numbereds
            "args0": [
                {
                    "type": "input_value",//FirstInput
                    "name": "Con0",//name of FirstInput
                    "check": ['CONDITIONCHOOSER', 'freeinput']//Acceptance Condition for following Blocks to be combined
                }
            ],
            "message1": "BETWEEN %1",//Text on second Input
            "args1": [
                {
                    "type": "input_value",//SecondInput
                    "name": "Con1",//name of SecondInput
                    "check": ['AND']//Acceptance Condition for following Blocks to be combined
                }
            ],
            "output": "BETWEEN",//Condition of this Block defining, how this Block could be combined to previous Blocks
            "colour": '#5270DE',
            "helpUrl": "",
        },
    ]);
    Blockly.defineBlocksWithJsonArray([
        {
            "type": "boolean",
            "message0": "%1",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "BOOL",
                    "options": [
                        ["true", "TRUE"],
                        ["false", "FALSE"]
                    ]
                }
            ],
            "output": "Boolean",
            "colour": '#FC4758',
            "tooltip": "",
            "helpUrl": ""
        },
    ]);    
    Blockly.defineBlocksWithJsonArray([
        {
            "type": "compare",
            "message0": "%1 %2 %3",
            "args0": [
                {
                    "type": "input_value",
                    "name": "1ConditionC",
                    "check": ["DatePicker", "MATH", "CONDITIONCHOOSER", 'HAVING', 'Boolean', 'Number', 'freeinput', 'aggregate_min', 'aggregate_avg', 'aggregate_max', 'aggregate_sum', 'aggregate_count', 'datepicker'],
                },
                {
                    "type": "field_dropdown",
                    "name": "OP",
                    "options": [
                        ["=", "EQ"],
                        ["\u2260", "NEQ"],
                        ["<", "LT"],
                        ["\u2264", "LTE"],
                        [">", "GT"],
                        ["\u2265", "GTE"],
                        ["LIKE", 'L']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "2ConditionC",
                    "check": ["DatePicker", "MATH", "CONDITIONCHOOSER", 'Boolean', 'Number', 'freeinput', 'aggregate_min', 'aggregate_avg', 'aggregate_max', 'aggregate_sum', 'aggregate_count', 'datepicker'],
                }
            ],
            "inputsInline": true,
            "output": "COMPARE",
            "colour": '#3ED9D9',
            "helpUrl": "",
            //"mutator": "compMutator",
        },
        {
            "type": "compareDerived",
            "message0": "%1    %2 %3",
            "args0": [
                {
                    "type": "input_value",
                    "name": "1ConditionCD",
                    "check": ['aggregate_AVG','aggregate_COUNT', 'aggregate_MAX', 'aggregate_MIN', 'aggregate_SUM', 'CONDITIONCHOOSER'],
                },
                {
                    "type": "field_dropdown",
                    "name": "OP",
                    "options": [
                        ["=", "EQ"],
                        ["\u2260", "NEQ"],
                        ["<", "LT"],
                        ["\u2264", "LTE"],
                        [">", "GT"],
                        ["\u2265", "GTE"],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "2ConditionCD",
                    "check": ["MATH", "CONDITIONCHOOSER", 'Boolean', 'Number', 'freeinput'],
                },
            ],
            "output": 'DERIVED',
            "colour": 180,
            "helpUrl": "%{BKY_LOGIC_COMPARE_HELPURL}",
            "extensions": ["logic_compare", "logic_op_tooltip"],
        }]);// COMPAREDERIVED-Block for HAVING in Workspace
        Blockly.Blocks['conditionchooser'] = {
            init: function() {
                this.appendDummyInput('listInput')
                    .appendField("     ")
                    .appendField(new Blockly.FieldDropdown(fillTables(document.getElementById('database').innerHTML)), "chooseTableC")
                    .appendField('.', "dot")
                    .appendField(new Blockly.FieldDropdown(fillColumns(tables(document.getElementById('database').innerHTML)[0], document.getElementById('database').innerHTML)), "chooseColumnC")
                this.setInputsInline(true);
                this.setOutput(true, 'CONDITIONCHOOSER');
                this.setColour('#f1bf06');
                this.setTooltip("Dieser Block dient der Auswahl einer Tabelle");
                this.setHelpUrl("");
                this.setOnChange(function(changeEvent){
                    var parent = this.getSurroundParent();
                    var selectedTable = this.getFieldValue('chooseTableC');
                    var correctColumn = this.getFieldValue('chooseColumnC');
                    var doesThoseBothFit = doesMatch(selectedTable, correctColumn);
                    if(parent != null && parent.toString().includes('ORDER BY') && (this.getField('orderC') == null)){
                        this.appendDummyInput('listOrder').appendField(" ").appendField(new Blockly.FieldDropdown([["\u2009","BLANK"], ["ASC","ASC"], ["DESC","DESC"]]), "orderC")
                    }
                    else if((parent == null || (!(parent.toString().includes('ORDER BY')))) && this.getField('orderC') != null){
                        this.removeInput('listOrder');
                    }
                    else if(parent != null){
                        if(!doesThoseBothFit){
                            if(this.getInput('listInput') == null){
                                this.getInput('dummyInput').removeField('chooseColumnC');
                                this.getInput('dummyInput').appendField(new Blockly.FieldDropdown(fillColumns(selectedTable, document.getElementById('database').innerHTML)), "chooseColumnC");
                            }
                            else{
                                this.getInput('listInput').removeField('chooseColumnC');
                                this.getInput('listInput').appendField(new Blockly.FieldDropdown(fillColumns(selectedTable, document.getElementById('database').innerHTML)), "chooseColumnC");
                            }
                        }
                    }
                })
            }
        };

        Blockly.Blocks['datepicker'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("Year:")
                    .appendField(new Blockly.FieldNumber(2018), "date_year");
                this.appendDummyInput()
                    .appendField("Month:")
                    .appendField(new Blockly.FieldNumber(0, 1, 12), "date_month");
                this.appendDummyInput()
                    .appendField("Day:")
                    .appendField(new Blockly.FieldNumber(0, 1, 31), "date_day");
                this.appendDummyInput()
                    .appendField("Hour:")
                    .appendField(new Blockly.FieldNumber(0, 0, 23), "date_time");
                this.setInputsInline(true);
                this.setOutput(true, "DatePicker");
                this.setColour('#FC4758');
                this.setTooltip("");
                this.setHelpUrl("");
            }
        };//DATE-Block in Workspace
        Blockly.Blocks['freeinput'] = {
            init: function() {
                this.appendDummyInput()
                    .appendField("\u201C")
                    .appendField(new Blockly.FieldTextInput("\u2009"), "textInput")
                    .appendField("\u201D")
                this.setOutput(true, "freeinput");
                this.setColour('#FC4758');
                this.setInputsInline(true);
                this.setTooltip("");
                this.setHelpUrl("");
                this.setOnChange(function(changeEvent){
                    var parent = this.getSurroundParent();
                    //die folgende Funktion ersetzt den ehem. ASCDESC-Block:
                    if(parent != null && parent.toString().includes('ORDER BY') && (this.getField('orderfI') == null)){
                        this.appendDummyInput('listOrder').appendField(" ").appendField(new Blockly.FieldDropdown([["\u2009","BLANK"], ["ASC","ASC"], ["DESC","DESC"]]), "orderfI")
                    }
                    else if((parent == null || (!(parent.toString().includes('ORDER BY')))) && this.getField('orderfI') != null){
                        this.removeInput('listOrder');
                    }
                })
            }
        };
        Blockly.Blocks["select_from"] = {
            init: function() {
                this.appendValueInput('FROM')
                    .appendField('FROM                ')
                    .setCheck(["TABLE", 'tablename_as'])
                this.setInputsInline(false);
                this.setPreviousStatement(true, ['SELECT']);
                this.setNextStatement(true, ['WHERE', 'GROUP BY', 'FROM']);
                this.setColour('#8007f2');
            }
        };
        Blockly.Blocks['select_groupby'] = {
            init: function() {
                this.appendValueInput('groupInput')
                    .setCheck(['freeinput', "CONDITIONCHOOSER"])
                    .setAlign(Blockly.ALIGN_LEFT)
                    .appendField("GROUP BY ");
                this.setPreviousStatement(true, ['WHERE', 'FROM']);
                this.setNextStatement(true, ['GROUP BY', 'HAVING']);
                this.setColour('#8007f2');
                this.setTooltip("");
                this.setHelpUrl("");
            }
        };
        Blockly.Blocks['select_having'] = {
            init: function() {
                this.appendValueInput('haveInput')
                    .setCheck(["COMPARE"])
                    .setAlign(Blockly.ALIGN_LEFT)
                    .appendField("HAVING           ");
                this.setPreviousStatement(true, ['HAVING']);
                this.setNextStatement(true, ['HAVING', 'GROUP BY']);
                this.setColour('#8007f2');
                this.setTooltip("");
                this.setHelpUrl("");
                this.setInputsInline(true);
            }
        };
        Blockly.defineBlocksWithJsonArray([{
            "type": "innifier",
            "message0": "%1 %2 %3",
            "args0": [
                {
                    "type": "input_value",
                    "name": "1ConditionC",
                    "check": ["MATH", "CONDITIONCHOOSER", 'freeinput'],
                },
                {
                    "type": "field_dropdown",
                    "name": "OP",
                    "options": [
                        ["IN", "I"],
                        ["NOT IN", "NI"],
                    ]
                },
                {
                    "type": "input_statement",
                    "name": "2ConditionC",
                    "check": ["SELECT"],
                },
            ],
            "inputsInline": true,
            "output": "INNIFIER",
            "colour": '#5270DE',
            "helpUrl": "",
        }]);
        Blockly.Blocks['all_join'] = {
            init: function() {
                this.appendValueInput("STATEMENT")
                    .appendField(new Blockly.FieldDropdown([['\u2009', 'BLANKJ'], ['INNER', 'INNER'], ['LEFT', 'LEFT'], ['RIGHT', 'RIGHT']]), "chooseTableType")
                    .appendField('JOIN')
                    .appendField(new Blockly.FieldDropdown(fillTables(document.getElementById('database').innerHTML)), "chooseTableJoin2")
                    .setCheck("COMPARE")
                    .appendField(new Blockly.FieldDropdown([['ON', 'onModifier'], ['\u2009', 'Blank']]), "modifierActive");
                this.setOutput(true, ["INNER_JOIN"]);
                this.setColour('#8007f2');
                this.setTooltip("");
                this.setHelpUrl("");
                this.setOnChange(function(changeEvent){
                    if(this.getInput("STATEMENT") == null){
                        if(this.getFieldValue('modifierActive') != 'Blank'){
                            this.removeInput("noSTATEMENT");
                            this.appendValueInput("STATEMENT")
                            //.appendField(new Blockly.FieldDropdown(fillTables(document.getElementById('database').innerHTML)), "chooseTableJoin1")
                                .appendField(new Blockly.FieldDropdown([['\u2009', 'BLANKJ'], ['INNER', 'INNER'], ['LEFT', 'LEFT'], ['RIGHT', 'RIGHT']]), "chooseTableType")
                                .appendField('JOIN')
                                .appendField(new Blockly.FieldDropdown(fillTables(document.getElementById('database').innerHTML)), "chooseTableJoin2")
                                .setCheck("COMPARE")
                                .appendField(new Blockly.FieldDropdown([['ON', 'onModifier'], ['\u2009', 'Blank']]), "modifierActive");
                        }
                    }
                    else{
                        if(this.getFieldValue('modifierActive') == 'Blank'){
                            this.removeInput("STATEMENT");
                            this.appendValueInput("noSTATEMENT")
                                .appendField(new Blockly.FieldDropdown([['\u2009', 'BLANKJ'], ['INNER', 'INNER'], ['LEFT', 'LEFT'], ['RIGHT', 'RIGHT']]), "chooseTableType")
                                .appendField('JOIN')
                                .setCheck("tablename_as")
                                .appendField(new Blockly.FieldDropdown([['\u2009', 'Blank'], ['ON', 'onModifier']]), "modifierActive");
                        }
                    }
                });
            }
        };
        Blockly.Blocks['select_limit'] = {
            init: function() {
                this.appendDummyInput('limitInput')
                    .setAlign(Blockly.ALIGN_LEFT)
                    .appendField("LIMIT           ")
                    .appendField(new Blockly.FieldNumber(0, 0), "numberInput");
                this.setPreviousStatement(true, ['WHERE', 'FROM', 'ORDER BY', 'HAVING']);
                this.setNextStatement(false, ['ORDER BY', 'LIMIT']);
                this.setColour('#8007f2');
                this.setTooltip("");
                this.setHelpUrl("");
            }
        };
        Blockly.defineBlocksWithJsonArray([
            {
                "type": "not",//NOT-BLOCK
                "message0": "NOT %1",//Text on Block (First Input) --> messages need to be numbereds
                "args0": [
                    {
                        "type": "input_value",//FirstInput
                        "name": "Con0",//name of FirstInput
                        "check": ["OR", "AND", 'COMPARE', 'BETWEEN']//Acceptance Condition for following Blocks to be combined
                    }
                ],
                "output": "NOT",//Condition of this Block defining, how this Block could be combined to previous Blocks
                "colour": '#5270DE',
                "helpUrl": "",
            },
        ]);// NOT-Block in Workspace
        Blockly.defineBlocksWithJsonArray([
            {
                "type": "or",//AND-BLOCK
                "message0": "OR %1",//Text on Block (First Input) --> messages need to be numbereds
                "args0": [
                    {
                        "type": "input_value",//FirstInput
                        "name": "Con0",//name of FirstInput
                        "check": ["COMPARE", "NULLIFIER", "INNIFIER", "AND", 'NOT', 'OR', 'BETWEEN']//Acceptance Condition for following Blocks to be combined
                    }
                ],
                "message1": "    %1",//Text on second Input
                "args1": [
                    {
                        "type": "input_value",//SecondInput
                        "name": "sCon0",//name of SecondInput
                        "check": ["COMPARE", "NULLIFIER", "INNIFIER", "AND", 'NOT', 'OR', 'BETWEEN']//Acceptance Condition for following Blocks to be combined
                    }
                ],
                "output": "OR",//Condition of this Block defining, how this Block could be combined to previous Blocks
                "colour": '#5270DE',
                "helpUrl": "",
                //discarded: 18.09.2017 "mutator": "orMutator",//name of the Mutator (necessary for merging Mutator_Mixin into this Block)
            },
        ]);// OR-Block in Workspace
        Blockly.Blocks['select_orderby'] = {
            init: function() {
                this.appendValueInput('orderInput')
                    .setCheck(["CONDITIONCHOOSER", 'aggregate_min', 'aggregate_avg', 'aggregate_max', 'aggregate_sum', 'aggregate_count', 'freeinput'])
                    .setAlign(Blockly.ALIGN_LEFT)
                    .appendField("ORDER BY        ");
                this.setPreviousStatement(true, ['GROUP BY', 'FROM']);
                this.setNextStatement(true, ['ORDER BY']);
                this.setColour('#8007f2');
                this.setTooltip("");
                this.setHelpUrl("");
            }
        };
        Blockly.Blocks['select'] = {
            init: function() {
                this.appendValueInput('SELECT')
                    .appendField('SELECT   ')
                    .setCheck(['freeinput', "tablename_as", "ALL", "CONDITIONCHOOSER", "aggregate_min", "aggregate_max", "aggregate_avg", "aggregate_sum", "aggregate_count"])
                    .appendField(new Blockly.FieldDropdown([["\u2009", 'blank'], ["ALL", 'all'], ["DISTINCT", 'distinct']]), 'option')
                this.setInputsInline(false);
                this.setPreviousStatement(true, ['SELECT', 'WHERE', 'GROUP BY', 'HAVING', 'ORDER BY', 'FROM']);
                this.setNextStatement(true, ['SELECT']);
                this.setColour('#8007f2');
        
            }
        };     
        Blockly.Blocks['table'] = {
            init: function() {
                this.appendDummyInput('previousTables')
                    .appendField('     ')
                    .appendField(new Blockly.FieldDropdown(fillTables(document.getElementById('database').innerHTML)), "chooseTableT")
                this.setOutput(true, 'TABLE');
                this.setColour('#f1bf06');
                this.setTooltip("Dieser Block dient der Auswahl einer Tabelle");
                this.setHelpUrl("");
            }
        };
        Blockly.Blocks['select_where'] = {
            init: function() {
                this.appendValueInput('whereInput')
                    .setCheck(['BETWEEN', 'AND', 'OR', 'COMPARE', 'NULLIFIER', 'INNIFIER', 'NOT', 'freeinput'])
                    .setAlign(Blockly.ALIGN_LEFT)
                    .appendField("WHERE                 ");
                this.setPreviousStatement(true, ['FROM']);
                this.setNextStatement(true, ['WHERE', 'GROUP BY']);
                this.setColour('#8007f2');
                this.setTooltip("");
                this.setHelpUrl("");
            }
        };   
    //attik