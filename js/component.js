//TODO: use the namespace if needed
var treeComponent = function ($ctrl) {
    var $body = $ctrl.find(".modal-body");

    var getFiles = function () {
        return fileArray;
    };

    var buildRowsArray = function (files) {
        var rows = [], file, parts, rowParts;

        for (var i = 0, ilen = files.length; i < ilen; i++) {
            file = files[i];
            parts = file.split("/");

            for (var j = 0, jlen = rows.length; j < jlen; j++) {
                rowParts = rows[j];

                for (var k = 0; k < rowParts.length; k++) {
                    if (rowParts[k] === parts[k]) parts[k] = "";
                }
            }
            rows.push(parts);
        }
        return rows;
    };

    var buildRowHtml = function (data, type, colIndex, colCount) {
        var row = "<tr data-level=" + colIndex + ">";
        data = ((type === "dir") ? "- " : "") + data;
        for (var i = 0; i < colCount; i++) {
            if (i === colIndex) {
                row += "<td class=" + type + ">";
                row += data;
            } else row += "<td>";
            row += "</td>";
        }
        row += "</tr>";
        return row;
    };

    var buildRowsHtml = function (data, colCount) {
        var rows = [], type, row;
        for (var i = 0; i < data.length; i++) {
            if (data[i]) {
                type = (i === (data.length - 1)) ? "file" : "dir";
                row = buildRowHtml(data[i], type, i, colCount);
                rows.push(row);
            }
        }
        return rows.join("");
    };

    var buildTable = function (rows, cols) {
        var table = "<table>", rowsText;
        for (var row in rows) {
            rowsText = buildRowsHtml(rows[row], cols);
            table += rowsText;
        }
        table += "</table>";
        return table;
    };

    var render = function () {
        var files = getFiles(),
            rowsArray = buildRowsArray(files),
            totalCols = 0,
            table;

        for (var rowArr in rowsArray) totalCols = rowsArray[rowArr].length > totalCols ? rowsArray[rowArr].length : totalCols;
        table = buildTable(rowsArray, totalCols);
        $body.html(table);
    };

    var show = function () {
        render();
        $ctrl.modal('show')
    };

    var ok = function () {
        $ctrl.modal('hide');
    };

    return {
        show: show,
        ok: ok
    };
};

var historyComponant = function ($ctrl) {
    var history;

    var buildTable = function () {
        var table = "<table>";
        for (var i = 0; i < history.length; i++) {
            table += "<tr> <td>" + history[i] + "</td> </tr>";
        }
        table += "</table>";
        return table;

    };

    var render = function () {
        var table = buildTable();
        $ctrl.html(table);
    };


    var show = function (arr) {
        history = arr;
        render();
    }

    var clear = function () {
        $ctrl.html("");
    }

    return {
        show: show,
        clear: clear
    };
};
