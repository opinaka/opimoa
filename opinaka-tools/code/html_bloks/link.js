

Blockly.defineBlocksWithJsonArray([
{
  "type": "link",
  "message0": "link to %1 %2 %3",
  "args0": [
  {
    "type": "field_input",
    "name": "NAME",
    "text": "target"
  },
  {
    "type": "input_dummy"
  },
  {
    "type": "input_statement",
    "name": "content",
    "check": "html"
  }
  ],
  "previousStatement": "html",
  "nextStatement": "html",
  "colour": 90,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);
