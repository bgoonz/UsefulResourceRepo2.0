function mergeItems(template, items) {
  let trs = "";

  let index = 1;
  for (let item of items) {
    let form = "";
    if (!item.isComplete) {
      form = `
        <form method="POST" action="/items/${index}">
          <button class="pure-button">Complete</button>
        </form>
      `;
    }
    trs += `
      <tr>
        <td>${index}</td>
        <td>${item.title}</td>
        <td>${item.category}</td>
        <td>${form}</td>
      </tr>
    `;
    index += 1;
  }

  return template.replace("<!-- Content here -->", trs);
}

exports.mergeItems = mergeItems;
