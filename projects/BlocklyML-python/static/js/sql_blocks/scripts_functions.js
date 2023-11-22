function showCode () {
        Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
        var code = Blockly.JavaScript.workspaceToCode(workspace);
        if(code.includes('SELECT') && !code.includes('Dieser Code enthält ggf. schädliche Schlüsselwörter!')){
            if(code.includes(';SELECT')){
                code = code.substring(0, code.length-1)
                code = code.replace(/;SELECT/g, '<BR>UNION <BR>SELECT');
                code = code.concat(';');
            }
            if(code.includes(';FROM')){
                code = code.replace(/;FROM/g, '<BR> FROM');
                code = code.concat(';');
            }
            if(code.includes(';WHERE')){
                code = code.replace(/;WHERE/g, '<BR> WHERE');
                code = code.concat(';');
            }
            if(code.includes(';GROUP BY')){
                code = code.replace(/;GROUP BY/g, '<BR> GROUP BY');
                code = code.concat(';');
            }
            if(code.includes(';HAVING')){
                code = code.replace(/;HAVING/g, '<BR> HAVING');
                code = code.concat(';');
            }
            if(code.includes(';ORDER BY')){
                code = code.replace(/;ORDER BY/g, '<BR> ORDER BY');
                code = code.concat(';');
            }
            if(code.includes(';LIMIT')){
                code = code.replace(/;LIMIT/g, '<BR> LIMIT');
                code = code.concat(';');
            }
            var cutFirstPart = code.substring(code.search('SELECT'));
            code = cutFirstPart.substring(0, cutFirstPart.search('\u003B') + 1);
            code = code.replace(/   /g, ' ');

        }
        return code;
};

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] == obj) {
            return true;
        }
    }
    return false;
};

