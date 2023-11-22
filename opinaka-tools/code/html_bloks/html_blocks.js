Blockly.defineBlocksWithJsonArray([  
  {
  "type": "baseframe",
  "message0": "document %1 header %2 %3 content %4 %5",
  "args0": [
  {
    "type": "input_dummy"
  },
  {
    "type": "input_dummy"
  },
  {
    "type": "input_statement",
    "name": "head",
    "check": "header"
  },
  {
    "type": "input_dummy"
  },
  {
    "type": "input_statement",
    "name": "body",
    "check": "html"
  }
  ],
  "colour": 0,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);


  Blockly.defineBlocksWithJsonArray([  
{
  "type": "html",
  "message0": "document %1 %2",
  "args0": [
  {
    "type": "input_dummy"
  },
  {
    "type": "input_statement",
    "name": "content",
    "check": "document"
  }
  ],
  "colour": 0,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);

Blockly.defineBlocksWithJsonArray([
{
  "type": "body",
  "message0": "content %1 %2",
  "args0": [
  {
    "type": "input_dummy"
  },
  {
    "type": "input_statement",
    "name": "content",
    "check": "html"
  }
  ],
  "previousStatement": "document",
  "nextStatement": "document",
  "colour": 0,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);


Blockly.defineBlocksWithJsonArray([
{
  "type": "head",
  "message0": "header %1 %2",
  "args0": [
  {
    "type": "input_dummy"
  },
  {
    "type": "input_statement",
    "name": "content",
    "check": "header"
  }
  ],
  "previousStatement": "document",
  "nextStatement": "document",
  "colour": 0,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);


Blockly.defineBlocksWithJsonArray([
{
  "type": "title",
  "message0": "title %1",
  "args0": [
  {
    "type": "input_statement",
    "name": "content",
    "check": "html"
  }
  ],
  "previousStatement": "header",
  "nextStatement": "header",
  "colour": 0,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);


Blockly.defineBlocksWithJsonArray([
{
  "type": "paragraph",
  "message0": "paragraph %1",
  "args0": [
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


Blockly.defineBlocksWithJsonArray([
{
  "type": "plaintext",
  "message0": "text %1",
  "args0": [
  {
    "type": "field_input",
    "name": "content",
    "text": ""
  }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 330,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);


Blockly.defineBlocksWithJsonArray([
{
  "type": "division",
  "message0": "division %1 %2",
  "args0": [
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
  "previousStatement": "html",
  "nextStatement": "html",
  "colour": 90,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);


Blockly.defineBlocksWithJsonArray([
{
  "type": "style",
  "message0": "style =  %1 %2",
  "args0": [
  {
    "type": "input_dummy"
  },
  {
    "type": "input_statement",
    "name": "NAME",
    "check": "css"
  }
  ],
  "inputsInline": true,
  "output": "attribute",
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
]);


Blockly.defineBlocksWithJsonArray([
{
  "type": "color",
  "message0": "text colour :  %1",
  "args0": [
  {
    "type": "field_colour",
    "name": "NAME",
    "colour": "#ff0000"
  }
  ],
  "previousStatement": "css",
  "nextStatement": "css",
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
]);


Blockly.defineBlocksWithJsonArray([
{
  "type": "bgcolour",
  "message0": "background colour :  %1",
  "args0": [
  {
    "type": "field_colour",
    "name": "NAME",
    "colour": "#ff0000"
  }
  ],
  "previousStatement": "css",
  "nextStatement": "css",
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
]);


Blockly.defineBlocksWithJsonArray([
{
  "type": "genericstyle",
  "message0": "%1 : %2",
  "args0": [
  {
    "type": "field_input",
    "name": "property",
    "text": "property"
  },
  {
    "type": "field_input",
    "name": "value",
    "text": "value"
  }
  ],
  "previousStatement": "css",
  "nextStatement": "css",
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
]);

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


Blockly.defineBlocksWithJsonArray([
{
  "type": "more_attributes",
  "message0": "%1 %2 %3",
  "args0": [
  {
    "type": "input_value",
    "name": "NAME1",
    "check": "attribute"
  },
  {
    "type": "input_value",
    "name": "NAME2",
    "check": "attribute"
  },
  {
    "type": "input_value",
    "name": "NAME3",
    "check": "attribute"
  }
  ],
  "output": "attribute",
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
]);


Blockly.defineBlocksWithJsonArray([
{
  "type": "genericattribute",
  "message0": "%1  =  %2",
  "args0": [
  {
    "type": "field_input",
    "name": "attribute",
    "text": "attribute"
  },
  {
    "type": "field_input",
    "name": "value",
    "text": "value"
  }
  ],
  "inputsInline": true,
  "output": "attribute",
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
]);


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


Blockly.defineBlocksWithJsonArray([
{
  "type": "span",
  "message0": "span %1 %2",
  "args0": [
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
  "previousStatement": "html",
  "nextStatement": "html",
  "colour": 90,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);


Blockly.defineBlocksWithJsonArray([
{
  "type": "image",
  "message0": "image %1 or %2",
  "args0": [
  {
    "type": "field_input",
    "name": "IMAGE",
    "text": "URL"
  },
  {
    "type": "field_input",
    "name": "ALT",
    "text": "alternative text"
  }
  ],
  "previousStatement": "html",
  "nextStatement": "html",
  "colour": 90,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);


Blockly.defineBlocksWithJsonArray([
{
  "type": "emphasise",
  "message0": "emphasise %1 %2",
  "args0": [
  {
    "type": "input_dummy"
  },
  {
    "type": "input_statement",
    "name": "content"
  }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 90,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);

Blockly.defineBlocksWithJsonArray([
{
  "type": "strong",
  "message0": "important %1 %2",
  "args0": [
  {
    "type": "input_dummy"
  },
  {
    "type": "input_statement",
    "name": "content"
  }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 90,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);


Blockly.defineBlocksWithJsonArray([
{
  "type": "headline",
  "message0": "headline %1 %2 %3",
  "args0": [
  {
    "type": "field_dropdown",
    "name": "NAME",
    "options": [
    [
    "level 1",
    "h1"
    ],
    [
    "level 2",
    "h2"
    ],
    [
    "level 3",
    "h2"
    ],
    [
    "level 4",
    "h4"
    ],
    [
    "level 5",
    "h5"
    ],
    [
    "level 6",
    "h6"
    ]
    ]
  },
  {
    "type": "input_dummy"
  },
  {
    "type": "input_statement",
    "name": "content"
  }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 90,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);


Blockly.defineBlocksWithJsonArray([
{
  "type": "linebreak",
  "message0": "line break",
  "previousStatement": null,
  "nextStatement": null,
  "colour": 330,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);


Blockly.defineBlocksWithJsonArray([
{
  "type": "horizontalbreak",
  "message0": "topic break",
  "previousStatement": null,
  "nextStatement": null,
  "colour": 330,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);


Blockly.defineBlocksWithJsonArray([
{
  "type": "unorderedlist",
  "message0": "unordered list %1 %2",
  "args0": [
  {
    "type": "input_dummy"
  },
  {
    "type": "input_statement",
    "name": "NAME"
  }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 330,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);

Blockly.defineBlocksWithJsonArray([
{
  "type": "orderedlist",
  "message0": "ordered list %1 %2",
  "args0": [
  {
    "type": "input_dummy"
  },
  {
    "type": "input_statement",
    "name": "NAME"
  }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 330,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);


Blockly.defineBlocksWithJsonArray([
{
  "type": "listelement",
  "message0": "list item %1 %2",
  "args0": [
  {
    "type": "input_dummy"
  },
  {
    "type": "input_statement",
    "name": "content"
  }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 90,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);

Blockly.defineBlocksWithJsonArray([
{
  "type": "inserted",
  "message0": "inserted %1 %2",
  "args0": [
  {
    "type": "input_dummy"
  },
  {
    "type": "input_statement",
    "name": "content"
  }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 90,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);

Blockly.defineBlocksWithJsonArray([
{
  "type": "deleted",
  "message0": "deleted %1 %2",
  "args0": [
  {
    "type": "input_dummy"
  },
  {
    "type": "input_statement",
    "name": "content"
  }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 90,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);

Blockly.defineBlocksWithJsonArray([
{
  "type": "super",
  "message0": "superscript %1 %2",
  "args0": [
  {
    "type": "input_dummy"
  },
  {
    "type": "input_statement",
    "name": "content"
  }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 90,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);


Blockly.defineBlocksWithJsonArray([
{
  "type": "sub",
  "message0": "subscript %1 %2",
  "args0": [
  {
    "type": "input_dummy"
  },
  {
    "type": "input_statement",
    "name": "content"
  }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 90,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);


Blockly.defineBlocksWithJsonArray([
{
  "type": "code",
  "message0": "code %1 %2",
  "args0": [
  {
    "type": "input_dummy"
  },
  {
    "type": "input_statement",
    "name": "content"
  }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 90,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);


Blockly.defineBlocksWithJsonArray([
{
  "type": "quote",
  "message0": "quote %1 %2",
  "args0": [
  {
    "type": "input_dummy"
  },
  {
    "type": "input_statement",
    "name": "content"
  }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 90,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);


Blockly.defineBlocksWithJsonArray([
{
  "type": "blockquote",
  "message0": "blockquote %1 %2",
  "args0": [
  {
    "type": "input_dummy"
  },
  {
    "type": "input_statement",
    "name": "content"
  }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 90,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);


Blockly.defineBlocksWithJsonArray([
{
  "type": "sample",
  "message0": "sample output %1 %2",
  "args0": [
  {
    "type": "input_dummy"
  },
  {
    "type": "input_statement",
    "name": "content"
  }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 90,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);


Blockly.defineBlocksWithJsonArray([
{
  "type": "keyboard",
  "message0": "keyboard input %1 %2",
  "args0": [
  {
    "type": "input_dummy"
  },
  {
    "type": "input_statement",
    "name": "content"
  }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 90,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);

Blockly.defineBlocksWithJsonArray([
{
  "type": "variable",
  "message0": "variable %1 %2",
  "args0": [
  {
    "type": "input_dummy"
  },
  {
    "type": "input_statement",
    "name": "content"
  }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 90,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);

Blockly.defineBlocksWithJsonArray([
{
  "type": "form",
  "message0": "form %1 %2",
  "args0": [
  {
    "type": "input_dummy"
  },
  {
    "type": "input_statement",
    "name": "content"
  }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 90,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);

Blockly.defineBlocksWithJsonArray([
{
  "type": "table",
  "message0": "table %1 %2",
  "args0": [
  {
    "type": "input_dummy"
  },
  {
    "type": "input_statement",
    "name": "content",
    "check": "table"
  }
  ],
  "previousStatement": "html",
  "nextStatement": "html",
  "colour": 180,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);

Blockly.defineBlocksWithJsonArray([
{
  "type": "tablerow",
  "message0": "row %1 %2",
  "args0": [
  {
    "type": "input_dummy"
  },
  {
    "type": "input_statement",
    "name": "content",
    "check": "tablerow"
  }
  ],
  "previousStatement": "table",
  "nextStatement": "table",
  "colour": 180,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);


Blockly.defineBlocksWithJsonArray([
{
  "type": "tablecell",
  "message0": "entry %1 %2",
  "args0": [
  {
    "type": "input_dummy"
  },
  {
    "type": "input_statement",
    "name": "content",
    "check": "html"
  }
  ],
  "previousStatement": "tablerow",
  "nextStatement": "tablerow",
  "colour": 180,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);


Blockly.defineBlocksWithJsonArray([
{
  "type": "input_text",
  "message0": "text input %1",
  "args0": [
  {
    "type": "field_input",
    "name": "default",
    "text": ""
  }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 90,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);

Blockly.defineBlocksWithJsonArray([
{
  "type": "button",
  "message0": "button %1 %2",
  "args0": [
  {
    "type": "input_dummy"
  },
  {
    "type": "input_statement",
    "name": "NAME"
  }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 90,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);

Blockly.defineBlocksWithJsonArray([
{
  "type": "input",
  "message0": "%1 input %2 %3",
  "args0": [
  {
    "type": "field_dropdown",
    "name": "type",
    "options": [
    [
    "text",
    "text"
    ],
    [
    "email",
    "email"
    ],
    [
    "number",
    "number"
    ],
    [
    "password",
    "password"
    ],
    [
    "checkbox",
    "checkbox"
    ],
    [
    "radiobutton",
    "radio"
    ],
    [
    "button",
    "button"
    ],
    [
    "colour",
    "color"
    ],
    [
    "date",
    "date"
    ],
    [
    "local time",
    "datetime-local"
    ],
    [
    "file",
    "file"
    ],
    [
    "hidden",
    "hidden"
    ],
    [
    "image",
    "image"
    ],
    [
    "month",
    "month"
    ],
    [
    "range",
    "range"
    ],
    [
    "reset",
    "reset"
    ],
    [
    "search",
    "search"
    ],
    [
    "submit",
    "submit"
    ],
    [
    "telephone number",
    "tel"
    ],
    [
    "time",
    "time"
    ],
    [
    "url",
    "url"
    ],
    [
    "week",
    "week"
    ]
    ]
  },
  {
    "type": "field_input",
    "name": "value",
    "text": ""
  },
  {
    "type": "input_value",
    "name": "text"
  }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 90,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);

Blockly.defineBlocksWithJsonArray([
{
  "type": "script",
  "message0": "script %1 %2",
  "args0": [
  {
    "type": "input_dummy"
  },
  {
    "type": "input_statement",
    "name": "content",
    "check": "code"
  }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 90,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
},
]);


Blockly.defineBlocksWithJsonArray([
{
  "type": "onclick",
  "message0": "on click =  %1 %2",
  "args0": [
  {
    "type": "input_dummy"
  },
  {
    "type": "input_statement",
    "name": "NAME",
    "check": "code"
  }
  ],
  "inputsInline": true,
  "output": "attribute",
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
]);

Blockly.defineBlocksWithJsonArray([
{
  "type": "body_attributes",
  "message0": "content %1 %2",
  "args0": [
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
  "previousStatement": "document",
  "nextStatement": "document",
  "colour": 0,
  "tooltip": "",
  "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
}]);
