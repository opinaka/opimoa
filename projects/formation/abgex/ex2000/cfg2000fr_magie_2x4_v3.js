// cfg2000fr_magie_2x4_v3.js
// Tout ce qui suit un double slash sont des commentaires, jusqu'à la fin de la ligne.
/*
Les blocs de lignes commençant par 'slash étoile' et terminant par 'étoile slash' sont des commentaires

Ceci est un fichier de configuration, qui permet de définir :
° la toolbox = l'ensemble des blocs disponibles
° la startblocs = les blocs présents au départ
° la définition des cases
° la définition des cartes présentes
° les fenêtres visibles et cachées
° la position des fenêtres
° la taille des fenêtres
° divers autres paramètres.

Ce fichier de configuration est un programme écrit en javascript.
Ceci rend la configuration très souple et puissante.
Il n'est pas nécessaire de tout comprendre pour prendre un fichier de configuration
existant, faire quelques modification et obtenir ainsi un nouveau fichier de fonfiguration.
 */
//-------------------------------------------------
/*
Fichier de configuration pour une table de 2 colonnes de 8 cartes, avec deux cartes à cliquer.
 */
// ########################################################################################

function confToolBoxInit() {
//==========================
// Définition de la toolbox utilisée.

} // confToolBoxInit

function confStartBlocksInit() {
//==============================
// Définition des blocs présents au départ
// C'est long mais simple à faire.
// On :
// ° place les blocs désirés dans ex2000.html
// ° Fichiers enregistrer sous ...
// ° demande de voir le fichier dans un éditeur de texte.
// ° fait un copier-coller du texte.
// ° ajoute des  +'\n'  en début de chaque ligne (sauf la première)
// ° ajoute des  '  en fin de ligne.

//return; // Ne fait rien

gloB.demoWorkspace.clear();  // Enlève tous les blocs, c.f. : https://developers.google.com/blockly/reference/js/Blockly.WorkspaceSvg#cleanUp

var strText = 
'<xml xmlns="http://www.w3.org/1999/xhtml">'
+'\n  <variables>'
+'\n    <variable type="">nCadre</variable>'
+'\n    <variable type="">param</variable>'
+'\n    <variable type="">j</variable>'
+'\n    <variable type="">i</variable>'
+'\n  </variables>'
+'\n  <block type="card_link_func_card" x="10" y="10">'
+'\n    <value name="FRAME1">'
+'\n      <shadow type="math_number">'
+'\n        <field name="NUM">17</field>'
+'\n      </shadow>'
+'\n    </value>'
+'\n    <value name="FUNC">'
+'\n      <shadow type="text">'
+'\n        <field name="TEXT">redistribue</field>'
+'\n      </shadow>'
+'\n    </value>'
+'\n    <next>'
+'\n      <block type="card_link_func_card">'
+'\n        <value name="FRAME1">'
+'\n          <shadow type="math_number">'
+'\n            <field name="NUM">18</field>'
+'\n          </shadow>'
+'\n        </value>'
+'\n        <value name="FUNC">'
+'\n          <shadow type="text">'
+'\n            <field name="TEXT">redistribue</field>'
+'\n          </shadow>'
+'\n        </value>'
+'\n        <next>'
+'\n          <block type="card_link_func_card">'
+'\n            <value name="FRAME1">'
+'\n              <shadow type="math_number">'
+'\n                <field name="NUM">19</field>'
+'\n              </shadow>'
+'\n            </value>'
+'\n            <value name="FUNC">'
+'\n              <shadow type="text">'
+'\n                <field name="TEXT">reset</field>'
+'\n              </shadow>'
+'\n            </value>'
+'\n          </block>'
+'\n        </next>'
+'\n      </block>'
+'\n    </next>'
+'\n  </block>'
+'\n  <block type="procedures_defnoreturn" x="8" y="183">'
+'\n    <mutation>'
+'\n      <arg name="nCadre" varid="T3X$B7SUfj:@je{ilQqe"></arg>'
+'\n    </mutation>'
+'\n    <field name="NAME">redistribue</field>'
+"\n    <comment pinned='false' h='80' w='160'>Déplace les cartes en fonction du clique effectué, pour qu'au bout de la troisième fois, elle se retrouve en haut à gauche.</comment>"
+'\n    <statement name="STACK">'
+'\n      <block type="variables_set">'
+'\n        <field name="VAR" variabletype="">param</field>'
+'\n        <value name="VALUE">'
+'\n          <block type="text_parse_to_number">'
+'\n            <field name="TYPE">INT</field>'
+'\n            <value name="STR">'
+'\n              <shadow type="text">'
+'\n                <field name="TEXT">123</field>'
+'\n              </shadow>'
+'\n              <block type="card_get_card_param">'
+'\n                <value name="FRAME1">'
+'\n                  <shadow type="math_number">'
+'\n                    <field name="NUM">17</field>'
+'\n                  </shadow>'
+'\n                </value>'
+'\n              </block>'
+'\n            </value>'
+'\n          </block>'
+'\n        </value>'
+'\n        <next>'
+'\n          <block type="variables_set">'
+'\n            <field name="VAR" variabletype="">param</field>'
+'\n            <value name="VALUE">'
+'\n              <block type="math_arithmetic">'
+'\n                <field name="OP">ADD</field>'
+'\n                <value name="A">'
+'\n                  <shadow type="math_number">'
+'\n                    <field name="NUM">1</field>'
+'\n                  </shadow>'
+'\n                  <block type="variables_get">'
+'\n                    <field name="VAR" variabletype="">param</field>'
+'\n                  </block>'
+'\n                </value>'
+'\n                <value name="B">'
+'\n                  <shadow type="math_number">'
+'\n                    <field name="NUM">1</field>'
+'\n                  </shadow>'
+'\n                </value>'
+'\n              </block>'
+'\n            </value>'
+'\n            <next>'
+'\n              <block type="card_set_card_param">'
+'\n                <value name="FRAME1">'
+'\n                  <shadow type="math_number">'
+'\n                    <field name="NUM">17</field>'
+'\n                  </shadow>'
+'\n                </value>'
+'\n                <value name="PARAM1">'
+'\n                  <shadow type="text">'
+'\n                    <field name="TEXT"></field>'
+'\n                  </shadow>'
+'\n                  <block type="variables_get">'
+'\n                    <field name="VAR" variabletype="">param</field>'
+'\n                  </block>'
+'\n                </value>'
+'\n                <next>'
+'\n                  <block type="controls_if">'
+'\n                    <mutation else="1"></mutation>'
+'\n                    <value name="IF0">'
+'\n                      <block type="logic_compare">'
+'\n                        <field name="OP">EQ</field>'
+'\n                        <value name="A">'
+'\n                          <block type="variables_get">'
+'\n                            <field name="VAR" variabletype="">nCadre</field>'
+'\n                          </block>'
+'\n                        </value>'
+'\n                        <value name="B">'
+'\n                          <block type="math_number">'
+'\n                            <field name="NUM">17</field>'
+'\n                          </block>'
+'\n                        </value>'
+'\n                      </block>'
+'\n                    </value>'
+'\n                    <statement name="DO0">'
+'\n                      <block type="controls_for">'
+'\n                        <field name="VAR" variabletype="">i</field>'
+'\n                        <value name="FROM">'
+'\n                          <shadow type="math_number">'
+'\n                            <field name="NUM">1</field>'
+'\n                          </shadow>'
+'\n                        </value>'
+'\n                        <value name="TO">'
+'\n                          <shadow type="math_number">'
+'\n                            <field name="NUM">15</field>'
+'\n                          </shadow>'
+'\n                        </value>'
+'\n                        <value name="BY">'
+'\n                          <shadow type="math_number">'
+'\n                            <field name="NUM">2</field>'
+'\n                          </shadow>'
+'\n                        </value>'
+'\n                        <statement name="DO">'
+'\n                          <block type="card_movef1f2">'
+'\n                            <data>1</data>'
+'\n                            <value name="FRAME1">'
+'\n                              <shadow type="math_number">'
+'\n                                <field name="NUM">0</field>'
+'\n                              </shadow>'
+'\n                              <block type="variables_get">'
+'\n                                <field name="VAR" variabletype="">i</field>'
+'\n                              </block>'
+'\n                            </value>'
+'\n                            <value name="FRAME2">'
+'\n                              <shadow type="math_number">'
+'\n                                <field name="NUM">0</field>'
+'\n                              </shadow>'
+'\n                            </value>'
+'\n                          </block>'
+'\n                        </statement>'
+'\n                        <next>'
+'\n                          <block type="controls_for">'
+'\n                            <field name="VAR" variabletype="">i</field>'
+'\n                            <value name="FROM">'
+'\n                              <shadow type="math_number">'
+'\n                                <field name="NUM">2</field>'
+'\n                              </shadow>'
+'\n                            </value>'
+'\n                            <value name="TO">'
+'\n                              <shadow type="math_number">'
+'\n                                <field name="NUM">16</field>'
+'\n                              </shadow>'
+'\n                            </value>'
+'\n                            <value name="BY">'
+'\n                              <shadow type="math_number">'
+'\n                                <field name="NUM">2</field>'
+'\n                              </shadow>'
+'\n                            </value>'
+'\n                            <statement name="DO">'
+'\n                              <block type="card_movef1f2">'
+'\n                                <data>1</data>'
+'\n                                <value name="FRAME1">'
+'\n                                  <shadow type="math_number">'
+'\n                                    <field name="NUM">0</field>'
+'\n                                  </shadow>'
+'\n                                  <block type="variables_get">'
+'\n                                    <field name="VAR" variabletype="">i</field>'
+'\n                                  </block>'
+'\n                                </value>'
+'\n                                <value name="FRAME2">'
+'\n                                  <shadow type="math_number">'
+'\n                                    <field name="NUM">0</field>'
+'\n                                  </shadow>'
+'\n                                </value>'
+'\n                              </block>'
+'\n                            </statement>'
+'\n                          </block>'
+'\n                        </next>'
+'\n                      </block>'
+'\n                    </statement>'
+'\n                    <statement name="ELSE">'
+'\n                      <block type="controls_for">'
+'\n                        <field name="VAR" variabletype="">i</field>'
+'\n                        <value name="FROM">'
+'\n                          <shadow type="math_number">'
+'\n                            <field name="NUM">2</field>'
+'\n                          </shadow>'
+'\n                        </value>'
+'\n                        <value name="TO">'
+'\n                          <shadow type="math_number">'
+'\n                            <field name="NUM">16</field>'
+'\n                          </shadow>'
+'\n                        </value>'
+'\n                        <value name="BY">'
+'\n                          <shadow type="math_number">'
+'\n                            <field name="NUM">2</field>'
+'\n                          </shadow>'
+'\n                        </value>'
+'\n                        <statement name="DO">'
+'\n                          <block type="card_movef1f2">'
+'\n                            <data>1</data>'
+'\n                            <value name="FRAME1">'
+'\n                              <shadow type="math_number">'
+'\n                                <field name="NUM">0</field>'
+'\n                              </shadow>'
+'\n                              <block type="variables_get">'
+'\n                                <field name="VAR" variabletype="">i</field>'
+'\n                              </block>'
+'\n                            </value>'
+'\n                            <value name="FRAME2">'
+'\n                              <shadow type="math_number">'
+'\n                                <field name="NUM">0</field>'
+'\n                              </shadow>'
+'\n                            </value>'
+'\n                          </block>'
+'\n                        </statement>'
+'\n                        <next>'
+'\n                          <block type="controls_for">'
+'\n                            <field name="VAR" variabletype="">i</field>'
+'\n                            <value name="FROM">'
+'\n                              <shadow type="math_number">'
+'\n                                <field name="NUM">1</field>'
+'\n                              </shadow>'
+'\n                            </value>'
+'\n                            <value name="TO">'
+'\n                              <shadow type="math_number">'
+'\n                                <field name="NUM">15</field>'
+'\n                              </shadow>'
+'\n                            </value>'
+'\n                            <value name="BY">'
+'\n                              <shadow type="math_number">'
+'\n                                <field name="NUM">2</field>'
+'\n                              </shadow>'
+'\n                            </value>'
+'\n                            <statement name="DO">'
+'\n                              <block type="card_movef1f2">'
+'\n                                <data>1</data>'
+'\n                                <value name="FRAME1">'
+'\n                                  <shadow type="math_number">'
+'\n                                    <field name="NUM">0</field>'
+'\n                                  </shadow>'
+'\n                                  <block type="variables_get">'
+'\n                                    <field name="VAR" variabletype="">i</field>'
+'\n                                  </block>'
+'\n                                </value>'
+'\n                                <value name="FRAME2">'
+'\n                                  <shadow type="math_number">'
+'\n                                    <field name="NUM">0</field>'
+'\n                                  </shadow>'
+'\n                                </value>'
+'\n                              </block>'
+'\n                            </statement>'
+'\n                          </block>'
+'\n                        </next>'
+'\n                      </block>'
+'\n                    </statement>'
+'\n                    <next>'
+'\n                      <block type="controls_for">'
+'\n                        <field name="VAR" variabletype="">i</field>'
+'\n                        <value name="FROM">'
+'\n                          <shadow type="math_number">'
+'\n                            <field name="NUM">16</field>'
+'\n                          </shadow>'
+'\n                        </value>'
+'\n                        <value name="TO">'
+'\n                          <shadow type="math_number">'
+'\n                            <field name="NUM">1</field>'
+'\n                          </shadow>'
+'\n                        </value>'
+'\n                        <value name="BY">'
+'\n                          <shadow type="math_number">'
+'\n                            <field name="NUM">1</field>'
+'\n                          </shadow>'
+'\n                        </value>'
+'\n                        <statement name="DO">'
+'\n                          <block type="controls_if">'
+'\n                            <value name="IF0">'
+'\n                              <block type="logic_compare">'
+'\n                                <field name="OP">EQ</field>'
+'\n                                <value name="A">'
+'\n                                  <block type="variables_get">'
+'\n                                    <field name="VAR" variabletype="">param</field>'
+'\n                                  </block>'
+'\n                                </value>'
+'\n                                <value name="B">'
+'\n                                  <block type="math_number">'
+'\n                                    <field name="NUM">4</field>'
+'\n                                  </block>'
+'\n                                </value>'
+'\n                              </block>'
+'\n                            </value>'
+'\n                            <statement name="DO0">'
+'\n                              <block type="controls_if">'
+'\n                                <value name="IF0">'
+'\n                                  <block type="logic_compare">'
+'\n                                    <field name="OP">EQ</field>'
+'\n                                    <value name="A">'
+'\n                                      <block type="variables_get">'
+'\n                                        <field name="VAR" variabletype="">i</field>'
+'\n                                      </block>'
+'\n                                    </value>'
+'\n                                    <value name="B">'
+'\n                                      <block type="math_number">'
+'\n                                        <field name="NUM">1</field>'
+'\n                                      </block>'
+'\n                                    </value>'
+'\n                                  </block>'
+'\n                                </value>'
+'\n                                <statement name="DO0">'
+'\n                                  <block type="card_add_one_card">'
+'\n                                    <data>1</data>'
+'\n                                    <value name="CARD">'
+'\n                                      <shadow type="math_number">'
+'\n                                        <field name="NUM">900</field>'
+'\n                                      </shadow>'
+'\n                                    </value>'
+'\n                                    <value name="BACK">'
+'\n                                      <shadow type="math_number">'
+'\n                                        <field name="NUM">900</field>'
+'\n                                      </shadow>'
+'\n                                      <block type="card_get_card">'
+'\n                                        <value name="FRAME1">'
+'\n                                          <shadow type="math_number">'
+'\n                                            <field name="NUM">0</field>'
+'\n                                          </shadow>'
+'\n                                        </value>'
+'\n                                      </block>'
+'\n                                    </value>'
+'\n                                    <value name="FRAME2">'
+'\n                                      <shadow type="math_number">'
+'\n                                        <field name="NUM">20</field>'
+'\n                                      </shadow>'
+'\n                                    </value>'
+'\n                                  </block>'
+'\n                                </statement>'
+'\n                                <next>'
+'\n                                  <block type="card_flip">'
+'\n                                    <data>1</data>'
+'\n                                    <value name="FRAME1">'
+'\n                                      <shadow type="math_number">'
+'\n                                        <field name="NUM">0</field>'
+'\n                                      </shadow>'
+'\n                                    </value>'
+'\n                                  </block>'
+'\n                                </next>'
+'\n                              </block>'
+'\n                            </statement>'
+'\n                            <next>'
+'\n                              <block type="card_movef1f2">'
+'\n                                <data>1</data>'
+'\n                                <value name="FRAME1">'
+'\n                                  <shadow type="math_number">'
+'\n                                    <field name="NUM">0</field>'
+'\n                                  </shadow>'
+'\n                                </value>'
+'\n                                <value name="FRAME2">'
+'\n                                  <shadow type="math_number">'
+'\n                                    <field name="NUM">0</field>'
+'\n                                  </shadow>'
+'\n                                  <block type="variables_get">'
+'\n                                    <field name="VAR" variabletype="">i</field>'
+'\n                                  </block>'
+'\n                                </value>'
+'\n                              </block>'
+'\n                            </next>'
+'\n                          </block>'
+'\n                        </statement>'
+'\n                        <next>'
+'\n                          <block type="controls_if">'
+'\n                            <value name="IF0">'
+'\n                              <block type="logic_compare">'
+'\n                                <field name="OP">EQ</field>'
+'\n                                <value name="A">'
+'\n                                  <block type="variables_get">'
+'\n                                    <field name="VAR" variabletype="">param</field>'
+'\n                                  </block>'
+'\n                                </value>'
+'\n                                <value name="B">'
+'\n                                  <block type="math_number">'
+'\n                                    <field name="NUM">4</field>'
+'\n                                  </block>'
+'\n                                </value>'
+'\n                              </block>'
+'\n                            </value>'
+'\n                            <statement name="DO0">'
+'\n                              <block type="card_movef1f2">'
+'\n                                <data>1</data>'
+'\n                                <value name="FRAME1">'
+'\n                                  <shadow type="math_number">'
+'\n                                    <field name="NUM">0</field>'
+'\n                                  </shadow>'
+'\n                                </value>'
+'\n                                <value name="FRAME2">'
+'\n                                  <shadow type="math_number">'
+'\n                                    <field name="NUM">20</field>'
+'\n                                  </shadow>'
+'\n                                </value>'
+'\n                                <next>'
+'\n                                  <block type="card_flip">'
+'\n                                    <data>1</data>'
+'\n                                    <value name="FRAME1">'
+'\n                                      <shadow type="math_number">'
+'\n                                        <field name="NUM">20</field>'
+'\n                                      </shadow>'
+'\n                                    </value>'
+'\n                                  </block>'
+'\n                                </next>'
+'\n                              </block>'
+'\n                            </statement>'
+'\n                          </block>'
+'\n                        </next>'
+'\n                      </block>'
+'\n                    </next>'
+'\n                  </block>'
+'\n                </next>'
+'\n              </block>'
+'\n            </next>'
+'\n          </block>'
+'\n        </next>'
+'\n      </block>'
+'\n    </statement>'
+'\n  </block>'
+'\n  <block type="procedures_defnoreturn" x="12" y="1158">'
+'\n    <field name="NAME">reset</field>'
+"\n    <comment pinned='false' h='80' w='160'>Enlève les cartes et en remet d'autres en place.</comment>"
+'\n    <statement name="STACK">'
+'\n      <block type="text_comment">'
+'\n        <value name="COMMENT">'
+'\n          <shadow type="text">'
+'\n            <field name="TEXT">Élimine les cartes</field>'
+'\n          </shadow>'
+'\n        </value>'
+'\n        <next>'
+'\n          <block type="controls_for">'
+'\n            <field name="VAR" variabletype="">j</field>'
+'\n            <value name="FROM">'
+'\n              <shadow type="math_number">'
+'\n                <field name="NUM">1</field>'
+'\n              </shadow>'
+'\n            </value>'
+'\n            <value name="TO">'
+'\n              <shadow type="math_number">'
+'\n                <field name="NUM">16</field>'
+'\n              </shadow>'
+'\n            </value>'
+'\n            <value name="BY">'
+'\n              <shadow type="math_number">'
+'\n                <field name="NUM">1</field>'
+'\n              </shadow>'
+'\n            </value>'
+'\n            <statement name="DO">'
+'\n              <block type="card_remove_one_card">'
+'\n                <data>1</data>'
+'\n                <value name="FRAME1">'
+'\n                  <shadow type="math_number">'
+'\n                    <field name="NUM">1</field>'
+'\n                  </shadow>'
+'\n                  <block type="variables_get">'
+'\n                    <field name="VAR" variabletype="">j</field>'
+'\n                  </block>'
+'\n                </value>'
+'\n              </block>'
+'\n            </statement>'
+'\n            <next>'
+'\n              <block type="card_remove_one_card">'
+'\n                <data>1</data>'
+'\n                <value name="FRAME1">'
+'\n                  <shadow type="math_number">'
+'\n                    <field name="NUM">20</field>'
+'\n                  </shadow>'
+'\n                </value>'
+'\n                <next>'
+'\n                  <block type="text_comment">'
+'\n                    <value name="COMMENT">'
+'\n                      <shadow type="text">'
+'\n                        <field name="TEXT">Replace les cartes</field>'
+'\n                      </shadow>'
+'\n                    </value>'
+'\n                    <next>'
+'\n                      <block type="controls_for">'
+'\n                        <field name="VAR" variabletype="">j</field>'
+'\n                        <value name="FROM">'
+'\n                          <shadow type="math_number">'
+'\n                            <field name="NUM">1</field>'
+'\n                          </shadow>'
+'\n                        </value>'
+'\n                        <value name="TO">'
+'\n                          <shadow type="math_number">'
+'\n                            <field name="NUM">11</field>'
+'\n                          </shadow>'
+'\n                        </value>'
+'\n                        <value name="BY">'
+'\n                          <shadow type="math_number">'
+'\n                            <field name="NUM">1</field>'
+'\n                          </shadow>'
+'\n                        </value>'
+'\n                        <statement name="DO">'
+'\n                          <block type="card_add_one_card">'
+'\n                            <data>1</data>'
+'\n                            <value name="CARD">'
+'\n                              <shadow type="math_number">'
+'\n                                <field name="NUM">101</field>'
+'\n                              </shadow>'
+'\n                              <block type="math_arithmetic">'
+'\n                                <field name="OP">ADD</field>'
+'\n                                <value name="A">'
+'\n                                  <shadow type="math_number">'
+'\n                                    <field name="NUM">99</field>'
+'\n                                  </shadow>'
+'\n                                </value>'
+'\n                                <value name="B">'
+'\n                                  <shadow type="math_number">'
+'\n                                    <field name="NUM">1</field>'
+'\n                                  </shadow>'
+'\n                                  <block type="variables_get">'
+'\n                                    <field name="VAR" variabletype="">j</field>'
+'\n                                  </block>'
+'\n                                </value>'
+'\n                              </block>'
+'\n                            </value>'
+'\n                            <value name="BACK">'
+'\n                              <shadow type="math_number">'
+'\n                                <field name="NUM">900</field>'
+'\n                              </shadow>'
+'\n                            </value>'
+'\n                            <value name="FRAME2">'
+'\n                              <shadow type="math_number">'
+'\n                                <field name="NUM">1</field>'
+'\n                              </shadow>'
+'\n                              <block type="variables_get">'
+'\n                                <field name="VAR" variabletype="">j</field>'
+'\n                              </block>'
+'\n                            </value>'
+'\n                          </block>'
+'\n                        </statement>'
+'\n                        <next>'
+'\n                          <block type="controls_for">'
+'\n                            <field name="VAR" variabletype="">j</field>'
+'\n                            <value name="FROM">'
+'\n                              <shadow type="math_number">'
+'\n                                <field name="NUM">12</field>'
+'\n                              </shadow>'
+'\n                            </value>'
+'\n                            <value name="TO">'
+'\n                              <shadow type="math_number">'
+'\n                                <field name="NUM">16</field>'
+'\n                              </shadow>'
+'\n                            </value>'
+'\n                            <value name="BY">'
+'\n                              <shadow type="math_number">'
+'\n                                <field name="NUM">1</field>'
+'\n                              </shadow>'
+'\n                            </value>'
+'\n                            <statement name="DO">'
+'\n                              <block type="card_add_one_card">'
+'\n                                <data>1</data>'
+'\n                                <value name="CARD">'
+'\n                                  <shadow type="math_number">'
+'\n                                    <field name="NUM">101</field>'
+'\n                                  </shadow>'
+'\n                                  <block type="math_arithmetic">'
+'\n                                    <field name="OP">ADD</field>'
+'\n                                    <value name="A">'
+'\n                                      <shadow type="math_number">'
+'\n                                        <field name="NUM">289</field>'
+'\n                                      </shadow>'
+'\n                                    </value>'
+'\n                                    <value name="B">'
+'\n                                      <shadow type="math_number">'
+'\n                                        <field name="NUM">1</field>'
+'\n                                      </shadow>'
+'\n                                      <block type="variables_get">'
+'\n                                        <field name="VAR" variabletype="">j</field>'
+'\n                                      </block>'
+'\n                                    </value>'
+'\n                                  </block>'
+'\n                                </value>'
+'\n                                <value name="BACK">'
+'\n                                  <shadow type="math_number">'
+'\n                                    <field name="NUM">900</field>'
+'\n                                  </shadow>'
+'\n                                </value>'
+'\n                                <value name="FRAME2">'
+'\n                                  <shadow type="math_number">'
+'\n                                    <field name="NUM">1</field>'
+'\n                                  </shadow>'
+'\n                                  <block type="variables_get">'
+'\n                                    <field name="VAR" variabletype="">j</field>'
+'\n                                  </block>'
+'\n                                </value>'
+'\n                              </block>'
+'\n                            </statement>'
+'\n                            <next>'
+'\n                              <block type="card_set_card_param">'
+'\n                                <value name="FRAME1">'
+'\n                                  <shadow type="math_number">'
+'\n                                    <field name="NUM">17</field>'
+'\n                                  </shadow>'
+'\n                                </value>'
+'\n                                <value name="PARAM1">'
+'\n                                  <shadow type="text">'
+'\n                                    <field name="TEXT">0</field>'
+'\n                                  </shadow>'
+'\n                                </value>'
+'\n                              </block>'
+'\n                            </next>'
+'\n                          </block>'
+'\n                        </next>'
+'\n                      </block>'
+'\n                    </next>'
+'\n                  </block>'
+'\n                </next>'
+'\n              </block>'
+'\n            </next>'
+'\n          </block>'
+'\n        </next>'
+'\n      </block>'
+'\n    </statement>'
+'\n  </block>'
+'\n</xml>'
+'\n';

var xml = Blockly.Xml.textToDom(strText);
Blockly.Xml.domToWorkspace(xml, gloB.demoWorkspace);
} // confStartBlocksInit

