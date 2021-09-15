const { expect } = require('chai');
const { mergeCategories } = require('../merge-categories');
describe("The mergeCategories function", () => {
  describe("For lists", () => {
    const template = `
      <div>
        <ul>
          <!-- Content here -->
        </ul>
      </div>
    `;
    it("should return no LIs for no categories", () => {
      const categories = [];
      const result = mergeCategories(template, categories, 'li');
      expect(result).to.contain('<div>');
      expect(result).to.contain('</div>');
      expect(result).to.contain('<ul>');
      expect(result).to.contain('</ul>');
      expect(result).to.not.contain('<li>');
      expect(result).to.not.contain('</li>');
    });
    it("should return a single LI for one categories", () => {
      const categories = ['Cat 1'];
      const result = mergeCategories(template, categories, 'li');
      expect(result).to.contain('<div>');
      expect(result).to.contain('</div>');
      expect(result).to.contain('<ul>');
      expect(result).to.contain('</ul>');
      expect(result).to.contain('<li>Cat 1</li>');
    });
    it("should return an LI for each category", () => {
      const categories = ['Cat 1', 'Cat 2', 'Cat 3'];
      const result = mergeCategories(template, categories, 'li');
      expect(result).to.contain('<div>');
      expect(result).to.contain('</div>');
      expect(result).to.contain('<ul>');
      expect(result).to.contain('</ul>');
      expect(result).to.contain('<li>Cat 1</li>');
      expect(result).to.contain('<li>Cat 2</li>');
      expect(result).to.contain('<li>Cat 3</li>');
    });
  });

  describe("For selects", () => {
    const template = `
      <div>
        <select>
          <!-- Content here -->
        </select>
      </div>
    `;
    it("should return no OPTIONs for no categories", () => {
      const categories = [];
      const result = mergeCategories(template, categories, 'option');
      expect(result).to.contain('<div>');
      expect(result).to.contain('</div>');
      expect(result).to.contain('<select>');
      expect(result).to.contain('</select>');
      expect(result).to.not.contain('<option>');
      expect(result).to.not.contain('</option>');
    });
    it("should return a single OPTION for one categories", () => {
      const categories = ['Cat 1'];
      const result = mergeCategories(template, categories, 'option');
      expect(result).to.contain('<div>');
      expect(result).to.contain('</div>');
      expect(result).to.contain('<select>');
      expect(result).to.contain('</select>');
      expect(result).to.contain('<option>Cat 1</option>');
    });
    it("should return an LI for each category", () => {
      const categories = ['Cat 1', 'Cat 2', 'Cat 3'];
      const result = mergeCategories(template, categories, 'option');
      expect(result).to.contain('<div>');
      expect(result).to.contain('</div>');
      expect(result).to.contain('<select>');
      expect(result).to.contain('</select>');
      expect(result).to.contain('<option>Cat 1</option>');
      expect(result).to.contain('<option>Cat 2</option>');
      expect(result).to.contain('<option>Cat 3</option>');
    });
  });
});
