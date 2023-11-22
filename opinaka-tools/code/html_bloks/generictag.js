
Blockly.defineBlocksWithJsonArray([
{
  "type": "generictag",
  "message0": "< %1 > %2 %3",
  "args0": [
  {
    "type": "field_input",
    "name": "NAME",
    "text": "tag"
  },
  {
    "type": "input_value",
    "name": "NAME",
    "check": "attribute"
  },
  {
    "type": "input_statement",
    "name": "content",
    "check": "html"
  }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 90,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);
