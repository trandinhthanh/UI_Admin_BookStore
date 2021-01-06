(function($) {
    var hash = window.location.hash;
    if (hash != "") {
        var idGiaoDich = hash.slice(1);
        $.ajax({
            type: "GET",
            enctype: 'multipart/form-data',
            url: "http://localhost:8080/transaction/listTransaction/" + idGiaoDich,
            async: false,
            crossDomain: true,
            contentType: false,
            success: function(result) {
                var statusClass = "";
                result.tongCong = formatMoney(result.tongCong);
                if (result.trangThai == 0) {
                    result.trangThai = "Chờ xác nhận";
                    statusClass = "status--process";
                } else if (result.trangThai == 1) {
                    result.trangThai = "Đang giao hàng";
                    statusClass = "status--process";
                } else if (result.trangThai == 2) {
                    result.trangThai = "Đã giao hàng";
                    statusClass = "status--process";
                } else if (result.trangThai == 3) {
                    result.trangThai = "Đơn bị hủy";
                    statusClass = "status--denied";
                } else if (result.trangThai == 5) {
                    result.trangThai = "Giao không thành công";
                    statusClass = "status--denied";
                }
                $("#trangThai").addClass(statusClass);
                result.ngayMua = formatDate(result.ngayMua);
                setDataInForm('.form-donHang', result);
                if (result.loaiThanhToan != null) {
                    $("#trangThai").val(result.trangThai + ' - đã thanh toán qua ' + result.loaiThanhToan);
                }
                $.each(result.sanPhamThanhTiens, function(index, item) {
                    var thanhTien = formatMoney(item.gia);
                    var giaSach = formatMoney(Number(item.gia) / Number(item.soLuong));
                    $('#sanPhamOrder').append(
                        `<tr class="tr-shadow">
                            <td>${index+1}</td>
                            <td>${item.tenSanPham}</td>
                            <td>${giaSach}</td>
                            <td>${item.soLuong}</td>
                            <td>${thanhTien}</td>
                        </tr>
                        <tr class="spacer"></tr>`
                    );
                });

            },
            error: function(e) {
                console.log("ERROR : ", e);

            }
        });
    }
})(jQuery);