function confParamInit() {
//========================
// Définition de certains paramètres
// c.f. bglibrary_frame_card.js
// c.f. bglibrary_abase.js
gloCanvas.marginRight = 5;  // marge entre la droite du dernier cadre et la droite du canvas
gloCanvas.marginBottom = 5 + 6; // marge entre le bas du dernier cadre et le bas du canvas   + 6 pour le numéro de la case.
gloCanvas.backgroundColor = "rgb(255,255,250)"; // Couleur de fond du canvas

// Augmente la vitesse d'animation.
gloB.nMoveStep = 10;

// Sont défini dans : confCardsInit
//gloCanvas.strSource = "../images/Carte"; // Source des images des cartes, un nombre entre 100 et 999 suivra
//gloCanvas.strExt = ".png"; // Extension des images des cartes. ".png", ".jpg" et ".gif" est habituel.

// function window_config(idWin, nVisible, nPosX, nPosY, nWidth, nHeight)  définit dans : ex2000.js
// idWin est une référence à la fenêtre à modifier.
// nVisible == 1 pour être visible ; == 0 pour être caché ; autre => ne change pas la visibilité 
// Positions et dimensions en pixels.  -9999 => reste inchangé.
// dimension <= 0 => reste inchangé
window_config('idDisplay', 0, -9999, -9999, 0, 0); // Fenêtre d'affichage
window_config('idCodeBlockly', -1, -9999, -9999, 0, 0); // Fenêtre Blockly, tout reste inchangé
window_config('idCodeJavascript', -1, -9999, -9999, 0, 0); // Fenêtre Javascript, tout, reste inchangé
window_config('idCodePython', 0, -9999, -9999, 0, 0); // Fenêtre Python, carchée, reste inchangé
window_config('idCodeLua', 0, -9999, -9999, 0, 0); // Fenêtre Lua, carchée, reste inchangé
window_config('idVariableSpy', 0, -9999, -9999, 0, 0); // Fenêtre des valeurs de variables cachée, carchée, reste inchangé 
window_config('idFrameCards', 1, -9999, -9999, 0, 0); // Fenêtre du jeu de cartes, tout, reste inchangé
} // confParamInit

