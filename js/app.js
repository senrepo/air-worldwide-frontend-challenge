$(document).ready(function () {
    var doc = window.document,
        currentFile;

    var $uploadPage = $(doc.getElementById('uploadPage')),
        $historyPage = $(doc.getElementById('historyPage')),
        $uploadContainer = $(doc.getElementById('uploadContainer')),
        $historyContainer = $(doc.getElementById('historyContainer')),
        $historyTable = $(doc.getElementById('historyTable')),
        $clearButton = $(doc.getElementById('clearHistoryButton')),
        $browseButton = $(doc.getElementById('browseButton')),
        $uploadButton = $(doc.getElementById('uploadButton')),
        $fileModal = $(doc.getElementById('fileModal')),
        $fileInput = $(doc.getElementById('fileInput')),
        $progressbar = $(doc.getElementById('progressbar')),
        $bar = $progressbar.find(".progress-bar"),
        $uploadLabel = $(doc.getElementById("uploadLabel")),
        $alertMessage = $(doc.getElementById('alertMessage')),
        treeComp = new treeComponent($fileModal),
        historyComp = new historyComponant($historyTable),
        history = [];


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
        historyComp.show(history);
        toggleMenu("history");
    });

    $clearButton.click(function (e) {
        e.preventDefault();
        history = [];
        historyComp.clear();
        $uploadLabel.hide();
    });

    $browseButton.click(function (e) {
        e.preventDefault();
        treeComp.show();
    });

    var showProgress = function (i) {
        var val = i * 20;
        $bar.css('width', val + '%').attr('aria-valuenow', val);
    };

    $uploadButton.click(function (e) {
        e.preventDefault();

        var file = $fileInput.val();
        if (!file) {
            $alertMessage.show();
            return;
        }

        $uploadLabel.hide();
        for (var i = 1; i <= 5; i++) {
            setTimeout(showProgress.bind(null, i), 1000);
        }

        $progressbar.show();

        setTimeout(function() {
            $progressbar.hide();
            $bar.css('width', '0%').attr('aria-valuenow', 0);
            $uploadLabel.show();
        }, 5000);

        history.push($fileInput.val());
    });

    $fileModal.on("click", ".btn-primary", function (e) {
        e.preventDefault();
        $alertMessage.hide();
        $fileInput.val(currentFile);
        $uploadLabel.hide();
        treeComp.ok();
    });

    $fileModal.on("click", ".file", function (e) {
        e.preventDefault();
        var $ctrl = $(e.target);

        //TODO: externalize the styles to css file
        $fileModal.find(".selected").css("background-color", "white");
        $ctrl.addClass("selected");
        $ctrl.css("background-color", "lightblue")

        var $row = $ctrl.closest("tr");
        var level = $row.attr("data-level");
        var filePath = $ctrl.text();

        $row = $row.prev("tr");
        while (level > 0) {
            var path = $row.find(".dir").text().replace("- ", "");
            filePath = path ? path + "/" + filePath : filePath;
            level = $row.attr("data-level");
            $row = $row.prev("tr");
            var plevel = $row.attr("data-level");
            while (plevel >= level) {
                $row = $row.prev("tr");
                plevel = $row.attr("data-level");
            }

        }
        currentFile = filePath;
    });

    var init = function () {
        $progressbar.hide();
        toggleMenu("upload");
        $fileInput.prop('disabled', true);
        $alertMessage.hide();
        $uploadLabel.hide();
    }

    init();

});