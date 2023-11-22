
Blockly.Blocks['pandas_read_csv'] = {
    init: function () {
        this.appendValueInput('VALUE')
            .setCheck(['String'])
            .appendField('Read DataFrame');
        this.setOutput(true, 'DataFrame');
        this.setTooltip('Read CSV from Url or path');
        this.setHelpUrl('https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_csv.html');
    }
};
