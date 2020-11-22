(function($) {

    $("div#uploadImg").dropzone({ url: "/file/post" });
    // var data = $('div#uploadImg')[0].dropzone.getAcceptedFiles()[0];
    // $.ajax({
    //     url: "location.url",
    //     data: data
    // }).done(function() {});

    loadGiamGia();
    loadDanhMuc();

    var hash = window.location.hash;
    if (hash != "") {
        var idSanPham = hash.slice(1);
        $.ajax({
            type: "GET",
            enctype: 'multipart/form-data',
            url: "http://localhost:8080/sanPham/getSanPhamByID/" + idSanPham,
            async: false,
            crossDomain: true,
            contentType: false,
            success: function(result) {
                // result.giaGoc = formatNumberSimple(result.giaGoc);
                // result.gia = formatNumberSimple(result.gia);
                setDataInForm('.form-item', result);
            },
            error: function(e) {
                console.log("ERROR : ", e);

            }
        });
    }

    $("#luuSanPham").click(function(e) {
        // var account = JSON.parse(localStorage.getItem("account"));
        var data = convertJson('.form-item');
        if (data != null && $('.form-item')[0].checkValidity() && $("#idDanhMucSP").val() != "0") {
            if ($("#idSanPham").val() == null || $("#idSanPham").val() == "") {
                // data.nguoiTao = account.idNguoiDung;
                create(data);
            } else {
                update(data);
            }
        } else {
            alert("Vui lòng kiểm tra lại thông tin còn thiếu!");
            return;
        }
    });

})(jQuery);

function create(data) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/sanPham/create",
        data: data,
        async: false,
        crossDomain: true,
        success: function(result) {
            $("#idSanPham").val(result.idSanPham)
            alert("Thêm sản phẩm thành công!");
        },
        error: function(e) {
            alert("Thêm sản phẩm không thành công!");
            console.log("ERROR : ", e);

        }
    });
}

function update(data) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/sanPham/update",
        data: data,
        async: false,
        crossDomain: true,
        success: function(result) {
            alert("Sửa sản phẩm thành công!");
        },
        error: function(e) {
            alert("Sửa sản phẩm không thành công!");
            console.log("ERROR : ", e);

        }
    });
}


function loadGiamGia() {
    $.ajax({
        type: "GET",
        enctype: 'multipart/form-data',
        url: "http://localhost:8080/giamGia/getGiamGiaHoatDong",
        async: false,
        crossDomain: true,
        contentType: false,
        success: function(result) {
            $.each(result, function(index, item) {
                $("#idGiamGia").append(`<option value="${item.idGiamGia}">Giảm ${item.phanTramGiam}%</option>`);
            });
        },
        error: function(e) {
            console.log("ERROR : ", e);

        }
    });
}

function loadDanhMuc() {
    $.ajax({
        type: "GET",
        enctype: 'multipart/form-data',
        url: "http://localhost:8080/danhMucSP/listDanhMucSanPham",
        async: false,
        crossDomain: true,
        contentType: false,
        success: function(result) {
            $.each(result, function(index, item) {
                $("#idDanhMucSP").append(`<option value="${item.idDanhMucSP}">${item.tenDanhMuc}</option>`);
            });
        },
        error: function(e) {
            console.log("ERROR : ", e);

        }
    });
}