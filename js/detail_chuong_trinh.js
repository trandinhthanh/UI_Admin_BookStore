(function($) {

    var hash = window.location.hash;
    if (hash != "") {
        var idGiamGia = hash.slice(1);
        $.ajax({
            type: "GET",
            enctype: 'multipart/form-data',
            url: "http://localhost:8080/giamGia/getGiamGiaById/" + idGiamGia,
            async: false,
            crossDomain: true,
            contentType: false,
            success: function(result) {
                if (result.trangThai == "Đang hoạt động") {
                    $("#trangThai").addClass("status--process");
                } else {
                    $("#trangThai").addClass("status--denied");
                }
                setDataInForm('.form-giamGia', result);
            },
            error: function(e) {
                console.log("ERROR : ", e);
            }
        });
    } else {
        $('#trangThai').val("Đang hoạt động").addClass("status--process");
    }

    $("#luuGiamGia").click(function(e) {
        $('.form-giamGia').find(":invalid").first().focus();
        var ngayBatDau = $("#ngayBatDau").val();
        var ngayKetThuc = $("#ngayKetThuc").val();
        var phamTramGiam = $("#phanTramGiam").val();
        if (phamTramGiam < 1 || phamTramGiam > 99) {
            alert("Vui lòng nhập phần trăm giảm giá lớn hơn 0 và nhỏ hơn 100!");
            return;
        }
        if (ngayBatDau == "" || ngayKetThuc == "") {
            alert("Vui lòng chọn ngày bắt đầu và kết thúc!");
            return;
        } else if (ngayBatDau > ngayKetThuc) {
            alert("Vui lòng chọn ngày bắt đầu sau kết thúc!");
            return;
        }
        var account = JSON.parse(localStorage.getItem("account"));
        var data = getDataForm('.form-giamGia');
        if (data != null && $('.form-giamGia')[0].checkValidity()) {
            if ($("#idGiamGia").val() == null || $("#idGiamGia").val() == "") {
                data.nguoiTao = account.tenNguoiDung;
                createGiamGia(JSON.stringify(data));
            } else {
                data.nguoiThayDoi = account.tenNguoiDung;
                updateGiamGia(JSON.stringify(data));
            }
        } else {
            alert("Vui lòng nhật đầy đủ thông tin");
            return;
        }
    });
})(jQuery);

function createGiamGia(data) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/giamGia/create",
        data: data,
        async: false,
        crossDomain: true,
        success: function(result) {
            $("#idGiamGia").val(result.idGiamGia);
            alert("Tạo chương trình giảm giá thành công!");
        },
        error: function(e) {
            alert("Chương trình giảm giá đã tồn tại, vui lòng tạo chương trình mới!")
            console.log("ERROR : ", e);

        }
    });
}

function updateGiamGia(data) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/giamGia/update",
        data: data,
        async: false,
        crossDomain: true,
        success: function(result) {
            alert("Cập nhật chương trình giảm giá thành công!");
        },
        error: function(e) {
            alert("Cập nhật chương trình không thành công vui lòng thử lại!")
            console.log("ERROR : ", e);

        }
    });
}