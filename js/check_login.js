(function($) {
    var account = JSON.parse(localStorage.getItem("account"));
    if (account == null) {
        window.location.replace("login.html");
    } else if (account.idNguoiDung == null) {
        window.location.replace("login.html");
    }
    $('#accountName').text(account.tenNguoiDung);
    $('#accountName1').text(account.tenNguoiDung);
    $('#emailAccount').text(account.email);
})(jQuery);