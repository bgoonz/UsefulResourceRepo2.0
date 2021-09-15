const grades = [100, 75, 95];
// total grade
// for each -> add number to total grade
//Average grade -> total grade/total number of grades

let totalGrade = 0;

grades.forEach(function total(grade) {
  totalGrade = totalGrade + grade;
});

const finalGrade = totalGrade / grades.length;

console.log(`Average grade is: ${finalGrade}`);
