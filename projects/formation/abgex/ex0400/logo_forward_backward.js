Blockly.Blocks['logo_forward_backward_js'] = {
  init: function() {
    this.appendValueInput("PIXELS")
        .setCheck("Number")
        .appendField(new Blockly.FieldDropdown([["avancer_js","FORWARD"], ["reculer_js","BACKWARD"]]), "DIRECTION")
        .appendField(" de ");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
 this.setTooltip("bgBlockly.Msg['LOGO_FORWARD_BACKWARD_TOOLTIP']");
 this.setHelpUrl("bgBlockly.Msg['LOGO_GOTOXY_HELPURL']");
  }
};
