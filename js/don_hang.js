(function($) {
    $('#fromDate').attr("readonly", true);
    $('#toDate').attr("readonly", true);

    $('#searchAll').click(function() {
        if ($(this).is(':checked')) {
            $('#fromDate').val("").attr("readonly", true);
            $('#toDate').val("").attr("readonly", true);

        } else {
            $('#fromDate').attr("readonly", false);
            $('#toDate').attr("readonly", false);

        }
    });

    loadAllDonHang();


    $("#searchDonHang").click(function(e) {
        if ($("#searchAll").is(':checked')) {
            $('#listDonHang').empty();
            loadAllDonHang();
        } else {
            var fromDate = $("#fromDate").val();
            var toDate = $("#toDate").val();
            if (fromDate == "" || toDate == "") {
                alert("Đã bỏ chọn tìm tất cả, Vui lòng chọn ngày bắt đầu và kết thúc để tìm kiếm!");
                return;
            } else if (fromDate > toDate) {
                alert("Vui lòng chọn ngày bắt đầu sau kết thúc để tìm kiếm!");
                return;
            } else {
                $('#listDonHang').empty();
                getTransactionByDate(fromDate, toDate);
            }
        }
    });

    $("#btnSearch").click(function(e) {
        var valueSearch = $("#valueSearch").val();
        if (valueSearch != "") {
            $.ajax({
                type: "GET",
                enctype: 'multipart/form-data',
                url: "http://localhost:8080/transaction/findByTenKhachHang/" + valueSearch,
                async: false,
                crossDomain: true,
                contentType: false,
                success: function(data) {
                    $('#listDonHang').empty();
                    loadDonHang(data);
                },
                error: function(e) {
                    console.log("ERROR : ", e);
                }
            });
        } else {
            loadAllDonHang();
        }
    });

})(jQuery);

function loadAllDonHang() {
    $.ajax({
        type: "GET",
        enctype: 'multipart/form-data',
        url: "http://localhost:8080/transaction/listTransaction",
        async: false,
        crossDomain: true,
        contentType: false,
        success: function(data) {
            $('#listDonHang').empty();
            loadDonHang(data);
        },
        error: function(e) {
            console.log("ERROR : ", e);

        }
    });
}

function getTransactionByDate(fromDate, toDate) {
    $.ajax({
        type: "GET",
        enctype: 'multipart/form-data',
        url: "http://localhost:8080/transaction/getTransactionByDate/" + fromDate + "/" + toDate,
        async: false,
        crossDomain: true,
        contentType: false,
        success: function(data) {
            loadDonHang(data);
        },
        error: function(e) {
            console.log("ERROR : ", e);

        }
    });
}

function loadDonHang(data) {
    $.each(data, function(key, item) {
        var tongTien = formatMoney(item.tongCong);
        var trangThai = null;
        var statusClass = null;
        var changeStatus = "Không thể thay đổi";
        var hiddenChangeStatus = "";
        if (item.trangThai == 0) {
            trangThai = "Chờ xác nhận";
            statusClass = "status--process";
            changeStatus = "Xác nhận giao hàng";
        } else if (item.trangThai == 1) {
            trangThai = "Đang giao hàng";
            statusClass = "status--process";
            changeStatus = "Xác nhận đang giao hàng";
        } else if (item.trangThai == 2) {
            trangThai = "Đã giao hàng";
            statusClass = "status--process";
            changeStatus = "Xác nhận đã giao hàng";
            hiddenChangeStatus = "hidden";
        } else if (item.trangThai == 3) {
            trangThai = "Đơn bị hủy";
            statusClass = "status--denied";
            hiddenChangeStatus = "hidden";
        } else if (item.trangThai == 5) {
            trangThai = "Giao không thành công";
            statusClass = "status--denied";
            hiddenChangeStatus = "hidden";
        }
        $('#listDonHang').append(
            `<tr class="tr-shadow">
            <td>
                #${item.idGiaoDich}
            </td>
            <td>${item.tenNguoiDung}</td>
            <td>
                ${item.soDienThoai}
            </td>
            <td class="desc">${item.diaChi}</td>
            <td>${tongTien}</td>

            <td>${formatDate(item.ngayMua)}</td>
            <td>
                <spam id="trangThaiDonHang_${item.idGiaoDich}" hidden>${item.trangThai}</spam>
                <span class="${statusClass}">${trangThai}</span>
            </td>
            <td>
                <div class="table-data-feature">
                    <button class="item" data-toggle="tooltip" data-placement="top" ${hiddenChangeStatus} title="${changeStatus}" onclick="changeStatus(${item.idGiaoDich})">
                        <i class="zmdi zmdi-mail-send"></i>
                    </button>
                    <a href="DetailDonHang.html#${item.idGiaoDich}" class="item" data-toggle="tooltip" data-placement="top" title="Xem chi tiết">
                        <i class="fa fa-book"></i>
                    </a>
                    <button class="item" data-toggle="tooltip" data-placement="top" ${hiddenChangeStatus} title="Giao không thành công" onclick="blockDonHang(${item.idGiaoDich})">
                        <i class="fa fa-ban"></i>
                    </button>
                </div>
            </td>
        </tr>
        <tr class="spacer"></tr>`
        );
    });
}

function changeStatus(idGiaoDich) {
    var r = confirm("Bạn có muốn tiếp tục chuyển trạng thái không!");
    if (r == true) {
        var trangThaiDonHang = $("#trangThaiDonHang_" + idGiaoDich).text();
        if (trangThaiDonHang == "0") {
            updateTrangThai(idGiaoDich, "1")
        } else if (trangThaiDonHang == "1") {
            updateTrangThai(idGiaoDich, "2")
        }
    }
}

function blockDonHang(idGiaoDich) {
    var r = confirm("Xác nhận dơn hàng giao không thành công!");
    if (r == true) {
        updateTrangThai(idGiaoDich, "5");
    }
}

function updateTrangThai(idGiaoDich, trangThai) {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8080/transaction/updateTrangThai/" + idGiaoDich + "/" + trangThai,
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