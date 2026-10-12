<?php
declare(strict_types=1);
require __DIR__ . '/config.php';
$errors = [];
$success = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    if ($action === 'create') {
        $name = trim($_POST['name'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $course = trim($_POST['course'] ?? '');
        if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $course === '') {
            $errors[] = 'Enter a name, valid email and course.';
        } else {
            try {
                $stmt = $pdo->prepare('INSERT INTO students (name,email,course) VALUES (:name,:email,:course)');
                $stmt->execute(['name'=>$name,'email'=>$email,'course'=>$course]);
                $success = 'Student added successfully.';
            } catch (PDOException $e) {
                $errors[] = 'Could not add student. The email may already exist.';
            }
        }
    } elseif ($action === 'delete') {
        $id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
        if ($id) {
            $stmt = $pdo->prepare('DELETE FROM students WHERE id = :id');
            $stmt->execute(['id'=>$id]);
            $success = 'Student deleted if the record existed.';
        } else $errors[] = 'Invalid student ID.';
    }
}
$students = $pdo->query('SELECT id,name,email,course FROM students ORDER BY id DESC')->fetchAll();
function e(string $value): string { return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
?>
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Student Database</title><link rel="stylesheet" href="style.css"></head><body><main><header><p class="eyebrow">FULL STACK DEVELOPMENT · LAB 10</p><h1>Student Database</h1><p>PHP + MySQL connection and CRUD demonstration.</p></header>
<?php foreach ($errors as $error): ?><p class="error"><?= e($error) ?></p><?php endforeach; ?>
<?php if ($success !== ''): ?><p class="success"><?= e($success) ?></p><?php endif; ?>
<section><h2>Add student</h2><form method="post"><input type="hidden" name="action" value="create"><label>Name<input name="name" maxlength="100" required></label><label>Email<input name="email" type="email" maxlength="150" required></label><label>Course<input name="course" maxlength="80" required></label><button>Add student</button></form></section>
<section><h2>Students</h2><div class="table-wrap"><table><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Course</th><th>Action</th></tr></thead><tbody>
<?php foreach ($students as $student): ?><tr><td><?= (int)$student['id'] ?></td><td><?= e($student['name']) ?></td><td><?= e($student['email']) ?></td><td><?= e($student['course']) ?></td><td><form method="post" onsubmit="return confirm('Delete this student?')"><input type="hidden" name="action" value="delete"><input type="hidden" name="id" value="<?= (int)$student['id'] ?>"><button class="danger">Delete</button></form></td></tr><?php endforeach; ?>
<?php if (!$students): ?><tr><td colspan="5">No students found.</td></tr><?php endif; ?></tbody></table></div></section></main></body></html>
