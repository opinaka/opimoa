var bloxcode_toolbox = {
    "kind": "categoryToolbox",
    "contents": [
        {
            "kind": "category",
            "name": "Logic",
            "contents": [
                {
                    "kind": "block",
                    "type": "controls_if",
                },
                {
                    "kind": "block",
                    "type": "logic_compare",
                    "fields": {
                        "OP": "EQ",
                    },
                },
                {
                    "kind": "block",
                    "type": "logic_operation",
                    "fields": {
                        "OP": "AND"
                    }
                },
                {
                    "kind": "block",
                    "type": "logic_negate"
                },
                {
                    "kind": "block",
                    "type": "logic_boolean",
                    "fields": {
                        "BOOL": "TRUE"
                    }
                }
            ],
        },
        {
            "kind": "category",
            "name": "Loops",
            "contents": [
                {
                    "kind": "block",
                    "type": "controls_repeat_ext",
                    "inputs": {
                        "TIMES": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 10
                                },
                            },
                        },
                    }
                },
                {
                    "kind": "block",
                    "type": "controls_whileUntil",
                },
                {
                    "kind": "block",
                    "type": "table_pairs_foreach",
                }
            ],
        },
        {
            "kind": "category",
            "name": "Math",
            "contents": [
                {
                    "kind": "block",
                    "type": "math_number",
                    "fields": {
                        "NUM": 123,
                    }
                },
                {
                    "kind": "block",
                    "type": "math_arithmetic",
                },
                {
                    "kind": "block",
                    "type": "math_single",
                },
                {
                    "kind": "block",
                    "type": "math_trig",
                },
                {
                    "kind": "block",
                    "type": "math_constant",
                },
                {
                    "kind": "block",
                    "type": "math_number_property",
                },
                {
                    "kind": "block",
                    "type": "math_round",
                },
                {
                    "kind": "block",
                    "type": "math_on_list",
                },
                {
                    "kind": "block",
                    "type": "math_modulo",
                },
                {
                    "kind": "block",
                    "type": "math_constrain",
                    "inputs": {
                        "LOW": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 1,
                                },
                            },
                        },
                        "HIGH": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 10,
                                },
                            },
                        },
                    }
                },
                {
                    "kind": "block",
                    "type": "math_random_int",
                    "inputs": {
                        "FROM": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 1,
                                },
                            },
                        },
                        "TO": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 10,
                                },
                            },
                        },
                    }
                },
                {
                    "kind": "block",
                    "type": "math_random_float",
                },
                {
                    "kind": "block",
                    "type": "math_atan2",
                }
            ],
        },
        {
            "kind": "category",
            "name": "Text",
            "contents": [
                {
                    "kind": "block",
                    "type": "text",
                    "fields": {
                        "TEXT": "Hello",
                    }
                },
                {
                    "kind": "block",
                    "type": "text_length",
                },
                {
                    "kind": "block",
                    "type": "text_print",
                },
                {
                    "kind": "block",
                    "type": "text_concat",
                },
            ],
        },
        {
            "kind": "category",
            "name": "Variables",
            "custom": "VARIABLE",
        },
        {
            "kind": "category",
            "name": "Local Variables",
            "contents": [
                {
                    "kind": "block",
                    "type": "declare_local_variables",
                }
            ],
        },
        {
            "kind": "category",
            "name": "Functions",
            "custom": "PROCEDURE",
        },
        {
            "kind": "category",
            "name": "Control",
            "contents": [
                {
                    "kind": "block",
                    "type": "wait",
                },
                {
                    "kind": "block",
                    "type": "spawn_thread",
                }
            ]
        },
        {
            "kind": "category",
            "name": "Data",
            "contents": [
                {
                    "kind": "block",
                    "type": "math_number",
                    "fields": {
                        "NUM": 123,
                    }
                },
                {
                    "kind": "block",
                    "type": "nil",
                },
                {
                    "kind": "block",
                    "type": "logic_boolean",
                    "fields": {
                        "BOOL": "TRUE"
                    }
                },
                {
                    "kind": "block",
                    "type": "text",
                    "fields": {
                        "TEXT": "Hello",
                    }
                },
                {
                    "kind": "block",
                    "type": "vector3_new",
                    "inputs": {
                        "X": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 0,
                                },
                            },
                        },
                        "Y": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 0,
                                },
                            },
                        },
                        "Z": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 0,
                                },
                            },
                        },
                    }
                },
                {
                    "kind": "block",
                    "type": "table_new",
                },
                {
                    "kind": "block",
                    "type": "table_get_attribute",
                    "inputs": {
                        "ATTRIBUTE": {
                            "block": {
                                "type": "text",
                                "fields": {
                                    "TEXT": "attribute",
                                },
                            },
                        },
                    },
                },
                {
                    "kind": "block",
                    "type": "table_set_attribute",
                    "inputs": {
                        "ATTRIBUTE": {
                            "block": {
                                "type": "text",
                                "fields": {
                                    "TEXT": "attribute",
                                },
                            },
                        },
                        "VALUE": {
                            "block": {
                                "type": "text",
                                "fields": {
                                    "TEXT": "value",
                                },
                            },
                        },
                    },
                },
                {
                    "kind": "block",
                    "type": "stringvalue_get_value",
                },
                {
                    "kind": "block",
                    "type": "stringvalue_set_value",
                }
            ]
        },
        {
            "kind": "category",
            "name": "Instance",
            "contents": [
                {
                    "kind": "block",
                    "type": "instance_new",
                },
                {
                    "kind": "block",
                    "type": "instance_new_with_parent",
                },
                {
                    "kind": "block",
                    "type": "instance_find_first_child",
                    "inputs": {
                        "NAME": {
                            "block": {
                                "type": "text",
                                "fields": {
                                    "TEXT": "Child",
                                },
                            },
                        },
                    }
                },
                {
                    "kind": "block",
                    "type": "instance_wait_for_child",
                    "inputs": {
                        "NAME": {
                            "block": {
                                "type": "text",
                                "fields": {
                                    "TEXT": "Child",
                                },
                            },
                        },
                    }
                },
                {
                    "kind": "block",
                    "type": "instance_destroy",
                },
                {
                    "kind": "block",
                    "type": "instance_is_a",
                },
                {
                    "kind": "block",
                    "type": "instance_get_attribute",
                },
                {
                    "kind": "block",
                    "type": "instance_set_attribute",
                },
                {
                    "kind": "block",
                    "type": "instance_clone",
                },
                {
                    "kind": "block",
                    "type": "script_get_parent",
                },
                {
                    "kind": "block",
                    "type": "instance_get_children",
                },
            ]
        },
        {
            "kind": "category",
            "name": "Part",
            "contents": [
                {
                    "kind": "block",
                    "type": "part_on_touched",
                },
                {
                    "kind": "block",
                    "type": "part_get_attribute",
                },
                {
                    "kind": "block",
                    "type": "part_set_attribute",
                }
            ]
        },
        {
            "kind": "category",
            "name": "Humanoid",
            "contents": [

                {
                    "kind": "block",
                    "type": "humanoid_set_scale",
                    "inputs": {
                        "NAME": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 1.0,
                                },
                            },
                        },
                    },
                },
                {
                    "kind": "block",
                    "type": "humanoid_get_scale",
                },
                {
                    "kind": "block",
                    "type": "humanoid_get_attribute",
                },
                {
                    "kind": "block",
                    "type": "humanoid_set_attribute",
                }
            ]
        },
        {
            "kind": "category",
            "name": "Services",
            "contents": [
                {
                    "kind": "block",
                    "type": "get_service",
                },
                {
                    "kind": "category",
                    "name": "Players",
                    "contents": [
                        {
                            "kind": "block",
                            "type": "get_players",
                        },
                        {
                            "kind": "block",
                            "type": "players_player_added",
                        },
                        {
                            "kind": "block",
                            "type": "get_local_player",
                        },
                        {
                            "kind": "block",
                            "type": "player_character_added_wait",
                        },
                        {
                            "kind": "block",
                            "type": "player_get_attribute",
                        },
                        {
                            "kind": "block",
                            "type": "player_set_attribute",
                        }
                    ],
                },
                {
                    "kind": "category",
                    "name": "Data Storage",
                    "contents": [
                        {
                            "kind": "block",
                            "type": "datastorage_svc_get_datastore",
                            "inputs": {
                                "NAME": {
                                    "block": {
                                        "type": "text",
                                        "fields": {
                                            "TEXT": "DataStore",
                                        },
                                    },
                                },
                            },
                        },
                        {
                            "kind": "block",
                            "type": "datastorage_svc_get",
                            "inputs": {
                                "NAME": {
                                    "block": {
                                        "type": "text",
                                        "fields": {
                                            "TEXT": "key",
                                        },
                                    },
                                },
                            },
                        },
                        {
                            "kind": "block",
                            "type": "datastorage_svc_set",
                            "inputs": {
                                "NAME": {
                                    "block": {
                                        "type": "text",
                                        "fields": {
                                            "TEXT": "key",
                                        },
                                    },
                                },
                                "VALUE": {
                                    "block": {
                                        "type": "text",
                                        "fields": {
                                            "TEXT": "value",
                                        },
                                    },
                                },
                            },
                        }
                    ]
                },
                {
                    "kind": "category",
                    "name": "Marketplace",
                    "contents": [
                        {
                            "kind": "block",
                            "type": "marketplace_game_pass_purchased",
                        },
                        {
                            "kind": "block",
                            "type": "marketplace_player_owns_gamepass",
                            "inputs": {
                                "NAME": {
                                    "block": {
                                        "type": "math_number",
                                        "fields": {
                                            "NUM": 123,
                                        },
                                    },
                                },
                            },
                        },
                        {
                            "kind": "block",
                            "type": "marketplace_prompt_gamepass_purchase",
                            "inputs": {
                                "NAME": {
                                    "block": {
                                        "type": "math_number",
                                        "fields": {
                                            "NUM": 123,
                                        },
                                    },
                                },
                            },
                        }
                    ]
                },
                {
                    "kind": "category",
                    "name": "Tweens",
                    "contents": [
                        {
                            "kind": "block",
                            "type": "tween_info_new",
                            // time number input (1)
                            "inputs": {
                                "TIME": {
                                    "block": {
                                        "type": "math_number",
                                        "fields": {
                                            "NUM": 1,
                                        },
                                    },
                                },
                            },
                        },
                        {
                            "kind": "block",
                            "type": "tween_info_new_all",
                            // time number input (1), delay number input (0), repeat count number input (0)
                            "inputs": {
                                "TIME": {
                                    "block": {
                                        "type": "math_number",
                                        "fields": {
                                            "NUM": 1,
                                        },
                                    },
                                },
                                "DELAY_TIME": {
                                    "block": {
                                        "type": "math_number",
                                        "fields": {
                                            "NUM": 0,
                                        },
                                    },
                                },
                                "REPEAT_COUNT": {
                                    "block": {
                                        "type": "math_number",
                                        "fields": {
                                            "NUM": 0,
                                        },
                                    },
                                },
                            },
                        },
                        {
                            "kind": "block",
                            "type": "tween_create",
                        },
                        {
                            "kind": "block",
                            "type": "tween_play",
                        },
                        {
                            "kind": "block",
                            "type": "tween_cancel",
                        },
                    ],
                }
            ]
        },
        {
            "kind": "category",
            "name": "Tools",
            "contents": [
                {
                    "kind": "block",
                    "type": "tool_activated",
                }
            ]
        },
        {
            "kind": "category",
            "name": "Animation",
            "contents": [
                {
                    "kind": "block",
                    "type": "animator_load_animation",
                },
                {
                    "kind": "block",
                    "type": "animation_track_play",
                }
            ]
        },
        {
            "kind": "category",
            "name": "Sound",
            "contents": [
                {
                    "kind": "block",
                    "type": "sound_play",
                },
                {
                    "kind": "block",
                    "type": "sound_new",
                },
                {
                    "kind": "block",
                    "type": "sound_service_play_local_sound",
                },
            ]
        },
        {
            "kind": "category",
            "name": "Remote Events",
            "contents": [
                {
                    "kind": "block",
                    "type": "remote_event_fire_server",
                },
                {
                    "kind": "block",
                    "type": "remote_event_on_server_event",
                },
                {
                    "kind": "block",
                    "type": "remote_event_fire_client",
                },
                {
                    "kind": "block",
                    "type": "remote_event_on_client_event",
                },
            ]
        },
        {
            "kind": "category",
            "name": "GUI",
            "contents": [
                {
                    "kind": "block",
                    "type": "gui_button_mouse1_click",
                },
                {
                    "kind": "block",
                    "type": "gui_object_get_attribute",
                },
                {
                    "kind": "block",
                    "type": "gui_object_set_attribute",
                },
                {
                    "kind": "block",
                    "type": "gui_text_label_get_attribute",
                },
                {
                    "kind": "block",
                    "type": "gui_text_label_set_attribute",
                }
            ]
        }
    ]
}