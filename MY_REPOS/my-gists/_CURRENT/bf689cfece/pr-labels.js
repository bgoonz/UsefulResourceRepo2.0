// ==UserScript==
// @name        Adds Labels on Github Pull Request
// @namespace   http://fabien.potencier.org
// @include     https://github.com/*/*/pulls*
// @version     2
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==
$(function() {
    $(".pulls-list .list-group-item h4").each(function() {
        var pull_request = this;
        $(pull_request).addClass("issues-list");

        var issue_href = $("a:first", pull_request).attr("href").replace('/pull/', '/issues/');
        $.getJSON("https://api.github.com/repos" + issue_href + "?access_token=YOUR_API_TOKEN", function(issue) {
            $.each(issue.labels, function(l_i, label) {
                var label_html = $('<span class="labels"><span style="background-color: #' + label.color + ' !important; color: #333 !important" data-name="' + label.name + '" class="label">' + label.name + '</span></span>');
                $(pull_request).append(label_html);
            }); 
        });
    });
});