function confFramesInit() {
//=========================
// Initialisation des cadres
 
// Définition de quelques cadres
// Les unités de position et de tailles sont arbitraires, car
// elles s'adaptent aux dimensions du canvas.
var nXmax = 2;
var nYmax = 9;
var nn = 0;
for (var nY=0; nY<nYmax; nY++) {
  for (var nX=0; nX<nXmax; nX++) {
    nn++;
    glaoFrames[nn].posX = 5 + 96*nX;
    glaoFrames[nn].posY = 5 + (144 + 5)*nY;  // + 5 pour le numéro de la case.
    glaoFrames[nn].deltaX = 86;
    glaoFrames[nn].deltaY = 134;
    glaoFrames[nn].fWithNumber = false;
    }
  }

// Deux cases pour les choix de colonnes
glaoFrames[nn-1].posX  += 22;
glaoFrames[nn-1].deltaX = 43;
glaoFrames[nn-1].deltaY = 67;
glaoFrames[nn-1].fWithNumber = false;

glaoFrames[nn].posX  += 22;
glaoFrames[nn].deltaX = 43;
glaoFrames[nn].deltaY = 67;
glaoFrames[nn].fWithNumber = false;

// Pour y placer une carte avec un texte "Reset".
nn += 1;
glaoFrames[nn].posX = glaoFrames[16].posX + glaoFrames[16].deltaX;
glaoFrames[nn].posY = glaoFrames[16].posY + glaoFrames[16].deltaY + 30;
glaoFrames[nn].deltaX = 70;
glaoFrames[nn].deltaY =  30;
glaoFrames[nn].fWithNumber = false;

// Pour y placer la carte choisie, à la fin
nn += 1; // = 20
glaoFrames[nn].posX = 40;
glaoFrames[nn].posY = 400;
glaoFrames[nn].deltaX = 112;
glaoFrames[nn].deltaY =  174;
glaoFrames[nn].fWithNumber = false;
glaoFrames[nn].color = -1;  // pas de couleur
glaoFrames[nn].background_color = ""; // Couleur de fond.  "" => pas de couleur 
glaoFrames[nn].width  = 0; // Largeur du trait du cadre 
glaoFrames[nn].margin = 0; // marge entre le trait du cadre et la carte qu'il contiendra 

glnFramesMax = nn;

// Le cadre d'indice 0 sert à cacher des cartes ou
// est le point de départ d'apparition de nouvelles cartes.
// Ce cadre est défini dans la fonction myFramesInit() du fichier ex2000.js
} // confFramesInit

