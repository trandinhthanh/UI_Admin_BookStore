(function($) {
    $("#btnDangnhap").click(function(e) {
        if (!$('.form-signin')[0].checkValidity()) {
            alert("Email hoặc mật khẩu sai vui lòng kiểm tra lại!");
            return false;
        }
        var data = convertJson('.form-signin');
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8080/nguoiDung/dangNhapAdmin",
            data: data,
            async: false,
            crossDomain: true,
            success: function(result) {
                var account = {
                    idNguoiDung: result.idNguoiDung,
                    email: result.email,
                    tenNguoiDung: result.tenNguoiDung
                }
                localStorage.setItem('account', JSON.stringify(account));
                alert("Đăng nhập thành công!");
                window.location.replace("SanPham.html");
            },
            error: function(e) {
                alert("Email hoặc mật khẩu không chính xác");
                console.log("ERROR : ", e);

            }
        });
    });

    $("#btnQuenMK").click(function(e) {
        if (!$('.form-reset')[0].checkValidity()) {
            alert("Vui lòng nhập Email!");
            return false;
        }
        var formData = new FormData();
        formData.append("laQuanLy", true);
        formData.append("email", $("#resetEmail").val());

        var request = new XMLHttpRequest();
        request.open("POST", "http://localhost:8080/nguoiDung/quenMatKhau", false);
        request.onreadystatechange = function() {
            if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
                alert("Mật khẩu đã được đặt thành số điện thoại của bạn. Bạn vui lòng đăng nhập lại và đổi mật khẩu mới!");
                window.location.replace("login.html");
            } else {
                alert("Email không tồn tại, vui lòng kiểm tra lại!");
            }
        };
        request.send(formData);
    });

})(jQuery);

function toggleResetPswd(e) {
    e.preventDefault();
    $('#logreg-forms .form-signin').toggle() // display:block or none
    $('#logreg-forms .form-reset').toggle() // display:block or none
}

function toggleSignUp(e) {
    e.preventDefault();
    $('#logreg-forms .form-signin').toggle(); // display:block or none
    $('#logreg-forms .form-signup').toggle(); // display:block or none
}

$(() => {
    // Login Register Form
    $('#logreg-forms #forgot_pswd').click(toggleResetPswd);
    $('#logreg-forms #cancel_reset').click(toggleResetPswd);
    $('#logreg-forms #btn-signup').click(toggleSignUp);
    $('#logreg-forms #cancel_signup').click(toggleSignUp);
})