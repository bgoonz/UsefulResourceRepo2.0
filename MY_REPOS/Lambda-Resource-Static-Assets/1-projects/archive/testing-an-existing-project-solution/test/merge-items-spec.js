const { expect } = require("chai");
const { mergeItems } = require("../merge-items");
describe("The mergeItems function", () => {
  const template = `
    <table>
      <tbody>
        <!-- Content here -->
      </tbody>
    </table>
  `;
  it("should return no TRs and no TDs for no items", () => {
    const items = [];
    const result = mergeItems(template, items);
    expect(result).to.contain("<table>");
    expect(result).to.contain("</table>");
    expect(result).to.contain("<tbody>");
    expect(result).to.contain("</tbody>");
    expect(result).to.not.contain("<tr>");
    expect(result).to.not.contain("</tr>");
    expect(result).to.not.contain("<td>");
    expect(result).to.not.contain("</td>");
  });
  it("should return a single TR for one item", () => {
    const items = [{ title: "Title", category: "Cat 1" }];
    const result = mergeItems(template, items);
    expect(result).to.contain("<table>");
    expect(result).to.contain("</table>");
    expect(result).to.contain("<tbody>");
    expect(result).to.contain("</tbody>");
    expect(result).to.contain("<tr>");
    expect(result).to.contain("</tr>");
    expect(result).to.contain("<td>1</td>");
    expect(result).to.contain("<td>Cat 1</td>");
    expect(result).to.contain("<td>Title</td>");
    expect(result).to.contain('<form method="POST" action="/items/1">');
  });
  it("should return three TRs for three items", () => {
    const items = [
      { title: "Title1", category: "Cat 1" },
      { title: "Title2", category: "Cat 2", isComplete: true },
      { title: "Title3", category: "Cat 3" },
    ];
    const result = mergeItems(template, items);
    expect(result).to.contain("<table>");
    expect(result).to.contain("</table>");
    expect(result).to.contain("<tbody>");
    expect(result).to.contain("</tbody>");
    expect(result).to.contain("<tr>");
    expect(result).to.contain("</tr>");
    expect(result).to.contain("<td>1</td>");
    expect(result).to.contain("<td>Cat 1</td>");
    expect(result).to.contain("<td>Title1</td>");
    expect(result).to.contain('<form method="POST" action="/items/1">');
    expect(result).to.contain("<td>2</td>");
    expect(result).to.contain("<td>Cat 2</td>");
    expect(result).to.contain("<td>Title2</td>");
    expect(result).not.to.contain('<form method="POST" action="/items/2">');
    expect(result).to.contain("<td>3</td>");
    expect(result).to.contain("<td>Cat 3</td>");
    expect(result).to.contain("<td>Title3</td>");
    expect(result).to.contain('<form method="POST" action="/items/3">');
  });
});
