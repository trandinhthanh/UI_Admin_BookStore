(function($) {
    var account = JSON.parse(localStorage.getItem("account"));
    if (account != null) {
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://localhost:8080/nguoiDung/getNguoiDung/" + account.idNguoiDung,
            crossDomain: true,
            success: function(data) {
                $('#idNguoiDung').val(data.idNguoiDung);
                $('#tenNguoiDung').val(data.tenNguoiDung);
                $('#email').val(data.email);
                $('#soDienThoai').val(data.soDienThoai);
                $('#diaChi').val(data.diaChi);
            },
            error: function(e) {
                alert("Hệ thống lỗi vui lòng thử lại!");
                console.log("ERROR : ", e);

            }
        });
    }

    $("#bntEditUser").click(function(e) {
        var form = convertJson('.form-editUser');
        if ($('#matKhauMoi').val() != $('#nhapLaiMK').val()) {
            $('#nhapLaiMK').focus();
            return;
        }
        if (form != null) {
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "http://localhost:8080/nguoiDung/editUserByUser",
                data: form,
                async: false,
                crossDomain: true,
                success: function(data) {
                    if (data == true) {
                        alert("Sửa thông tin thành công!")
                        window.location.replace("index.html");
                    }
                },
                error: function(e) {
                    alert("Mật khẩu cũ không chính xác vui lòng nhập lại");
                    console.log("ERROR : ", e);

                }
            });
        }
    });

})(jQuery);