(function($) {
    $.ajax({
        type: "GET",
        enctype: 'multipart/form-data',
        url: "http://localhost:8080/danhMucSP/listDanhMucSanPham",
        async: false,
        crossDomain: true,
        contentType: false,
        success: function(data) {
            $.each(data, function(key, item) {
                var statusClass = "status--process";
                var trangThai = "Đang hoạt động";
                var btnName = "Ẩn sản phẩm"
                if (item.trangThai == "0") {
                    statusClass = "status--denied";
                    trangThai = "Đang ẩn";
                    btnName = "Hiển thị sản phẩm"
                }
                $('#listDanhMuc').append(
                    `<tr class="tr-shadow" id="row_${item.idDanhMucSP}">
                        <td>
                            ${item.tenDanhMuc}
                        </td>
                        <td>
                            <span class="${statusClass}"  id="status_${item.idDanhMucSP}">${trangThai}</span>
                        </td>
                        <td>
                            <div class="table-data-feature">
                                <button class="item" data-toggle="tooltip" data-placement="top" title="Sửa" onclick="suaDanhMuc(${item.idDanhMucSP})">
                                    <i class="zmdi zmdi-edit"></i>
                                </button>
                                <button class="item" data-toggle="tooltip" data-placement="top" id="btn_${item.idDanhMucSP}" title="${btnName}" onclick="anDanhMuc(${item.idDanhMucSP})">
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

    $("#luuDanhMuc").click(function(e) {
        var data = getDataForm('.form-danhMuc');
        if (data != null && $('.form-danhMuc')[0].checkValidity()) {
            data.linkDanhMuc = removeVietnameseTones($("#tenDanhMuc").val());
            if ($("#idDanhMucSP").val() == "") {
                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    url: "http://localhost:8080/danhMucSP/create",
                    data: JSON.stringify(data),
                    async: false,
                    crossDomain: true,
                    success: function(data) {
                        alert("Tạo danh mục thành công!")
                        location.replace();
                    },
                    error: function(e) {
                        $('#message').text("Tên danh mục đã tồn tại vui lòng nhập tên khác!")
                        console.log("ERROR : ", e);

                    }
                });
            } else {
                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    url: "http://localhost:8080/danhMucSP/update",
                    data: JSON.stringify(data),
                    async: false,
                    crossDomain: true,
                    success: function(data) {
                        alert("Cập nhật danh mục thành công!")
                        location.replace();

                    },
                    error: function(e) {
                        $('#message').text("Tên danh mục đã tồn tại vui lòng nhập tên khác!")
                        console.log("ERROR : ", e);

                    }
                });
            }
        } else {
            alert("Vui lòng nhập tên danh mục để lưu!");
            return;
        }
    })
})(jQuery);

function suaDanhMuc(idDanhMucSP) {
    $("#detailDanhMuc").attr("style", "padding-right: 17px; display: block;");
    $("#mediumModalLabel").text("Sửa danh mục");
    $.ajax({
        type: "GET",
        enctype: 'multipart/form-data',
        url: "http://localhost:8080/danhMucSP/getDanhMucById/" + idDanhMucSP,
        async: false,
        crossDomain: true,
        contentType: false,
        success: function(result) {
            setDataInForm('.form-danhMuc', result);
        },
        error: function(e) {
            console.log("ERROR : ", e);
        }
    });
}

function anDanhMuc(idDanhMucSP) {
    var r = true;
    var trangThai = "0";
    if ($('#status_' + idDanhMucSP).text() == "Đang ẩn") {
        trangThai = "1";
        r = confirm("Bạn có muốn hiển thị danh mục không?");
    } else {
        r = confirm("Bạn có muốn ẩn danh mục không?");
    }

    if (r == true) {
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://localhost:8080/danhMucSP/updateTrangThai/" + idDanhMucSP + "/" + trangThai,
            crossDomain: true,
            success: function(data) {
                if (trangThai == "1") {
                    $('#btn_' + idDanhMucSP).attr('data-original-title', "Ẩn danh mục");
                    $('#status_' + idDanhMucSP).text("Đang hoạt động").addClass("status--process");
                    // $('#status_' + idDanhMucSP).attr('class', "status--process");
                    alert("Danh mục đã được hiển thị thành công!");
                } else {
                    $('#btn_' + idDanhMucSP).attr('data-original-title', "Hiển thị danh mục");
                    $('#status_' + idDanhMucSP).text("Đang ẩn").addClass("status--denied");
                    alert("Đã ẩn danh mục thành công!");
                }
                $('#btn_' + idDanhMucSP).tooltip('hide');
            },
            error: function(e) {
                alert("Cập nhật trạng thái danh mục không thành công!");
                console.log("ERROR : ", e);
            }
        });
    }
}