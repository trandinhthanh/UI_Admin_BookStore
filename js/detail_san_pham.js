(function($) {

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
                let listImg = [];

                $.each(result.danhSachLinkHinh, function(index, item) {
                    listImg.push({ id: index + 1, src: `http://localhost:8080/file/img/${item}` });
                });

                $('.input-images').imageUploader({
                    preloaded: listImg,
                    imagesInputName: 'photos',
                    preloadedInputName: 'old',
                    maxSize: 2 * 1024 * 1024,
                    maxFiles: 10
                });
            },
            error: function(e) {
                console.log("ERROR : ", e);

            }
        });
    } else {
        $('.input-images').imageUploader();
    }

    $("#luuSanPham").click(function(e) {
        var account = JSON.parse(localStorage.getItem("account"));
        var data = getDataForm('.form-item');
        if (data != null && $('.form-item')[0].checkValidity() && $("#idDanhMucSP").val() != "0") {
            if ($("#idSanPham").val() == null || $("#idSanPham").val() == "") {
                data.nguoiTao = account.idNguoiDung;
                create(JSON.stringify(data));
            } else {
                data.nguoiThayDoi = account.idNguoiDung;
                update(JSON.stringify(data));
            }
        } else {
            alert("Vui lòng kiểm tra lại thông tin sai hoặc còn thiếu!");
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
            uploadImg("insert", result.idSanPham);
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
            uploadImg("update", result.idSanPham);
        },
        error: function(e) {
            alert("Sửa sản phẩm không thành công!");
            console.log("ERROR : ", e);

        }
    });
}

function uploadImg(type, idSanPham) {
    // lấy img từ tag input
    let $inputImages = $('.form-item').find('input[name^="images"]');
    if (!$inputImages.length) {
        $inputImages = $('.form-item').find('input[name^="photos"]')
    }

    var formData = new FormData();
    formData.append("idSanPham", idSanPham);

    for (let index = 0; index < $inputImages[0].files.length; index++) {
        formData.append("files", $inputImages[0].files[index]);
    }


    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:8080/file/img/upload", false);
    request.onreadystatechange = function() {
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
            if (type == "insert") {
                alert("Thêm sản phẩm thành công!");
            } else {
                alert("Cập nhật sản phẩm thành công!");
            }
        } else {
            alert("Thêm ảnh sản phẩm không thành công!");
            location.reload();
        }
    };
    request.send(formData);
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