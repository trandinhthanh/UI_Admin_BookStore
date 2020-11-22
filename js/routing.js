(function($) {
    $(window).on("hashchange", function() {
        var hash = window.location.hash;
        var part = hash.slice(1);;

        if (part == "dangXuat") {
            localStorage.setItem('account', null);
            window.location.replace("index.html");
        } else if (part == "editUser") {
            window.location.replace("editUser.html");
        }
    });
})(jQuery);