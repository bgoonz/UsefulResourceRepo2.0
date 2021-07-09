/*
 * Explr.js v1.4
 * Explorer-like tree jQuery plugin
 * https://github.com/faisalman/explr-js
 *
 * Copyright © 2010-2011 Faisal Salman <f@faisalman.com>
 * Dual licensed under GPLv2 & MIT
 */

(function ($) {
  $.fn.explr = $.fn.explrTree = function (method) {
    // define default properties
    var defaults = {
      ajaxContainerId: "explr-content", // default id attribute for AJAX-loaded container element
      ajaxLoadingText: "<p>loading..</p>", // default of what get displayed when loading AJAX content
      ajaxOptions: {}, // set default jQuery.ajax() template
      animDuration: "fast", // default for duration of toggle animation
      folderTooltip: "click to expand/collapse", // default text which displayed when mouse hover over folder
      rememberState: true, // set cookie enabled as default
      startCollapsed: true, // start undefined state as collapsed in default
      treeHeight: "auto", // default height for the tree in pixel
      treeWidth: "auto", // default width for the tree in pixel
    };

    var helpers = {
      getState: function ($uls) {
        return $uls
          .map(function () {
            // check hidden property for each branch
            if ($(this).is(":hidden")) {
              return 0; // then it must be likely collapsed
            } else {
              return 1; // then it must be likely expanded
            }
          })
          .get()
          .join(",");
      },

      cookie: function (p, id, arr, r) {
        // check whether remember
        if (r) {
          if (p === "set") {
            // set cookie
            document.cookie = "explr-" + id + "=" + escape(arr);
          } else {
            // get cookie
            var dc = document.cookie;
            var index = dc.indexOf("explr-" + id + "=");
            // check if cookie with the given id is present
            if (index >= 0) {
              if (p === "check") {
                return true;
              }
              // first index of this cookie's value
              var start = index + id.length + 7;
              // last index of this cookie's value
              var end = dc.indexOf(";", start);
              if (start !== id.length) {
                if (end === -1) {
                  end = dc.length;
                }
                return unescape(dc.substring(start, end));
              }
            }
            return false;
          }
        }
        return false;
      },
    };

    var methods = {
      init: function (options) {
        // extend default properties with given params (if any)
        var opts = $.extend(defaults, options);

        return this.each(function () {
          // cache object
          var $tree = $(this);
          // get id attribute of this tree
          var treeId = $tree.attr("id");

          $tree
            .addClass("explr-tree")
            .css({
              height: opts.treeHeight,
              width: opts.treeWidth,
            })
            .find("li:not(:last-child) > ul") // for every ul except those within every last-child li
            .addClass("explr-line-fix") // add vertical line below +/-
            .end()
            .find("li")
            .prepend('<span class="explr-line"></span>')
            .not(":has(ul)")
            .addClass("icon-text")
            .end()
            .has("ul")
            .prepend(
              '<span class="explr-plus" title="' +
                opts.folderTooltip +
                '"></span>'
            )
            .delegate('.explr-plus, a[href="#"]', "click", function (e) {
              $(this)
                .siblings("ul")
                .slideToggle(opts.animDuration, function () {
                  // everytime toggled, save tree state to cookie
                  helpers.cookie(
                    "set",
                    treeId,
                    helpers.getState($tree.find("ul")),
                    opts.rememberState
                  );
                })
                .siblings(".explr-plus")
                .toggleClass("explr-minus");
              return false;
            });

          $tree.delegate('a[href="#"]', "click", function (e) {
            e.preventDefault();
          });

          $tree.delegate('a[rel*="explr-ajax"]', "click", function () {
            $("#" + opts.ajaxContainerId).html(opts.ajaxLoadingText);
            var ajaxDefault = {
              dataType: "html",
              url: $(this).attr("href"),
              error: function (xhr) {
                $("#" + opts.ajaxContainerId).html(
                  xhr.statusText + " " + xhr.status
                );
              },
              success: function (data) {
                $("#" + opts.ajaxContainerId).html(data);
              },
            };
            $.ajax($.extend(ajaxDefault, opts.ajaxOptions));
            return false;
          });

          if (helpers.cookie("check", treeId, false, opts.rememberState)) {
            var uls = helpers
              .cookie("get", treeId, false, opts.rememberState)
              .split(",");
            var ulIndex = 0;
            $tree.find("ul").each(function () {
              // check 1 or 0
              if (parseInt(uls[ulIndex], 10)) {
                // if 1 -> expanded
                $(this).siblings(".explr-plus").addClass("explr-minus");
              } else {
                // if 0 -> collapsed
                $(this).hide();
              }
              ulIndex += 1;
            });
          } else if (opts.startCollapsed) {
            $tree
              .find("ul") // hide every ul
              .hide()
              .end()
              .find(".explr-expand") // unless explicitly set to expand
              .show()
              .siblings(".explr-plus")
              .addClass("explr-minus");
          } else {
            $tree
              .find(".explr-collapse") // hide every element set to collapse
              .hide()
              .end()
              .find("ul:not(.explr-collapse)") // show the rest
              .siblings(".explr-plus")
              .addClass("explr-minus");
          }

          if ($.browser.msie) {
            // set as target of CSS hacks for IE6-8
            $tree.addClass("explr-ie");
          }
        });
      },
    };

    if (methods[method] && method.toLowerCase() != "init") {
      return methods[method].apply(
        this,
        Array.prototype.slice.call(arguments, 1)
      );
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method "' + method + '" does not exist in Explr');
    }
  };
})(jQuery);
