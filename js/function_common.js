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