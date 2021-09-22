-- SCHEMA
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100)
);
 
 
CREATE TABLE papers (
    title VARCHAR(100),
    grade INT,
    student_id INT,
    FOREIGN KEY (student_id) 
        REFERENCES students(id)
        ON DELETE CASCADE
);

-- SEED DATA
INSERT INTO students (first_name) VALUES 
('Caleb'), 
('Samantha'), 
('Raj'), 
('Carlos'), 
('Lisa');
 
INSERT INTO papers (student_id, title, grade ) VALUES
(1, 'My First Book Report', 60),
(1, 'My Second Book Report', 75),
(2, 'Russian Lit Through The Ages', 94),
(2, 'De Montaigne and The Art of The Essay', 98),
(4, 'Borges and Magical Realism', 89);

-- INNER JOIN
SELECT first_name, title, grade
FROM students
INNER JOIN papers
    ON students.id = papers.student_id
ORDER BY grade DESC;

-- LEFT JOIN
SELECT
	first_name,
	title,
	grade 
FROM
	students
	LEFT JOIN papers ON students.id = papers.student_id;

-- LEFT JOIN WITH PASSING STATUS
SELECT
	first_name,
	Ifnull( Avg( grade ), 0 ) AS average,
CASE
		WHEN Avg( grade ) IS NULL THEN
		'FAILING' 
		WHEN Avg( grade ) >= 75 THEN
		'PASSING' ELSE 'FAILING' 
	END AS passing_status 
FROM
	students
	LEFT JOIN papers ON students.id = papers.student_id 
GROUP BY
	students.id 
ORDER BY
	average DESC;