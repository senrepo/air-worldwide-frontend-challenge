var treeComponent = function ($ctrl) {
    var $body = $ctrl.find(".modal-body");

    var getFiles = function () {
        return fileArray;
    }

    var buildRowText = function (files) {
        var rows = [];

        for (var i = 0, ilen = files.length; i < ilen; i++) {
            var file = files[i];
            var parts = file.split("/");

            for (var j = 0, jlen = rows.length; j < jlen; j++) {
                var rowParts = rows[j];

                for (var k = 0; k < rowParts.length; k++) {
                    if (rowParts[k] === parts[k]) parts[k] = "";
                }
            }
            rows.push(parts);
        }
        return rows;
    }

    var buildRow = function (data, colCount) {
        var row = "<tr>";
        for (var i = 0; i < colCount; i++) {
            row += "<td>";
            if(data[i]) row += data[i];
            row += "</td>";
        }
        row += "</tr>";
        return row;
    }

    var buildTable = function (rows, cols) {
        var table = "<table>"
        for (var row in rows) {
            var row = buildRow(rows[row], cols);
            table += row;
        }
        table += "</table>";
        return table;
    }

    var render = function () {
        var files = getFiles();
        var rowsArr = buildRowText(files);
        var totalCols = 0;
        for (var rowArr in rowsArr) totalCols = rowsArr[rowArr].length > totalCols ? rowsArr[rowArr].length : totalCols;
        var table = buildTable(rowsArr,totalCols);
        $body.html(table);
    };

    var show = function () {
        render();
        $ctrl.modal('show')
    }

    return {
        show: show
    };
};

//var tree = new treeComponent()