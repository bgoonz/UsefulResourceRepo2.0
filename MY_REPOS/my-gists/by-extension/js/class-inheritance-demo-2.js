class Teacher extends User {
  constructor (options) {
    super(options);
    this.lessons = [];
  }
  createLesson (lesson) {
    const { name } = lesson;
    this.lessons.push(lesson);
    console.log(`${ this.name } created lesson: ${ name }`);
  }
}

const jafar = new Teacher({
  name: 'Jafar'
});

jafar.login(); // "Jafar logged in."
jafar.createLesson({
  name: 'LearnRX'
}); // "Jafar created lesson: LearnRX"