function confCardsInit() {
//========================
// Placement de cartes

var nn = 0;
var nCase = 0; // Numéro de la case dans laquelle la carte est placée
var nCardFace = 101; // Référence à l'image de la carte
var nCardBack = 900;
var strInstr = "";

gloCanvas.strSource = "../images/Carte";
gloCanvas.strExt = ".png";

gloCanvas.nbCards = 19; // Nombre de cartes
for (nn=1; nn<=gloCanvas.nbCards; nn++) { // Pour créer des instances de cartes
    nCardFace = 99 + nn;
    nCardBack = 900;
    nCase = nn;
    if (nn > 11) nCardFace = 289 + nn;
    if (nn == 17) {nCardFace = 900; nCardBack = 500;}
    if (nn == 18) {nCardFace = 910; nCardBack = 501; }
    if (nn == 19) {nCardFace = 920; } // Carte blanche.
    
    strInstr += " <img src='" + gloCanvas.strSource + nCardFace + gloCanvas.strExt + "' alt='" + nCardFace + "' width=80 height=128"
             +  "\n id='idPos" + (100 + nn) + "'" // Les id vont de 100 à (100 + gloCanvas.nbCards)
             +  "\n data-frame='" + (nn) + "'" // Indique la case dans laquelle la carte se trouve
             +  "\n data-depth='1'" // Indique la position de la carte dans un tas
             +  "\n data-face-src='" + gloCanvas.strSource + "'" // Indique la source du nom du fichier image de la face
             +  "\n data-face-ext='" + gloCanvas.strExt + "'"  // Indique le nom de l'extension du fichier image de la face
             +  "\n data-face='" + nCardFace + "'" // Indique la face visible de la carte
             +  "\n data-back-src='" + gloCanvas.strSource + "'" // Indique la source du nom du fichier image du dos
             +  "\n data-back-ext='" + gloCanvas.strExt + "'"  // Indique le nom de l'extension du fichier image du dos
             +  "\n data-back='" + nCardBack + "'"            // Indique le dos de la carte
             +  "\n title='" + nCardFace + "'" // Si on va sur la carte, indique le numéro correspondant à ce que l'on voit.
             +  "\n onclick='CallBlocklyFunc(\"idPos" + (100 + nn) + "\");'" // pour appeler une fonction définie dans Blockly lorsqu'on clique sur la carte.
             +  "\n data-click-count='0'" // Compte le nombre de clicks sur la carte.
             +  "\n data-func=''" // Nom de la fonction Blocly à appeler, vide s'il y en a aucune.
             +  "\n data-param1=' '" // Un paramètre optionnelle lors de l'appelle à la fonction Blockly
             +  "\n style='position:absolute; left:" + 70*nn + "px; top:190px;  z-index:" + 500 + ";'>\n";
    glaoFrames[nn].nNbCards = 1; // Certains cadres ont des cartes, c.f. "data-frame"
    } // for

document.getElementById('idCards').innerHTML = strInstr;

// Écriture de texte par dessus la dernière carte, celle qui est blanche
CardTextWrite(0, 192, 1238, "Reset");

// Pour compter le nombre de fois que l'on a indiqué la carte choisie
// On stock ce nombre dans le paramètre associé à la carte de la case 9.
// 17 = la case, 1 = la profondeur = dessus, 'data-param1' est le nom du paramètre et '0' la valeur qu'on lui donne.
CardSetParam(17, 1, 'data-param1', '0');
} // confCardsInit

