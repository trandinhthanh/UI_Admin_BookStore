(function($) {

    $("#backPage").click(function(e) {
        history.back();
    });

})(jQuery);

function formatMoney(gia) {
    if (gia == null && gia == undefined) {
        return "0 đ";
    }
    return Number((gia).toFixed(1)).toLocaleString() + "đ ";
}

function formatNumberSimple(gia) {
    return Number((gia).toFixed(1)).toLocaleString();
}

function removeFormatMoney(gia) {
    return Number(gia.replace(/[^0-9-]+/g, ""));
}

function convertJson(id) {
    var data = $(id).serializeArray();
    var obj = {};
    for (var key in data) {
        obj[data[key].name] = data[key].value;
    }
    return JSON.stringify(obj);
}

function getDataForm(id) {
    var data = $(id).serializeArray();
    var obj = {};
    for (var key in data) {
        obj[data[key].name] = data[key].value;
    }
    return obj;
}

function setDataInForm(id, values) {
    var data = $(id).serializeArray();
    for (var key in data) {
        if ($("#" + data[key].name).prop('tagName') == "SELECT") {
            $("select[name=" + data[key].name + "]").val(values[data[key].name]);
        } else if ($("#" + data[key].name).prop('tagName') == "INPUT") {
            $("input[name=" + data[key].name + "]").val(values[data[key].name]);
        } else {
            $("#" + data[key].name).val(values[data[key].name]);
        }

    }
}

function formatDate(date) {
    var d = new Date(date);
    return d.toLocaleDateString("vi-VN");

}

function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    str = str.replace(/\s/g, '')
    return str;
}