function columns(tabNStr, dbName){
    var arr = [];
    arr.push([' *','\u002A']);
    var lauf = [];
    $.ajax({
        //url: "../php/connect.php",
        url: "connect.php",
        type: 'POST',
        data: {
            func: tabNStr,
            dbname: dbName,
        },
        datatype: 'JSON',
        traditional: true,
        async: false,
        success: function(json){
            lauf = json;
        }
    });

    var checkEnd = 0;
    var str = '';
    for(var i = 0; i < lauf.length; i++){
        if(lauf[i] != '\u005D' && lauf[i] != '\u005B' && lauf[i] != '\u002C'){
            str = str.concat(lauf[i]);
            str = str.replace("\u0022" + "\u0022", '.');
        }
    }
    str = str.replace("\u0022", '.');
    str = str.replace("\u0022", '.');
    var subStr = '';
    var checkBegin = 0;
    for(var i = 0; i < str.length; i++){
        if(str.substring(i,i+1) == '.' && checkBegin == 0){
            i++;
            checkBegin += 1;
            subStr = subStr.concat(str.substring(i,i+1));
        }
        else if(str.substring(i,i+1) != '.' && checkBegin == 1){
            subStr = subStr.concat(str.substring(i,i+1));
        }
        else if(str.substring(i,i+1) == '.' && checkBegin == 1){
            var arrges = [];
            arrges.push(subStr);
            arr.push(arrges);
            subStr = '';
            checkBegin == 0;
        }
    }
    return arr;
}
function doesMatch(tableName, columnName){
    if(contains(columns(tableName, document.getElementById('database').innerHTML), columnName) && columnName != 'all'){
        return true;
    }
    return false;
}
function fillColumns(tabNStr, dbName){
    if(dbName != 'Wähle eine Datenbank aus'){
        var arr = [];
        arr.push([' *','all']);
        var lauf = []
        $.ajax({
            //url: "../php/connect.php",
            url: "connect.php",
            data: {
                func: tabNStr,
                dbname: dbName,
            },
            type: 'POST',
            datatype: 'JSON',
            traditional: true,
            async: false,
            success: function(json){
                lauf = json;
            }
        });

        var checkEnd = 0;
        var str = '';
        for(var i = 0; i < lauf.length; i++){
            if(lauf[i] != '\u005D' && lauf[i] != '\u005B' && lauf[i] != '\u002C'){
                str = str.concat(lauf[i]);
                str = str.replace("\u0022" + "\u0022", '.');
            }
        }
        str = str.replace("\u0022", '.');
        str = str.replace("\u0022", '.');
        var subStr = '';
        var checkBegin = 0;
        for(var i = 0; i < str.length; i++){
            if(str.substring(i,i+1) == '.' && checkBegin == 0){
                i++;
                checkBegin += 1;
                subStr = subStr.concat(str.substring(i,i+1));
            }
            else if(str.substring(i,i+1) != '.' && checkBegin == 1){
                subStr = subStr.concat(str.substring(i,i+1));
            }
            else if(str.substring(i,i+1) == '.' && checkBegin == 1){
                var arrges = [];
                arrges.push(subStr);
                arrges.push(subStr);
                arr.push(arrges);
                subStr = '';
                checkBegin == 0;
            }
        }
        return arr;
    }
    else{
        return [['keine Datenbank','']];
    }
}
function fillTables(dbName, selected){
    if(dbName != 'Wähle eine Datenbank aus'){
        var arr = [];
        var lauf = [];
        $.ajax({
            //url: "../php/connect.php",
            url: "connect.php",
            data: {
                func: 'tables',
                dbname: dbName,
            },
            type: 'POST',
            datatype: 'JSON',
            traditional: true,
            async: false,
            success: function(json){
                lauf = json;
            }
        });

        var checkEnd = 0;
        var str = '';
        for(var i = 0; i < lauf.length; i++){
            if(lauf[i] != '\u005D' && lauf[i] != '\u005B' && lauf[i] != '\u002C'){
                str = str.concat(lauf[i]);
                str = str.replace("\u0022" + "\u0022", '.');
            }
        }
        str = str.replace("\u0022", '.');
        str = str.replace("\u0022", '.');

        var subStr = '';
        var checkBegin = 0;
        for(var i = 0; i < str.length; i++){
            if(str.substring(i,i+1) == '.' && checkBegin == 0){
                i++;
                checkBegin += 1;
                subStr = subStr.concat(str.substring(i,i+1));
            }
            else if(str.substring(i,i+1) != '.' && checkBegin == 1){
                subStr = subStr.concat(str.substring(i,i+1));
            }
            else if(str.substring(i,i+1) == '.' && checkBegin == 1){
                var arrges = [];
                arrges.push(subStr);
                arrges.push(subStr);
                arr.push(arrges);
                subStr = '';
                checkBegin == 0;
            }
        }
        var returnArr = [];
        if(selected === undefined){}
        else{
            var helper = [];
            helper.push(selected);
            helper.push(selected);
            returnArr.push(helper);
        }
        if(returnArr[0] === undefined || returnArr[0] == []){
            returnArr = arr;
        }
        for(var i = 0; i < arr.length; i++){
            if(selected === undefined){}
            else if (arr[i] == (selected+','+selected)){}
            else{
                returnArr.push(arr[i]);
            }
        }
        if(selected === undefined){
            return arr;
        }
        else{
            return returnArr;
        }
    }
    else{
        return [['keine Datenbank','']];
    }

}

function tables(dbName){
    var arr = [];
    var lauf = [];
    $.ajax({
        //url: "../php/connect.php",
        url: "connect.php",
        data: {
            func: 'tables',
            dbname: dbName,
        },
        type: 'POST',
        datatype: 'JSON',
        traditional: true,
        async: false,
        success: function(json){
            lauf = json;
        }
    });

    var checkEnd = 0;
    var str = '';
    for(var i = 0; i < lauf.length; i++){
        if(lauf[i] != '\u005D' && lauf[i] != '\u005B' && lauf[i] != '\u002C'){
            str = str.concat(lauf[i]);
            str = str.replace("\u0022" + "\u0022", '.');
        }
    }
    str = str.replace("\u0022", '.');
    str = str.replace("\u0022", '.');
    var subStr = '';
    var checkBegin = 0;
    for(var i = 0; i < str.length; i++){
        if(str.substring(i,i+1) == '.' && checkBegin == 0){
            i++;
            checkBegin += 1;
            subStr = subStr.concat(str.substring(i,i+1));
        }
        else if(str.substring(i,i+1) != '.' && checkBegin == 1){
            subStr = subStr.concat(str.substring(i,i+1));
        }
        else if(str.substring(i,i+1) == '.' && checkBegin == 1){
            var arrges = [];
            arrges.push(subStr);
            arr.push(arrges);
            subStr = '';
            checkBegin == 0;
        }
    }
    return arr;
};
