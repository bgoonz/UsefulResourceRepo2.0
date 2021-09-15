# jquery Cheat Sheet

jquery methods

---

### jquery Cheat Sheet

### jquery methods

### Wrapping HTMLElements as jquery objects

- <span id="0e92">wraps HTMLElement and returns jquery object</span>
- <span id="bb81">const $liList = $(“li”)</span>
- <span id="0cc3">const firstLi = $liList\[0\];</span>
- <span id="d45e">const $firstLi = $(firstLi);</span>

### attributes

- <span id="93a8">attr(), attr(name,value)</span>
- <span id="02cd">text(), text(value)</span>
- <span id="7a29">value(), value(value)</span>

### data

- <span id="2901">data()</span>
- <span id="2dee">set</span>
- <span id="cd88">data(“key”,value)</span>
- <span id="2289">get</span>
- <span id="4c2c">data(“key”)</span>

### traversal

- <span id="8e23">each(callback w/ (index,\[element\]))</span>
- <span id="1517">parent,children,siblings</span>

### inserting/removing

- <span id="3101">append(content,\[context\])</span>
- <span id="b9d8">content can be htmlstring, element, text, array, jquery obj</span>
- <span id="57eb">remove(\[selector\]) if a selector, removes receiver</span>

### class manipulation

- <span id="048f">addClass(String(can be multiple classes separated by spaces))</span>
- <span id="6f91">removeClass(String(can be multiple classes separated by spaces))</span>
- <span id="b92a">toggleClass(className)</span>

### Document ready

event, callback callback (string,function) (function)

ex:

    $(() => console.log("loaded"));

    or...

    $(document).ready(callback)

### finding elements

css selector (string)

ex:

    $("li");

- <span id="6661">searches for elements that match selector</span>
- <span id="e8de">returns jquery object of HTMLElements</span>

### creating elements

tag-name HTML code (string) (string)

ex:

    $("<li>banana</li>");

- <span id="ce88">creates an HTMLElement</span>
- <span id="a00d">wrapped in jquery object and returns it</span>

<!-- -->

    const $li = $("<li></li>");
    $li.text ("banana");
    $li.attr("style","background-color: yellow");
    $ul = $("ul")[0]
    $ul.append($li);

### events

- <span id="0a6a">jqueryObject.on(“eventType”, callback)</span>
- <span id="11a3">jqueryObject.off(“eventType”, \[callback\])</span>
- <span id="ad13">the second argument in .off is optionala BUT recommended. without, removes all listeners for the jquery object. With, will remove only listener w/ same callback</span>

### e

- <span id="4ed6">e is passed to your callback as an arg. you can attach a preventDefault to it which will prevent normal behavior</span>

ex:

    e.preventDefault();

### currentTarget vs target

### currentTarget

- <span id="1ae5">receiver of addEventListener</span>
- <span id="368a">receiver of on</span>

### target

- <span id="ebd3">element where event was triggered</span>

### delegateTarget

    $("ul").on("click","li",cb)

- <span id="b469">when ‘on’ is given 3 arguments</span>
- <span id="6842">delegateTarget -&gt; receiver</span>
- <span id="edc4">currentTarget -&gt; 2nd arg</span>
- <span id="a555">target -&gt; (unchanged; still the thing that triggers event)</span>

### ajax example

    $.ajax({
      url: '/squirrels',
      method: 'POST',
      data: {
        squirrel: {
          name: 'Munchie',
          species: 'Flying'
        }
      },
      dataType: 'JSON',
    })
    .then(res => console.log(res))
    .fail(err => console.log(err));

By <a href="https://medium.com/@bryanguner" class="p-author h-card">Bryan Guner</a> on [September 3, 2021](https://medium.com/p/cc70458ce284).

<a href="https://medium.com/@bryanguner/jquery-cheat-sheet-cc70458ce284" class="p-canonical">Canonical link</a>

Exported from [Medium](https://medium.com) on September 12, 2021.
