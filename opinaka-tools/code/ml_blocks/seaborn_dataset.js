
Blockly.defineBlocksWithJsonArray([
    {
        type: "seaborn_dataset",
        message0: "Load Dataset %1",
        args0: [
            {
                type: "field_dropdown",
                name: "VAR",
                options: [
                    ["Auto-Mpg Data", "mpg"],
                    ["Iris Data", "iris"],
                    ["Car-Crash Data", "car_crashes"],
                    ["Anagrams", "anagrams"],
                    ["Exercise", "exercise"],
                    ["Diamonds", "diamonds"],
                    ["Brain Networks", "brain_networks"],
                    ["Flights", "flights"],
                    ["Penguins", "penguins"],
                    ["Planets", "planets"],
                    ["Titanic", "titanic"],
                    ["Tips", "tips"]
                ]
            }
        ],
        output: "DataFrame"
    }
])

Blockly.Extensions.registerMixin("controls_flow_in_loop_check", Blockly.Constants.Loops.CONTROL_FLOW_IN_LOOP_CHECK_MIXIN);
