

function htmlEncode(value){
    if (value) {
        return jQuery('<div />').text(value).html();
    } else {
        return '';
    }
}
function htmlDecode(value) {
    if (value) {
        return $('<div />').html(value).text();
    } else {
        return '';
    }
}
$(function() {
    $('#escapeBtn').click(function() {
        $('#output').text(htmlEncode($('#input').val()));
    })
    $('#unescapeBtn').click(function() {
        $('#output').text(htmlDecode($('#input').val()));
    })
    $('#copy').click(function() {
        $('#copy-tooltip').show();
    })
    $('#copy').mouseout(function() {
        $('#copy-tooltip').hide();
    })

    var clipboard = new Clipboard('#copy');

    clipboard.on('success', function(e) {
        console.log('success');

        e.clearSelection();
    });

    clipboard.on('error', function(e) {
        console.log('error');
    });
})