(function($) {

    searchAllTaiKhoan();

    $("#locNguoiDung").click(function(e) {
        $("#valueSearch").val("");
        var laQuanLy = $("#loaiTaiKhoan").val();
        if (laQuanLy != "all") {
            $.ajax({
                type: "GET",
                enctype: 'multipart/form-data',
                url: "http://localhost:8080/nguoiDung/locTaiKhoan/" + laQuanLy,
                async: false,
                crossDomain: true,
                contentType: false,
                success: function(data) {
                    $('#listAcc').empty();
                    loadTaiKhoan(data);
                },
                error: function(e) {
                    console.log("ERROR : ", e);
                }
            });
        } else {
            searchAllTaiKhoan();
        }
    });

    $("#btnSearch").click(function(e) {
        var valueSearch = $("#valueSearch").val();
        if (valueSearch != "") {
            $.ajax({
                type: "GET",
                enctype: 'multipart/form-data',
                url: "http://localhost:8080/nguoiDung/findByTenNguoiDung/" + valueSearch,
                async: false,
                crossDomain: true,
                contentType: false,
                success: function(data) {
                    $('#listAcc').empty();
                    loadTaiKhoan(data);
                },
                error: function(e) {
                    console.log("ERROR : ", e);
                }
            });
        } else {
            searchAllTaiKhoan();
        }
    });

})(jQuery);

function searchAllTaiKhoan() {
    $.ajax({
        type: "GET",
        enctype: 'multipart/form-data',
        url: "http://localhost:8080/nguoiDung/listNguoiDung",
        async: false,
        crossDomain: true,
        contentType: false,
        success: function(data) {
            $('#listAcc').empty();
            loadTaiKhoan(data);
        },
        error: function(e) {
            console.log("ERROR : ", e);

        }
    });
}

function loadTaiKhoan(data) {
    $.each(data, function(key, item) {
        var status = "status--denied";
        var btnName = "Bỏ khóa tài khoản";
        var trangThai = item.trangThai;
        if (trangThai == "Đang hoạt động") {
            status = "status--process";
            btnName = "Khóa tài khoản";
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
                        <span class="${status}" id="status_${item.idNguoiDung}">${item.trangThai}</span>
                    </td>
                    <td>
                        <div class="table-data-feature">
                            <a href="DetailTaiKhoan.html#${item.idNguoiDung}" class="item" data-toggle="tooltip" data-placement="top" title="Xem tài khoản">
                                    <i class="fa fa-file-text"></i>
                                </a>
                            <button class="item" data-toggle="tooltip" data-placement="top" title="${btnName}" id="btn_${item.idNguoiDung}" onclick="blockAcc(${item.idNguoiDung})">
                                    <i class="fa fa-ban"></i>
                                </button>
                        </div>
                    </td>
                </tr>
                <tr class="spacer"></tr>`
            );
        }
    });
}

function blockAcc(idNguoiDung) {
    var r = true;
    var trangThai = "0";
    if ($('#status_' + idNguoiDung).text() == "Đã khóa") {
        trangThai = "1";
        r = confirm("Bạn có muốn bỏ khóa tài khoản không!");
    } else {
        r = confirm("Bạn có muốn khóa tài khoản không!");
    }
    if (r == true) {
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://localhost:8080/nguoiDung/blockUser/" + idNguoiDung + "/" + trangThai,
            crossDomain: true,
            success: function(data) {
                if (trangThai == "1") {
                    $('#btn_' + idNguoiDung).attr('data-original-title', "Khóa tài khoản");
                    $('#status_' + idNguoiDung).text("Đang hoạt động");
                    $('#status_' + idNguoiDung).attr('class', "status--process");
                    alert("Bỏ khóa tài khoản thành công!");
                } else {
                    $('#btn_' + idNguoiDung).attr('data-original-title', "Bỏ khóa tài khoản");
                    $('#status_' + idNguoiDung).text("Đã khóa");
                    $('#status_' + idNguoiDung).attr('class', "status--denied");
                    alert("Đã khóa tài khoản thành công!");
                }
                $('#btn_' + idNguoiDung).tooltip('hide');
            },
            error: function(e) {
                alert("Thực hiện không thành công!");
                console.log("ERROR : ", e);
            }
        });
    }
}