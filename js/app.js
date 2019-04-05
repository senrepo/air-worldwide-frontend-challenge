$(document).ready(function () {
    var doc = window.document;

    var $uploadPage = $(doc.getElementById('uploadPage')),
        $historyPage = $(doc.getElementById('historyPage')),
        $uploadContainer = $(doc.getElementById('uploadContainer')),
        $historyContainer = $(doc.getElementById('historyContainer')),
        $browseButton = $(doc.getElementById('browseButton')),
        $uploadButton = $(doc.getElementById('uploadButton')),
        $fileModal =  $(doc.getElementById('fileModal'));


    var toggleMenu = function (menu) {
        switch (menu) {
            case "upload":
                $uploadPage.addClass("active");
                $historyPage.removeClass("active");
                $uploadContainer.show();
                $historyContainer.hide();
                break;
            case "history":
                $uploadPage.removeClass("active");
                $historyPage.addClass("active");
                $uploadContainer.hide();
                $historyContainer.show();                
                break;
        }
    }

    $uploadPage.click(function (e) {
        e.preventDefault();
        toggleMenu("upload");

    });

    $historyPage.click(function (e) {
        e.preventDefault();
        toggleMenu("history");
    });

    $browseButton.click(function (e) {
        e.preventDefault();
        var tree = new treeComponent($fileModal);
        tree.show();

    });


    toggleMenu("upload");
});