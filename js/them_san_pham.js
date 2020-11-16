(function($) {

    $("div#uploadImg").dropzone({ url: "/file/post" });
    // var data = $('div#uploadImg')[0].dropzone.getAcceptedFiles()[0];
    // $.ajax({
    //     url: "location.url",
    //     data: data
    // }).done(function() {});
})(jQuery);