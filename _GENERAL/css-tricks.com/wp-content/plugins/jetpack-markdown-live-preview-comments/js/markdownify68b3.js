(function (window, $) {
  "use strict";
  var jetpackLiveCommentMarkdownify = function () {
    var self = this,
      original_comment = "",
      previewActive = false;
    self.init = function () {
      $("<div />", {
        class: "preview-buttons",
        id: "preview-buttons",
        html: '\
          <a href="#0" id="writeCommentButton" class="commentPreviewButton active">Write</a>\
          <a href="#0" id="previewCommentButton" class="commentPreviewButton">Preview</a>',
      }).insertAfter("#comment");
      $("<div />", {
        id: "markdown_comment",
        class: "comment-content markdown-comment-preview",
      }).insertAfter("#comment");
      $(".commentPreviewButton").on("click", self.tab);
      $("#previewCommentButton").on("click", self.serve);
    };
    self.serve = function (event) {
      original_comment = $("#comment").val();
      if (previewActive) {
        return false;
      }
      $("#comment").hide();
      $("#markdown_comment").show().html("Combobulating comment preview...");
      $.post(
        markdownify.ajax_url,
        {
          action: "markdownify",
          nonce: markdownify.nonce,
          comment_content: original_comment,
        },
        function (response) {
          self.display(response);
        },
        "json"
      );
      event.preventDefault();
    };
    self.tab = function (event) {
      var clicked = $(this);
      if (!clicked.hasClass("active")) {
        $(".commentPreviewButton").removeClass("active");
        clicked.addClass("active");
        if (this.id == "writeCommentButton") {
          $("#comment").val(original_comment).show();
          $("#markdown_comment").hide();
          previewActive = false;
        }
      } else {
        return;
      }
      event.preventDefault();
    };
    self.display = function (response) {
      if (response.success) {
        $("#comment").hide();
        $("#markdown_comment").html(response.data).show();
        previewActive = true;
      } else {
        $("#comment").show();
        $("#markdown_comment").hide();
      }
    };
    $(function ($) {
      self.init();
    });
  };
  window.jetpackLiveCommentMarkdownify = new jetpackLiveCommentMarkdownify();
})(window, jQuery);
