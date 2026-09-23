<?php

session_start();

require_once "conexao.php";

if (!isset($_SESSION["usuario_id"])) {
    echo "Usuário não está logado.";
    exit;
}

$usuario_id = $_SESSION["usuario_id"];
$nome = $_POST["nome"];

$sql = "INSERT INTO cestas (usuario_id, nome) VALUES (?, ?)";

$stmt = $pdo->prepare($sql);

try {

    $stmt->execute([$usuario_id, $nome]);

    echo "Cesta criada com sucesso!";

} catch (PDOException $e) {

    echo "Erro ao criar cesta.";

}

?>