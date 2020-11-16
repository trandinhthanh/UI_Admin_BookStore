function formatMoney(gia) {
    return Number((gia).toFixed(1)).toLocaleString() + "đ ";
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