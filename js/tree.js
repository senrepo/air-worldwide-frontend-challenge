var treeComponent = function ($ctrl) {
    var $body = $ctrl.find(".modal-body");

    var getFiles = function () {
        return fileArray;
    }

    var buildFileObject = function (files) {
        var fileObject = {};

        for (var i = 0, ilen = files.length; i < ilen; i++) {
            var file = files[i];
            var parts = file.split("/");

            for (var j = 0, jlen = parts.length; j < jlen; j++) {
                var part = parts[j];
                var parent = parts[j-1] ? parts[j-1] : "";
                var level = (j + 1).toString();
                if (!fileObject[level]) fileObject[(j + 1).toString()] = {};
                if(part) fileObject[level][part] = { "type" : (j === (jlen - 1)) ? "file" : "dir", "parent" : parent };

            }
        }
        return fileObject;
    }

    var buildTable = function () {
        var files = getFiles();
        var fileObject = buildFileObject(files);

        var columCount = Object.keys(fileObject).length;

        
    

        console.log(JSON.stringify(fileObject));

    }

    var render = function () {
        buildTable();
        $body.html("hello");
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