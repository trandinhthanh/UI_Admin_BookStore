(function($) {
    $.ajax({
        type: "GET",
        enctype: 'multipart/form-data',
        url: "http://localhost:8080/danhMucSP/listDanhMucSanPham",
        crossDomain: true,
        contentType: false,
        success: function(data) {
            $.each(data, function(key, item) {
                $('#sortByDanhMuc').append(
                    `<option value="${item.linkDanhMuc}" >${item.tenDanhMuc}</option>`
                );
            });
        },
        error: function(e) {
            console.log("ERROR : ", e);

        }
    });

    $.ajax({
        type: "GET",
        enctype: 'multipart/form-data',
        url: "http://localhost:8080/sanPham/listSanPham",
        async: false,
        crossDomain: true,
        contentType: false,
        success: function(data) {
            $.each(data, function(key, item) {
                var gia = formatMoney(item.gia);
                var trangThai = "Còn Hàng";
                status = null;
                if (item.soLuong == 0) {
                    trangThai = "Hết Hàng";
                    status = "status--denied";
                } else {
                    trangThai = "Còn Hàng " + item.soLuong + " SP";
                    status = "status--process";
                }
                $('#listSanPham').append(
                    `<tr class="tr-shadow" id="row_${item.idSanPham}">
                        <td class="maxWH-15" ><img src="http://localhost:8080/file/img/${item.linkHinhChinh}" /></td>
                        <td>
                            ${item.tenSanPham}
                        </td>
                        <td>${item.tenDanhMucSP}</td>
                        <td>${gia}</td>
                        <td class="desc">${item.giamGia}%</td>
                        <td><span class="${status}">${trangThai}</span></td>
                        <td>
                            <div class="table-data-feature">
                                <a href="ThemSanPham.html#${item.idSanPham}" class="item" data-toggle="tooltip" data-placement="top" title="Edit">
                                    <i class="zmdi zmdi-edit"></i>
                                </a>
                                <button class="item" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removeSanPham(${item.idSanPham})">
                                    <i class="zmdi zmdi-delete"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr class="spacer"></tr>`
                );
            });

        },
        error: function(e) {
            console.log("ERROR : ", e);

        }
    });

})(jQuery);

function removeSanPham(idSanPham) {
    var r = confirm("Bạn có muốn xóa sản phẩm không?!");
    if (r == true) {
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://localhost:8080/sanPham/delete/" + idSanPham,
            crossDomain: true,
            success: function(data) {
                $('#row_' + idSanPham).remove();
                alert("Xóa sản phẩm thành công!");
            },
            error: function(e) {
                alert("Xóa sản phẩm không thành công!");
                console.log("ERROR : ", e);
            }
        });
    }
}