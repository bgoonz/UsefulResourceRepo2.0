// ==UserScript==
// @name        Pull Request Labels
// @namespace   http://joshuaflanagan.com
// @include     https://github.com/*/*/pulls
// @version     1
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==
$(function(){
  var $pull_requests = $(".pulls-list .list-group-item h4");
  $pull_requests.each(function(){
    var pull_request = this;
    $(pull_request).addClass("issues-list"); // styling

    var $link = $("a:first", pull_request);
    var href = $link.attr("href");
    //ex: /user/repo/pulls/42
    var href_parts = href.split('/');
    href_parts[3] = "issues";
    var issue_href = href_parts.join('/');

    $.getJSON("https://api.github.com/repos" + issue_href, function(issue){
      $.each(issue.labels, function(l_i, label){
        // <span data-name="actionpack" class="label labelstyle-FFF700">actionpack</span>
        var new_elem = $('<span class="label">' + label.name + '</span>').
          css("background", '#' + label.color);
        $(pull_request).append(new_elem);
      });
    });

  });
});
