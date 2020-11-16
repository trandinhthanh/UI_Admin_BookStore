(function($) {
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
                if (item.soLuong == 0) {
                    trangThai = "Hết Hàng";
                }
                $('#listSanPham').append(
                    `<tr class="tr-shadow">
                        <td id="idSanPham" hidden>
                            ${item.idSanPham}
                        </td>
                        <td class="maxWH-15" ><img src="http://localhost:8080/file/img/${item.linkHinhChinh}" /></td>
                        <td>
                            ${item.tenSanPham}
                        </td>
                        <td>${item.tenDanhMucSP}</td>
                        <td>${gia}</td>
                        <td class="desc">${item.giamGia}%</td>
                        <td><span class="status--process">${trangThai}</span></td>
                        <td>
                            <div class="table-data-feature">
                                <button class="item" data-toggle="tooltip" data-placement="top" title="Edit">
                                    <i class="zmdi zmdi-edit"></i>
                                </button>
                                <button class="item" data-toggle="tooltip" data-placement="top" title="Delete">
                                    <i class="zmdi zmdi-delete"></i>
                                </button>
                                <button class="item" data-toggle="tooltip" data-placement="top" title="More">
                                    <i class="zmdi zmdi-more"></i>
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