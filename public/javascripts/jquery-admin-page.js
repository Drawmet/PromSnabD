$(document).ready(function () {
    $.getJSON("get-data", function (data) {
        var items = [];
        items.push('<thead><><tr><th>id</th><th>Title</th><th>Description</th><th>Category</th>' +
            '<th>Subcategory</th><th>Price</th><th>Image</th><th>Show</th><th>Meta</th></tr></thead>');
        $.each(data, function (key, val) {
            items.push('<tr class="db-item" id="' + key + '"><td class="item-key">' +
                val._id + '</td><td class="item-title">' + val.title + '</td><td class="item-description">'
                + val.description + '</td><td class="item-category">' + val.category +
                '</td><td class="item-subcategory">' + val.subcategory + '</td><td class="item-price">'
                + val.price + '</td><td class="item-img">' + val.img + '</td><td class="item-show">'
                + val.show + '</td><td class="item-meta">' + val.meta + '</td></tr>');
        });

        $('<table/>', {
            'id': 'find-table',
            'class': 'table get-data-table',
            html: items.join('')
        }).appendTo('#get-data');
    });

    $("#insert").click(function () {
        $("#func-menu").prop("action", "/insert-data");
        $("#_id").prop("disabled",true);
        document.getElementById('_id').value = "";
    });

    $("#update").click(function () {
        $("#func-menu").prop("action", "/update-data");
        $("#_id").prop("disabled",false);
    });

    $("#delete").click(function () {
        $("#func-menu").prop("action", "/delete-data");
        $("#_id").prop("disabled",false);
    });

    $("#func-find").click(function () {
        var req;
        switch ($(this).val()){
            case "find":
                req = "get-data";
                break;
            case "find-by-title":
                req = "/findByTitle?title=" + $(".find").val();
                break;
            case "find-by-category":
                req = "/findByCategory?category=" + $(".find").val();
                break;
        }
        $.getJSON(req, function (data) {
            console.log(data);
            var items = [];
            items.push('<thead><tr><th>id</th><th>Title</th><th>Description</th><th>Category</th>' +
                '<th>Subcategory</th><th>Price</th><th>Image</th><th>Show</th><th>Meta</th></tr></thead>');
            $.each(data, function (key, val) {
                items.push('<tr class="db-item" id="' + key + '"><td class="item-key">' + val._id +
                    '</td><td class="item-title">' + val.title + '</td><td class="item-description">'
                    + val.description + '</td><td class="item-category">' + val.category +
                    '</td><td class="item-subcategory">' + val.subcategory + '</td><td class="item-price">'
                    + val.price + '</td><td class="item-img">' + val.img + '</td><td class="item-show">'
                    + val.show + '</td><td class="item-meta">' + val.meta + '</td></tr>');
            });
            $('#find-table').remove();
            $('<table/>', {
                'id' : 'find-table',
                'class': 'table get-data-table',
                html: items.join('')
            }).appendTo('#get-data');
        });
    });

    $("#categoryUpdate").click(function () {
        $("#update-category").prop("action", "/update-category");
    });

    $("#subcategoryUpdate").click(function () {
        $("#update-category").prop("action","/update-subcategory");
    });

    $("#_id").on("input", function () {
        $.getJSON("auto-correct?id=" + $("#_id").val(),function (data) {
            document.getElementById('title').value  = data.title;
            document.getElementById('description').value = data.description;
            document.getElementById('category').value  = data.category;
            document.getElementById('subcategory').value  = data.subcategory;
            document.getElementById('price').value  = data.price;
            document.getElementById('img').value  = data.img;
            document.getElementById('show').value  = data.show;
            document.getElementById('meta').value  = data.meta;
        });
    })
});