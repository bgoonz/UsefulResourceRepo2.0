$(document).ready(function () {
  const prefix = "|-- ",
    prefix_last = "`-- ",
    spacer = "|   ",
    spacer_e = "    ",
    ul_template = $("#template > ul"),
    li_template = $("li", ul_template).first();

  const action = {
    "add-sibling": function (obj) {
      obj.after(li_template.clone());
    },
    "add-child": function (obj) {
      obj.append(ul_template.clone());
    },
    delete: function (obj) {
      obj.remove();
    },
  };

  $(document).on("click", "li.tree-node .controls > a", function () {
    action[this.getAttribute("data-func")]($(this).closest("li"));
    rebuild_tree();
    return false;
  });

  function get_subdir_text(obj, pad) {
    let padding = pad || "",
      out = "",
      items = obj.children("li"),
      last = items.length - 1;

    items.each(function (index) {
      const $this = $(this);
      out +=
        padding +
        (index == last ? prefix_last : prefix) +
        $this.children("input").val() +
        "\n";
      const subdirs = $this.children("ul");
      if (subdirs.length) {
        out += get_subdir_text(
          subdirs,
          padding + (index == last ? spacer_e : spacer)
        );
      }
    });
    return out;
  }

  function rebuild_tree() {
    $("#out").text($("#p_name").val() + "\n" + get_subdir_text($("#tree")));
  }

  $("#tree").append(li_template.clone());
  $(document).on("keyup", "#tree input", rebuild_tree);
  $("#p_name").on("keyup", rebuild_tree);

  $("#tree")
    .on("mouseover", "li", function (e) {
      $(this).children(".controls").show();
      e.stopPropagation();
    })
    .on("mouseout", "li", function (e) {
      $(this).children(".controls").hide();
      e.stopPropagation();
    });

  rebuild_tree();
});
