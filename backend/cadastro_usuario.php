<?php

require_once "conexao.php";

$nome = $_POST["nome"];
$email = $_POST["email"];
$senha = $_POST["senha"];

$senhaHash = hash("sha256", $senha);

$sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";

$stmt = $pdo->prepare($sql);

try {

    $stmt->execute([$nome, $email, $senhaHash]);

    echo "Usuário cadastrado com sucesso!";

} catch (PDOException $e) {

    echo "Erro ao cadastrar usuário.";

}

?>