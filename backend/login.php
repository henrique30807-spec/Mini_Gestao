<?php

session_start();

require_once "conexao.php";

$email = $_POST["email"];
$senha = $_POST["senha"];

$senhaHash = hash("sha256", $senha);

$sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";

$stmt = $pdo->prepare($sql);
$stmt->execute([$email, $senhaHash]);

$usuario = $stmt->fetch(PDO::FETCH_ASSOC);

if($usuario) {
    $_SESSION["usuario_id"] = $usuario["id"];
    echo "Login realizado com sucesso! Bem-vindo, ".$usuario["nome"];
} else {
    echo "Email ou senha incorretos.";
}

?>