
Blockly.defineBlocksWithJsonArray([
    {
        "type": "select_bloc",
        "message0": "SELECT %1 FROM %2",
        "args0": [
          {
            "type": "input_dummy"
          },
          {
            "type": "input_statement",
            "name": "ATTRIBUTES"
          }
        ],
        "mutator": "select_mutator"
      }      
]);

