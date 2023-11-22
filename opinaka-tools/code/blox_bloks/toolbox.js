<block type="math_number_property">
<value name="NUMBER_TO_CHECK">
  <shadow type="math_number">
    <field name="NUM">0</field>
  </shadow>
</value>
</block>

<category name="%{BKY_CATMATH}" colour="%{BKY_MATH_HUE}"></category>

            <category name= "Logic" colour="%{BKY_MATH_HUE}"></category>

                    <block type= "controls_if"></block>

                    <block type= "logic_compare">
                    <field name="OP">"EQ"</field>

                    }>

                    <block type= "logic_operation"></block>
                    <field name="OP">"AND"</field>

                    <block type= "logic_negate"></block>

                    <block type= "logic_boolean"></block>
                    <field name="BOOL">"TRUE"</field>

            ]>
        }>
        {
            <category name= "Loops" colour="%{BKY_MATH_HUE}"></category>

                    <block type= "controls_repeat_ext"></block>
                    "inputs">{
                        "TIMES">{
                            "block">{
                                "type">"math_number">
                                <field name=            "NUM">10
                                }>
                            }>
                        }>

                    <block type= "controls_whileUntil"></block>

                    <block type= "table_pairs_foreach"></block>
                }
            ]>
        }>
        {
            <category name= "Math" colour="%{BKY_MATH_HUE}"></category>

                    <block type= "math_number"></block>
                    <field name="NUM">123>






                    <block type= "math_constrain"></block>
                    "inputs">{
                        "LOW">{
                            "block">{
                                "type">"math_number">
                                <field name=            "NUM">1>
                                }>
                            }>
                        }>
                        "HIGH">{
                            "block">{
                                "type">"math_number">
                                <field name=            "NUM">10>
                                }>
                            }>
                        }>

                    <block type= "math_random_int">
                    "inputs">{
                        "FROM">{
                            "block">{
                                "type">"math_number">
                                <field name=            "NUM">1>
                                }>
                            }>
                        }>
                        "TO">{
                            "block">{
                                "type">"math_number">
                                <field name=            "NUM">10>
                                }>
                            }>
                        }>

                    <block type= "math_random_float">

                    <block type= "math_atan2">
                }
            ]>
        }>
        {
            <category name= "Text" colour="%{BKY_MATH_HUE}"></category>

                    <block type= "text">
                    <field name="TEXT">"Hello">

                    <block type= "text_length">

                    <block type= "text_print">

                    <block type= "text_concat">
                }>
            ]>
        }>
        {
            <category name= "Variables">
            "custom">"VARIABLE">
        }>
        {
            <category name= "Local Variables" colour="%{BKY_MATH_HUE}"></category>

                    <block type= "declare_local_variables">
                }
            ]>
        }>
        {
            <category name= "Functions">
            "custom">"PROCEDURE">
        }>
        {
            <category name= "Control" colour="%{BKY_MATH_HUE}"></category>

                    <block type= "wait">

                    <block type= "spawn_thread">
                }
            ]
        }>
        {
            <category name= "Data" colour="%{BKY_MATH_HUE}"></category>

                    <block type= "math_number">
                    <field name="NUM">123>

                    <block type= "nil">

                    <block type= "logic_boolean">
                    <field name="BOOL">"TRUE"

                    <block type= "text">
                    <field name="TEXT">"Hello">

                    <block type= "vector3_new">
                    "inputs">{
                        "X">{
                            "block">{
                                "type">"math_number">
                                <field name=            "NUM">0>
                                }>
                            }>
                        }>
                        "Y">{
                            "block">{
                                "type">"math_number">
                                <field name=            "NUM">0>
                                }>
                            }>
                        }>
                        "Z">{
                            "block">{
                                "type">"math_number">
                                <field name=            "NUM">0>
                                }>
                            }>
                        }>

                    <block type= "table_new">

                    <block type= "table_get_attribute">
                    "inputs">{
                        "ATTRIBUTE">{
                            "block">{
                                "type">"text">
                                <field name=            "TEXT">"attribute">
                                }>
                            }>
                        }>
                    }>

                    <block type= "table_set_attribute">
                    "inputs">{
                        "ATTRIBUTE">{
                            "block">{
                                "type">"text">
                                <field name=            "TEXT">"attribute">
                                }>
                            }>
                        }>
                        "VALUE">{
                            "block">{
                                "type">"text">
                                <field name=            "TEXT">"value">
                                }>
                            }>
                        }>
                    }>

                    <block type= "stringvalue_get_value">

                    <block type= "stringvalue_set_value">
                }
            ]
        }>
        {
            <category name= "Instance" colour="%{BKY_MATH_HUE}"></category>

                    <block type= "instance_new">

                    <block type= "instance_new_with_parent">

                    <block type= "instance_find_first_child">
                    "inputs">{
                        "NAME">{
                            "block">{
                                "type">"text">
                                <field name=            "TEXT">"Child">
                                }>
                            }>
                        }>

                    <block type= "instance_wait_for_child">
                    "inputs">{
                        "NAME">{
                            "block">{
                                "type">"text">
                                <field name=            "TEXT">"Child">
                                }>
                            }>
                        }>

                    <block type= "instance_destroy">

                    <block type= "instance_is_a">

                    <block type= "instance_get_attribute">

                    <block type= "instance_set_attribute">

                    <block type= "instance_clone">

                    <block type= "script_get_parent">

                    <block type= "instance_get_children">
                }>
            ]
        }>
        {
            <category name= "Part" colour="%{BKY_MATH_HUE}"></category>

                    <block type= "part_on_touched">

                    <block type= "part_get_attribute">

                    <block type= "part_set_attribute">
                }
            ]
        }>
        {
            <category name= "Humanoid">
            "contents">[

                {
                    <block type= "humanoid_set_scale">
                    "inputs">{
                        "NAME">{
                            "block">{
                                "type">"math_number">
                                <field name=            "NUM">1.0>
                                }>
                            }>
                        }>
                    }>

                    <block type= "humanoid_get_scale">

                    <block type= "humanoid_get_attribute">

                    <block type= "humanoid_set_attribute">
                }
            ]
        }>
        {
            <category name= "Services" colour="%{BKY_MATH_HUE}"></category>

                    <block type= "get_service">

                    "kind">"category">
                    "name">"Players">
                    "contents">[
                        {
                            "kind">"block">
                            "type">"get_players">
                        }>
                        {
                            "kind">"block">
                            "type">"players_player_added">
                        }>
                        {
                            "kind">"block">
                            "type">"get_local_player">
                        }>
                        {
                            "kind">"block">
                            "type">"player_character_added_wait">
                        }>
                        {
                            "kind">"block">
                            "type">"player_get_attribute">
                        }>
                        {
                            "kind">"block">
                            "type">"player_set_attribute">
                        }
                    ]>

                    "kind">"category">
                    "name">"Data Storage">
                    "contents">[
                        {
                            "kind">"block">
                            "type">"datastorage_svc_get_datastore">
                            "inputs">{
                                "NAME">{
                                    "block">{
                                        "type">"text">
                                        <field name=                    "TEXT">"DataStore">
                                        }>
                                    }>
                                }>
                            }>
                        }>
                        {
                            "kind">"block">
                            "type">"datastorage_svc_get">
                            "inputs">{
                                "NAME">{
                                    "block">{
                                        "type">"text">
                                        <field name=                    "TEXT">"key">
                                        }>
                                    }>
                                }>
                            }>
                        }>
                        {
                            "kind">"block">
                            "type">"datastorage_svc_set">
                            "inputs">{
                                "NAME">{
                                    "block">{
                                        "type">"text">
                                        <field name=                    "TEXT">"key">
                                        }>
                                    }>
                                }>
                                "VALUE">{
                                    "block">{
                                        "type">"text">
                                        <field name=                    "TEXT">"value">
                                        }>
                                    }>
                                }>
                            }>
                        }
                    ]

                    "kind">"category">
                    "name">"Marketplace">
                    "contents">[
                        {
                            "kind">"block">
                            "type">"marketplace_game_pass_purchased">
                        }>
                        {
                            "kind">"block">
                            "type">"marketplace_player_owns_gamepass">
                            "inputs">{
                                "NAME">{
                                    "block">{
                                        "type">"math_number">
                                        <field name=                    "NUM">123>
                                        }>
                                    }>
                                }>
                            }>
                        }>
                        {
                            "kind">"block">
                            "type">"marketplace_prompt_gamepass_purchase">
                            "inputs">{
                                "NAME">{
                                    "block">{
                                        "type">"math_number">
                                        <field name=                    "NUM">123>
                                        }>
                                    }>
                                }>
                            }>
                        }
                    ]

                    "kind">"category">
                    "name">"Tweens">
                    "contents">[
                        {
                            "kind">"block">
                            "type">"tween_info_new">
                            // time number input (1)
                            "inputs">{
                                "TIME">{
                                    "block">{
                                        "type">"math_number">
                                        <field name=                    "NUM">1>
                                        }>
                                    }>
                                }>
                            }>
                        }>
                        {
                            "kind">"block">
                            "type">"tween_info_new_all">
                            // time number input (1)> delay number input (0)> repeat count number input (0)
                            "inputs">{
                                "TIME">{
                                    "block">{
                                        "type">"math_number">
                                        <field name=                    "NUM">1>
                                        }>
                                    }>
                                }>
                                "DELAY_TIME">{
                                    "block">{
                                        "type">"math_number">
                                        <field name=                    "NUM">0>
                                        }>
                                    }>
                                }>
                                "REPEAT_COUNT">{
                                    "block">{
                                        "type">"math_number">
                                        <field name=                    "NUM">0>
                                        }>
                                    }>
                                }>
                            }>
                        }>
                        {
                            "kind">"block">
                            "type">"tween_create">
                        }>
                        {
                            "kind">"block">
                            "type">"tween_play">
                        }>
                        {
                            "kind">"block">
                            "type">"tween_cancel">
                        }>
                    ]>
                }
            ]
        }>
        {
            <category name= "Tools" colour="%{BKY_MATH_HUE}"></category>

                    <block type= "tool_activated">
                }
            ]
        }>
        {

                }
            ]
        }>
        {

                }>
            ]
        }>
        {

            ]
        }>
        {

                }
            ]
        }
    ]
}