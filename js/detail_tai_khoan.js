(function($) {
    var hash = window.location.hash;
    if (hash != "") {
        var idNguoiDung = hash.slice(1);
        $.ajax({
            type: "GET",
            enctype: 'multipart/form-data',
            url: "http://localhost:8080/nguoiDung/getNguoiDung/" + idNguoiDung,
            async: false,
            crossDomain: true,
            contentType: false,
            success: function(result) {
                if (result.laQuanLy) {
                    result.laQuanLy = "Admin";
                } else {
                    result.laQuanLy = "Người dùng";
                }
                if (result.trangThai == "1") {
                    result.trangThai = "Đang hoạt động";
                    $("#trangThai").addClass("status--process");
                } else {
                    result.trangThai = "Đã khóa";
                    $("#trangThai").addClass("status--denied");
                }
                setDataInForm('.form-acc', result);
            },
            error: function(e) {
                console.log("ERROR : ", e);

            }
        });
    } else {
        $('#luuAcc').removeAttr('hidden');
        $('#laQuanLy').val("Admin");
        $('#trangThai').val("Đang hoạt động").addClass("status--process");
        $('#divMk').removeAttr('hidden');
        $('#divNhapLaiMk').removeAttr('hidden');
        var data = $(".form-acc").serializeArray();
        for (var key in data) {
            if (data[key].name != "trangThai" && data[key].name != "laQuanLy") {
                $("#" + data[key].name).attr("readonly", false);
            }
        }
    }

    $("#luuAcc").click(function(e) {
        var data = convertJsonAcc('.form-acc');
        if ($('#matKhau').val() != $('#nhapLaiMK').val()) {
            $('#nhapLaiMK').focus();
            alert("Mật khẩu và xác nhận mật khẩu không trùng khớp!");
            return;
        }
        if (data != null && $('.form-acc')[0].checkValidity()) {
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "http://localhost:8080/nguoiDung/create",
                data: data,
                async: false,
                crossDomain: true,
                success: function(data) {
                    if (data == true) {
                        alert("Tạo tài khoản thành công!")
                    }
                },
                error: function(e) {
                    $('#messageCreate').text("Email đã được đăng ký, vui lòng chọn email khác!")
                    console.log("ERROR : ", e);

                }
            });
        } else {
            alert("Email sai định dạng vui lòng kiểm tra lại!");
            return;
        }
    });
})(jQuery);

function convertJsonAcc(id) {
    var data = $(id).serializeArray();
    var obj = {};
    for (var key in data) {
        if (data[key].name == "laQuanLy") {
            obj[data[key].name] = true;
        } else if (data[key].name == "trangThai") {
            obj[data[key].name] = "1";
        } else obj[data[key].name] = data[key].value;
    }
    return JSON.stringify(obj);
}