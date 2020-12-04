(function($) {

    searchAll();

    $("#btnSearch").click(function(e) {
        var valueSearch = $("#valueSearch").val();
        if (valueSearch != "") {
            $.ajax({
                type: "GET",
                enctype: 'multipart/form-data',
                url: "http://localhost:8080/giamGia/findByTenGiamGia/" + valueSearch,
                async: false,
                crossDomain: true,
                contentType: false,
                success: function(data) {
                    $('#listGiamGia').empty();
                    loadChuongTrinh(data);
                },
                error: function(e) {
                    console.log("ERROR : ", e);
                }
            });
        } else {
            searchAll();
        }
    });

    $("#locChuongTrinh").click(function(e) {
        $("#valueSearch").val("");
        var trangThai = $("#trangThai").val();
        if (trangThai != "all") {
            $.ajax({
                type: "GET",
                enctype: 'multipart/form-data',
                url: "http://localhost:8080/giamGia/findByTrangThai/" + trangThai,
                async: false,
                crossDomain: true,
                contentType: false,
                success: function(data) {
                    $('#listGiamGia').empty();
                    loadChuongTrinh(data);
                },
                error: function(e) {
                    console.log("ERROR : ", e);
                }
            });
        } else {
            searchAll();
        }
    });

})(jQuery);

function searchAll() {
    $.ajax({
        type: "GET",
        enctype: 'multipart/form-data',
        url: "http://localhost:8080/giamGia/listGiamGia",
        async: false,
        crossDomain: true,
        contentType: false,
        success: function(data) {
            $('#listGiamGia').empty();
            loadChuongTrinh(data);
        },
        error: function(e) {
            console.log("ERROR : ", e);

        }
    });
}

function loadChuongTrinh(data) {
    $.each(data, function(key, item) {
        var statusClass = "status--process";
        if (item.trangThai == "Kết thúc") {
            statusClass = "status--denied";
        }
        $('#listGiamGia').append(
            `<tr class="tr-shadow" id="row_${item.idGiamGia}">
                <td>
                    ${item.tenGiamGia}
                </td>
                <td class="desc">${item.phanTramGiam}%</td>
                <td>${formatDate(item.ngayBatDau)}</td>
                <td>${formatDate(item.ngayKetThuc)}</td>
                <td><span class="${statusClass}">${item.trangThai}</span></td>
                <td>
                    <div class="table-data-feature">
                        <a href="DetailChuongTrinh.html#${item.idGiamGia}" class="item" data-toggle="tooltip" data-placement="top" title="Sửa">
                            <i class="zmdi zmdi-edit"></i>
                        </a>
                        <button class="item" data-toggle="tooltip" data-placement="top" title="Xóa" onclick="xoaChuongTrinh(${item.idGiamGia})">
                            <i class="zmdi zmdi-delete"></i>
                        </button>
                    </div>
                </td>
            </tr>
            <tr class="spacer" id="row_${item.idGiamGia}_spacer"></tr>`
        );
    });
}

function xoaChuongTrinh(idGiamGia) {
    var r = confirm("Bạn có muốn xóa chương trình giảm giá không? Xóa chương trình giảm giá này thì các sản phẩm dùng mã này sẽ không còn được khuyến mãi nữa!");
    if (r == true) {
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://localhost:8080/giamGia/delete/" + idGiamGia,
            crossDomain: true,
            success: function(data) {
                $('#row_' + idGiamGia).remove();
                $('#row_' + idGiamGia + "_spacer").remove();
                alert("Xóa chương trình giảm giá thành công!");
            },
            error: function(e) {
                alert("Xóa chương trình giảm giá không thành công!");
                console.log("ERROR : ", e);
            }
        });
    }
}