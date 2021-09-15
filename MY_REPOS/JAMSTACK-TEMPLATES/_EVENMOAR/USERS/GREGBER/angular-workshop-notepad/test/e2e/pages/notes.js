module.exports = function () {
  this.titleInput = element(by.model('note.title'));
  this.contentInput = element(by.model('note.content'));
  this.submitButton = element(by.css('[type=submit]'));

  this.get = function() {
    browser.get('http://localhost:3000/notes');
  };

  this.setTitle = function(value) {
    this.titleInput.sendKeys(value);
  };

  this.setContent = function(value) {
    this.contentInput.sendKeys(value);
  };

  this.submit = function () {
    this.submitButton.click();
  };

  this.toggleForm = function () {
    element(by.css('toggle-btn button')).click();
  };

  this.getNotes = function () {
    return element.all(by.repeater('note in notes'));
  };
};