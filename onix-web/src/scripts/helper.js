function copyToClipboard(content) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(content).select();
    document.execCommand("copy");
    $temp.remove();
}