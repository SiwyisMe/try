<?php
include('session_handler.php');
include('db_connection.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? null;
    $email = $_POST['email'] ?? null;
    $password = $_POST['password'] ?? null;

    if (!empty($username) && !empty($email) && !empty($password)) {
        try {
            $password_hash = password_hash($password, PASSWORD_BCRYPT);

            $stmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE username = :username OR email = :email");
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':email', $email);
            $stmt->execute();
            $count = $stmt->fetchColumn();

            if ($count > 0) {
                echo "Błąd: użytkownik o podanej nazwie użytkownika lub adresie e-mail już istnieje.";
            } else {
                $sql = "INSERT INTO users (username, password_hash, email) VALUES (:username, :password_hash, :email)";
                $stmt = $conn->prepare($sql);

                $stmt->bindParam(':username', $username);
                $stmt->bindParam(':password_hash', $password_hash);
                $stmt->bindParam(':email', $email);
                $stmt->execute();

                $_SESSION['user_id'] = $conn->lastInsertId();

                header("Location: account.php");
                exit;
            }
        } catch (PDOException $e) {
            echo "Błąd zapisu do bazy danych: " . $e->getMessage();
        }
    } else {
        echo "Wszystkie pola są wymagane!";
    }
} else {
    echo "Nieprawidłowe żądanie.";
}
?>

<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <title>Rejestracja</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="navigation"></div>

    <div class="register-container">
        <h1>Rejestracja</h1>
        <form method="POST" action="register.php">
            <div class="form-group">
                <label for="username">Nazwa użytkownika</label>
                <input type="text" class="form-control" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="password">Hasło</label>
                <input type="password" class="form-control" id="password" name="password" required>
            </div>
            <button type="submit" class="btn btn-primary">Zarejestruj</button>
        </form>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="template.js"></script>
    <script>
        loadNavbar();
    </script>
</body>
</html>
