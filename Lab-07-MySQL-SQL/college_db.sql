-- Lab Sheet 7: MySQL database practice
CREATE DATABASE IF NOT EXISTS college_db;
USE college_db;

DROP TABLE IF EXISTS enrollments;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
  dept_id INT PRIMARY KEY,
  dept_name VARCHAR(80) NOT NULL UNIQUE
);
CREATE TABLE students (
  student_id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age INT NOT NULL CHECK (age >= 16),
  dept_id INT NULL,
  city VARCHAR(80) DEFAULT 'Roorkee',
  CONSTRAINT fk_students_department FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);
CREATE TABLE enrollments (
  enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  course_name VARCHAR(100) NOT NULL,
  marks DECIMAL(5,2) NOT NULL CHECK (marks BETWEEN 0 AND 100),
  FOREIGN KEY (student_id) REFERENCES students(student_id)
);

INSERT INTO departments VALUES (1,'Computer Science'),(2,'Electronics'),(3,'Mechanical');
INSERT INTO students VALUES
(101,'Anurag',20,1,'Roorkee'),(102,'Riya',21,1,'Delhi'),(103,'Karan',20,2,'Agra'),
(104,'Vikram',22,NULL,'Jaipur'),(105,'Meera',19,3,'Dholpur');
INSERT INTO enrollments(student_id,course_name,marks) VALUES
(101,'DBMS',88),(101,'Web Development',92),(102,'DBMS',79),(103,'Networks',84),(105,'DBMS',91);

-- A. Basic queries
SELECT * FROM students;
SELECT name, age FROM students WHERE age >= 20 ORDER BY name;
SELECT * FROM enrollments WHERE marks > 80;

-- B. INSERT / UPDATE / DELETE examples (uncomment individually to practise)
-- INSERT INTO students(student_id,name,age,dept_id) VALUES (110,'New Student',20,1);
-- UPDATE students SET city='Roorkee' WHERE student_id=102;
-- DELETE FROM students WHERE student_id=110;

-- C. Aggregation
SELECT COUNT(*) AS student_count, AVG(age) AS average_age FROM students;
SELECT dept_id, COUNT(*) AS students_per_department FROM students GROUP BY dept_id;

-- D. JOIN examples
SELECT s.name, d.dept_name FROM students s INNER JOIN departments d ON s.dept_id=d.dept_id;
SELECT s.name, d.dept_name FROM students s LEFT JOIN departments d ON s.dept_id=d.dept_id;
SELECT d.dept_name, s.name FROM departments d LEFT JOIN students s ON s.dept_id=d.dept_id;

-- E. View and index
CREATE OR REPLACE VIEW student_marks AS
SELECT s.name, e.course_name, e.marks FROM students s JOIN enrollments e ON e.student_id=s.student_id;
SELECT * FROM student_marks WHERE marks > 80;
CREATE INDEX idx_students_city ON students(city);
-- DROP VIEW student_marks;
-- DROP INDEX idx_students_city ON students;

-- F. Transaction example; execute as a block and inspect before COMMIT.
START TRANSACTION;
UPDATE enrollments SET marks=LEAST(marks+1,100) WHERE student_id=101;
SELECT * FROM enrollments WHERE student_id=101;
ROLLBACK;