function confMessageBegin() {
//==========================
// Permet d'afficher un message au départ,
// que l'on peut revoir en cliquant sur le point d'interrogation
// Si on en veut aucun, on peut laisser cette fonction vide, 
// ou ne pas l'appeler ci-dessous.

// &nbsp;  insert un espace
// <br>    insert un retour à la ligne 
// <b> .. </b>  pour mettre du texte en gras
// toutes les balises HTML sont acceptée, y compris les styles CSS.

// Consultez le code source du fichier "ex2000.html" pour d'autres "id" 
// permettant de faire d'autres modifications depuis ici.

// Change le contenu de la fenêtre "A'de..."
document.getElementById('HTML_MAIN_TITLE2').innerHTML = ""
+ "&nbsp; Après avoir exécuté le programme, rien ne se passe, c'est normal. &nbsp;<br>"
+ "&nbsp; Cela associe une fonction à un clique sur la carte bleue et la carte rouge. &nbsp;<br>"
+ "<br>"  // <br> est une balise pour sauter une ligne.  Toutes la synthaxe HTML est disponible. 
+ "&nbsp; Choisissez une des huit cartes et mémorisez-la.<br>"
+ "&nbsp; Après avoir exécuté quatre fois de suite l'instruction suivante, &nbsp;<br>"
+ "&nbsp; votre carte se trouvera en haut à gauche :<br>"
+ "° <b>Cliquez sur la carte bleue ou rouge de la colonne de votre carte.</b><br>"
+ "<br>"  // <br> est une balise pour sauter une ligne.  Toutes la synthaxe HTML est disponible. 
+ "&nbsp; Saurez-vous touvez le lien avec la numérotation binaire ?"
;

// Changement du titre du message
document.getElementById('HTML_MESSAGE').innerHTML =
  "&nbsp; Un petit tour de magie. &nbsp;"
;

// Change le contenu de la fenêtre "À propos..."
document.getElementById('HTML_ABOUT2').innerHTML =
  "&nbsp; Configuration créée par Bernard Gisin &nbsp;<br>"
+ "&nbsp; le 3 janvier 2020."
+ "<br><br>"
;

// Changement du titre de la boîte de dialogue "À propos de..."
document.getElementById('HTML_ABOUT1').innerHTML =
  "&nbsp; À propos de cette configuration. &nbsp;"
;

DialogHelp(true);
} // confMessageBegin

//##########################################################################

// Exécution des fonctions d'initialisations.
ConfigInitClear(); // Pour préparer une nouvelle configuration
confToolBoxInit();
confStartBlocksInit();
confParamInit();
confFramesInit();
confCardsInit();

// Pour placer les cartes correctement dans les cadres.
myFrameCardsResize(null);

// Boîte de dialogue initiale, expliquant ce qu'il faut faire.
// Elle revient si on clique sur le point d'interrogation.
confMessageBegin();

