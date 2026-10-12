CREATE DATABASE IF NOT EXISTS studentdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE studentdb;
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  course VARCHAR(80) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO students(name,email,course) VALUES
('Anurag Parmar','anurag@example.test','B.Tech CSE'),
('Sample Student','student@example.test','B.Tech CSE')
ON DUPLICATE KEY UPDATE name=VALUES(name);
