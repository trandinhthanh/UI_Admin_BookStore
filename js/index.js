(function($) {
    $('#fromDate').attr("readonly", true);
    $('#toDate').attr("readonly", true);
    getDoanhSo();

    $('#searchAll').click(function() {
        if ($(this).is(':checked')) {
            $('#fromDate').val("").attr("readonly", true);
            $('#toDate').val("").attr("readonly", true);

        } else {
            $('#fromDate').attr("readonly", false);
            $('#toDate').attr("readonly", false);

        }
    });

    $("#searchDoanhSo").click(function(e) {
        if ($("#searchAll").is(':checked')) {
            getDoanhSo();
        } else {
            var fromDate = $("#fromDate").val();
            var toDate = $("#toDate").val();
            if (fromDate == "" || toDate == "") {
                alert("Đã bỏ chọn tìm tất cả, Vui lòng chọn ngày bắt đầu và kết thúc để tìm kiếm!");
                return;
            } else if (fromDate > toDate) {
                alert("Vui lòng chọn ngày bắt đầu sau kết thúc để tìm kiếm!");
                return;
            }
            getDoanhSoByDate(fromDate, toDate);
        }
    });

})(jQuery);

function getDoanhSo() {
    $.ajax({
        type: "GET",
        enctype: 'multipart/form-data',
        url: "http://localhost:8080/danhSo/getDoanhSo",
        async: false,
        crossDomain: true,
        contentType: false,
        success: function(result) {
            replateDateDoanhSo(result);
            loadDanhSachDoanhSoSP(result.doanhSoSanPhamList);
        },
        error: function(e) {
            console.log("ERROR : ", e);

        }
    });
}

function getDoanhSoByDate(fromDate, toDate) {
    $.ajax({
        type: "GET",
        enctype: 'multipart/form-data',
        url: "http://localhost:8080/danhSo/getDoanhSoByDate/" + fromDate + "/" + toDate,
        async: false,
        crossDomain: true,
        contentType: false,
        success: function(result) {
            replateDateDoanhSo(result);
            loadDanhSachDoanhSoSP(result.doanhSoSanPhamList);
        },
        error: function(e) {
            console.log("ERROR : ", e);

        }
    });
}

function replateDateDoanhSo(data) {
    $("#tongSoTaiKhoan").text(data.tongSoTaiKhoan);
    $("#tongDonHang").text(formatNumberSimple(data.tongDonHang));
    $("#tongTienLoi").text(formatMoney(data.tongTienLoi));
    $("#tongTienThuVe").text(formatMoney(data.tongTienThuVe));
}

function loadDanhSachDoanhSoSP(data) {
    $('#listDoanhThu').empty();
    $.each(data, function(index, item) {
        var tienLoi = 0;
        var tienLo = 0;
        if (item.tienLoi >= 0) {
            tienLoi = item.tienLoi;
        } else {
            tienLo = item.tienLoi;
        }
        $('#listDoanhThu').append(
            `<tr>
                <td>${item.tenSanPham}</td>
                <td>${item.loai}</td>
                <td>${item.soLuong}</td>
                <td>${formatMoney(item.tienVon)}</td>
                <td>${formatMoney(tienLoi)}</td>
                <td>${formatMoney(tienLo)}</td>
                <td>${formatMoney(item.tienThuVe)}</td>
            </tr>`
        );
    });
}