(function($) {

    $.ajax({
        type: "GET",
        enctype: 'multipart/form-data',
        url: "http://localhost:8080/nguoiDung/listNguoiDung",
        async: false,
        crossDomain: true,
        contentType: false,
        success: function(data) {
            $.each(data, function(key, item) {
                var status = "";
                var trangThai = item.trangThai;
                var hiddenEdit = "";
                if (trangThai == "Đang hoạt động") {
                    status = "status--process";
                } else {
                    status = "status--denied";
                    hiddenEdit = "hidden"
                }
                if (item.laQuanLy) {
                    $('#listAcc').append(
                        `<tr class="tr-shadow">
                            <td>${item.tenNguoiDung}</td>
                            <td>
                                <span class="block-email">${item.email}</span>
                            </td>
                            <td class="desc">${item.soDienThoai}</td>
                            <td>${item.diaChi}</td>
                            <td>
                                <span class="${status}">${item.trangThai}</span>
                            </td>
                            <td>
                                <div class="table-data-feature">
                                <span class="block-status"> Admin </span>
                                <a href="DetailTaiKhoan.html#${item.idNguoiDung}" class="item" data-toggle="tooltip" data-placement="top" title="Xem tài khoản">
                                        <i class="fa fa-file-text"></i>
                                    </a>
                            </div>
                            </td>
                        </tr>
                        <tr class="spacer"></tr>`
                    );
                } else {
                    $('#listAcc').append(
                        `<tr class="tr-shadow">
                            <td>${item.tenNguoiDung}</td>
                            <td>
                                <span class="block-email">${item.email}</span>
                            </td>
                            <td class="desc">${item.soDienThoai}</td>
                            <td>${item.diaChi}</td>
                            <td>
                                <span class="${status}">${item.trangThai}</span>
                            </td>
                            <td>
                                <div class="table-data-feature">
                                    <a href="DetailTaiKhoan.html#${item.idNguoiDung}" class="item" data-toggle="tooltip" data-placement="top" title="Xem tài khoản">
                                            <i class="fa fa-file-text"></i>
                                        </a>
                                    <button class="item" data-toggle="tooltip" data-placement="top" title="Khóa tài khoản" ${hiddenEdit} onclick="blockAcc(${item.idNguoiDung})">
                                            <i class="fa fa-ban"></i>
                                        </button>
                                </div>
                            </td>
                        </tr>
                        <tr class="spacer"></tr>`
                    );
                }
            });
        },
        error: function(e) {
            console.log("ERROR : ", e);

        }
    });

})(jQuery);

function blockAcc(idNguoiDung) {
    var r = confirm("Bạn có muốn khóa account không!");
    if (r == true) {
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://localhost:8080/nguoiDung/blockUser/" + idNguoiDung,
            crossDomain: true,
            success: function(data) {
                location.reload();
            },
            error: function(e) {
                alert("Thực hiện không thành công!");
                console.log("ERROR : ", e);
            }
        });
    }
}