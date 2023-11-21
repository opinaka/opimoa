# BlocklySQL - a block-based editor for SQL
This is a block-based editor for SQL (on the basis of Google's blockly (https://github.com/google/blockly)).

![BlocklySQL example snippet](example.JPG)

This first example uses the database `weather` (by the project dbup2date) and returns the locations where more than five gale-force winds have been recorded. It equals the following SELECT-statement in SQL:

```
SELECT Wetterstation.Standort, Wettermessung.Max_Windgeschwindigkeit AS #Orkanböen
FROM Wetterstation
JOIN Wettermessung ON Wetterstation.S_ID = Wettermessung.Standort_ID
WHERE Wettermessung.Max_Windgeschwindigkeit > 32.7
GROUP BY Wetterstation.Standort
HAVING COUNT Wettermessung.Max_Windgeschwindigkeit > 5
ORDER BY Wettermessung.Max_Windgeschwindigkeit DESC;
```

## Elements

We have created several blocks to build queries with our editor. So far the following blocks have been created:

| BlocklySQL | Explanation |
| :-: | :-: |
| ![Statements and clauses](images/statements_clauses.JPG) | `Statements and clauses` |
| ![Tables and attributes]() | `Tables and attributes` |
| ![(Logical) operators]() | `(Logical) operators ` |
| ![(Mathematical) operators]() | `(Mathematical) operators ` |
| ![Value inputs]() | `Value inputs ` |
| ![Aggregate functions]() | `Aggregate functions ` |

## Demo & Example projects

### Classicmodels (MySQL tutorial)

This sample database is from: http://www.mysqltutorial.org/mysql-sample-database.aspx. The `classicmodels` database is a retailer of scale models of classic cars database. It contains typical business data such as customers, products, sales orders, sales order line items, etc.

A demo of our editor using this database can be found here: https://go.uniwue.de/blocklysql.

### Weather and Football (Project "dbup2date")

In another example project we integrated our editor into the project "dbup2date" (https://dbup2date.uni-bayreuth.de/blocklysql/index.html) by the University of Bayreuth, Germany. This project provides daily updated databases (`football`, `weather`) to use in the classroom.

## Installing

You are welcome to use our editor. You can either integrate it into your online project or run it on your local machine using the software suite XAMPP (https://www.apachefriends.org/de/index.html).

## Contributing

In case you want to extend or adapt our editor go ahead and fork this repository.

### Adding new blocks

New blocks can be added by creating `new_block.js` in the folder `sql/js/sql_blocks`. Additionally, for the new block to appear in the toolbox you have to import the file (using `<script></script>`) and add it to the toolbox in `index.html`.

The code of a block for our editor looks similiar to the code of the `datepicker` block (in value inputs):

Block definition (either in JavaScript or JSON):

```
Blockly.Blocks['datepicker'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Year:")
            .appendField(new Blockly.FieldNumber(2018), "date_year");
        this.appendDummyInput()
            .appendField("Month:")
            .appendField(new Blockly.FieldNumber(0, 1, 12), "date_month");
        this.appendDummyInput()
            .appendField("Day:")
            .appendField(new Blockly.FieldNumber(0, 1, 31), "date_day");
        this.appendDummyInput()
            .appendField("Hour:")
            .appendField(new Blockly.FieldNumber(0, 0, 23), "date_time");
        this.setInputsInline(true);
        this.setOutput(true, "DatePicker");
        this.setColour('#FC4758');
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
```

Block function:

```
Blockly.JavaScript['datepicker'] = function(block) {
    var year = parseFloat(block.getFieldValue('date_year'));
    var month = parseFloat(block.getFieldValue('date_month'));
    var day = parseFloat(block.getFieldValue('date_day'));
    var time = parseFloat(block.getFieldValue('date_time'));
    if(month < 10){
        month = '0' + month;
    }
    if(day < 10){
        day = '0' + day;
    }
    if(time < 10){
        time = '0' + time;
    }
    time = time + '00';
    var code = '\u0022' + year + month + day + time + '\u0022';
    return code;
};
```
