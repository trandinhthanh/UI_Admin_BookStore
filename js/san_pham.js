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
                    `<option value="${item.idDanhMucSP}" >${item.tenDanhMuc}</option>`
                );
            });
        },
        error: function(e) {
            console.log("ERROR : ", e);

        }
    });

    searchAllSanPham();

    $("#btnSearch").click(function(e) {
        var valueSearch = $("#valueSearch").val();
        if (valueSearch != "") {
            $.ajax({
                type: "GET",
                enctype: 'multipart/form-data',
                url: "http://localhost:8080/sanPham/findByTenSanPham/" + valueSearch,
                async: false,
                crossDomain: true,
                contentType: false,
                success: function(data) {
                    $('#listSanPham').empty();
                    loadItem(data);
                },
                error: function(e) {
                    console.log("ERROR : ", e);
                }
            });
        } else {
            searchAllSanPham()
        }
    });

    $("#locSanPham").click(function(e) {
        $("#valueSearch").val("");
        var idDanhMucSP = $("#sortByDanhMuc").val();
        var loaiSapXep = $("#sortByGia").val();
        $.ajax({
            type: "GET",
            enctype: 'multipart/form-data',
            url: "http://localhost:8080/sanPham/locSanPham/" + idDanhMucSP + "/" + loaiSapXep,
            async: false,
            crossDomain: true,
            contentType: false,
            success: function(data) {
                $('#listSanPham').empty();
                loadItem(data);
            },
            error: function(e) {
                console.log("ERROR : ", e);
            }
        });
    });

})(jQuery);

function searchAllSanPham() {
    $.ajax({
        type: "GET",
        enctype: 'multipart/form-data',
        url: "http://localhost:8080/sanPham/listSanPham",
        async: false,
        crossDomain: true,
        contentType: false,
        success: function(data) {
            $('#listSanPham').empty();
            loadItem(data);
        },
        error: function(e) {
            console.log("ERROR : ", e);

        }
    });
}

function loadItem(data) {
    $.each(data, function(key, item) {
        var gia = formatMoney(item.gia);
        var trangThai = "Còn Hàng";
        var status = null;
        var btnName = "Ẩn sản phẩm"
        if (item.trangThai == 1) {
            if (item.soLuong == 0) {
                trangThai = "Hết Hàng";
                status = "status--denied";
            } else {
                trangThai = "Còn Hàng " + item.soLuong + " SP";
                status = "status--process";
            }
        } else {
            btnName = "Hiển thị sản phẩm"
            trangThai = "Đang ẩn";
            status = "status--denied";
        }
        $('#listSanPham').append(
            `<tr class="tr-shadow">
                <td class="maxWH-15" ><img src="http://localhost:8080/file/img/${item.linkHinhChinh}" /></td>
                <td>
                    ${item.tenSanPham}
                </td>
                <td>${item.tenDanhMucSP}</td>
                <td>${gia}</td>
                <td class="desc">${item.giamGia}%</td>
                <td>
                    <span hidden id="soLuong_${item.idSanPham}">${item.soLuong}</span>
                    <span class="${status}" id="status_${item.idSanPham}">${trangThai}</span>
                </td>
                <td>
                    <div class="table-data-feature">
                        <a href="DetailSanPham.html#${item.idSanPham}" class="item" data-toggle="tooltip" data-placement="top" title="Sửa">
                            <i class="zmdi zmdi-edit"></i>
                        </a>
                        <button class="item" data-toggle="tooltip" data-placement="top" id="btn_${item.idSanPham}" title="${btnName}" onclick="updateTrangThai(${item.idSanPham})">
                            <i class="zmdi zmdi-more"></i>
                        </button>
                    </div>
                </td>
            </tr>
            <tr class="spacer"></tr>`
        );
    });
}

function updateTrangThai(idSanPham) {
    var r = true;
    var trangThai = "0";
    if ($('#status_' + idSanPham).text() == "Đang ẩn") {
        trangThai = "1";
        r = confirm("Bạn có muốn hiển thị sản phẩm không?");
    } else {
        r = confirm("Bạn có muốn ẩn sản phẩm không?");
    }

    if (r == true) {
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://localhost:8080/sanPham/updateTrangThai/" + idSanPham + "/" + trangThai,
            crossDomain: true,
            success: function(data) {
                if (trangThai == "1") {
                    if ($('#soLuong_' + idSanPham).text() == 0) {
                        $('#btn_' + idSanPham).attr('data-original-title', "Ẩn sản phẩm");
                        $('#status_' + idSanPham).text("Hết Hàng").addClass("status--denied");
                    } else {
                        $('#btn_' + idSanPham).attr('data-original-title', "Ẩn sản phẩm");
                        $('#status_' + idSanPham).text("Còn Hàng " + $('#soLuong_' + idSanPham).text() + " SP").removeClass("status--denied");
                        $('#status_' + idSanPham).addClass("status--process");
                    }
                    alert("Sản phẩm đã được hiển thị thành công!");
                } else {
                    $('#btn_' + idSanPham).attr('data-original-title', "Hiển thị sản Phẩm");
                    $('#status_' + idSanPham).text("Đang ẩn").addClass("status--denied");
                    alert("Đã ẩn sản phẩm thành công!");
                }
                $('#btn_' + idSanPham).tooltip('hide');
            },
            error: function(e) {
                alert("Cập nhật trạng thái sản phẩm không thành công!");
                console.log("ERROR : ", e);
            }
        });
    }
}