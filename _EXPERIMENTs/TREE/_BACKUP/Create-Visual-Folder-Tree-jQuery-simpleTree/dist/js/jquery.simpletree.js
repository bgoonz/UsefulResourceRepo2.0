/*
Simple Tree jQuery plugin

Based on JS for simple unobtrusive javascript treeview plugin
developed by Krijn Hoetmer
http://krijnhoetmer.nl/stuff/javascript/list-treeview-menu/

Adapted as a jQuery plugin by Maurizio Manetti

*/

(function ($, window, document, undefined) {
  "use strict";

  var pluginName = "simpleTree",
    defaults = {
      classChanged: "st-treed",
      classOpen: "st-open",
      classCollapsed: "st-collapsed",
      classLeaf: "st-file",
      classLast: "st-last",
      startCollapsed: true,
    };

  // util function to get the real bg color of an element
  var get_bgcolor = function (obj) {
    var real = obj.css("backgroundColor");
    var none = "rgba(0, 0, 0, 0)";
    // if bg color not set look for the color of first parent with a bg color set
    if (real === none) {
      real = obj
        .parents()
        .filter(function () {
          return $(this).css("backgroundColor") != none;
        })
        .first()
        .css("backgroundColor");
    }
    // if bg color yet not set fallback to white
    if (real === undefined) {
      real = "rgba(255, 255, 255, 255)";
    }
    return real;
  };

  var handleClick = function (e) {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
  };

  function SimpleTree(element, options) {
    this.element = $(element);
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  SimpleTree.prototype.init = function () {
    var settings = this.settings;
    var $element = this.element;
    // init the plugin on matched elements
    $element.addClass(settings.classChanged);
    // take all listed items
    $element.find("li").each(function (index) {
      var $li = $(this);
      // if the list item has unordered lists as children
      if ($li.children("ul").length > 0) {
        if (settings.startCollapsed) {
          // add class collapsed if should start collapsed (it is the default setting)
          // unless already has class open
          if (!$li.hasClass(settings.classOpen)) {
            $li.addClass(settings.classCollapsed);
          }
        } else {
          // add class open if it should start open
          // unless it already has class collapsed
          if (!$li.hasClass(settings.classCollapsed)) {
            $li.addClass(settings.classOpen);
          }
        }
        // manage click on item
        $li.on("mousedown", function (event) {
          $li.toggleClass(settings.classOpen + " " + settings.classCollapsed); // toggle open / collapsed status
          handleClick(event); // avoid propagation of the event to parent container(s)
        });
      } else {
        $li.addClass(settings.classLeaf); // has no children: it's a leaf
      }
      // has no list items subsequent siblings: it is the last one
      if ($li.next("li").length == 0) {
        $li.addClass(settings.classLast);
        // set the background color explicitly so to hide the UL vertical dots
        $li.css("backgroundColor", get_bgcolor($li));
      }
    });
    // avoid anchor tags click to fire collapse / open of parent containers
    $element.find("a").on("mousedown", handleClick);
  };

  SimpleTree.prototype.expand = function () {
    var settings = this.settings;
    this.element
      .find("li." + settings.classCollapsed)
      .removeClass(settings.classCollapsed)
      .addClass(settings.classOpen);
  };

  SimpleTree.prototype.collapse = function () {
    var settings = this.settings;
    this.element
      .find("li." + settings.classOpen)
      .removeClass(settings.classOpen)
      .addClass(settings.classCollapsed);
  };

  SimpleTree.prototype._reset = function () {
    // remove classes and event bindings
    // method should never be called alone
    var settings = this.settings;
    var $element = this.element;
    $element.removeClass(settings.classChanged);
    $element.find("li").each(function (index) {
      var $li = $(this);
      if ($li.hasClass(settings.classLast)) {
        $li.css("backgroundColor", "");
      }
      $li
        .removeClass(settings.classLeaf)
        .removeClass(settings.classLast)
        .off("mousedown");
    });
  };

  SimpleTree.prototype.destroy = function () {
    // reset interface and event binding
    this._reset();
    // remove data attributes (we are deleting the instance completely)
    this.element.removeData("plugin_" + this._name);
  };

  SimpleTree.prototype.repaint = function () {
    // reset and re-apply
    this._reset();
    this.init();
  };

  // evaluate method call or creation (similar to jQuery UI widget factory)
  // prevent against multiple instantiations
  // attach the plugin in the data-attribute of matched elements
  $.fn[pluginName] = function (options) {
    var isMethodCall = typeof options === "string";
    if (isMethodCall) {
      return this.each(function () {
        var instance = $.data(this, "plugin_" + pluginName);
        if (!instance) {
          // error: instance not initialized
          console.error(
            "Cannot call methods on " +
              pluginName +
              " prior to initialization; attempted to call method '" +
              options +
              "'"
          );
        } else if (!$.isFunction(instance[options])) {
          // error: method not defined
          console.error("No such method '" + options + "' for " + pluginName);
        } else {
          // finally call the desired method
          instance[options].call(instance);
        }
      });
    } else {
      return this.each(function () {
        if (!$.data(this, "plugin_" + pluginName)) {
          $.data(this, "plugin_" + pluginName, new SimpleTree(this, options));
        }
      });
    }
  };
})(jQuery, window, document);
